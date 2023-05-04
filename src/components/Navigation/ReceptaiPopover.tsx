import { Fragment } from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const TAGS_MOCKUP = ['Break', 'Random', 'OMG'];

export default function ReceptaiPopover() {
  return (
    <Popover className="relative">
      {/* Receptai Button */}
      <Popover.Button className="flex items-center gap-x-1 rounded-md text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600">
        Receptai
        <ChevronDownIcon
          className="h-5 w-5 flex-none text-stone-400"
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
        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-stone-900/5">
          <div className="p-2">
            {TAGS_MOCKUP.map((category) => (
              // TODO fix href
              <Link
                key={category}
                href="/"
                className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 hover:bg-stone-50"
              >
                {category}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center bg-stone-50 p-3 text-sm font-semibold leading-6 hover:bg-stone-100">
            {/* TODO fix href */}
            <Link href="/">Rodyti visus receptus</Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
