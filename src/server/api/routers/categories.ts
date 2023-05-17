import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  getByRecipe: publicProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.category.findMany({
        where: { recipes: { some: { id: { equals: input.recipeId } } } },
      });
    }),
});
