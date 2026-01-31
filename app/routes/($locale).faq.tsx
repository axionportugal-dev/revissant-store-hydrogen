import type {Route} from './+types/($locale).faq';

export const meta: Route.MetaFunction = () => {
  return [{title: 'FAQ | REVISSANT'}];
};

export default function FaqRoute() {
  return (
    <div style={{padding: 24}}>
      <h1>FAQ</h1>
      <p>
        Stub route (foundation). UI final será implementada na branch feature/faq.
      </p>
    </div>
  );
}
