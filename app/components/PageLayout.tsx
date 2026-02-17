import {Link} from 'react-router';
import {useId} from 'react';
import type {ReactNode} from 'react';

import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';

import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header} from '~/components/Header';

import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

import {ToastContainer} from '~/components/revissant/ui/ToastContainer';
import {RevissantMobileMenuAside} from '~/components/revissant/layout/RevissantMobileMenuAside';
import {RevissantAccountAside} from '~/components/revissant/layout/RevissantAccountAside';
import {RevissantCartAside} from '~/components/revissant/layout/RevissantCartAside';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  return (
    <Aside.Provider>
      {/* drawer core (search) mantém-se fora do scope Revissant */}
      <SearchAside />

      {/* UI REVISSANT (scoped) */}
      <div className="revissant min-h-screen flex flex-col">
        {/* drawers REVISSANT */}
        <RevissantMobileMenuAside />
        <RevissantAccountAside />
        <RevissantCartAside cart={cart} />

        {header && (
          <Header
            header={header}
            cart={cart}
            isLoggedIn={isLoggedIn}
            publicStoreDomain={publicStoreDomain}
          />
        )}

        {/* dá flex-1 ao main para o footer ir “para baixo” de forma consistente */}
        <main className="flex-1">{children}</main>

        <Footer
          footer={footer}
          header={header}
          publicStoreDomain={publicStoreDomain}
        />

        {/* global toast (se queres que o estilo seja Revissant, deixa aqui dentro) */}
        <ToastContainer />
      </div>
    </Aside.Provider>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Search</button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;

            if (state === 'loading' && term.current) return <div>Loading...</div>;
            if (!total) return <SearchResultsPredictive.Empty term={term} />;

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                  >
                    <p>
                      View all results for <q>{term.current}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}
