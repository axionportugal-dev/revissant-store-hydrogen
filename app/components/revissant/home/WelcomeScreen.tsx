import {useEffect, useState} from 'react';
import {useNonce} from '@shopify/hydrogen';
import {useLockBodyScroll} from '~/components/revissant/hooks/useLockBodyScroll';

/*
 * INTRO — "A new dawn"
 *
 * 1. horizon  - fundo marfim; uma linha fina (o horizonte) cresce do centro
 *               até às margens, à altura exata do logotipo do hero.
 * 2. mark     - o logotipo navy revela-se do centro para fora e o losango
 *               do V acende-se com um brilho bronze.
 * 3. dawn     - o marfim abre-se ao longo do horizonte (metade sobe, metade
 *               desce) e revela o vídeo; ao mesmo tempo o logotipo cresce e
 *               passa de navy a branco até ficar exatamente sobre o do hero.
 * 4. land     - o logotipo do hero aparece por baixo, o resto do hero e o
 *               header entram, e o overlay sai.
 *
 * A geometria vem do logotipo real do hero ([data-hero-logo]), por isso
 * encaixa em qualquer ecrã. Uma vez por sessão.
 */

const SEEN_KEY = 'revissant:welcome-seen';

const STATUS = [
  'Opening the shutters',
  'Arranging the vessels',
  'Lighting the lamps',
  'Pouring the candles',
  'Welcome home',
];

const TICK_MS = 70;
const AFTER_LOAD_MS = 250;
const MARK_MS = 1350;
const HOLD_MS = 350;
const DAWN_MS = 1500;
const LAND_MS = 1100;
const DAWN_EASE = 'cubic-bezier(0.7, 0, 0.2, 1)';
const SOFT_EASE = 'cubic-bezier(0.2, 0.7, 0.1, 1)';

// Losango do "V" dentro de /brand/revissant-*.png (1580×190).
const DIAMOND = {x: 454 / 1580, y: 50 / 190};

type Phase = 'idle' | 'horizon' | 'mark' | 'dawn' | 'land' | 'done';

type Target = {left: number; top: number; width: number; height: number};

/** Caixa do logotipo do hero sem transforms (animações/parallax). */
function measureHeroLogo(): Target | null {
  const el = document.querySelector<HTMLElement>('[data-hero-logo]');
  if (!el || !el.offsetWidth) return null;
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return {left, top, width: el.offsetWidth, height: el.offsetHeight};
}

// Corre antes do paint: quem já viu o intro nesta sessão não vê o overlay.
const SEEN_SCRIPT = `try{if(sessionStorage.getItem('${SEEN_KEY}')==='true'){document.documentElement.setAttribute('data-intro-seen','returning')}}catch(e){document.documentElement.setAttribute('data-intro-seen','returning')}`;

