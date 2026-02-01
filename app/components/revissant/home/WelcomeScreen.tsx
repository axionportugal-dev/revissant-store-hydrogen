import {useEffect, useState} from 'react';

type WelcomeScreenProps = {
  onFinished: () => void;
};

export function WelcomeScreen({onFinished}: WelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let finishTimer: number | undefined;

    const timer = window.setTimeout(() => {
      setIsVisible(false);

      // deixa a transição de opacity acontecer (1s) antes de “finalizar”
      finishTimer = window.setTimeout(() => {
        onFinished();
      }, 1000);
    }, 2500);

    return () => {
      window.clearTimeout(timer);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [onFinished]);

  // lock scroll enquanto o overlay está visível
  useEffect(() => {
    if (!isVisible) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  return (
    <div
      className={[
        'fixed inset-0 z-[200] flex flex-col items-center justify-center',
        'bg-[#0F2445] text-white',
        'transition-opacity duration-1000 ease-in-out',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div className="text-center">
        <h1
          className="text-5xl font-serif tracking-widest mb-4 uppercase animate-fade-in"
          style={{fontFamily: "'Times New Roman', serif"}}
        >
          REVISSANT
        </h1>

        <div className="flex justify-center mb-4">
          <div className="h-[1px] bg-white animate-[width_1.5s_ease-out_forwards_0.5s]" />
        </div>

        <p className="text-xl font-light tracking-wide opacity-0 animate-[fadeIn_1s_ease-out_forwards_1s]">
          Welcome to the new standard of luxury living
        </p>
      </div>

      <style>{`
        @keyframes width {
          from { width: 0; }
          to { width: 100px; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
