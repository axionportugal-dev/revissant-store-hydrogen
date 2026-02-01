// app/components/revissant/home/NewsletterPopup.tsx
import {useEffect} from 'react';
import {useLockBodyScroll} from '~/components/revissant/hooks/useLockBodyScroll';

type NewsletterPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  delayMs?: number;
};

/**
 * Popup simples e independente (não usa Aside do Hydrogen)
 * para não colidir com o layout-shell do Sousa.
 */
export function NewsletterPopup({
  isOpen,
  onClose,
  delayMs = 5000,
}: NewsletterPopupProps) {
  // lock scroll quando estiver aberto
  useLockBodyScroll(isOpen);

  // fechar com ESC
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[210]">
      {/* overlay */}
      <button
        aria-label="Close newsletter popup"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* modal */}
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-500">
                Newsletter
              </p>
              <h2 className="mt-2 text-2xl font-serif text-[#0F2445]">
                Get 10% off your first order
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Subscribe to receive exclusive deals and new arrivals.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              // Por agora: só fecha. Integração real com email depois.
              onClose();
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#0F2445] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-3 text-xs text-gray-500">
            By subscribing you agree to our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
