import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-transparent">
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl pb-32 pt-10 sm:pt-20 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl">
                  Skanu ir sveika!
                </h1>
                <p className="mt-6 text-lg leading-8 text-stone-600">
                  Ieškau, išsirenku, gaminu ir... valgau sveikai! <br /> Norite
                  išsaugoti savo receptą?
                  <SignedOut>
                    <Link
                      href="/sign-in"
                      className="ml-2 underline underline-offset-2 transition-colors hover:text-green-600 active:text-green-700"
                    >
                      Prisijunkite!
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link
                      href="/create-recipe"
                      className="ml-2 underline underline-offset-2 transition-colors hover:text-green-600 active:text-green-700"
                    >
                      Sukurkite ir įkelkite!
                    </Link>
                  </SignedIn>
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/recipes"
                    className="rounded-md bg-green-700 px-5 py-2 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-95"
                  >
                    Receptai
                  </Link>
                  <Link
                    href="/#popular"
                    className="font-semibold leading-6 text-stone-900 transition-colors hover:text-green-600 active:text-green-700"
                  >
                    Mūsų populiariausi <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-20 overflow-hidden shadow-lg sm:mt-24 sm:w-11/12 sm:max-w-2xl sm:rounded-2xl lg:mt-0">
            <Image
              src="/plate-food.jpg"
              width={600}
              height={400}
              alt="Plate of food"
              className="h-auto w-full object-cover"
              priority
            ></Image>
          </div>
        </div>
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-35deg] bg-inherit shadow-xl shadow-green-600/10 ring-1 ring-green-50 md:-mr-20 lg:-mr-36"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
