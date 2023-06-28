import { type NextPage } from "next";
import Head from "next/head";
import Hero from "~/components/home-page/Hero";
import Popular from "~/components/home-page/Popular";
import SearchSection from "~/components/home-page/SearchSection";

// Page
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Skanu ir sveika!</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />

        {/* Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#16a34a" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#16a34a" />
      </Head>
      <Hero />
      <Popular />
      <SearchSection />
    </>
  );
};

export default Home;
