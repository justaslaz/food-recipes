import { type NextPage } from "next";
import { useRouter } from "next/router";
import RecipeCard from "~/components/search-results/RecipeCard";
import { api } from "~/utils/api";

// Page
const SearchResults: NextPage = () => {
  const { query } = useRouter();

  const recipesQuery = api.example.getByCategory.useQuery({
    categoryName: query.categoryName?.toString(),
  });

  // Title
  const titleWords = query.categoryName
    ? `Paieška: ${query.categoryName.toString()}`
    : "Rodomi visi receptai";
  const foundResultsAmount = recipesQuery.data?.length ?? 0;

  return (
    <>
      <div className="mx-auto max-w-7xl px-8 pt-12 sm:pt-16">
        <p className="text-center text-xl font-semibold sm:text-3xl">{`${titleWords} (${foundResultsAmount})`}</p>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* LAYOUT - RECIPES LIST */}
        <div className="mb-10 flex flex-wrap justify-center gap-y-10 sm:gap-x-10 lg:mb-14 lg:gap-14">
          {recipesQuery.data?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              cookingTime={recipe.cookingTime}
            />
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
              rezultatai iš{" "}
              <span className="font-medium">{foundResultsAmount}</span>
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
};

export default SearchResults;
