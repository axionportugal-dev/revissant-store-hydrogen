import type {ReactNode} from 'react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

export type RevissantFooterProps = {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
  fallback: ReactNode;
};

export function RevissantFooter({fallback}: RevissantFooterProps) {
  return <>{fallback}</>;
}
