// app/components/revissant/home/NewsletterPopup.tsx
import {useEffect, useState} from 'react';
import {useLockBodyScroll} from '~/components/revissant/hooks/useLockBodyScroll';

function IconX({size = 20, className}: {size?: number; className?: string}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCheck({size = 24, className}: {size?: number; className?: string}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12l4 4L19 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * NewsletterPopup (AI Studio 1:1)
 * - Abre automaticamente após 15s
 * - Lock do body enquanto estiver aberto
 * - Estado de sucesso com auto-close
 */
export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => window.clearTimeout(timer);
  }, []);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isSubmitted) return;
    const timer = window.setTimeout(() => {
      handleClose();
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [isSubmitted]);

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setEmail('');
    setName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitted(true);
    }
  };

  if (!isOpen) return null;

  const IMG = '/images/newsletter.jpg';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        aria-label="Close newsletter popup"
        onClick={handleClose}
        className="absolute inset-0 bg-[#0F2445]/40 backdrop-blur-md transition-opacity duration-500"
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl h-[550px] shadow-2xl flex animate-fade-in overflow-hidden rounded-lg">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
          aria-label="Close"
          type="button"
        >
          <IconX size={20} className="text-[#0F2445]" />
        </button>

        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center text-center bg-white">
          {!isSubmitted ? (
            <>
              <h2 className="text-2xl font-serif text-[#0F2445] tracking-widest mb-2 uppercase">
                Revissant
              </h2>
              <h3 className="text-3xl font-bold text-[#0F2445] mb-4 uppercase">
                Join Us
              </h3>
              <p className="text-gray-400 text-xs tracking-widest mb-10">
                GET 15% DISCOUNT ON YOUR FIRST ORDER
              </p>

              <form
                className="w-full max-w-xs space-y-4"
                onSubmit={handleSubmit}
              >
                {/* Email Input with Absolute Placeholder */}
                <div className="relative w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    className="w-full border border-gray-300 bg-transparent rounded-none py-4 px-4 text-center text-xs font-bold tracking-widest outline-none focus:border-[#0F2445] focus:ring-0 transition-colors appearance-none text-[#0F2445] placeholder-transparent relative z-10"
                    placeholder="EMAIL"
                    required
                  />
                  <span
                    className={[
                      'absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-bold tracking-widest text-gray-400 transition-opacity duration-200 z-0',
                      email || emailFocus ? 'opacity-0' : 'opacity-100',
                    ].join(' ')}
                  >
                    EMAIL
                  </span>
                </div>

                {/* Name Input with Absolute Placeholder */}
                <div className="relative w-full">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    className="w-full border border-gray-300 bg-transparent rounded-none py-4 px-4 text-center text-xs font-bold tracking-widest outline-none focus:border-[#0F2445] focus:ring-0 transition-colors appearance-none text-[#0F2445] placeholder-transparent relative z-10"
                    placeholder="NAME"
                    required
                  />
                  <span
                    className={[
                      'absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-bold tracking-widest text-gray-400 transition-opacity duration-200 z-0',
                      name || nameFocus ? 'opacity-0' : 'opacity-100',
                    ].join(' ')}
                  >
                    NAME
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F2445] text-white rounded-none py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#1a3a6e] transition-colors mt-4 shadow-lg"
                >
                  Become a Member
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 border border-[#0F2445]/20 rounded-full flex items-center justify-center mb-6 text-[#0F2445]">
                <IconCheck size={24} />
              </div>
              <h3 className="text-2xl font-serif text-[#0F2445] italic mb-2">
                Welcome
              </h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                You are on the list
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block w-1/2 relative h-full">
          <img
            src={IMG}
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
