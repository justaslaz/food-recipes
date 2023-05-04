import { useState } from 'react';
import { Dialog, Disclosure, Popover } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import ReceptaiPopover from './ReceptaiPopover';
import LinkLogo from '../General/LinkLogo';
import Link from 'next/link';

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

      <Dialog
        as="div"
        className="lg:hidden"
        open={isMobileMenuOpen}
        onClose={setIsMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10 bg-stone-500/50 backdrop-blur" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-scroll bg-white px-6 sm:max-w-sm sm:ring-1 sm:ring-stone-900/10">
          <div className="flex items-center justify-between">
            <LinkLogo />
            <button
              type="button"
              className="-m-2 rounded-md p-2 text-stone-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Close mobile menu</span>
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
                      className={`h-5 w-5 flex-none ${open && 'rotate-180'}`}
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="my-2 space-y-2">
                    {TAGS_MOCKUP.map((category) => (
                      // TODO add correct href
                      <Disclosure.Button
                        key={category}
                        as={Link}
                        href="/"
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-stone-900 hover:bg-stone-50"
                      >
                        {category}
                      </Disclosure.Button>
                    ))}
                    <Disclosure.Button
                      as={Link}
                      href="/"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-stone-900 hover:bg-stone-50"
                    >
                      Rodyti visus receptus
                    </Disclosure.Button>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Paieška Button */}
            <div className="-mx-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
              >
                Paieška
              </button>
            </div>

            {/* Mėgstamiausi Button */}
            <div className="-mx-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
              >
                Mėgstamiausi
              </button>
            </div>

            <div className="-mx-3 my-3 flex flex-col border-t border-stone-500/10">
              {/* TODO add href */}
              <Link
                href="/"
                className="mt-3 w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
              >
                Prisijungimas
              </Link>
              <Link
                href="/"
                className="w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-stone-50"
              >
                Registracija
              </Link>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
