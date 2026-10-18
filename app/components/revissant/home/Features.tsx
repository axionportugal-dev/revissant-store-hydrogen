import {useReveal} from '~/components/revissant/hooks/useReveal';

/**
 * "The Revissant Standard" (AI Studio) — agora como faixa de serviços
 * discreta, com ícones de traço fino.
 */
const SERVICES = [
  {
    title: 'Complimentary delivery',
    text: 'Insured, carbon-neutral delivery across Europe on orders over €250.',
    icon: (
      <path d="M3 7h11v9H3zM14 10.5h3.6L21 13.8V16h-7M7 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    ),
  },
  {
    title: 'Hand-finished',
    text: 'Each piece is made in small runs and inspected by hand before it leaves us.',
    icon: (
      <path d="M12 3.5 14.4 9l5.6.5-4.3 3.8 1.3 5.6L12 16l-5 2.9 1.3-5.6L4 9.5 9.6 9 12 3.5Z" />
    ),
  },
  {
    title: 'Considered returns',
    text: 'Thirty days to live with it. If it is not right, we collect it from your door.',
    icon: <path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5" />,
  },
  {
    title: 'Gift wrapping',
    text: 'Every order arrives wrapped in recycled tissue with a handwritten note.',
    icon: (
      <path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-1.5-3-5-3-5-1s3 1 5 1Zm0 0c1.5-3 5-3 5-1s-3 1-5 1Z" />
    ),
  },
];

export function Features() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="border-t border-ink/10 bg-ivory py-20 md:py-24"
    >
      <div className="rv-container">
        <p className="rv-eyebrow rv-reveal text-center text-bronze">
          The Revissant standard
        </p>
        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="rv-reveal text-center"
              style={{transitionDelay: `${i * 100}ms`}}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-ink"
                aria-hidden="true"
              >
                {s.icon}
              </svg>
              <h3 className="rv-display mt-6 text-[24px] text-ink">
                {s.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[260px] text-[14px] leading-relaxed text-muted">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
