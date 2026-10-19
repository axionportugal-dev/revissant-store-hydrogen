import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {BagContents} from '~/components/revissant/layout/RevissantCartAside';

type RevissantCartPageProps = {
  cart: CartApiQueryFragment | null;
};

/** Página /cart — mesmo conteúdo do drawer, em formato de página. */
export function RevissantCartPage({cart}: RevissantCartPageProps) {
  return (
    <section className="bg-ivory pb-24 pt-28 md:pt-36">
      <div className="rv-container max-w-3xl">
        <p className="rv-eyebrow text-bronze">Shopping bag</p>
        <h1 className="rv-display mt-4 text-[48px] text-ink md:text-[64px]">
          Your bag
        </h1>
        <div className="mt-10 flex flex-col border border-ink/10 bg-ivory">
          <BagContents cart={cart} />
        </div>
      </div>
    </section>
  );
}
