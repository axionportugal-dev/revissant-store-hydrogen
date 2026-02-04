import type {Route} from './+types/($locale).faq';
import {RevissantFAQPage} from '~/components/revissant/faq';


export const meta: Route.MetaFunction = () => {
  return [{title: 'FAQ | REVISSANT'}];
};

export default function FaqRoute() {
  return <RevissantFAQPage />;
}
