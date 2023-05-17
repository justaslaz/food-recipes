import { createTRPCRouter } from "~/server/api/trpc";
import { recipeRouter } from "~/server/api/routers/recipe";
import { categoriesRouter } from "~/server/api/routers/categories";
import { ingredientsRouter } from "~/server/api/routers/ingredients";
import { preparationStepsRouter } from "~/server/api/routers/preparation-steps";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recipe: recipeRouter,
  categories: categoriesRouter,
  ingredients: ingredientsRouter,
  preparationSteps: preparationStepsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
