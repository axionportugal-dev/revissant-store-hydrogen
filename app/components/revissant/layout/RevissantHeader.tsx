import {Suspense} from 'react';
import {Await, Link, NavLink, useMatches, useParams} from 'react-router';
import {useOptimisticCart} from '@shopify/hydrogen';

import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

import {useScrollThreshold} from '~/components/revissant/hooks/useScrollThreshold';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {
  getConceptBagTotals,
  useConceptBag,
} from '~/components/revissant/concept/bag';

type Props = {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  fallback?: React.ReactNode;
};

const NAV = [
  {label: 'Shop all', to: '/catalog'},
  {label: 'Vessels', to: '/catalog?category=vessels'},
  {label: 'Lighting', to: '/catalog?category=lighting'},
  {label: 'Fragrance', to: '/catalog?category=fragrance'},
];

export function RevissantHeader({cart}: Props) {
  const {open} = useAside();
  const matches = useMatches();
  const {locale} = useParams();

  const isHome = matches.some(
    (match) => match.id === 'routes/($locale)._index',
  );
  const localePrefix = getLocalePathPrefix(locale);
  const homePath = localePrefix || '/';

  // No topo da home o header fica transparente sobre o vídeo; depois fica sólido.
  const {isBelowThreshold} = useScrollThreshold(120);
  const solid = !isHome || !isBelowThreshold;

  return (
    <header
      className={[
        'rv-intro-header fixed inset-x-0 top-0 z-[60] transition-[background-color,color,box-shadow,backdrop-filter,opacity] duration-500',
        solid
          ? 'bg-ivory/90 text-ink backdrop-blur-md shadow-[0_1px_0_rgba(15,36,69,0.08)]'
          : 'bg-transparent text-white',
      ].join(' ')}
    >
      <div className="rv-container grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[76px]">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => open('mobile')}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-60"
          >
            <HamburgerIcon />
          </button>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={`${localePrefix}${item.to}`}
                prefetch="intent"
                className="rv-eyebrow !text-[10.5px] opacity-80 transition-opacity hover:opacity-100"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* CENTER: logotipo */}
        <Link
          to={homePath}
          aria-label="REVISSANT — home"
          className={[
            'block transition-all duration-500',
            solid
              ? 'opacity-100 translate-y-0'
              : 'pointer-events-none -translate-y-1 opacity-0',
          ].join(' ')}
        >
          <img
            src={
              solid ? '/brand/revissant-navy.png' : '/brand/revissant-white.png'
            }
            alt="REVISSANT"
            width={1580}
            height={190}
            draggable={false}
            className="h-[13px] w-auto select-none sm:h-[15px] md:h-[19px]"
          />
        </Link>

        {/* RIGHT */}
        <div className="-mr-2 flex items-center justify-end md:gap-2">
          <span className="rv-eyebrow mr-2 hidden !text-[10.5px] opacity-70 md:inline">
            EUR €
          </span>

          <IconButton label="Search" onClick={() => open('search')}>
            <SearchIcon />
          </IconButton>

          <IconButton label="Account" onClick={() => open('account')}>
            <UserIcon />
          </IconButton>

          <IconButton label="Bag" onClick={() => open('cart')}>
            <BagIcon />
            <Suspense fallback={<BagBadge cart={null} />}>
              <Await resolve={cart} errorElement={<BagBadge cart={null} />}>
                {(resolvedCart: CartApiQueryFragment | null) => (
                  <OptimisticBagBadge cart={resolvedCart} />
                )}
              </Await>
            </Suspense>
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60 md:h-10 md:w-10"
    >
      {children}
    </button>
  );
}

function OptimisticBagBadge({
  cart: originalCart,
}: {
  cart: CartApiQueryFragment | null;
}) {
  const cart = useOptimisticCart(originalCart);
  return <BagBadge cart={cart} />;
}

function BagBadge({cart}: {cart: {totalQuantity?: number | null} | null}) {
  const conceptBag = useConceptBag();
  const total =
    (cart?.totalQuantity ?? 0) + getConceptBagTotals(conceptBag).quantity;
  if (!total) return null;

  return (
    <span className="absolute right-0.5 top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-bronze px-1 text-[9px] font-medium text-white">
      {total}
    </span>
  );
}

/* ===== icons (traço fino, 1.25) ===== */

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h18M3 16h12"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="m16 16 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M4.5 20.5c1.5-3.4 4.2-5.2 7.5-5.2s6 1.8 7.5 5.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 8h14l-1 12.5H6L5 8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M9 10V6.5a3 3 0 0 1 6 0V10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
