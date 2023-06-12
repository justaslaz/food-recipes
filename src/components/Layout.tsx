import { Nunito } from "next/font/google";
import Navigation from "~/components/navigation/Navigation";

import Footer from "./Footer";
import FavoritesPalette from "./common/FavoritesPalette";
import SearchPalette from "./common/SearchPalette";

const nunito = Nunito({ subsets: ["latin"] });

type ComponentProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: ComponentProps) {
  return (
    <div className={`flex min-h-screen flex-col ${nunito.className}`}>
      <SearchPalette />
      <FavoritesPalette />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
