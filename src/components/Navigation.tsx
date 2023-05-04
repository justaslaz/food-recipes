import { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import logo from '../../public/Chef_Outline.svg';

const TAGS_MOCKUP = ['Break', 'Random', 'OMG'];

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
          <Popover className="relative">
            {/* Receptai Button */}
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Receptai
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            {/* Receptai Pop-Up Panel */}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-2">
                  {TAGS_MOCKUP.map((category) => (
                    // TODO fix href
                    <Link
                      key={category}
                      href="/"
                      className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-center bg-gray-50 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                  {/* TODO fix href */}
                  <Link href="/">Rodyti visus receptus</Link>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

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
