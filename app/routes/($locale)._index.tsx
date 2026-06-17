// app/routes/($locale)._index.tsx
import type {Route} from './+types/($locale)._index';
import {RevissantHome} from '~/components/revissant/home';

export const meta: Route.MetaFunction = () => {
  return [{title: 'REVISSANT | Home'}];
};

export default function Homepage() {
  return <RevissantHome />;
}
