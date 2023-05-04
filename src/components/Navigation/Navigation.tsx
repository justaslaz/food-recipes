import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import logo from '../../../public/Chef_Outline.svg';
import ReceptaiPopover from './ReceptaiPopover';

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
          <Link href="/">
            <span className="sr-only">Food Recipes</span>
            <Image className="h-16 w-auto" src={logo} alt="Food Recipes Logo" />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-stone-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Whole Navigation ex. Logo */}
        <Popover.Group className="hidden lg:flex lg:items-center lg:justify-center lg:gap-x-12">
          <ReceptaiPopover />

          {/* Search Button */}
          <button
            type="button"
            className="inline-flex w-full items-center justify-start gap-x-2 rounded-md border-0 bg-white py-1.5 pl-3 pr-24 text-sm leading-6 text-stone-400 ring-1 ring-inset ring-stone-300 hover:ring-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:ring-2"
          >
            <MagnifyingGlassIcon
              className="h-5 w-5 text-stone-400"
              aria-hidden="true"
            />
            <span>Ieškoti...</span>
          </button>

          {/* My Favorites Button */}
          <button
            type="button"
            className="group inline-flex items-center gap-x-1.5 rounded-md p-1 transition-colors hover:underline hover:underline-offset-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <div className="relative transition-all group-hover:scale-105 group-hover:text-red-700/80 group-active:scale-90">
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

          {/* TODO mock up below */}

          <Link href="/">Log In</Link>
        </Popover.Group>
      </nav>
    </header>
  );
}
