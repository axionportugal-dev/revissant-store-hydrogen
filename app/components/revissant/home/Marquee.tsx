const ITEMS = [
  'Complimentary delivery across Europe over €250',
  'Hand-finished in small ateliers',
  '30-day considered returns',
  'Gift wrapping on every order',
];

/** Faixa contínua com as promessas da casa. */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="overflow-hidden border-b border-ink/10 bg-ivory py-4 text-ink"
      aria-label="Services"
    >
      <div className="flex w-max animate-rv-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {row.map((item, i) => (
              <li
                key={`${copy}-${i}`}
                className="rv-eyebrow flex items-center !text-[10px] text-ink/70"
              >
                <span className="px-8">{item}</span>
                <span className="text-bronze">◆</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
