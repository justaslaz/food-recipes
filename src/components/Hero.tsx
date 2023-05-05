import Image from 'next/image';
import Link from 'next/link';
import foodPlate from '../../public/plate-food.jpg';

export default function Hero() {
  return (
    <section className="bg-inherit">
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:mb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl">
                  Skanu ir sveika!
                </h1>
                <p className="mt-6 text-lg leading-8 text-stone-600">
                  Ieškau, išsirenku, gaminu ir... valgau sveikai! <br /> Norite
                  išsaugoti savo receptą? Prisijunkite!
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  {/* TODO add href */}
                  <Link
                    href="/"
                    className="rounded-md bg-green-600 px-5 py-2 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-95"
                  >
                    Receptai
                  </Link>
                  {/* TODO add href */}
                  <Link
                    href="/"
                    className="font-semibold leading-6 text-stone-900 transition-colors hover:text-green-600"
                  >
                    Mūsų populiariausi <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 mt-20 overflow-hidden rounded-2xl shadow-lg sm:mt-24 sm:max-w-2xl md:mx-auto lg:mt-0">
            <Image
              src={foodPlate}
              width={600}
              height={400}
              alt="Plate of food"
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
