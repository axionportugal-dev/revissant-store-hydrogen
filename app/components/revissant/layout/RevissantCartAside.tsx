import {Suspense, useEffect} from 'react';
import {Await, Link, useParams} from 'react-router';
import {
  CartForm,
  Image,
  Money,
  useOptimisticCart,
  type OptimisticCartLine,
} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';
import {useLockBodyScroll} from '~/components/revissant/hooks/useLockBodyScroll';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {
  formatPrice,
  getConceptProduct,
  BEST_SELLERS,
  sized,
} from '~/components/revissant/concept/catalog';
import {
  getConceptBagTotals,
  updateConceptBagLine,
  useConceptBag,
} from '~/components/revissant/concept/bag';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

type RevissantCartAsideProps = {
  cart: Promise<CartApiQueryFragment | null>;
};

const FREE_SHIPPING_THRESHOLD = 250;

export function RevissantCartAside({cart}: RevissantCartAsideProps) {
  const {type, close} = useAside();
  const open = type === 'cart';

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === 'Escape' && close();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  return (
    <Suspense fallback={<CartDrawer cart={null} open={open} onClose={close} />}>
      <Await
        resolve={cart}
        errorElement={<CartDrawer cart={null} open={open} onClose={close} />}
      >
        {(resolvedCart: CartApiQueryFragment | null) => (
          <CartDrawer cart={resolvedCart} open={open} onClose={close} />
        )}
      </Await>
    </Suspense>
  );
}

function CartDrawer({
  cart: originalCart,
  open,
  onClose,
}: {
  cart: CartApiQueryFragment | null;
  open: boolean;
  onClose: () => void;
}) {
  const cart = useOptimisticCart(originalCart);
  const conceptBag = useConceptBag();
  const totalQuantity =
    (cart?.totalQuantity ?? 0) + getConceptBagTotals(conceptBag).quantity;

  return (
    <>
      <button
        type="button"
        aria-label="Close bag"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`fixed inset-0 z-[110] bg-ink-deep/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        aria-hidden={!open}
        aria-label="Shopping bag"
        className={`fixed right-0 top-0 z-[120] flex h-full w-full flex-col bg-ivory text-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] sm:w-[440px] ${
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink/10 px-6 md:h-[76px]">
          <p className="rv-eyebrow">
            Your bag <span className="ml-1 text-muted">({totalQuantity})</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-60"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 5l14 14M19 5 5 19"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <BagContents cart={originalCart} onNavigate={onClose} />
      </aside>
    </>
  );
}

