import React, {useMemo, useState} from 'react';

type FAQItem = {
  category: string;
  question: string;
  answer: string;
};

// Podes ajustar o texto depois. Estrutura e UI ficam iguais.
const FAQ_DATA: FAQItem[] = [
  {
    category: 'Orders & Shipping',
    question: 'Where does Revissant ship to?',
    answer:
      'We ship globally to over 50 countries. We work with premium courier partners (DHL, FedEx, UPS) to ensure your items arrive safely and on time, regardless of your location.',
  },
  {
    category: 'Orders & Shipping',
    question: 'How long will my delivery take?',
    answer:
      'For Express shipping, orders are typically delivered within 1-2 business days. Standard Global shipping usually takes between 5-10 business days depending on the destination and customs processing.',
  },
  {
    category: 'Orders & Shipping',
    question: 'How can I track my order?',
    answer:
      "Once your order is dispatched, you will receive an automated email containing your tracking number and a direct link to monitor your package's journey in real-time.",
  },

  {
    category: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, you can return it for a full refund, provided the item is in its original condition and packaging.',
  },
  {
    category: 'Returns & Refunds',
    question: 'Are returns free?',
    answer:
      'Yes, we provide complimentary pre-paid shipping labels for all domestic returns. For international returns, shipping costs may vary depending on your location.',
  },

  {
    category: 'Product & Care',
    question: 'Are your materials sustainable?',
    answer:
      'Absolutely. Sustainability is at the core of Revissant. We use recycled ocean plastics, ethically sourced wood, and premium sustainable polymers for all our products.',
  },
  {
    category: 'Product & Care',
    question: 'Do you offer a warranty?',
    answer:
      "Yes, all Revissant products come with a 2-year manufacturer's warranty covering any defects in materials or workmanship.",
  },
];

