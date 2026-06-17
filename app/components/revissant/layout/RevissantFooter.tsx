import * as React from 'react';
import {Link, useParams} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';

import ContactModal from '~/components/revissant/policies/ContactModal';
import DeliveryModal from '~/components/revissant/policies/DeliveryModal';
import PrivacyPolicyModal from '~/components/revissant/policies/PrivacyPolicyModal';
import ReturnsModal from '~/components/revissant/policies/ReturnsModal';
import TermsModal from '~/components/revissant/policies/TermsModal';

import {CheckIcon, InstagramIcon} from '~/components/revissant/ui/icons';

type RevissantFooterProps = {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
};

export function RevissantFooter(_props: RevissantFooterProps) {
  const params = useParams();
  const localePrefix = getLocalePathPrefix(params?.locale);

  const [email, setEmail] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [isReturnsOpen, setIsReturnsOpen] = React.useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = React.useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  const [isTermsOpen, setIsTermsOpen] = React.useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitted(true);

    window.setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <footer className="revissant-footer bg-white pt-20 pb-0 border-t border-gray-100 overflow-hidden relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 relative z-10">
            {/* Join Us Column (AI Studio 1:1) */}
            <div className="space-y-6">
              <h4 className="font-bold text-revissant-dark text-sm tracking-widest uppercase">
                Join Us
              </h4>

              {/* ⚠️ NÃO usar whitespace-nowrap (isso é o que te está a invadir a coluna Policy) */}
              <p className="text-gray-500 text-xs font-light">
                SIGN UP FOR EMAILS AND GET 15% OFF YOUR FIRST ORDER
              </p>

              <form
                className="revissant-form flex flex-col gap-2 max-w-xs"
                onSubmit={handleNewsletterSubmit}
              >
                <div className="flex border-b border-revissant-dark py-2 relative">
                  <input
                    type="email"
                    placeholder={isSubmitted ? 'THANK YOU' : 'EMAIL'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={isSubmitted}
                    className="w-full outline-none text-revissant-dark text-sm placeholder-revissant-dark font-bold uppercase bg-transparent pr-8 transition-colors border-0 p-0 m-0 ring-0 focus:ring-0 focus:outline-none"
                  />
                  {isSubmitted && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-revissant-dark animate-fade-in">
                      <CheckIcon size={16} strokeWidth={4} />
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Policy Column (AI Studio 1:1) */}
            <div className="space-y-6 text-center md:text-left">
              <h4 className="font-bold text-revissant-dark text-sm tracking-widest uppercase">
                Policy
              </h4>

              <ul className="space-y-4 text-xs text-gray-500 font-medium">
                <li>
                  <Link
                    to={`${localePrefix}/faq`}
                    className="hover:text-revissant-dark transition-colors uppercase"
                  >
                    FAQ
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => setIsPrivacyOpen(true)}
                    className="hover:text-revissant-dark transition-colors uppercase"
                  >
                    PRIVACY POLICY
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => setIsTermsOpen(true)}
                    className="hover:text-revissant-dark transition-colors uppercase"
                  >
                    TERMS AND CONDITIONS
                  </button>
                </li>
              </ul>
            </div>

            {/* Support Column (AI Studio 1:1) */}
            <div className="space-y-6 text-right md:text-right flex flex-col items-end">
              <h4 className="font-bold text-revissant-dark text-sm tracking-widest uppercase">
                Support
              </h4>

              <ul className="space-y-4 text-xs text-gray-500 font-medium w-full">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsReturnsOpen(true)}
                    className="hover:text-revissant-dark transition-colors uppercase"
                  >
                    RETURNS
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => setIsDeliveryOpen(true)}
                    className="hover:text-revissant-dark transition-colors uppercase"
                  >
                    DELIVERY
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(true)}
                    className="hover:text-revissant-dark transition-colors uppercase"
                  >
                    CONTACT
                  </button>
                </li>
              </ul>

              <div className="flex gap-4 mt-8 justify-end">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-revissant-dark hover:text-revissant-accent transition-colors"
                >
                  <InstagramIcon size={24} />
                </a>

                <div className="w-6 h-6 bg-revissant-dark rounded-full text-white flex items-center justify-center font-bold text-xs">
                  t
                </div>
              </div>

              <div className="mt-4 text-[10px] text-gray-400 font-bold uppercase">
                Country and Language{' '}
                <span className="text-gray-500 ml-2">PT / PORTUGAL / EUR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Logo (imagem do /public) — já disseste que está OK, mantive a tua abordagem */}
        <div className="relative w-full mt-10 h-[24vh] md:h-[32vh] pointer-events-none select-none">
          <img
            src="/logotipo.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-none w-[120vw] md:w-[110vw] translate-y-[30%]"
          />
        </div>
      </footer>

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ReturnsModal
        isOpen={isReturnsOpen}
        onClose={() => setIsReturnsOpen(false)}
      />
      <DeliveryModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
      />
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
}
