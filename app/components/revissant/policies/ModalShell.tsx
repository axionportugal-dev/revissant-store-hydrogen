import * as React from 'react';
import {XIcon} from '~/components/revissant/ui/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string; // ex: "max-w-2xl"
  roundedClass?: string;  // ex: "rounded-none" | "rounded-sm"
};

export default function ModalShell({
  isOpen,
  onClose,
  children,
  maxWidthClass = 'max-w-2xl',
  roundedClass = 'rounded-none',
}: Props) {
  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`bg-white w-full ${maxWidthClass} relative z-10 ${roundedClass} shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-20 group"
          aria-label="Close"
          type="button"
        >
          <XIcon
            size={24}
            className="text-revissant-dark group-hover:rotate-90 transition-transform duration-300"
          />
        </button>

        {children}
      </div>
    </div>
  );
}
