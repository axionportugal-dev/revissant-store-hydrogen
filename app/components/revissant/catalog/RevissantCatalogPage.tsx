import {Fragment} from 'react';
import {
  Link,
  useLoaderData,
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router';
import {getLocalePathPrefix} from '~/components/revissant/utils/getLocalePathPrefix';
import type {loader} from '~/routes/($locale).catalog';
import {
  CATEGORIES,
  EDITORIAL,
  getCategoryLabel,
} from '~/components/revissant/concept/catalog';
import {ProductCard} from '~/components/revissant/concept/ProductCard';

const PRICES = [
  {value: '', label: 'Any price'},
  {value: 'under-100', label: 'Under €100'},
  {value: '100-250', label: '€100 – €250'},
  {value: '250-plus', label: '€250 +'},
];

const SORTS = [
  {value: 'featured', label: 'Featured'},
  {value: 'price-asc', label: 'Price, low to high'},
  {value: 'price-desc', label: 'Price, high to low'},
  {value: 'name', label: 'Name'},
];

export function RevissantCatalogPage() {
  const {products, total, counts, category, price, sort} =
    useLoaderData<typeof loader>();
  const [params, setParams] = useSearchParams();
  const navigation = useNavigation();
  const loading =
    navigation.state === 'loading' &&
    navigation.location?.pathname.endsWith('/catalog');
  const {locale} = useParams();
  const homePath = getLocalePathPrefix(locale) || '/';

  const activeCategory = CATEGORIES.find((c) => c.value === category) ?? null;

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, {preventScrollReset: true});
  }

  return (
    <div className="bg-ivory">
      {/* Cabeçalho editorial */}
      <header className="relative overflow-hidden bg-ink text-ivory">
        <img
          src={activeCategory?.image ?? EDITORIAL.manifesto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="rv-container relative pb-14 pt-36 md:pb-20 md:pt-48">
          <nav
            className="rv-eyebrow !text-[10px] text-ivory/60"
            aria-label="Breadcrumb"
          >
            <Link to={homePath} className="hover:text-ivory">
              Home
            </Link>
            <span className="mx-3">/</span>
            <span className="text-ivory">
              {activeCategory ? activeCategory.label : 'The collection'}
            </span>
          </nav>
          <h1 className="rv-display mt-6 text-[56px] md:text-[96px]">
            {activeCategory ? activeCategory.label : 'The collection'}
          </h1>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ivory/75">
            {activeCategory
              ? activeCategory.blurb
              : 'Objects for considered living — vessels, light, scent and texture, made by hand in small ateliers.'}
          </p>
        </div>
      </header>

      {/* Barra de filtros */}
      <div className="sticky top-16 z-30 border-b border-ink/10 bg-ivory/95 backdrop-blur md:top-[76px]">
        <div className="rv-container flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <FilterChip
              active={!category}
              onClick={() => setParam('category', null)}
            >
              All <span className="text-muted">{total}</span>
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.value}
                active={category === c.value}
                onClick={() => setParam('category', c.value)}
              >
                {c.label}{' '}
                <span className="text-muted">{counts[c.value] ?? 0}</span>
              </FilterChip>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 lg:flex lg:items-center">
            <Select
              label="Price"
              value={price ?? ''}
              options={PRICES}
              onChange={(v) => setParam('price', v || null)}
            />
            <Select
              label="Sort"
              value={sort}
              options={SORTS}
              onChange={(v) => setParam('sort', v === 'featured' ? null : v)}
            />
          </div>
        </div>
      </div>

      {/* Grelha */}
      <section className="rv-container py-12 md:py-16">
        <p className="mb-8 text-[13px] text-muted">
          {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          {category ? ` in ${getCategoryLabel(category).toLowerCase()}` : ''}
        </p>

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="rv-display text-4xl text-ink">Nothing here — yet.</p>
            <p className="mt-3 text-[15px] text-muted">
              Try another price or category.
            </p>
            <button
              type="button"
              onClick={() =>
                setParams(new URLSearchParams(), {preventScrollReset: true})
              }
              className="rv-btn mt-8"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 gap-x-4 gap-y-12 transition-opacity duration-300 md:gap-x-6 md:gap-y-16 lg:grid-cols-3 xl:grid-cols-4 ${
              loading ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {products.map((p, i) => (
              <Fragment key={p.handle}>
                <ProductCard product={p} priority={i < 4} />
                {/* quebra editorial depois da primeira fila completa */}
                {i === 5 && !category && products.length > 8 ? (
                  <EditorialBreak />
                ) : null}
              </Fragment>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EditorialBreak() {
  return (
    <div className="relative col-span-2 min-h-[420px] overflow-hidden bg-ink text-ivory lg:col-span-3 xl:col-span-2 xl:row-span-1">
      <img
        src={EDITORIAL.rituals}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
        <p className="rv-eyebrow text-sand">Evening rituals</p>
        <p className="rv-display mt-4 max-w-sm text-4xl">
          Candles poured in small batches.
        </p>
        <Link
          to="?category=fragrance"
          className="rv-link mt-6 self-start text-ivory"
        >
          Shop fragrance
        </Link>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rv-eyebrow shrink-0 whitespace-nowrap border px-4 py-2.5 !text-[10px] transition-colors ${
        active
          ? 'border-ink bg-ink text-ivory [&_span]:text-ivory/60'
          : 'border-ink/15 text-ink hover:border-ink'
      }`}
    >
      {children}
    </button>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{value: string; label: string}>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative flex min-w-0 items-center gap-2 border border-ink/15 px-3 py-2.5 md:px-4 transition-colors focus-within:border-ink hover:border-ink">
      <span className="rv-eyebrow !text-[10px] text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 appearance-none truncate bg-transparent pr-5 text-[13px] text-ink focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-3"
      >
        <path
          d="m6 9 6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </label>
  );
}
