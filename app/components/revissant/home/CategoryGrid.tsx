import {Link, useParams} from 'react-router';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {CATEGORIES, sized} from '~/components/revissant/concept/catalog';
import {useReveal} from '~/components/revissant/hooks/useReveal';

/**
 * Categorias em grelha editorial: 2 grandes + 4 menores.
 */
export function CategoryGrid() {
  const {locale} = useParams();
  const localePrefix = getLocalePathPrefix(locale);
  const ref = useReveal<HTMLElement>();

  const [first, second, ...rest] = CATEGORIES;

  return (
    <section ref={ref} className="bg-ivory py-24 md:py-36">
      <div className="rv-container">
        <div className="rv-reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="rv-eyebrow text-bronze">The collection</p>
            <h2 className="rv-display mt-5 max-w-2xl text-[44px] text-ink md:text-[72px]">
              Objects for <em>considered</em> living
            </h2>
          </div>
          <Link
            to={`${localePrefix}/catalog`}
            className="rv-link self-start text-ink md:self-auto"
          >
            View all pieces
          </Link>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
          {[first, second].map((c, i) => (
            <CategoryTile
              key={c.value}
              category={c}
              href={`${localePrefix}/catalog?category=${c.value}`}
              className="aspect-[4/5] md:aspect-[6/5]"
              delay={i * 120}
              large
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:grid-cols-4 md:gap-6">
          {rest.map((c, i) => (
            <CategoryTile
              key={c.value}
              category={c}
              href={`${localePrefix}/catalog?category=${c.value}`}
              className="aspect-[3/4]"
              delay={i * 90}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTile({
  category,
  href,
  className,
  delay,
  large = false,
}: {
  category: (typeof CATEGORIES)[number];
  href: string;
  className: string;
  delay: number;
  large?: boolean;
}) {
  return (
    <Link
      to={href}
      prefetch="intent"
      className={`rv-reveal group relative block overflow-hidden bg-stone ${className}`}
      style={{transitionDelay: `${delay}ms`}}
    >
      <img
        src={sized(category.image, large ? 1400 : 800)}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/65 via-ink-deep/5 to-transparent" />
      <div className="absolute inset-x-5 bottom-5 text-ivory md:inset-x-8 md:bottom-8">
        <h3
          className={`rv-display ${large ? 'text-[40px] md:text-[56px]' : 'text-[26px] md:text-[32px]'}`}
        >
          {category.label}
        </h3>
        {large ? (
          <p className="mt-2 max-w-xs text-[14px] text-ivory/80">
            {category.blurb}
          </p>
        ) : null}
        <span className="rv-eyebrow mt-4 inline-flex items-center gap-2 !text-[10px] text-ivory/90">
          Shop
          <span className="transition-transform duration-500 group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
