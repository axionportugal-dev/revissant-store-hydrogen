import {Link, useParams} from 'react-router';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import {pushToast} from '~/components/revissant/ui/toast';
import {formatPrice, sized, type ConceptProduct} from './catalog';
import {addToConceptBag} from './bag';

export function ProductCard({
  product,
  priority = false,
  className = '',
}: {
  product: ConceptProduct;
  priority?: boolean;
  className?: string;
}) {
  const {locale} = useParams();
  const to = `${getLocalePathPrefix(locale)}/products/${product.handle}`;

  function quickAdd() {
    addToConceptBag(product, product.finishes?.[0]?.name);
    pushToast({message: `${product.title} added to your bag`, type: 'success'});
  }

  return (
    <article className={`group ${className}`}>
      <div className="relative">
        <Link
          to={to}
          prefetch="intent"
          className="block"
          aria-label={product.title}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            <img
              src={sized(product.image, 800)}
              srcSet={`${sized(product.image, 500)} 500w, ${sized(product.image, 800)} 800w, ${sized(product.image, 1200)} 1200w`}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
              alt={product.title}
              loading={priority ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.06]"
              style={{objectPosition: product.focus}}
            />
            {product.badge ? (
              <span className="rv-eyebrow absolute left-4 top-4 bg-ivory/90 px-2.5 py-1.5 !text-[9px] text-ink">
                {product.badge}
              </span>
            ) : null}
          </div>
        </Link>

        {/* Quick add — aparece no hover (desktop) */}
        {product.external ? null : (
          <button
            type="button"
            onClick={quickAdd}
            className="rv-eyebrow absolute inset-x-4 bottom-4 hidden translate-y-2 bg-ivory/95 py-3.5 text-center !text-[10px] text-ink opacity-0 transition-all duration-500 hover:bg-ink hover:text-ivory focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:block"
            aria-label={`Add ${product.title} to bag`}
          >
            Quick add
          </button>
        )}
      </div>

      <Link
        to={to}
        prefetch="intent"
        className="mt-4 flex items-start justify-between gap-4"
      >
        <div className="min-w-0">
          <h3 className="rv-display text-[21px] leading-tight">
            {product.title}
          </h3>
          <p className="mt-1 text-[13px] text-muted">{product.subtitle}</p>
        </div>
        <p className="shrink-0 pt-0.5 text-[14px]">
          {formatPrice(product.price)}
        </p>
      </Link>
    </article>
  );
}
