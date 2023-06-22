import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Dialog, Disclosure } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { api } from "~/utils/api";
import {
  isOpenFavoritesPaletteAtom,
  isOpenSearchPaletteAtom,
} from "~/utils/atoms";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const { data: categoriesArr } = api.categories.getAll.useQuery();
  const setIsOpenSearchPalette = useSetAtom(isOpenSearchPaletteAtom);
  const setIsOpenFavoritesPaletteAtom = useSetAtom(isOpenFavoritesPaletteAtom);

  const handleSearchPaletteOpening = () => {
    setIsOpenSearchPalette(true);
    onClose();
  };
  const handleFavoritePaletteOpening = () => {
    setIsOpenFavoritesPaletteAtom(true);
    onClose();
  };

  return (
    <Dialog as="div" className="lg:hidden" open={open} onClose={onClose}>
      <div className="fixed inset-0 z-10 bg-stone-500/50 backdrop-blur" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-scroll bg-white px-6 sm:max-w-sm sm:ring-1 sm:ring-stone-900/10">
        <div className="h-16 flex items-center justify-end">
          <button
            type="button"
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-stone-700"
            onClick={onClose}
          >
            <span className="sr-only">Open/Close mobile menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          {/* Receptai Drop-down */}
          <Disclosure as="div" className="-mx-3">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50">
                  Receptai
                  <ChevronDownIcon
                    className={`h-5 w-5 flex-none ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="my-2 space-y-2">
                  {categoriesArr?.map((category) => (
                    <Disclosure.Button
                      key={category.id}
                      as={Link}
                      href={{
                        pathname: "/recipes",
                        query: { categoryName: category.name },
                      }}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-stone-900 hover:bg-stone-50"
                      onClick={onClose}
                    >
                      {category.name}
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button
                    as={Link}
                    href="/recipes"
                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-stone-900 hover:bg-stone-50"
                    onClick={onClose}
                  >
                    Rodyti visus receptus
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Paieška Button */}
          <div className="-mx-3">
            {/* TODO add search functionality, open modal on click */}
            <button
              type="button"
              onClick={handleSearchPaletteOpening}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
            >
              Paieška
            </button>
          </div>

          {/* Mėgstamiausi Button */}
          <div className="-mx-3">
            {/* TODO add favorites functionality, open modal on click */}
            <button
              type="button"
              onClick={handleFavoritePaletteOpening}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
            >
              Mėgstamiausi
            </button>
          </div>

          <div className="-mx-3 my-3 flex flex-col border-t border-stone-500/10">
            <SignedIn>
              <Link
                href="/create-recipe"
                className="mt-3 w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
                onClick={onClose}
              >
                Sukurti naują receptą
              </Link>
              <div className="px-3 py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="mt-3 w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
                onClick={onClose}
              >
                Prisijungimas
              </Link>
              <Link
                href="/sign-up"
                className="w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
                onClick={onClose}
              >
                Registracija
              </Link>
            </SignedOut>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