/** Linhas + resumo do saco — usado no drawer e na página /cart. */
export function BagContents({
  cart: originalCart,
  onNavigate,
}: {
  cart: CartApiQueryFragment | null;
  onNavigate?: () => void;
}) {
  const {locale} = useParams();
  const localePrefix = getLocalePathPrefix(locale);
  const cart = useOptimisticCart(originalCart);
  const lines = (cart?.lines?.nodes ?? []) as CartLine[];

  const conceptBag = useConceptBag();
  const conceptTotals = getConceptBagTotals(conceptBag);
  const hasItems = lines.length > 0 || conceptBag.length > 0;

  const shopifySubtotal = Number(cart?.cost?.subtotalAmount?.amount ?? 0);
  const subtotal = shopifySubtotal + conceptTotals.subtotal;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);

  return (
    <>
      {!hasItems ? (
        <EmptyBag onClose={onNavigate} localePrefix={localePrefix} />
      ) : (
        <>
          <div className="border-b border-ink/10 px-6 py-4">
            <p className="text-[13px] text-muted">
              {remaining > 0 ? (
                <>
                  You are{' '}
                  <span className="text-ink">{formatPrice(remaining)}</span>{' '}
                  away from complimentary delivery.
                </>
              ) : (
                'Your order qualifies for complimentary delivery.'
              )}
            </p>
            <div className="mt-3 h-px w-full bg-ink/10">
              <div
                className="h-px bg-bronze transition-[width] duration-700"
                style={{width: `${progress * 100}%`}}
              />
            </div>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {lines.map((line) => (
              <ShopifyLine key={line.id} line={line} />
            ))}

            {conceptBag.map((line, index) => {
              const product = getConceptProduct(line.handle);
              if (!product) return null;
              return (
                <div
                  key={`${line.handle}-${line.finish ?? ''}`}
                  className="flex gap-4"
                >
                  <Link
                    to={`${localePrefix}/products/${product.handle}`}
                    onClick={onNavigate}
                    className="block h-28 w-[88px] shrink-0 overflow-hidden bg-stone"
                  >
                    <img
                      src={sized(product.image, 300)}
                      alt={product.title}
                      className="h-full w-full object-cover"
                      style={{objectPosition: product.focus}}
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="rv-display text-xl">{product.title}</p>
                        <p className="mt-0.5 text-[13px] text-muted">
                          {line.finish ?? product.subtitle}
                        </p>
                      </div>
                      <p className="text-[14px]">
                        {formatPrice(product.price * line.quantity)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <QuantityStepper
                        value={line.quantity}
                        onChange={(q) => updateConceptBagLine(index, q)}
                      />
                      <button
                        type="button"
                        onClick={() => updateConceptBagLine(index, 0)}
                        className="text-[12px] text-muted underline-offset-4 hover:text-ink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-ink/10 bg-stone/60 px-6 pb-6 pt-5">
            <div className="flex items-baseline justify-between">
              <span className="rv-eyebrow">Subtotal</span>
              <span className="rv-display text-2xl">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-[12px] text-muted">
              Taxes included. Delivery calculated at checkout.
            </p>

            {cart?.checkoutUrl &&
            lines.length > 0 &&
            conceptBag.length === 0 ? (
              <a
                href={cart.checkoutUrl}
                target="_self"
                className="rv-btn mt-5 w-full"
              >
                Checkout
              </a>
            ) : (
              <>
                <button type="button" disabled className="rv-btn mt-5 w-full">
                  Checkout
                </button>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
                  Concept preview — checkout opens when the collection launches.
                </p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

function EmptyBag({
  onClose,
  localePrefix,
}: {
  onClose?: () => void;
  localePrefix: string;
}) {
  const suggestions = BEST_SELLERS.slice(0, 2);
  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-6 py-10">
      <p className="rv-display text-3xl">Your bag is empty.</p>
      <p className="mt-3 text-[14px] leading-relaxed text-muted">
        Begin with something quiet and beautiful.
      </p>
      <Link
        to={`${localePrefix}/catalog`}
        onClick={onClose}
        className="rv-btn mt-8 self-start"
      >
        Explore the collection
      </Link>

      <p className="rv-eyebrow mt-14 text-muted">Most loved</p>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {suggestions.map((p) => (
          <Link
            key={p.handle}
            to={`${localePrefix}/products/${p.handle}`}
            onClick={onClose}
            className="group block"
          >
            <div className="aspect-[4/5] overflow-hidden bg-stone">
              <img
                src={sized(p.image, 500)}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{objectPosition: p.focus}}
              />
            </div>
            <p className="rv-display mt-3 text-lg">{p.title}</p>
            <p className="text-[13px] text-muted">{formatPrice(p.price)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-ink/15">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className="h-8 w-8 text-muted transition-colors hover:text-ink"
      >
        −
      </button>
      <span className="w-6 text-center text-[13px]">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="h-8 w-8 text-muted transition-colors hover:text-ink"
      >
        +
      </button>
    </div>
  );
}

function ShopifyLine({line}: {line: CartLine}) {
  const merchandise = line.merchandise;
  const image = merchandise?.image;
  const title = merchandise?.product?.title ?? 'Product';
  const options = merchandise?.selectedOptions ?? [];
  const variantLabel = options.map((o) => o.value).join(' · ') || 'Standard';

  return (
    <div className="flex gap-4">
      {image ? (
        <Image
          data={image}
          alt={image.altText || title}
          width={88}
          height={112}
          className="h-28 w-[88px] shrink-0 bg-stone object-cover"
        />
      ) : (
        <div className="h-28 w-[88px] shrink-0 bg-stone" />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="rv-display text-xl">{title}</p>
            <p className="mt-0.5 text-[13px] text-muted">
              {variantLabel} · Qty {line.quantity}
            </p>
          </div>
          {line.cost?.totalAmount ? (
            <Money data={line.cost.totalAmount} className="text-[14px]" />
          ) : null}
        </div>
        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.LinesRemove}
          inputs={{lineIds: [line.id]}}
        >
          <button
            type="submit"
            disabled={Boolean(line.isOptimistic)}
            className="mt-3 text-[12px] text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Remove
          </button>
        </CartForm>
      </div>
    </div>
  );
}
