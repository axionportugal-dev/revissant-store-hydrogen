import {Link, useParams} from 'react-router';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {EDITORIAL, pexels} from '~/components/revissant/concept/catalog';
import {useReveal} from '~/components/revissant/hooks/useReveal';

/**
 * "A New Dawn of Living" — manifesto da marca (texto do AI Studio),
 * em composição editorial assimétrica.
 */
export function Manifesto() {
  const {locale} = useParams();
  const localePrefix = getLocalePathPrefix(locale);
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="manifesto"
      ref={ref}
      className="scroll-mt-20 bg-ink text-ivory"
    >
      <div className="rv-container grid items-center gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <div className="rv-reveal aspect-[4/5] overflow-hidden">
            <img
              src={EDITORIAL.manifesto}
              alt="A calm living room with a sculpted vase and dried stems"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          {/* imagem secundária sobreposta */}
          <div
            className="rv-reveal absolute -bottom-10 -right-4 hidden w-[42%] border-[10px] border-ink md:block lg:-right-16"
            style={{transitionDelay: '200ms'}}
          >
            <img
              src={pexels(9130691, 700)}
              alt=""
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <p className="rv-eyebrow rv-reveal text-sand">What is Revissant?</p>
          <h2
            className="rv-display rv-reveal mt-6 text-[48px] md:text-[80px]"
            style={{transitionDelay: '100ms'}}
          >
            A new dawn
            <br />
            <em className="text-sand">of living.</em>
          </h2>
          <div
            className="rv-reveal mt-10 space-y-5 text-[16px] leading-[1.8] text-ivory/75"
            style={{transitionDelay: '200ms'}}
          >
            <p>
              We believe a home is a sanctuary. Revissant gathers objects made
              slowly — by potters, glassblowers and weavers — and edits them
              into a collection meant to be lived with for decades, not seasons.
            </p>
            <p>
              Fewer things, better made. Natural materials that soften with
              time. Forms quiet enough to let the light do the rest.
            </p>
          </div>

          <dl
            className="rv-reveal mt-12 grid grid-cols-3 gap-6 border-t border-ivory/15 pt-8"
            style={{transitionDelay: '300ms'}}
          >
            {[
              ['24', 'Partner ateliers'],
              ['100%', 'Natural materials'],
              ['1', 'Piece at a time'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="rv-display text-4xl text-ivory md:text-5xl">
                  {value}
                </dt>
                <dd className="mt-2 text-[12px] leading-snug text-ivory/55">
                  {label}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            to={`${localePrefix}/catalog`}
            className="rv-btn rv-btn--light rv-reveal mt-12"
            style={{transitionDelay: '400ms'}}
          >
            Shop the home
          </Link>
        </div>
      </div>
    </section>
  );
}