function IconSearch(props: {size?: number}) {
  const s = props.size ?? 18;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPlus(props: {size?: number}) {
  const s = props.size ?? 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMinus(props: {size?: number}) {
  const s = props.size ?? 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RevissantFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return FAQ_DATA;
    return FAQ_DATA.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  function toggleAccordion(idx: number) {
    setOpenIndex((cur) => (cur === idx ? null : idx));
  }

  return (
    <div className="rvfaq-root revissant-page-offset">
      <style>{`
        :root{
          --rv-dark:#0b1a2b;
          --rv-blue:#60a5fa;
          --rv-gray-50:#f9fafb;
          --rv-gray-100:#f3f4f6;
          --rv-gray-300:#d1d5db;
          --rv-gray-400:#9ca3af;
          --rv-gray-500:#6b7280;
        }

        .rvfaq-root{
          padding: 48px 16px 72px;
          min-height: 60vh;
          animation: rvfaqFade 220ms ease-out;
        }
        @keyframes rvfaqFade{
          from{opacity:0; transform:translateY(4px);}
          to{opacity:1; transform:translateY(0);}
        }

        .rvfaq-container{
          max-width: 1100px;
          margin: 0 auto;
        }

        .rvfaq-header{
          text-align:center;
          /* Alinha o início visual do título com o catalog sem alterar os espaçamentos internos */
          padding-top: 12px;
          margin-bottom: 64px;
          max-width: 760px;
          margin-left:auto;
          margin-right:auto;
        }

        .rvfaq-title{
          font-family: ui-serif, Georgia, 'Times New Roman', Times, serif;
          font-size: 44px;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: var(--rv-dark);
          margin: 0 0 18px;
            font-weight: 300; /* mais fino */
            -webkit-font-smoothing: antialiased;
            text-rendering: geometricPrecision;
        }
        @media (min-width: 768px){
          .rvfaq-title{ font-size: 56px; }
        }

        .rvfaq-sub{
          color: var(--rv-gray-500);
          font-weight: 300;
          line-height: 1.7;
          margin: 0 0 28px;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
          font-size: 14px;
        }

        .rvfaq-searchWrap{
          position: relative;
          max-width: 520px;
          margin: 0 auto;
        }

        .rvfaq-search{
          width: 100%;
          border: 0;
          border-bottom: 1px solid var(--rv-gray-300);
          padding: 12px 34px 12px 2px;
          outline: none;
          background: transparent;
          color: var(--rv-dark);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
          font-weight: 800;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: .12em;
          transition: border-color 180ms ease;
        }
        .rvfaq-search::placeholder{
          color: var(--rv-gray-400);
        }
        .rvfaq-search:focus{
          border-bottom-color: var(--rv-dark);
        }

        .rvfaq-searchIcon{
          position:absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--rv-gray-400);
          pointer-events:none;
        }

        /* Accordion list */
        .rvfaq-list{
          max-width: 760px;
          margin: 0 auto;
        }

        .rvfaq-item{
          border-bottom: 1px solid var(--rv-gray-100);
          transition: padding 180ms ease;
        }

        .rvfaq-btn{
          width: 100%;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap: 16px;
          padding: 18px 0;
          background: transparent;
          border:0;
          cursor:pointer;
          text-align:left;
        }

        .rvfaq-q{
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
          font-weight: 900;
          font-size: 16px;
          letter-spacing: .02em;
          color: var(--rv-dark);
          transition: color 180ms ease;
        }
        @media (min-width: 768px){
          .rvfaq-q{ font-size: 18px; }
        }

        .rvfaq-item:hover .rvfaq-q{
          color: var(--rv-blue);
        }

        .rvfaq-q.open{
          color: var(--rv-blue);
        }

        .rvfaq-icon{
          color: var(--rv-gray-400);
          transition: transform 220ms ease, color 180ms ease;
          flex-shrink:0;
        }
        .rvfaq-icon.open{
          color: var(--rv-blue);
          transform: rotate(180deg);
        }

        .rvfaq-panel{
          overflow:hidden;
          transition: max-height 420ms ease, opacity 320ms ease;
          max-height: 0;
          opacity: 0;
          padding-right: 28px;
        }
        .rvfaq-panel.open{
          max-height: 240px;
          opacity: 1;
          padding-bottom: 18px;
        }

        .rvfaq-a{
          margin: 0;
          color: var(--rv-gray-500);
          font-weight: 300;
          line-height: 1.7;
          font-size: 14px;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
        }

        .rvfaq-empty{
          text-align:center;
          padding: 48px 0;
          color: var(--rv-gray-400);
          text-transform: uppercase;
          letter-spacing: .16em;
          font-size: 12px;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
          font-weight: 800;
        }

        /* Footer CTA */
        .rvfaq-cta{
          text-align:center;
          margin-top: 72px;
          padding-top: 40px;
          border-top: 1px solid var(--rv-gray-50);
        }
        .rvfaq-ctaTitle{
          margin: 0 0 14px;
          color: var(--rv-dark);
          text-transform: uppercase;
          letter-spacing: .18em;
          font-weight: 900;
          font-size: 12px;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
        }
        .rvfaq-ctaBtn{
          background: var(--rv-dark);
          color: #fff;
          border: 0;
          padding: 12px 40px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .20em;
          cursor: pointer;
          box-shadow: 0 12px 22px rgba(0,0,0,.12);
          transition: background 180ms ease, transform 180ms ease;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
        }
        .rvfaq-ctaBtn:hover{
          background: #111827;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="rvfaq-container">
        <div className="rvfaq-header">
          <h2 className="rvfaq-title">Frequently Asked Questions</h2>
          <p className="rvfaq-sub">
            Find answers to common questions about our products, shipping, and policies.
            If you can&apos;t find what you&apos;re looking for, our concierge team is here to help.
          </p>

          <div className="rvfaq-searchWrap">
            <input
              className="rvfaq-search"
              type="text"
              placeholder="SEARCH FOR ANSWERS..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // mantém a UX consistente quando muda o filtro
                setOpenIndex(0);
              }}
            />
            <div className="rvfaq-searchIcon">
              <IconSearch size={18} />
            </div>
          </div>
        </div>

        <div className="rvfaq-list">
          {filteredFAQs.length ? (
            filteredFAQs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={`${faq.category}-${faq.question}`} className="rvfaq-item">
                  <button
                    type="button"
                    className="rvfaq-btn"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className={`rvfaq-q ${isOpen ? 'open' : ''}`}>{faq.question}</span>
                    <span className={`rvfaq-icon ${isOpen ? 'open' : ''}`}>
                      {isOpen ? <IconMinus size={20} /> : <IconPlus size={20} />}
                    </span>
                  </button>

                  <div className={`rvfaq-panel ${isOpen ? 'open' : ''}`}>
                    <p className="rvfaq-a">{faq.answer}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rvfaq-empty">No results found</div>
          )}
        </div>

        <div className="rvfaq-cta">
          <h4 className="rvfaq-ctaTitle">Still have questions?</h4>
          <button
            type="button"
            className="rvfaq-ctaBtn"
            onClick={() => {
              // nesta fase não vamos integrar “Contact Support” com nada do header/modal
              // para evitar conflitos — mais tarde podemos ligar a /pages/contact ou modal do layout shell.
              window.location.href = '/pages/contact';
            }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
