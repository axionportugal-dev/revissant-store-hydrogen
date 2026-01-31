import type {Route} from './+types/($locale).catalog';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Catalog | REVISSANT'}];
};

export default function CatalogRoute() {
  return (
    <div style={{padding: 24}}>
      <h1>Catalog</h1>
      <p>
        Stub route (foundation). UI final será implementada na branch
        feature/catalog-product.
      </p>
    </div>
  );
}
