import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router';
import {useAside} from '~/components/Aside';
import {useLockBodyScroll} from '~/components/revissant/hooks/useLockBodyScroll';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {CATEGORIES, EDITORIAL} from '~/components/revissant/concept/catalog';

const SECONDARY = [
  {label: 'FAQ', to: '/faq'},
  {label: 'Bag', to: '/cart'},
];

const ANIMATION_MS = 600;

export function RevissantMobileMenuAside() {
  const {locale} = useParams();
  const {type, close} = useAside();
  const open = type === 'mobile';
  const localePrefix = getLocalePathPrefix(locale);

  // Mantém montado durante a animação de saída
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), ANIMATION_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[200]"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={close}
        className={`absolute inset-0 bg-ink-deep/50 backdrop-blur-sm transition-opacity duration-500 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        className={`absolute inset-y-0 left-0 flex w-full max-w-[980px] overflow-hidden bg-ink text-ivory shadow-2xl transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
          shown ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto px-6 pb-10 pt-5 md:px-14 md:pt-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-60"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 5l14 14M19 5 5 19"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <img
              src="/brand/revissant-white.png"
              alt="REVISSANT"
              className="h-[14px] w-auto opacity-90"
              draggable={false}
            />
          </div>

          <p className="rv-eyebrow mt-14 text-sand/80">The collection</p>

          <nav className="mt-6 flex flex-col" aria-label="Menu">
            <MenuLink
              to={`${localePrefix}/catalog`}
              onClick={close}
              index={0}
              shown={shown}
            >
              Shop all
            </MenuLink>
            {CATEGORIES.map((c, i) => (
              <MenuLink
                key={c.value}
                to={`${localePrefix}/catalog?category=${c.value}`}
                onClick={close}
                index={i + 1}
                shown={shown}
              >
                {c.label}
              </MenuLink>
            ))}
          </nav>

          <div className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-14">
            {SECONDARY.map((item) => (
              <Link
                key={item.label}
                to={`${localePrefix}${item.to}`}
                onClick={close}
                className="rv-eyebrow text-ivory/70 transition-colors hover:text-ivory"
              >
                {item.label}
              </Link>
            ))}
            <span className="rv-eyebrow text-ivory/40">Portugal · EUR</span>
          </div>
        </div>

        {/* Imagem editorial (só desktop) */}
        <div className="relative hidden w-[42%] shrink-0 md:block">
          <img
            src={EDITORIAL.manifesto}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out ${
              shown ? 'scale-100' : 'scale-110'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-8 bottom-10">
            <p className="rv-eyebrow text-sand">New season</p>
            <p className="rv-display mt-3 text-3xl text-ivory">
              Quiet forms for <em>considered</em> rooms.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function MenuLink({
  to,
  onClick,
  children,
  index,
  shown,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
  index: number;
  shown: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      prefetch="intent"
      className={`group flex items-baseline justify-between border-b border-ivory/10 py-3 transition-all duration-700 ${
        shown ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
      }`}
      style={{transitionDelay: shown ? `${120 + index * 45}ms` : '0ms'}}
    >
      <span className="rv-display text-[34px] text-ivory transition-[letter-spacing,color] duration-500 group-hover:text-sand md:text-[44px]">
        {children}
      </span>
      <span className="rv-eyebrow text-ivory/30 transition-colors group-hover:text-sand">
        0{index + 1}
      </span>
    </Link>
  );
}
