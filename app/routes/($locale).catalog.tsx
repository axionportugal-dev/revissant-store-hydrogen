import type {Route} from './+types/($locale).catalog';
import type {CatalogProductsQuery} from 'storefrontapi.generated';
import {RevissantCatalogPage} from '~/components/revissant/catalog';
import {
  CATEGORIES,
  CONCEPT_PRODUCTS,
  type ConceptCategory,
  type ConceptProduct,
} from '~/components/revissant/concept/catalog';

export const meta: Route.MetaFunction = () => {
  return [{title: 'The Collection | REVISSANT'}];
};

const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment CatalogProductCard on Product {
    id
    title
    handle
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    selectedOrFirstAvailableVariant {
      id
      availableForSale
      title
      price {
        amount
        currencyCode
      }
      image {
        id
        url
        altText
        width
        height
      }
      product {
        id
        handle
        title
      }
      selectedOptions {
        name
        value
      }
    }
  }
` as const;

const CATALOG_PRODUCTS_QUERY = `#graphql
  query CatalogProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int!
    $query: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, query: $query) {
      nodes {
        ...CatalogProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

export type CatalogSort = 'featured' | 'price-asc' | 'price-desc' | 'name';

const PRICE_BANDS: Record<string, [number, number]> = {
  'under-100': [0, 100],
  '100-250': [100, 250],
  '250-plus': [250, Number.POSITIVE_INFINITY],
};

export async function loader({request, context}: Route.LoaderArgs) {
  const sp = new URL(request.url).searchParams;
  const category = sp.get('category')?.trim() || null;
  const price = sp.get('price')?.trim() || null;
  const sort = (sp.get('sort')?.trim() || 'featured') as CatalogSort;

  const result = await context.storefront
    .query(CATALOG_PRODUCTS_QUERY, {variables: {first: 48, query: null}})
    .catch((error: Error) => {
      // Loja indisponível / API em baixo: usa o catálogo de conceito.
      console.error(error);
      return null;
    });

  const shopifyProducts: ConceptProduct[] = (result?.products.nodes ?? []).map(
    (p: CatalogProductsQuery['products']['nodes'][number]) => ({
      handle: p.handle,
      title: p.title,
      subtitle: p.selectedOrFirstAvailableVariant?.title ?? '',
      category: (p.tags.find((t) => t.startsWith('cat-'))?.slice(4) ??
        'objects') as ConceptCategory,
      price: Number(p.priceRange.minVariantPrice.amount),
      image: p.featuredImage?.url ?? '',
      material: '',
      dimensions: '',
      description: '',
      external: true,
    }),
  );

  const source = shopifyProducts.length ? 'shopify' : 'concept';
  const all = shopifyProducts.length ? shopifyProducts : CONCEPT_PRODUCTS;

  let products = all.filter((p) => {
    if (category && p.category !== category) return false;
    if (price && PRICE_BANDS[price]) {
      const [min, max] = PRICE_BANDS[price];
      if (p.price < min || p.price >= max) return false;
    }
    return true;
  });

  if (sort === 'price-asc')
    products = [...products].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc')
    products = [...products].sort((a, b) => b.price - a.price);
  if (sort === 'name')
    products = [...products].sort((a, b) => a.title.localeCompare(b.title));

  const counts = Object.fromEntries(
    CATEGORIES.map((c) => [
      c.value,
      all.filter((p) => p.category === c.value).length,
    ]),
  ) as Record<ConceptCategory, number>;

  return {products, total: all.length, counts, category, price, sort, source};
}

export default function CatalogRoute() {
  return <RevissantCatalogPage />;
}
