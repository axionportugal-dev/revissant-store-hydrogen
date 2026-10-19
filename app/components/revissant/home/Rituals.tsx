import {Link, useParams} from 'react-router';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {
  CONCEPT_PRODUCTS,
  EDITORIAL,
  formatPrice,
  sized,
} from '~/components/revissant/concept/catalog';
import {useReveal} from '~/components/revissant/hooks/useReveal';

/** "Evening rituals" — imagem em ecrã inteiro + as fragrâncias. */
export function Rituals() {
  const {locale} = useParams();
  const localePrefix = getLocalePathPrefix(locale);
  const ref = useReveal<HTMLElement>();
  const candles = CONCEPT_PRODUCTS.filter((p) => p.category === 'fragrance');

  return (
    <section
      ref={ref}
      className="relative min-h-[760px] overflow-hidden bg-ink-deep text-ivory md:min-h-[860px]"
    >
      <img
        src={EDITORIAL.rituals}
        alt="Candles glowing on a bed beside a book"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/85 via-ink-deep/45 to-ink-deep/10" />

      <div className="rv-container relative grid min-h-[760px] items-end gap-12 py-20 md:min-h-[860px] md:items-center lg:grid-cols-2">
        <div className="rv-reveal max-w-lg">
          <p className="rv-eyebrow text-sand">Evening rituals</p>
          <h2 className="rv-display mt-6 text-[48px] md:text-[76px]">
            Light a candle.
            <br />
            <em className="text-sand">Slow the hour.</em>
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ivory/75">
            Our fragrances are poured in small batches with coconut wax and
            essential oils — composed to make a room feel like a memory.
          </p>
          <Link
            to={`${localePrefix}/catalog?category=fragrance`}
            className="rv-link mt-10 text-ivory"
          >
            Discover fragrance
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:justify-self-end">
          {candles.map((p, i) => (
            <Link
              key={p.handle}
              to={`${localePrefix}/products/${p.handle}`}
              prefetch="intent"
              className="rv-reveal group block w-full max-w-[240px] bg-ivory/10 p-3 backdrop-blur-md transition-colors hover:bg-ivory/20"
              style={{transitionDelay: `${200 + i * 120}ms`}}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={sized(p.image, 500)}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  style={{objectPosition: p.focus}}
                />
              </div>
              <p className="rv-display mt-3 text-xl">{p.title}</p>
              <p className="text-[13px] text-ivory/70">
                {p.subtitle.split(',')[0]} · {formatPrice(p.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
