import type {ReactNode} from 'react';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';

export type RevissantHeaderProps = {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  fallback: ReactNode;
};

export function RevissantHeader({fallback}: RevissantHeaderProps) {
  return <>{fallback}</>;
}
