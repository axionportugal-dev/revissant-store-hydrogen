// app/components/revissant/home/NewsletterPopup.tsx
import {useEffect, useState} from 'react';
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
  delayMs: _delayMs = 5000,
}: NewsletterPopupProps) {
  const FADE_MS = 260;

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    if (shouldRender) {
      setVisible(false);
      const t = window.setTimeout(() => setShouldRender(false), FADE_MS);
      return () => window.clearTimeout(t);
    }
  }, [isOpen, shouldRender]);

  // lock scroll enquanto estiver montado (inclui durante fade-out)
  useLockBodyScroll(shouldRender);

  // fechar com ESC (enquanto estiver montado)
  useEffect(() => {
    if (!shouldRender) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  const IMG = '/images/newsletter.jpg';

  return (
    <div
      className={[
        'fixed inset-0 z-[210]',
        visible ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
    >
      {/* overlay (site visível por trás + blur + tint) */}
      <button
        aria-label="Close newsletter popup"
        onClick={onClose}
        className={[
          'absolute inset-0',
          // tint (não sólido)
          'bg-[#0b1a33]/25',
          // blur do que está por trás
          'backdrop-blur-[6px]',
          // animação
          'transition-opacity duration-[260ms] ease-out',
          visible ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* modal */}
      <div
        className={[
          'absolute left-1/2 top-1/2',
          'w-[min(1100px,calc(100vw-120px))]',
          'h-[min(560px,calc(100vh-140px))]',
          '-translate-x-1/2 -translate-y-1/2',
          'shadow-[0_18px_50px_rgba(0,0,0,0.35)]',
          'transition-[opacity,transform] duration-[260ms] ease-out',
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.985]',
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid h-full w-full grid-cols-1 overflow-hidden md:grid-cols-2">
          {/* LEFT */}
          <div className="flex h-full flex-col justify-center bg-white px-8 py-10 md:px-16 md:py-14">
            <div className="flex justify-center">
  <img
    src="/logotipo.png"
    alt="Revissant"
    className="h-[70px] w-auto"
    draggable={false}
  />
</div>


            <div className="mt-2 text-center text-[28px] font-bold tracking-[0.06em] text-[#13284d]">
              JOIN US
            </div>

            <div className="mt-3 text-center text-[12px] tracking-[0.12em] text-[#13284d]/55">
              GET 15% DISCOUNT ON YOUR FIRST ORDER
            </div>

            <form
              className="mt-8 flex w-full flex-col items-center gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <input
                type="email"
                required
                placeholder="EMAIL"
                style={{textAlign: 'center'}}
                className="h-[44px] w-[min(360px,100%)] border border-[#13284d]/20 px-4 text-[12px] tracking-[0.10em] text-[#13284d] outline-none placeholder:text-[#13284d]/45"
              />

              <input
                type="text"
                placeholder="NAME"
                style={{textAlign: 'center'}}
                className="h-[44px] w-[min(360px,100%)] border border-[#13284d]/20 px-4 text-[12px] tracking-[0.10em] text-[#13284d] outline-none placeholder:text-[#13284d]/45"
              />

              <button
                type="submit"
                className="mt-1 h-[48px] w-[min(360px,100%)] bg-[#13284d] text-[11px] tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(19,40,77,0.25)] hover:opacity-95"
              >
                BECOME A MEMBER
              </button>
            </form>
          </div>

          {/* RIGHT desktop */}
          <div className="relative hidden h-full md:block">
            <img src={IMG} alt="" className="h-full w-full object-cover" />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 grid h-[34px] w-[34px] place-items-center border border-black/15 bg-white/70 text-[22px] leading-none hover:bg-white"
              aria-label="Close"
              type="button"
            >
              ×
            </button>
          </div>

          {/* Mobile image */}
          <div className="relative block h-[240px] md:hidden">
            <img src={IMG} alt="" className="h-full w-full object-cover" />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 grid h-[34px] w-[34px] place-items-center border border-black/15 bg-white/70 text-[22px] leading-none hover:bg-white"
              aria-label="Close"
              type="button"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
