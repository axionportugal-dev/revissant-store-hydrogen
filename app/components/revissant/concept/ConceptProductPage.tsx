import {useState} from 'react';
import {Link, useParams} from 'react-router';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {useAside} from '~/components/Aside';
import {pushToast} from '~/components/revissant/ui/toast';
import {
  formatPrice,
  getCategoryLabel,
  getRelatedProducts,
  sized,
  type ConceptProduct,
} from './catalog';
import {addToConceptBag} from './bag';
import {ProductCard} from './ProductCard';

/** Vistas da galeria: a fotografia completa + recortes de detalhe. */
const VIEWS = [
  {label: 'View', scale: 1},
  {label: 'Detail', scale: 1.55},
  {label: 'Texture', scale: 2.2},
];

export function ConceptProductPage({product}: {product: ConceptProduct}) {
  const {locale} = useParams();
  const localePrefix = getLocalePathPrefix(locale);
  const {open} = useAside();

  const [finish, setFinish] = useState(product.finishes?.[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(0);

  const related = getRelatedProducts(product, 4);

  function addToBag() {
    addToConceptBag(product, finish, quantity);
    pushToast({message: `${product.title} added to your bag`, type: 'success'});
    open('cart');
  }

  return (
    <div className="bg-ivory pt-16 md:pt-[76px]">
      <div className="rv-container pt-6 md:pt-10">
        <nav
          className="rv-eyebrow !text-[10px] text-muted"
          aria-label="Breadcrumb"
        >
          <Link to={localePrefix || '/'} className="hover:text-ink">
            Home
          </Link>
          <span className="mx-3">/</span>
          <Link
            to={`${localePrefix}/catalog?category=${product.category}`}
            className="hover:text-ink"
          >
            {getCategoryLabel(product.category)}
          </Link>
          <span className="mx-3">/</span>
          <span className="text-ink">{product.title}</span>
        </nav>
      </div>

      <div className="rv-container grid gap-10 pb-24 pt-6 lg:grid-cols-12 lg:gap-16 lg:pt-10">
        {/* Galeria */}
        <div className="lg:col-span-7">
          {/* Desktop: imagem principal + miniaturas */}
          <div className="hidden gap-4 md:grid md:grid-cols-[88px_1fr]">
            <div className="flex flex-col gap-3">
              {VIEWS.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${v.label} image`}
                  aria-pressed={active === i}
                  className={`aspect-[4/5] overflow-hidden border transition-colors ${
                    active === i
                      ? 'border-ink'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <GalleryImage product={product} scale={v.scale} width={200} />
                </button>
              ))}
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-stone">
              <GalleryImage
                product={product}
                scale={VIEWS[active].scale}
                width={1600}
                eager
              />
            </div>
          </div>

          {/* Mobile: carrossel com swipe */}
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 md:hidden">
            {VIEWS.map((v, i) => (
              <div
                key={v.label}
                className="aspect-[4/5] w-[88%] shrink-0 snap-center overflow-hidden bg-stone"
              >
                <GalleryImage
                  product={product}
                  scale={v.scale}
                  width={900}
                  eager={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Informação */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[112px]">
            {product.badge ? (
              <p className="rv-eyebrow text-bronze">{product.badge}</p>
            ) : null}
            <h1 className="rv-display mt-3 text-[48px] text-ink md:text-[64px]">
              {product.title}
            </h1>
            <p className="mt-2 text-[15px] text-muted">{product.subtitle}</p>
            <p className="rv-display mt-6 text-[28px] text-ink">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-[12px] text-muted">
              Taxes included · Complimentary delivery over €250
            </p>

            <p className="mt-8 max-w-lg text-[16px] leading-[1.8] text-ink/80">
              {product.description}
            </p>

            {product.finishes?.length ? (
              <fieldset className="mt-10">
                <legend className="rv-eyebrow text-ink">
                  Finish{' '}
                  <span className="ml-2 normal-case tracking-normal text-muted">
                    {finish}
                  </span>
                </legend>
                <div className="mt-4 flex gap-3">
                  {product.finishes.map((f) => (
                    <button
                      key={f.name}
                      type="button"
                      onClick={() => setFinish(f.name)}
                      aria-label={f.name}
                      aria-pressed={finish === f.name}
                      className={`h-10 w-10 rounded-full p-[3px] transition-shadow ${
                        finish === f.name
                          ? 'ring-1 ring-ink'
                          : 'ring-1 ring-ink/10 hover:ring-ink/40'
                      }`}
                    >
                      <span
                        className="block h-full w-full rounded-full"
                        style={{background: f.swatch}}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}

            <div className="mt-10 flex gap-3">
              <div className="inline-flex items-center border border-ink/20">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-[52px] w-11 text-muted hover:text-ink"
                >
                  −
                </button>
                <span
                  className="w-8 text-center text-[14px]"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-[52px] w-11 text-muted hover:text-ink"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={addToBag}
                className="rv-btn flex-1"
              >
                Add to bag
                <span className="hidden sm:inline">
                  {' '}
                  — {formatPrice(product.price * quantity)}
                </span>
              </button>
            </div>

            <ul className="mt-6 space-y-2 text-[13px] text-muted">
              <li className="flex items-center gap-3">
                <Dot /> In stock — ships within 3–5 working days
              </li>
              <li className="flex items-center gap-3">
                <Dot /> Gift wrapped with a handwritten note
              </li>
            </ul>

            <div className="mt-10 border-t border-ink/10">
              <Accordion title="Details & dimensions" defaultOpen>
                <dl className="grid grid-cols-[110px_1fr] gap-y-2">
                  <dt className="text-muted">Material</dt>
                  <dd>{product.material}</dd>
                  <dt className="text-muted">Dimensions</dt>
                  <dd>{product.dimensions}</dd>
                  <dt className="text-muted">Made in</dt>
                  <dd>Portugal, in small runs</dd>
                </dl>
              </Accordion>
              <Accordion title="Care">
                Wipe with a soft, dry cloth. Natural materials will vary
                slightly from piece to piece and develop character with time —
                this is part of their beauty.
              </Accordion>
              <Accordion title="Delivery & returns">
                Complimentary insured delivery across Europe on orders over
                €250. Thirty days to return, with collection from your door.
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      <section className="border-t border-ink/10 bg-stone py-20 md:py-28">
        <div className="rv-container">
          <div className="flex items-end justify-between gap-6">
            <h2 className="rv-display text-[40px] text-ink md:text-[56px]">
              Styled <em>with</em>
            </h2>
            <Link to={`${localePrefix}/catalog`} className="rv-link text-ink">
              Shop all
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryImage({
  product,
  scale,
  width,
  eager = false,
}: {
  product: ConceptProduct;
  scale: number;
  width: number;
  eager?: boolean;
}) {
  return (
    <img
      src={sized(product.image, Math.round(width * Math.min(scale, 1.6)))}
      alt={product.title}
      loading={eager ? 'eager' : 'lazy'}
      className="h-full w-full object-cover transition-transform duration-700"
      style={{
        objectPosition: product.focus,
        transform: `scale(${scale})`,
        transformOrigin: product.focus ?? 'center',
      }}
    />
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-ink/10">
      <summary className="rv-eyebrow flex cursor-pointer list-none items-center justify-between py-5 text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-lg font-light transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-6 text-[14px] leading-relaxed text-ink/80">
        {children}
      </div>
    </details>
  );
}

function Dot() {
  return (
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6f8f6a]" />
  );
}