export function WelcomeScreen() {
  const nonce = useNonce();
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState<Target | null>(null);
  const [reduced, setReduced] = useState(false);

  const playing = phase !== 'idle' && phase !== 'done';
  useLockBodyScroll(playing);

  // Arranque: decide se toca e mede o destino.
  useEffect(() => {
    const root = document.documentElement;
    if (root.hasAttribute('data-intro-seen')) {
      setPhase('done');
      return;
    }
    window.scrollTo(0, 0);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setTarget(measureHeroLogo());
    setPhase('horizon');

    const onResize = () => setTarget(measureHeroLogo());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // 1. Horizonte (loader simulado)
  useEffect(() => {
    if (phase !== 'horizon') return;
    let value = 0;
    let next: number | undefined;
    const interval = window.setInterval(
      () => {
        value = Math.min(100, value + 4 + Math.floor(Math.random() * 8));
        setProgress(value);
        if (value >= 100) {
          window.clearInterval(interval);
          next = window.setTimeout(() => setPhase('mark'), AFTER_LOAD_MS);
        }
      },
      reduced ? 10 : TICK_MS,
    );
    return () => {
      window.clearInterval(interval);
      if (next) window.clearTimeout(next);
    };
  }, [phase, reduced]);

  // 2 → 3 → 4 → fim
  useEffect(() => {
    let timer: number | undefined;
    if (phase === 'mark') {
      timer = window.setTimeout(
        () => {
          setTarget(measureHeroLogo() ?? target);
          setPhase('dawn');
        },
        reduced ? 150 : MARK_MS + HOLD_MS,
      );
    } else if (phase === 'dawn') {
      timer = window.setTimeout(() => setPhase('land'), reduced ? 50 : DAWN_MS);
    } else if (phase === 'land') {
      document.documentElement.setAttribute('data-intro-seen', 'landed');
      try {
        window.sessionStorage.setItem(SEEN_KEY, 'true');
      } catch {
        // sem storage: o intro volta a tocar na próxima visita
      }
      timer = window.setTimeout(() => setPhase('done'), LAND_MS);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
    // target é lido só como fallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduced]);

  const script = (
    <script nonce={nonce} dangerouslySetInnerHTML={{__html: SEEN_SCRIPT}} />
  );

  if (phase === 'done') return script;

  // Geometria
  const horizonY = target ? target.top + target.height / 2 : null;
  const opened = phase === 'dawn' || phase === 'land';
  const showMark = phase === 'mark' || opened;
  const isMobile = target ? target.width < 520 : false;
  const startScale = isMobile ? 0.62 : 0.5;
  const ms = (value: number) => (reduced ? 1 : value);

  // Intervalo transparente no horizonte, à largura do logotipo inicial
  const markGap = target
    ? `linear-gradient(to right, black 0, black calc(50% - ${(target.width * startScale) / 2 + 40}px), transparent calc(50% - ${(target.width * startScale) / 2 + 12}px), transparent calc(50% + ${(target.width * startScale) / 2 + 12}px), black calc(50% + ${(target.width * startScale) / 2 + 40}px), black 100%)`
    : null;

  const halfTransition = `transform ${ms(DAWN_MS)}ms ${DAWN_EASE}, box-shadow ${ms(DAWN_MS)}ms ease`;
  const status =
    STATUS[
      Math.min(STATUS.length - 1, Math.floor((progress / 100) * STATUS.length))
    ];

  return (
    <>
      {script}
      <div
        className="rv-intro-overlay fixed inset-0 z-[200] overflow-hidden"
        aria-hidden="true"
      >
        {/* Metade de cima */}
        <div
          className="absolute inset-x-0 top-0 bg-ivory"
          style={{
            height: horizonY ?? '50%',
            transform: opened ? 'translateY(-100%)' : 'translateY(0)',
            transition: halfTransition,
            boxShadow: opened ? '0 40px 80px rgba(10,24,48,0.35)' : 'none',
          }}
        >
          <div className="rv-container absolute inset-x-0 bottom-5 flex items-end justify-between">
            <p
              className="rv-eyebrow text-ink/50 transition-opacity duration-500"
              style={{opacity: phase === 'horizon' ? 1 : 0}}
            >
              Revissant · Maison of objects
            </p>
            <p
              className="rv-display text-[44px] leading-none text-ink tabular-nums transition-opacity duration-500 md:text-[64px]"
              style={{opacity: phase === 'horizon' ? 1 : 0}}
            >
              {String(progress).padStart(3, '0')}
            </p>
          </div>
        </div>

        {/* Metade de baixo */}
        <div
          className="absolute inset-x-0 bottom-0 bg-ivory"
          style={{
            top: horizonY ?? '50%',
            transform: opened ? 'translateY(100%)' : 'translateY(0)',
            transition: halfTransition,
            boxShadow: opened ? '0 -40px 80px rgba(10,24,48,0.35)' : 'none',
          }}
        >
          <div className="rv-container absolute inset-x-0 top-5 flex items-start justify-between">
            <div
              className="transition-opacity duration-500"
              style={{opacity: phase === 'horizon' ? 1 : 0}}
            >
              <p
                key={status}
                className="rv-display animate-rv-fade text-xl italic text-ink/70 md:text-2xl"
              >
                {status}…
              </p>
            </div>
            <p
              className="rv-eyebrow hidden text-ink/50 transition-opacity duration-500 sm:block"
              style={{opacity: phase === 'horizon' ? 1 : 0}}
            >
              Est. Portugal
            </p>
          </div>
        </div>

        {/* O horizonte — abre-se à volta do logotipo quando ele aparece */}
        <div
          className="absolute inset-x-0 h-px"
          style={{
            top: horizonY ?? '50%',
            opacity: opened ? 0 : showMark ? 0.5 : 1,
            transition: `opacity ${ms(opened ? 120 : 900)}ms ease`,
            ...(showMark && markGap
              ? {
                  maskImage: markGap,
                  WebkitMaskImage: markGap,
                }
              : null),
          }}
        >
          <div className="absolute inset-0 bg-ink/10" />
          <div
            className="absolute inset-0 origin-center bg-ink"
            style={{
              transform: `scaleX(${progress / 100})`,
              transition: `transform ${ms(TICK_MS * 2)}ms linear`,
            }}
          />
        </div>

        {/* O logotipo — vive na caixa exata do logotipo do hero */}
        {target ? (
          <div
            className="absolute"
            style={{
              left: target.left,
              top: target.top,
              width: target.width,
              height: target.height,
              transform: opened ? 'scale(1)' : `scale(${startScale})`,
              transition: `transform ${ms(DAWN_MS)}ms ${DAWN_EASE}`,
              opacity: phase === 'land' ? 0 : 1,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: showMark
                  ? 'inset(-20% -5% -20% -5%)'
                  : 'inset(-20% 50% -20% 50%)',
                transition: `clip-path ${ms(1100)}ms ${SOFT_EASE}`,
              }}
            >
              <img
                src="/brand/revissant-navy.png"
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full select-none"
                style={{
                  opacity: opened ? 0 : 1,
                  transition: `opacity ${ms(DAWN_MS * 0.7)}ms ease ${ms(DAWN_MS * 0.15)}ms`,
                }}
              />
              <img
                src="/brand/revissant-white.png"
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full select-none"
                style={{
                  opacity: opened ? 1 : 0,
                  transition: `opacity ${ms(DAWN_MS * 0.7)}ms ease ${ms(DAWN_MS * 0.15)}ms`,
                }}
              />
            </div>

            {/* Brilho no losango do V */}
            {phase === 'mark' && !reduced ? (
              <span
                className="pointer-events-none absolute rounded-full animate-[rv-glint_1300ms_ease-out_450ms_both]"
                style={{
                  left: `${DIAMOND.x * 100}%`,
                  top: `${DIAMOND.y * 100}%`,
                  width: target.height * 1.6,
                  height: target.height * 1.6,
                  background:
                    'radial-gradient(circle, rgba(201,169,110,0.85) 0%, rgba(201,169,110,0.25) 30%, transparent 65%)',
                  mixBlendMode: 'multiply',
                }}
              />
            ) : null}
          </div>
        ) : null}

        <style>{`
          @keyframes rv-glint {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
            35% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1.6); }
          }
        `}</style>
      </div>
    </>
  );
}
