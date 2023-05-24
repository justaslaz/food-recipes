import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  ////////////////
  // QUERIES
  getByCategory: publicProcedure
    .input(
      z.object({ categoryName: z.string().optional(), pageNum: z.number() })
    )
    .query(async ({ ctx, input: { categoryName, pageNum } }) => {
      const userId = ctx.auth.userId;

      const length = await ctx.prisma.recipe.count({
        where: { categories: { some: { name: { equals: categoryName } } } },
      });

      let recipes;
      if (categoryName) {
        recipes = await ctx.prisma.recipe.findMany({
          skip: 9 * (pageNum - 1),
          take: 9,
          where: {
            categories: { some: { name: { equals: categoryName } } },
          },
          include: {
            categories: true,
            ...(userId && { favoriteBy: { where: { userId: userId } } }),
          },
        });
      } else {
        recipes = await ctx.prisma.recipe.findMany({
          skip: 9 * (pageNum - 1),
          take: 9,
          include: {
            categories: true,
            ...(userId && { favoriteBy: { where: { userId: userId } } }),
          },
        });
      }

      return { length, recipes };
    }),

  // getByCategoryLength: publicProcedure.input(z.object({categoryName: z.string().optional()})).query

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

  ////////////////////
  // MUTATIONS
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
