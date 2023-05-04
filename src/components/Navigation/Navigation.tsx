import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
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
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <ReceptaiPopover />
          {/* Search Pop-Up */}

          {/* TODO mock up below */}
          <Link href="/">Search</Link>
          <Link href="/">My Favorites</Link>
          <Link href="/">Log In</Link>
        </Popover.Group>
      </nav>
    </header>
  );
}
