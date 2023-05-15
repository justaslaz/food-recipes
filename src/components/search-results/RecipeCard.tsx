import { ClockIcon, HeartIcon } from "@heroicons/react/24/outline";
import { type Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export default function RecipeCard({
  id,
  name,
  imageUrl,
  cookingTime,
}: Pick<Recipe, "id" | "name" | "imageUrl" | "cookingTime">) {
  const categoriesQuery = api.categories.getByRecipe.useQuery({
    recipeId: id,
  });

  return (
    <div className="group relative flex h-96 w-72 flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
      {/* Image */}
      <figure className="h-48 w-full group-hover:opacity-75">
        <Image
          src={imageUrl}
          alt={name}
          height={500}
          width={750}
          className="h-48 w-full object-cover"
        />
      </figure>

      {/* Favorite Icon */}
      <div className="absolute right-2 top-2 transition-all hover:scale-105 active:scale-90">
        <button type="button">
          {/* TODO initial value from DB favorite or not, TODO onClick changing favorite state in DB */}
          <HeartIcon
            className="h-8 w-8 text-stone-700 transition-all duration-300 hover:scale-125 hover:fill-red-600 hover:text-red-700"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Categories */}
      <div className="mb-4 flex gap-x-1.5 p-1.5">
        {categoriesQuery.data?.map((category) => (
          <div
            key={category.id}
            className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          >
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-center text-lg font-semibold leading-7 tracking-wide">
        {name}
      </h3>

      {/* CTA */}
      <div className="mb-3 mt-auto flex flex-col items-center justify-center gap-y-2 text-stone-500">
        <div className="flex items-center justify-center gap-x-2">
          <ClockIcon className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-medium">{`${cookingTime} min`}</span>
        </div>

        <Link
          href={`/recipes/${id}`}
          className="rounded-md bg-green-700 px-10 py-1 font-semibold text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-95"
        >
          Gaminti
        </Link>
      </div>
    </div>
  );
}
