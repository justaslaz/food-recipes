import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingSpinner from "~/components/common/LoadingSpinner";
import RecipeCard from "~/components/search-results/RecipeCard";
import { api } from "~/utils/api";

// Page
const SearchResults: NextPage = () => {
  const { query, push } = useRouter();
  const [pageNum, setPageNum] = useState(1);

  const { data: recipesData, isLoading } = api.recipe.getByCategory.useQuery({
    categoryName: query.categoryName?.toString(),
    pageNum: pageNum,
  });

  if (isLoading) return <LoadingSpinner size="large" />;
  if (!recipesData) return <div>Oops, something went wrong!</div>;

  const navigateTop = () => void push("/recipes");

  // Title
  const titleWords = query.categoryName
    ? `Paieška: ${query.categoryName.toString()}`
    : "Rodomi visi receptai";
  const foundResultsAmount = recipesData?.length ?? 0;

  return (
    <>
      <div className="mx-auto max-w-7xl px-8 pt-12 sm:pt-16">
        <p className="text-center text-xl font-semibold sm:text-3xl">{`${titleWords} (${foundResultsAmount})`}</p>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* LAYOUT - RECIPES LIST */}
        <div className="mb-10 flex flex-wrap justify-center gap-10 lg:mb-14 lg:gap-14">
          {recipesData?.recipes?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              cookingTime={recipe.cookingTime}
              categories={recipe.categories}
              favorite={recipe.favoriteBy}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <nav
          className="flex items-center justify-between gap-x-10 py-3 md:gap-x-16 lg:gap-x-28"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm">
              Rodomi {/* Results from X */}
              <span className="font-medium">{pageNum * 9 - 8}</span> -{" "}
              {/* Results to Y */}
              <span className="font-medium">
                {pageNum * 9 < foundResultsAmount
                  ? pageNum * 9
                  : foundResultsAmount}
              </span>{" "}
              paieškos rezultatai iš{" "}
              <span className="font-medium">{foundResultsAmount}</span>
            </p>
          </div>
          {/* Buttons visible only when the page is not FIRST or LAST */}
          {(pageNum > 1 || pageNum * 9 < foundResultsAmount) && (
            <div className="flex items-center justify-center sm:justify-end">
              {pageNum > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setPageNum((prev) => prev - 1);
                    navigateTop();
                  }}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 ring-1 ring-inset ring-stone-300 hover:bg-stone-50 focus-visible:outline-offset-0"
                >
                  Buvęs puslapis
                </button>
              )}
              {pageNum * 9 < foundResultsAmount && (
                <button
                  type="button"
                  onClick={() => {
                    setPageNum((prev) => prev + 1);
                    navigateTop();
                  }}
                  className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 ring-1 ring-inset ring-stone-300 hover:bg-stone-50 focus-visible:outline-offset-0"
                >
                  Kitas puslapis
                </button>
              )}
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default SearchResults;
