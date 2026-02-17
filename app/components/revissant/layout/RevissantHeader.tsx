import {Suspense, useMemo} from 'react';
import {Await, Link, useLocation} from 'react-router';

import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

import {useScrollThreshold} from '~/components/revissant/hooks/useScrollThreshold';
import {isHomePath} from '~/components/revissant/utils/isHomePath';

import styles from './RevissantHeader.module.css';

type Props = {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  fallback?: React.ReactNode;
};

export function RevissantHeader({cart}: Props) {
  const {open} = useAside();
  const location = useLocation();

  const isHome = useMemo(() => isHomePath(location.pathname), [location.pathname]);

  // Ajusta este número para bater 1:1 com o momento em que o logo gigante da hero começa a desaparecer.
  const {isBelowThreshold} = useScrollThreshold(140);

  // Home no topo => transparente; caso contrário => branco
  const solidHeader = !isHome || !isBelowThreshold;

  // Logo ao centro aparece quando header fica "solid"
  const showCenterLogo = solidHeader;

  return (
    <header className={`${styles.header} ${solidHeader ? styles.solid : styles.transparent}`}>
      <div className={styles.inner}>
        {/* LEFT: hamburger */}
        <div className={styles.left}>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.iconBtnSquare}`}
            aria-label="Open menu"
            onClick={() => open('mobile')}
          >
            <HamburgerIcon />
          </button>
        </div>

        {/* CENTER: logo clicável */}
        <div className={styles.center}>
          <Link
            to="/"
            aria-label="Go to home"
            className={`${styles.centerLogo} ${
              showCenterLogo ? styles.centerLogoVisible : styles.centerLogoHidden
            }`}
          >
            <img
              src="/logotipo.png"
              alt="REVISSANT"
              className={styles.logoImg}
              draggable={false}
            />
          </Link>
        </div>

        {/* RIGHT: EUR + user + cart */}
        <div className={styles.right}>
          <div className={styles.currency}>EUR.</div>

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.iconBtnRound}`}
            aria-label="Account"
            onClick={() => open('account' as any)}
          >
            <UserIcon />
          </button>

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.iconBtnRound}`}
            aria-label="Cart"
            onClick={() => open('cart')}
          >
            <CartIcon />

            <Suspense fallback={null}>
              <Await resolve={cart}>
                {(c: CartApiQueryFragment | null) => {
                  const qty = c?.totalQuantity ?? 0;
                  if (!qty) return null;
                  return <span className={styles.badge}>{qty}</span>;
                }}
              </Await>
            </Suspense>
          </button>
        </div>
      </div>
    </header>
  );
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
