import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getByCategory: publicProcedure
    .input(z.object({ categoryName: z.string().optional() }))
    .query(({ ctx, input }) => {
      if (input.categoryName) {
        return ctx.prisma.recipe.findMany({
          where: {
            categories: { some: { name: { equals: input.categoryName } } },
          },
          include: { ingredients: true },
        });
      }
      return ctx.prisma.recipe.findMany();
    }),

  getRecipe: publicProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(({ ctx, input }) => {
      const userId = ctx.auth.userId;

      return ctx.prisma.recipe.findUnique({
        where: { id: input.recipeId },
        include: {
          ingredients: true,
          categories: true,
          preparationSteps: true,
          notes: true,
          author: true,
          ...(userId && { favoriteBy: { where: { userId: userId } } }),
        },
      });
    }),

  getByKeyword: publicProcedure
    .input(z.object({ keyword: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.recipe.findMany({
        where: { name: { contains: input.keyword } },
      });
    }),

  getLengthOfUserFavorites: publicProcedure.query(({ ctx }) => {
    const userId = ctx.auth.userId;

    if (userId) {
      return ctx.prisma.recipe.count({
        where: { favoriteBy: { some: { userId: userId } } },
      });
    }
    return null;
  }),

  getAllUserFavorites: publicProcedure.query(({ ctx }) => {
    const userId = ctx.auth.userId;

    if (userId) {
      return ctx.prisma.recipe.findMany({
        where: { favoriteBy: { some: { userId: userId } } },
      });
    }
    return null;
  }),

  addToUserFavorites: protectedProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.auth.userId;

      return ctx.prisma.recipe.update({
        where: { id: input.recipeId },
        data: {
          favoriteBy: {
            connectOrCreate: {
              where: { userId: userId },
              create: {
                userId: userId,
              },
            },
          },
        },
      });
    }),

  removeFromUserFavorites: protectedProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.auth.userId;

      return ctx.prisma.recipe.update({
        where: { id: input.recipeId },
        data: {
          favoriteBy: {
            disconnect: {
              userId: userId,
            },
          },
        },
      });
    }),
});
