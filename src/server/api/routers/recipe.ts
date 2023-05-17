import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getByCategory: publicProcedure
    .input(z.object({ categoryName: z.string().optional() }))
    .query(({ ctx, input }) => {
      if (input.categoryName) {
        return ctx.prisma.recipe.findMany({
          where: {
            categories: { some: { name: { equals: input.categoryName } } },
          },
        });
      }
      return ctx.prisma.recipe.findMany();
    }),

  getRecipe: publicProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.recipe.findUnique({ where: { id: input.recipeId } });
    }),
});
