import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {EDITORIAL} from '~/components/revissant/concept/catalog';

/**
 * Hero — vídeo "A New Dawn of Living" (AI Studio) em ecrã inteiro,
 * com o logotipo branco por cima. Parallax leve no scroll.
 *
 * O conteúdo usa `rv-intro-gated` / `rv-intro-logo`: fica escondido até a
 * WelcomeScreen aterrar o logotipo em [data-hero-logo] (ver tailwind.css).
 */
export function Hero() {
  const {locale} = useParams();
  const localePrefix = getLocalePathPrefix(locale);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const fade = Math.max(0, 1 - scrollY / 520);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink-deep text-white">
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.25}px, 0) scale(1.06)`,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={EDITORIAL.heroPoster}
          className="h-full w-full object-cover animate-rv-fade"
        >
          <source src={EDITORIAL.heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* véus: navy da marca + vinheta para legibilidade */}
      <div className="absolute inset-0 bg-ink-deep/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,24,48,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-deep/70 to-transparent" />

      {/* 3 linhas: [1fr | logotipo | 1fr] → o logotipo fica no centro vertical exato do ecrã */}
      <div
        className="relative z-10 grid h-full grid-rows-[1fr_auto_1fr] justify-items-center px-6 text-center"
        style={{opacity: fade, transform: `translateY(${scrollY * -0.12}px)`}}
      >
        <p
          className="rv-eyebrow rv-intro-gated self-end text-sand"
          style={{'--rv-delay': '250ms'} as React.CSSProperties}
        >
          Maison of objects · Est. Portugal
        </p>

        <h1
          className="rv-intro-logo my-7 w-full max-w-[880px] md:my-9"
          style={{'--rv-delay': '350ms'} as React.CSSProperties}
        >
          <img
            src="/brand/revissant-white.png"
            alt="REVISSANT"
            width={1580}
            height={190}
            draggable={false}
            data-hero-logo
            className="mx-auto h-auto w-[86vw] max-w-[880px] select-none"
          />
        </h1>

        <div className="flex flex-col items-center self-start">
          <p
            className="rv-display rv-intro-gated max-w-xl text-2xl italic text-ivory/90 md:text-[32px]"
            style={{'--rv-delay': '450ms'} as React.CSSProperties}
          >
            A new dawn of living.
          </p>

          <div
            className="rv-intro-gated mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-12"
            style={{'--rv-delay': '650ms'} as React.CSSProperties}
          >
            <Link
              to={`${localePrefix}/catalog`}
              prefetch="intent"
              className="rv-btn rv-btn--light"
            >
              Discover the collection
            </Link>
            <a href="#manifesto" className="rv-btn rv-btn--ghost-light">
              The house
            </a>
          </div>
        </div>
      </div>

      {/* indicador de scroll */}
      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{opacity: fade}}
      >
        <div
          className="rv-intro-gated flex flex-col items-center gap-3"
          style={{'--rv-delay': '900ms'} as React.CSSProperties}
        >
          <span className="rv-eyebrow !text-[9px] text-ivory/60">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-ivory/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[rv-scroll_2.2s_ease-in-out_infinite] bg-ivory" />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes rv-scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
