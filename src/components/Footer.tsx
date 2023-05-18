import { useSetAtom } from "jotai";
import Link from "next/link";
import { isOpenSearchPaletteAtom } from "~/utils/atoms";

export default function Footer() {
  const setIsOpenSearchPalette = useSetAtom(isOpenSearchPaletteAtom);

  return (
    <footer className="bg-transparent">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 pb-16 lg:px-8">
        <hr className="mb-12 border-stone-500/10 sm:mx-auto lg:my-8" />
        <nav
          className="-mb-6 columns-2 text-center sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {/* Pradžia */}
          <div className="pb-6">
            <Link
              href="/"
              className="text-sm leading-6 text-stone-600/80 hover:text-stone-900/80"
            >
              Pradžia
            </Link>
          </div>

          {/* Receptai */}
          <div className="pb-6">
            {/* TODO add href */}
            <Link
              href="/"
              className="text-sm leading-6 text-stone-600/80 hover:text-stone-900/80"
            >
              Receptai
            </Link>
          </div>

          {/* Paieška */}
          <div className="pb-6">
            {/* TODO add onClick */}
            <button
              type="button"
              onClick={() => setIsOpenSearchPalette(true)}
              className="text-sm leading-6 text-stone-600/80 hover:text-stone-900/80"
            >
              Paieška
            </button>
          </div>

          {/* Mėgstamiausi */}
          <div className="pb-6">
            {/* TODO add onClick */}
            <button
              type="button"
              className="text-sm leading-6 text-stone-600/80 hover:text-stone-900/80"
            >
              Mėgstamiausi
            </button>
          </div>
        </nav>

        <p className="mt-10 text-center text-xs leading-5 text-stone-500/70">
          &copy; {new Date().getFullYear()} Justas Laževnikas. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
