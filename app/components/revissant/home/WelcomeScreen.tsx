import {useEffect, useState} from 'react';
import {useLockBodyScroll} from '~/components/revissant/hooks/useLockBodyScroll';

type WelcomeScreenProps = {
  onFinished: () => void;
};

/**
 * WelcomeScreen — uma vez por sessão. Logotipo + linha que se desenha,
 * depois a cortina sobe e revela o vídeo do hero.
 */
export function WelcomeScreen({onFinished}: WelcomeScreenProps) {
  const [leaving, setLeaving] = useState(false);
  const displayMs = 1500;
  const exitMs = 900;

  useLockBodyScroll(!leaving);

  useEffect(() => {
    let finish: number | undefined;
    const timer = window.setTimeout(() => {
      setLeaving(true);
      finish = window.setTimeout(onFinished, exitMs);
    }, displayMs);
    return () => {
      window.clearTimeout(timer);
      if (finish) window.clearTimeout(finish);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink-deep transition-transform duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
        leaving ? '-translate-y-full' : 'translate-y-0'
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center px-8">
        <img
          src="/brand/revissant-white.png"
          alt=""
          draggable={false}
          className="w-[72vw] max-w-[520px] animate-rv-rise select-none"
        />
        <span className="mt-8 block h-px w-0 animate-[rv-line_900ms_ease-out_300ms_forwards] bg-sand/70" />
        <p className="rv-eyebrow mt-6 animate-rv-rise text-ivory/70 [animation-delay:500ms]">
          Welcome to the new standard
        </p>
      </div>

      <style>{`
        @keyframes rv-line { from { width: 0 } to { width: 96px } }
      `}</style>
    </div>
  );
}
