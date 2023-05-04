import { useState } from 'react';
import { Popover } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import ReceptaiPopover from './ReceptaiPopover';
import LinkLogo from '../General/LinkLogo';
import MobileMenu from './MobileMenu';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log(isMobileMenuOpen);

  return (
    <header className="bg-white">
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
        <Popover.Group className="hidden lg:flex lg:w-3/4 lg:items-center lg:justify-between lg:gap-x-24">
          <div className="flex items-center lg:gap-x-6">
            <ReceptaiPopover />

            {/* Search Button */}
            <button
              type="button"
              className="inline-flex w-full items-center justify-start gap-x-2 rounded-md border-0 bg-white py-1.5 pl-3 pr-32 text-sm leading-6 text-stone-400 ring-1 ring-inset ring-stone-300 hover:ring-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:ring-2 xl:pr-72"
            >
              <MagnifyingGlassIcon
                className="h-5 w-5 text-stone-400"
                aria-hidden="true"
              />
              <span>Ieškoti...</span>
            </button>
          </div>

          <div className="flex items-center lg:gap-x-6">
            {/* My Favorites Button */}
            <button
              type="button"
              className="group inline-flex items-center gap-x-1.5 rounded-md p-1 transition-colors hover:underline hover:underline-offset-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <div className="relative transition-all group-hover:scale-105 group-hover:text-red-800 group-active:scale-90">
                <HeartIcon className="h-9 w-9" aria-hidden="true" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                  2
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
            <button
              type="button"
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
            </button>
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
