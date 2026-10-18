import {useRef} from 'react';
import {Link, useParams} from 'react-router';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {BEST_SELLERS} from '~/components/revissant/concept/catalog';
import {ProductCard} from '~/components/revissant/concept/ProductCard';
import {useReveal} from '~/components/revissant/hooks/useReveal';

/**
 * "Most loved" — carrossel horizontal com scroll-snap (swipe no mobile,
 * setas no desktop).
 */
export function BestSellers() {
  const {locale} = useParams();
  const localePrefix = getLocalePathPrefix(locale);
  const trackRef = useRef<HTMLDivElement>(null);
  const ref = useReveal<HTMLElement>();

  function scrollBy(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({left: dir * step, behavior: 'smooth'});
  }

  return (
    <section ref={ref} className="overflow-hidden bg-stone py-24 md:py-32">
      <div className="rv-container">
        <div className="rv-reveal flex items-end justify-between gap-6">
          <div>
            <p className="rv-eyebrow text-bronze">Most loved</p>
            <h2 className="rv-display mt-5 text-[44px] text-ink md:text-[64px]">
              The edit
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <ArrowButton label="Previous" onClick={() => scrollBy(-1)} flip />
            <ArrowButton label="Next" onClick={() => scrollBy(1)} />
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar rv-reveal mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 md:mt-16 md:scroll-px-12 md:px-12"
      >
        {BEST_SELLERS.map((p, i) => (
          <div
            key={p.handle}
            data-card
            className="w-[76vw] shrink-0 snap-start sm:w-[44vw] lg:w-[calc((100vw-96px-72px)/4)] lg:max-w-[340px]"
          >
            <ProductCard product={p} priority={i < 2} />
          </div>
        ))}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>

      <div className="rv-container mt-12 md:hidden">
        <Link to={`${localePrefix}/catalog`} className="rv-link text-ink">
          Shop all pieces
        </Link>
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  onClick,
  flip = false,
}: {
  label: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={flip ? 'rotate-180' : ''}
      >
        <path
          d="M4 12h15m-5-5 5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
