// app/components/revissant/home/Hero.tsx
import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router';

const CATALOG_SEGMENT = 'collections/all';

function getLocalePrefixedPath(pathname: string, segment: string) {
  const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
  const base = match && match.length > 0 ? match[0] : '/';
  return base === '/' ? `/${segment}` : `${base}${segment}`;
}

export function Hero() {
  const lightRef = useRef<HTMLDivElement>(null);
  const {pathname} = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!lightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lightRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  const toCatalog = getLocalePrefixedPath(pathname, CATALOG_SEGMENT);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden w-screen left-1/2 -translate-x-1/2"
      style={{position: 'relative'}}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#3b5998] to-[#0F2445]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-40" />

      {/* Mouse light */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute left-0 top-0 z-10 h-[700px] w-[700px] rounded-full bg-white opacity-10 blur-[110px] mix-blend-overlay will-change-transform transition-opacity duration-300"
        style={{transform: 'translate(-50%, -50%)'}}
      />

      {/* Content layer */}
      <div className="absolute inset-0 z-20">
        <div
          className={[
            'relative h-full w-full',
            'transition-all duration-700 ease-out transform-gpu',
            entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            isScrolled ? 'opacity-0 -translate-y-10 blur-sm' : 'blur-0',
          ].join(' ')}
        >
          {/* LOGO fixo no centro */}
          <img
            src="/logowhite.png"
            alt="Revissant"
            draggable={false}
            className="
              absolute left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2
              select-none w-auto
              h-[360px] md:h-[420px] lg:h-[480px]
            "
          />

          {/* Botão separado, abaixo do centro */}
          <Link
            to={toCatalog}
            prefetch="intent"
            className="
              absolute left-1/2 -translate-x-1/2
              top-[calc(50%+90px)] md:top-[calc(50%+110px)] lg:top-[calc(50%+120px)]
              inline-flex items-center justify-center
              h-[44px] w-[180px]
              border border-white/70 bg-transparent
              text-[11px] font-semibold uppercase tracking-[0.35em]
              text-white
              transition-all duration-300 ease-out
              hover:bg-white hover:text-black
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
            "
          >
            EXPLORE
          </Link>
        </div>
      </div>
    </section>
  );
}
