import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation/Navigation';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Navigation />
      <main
        className={`flex min-h-screen flex-col items-center justify-between ${nunito.className}`}
      >
        <Hero />
      </main>
      <Footer />
    </>
  );
}
