import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type AsideType = 'search' | 'cart' | 'mobile' | 'account' | 'closed';

type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

export function Aside({
  children,
  heading,
  type,
  showHeader = true,
  overlayClassName,
  panelClassName,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
  showHeader?: boolean;
  overlayClassName?: string;
  panelClassName?: string;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  // Esc fecha
  useEffect(() => {
    if (!expanded) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close, expanded]);

  // Lock body scroll
  useEffect(() => {
    if (!expanded) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [expanded]);

  const layout = useMemo(() => {
    if (type === 'account') return 'modal';
    if (type === 'mobile') return 'left';
    return 'right'; // cart/search
  }, [type]);

  if (!expanded) return null;

  const panelBase =
    'relative bg-white shadow-2xl border border-black/10 overflow-hidden';

  const panelClass =
    layout === 'modal'
      ? `w-[min(720px,calc(100%-24px))] max-h-[88vh] ${panelBase}`
      : `h-full w-[min(460px,86vw)] ${panelBase}`;

  const panelPosition =
    layout === 'modal'
      ? 'mx-auto mt-[6vh]'
      : layout === 'left'
        ? 'h-full'
        : 'h-full ml-auto';

  return (
    <div className={`fixed inset-0 z-[130] ${overlayClassName ?? ''}`}>
      {/* overlay */}
      <button
        className={`absolute inset-0 bg-black/35 backdrop-blur-sm ${overlayClassName ?? ''}`}
        aria-label="Close overlay"
        onClick={close}
      />

      <aside className={`${panelPosition} ${panelClass} ${panelClassName ?? ''}`}>
        {showHeader ? (
          <header className="p-5 border-b border-black/10 flex items-center justify-between gap-4">
            <h3 className="text-[12px] font-bold tracking-[0.22em] uppercase text-black/60">
              {heading}
            </h3>
            <button
              className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-black/70 hover:text-black transition-colors"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
          </header>
        ) : null}

        <main className={showHeader ? 'p-5' : ''}>{children}</main>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) throw new Error('useAside must be used within an AsideProvider');
  return aside;
}
