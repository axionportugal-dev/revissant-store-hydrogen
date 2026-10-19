import * as React from 'react';
import {onToast, type RevissantToastPayload} from './toast';
import {CheckIcon, XIcon} from './icons';

type ToastItem = Required<RevissantToastPayload> & {id: string};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function ToastContainer() {
  const [item, setItem] = React.useState<ToastItem | null>(null);
  const timeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const unsubscribe = onToast((payload) => {
      const toast: ToastItem = {
        id: uid(),
        message: payload.message,
        type: payload.type ?? 'success',
        durationMs: payload.durationMs ?? 3000,
      };

      setItem(toast);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setItem((prev) => (prev?.id === toast.id ? null : prev));
      }, toast.durationMs);
    });

    return () => {
      unsubscribe();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!item) return null;

  return (
    <div className="fixed top-24 right-4 md:right-8 z-[80]">
      <div className="flex items-center gap-4 bg-white border border-gray-100 shadow-2xl p-5 rounded-sm animate-fade-in min-w-[320px]">
        <div className="bg-revissant-dark text-white rounded-full p-1.5 flex-shrink-0">
          <CheckIcon size={16} strokeWidth={3} />
        </div>
        <div className="flex-1">
          <p className="text-revissant-dark font-bold text-sm tracking-wide font-sans uppercase">
            {item.message}
          </p>
        </div>
        <button
          aria-label="Close"
          className="text-gray-400 hover:text-revissant-dark transition-colors"
          onClick={() => setItem(null)}
        >
          <XIcon size={18} />
        </button>
      </div>
    </div>
  );
}
