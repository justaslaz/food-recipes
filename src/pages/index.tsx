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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Popular />
      <SearchSection />
    </>
  );
};

export default Home;
