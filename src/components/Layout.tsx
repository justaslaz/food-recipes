import Footer from "./Footer";
import Navigation from "~/components/navigation/Navigation";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

type ComponentProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: ComponentProps) {
  return (
    <div className={`flex min-h-screen flex-col ${nunito.className}`}>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
