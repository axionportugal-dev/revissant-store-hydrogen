// app/components/revissant/home/RevissantHome.tsx
import {useEffect, useRef, useState} from 'react';
import {WelcomeScreen} from './WelcomeScreen';
import {NewsletterPopup} from './NewsletterPopup';
import {Hero} from './Hero';
import {BestSellers} from './BestSellers';
import Features from './Features';

type BestSellerProduct = {
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
  bestSellers: BestSellerProduct[];
};

export function RevissantHome({bestSellers}: RevissantHomeProps) {
  const [isWelcomeDone, setIsWelcomeDone] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const hasShownNewsletterRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isWelcomeDone && !hasShownNewsletterRef.current) {
        hasShownNewsletterRef.current = true;
        setIsNewsletterOpen(true);
      }
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isWelcomeDone]);

  return (
    <main className="min-h-screen bg-white">
      {!isWelcomeDone && (
        <WelcomeScreen onFinished={() => setIsWelcomeDone(true)} />
      )}

      <NewsletterPopup
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      {/* Home sections */}
      <Hero />
      <BestSellers products={bestSellers} />
      <Features />
    </main>
  );
}
