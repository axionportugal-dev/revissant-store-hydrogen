// app/components/revissant/home/RevissantHome.tsx
import {useEffect, useState} from 'react';
import {WelcomeScreen} from './WelcomeScreen';
import {Hero} from './Hero';
import {Marquee} from './Marquee';
import {CategoryGrid} from './CategoryGrid';
import {BestSellers} from './BestSellers';
import {Manifesto} from './Manifesto';
import {Craft} from './Craft';
import {Rituals} from './Rituals';
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

const WELCOME_SESSION_KEY = 'revissant:welcome-seen';

export function RevissantHome() {
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);

  useEffect(() => {
    try {
      setShouldShowWelcome(
        window.sessionStorage.getItem(WELCOME_SESSION_KEY) !== 'true',
      );
    } catch {
      setShouldShowWelcome(false);
    }
  }, []);

  function handleWelcomeFinished() {
    try {
      window.sessionStorage.setItem(WELCOME_SESSION_KEY, 'true');
    } catch {
      // If storage is unavailable, still unblock the storefront for this render.
    }
    setShouldShowWelcome(false);
  }

  return (
    <div className="flex flex-col bg-ivory">
      {shouldShowWelcome ? (
        <WelcomeScreen onFinished={handleWelcomeFinished} />
      ) : null}

      <Hero />
      <Marquee />
      <CategoryGrid />
      <BestSellers />
      <Manifesto />
      <Craft />
      <Rituals />
      <Features />
    </div>
  );
}
