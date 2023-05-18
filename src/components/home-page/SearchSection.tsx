import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import { isOpenSearchPaletteAtom } from "~/utils/atoms";

export default function SearchSection() {
  const setIsOpenSearchPalette = useSetAtom(isOpenSearchPaletteAtom);

  return (
    <section className="mt-8 bg-transparent pb-32 lg:pb-40">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-green-900 to-green-950 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-stone-200 sm:text-4xl">
            Dar neišsirinkote?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-lg text-stone-300">
            Pasinaudokite paieška!
          </p>

          <button
            type="button"
            onClick={() => setIsOpenSearchPalette(true)}
            className="group mx-auto mt-10 flex w-full max-w-md gap-x-4 rounded-md border-0 bg-white/5 px-3 py-2 text-stone-400 shadow-sm ring-1 ring-inset ring-white/10 transition-all hover:ring-stone-200 focus:ring-stone-200 active:scale-95 sm:text-sm sm:leading-6"
          >
            <MagnifyingGlassIcon
              className="h-5 w-5 transition-transform group-hover:scale-105"
              aria-hidden="true"
            />
            <span className="transition-transform group-hover:scale-105">
              Ieškoti...
            </span>
          </button>

          {/* circle glow background effect */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient
                id="759c1415-0410-454c-8f7c-9a820de03641"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#dcfce7" />
                <stop offset={1} stopColor="#86efac" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
