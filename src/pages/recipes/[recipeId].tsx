import Image from 'next/image';

import { mockupData } from '@/components/Testing';
import {
  CheckIcon,
  ClockIcon,
  HeartIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { correctWordEnding } from '@/helpers/correctWordEnding';

type ComponentProps = {
  // onClick: MouseEventHandler;
  // children?: React.ReactNode;
};

export default function RecipeDetails({}: ComponentProps) {
  return (
    <>
      {/* IMAGE SECTION */}
      <div className="relative mx-auto mb-8 max-w-7xl overflow-hidden sm:mb-10 md:mb-12">
        <Image
          src={mockupData.imageUrl}
          alt={mockupData.name}
          height={500}
          width={750}
          priority
          className="h-96 w-full object-cover contrast-50"
        />

        {/* Categories */}
        <div className="absolute bottom-4 left-4 flex gap-x-4">
          {mockupData.categories.map((category) => (
            <div
              key={category}
              className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            >
              <span>{category}</span>
            </div>
          ))}
        </div>

        {/* Favorite Icon */}
        <div className="absolute right-4 top-4 transition-all hover:scale-105 active:scale-90">
          <button type="button">
            {/* TODO initial value from DB favorite or not, TODO onClick changing favorite state in DB */}
            <HeartIcon
              className="h-10 w-10 text-stone-700 transition-all duration-300 hover:scale-125 hover:fill-red-600 hover:text-red-700"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="mx-auto mb-14 flex max-w-7xl flex-col items-center justify-center gap-8 sm:mb-16 sm:gap-12 md:mb-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {mockupData.name}
        </h1>

        <div className="flex gap-x-20">
          {/* Time Block */}
          <div className="flex gap-x-2">
            <ClockIcon className="h-6 w-6 text-stone-700" aria-hidden="true" />
            <span className="font-medium">{`${mockupData.time} min`}</span>
          </div>

          {/* Serving Size Block */}
          <div className="flex gap-x-2">
            <button
              type="button"
              className="-m-2 p-2 text-stone-500 transition-all hover:-translate-y-0.5 hover:text-red-700"
            >
              <MinusCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <UserIcon className="h-6 w-6 text-stone-700" aria-hidden="true" />
            <span className="font-medium">{`${
              mockupData.servingsDef
            } porcij${correctWordEnding(mockupData.servingsDef)}`}</span>

            <button
              type="button"
              className="-m-2 p-2 text-stone-500 transition-transform hover:-translate-y-0.5 hover:text-green-700"
            >
              <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* INGREDIENTS SECTION */}
      <div className="mx-auto mb-20 flex max-w-7xl items-center justify-center sm:mb-24 md:mb-28">
        <div className="flex flex-col items-center justify-center gap-8 rounded-2xl p-6 shadow-xl ring-1 ring-stone-300 sm:gap-12 sm:p-8 md:p-10 lg:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Jums reikės
          </h2>

          <div className="max-w-5xl">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2">
              {mockupData.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="flex items-center gap-x-2">
                  <CheckIcon
                    className="h-4 w-4 flex-shrink-0 text-green-700"
                    aria-hidden="true"
                  />
                  <span className="text-lg font-medium tracking-wide">{`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* PREPARATION SECTION */}
      <div className="sm:px-18 mx-auto mb-32 flex max-w-4xl flex-col justify-center gap-8 px-10 md:px-24 lg:mb-40">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-4xl">
          Paruošimas
        </h2>

        <ol className="flex list-decimal flex-col gap-y-2">
          {mockupData.preparation.map((prepStep) => (
            <li key={prepStep} className="font-medium leading-7">
              {prepStep}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
