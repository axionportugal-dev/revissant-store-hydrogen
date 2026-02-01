import {useEffect, useState} from 'react';
import {useLockBodyScroll} from '~/components/revissant/hooks/useLockBodyScroll';

type WelcomeScreenProps = {
  onFinished: () => void;
};

/**
 * WelcomeScreen (REVISSANT) - versão com LOGO WHITE.
 * - Mostra o overlay
 * - Aguarda 2.5s
 * - Faz fade-out 1s
 * - Chama onFinished()
 *
 * SSR-safe: window só dentro de useEffect.
 */
export function WelcomeScreen({onFinished}: WelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Bloquear scroll enquanto estiver visível
  useLockBodyScroll(isVisible);

  useEffect(() => {
    let finishTimer: number | undefined;

    const timer = window.setTimeout(() => {
      setIsVisible(false);

      // esperar o fade-out (1s) antes de finalizar
      finishTimer = window.setTimeout(() => {
        onFinished();
      }, 1000);
    }, 2500);

    return () => {
      window.clearTimeout(timer);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={[
        'fixed inset-0 z-[200] flex items-center justify-center',
        'transition-opacity duration-1000 ease-in-out',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      style={{backgroundColor: '#10203B'}}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {/* LOGO WHITE */}
        <img
          src="/logowhite.png"
          alt="REVISSANT"
          className="logo-anim w-[340px] sm:w-[420px] md:w-[520px] h-auto select-none"
          draggable={false}
        />

        {/* Subtítulo + linha alinhada (como na print) */}
        <div className="subtitle-wrap -mt-20
        ">
          <div className="line-anim" />
          <p className="subtitle-anim text-[11px] sm:text-[12px] text-white/70 tracking-[0.45em] uppercase">
            Welcome to the new standard
          </p>
        </div>
      </div>

      {/* CSS local para animar sem mexer em estilos globais */}
      <style>{`
        .logo-anim {
          opacity: 0;
          transform: translateY(6px);
          animation: logoIn 900ms ease-out forwards;
        }

        .subtitle-wrap{
          position: relative;
          display: inline-block; /* faz o wrap ter a largura do texto */
          text-align: center;
        }

        .line-anim{
          position: absolute;
          top: -15px;            /* distância acima do texto (ajusta fino) */
          left: 50%;
          height: 1px;
          background: rgba(255,255,255,0.6);

          /* largura semelhante à print (um pouco menor que o texto) */
          width: 68%;
          max-width: 220px;
          min-width: 140px;

          /* animação */
          transform-origin: center;
          opacity: 0;
          animation: lineGrow 900ms ease-out forwards;
          animation-delay: 250ms;
        }

        .subtitle-anim {
          opacity: 0;
          transform: translateY(6px);
          animation: subtitleIn 900ms ease-out forwards;
          animation-delay: 450ms;
        }

        @keyframes logoIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineGrow {
          from { transform: translateX(-50%) scaleX(0); opacity: 0.2; }
          to   { transform: translateX(-50%) scaleX(1); opacity: 0.9; }
        }

        @keyframes subtitleIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
