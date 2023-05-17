import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const preparationStepsRouter = createTRPCRouter({
  getByRecipe: publicProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.preparationStep.findMany({
        where: { recipeId: { equals: input.recipeId } },
      });
    }),
});
