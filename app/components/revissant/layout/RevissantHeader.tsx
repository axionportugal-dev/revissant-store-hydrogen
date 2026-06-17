import {Suspense} from 'react';
import {Await, Link, useMatches, useParams} from 'react-router';
import {useOptimisticCart} from '@shopify/hydrogen';

import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

import {useScrollThreshold} from '~/components/revissant/hooks/useScrollThreshold';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';

type Props = {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  fallback?: React.ReactNode;
};

export function RevissantHeader({cart}: Props) {
  const {open} = useAside();
  const matches = useMatches();
  const {locale} = useParams();

  const isHome = matches.some((match) => match.id === 'routes/($locale)._index');
  const homePath = getLocalePathPrefix(locale) || '/';

  // Ajusta este número para bater 1:1 com o momento em que o logo gigante da hero começa a desaparecer.
  const {isBelowThreshold} = useScrollThreshold(140);

  // Home no topo => transparente; caso contrário => branco
  const solidHeader = !isHome || !isBelowThreshold;

  // Logo ao centro aparece quando header fica "solid"
  const showCenterLogo = solidHeader;

  return (
    <header
      className={`revissant-header ${
        solidHeader ? 'revissant-header--solid' : 'revissant-header--transparent'
      }`}
    >
      <div className="revissant-header__inner">
        {/* LEFT: hamburger */}
        <div className="revissant-header__left">
          <button
            type="button"
            className="revissant-header__icon-btn revissant-header__icon-btn--square"
            aria-label="Open menu"
            onClick={() => open('mobile')}
          >
            <HamburgerIcon />
          </button>
        </div>

        {/* CENTER: logo clicável */}
        <div className="revissant-header__center">
          <Link
            to={homePath}
            aria-label="Go to home"
            className={`revissant-header__center-logo ${
              showCenterLogo
                ? 'revissant-header__center-logo--visible'
                : 'revissant-header__center-logo--hidden'
            }`}
          >
            <img
              src="/logotipo.png"
              alt="REVISSANT"
              className="revissant-header__logo-img"
              draggable={false}
            />
          </Link>
        </div>

        {/* RIGHT: EUR + user + cart */}
        <div className="revissant-header__right">
          <div className="revissant-header__currency">EUR.</div>

          <button
            type="button"
            className="revissant-header__icon-btn revissant-header__icon-btn--round"
            aria-label="Account"
            onClick={() => open('account' as any)}
          >
            <UserIcon />
          </button>

          <button
            type="button"
            className="revissant-header__icon-btn revissant-header__icon-btn--round"
            aria-label="Cart"
            onClick={() => open('cart')}
          >
            <CartIcon />

            <Suspense fallback={null}>
              <Await resolve={cart}>
                {(resolvedCart: CartApiQueryFragment | null) => (
                  <OptimisticHeaderCartBadge cart={resolvedCart} />
                )}
              </Await>
            </Suspense>
          </button>
        </div>
      </div>
    </header>
  );
}

function OptimisticHeaderCartBadge({
  cart: originalCart,
}: {
  cart: CartApiQueryFragment | null;
}) {
  const cart = useOptimisticCart(originalCart);
  const totalQuantity = cart?.totalQuantity ?? 0;

  if (!totalQuantity) return null;

  return <span className="revissant-header__badge">{totalQuantity}</span>;
}

/* ===== inline SVG icons ===== */

function HamburgerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4 20c1.6-3.2 4.4-5 8-5s6.4 1.8 8 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 7h15l-1.5 8.5H8L6 4H3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}
