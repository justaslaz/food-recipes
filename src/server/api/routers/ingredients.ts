import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ingredientsRouter = createTRPCRouter({
  getByRecipe: publicProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.ingredient.findMany({
        where: { recipeId: { equals: input.recipeId } },
      });
    }),
});