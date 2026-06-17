// app/components/revissant/home/RevissantHome.tsx
import {useState} from 'react';
import {WelcomeScreen} from './WelcomeScreen';
import {NewsletterPopup} from './NewsletterPopup';
import {Hero} from './Hero';
import {BestSellers} from './BestSellers';
import Features from './Features';

export type BestSellerProduct = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange?: {
    minVariantPrice?: {
      amount: string;
      currencyCode: string;
    } | null;
  } | null;
};

type RevissantHomeProps = {
  bestSellers?: BestSellerProduct[];
};

export function RevissantHome({bestSellers = []}: RevissantHomeProps) {
  const [isWelcomeDone, setIsWelcomeDone] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-[#0F2445]">
      {!isWelcomeDone && (
        <WelcomeScreen onFinished={() => setIsWelcomeDone(true)} />
      )}

      <NewsletterPopup />

      {/* Home sections */}
      <Hero />
      <BestSellers products={bestSellers} />
      <Features />
    </main>
  );
}
