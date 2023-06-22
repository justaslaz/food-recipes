import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { Popover } from "@headlessui/react";
import {
  Bars3Icon,
  DocumentPlusIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import LinkLogo from "~/components/common/LinkLogo";
import { api } from "~/utils/api";
import {
  isOpenFavoritesPaletteAtom,
  isOpenSearchPaletteAtom,
} from "~/utils/atoms";

import MobileMenu from "./MobileMenu";
import ReceptaiPopover from "./ReceptaiPopover";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const setIsOpenSearchPalette = useSetAtom(isOpenSearchPaletteAtom);
  const setIsOpenFavoritesPalette = useSetAtom(isOpenFavoritesPaletteAtom);

  const favoritesCountQuery = api.recipe.getLengthOfUserFavorites.useQuery();

  // Handle cache data when logging in and out
  const trpc = api.useContext();
  const { isSignedIn } = useAuth();
  useEffect(() => {
    void (async () => {
      await trpc.invalidate();
    })();
  }, [isSignedIn, trpc]);

  return (
    <header className="sticky top-0 z-10 border-b border-b-stone-100 bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <LinkLogo />
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-stone-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open mobile menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Whole Navigation ex. Logo */}
        <Popover.Group className="hidden lg:flex lg:w-3/4 lg:items-center lg:gap-x-16">
          <div className="flex flex-1 items-center lg:gap-x-6">
            <ReceptaiPopover />

            {/* Search Button */}
            <button
              type="button"
              onClick={() => setIsOpenSearchPalette(true)}
              className="mx-auto flex w-full max-w-xl place-items-center gap-x-2 rounded-md border-0 bg-white px-3 py-2 text-sm text-stone-400 ring-1 ring-inset ring-stone-300 hover:ring-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:ring-2"
            >
              <MagnifyingGlassIcon
                className="h-5 w-5 text-stone-400"
                aria-hidden="true"
              />
              <span>Ieškoti...</span>
              <span className="ml-auto flex-none pl-3 text-sm font-medium">
                ⌘ K
              </span>
            </button>
          </div>

          <div className="ml-auto flex items-center lg:gap-x-6">
            {/* My Favorites Button */}
            <button
              type="button"
              onClick={() => {
                console.log("clicked");
                setIsOpenFavoritesPalette(true);
              }}
              className="group inline-flex items-center gap-x-1.5 rounded-md p-1 transition-colors hover:underline hover:underline-offset-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <div className="relative transition-all group-hover:scale-105 group-hover:text-red-800 group-active:scale-90">
                <HeartIcon className="h-9 w-9" aria-hidden="true" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                  {favoritesCountQuery.data ? favoritesCountQuery.data : ""}
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-xs font-normal">Mano</span>
                <span className="text-sm font-medium tracking-wider">
                  Mėgstami
                </span>
              </div>
            </button>

            {/* Log In / Register Button */}
            <SignedOut>
              <Link
                href="/sign-in"
                className="group inline-flex items-center gap-x-1.5 rounded-md p-1 transition-colors hover:underline hover:underline-offset-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <div className="transition-transform group-hover:scale-105 group-active:scale-90">
                  <UserIcon className="h-9 w-9" aria-hidden="true" />
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-xs font-normal">Registracija</span>
                  <span className="text-sm font-medium tracking-wider">
                    Prisijungimas
                  </span>
                </div>
              </Link>
            </SignedOut>

            <SignedIn>
              {/* Create New Recipe Button */}
              <Link
                href="/create-recipe"
                className="group inline-flex items-center gap-x-1.5 rounded-md p-1 transition-colors hover:underline hover:underline-offset-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <div className="transition-transform group-hover:scale-105 group-active:scale-90">
                  <DocumentPlusIcon className="h-9 w-9" aria-hidden="true" />
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-xs font-normal">Naujas</span>
                  <span className="text-sm font-medium tracking-wider">
                    Receptas
                  </span>
                </div>
              </Link>

              {/* Clerk User Account Button */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            {/*  */}
          </div>
        </Popover.Group>
      </nav>

      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
