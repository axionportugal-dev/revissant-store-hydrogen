import {RevissantFooter} from '~/components/revissant/layout/RevissantFooter';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer(props: FooterProps) {
  return <RevissantFooter {...props} />;
}
