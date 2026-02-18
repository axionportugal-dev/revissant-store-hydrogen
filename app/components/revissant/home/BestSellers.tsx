import {useMemo, useState} from 'react';
import {Link} from 'react-router';

type BestSellerProduct = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange?: {
    minVariantPrice?: {
      amount: string;
      currencyCode: string;
    } | null;
  } | null;
};

type BestSellersProps = {
  products: BestSellerProduct[];
};

function formatMoney(amount?: string, currency?: string) {
  if (!amount || !currency) return '';
  const n = Number(amount);
  if (Number.isNaN(n)) return `${amount} ${currency}`;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${Math.round(n)} ${currency}`;
  }
}

export function BestSellers({products}: BestSellersProps) {
  const carouselProducts = useMemo(() => products?.filter(Boolean) ?? [], [products]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = carouselProducts.length;

  const nextSlide = () => {
    if (!total) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (!total) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // ✅ Placeholder (sem produtos)
  if (!total) {
    return (
      <section className="relative overflow-hidden bg-white py-24 md:py-28 lg:py-32">
        <div className="mx-auto w-full max-w-[1500px] px-4 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center items-center gap-10 md:gap-14">
            {/* Left (ajuste de posição) */}
            <div className="w-full md:w-[30%] text-center md:text-left md:flex md:flex-col md:justify-center md:-ml-8 lg:-ml-12 md:pl-2 lg:pl-4">
              <h2
                style={{fontSize: 108, lineHeight: 0.92, letterSpacing: '-0.02em'}}
                className="font-bold text-[#0F2445]"
              >
                BEST<br />
                SELLERS
              </h2>

              <div className="mt-10 flex justify-center md:justify-start">
                <img
                  src="/logo.png"
                  alt="Revissant"
                  draggable={false}
                  style={{height: 140, width: 'auto'}}
                />
              </div>
            </div>

            {/* Right (carrossel placeholder) */}
            <div className="w-full md:w-[70%] h-[520px] md:h-[540px] flex items-center justify-center md:ml-6 lg:ml-10">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-xl w-[340px] h-[480px] flex flex-col items-center justify-center text-sm text-gray-400 gap-2">
                <div>Sem produtos ainda</div>
                <div className="text-xs text-gray-300">
                  (debug) products recebidos: {products?.length ?? 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-center items-center gap-10 md:gap-14">
          {/* Left (NÃO MEXER NO VISUAL, só posição) */}
          <div className="w-full md:w-[30%] text-center md:text-left md:flex md:flex-col md:justify-center md:-ml-16 lg:-ml-12 md:pl-2 lg:pl-4">
            <h2
              style={{fontSize: 108, lineHeight: 0.92, letterSpacing: '-0.02em'}}
              className="font-bold text-[#0F2445]"
            >
              BEST<br />
              SELLERS
            </h2>

            <div className="mt-10 flex justify-center md:justify-start">
              <img
                src="/logo.png"
                alt="Revissant"
                draggable={false}
                style={{height: 140, width: 'auto'}}
              />
            </div>
          </div>

          {/* Carousel Area (empurrar ligeiramente para a direita em desktop) */}
          <div className="w-full md:w-[70%] flex items-center justify-center select-none relative h-[520px] md:h-[540px] md:ml-12 lg:ml-20">
            {/* Prev */}
            <button
              onClick={prevSlide}
              className="absolute left-0 md:left-2 z-40 p-2 text-[#0F2445] hover:bg-[#0F2445] hover:text-white transition-colors bg-white/80 rounded-none shadow-md md:bg-transparent md:shadow-none"
              aria-label="Previous Product"
              type="button"
            >
              <span className="text-4xl leading-none">‹</span>
            </button>

            {/* Carousel Items Container */}
            <div className="relative h-full w-full max-w-[980px] flex items-center justify-center [perspective:1000px]">
              {carouselProducts.map((product, index) => {
                const total = carouselProducts.length;

                let offset = (index - currentIndex + total) % total;
                if (offset > total / 2) offset -= total;

                let containerClasses =
                  'absolute transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100';

                const isCenter = offset === 0;

                if (offset === 0) {
                  containerClasses +=
                    ' z-30 scale-100 opacity-100 translate-x-0 w-[300px] h-[460px] md:w-[360px] md:h-[500px]';
                } else if (offset === -1) {
                  containerClasses +=
                    ' z-20 scale-90 opacity-40 -translate-x-[60%] md:-translate-x-[285px] w-[300px] h-[460px] md:w-[360px] md:h-[500px] blur-[1px] grayscale cursor-pointer';
                } else if (offset === 1) {
                  containerClasses +=
                    ' z-20 scale-90 opacity-40 translate-x-[60%] md:translate-x-[285px] w-[300px] h-[460px] md:w-[360px] md:h-[500px] blur-[1px] grayscale cursor-pointer';
                } else if (offset < -1) {
                  containerClasses +=
                    ' z-10 scale-75 opacity-0 -translate-x-[120%] md:-translate-x-[500px] w-[300px] h-[460px] pointer-events-none';
                } else {
                  containerClasses +=
                    ' z-10 scale-75 opacity-0 translate-x-[120%] md:translate-x-[500px] w-[300px] h-[460px] pointer-events-none';
                }

                const imgUrl = product.featuredImage?.url;
                const imgAlt = product.featuredImage?.altText || product.title;

                const price = formatMoney(
                  product.priceRange?.minVariantPrice?.amount,
                  product.priceRange?.minVariantPrice?.currencyCode,
                );

                if (isCenter) {
                  return (
                    <Link
                      key={product.id}
                      to={`/products/${product.handle}`}
                      prefetch="intent"
                      className={`${containerClasses} group`}
                      aria-label={`Open ${product.title}`}
                    >
                      <div className="relative w-full h-full">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={imgAlt}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100" />
                        )}

                        <div className="absolute bottom-0 left-0 w-full p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                          <h3 className="text-3xl font-bold uppercase leading-none tracking-[0.25em] mb-3 drop-shadow-lg">
                            {product.title}
                          </h3>
                          <p className="text-xl font-bold tracking-widest drop-shadow-md">
                            {price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                }

                return (
                  <div
                    key={product.id}
                    className={containerClasses}
                    onClick={() => {
                      if (offset === -1) prevSlide();
                      else if (offset === 1) nextSlide();
                      else setCurrentIndex(index);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (offset === -1) prevSlide();
                        else if (offset === 1) nextSlide();
                        else setCurrentIndex(index);
                      }
                    }}
                    aria-label={`Select ${product.title}`}
                  >
                    <div className="relative w-full h-full">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={imgAlt}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next */}
            <button
              onClick={nextSlide}
              className="absolute right-0 md:right-2 z-40 p-2 text-[#0F2445] hover:bg-[#0F2445] hover:text-white transition-colors bg-white/80 rounded-none shadow-md md:bg-transparent md:shadow-none"
              aria-label="Next Product"
              type="button"
            >
              <span className="text-4xl leading-none">›</span>
            </button>
          </div>
        </div>

        <div className="w-full text-right px-12 mt-8 relative z-20 hidden md:block">
          <Link
            to="/catalog"
            prefetch="intent"
            className="text-[#0F2445] font-bold text-xl uppercase tracking-widest hover:text-blue-400 transition-colors border-b-2 border-transparent hover:border-blue-400 inline-block pb-1"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
