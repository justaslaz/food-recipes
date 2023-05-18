import { useState, type ChangeEvent, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";
import { useAtom } from "jotai";
import { isOpenSearchPaletteAtom } from "~/utils/atoms";

export default function SearchPalette() {
  const [enteredInput, setEnteredInput] = useState("");
  const [isOpen, setIsOpen] = useAtom(isOpenSearchPaletteAtom);

  const router = useRouter();

  const recipesQuery = api.recipe.getByKeyword.useQuery({
    keyword: enteredInput,
  });

  const recipes = enteredInput ? recipesQuery.data : [];

  // Open/Close w/ keyboard
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen, setIsOpen]);

  const handlePageNavigation = (recipeId: string) => {
    setIsOpen(false);
    void router.push(`/recipes/${recipeId}`);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredInput(event.target.value);
  };

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
          <Combobox
            as="div"
            onChange={handlePageNavigation}
            className="relative mx-auto max-w-xl divide-y divide-stone-100 overflow-hidden rounded-xl bg-stone-50 shadow-2xl ring-1 ring-stone-950/5"
          >
            <div className="flex items-center gap-x-1 px-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-stone-500" />
              <Combobox.Input
                placeholder="Ieškoti..."
                onChange={handleInput}
                className="h-12 w-full border-0 bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:ring-0"
              />
            </div>
            {recipes && recipes.length > 0 && (
              <Combobox.Options className="max-h-96 overflow-y-auto pb-2 pt-4">
                {recipes.map((recipe) => (
                  <Combobox.Option key={recipe.id} value={recipe.id}>
                    {({ active }) => (
                      <div
                        className={`flex items-center gap-x-4 px-4 py-2 text-stone-700 ${
                          active ? "cursor-pointer bg-green-700 text-white" : ""
                        }`}
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
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {enteredInput && recipes?.length === 0 && (
              <p className="p-4 text-sm text-stone-500">
                Deja, pagal pateiktą užklausą, neradome jokių receptų.
              </p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
