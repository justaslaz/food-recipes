import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-700"
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
          <button className="flex w-full items-center justify-start gap-x-2 rounded-md border-0 bg-white py-1.5 pl-3 pr-24 text-sm leading-6 text-gray-400 ring-1 ring-inset ring-gray-300 hover:ring-green-500 active:ring-2">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Ieškoti...</span>
          </button>

          {/* TODO mock up below */}
          <Link href="/">My Favorites</Link>
          <Link href="/">Log In</Link>
        </Popover.Group>
      </nav>
    </header>
  );
}
