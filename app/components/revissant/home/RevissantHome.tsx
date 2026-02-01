import {useEffect, useRef, useState} from 'react';
import {WelcomeScreen} from './WelcomeScreen';
import {NewsletterPopup} from './NewsletterPopUp';

export function RevissantHome() {
  const [isWelcomeDone, setIsWelcomeDone] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const hasShownNewsletterRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      // Só abrir se:
      // - welcome já acabou
      // - ainda não mostramos nesta sessão
      if (isWelcomeDone && !hasShownNewsletterRef.current) {
        hasShownNewsletterRef.current = true;
        setIsNewsletterOpen(true);
      }
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isWelcomeDone]);

  return (
    <main className="min-h-screen bg-white">
      {!isWelcomeDone && (
        <WelcomeScreen onFinished={() => setIsWelcomeDone(true)} />
      )}

      <NewsletterPopup
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      {/* Conteúdo da Home (por agora podes manter o scaffold) */}
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10">
        <h1 className="text-4xl font-serif text-[#0F2445]">REVISSANT</h1>
        <p className="mt-2 text-gray-500 text-sm">
          Welcome done: {isWelcomeDone ? 'yes' : 'no'}
        </p>
      </div>
    </main>
  );
}
