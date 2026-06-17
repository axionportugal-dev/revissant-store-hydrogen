import {useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).catalog';
import type {CatalogProductsQuery} from 'storefrontapi.generated';
import {RevissantCatalogPage} from '~/components/revissant/catalog';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Catalog | REVISSANT'}];
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

function quoteTag(tag: string) {
  // Tags agora já não têm espaços, mas isto evita bugs futuros
  return tag.includes(' ') ? `"${tag}"` : tag;
}

export async function loader({request, context}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sp = url.searchParams;

  // tag única
  const selectedTagRaw = sp.get('tag') ?? '';
  const selectedTag = selectedTagRaw.trim() ? selectedTagRaw.trim() : null;

  // price range único (ex.: "0-20", "20-50", "100+")
  const selectedPriceRangeRaw = sp.get('price') ?? '';
  const selectedPriceRange = selectedPriceRangeRaw.trim()
    ? selectedPriceRangeRaw.trim()
    : null;

  // map price range -> min/max
  let minPrice: number | null = null;
  let maxPrice: number | null = null;

  if (selectedPriceRange) {
    if (selectedPriceRange === '100+') {
      minPrice = 100;
      maxPrice = null;
    } else {
      const [minStr, maxStr] = selectedPriceRange.split('-');
      const minNum = Number(minStr);
      const maxNum = Number(maxStr);

      if (Number.isFinite(minNum)) minPrice = minNum;
      if (Number.isFinite(maxNum)) maxPrice = maxNum;
    }
  }

  const queryParts: string[] = [];

  if (selectedTag) {
    queryParts.push(`tag:${quoteTag(selectedTag)}`);
  }

  if (Number.isFinite(minPrice)) queryParts.push(`variants.price:>=${minPrice}`);
  if (Number.isFinite(maxPrice)) queryParts.push(`variants.price:<=${maxPrice}`);

  const query = queryParts.length ? queryParts.join(' AND ') : null;

  const result = await context.storefront.query(CATALOG_PRODUCTS_QUERY, {
    variables: {
      first: 48,
      query,
    },
  });

  const products = result.products.nodes.map(
    (p: CatalogProductsQuery['products']['nodes'][number]) => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      tags: p.tags ?? [],
      image: p.featuredImage
        ? {url: p.featuredImage.url, altText: p.featuredImage.altText ?? p.title}
        : null,
      minPrice: p.priceRange.minVariantPrice,
      selectedVariant: p.selectedOrFirstAvailableVariant,
    }),
  );

  return {
    products,
    selectedTag,
    selectedPriceRange,
  };
}

export default function CatalogRoute() {
  // só para garantir type-check (e evitar warning de “unused loader” em alguns setups)
  useLoaderData<typeof loader>();
  return <RevissantCatalogPage />;
}
