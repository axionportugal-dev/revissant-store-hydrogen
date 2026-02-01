// app/components/revissant/home/RevissantHome.tsx
import {useEffect, useState} from 'react';

export function RevissantHome() {
  /**
   * Nota: neste commit A, vamos só garantir que a Home renderiza.
   * A lógica real (WelcomeScreen/Popup/etc) entra nos commits seguintes.
   */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="py-10">
          <h1 className="text-revissant-dark font-serif text-4xl">
            REVISSANT Home (scaffold)
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Mounted: {isMounted ? 'yes' : 'no'}
          </p>

          <div className="mt-10 border border-gray-200 p-6">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">
              Próximos passos:
            </p>
            <ul className="mt-4 list-disc pl-5 text-sm text-revissant-dark">
              <li>WelcomeScreen</li>
              <li>NewsletterPopup (5s)</li>
              <li>Hero + fade no scroll</li>
              <li>BestSellers carousel</li>
              <li>Features hover + vídeo</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
