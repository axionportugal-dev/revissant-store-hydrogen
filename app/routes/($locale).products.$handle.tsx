import {useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).products.$handle';
import type {
  FallbackProductsQuery,
  ProductRecommendationsQuery,
} from 'storefrontapi.generated';
import {RevissantProductPage} from '~/components/revissant/product';

import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';

import {redirectIfHandleIsLocalized} from '~/lib/redirect';

type RecommendedProduct = NonNullable<
  NonNullable<ProductRecommendationsQuery['productRecommendations']>[number]
>;
type FallbackProduct = FallbackProductsQuery['products']['nodes'][number];


export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // recommendations (You may also like) — Shopify first, fallback only if empty
  const recoData = await storefront.query(RECOMMENDATIONS_QUERY, {
    variables: {productId: product.id},
  });

  let recommendations = (
    recoData?.productRecommendations ?? []
  ).filter(Boolean) as RecommendedProduct[];

  // Fallback C: se não houver recomendações da Shopify ainda
  if (recommendations.length === 0) {
    const tags = (product.tags ?? []) as string[];
    const catTag = tags.find((t) => t.startsWith('cat-')) ?? null;

    // helpers para query segura
    const escape = (v: string) => String(v).replaceAll('"', '\\"');
    const q = (v: string) => `"${escape(v)}"`;

    const fallbackQuery = catTag
      ? `tag:${q(catTag)}`
      : product.productType
      ? `product_type:${q(product.productType)}`
      : '';

    if (fallbackQuery) {
      const fbData = await storefront.query(FALLBACK_PRODUCTS_QUERY, {
        variables: {first: 12, query: fallbackQuery},
      });

      const nodes: FallbackProduct[] = (fbData?.products?.nodes ?? []).filter(
        (product): product is FallbackProduct => Boolean(product),
      );

      recommendations = nodes
        .filter((candidate: FallbackProduct) => candidate.id !== product.id)
        .slice(0, 4);
    } else {
      recommendations = [];
    }
  } else {
    // se já há recomendações reais, corta para 4
    recommendations = recommendations.slice(0, 4);
  }


  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
    recommendations,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const {product, recommendations} = useLoaderData<typeof loader>();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  return (
    <>
      <RevissantProductPage
        product={product}
        selectedVariant={selectedVariant}
        recommendations={recommendations ?? []}
      />

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}


const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    tags
    descriptionHtml
    description
    productType
    material: metafield(namespace: "custom", key: "material") {
      value
    }
    images(first: 10) {
      nodes {
        url
        altText
        width
        height
      }
    }
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const RECOMMENDATIONS_QUERY = `#graphql
  query ProductRecommendations(
    $country: CountryCode
    $language: LanguageCode
    $productId: ID!
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      featuredImage {
        url
        altText
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
          url
          altText
          width
          height
        }
        product {
          title
          handle
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;


const FALLBACK_PRODUCTS_QUERY = `#graphql
  query FallbackProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int!
    $query: String!
  ) @inContext(country: $country, language: $language) {
    products(first: $first, query: $query) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
          altText
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
            url
            altText
            width
            height
          }
          product {
            title
            handle
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
` as const;
