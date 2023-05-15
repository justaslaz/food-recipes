import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

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
});
