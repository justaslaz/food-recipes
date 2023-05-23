import Image from "next/image";
import {
  CheckIcon,
  ClockIcon,
  HeartIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { correctWordEnding } from "~/utils/correctWordEnding";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { calcIngredientQuantity } from "~/utils/calcIngredientQuantity";

// Page
const RecipeDetails: NextPage = () => {
  const [servingSize, setServingSize] = useState(1);
  const router = useRouter();
  const trpc = api.useContext();
  const { isSignedIn } = useAuth();

  const { data: recipeData, isLoading } = api.recipe.getRecipe.useQuery({
    recipeId: router.query.recipeId?.toString() ?? "",
  });

  useEffect(() => {
    if (recipeData?.servingSize) {
      setServingSize(recipeData?.servingSize);
    }
  }, [recipeData?.servingSize]);

  const { mutate: addFavoriteMutation } =
    api.recipe.addToUserFavorites.useMutation({
      onSettled: async () => {
        await trpc.recipe.invalidate();
      },
    });

  const { mutate: removeFavoriteMutation } =
    api.recipe.removeFromUserFavorites.useMutation({
      onSettled: async () => {
        await trpc.recipe.invalidate();
      },
    });

  // TODO add loading spinner
  if (isLoading) return <div>Kraunama...</div>;
  if (!recipeData) return <div>Oops...</div>;

  const isFavorite = recipeData.favoriteBy?.length
    ? recipeData.favoriteBy.length > 0
    : false;

  const handleFavorite = () => {
    const recipeId = recipeData?.id;

    if (!isSignedIn) {
      void router.push("/sign-in");
    }

    if (recipeId && !isFavorite) {
      addFavoriteMutation({ recipeId: recipeId });
    }
    if (recipeId && isFavorite) {
      removeFavoriteMutation({ recipeId: recipeId });
    }
  };

  return (
    <>
      {/* IMAGE SECTION */}
      <div className="relative mx-auto mb-8 max-w-7xl overflow-hidden sm:mb-10 md:mb-12">
        <Image
          src={recipeData.imageUrl ?? "/no-photo.png"}
          alt={recipeData.name}
          height={1024}
          width={1664}
          priority
          className="h-96 w-full object-cover contrast-50"
        />

        {/* Categories */}
        <div className="absolute bottom-4 left-4 flex gap-x-4">
          {recipeData.categories.map((category) => (
            <div
              key={category.id}
              className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            >
              <span>{category.name}</span>
            </div>
          ))}
        </div>

        {/* Favorite Icon */}
        <div className="absolute right-4 top-4 transition-all hover:scale-105 active:scale-90">
          <button type="button" onClick={handleFavorite}>
            <HeartIcon
              className={`h-10 w-10 transition-all duration-300 hover:scale-125 hover:fill-red-600 hover:text-red-700 ${
                isFavorite ? "fill-red-600 text-red-700" : "text-stone-700"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="mx-auto mb-14 flex max-w-7xl flex-col items-center justify-center gap-8 sm:mb-16 sm:gap-12 md:mb-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {recipeData.name}
        </h1>

        <div className="flex gap-x-20">
          {/* Time Block */}
          <div className="flex gap-x-2">
            <ClockIcon className="h-6 w-6 text-stone-700" aria-hidden="true" />
            <span className="font-medium">{`${recipeData.cookingTime} min`}</span>
          </div>

          {/* Serving Size Block */}
          <div className="flex gap-x-2">
            <button
              type="button"
              onClick={() =>
                setServingSize((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className="-m-2 p-2 text-stone-500 transition-all hover:-translate-y-0.5 hover:text-red-700"
            >
              <MinusCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <UserIcon className="h-6 w-6 text-stone-700" aria-hidden="true" />
            <span className="font-medium">{`${servingSize} porcij${
              correctWordEnding(servingSize) as string
            }`}</span>

            <button
              type="button"
              onClick={() => setServingSize((prev) => prev + 1)}
              className="-m-2 p-2 text-stone-500 transition-transform hover:-translate-y-0.5 hover:text-green-700"
            >
              <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* INGREDIENTS SECTION */}
      <div className="mx-auto mb-20 flex max-w-7xl items-center justify-center sm:mb-24 md:mb-28">
        <div className="flex flex-col items-center justify-center gap-8 rounded-2xl p-6 shadow-xl ring-1 ring-stone-300 sm:gap-12 sm:p-8 md:p-10 lg:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Jums reikės
          </h2>

          <div className="max-w-5xl">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2">
              {recipeData.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="flex items-center gap-x-2">
                  <CheckIcon
                    className="h-4 w-4 flex-shrink-0 text-green-700"
                    aria-hidden="true"
                  />
                  <span className="text-lg font-medium tracking-wide">{`${calcIngredientQuantity(
                    ingredient.quantity,
                    recipeData.servingSize,
                    servingSize
                  )} ${ingredient.unit} ${ingredient.name}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* PREPARATION SECTION */}
      <div className="sm:px-18 mx-auto mb-32 flex max-w-4xl flex-col justify-center gap-8 px-10 md:px-24 lg:mb-40">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-4xl">
          Paruošimas
        </h2>

        <ol className="flex list-decimal flex-col gap-y-2">
          {recipeData.preparationSteps.map((prepStep) => (
            <li key={prepStep.id} className="font-medium leading-7">
              {prepStep.name}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default RecipeDetails;
