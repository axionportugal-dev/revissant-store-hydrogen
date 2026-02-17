import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {useAside} from '~/components/Aside';
import {useLockBodyScroll} from '~/components/revissant/hooks/useLockBodyScroll';
import styles from './RevissantMobileMenu.module.css';

const MENU_ITEMS: Array<{label: string; to: string}> = [
  {label: 'CATALOG', to: '/catalog'},
  {label: 'BEST DEALS', to: '/catalog'},
  {label: 'FAQ', to: '/faq'},
];

export function RevissantMobileMenuAside() {
  const {type, close} = useAside();
  const open = type === 'mobile';
  const [isVisible, setIsVisible] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  const animationMs = 500;

  useLockBodyScroll(open || isClosing);

  // ESC fecha (mesmo sem foco)
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsClosing(false);
      return;
    }

    if (isVisible) {
      setIsClosing(true);
      const timer = window.setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, animationMs);

      return () => window.clearTimeout(timer);
    }
  }, [open, isVisible, animationMs]);

  if (!isVisible) return null;

  const backdropClass = isClosing ? styles.backdropOut : styles.backdropIn;
  const drawerClass = isClosing ? styles.drawerOut : styles.drawerIn;

  return (
    <div className={styles.root} role="dialog" aria-modal="true">
      {/* Backdrop (blur do ecrã todo) */}
      <button
        className={`${styles.backdrop} ${backdropClass}`}
        aria-label="Close menu"
        onClick={close}
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${drawerClass}`} aria-label="Menu">
        {/* Close (no “lugar” do hamburger) */}
        <button
          className={styles.closeBtn}
          onClick={close}
          aria-label="Close menu"
          type="button"
        >
          <CloseIcon />
        </button>

        {/* Vertical decorative text */}
        <div className={styles.vertical}>REVISSANT COLLECTION ©2024</div>

        {/* Nav */}
        <nav className={styles.nav}>
          <div className={styles.newRow}>
            <div className={styles.new}>NEW</div>
          </div>

          <div className={styles.links}>
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={styles.link}
                onClick={close}
              >
                <span className={styles.linkText}>{item.label}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Depth overlay (igual ao AI Studio) */}
        <div className={styles.depth} />
      </aside>
    </div>
  );
}

function CloseIcon() {
  // SVG para conseguirmos rodar no hover via CSS (igual ao AI Studio)
  return (
    <svg
      className={styles.closeIcon}
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
