// app/components/revissant/home/RevissantHome.tsx
import {useEffect, useState} from 'react';
import {appBoot} from '~/components/revissant/utils/appBoot';
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

export function RevissantHome() {
  // O intro só toca no carregamento inicial do documento; numa navegação
  // client-side para a home o hero entra diretamente.
  const [isDocumentLoad] = useState(() => !appBoot.done);

  useEffect(() => {
    if (!isDocumentLoad) {
      document.documentElement.setAttribute('data-intro-seen', 'returning');
    }
  }, [isDocumentLoad]);

  return (
    <div className="flex flex-col bg-ivory">
      {isDocumentLoad ? <WelcomeScreen /> : null}

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
