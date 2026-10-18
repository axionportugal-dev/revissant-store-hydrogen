import {pexels} from '~/components/revissant/concept/catalog';
import {useReveal} from '~/components/revissant/hooks/useReveal';

const MATERIALS = [
  {
    name: 'Stoneware',
    origin: 'Thrown in Caldas da Rainha',
    text: 'Speckled clays fired at 1,280 °C, glazed by hand and left raw at the foot.',
    image: pexels(11065504, 900),
  },
  {
    name: 'Brass & glass',
    origin: 'Blown and turned in Marinha Grande',
    text: 'Mouth-blown opal glass and solid brass that develops a soft patina with use.',
    image: pexels(34237532, 900),
  },
  {
    name: 'Linen',
    origin: 'Woven in the north',
    text: 'European flax, stone-washed until supple, dyed with low-impact pigments.',
    image: pexels(11733651, 900),
  },
];

/** Materiais & origem — três colunas editoriais. */
export function Craft() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-ivory py-24 md:py-36">
      <div className="rv-container">
        <div className="rv-reveal mx-auto max-w-3xl text-center">
          <p className="rv-eyebrow text-bronze">Materials & making</p>
          <h2 className="rv-display mt-5 text-[40px] text-ink md:text-[64px]">
            Made by hand, <em>made to last</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-muted">
            Every piece begins with a material and a maker. We work directly
            with small Portuguese and European ateliers, in limited runs.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
          {MATERIALS.map((m, i) => (
            <article
              key={m.name}
              className={`rv-reveal ${i === 1 ? 'md:mt-20' : ''}`}
              style={{transitionDelay: `${i * 140}ms`}}
            >
              <div className="aspect-[3/4] overflow-hidden bg-stone">
                <img
                  src={m.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="rv-eyebrow mt-6 text-muted">
                0{i + 1} — {m.origin}
              </p>
              <h3 className="rv-display mt-3 text-[32px] text-ink">{m.name}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                {m.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
