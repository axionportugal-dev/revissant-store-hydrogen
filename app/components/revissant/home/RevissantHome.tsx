import {useEffect, useState} from 'react';
import {WelcomeScreen} from './WelcomeScreen';

export function RevissantHome() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      <WelcomeScreen onFinished={() => setIsLoading(false)} />

      <div className="px-8 py-16">
        <h1 className="text-4xl font-bold">REVISSANT Home (scaffold)</h1>
        <p className="mt-6 text-gray-600">Mounted: {mounted ? 'yes' : 'no'}</p>
        <p className="mt-2 text-gray-600">Loading: {isLoading ? 'yes' : 'no'}</p>

        {/* Próximos passos: Hero / BestSellers / Features / NewsletterPopup */}
      </div>
    </div>
  );
}
