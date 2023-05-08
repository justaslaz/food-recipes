import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation/Navigation';
import Popular from '@/components/Popular';
import SearchSection from '@/components/SearchSection';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={`flex min-h-screen flex-col ${nunito.className}`}>
        <Hero />
        <Popular />
        <SearchSection />
      </main>
      <Footer />
    </>
  );
}
