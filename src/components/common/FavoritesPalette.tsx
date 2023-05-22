import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import { useAtom } from "jotai";
import { isOpenFavoritesPaletteAtom } from "~/utils/atoms";
import Link from "next/link";

export default function FavoritesPalette() {
  const [isOpen, setIsOpen] = useAtom(isOpenFavoritesPaletteAtom);

  const recipesQuery = api.recipe.getAllUserFavorites.useQuery();

  const recipes = recipesQuery.data;

  return (
    <Transition.Root show={isOpen} as={Fragment} appear>
      <Dialog
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-20 overflow-y-auto p-4 pt-[25vh]"
      >
        {/* Overlay */}
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-stone-600/75" />
        </Transition.Child>

        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 -translate-x-full"
        >
          <div className="relative mx-auto max-w-xl divide-y divide-stone-100 overflow-hidden rounded-xl bg-stone-50 shadow-2xl ring-1 ring-stone-950/5">
            {recipes && recipes.length > 0 && (
              <ul className="max-h-96 overflow-y-auto">
                {recipes.map((recipe) => (
                  <li key={recipe.id} value={recipe.id}>
                    <Link
                      href={`/recipes/${recipe.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div
                        className="flex items-center gap-x-4 px-4 py-2 text-stone-700 
                      hover:cursor-pointer hover:bg-green-700 hover:text-white"
                      >
                        <Image
                          src={recipe.imageUrl}
                          alt={recipe.name}
                          height={100}
                          width={100}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <span className="font-semibold tracking-wide">
                          {recipe.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {(!recipes || recipes.length === 0) && (
              <div className="p-4 text-sm leading-7 text-stone-600">
                <h3 className="mb-4 text-center text-base font-semibold">
                  Norite išsaugoti receptą?
                </h3>
                <ol className="list-inside list-decimal">
                  <li>
                    <Link
                      href="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="underline underline-offset-2"
                    >
                      Prisijunkite
                    </Link>
                  </li>
                  <li>Išsirinkite receptą, kurį norite išsaugoti</li>
                  <li>
                    Spauskite ant širdelės (nuotraukos viršutiniame dešiniajame
                    kampe)
                  </li>
                </ol>
              </div>
            )}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
