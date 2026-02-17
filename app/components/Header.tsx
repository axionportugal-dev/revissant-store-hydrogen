import {RevissantHeader} from '~/components/revissant/layout/RevissantHeader';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export function Header(props: HeaderProps) {
  return <RevissantHeader {...props} />;
}
