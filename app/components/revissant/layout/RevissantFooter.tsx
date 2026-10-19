import * as React from 'react';
import {Link, useParams} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {CATEGORIES} from '~/components/revissant/concept/catalog';

import ContactModal from '~/components/revissant/policies/ContactModal';
import DeliveryModal from '~/components/revissant/policies/DeliveryModal';
import PrivacyPolicyModal from '~/components/revissant/policies/PrivacyPolicyModal';
import ReturnsModal from '~/components/revissant/policies/ReturnsModal';
import TermsModal from '~/components/revissant/policies/TermsModal';

type RevissantFooterProps = {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
};

type ModalKey = 'contact' | 'returns' | 'delivery' | 'privacy' | 'terms' | null;

export function RevissantFooter(_props: RevissantFooterProps) {
  const params = useParams();
  const localePrefix = getLocalePathPrefix(params?.locale);

  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [modal, setModal] = React.useState<ModalKey>(null);
  const closeModal = () => setModal(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-ink-deep text-ivory">
        <div className="rv-container pb-10 pt-20 md:pt-28">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_2fr]">
            {/* Newsletter */}
            <div>
              <p className="rv-eyebrow text-sand">The Revissant letter</p>
              <h2 className="rv-display mt-5 max-w-md text-4xl md:text-5xl">
                Notes on living <em className="text-sand">beautifully</em>.
              </h2>
              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ivory/60">
                New collections, studio stories and private previews. Enjoy 10%
                off your first order.
              </p>

              {submitted ? (
                <p className="mt-10 max-w-sm border-b border-sand/60 pb-3 text-[14px] text-sand">
                  Thank you — welcome to the house.
                </p>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="mt-10 flex max-w-sm items-end border-b border-ivory/30 focus-within:border-ivory"
                >
                  <label className="sr-only" htmlFor="footer-email">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full border-0 bg-transparent py-3 text-[14px] text-ivory placeholder:text-ivory/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rv-eyebrow shrink-0 py-3 pl-4 text-ivory/80 hover:text-ivory"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <FooterColumn title="Shop">
                <FooterLink to={`${localePrefix}/catalog`}>
                  All pieces
                </FooterLink>
                {CATEGORIES.slice(0, 5).map((c) => (
                  <FooterLink
                    key={c.value}
                    to={`${localePrefix}/catalog?category=${c.value}`}
                  >
                    {c.label}
                  </FooterLink>
                ))}
              </FooterColumn>

              <FooterColumn title="Client care">
                <FooterButton onClick={() => setModal('delivery')}>
                  Delivery
                </FooterButton>
                <FooterButton onClick={() => setModal('returns')}>
                  Returns
                </FooterButton>
                <FooterLink to={`${localePrefix}/faq`}>FAQ</FooterLink>
                <FooterButton onClick={() => setModal('contact')}>
                  Contact
                </FooterButton>
              </FooterColumn>

              <FooterColumn title="The house">
                <FooterButton onClick={() => setModal('privacy')}>
                  Privacy
                </FooterButton>
                <FooterButton onClick={() => setModal('terms')}>
                  Terms
                </FooterButton>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] text-ivory/60 transition-colors hover:text-ivory"
                >
                  Instagram
                </a>
              </FooterColumn>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[12px] text-ivory/40 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Revissant. Designed in Portugal.</p>
            <p>Portugal · EUR € · English</p>
          </div>
        </div>

        {/* Logotipo monumental */}
        <div
          className="pointer-events-none select-none px-4 pb-6 md:px-10 md:pb-10"
          aria-hidden="true"
        >
          <img
            src="/brand/revissant-white.png"
            alt=""
            draggable={false}
            className="w-full opacity-[0.08]"
          />
        </div>
      </footer>

      <ContactModal isOpen={modal === 'contact'} onClose={closeModal} />
      <ReturnsModal isOpen={modal === 'returns'} onClose={closeModal} />
      <DeliveryModal isOpen={modal === 'delivery'} onClose={closeModal} />
      <PrivacyPolicyModal isOpen={modal === 'privacy'} onClose={closeModal} />
      <TermsModal isOpen={modal === 'terms'} onClose={closeModal} />
    </>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="rv-eyebrow text-ivory/40">{title}</p>
      <ul className="mt-6 flex flex-col items-start gap-3">
        {React.Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({to, children}: {to: string; children: React.ReactNode}) {
  return (
    <Link
      to={to}
      className="text-[14px] text-ivory/60 transition-colors hover:text-ivory"
    >
      {children}
    </Link>
  );
}

function FooterButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left text-[14px] text-ivory/60 transition-colors hover:text-ivory"
    >
      {children}
    </button>
  );
}
