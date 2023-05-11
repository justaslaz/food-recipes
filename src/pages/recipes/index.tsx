import { mockupData } from "~/components/Testing";
import { ClockIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

// TODO length should be calculated from DB response, category should come as a prop?
const searchResultsProps = {
  categoryName: "Breakfast",
  resultLength: 8,
};

export default function SearchResults() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-8 pt-12 sm:pt-16">
        <p className="text-center text-xl font-semibold sm:text-3xl">{`Paieška: ${searchResultsProps.categoryName} (${searchResultsProps.resultLength})`}</p>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* GRID LAYOUT */}
        <div className="mb-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:mb-14 lg:grid-cols-3 lg:gap-14">
          {mockupData.map((recipe) => (
            // RECIPE CARD
            <div
              key={recipe.id}
              className="group relative flex h-96 w-72 flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm"
            >
              {/* Image */}
              <figure className="h-48 w-full group-hover:opacity-75">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.name}
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
                {recipe.categories.map((category) => (
                  <div
                    key={category}
                    className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                  >
                    <span>{category}</span>
                  </div>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-center text-lg font-semibold leading-7 tracking-wide">
                {recipe.name}
              </h3>

              {/* CTA */}
              <div className="mb-3 mt-auto flex flex-col items-center justify-center gap-y-2 text-stone-500">
                <div className="flex items-center justify-center gap-x-2">
                  <ClockIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium">{`${recipe.time} min`}</span>
                </div>

                <Link
                  href={`/recipes/${recipe.id}`}
                  className="rounded-md bg-green-700 px-10 py-1 font-semibold text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-95"
                >
                  Gaminti
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <nav
          className="flex items-center justify-between gap-x-10 py-3 md:gap-x-16 lg:gap-x-28"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            {/* TODO make count of shown results dynamic */}
            <p className="text-sm">
              Rodomi <span className="font-medium">1 - 9</span> paieškos
              rezultatai iš <span className="font-medium">9</span>
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end">
            {/* TODO create logic of pagination */}
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 ring-1 ring-inset ring-stone-300 hover:bg-stone-50 focus-visible:outline-offset-0"
            >
              Buvęs puslapis
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 ring-1 ring-inset ring-stone-300 hover:bg-stone-50 focus-visible:outline-offset-0"
            >
              Kitas puslapis
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
