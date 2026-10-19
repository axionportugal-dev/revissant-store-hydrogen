/**
 * REVISSANT — catálogo de conceito (branch idea/concept)
 *
 * Produtos de decoração usados quando a Storefront API não devolve produtos
 * (ex.: loja indisponível). Fotografia: Pexels (licença livre), servida pelo
 * CDN da Pexels. Substituir por imagens próprias / Shopify antes de produção.
 */

export type ConceptCategory =
  | 'vessels'
  | 'lighting'
  | 'tableware'
  | 'fragrance'
  | 'textiles'
  | 'objects';

export type ConceptProduct = {
  handle: string;
  title: string;
  subtitle: string;
  category: ConceptCategory;
  price: number;
  image: string;
  /** object-position usado no recorte das imagens */
  focus?: string;
  material: string;
  dimensions: string;
  description: string;
  finishes?: Array<{name: string; swatch: string}>;
  badge?: 'New' | 'Limited' | 'Best seller';
  /** Produto real da Shopify adaptado ao cartão (sem quick add de conceito) */
  external?: boolean;
};

export const CONCEPT_CURRENCY = 'EUR';

export const CATEGORIES: Array<{
  value: ConceptCategory;
  label: string;
  blurb: string;
  image: string;
}> = [
  {
    value: 'vessels',
    label: 'Vessels',
    blurb: 'Sculpted stoneware for flowers, branches and silence.',
    image: pexels(4207892, 1400),
  },
  {
    value: 'lighting',
    label: 'Lighting',
    blurb: 'Lamps that turn an evening into an atmosphere.',
    image: pexels(34237532, 1400),
  },
  {
    value: 'tableware',
    label: 'Tableware',
    blurb: 'Hand-thrown pieces for slow, generous tables.',
    image: pexels(11065504, 1400),
  },
  {
    value: 'fragrance',
    label: 'Fragrance',
    blurb: 'Candles poured in small batches, made to linger.',
    image: pexels(11563557, 1400),
  },
  {
    value: 'textiles',
    label: 'Textiles',
    blurb: 'Washed linen with the softness of years.',
    image: pexels(11733651, 1400),
  },
  {
    value: 'objects',
    label: 'Objects',
    blurb: 'Mirrors and frames that complete a room.',
    image: pexels(15915420, 1400),
  },
];

export function pexels(id: number, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Mesma imagem com outra largura (para thumbnails / srcset). */
export function sized(url: string, width: number) {
  return url.replace(/([?&])w=\d+/, `$1w=${width}`);
}

export const EDITORIAL = {
  heroVideo:
    'https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4',
  heroPoster: pexels(1571460, 2000),
  manifesto: pexels(11179087, 1600),
  rituals: pexels(4099356, 2000),
  bedroom: pexels(6782567, 1600),
};

export const CONCEPT_PRODUCTS: ConceptProduct[] = [
  {
    handle: 'halo-vase',
    title: 'Halo Vase',
    subtitle: 'Sand stoneware',
    category: 'vessels',
    price: 145,
    image: pexels(9130691),
    focus: '50% 70%',
    material: 'Speckled stoneware, raw matte glaze',
    dimensions: 'H 26 × W 24 × D 9 cm',
    description:
      'A full circle drawn in clay. Halo is thrown in two halves and joined by hand, leaving a quiet seam that makes every piece singular. Beautiful empty, extraordinary with a single dried stem.',
    finishes: [
      {name: 'Sand', swatch: '#E7DCCB'},
      {name: 'Chalk', swatch: '#F3F0EA'},
      {name: 'Basalt', swatch: '#3B3936'},
    ],
    badge: 'Best seller',
  },
  {
    handle: 'lune-vase',
    title: 'Lune Vase',
    subtitle: 'Chalk white, on Carrara plinth',
    category: 'vessels',
    price: 190,
    image: pexels(4207892),
    focus: '60% 75%',
    material: 'Stoneware vase, honed Carrara marble plinth',
    dimensions: 'Vase H 30 × W 28 cm · Plinth 20 × 20 × 12 cm',
    description:
      'Our signature silhouette, paired with a block of honed Carrara. The plinth lifts the vessel to eye level and grounds it with the weight of stone.',
    finishes: [
      {name: 'Chalk', swatch: '#F3F0EA'},
      {name: 'Sand', swatch: '#E7DCCB'},
    ],
    badge: 'New',
  },
  {
    handle: 'atelier-vessel-trio',
    title: 'Atelier Vessel Trio',
    subtitle: 'Set of three, bone',
    category: 'vessels',
    price: 240,
    image: pexels(8217492),
    focus: '55% 70%',
    material: 'Unglazed porcelain & ribbed stoneware',
    dimensions: 'H 34 / 26 / 14 cm',
    description:
      'Three heights, one tone. Composed as a still life, the trio brings rhythm to a console, a mantel or a deep window sill.',
  },
  {
    handle: 'ondine-vase',
    title: 'Ondine Vase',
    subtitle: 'Stacked form, ivory',
    category: 'vessels',
    price: 120,
    image: pexels(4207785),
    focus: '85% 80%',
    material: 'Glazed stoneware',
    dimensions: 'H 24 × Ø 13 cm',
    description:
      'Soft stacked curves inspired by river stones. Ondine holds a few palm leaves or stands alone as sculpture.',
  },
  {
    handle: 'aria-bud-vases',
    title: 'Aria Bud Vases',
    subtitle: 'Set of four, mixed tones',
    category: 'vessels',
    price: 85,
    image: pexels(27180805),
    focus: '45% 60%',
    material: 'Ribbed ceramic, smoked glass',
    dimensions: 'H 12–15 cm each',
    description:
      'Four small vessels for single stems, gathered on a dining table or scattered through a home.',
  },
  {
    handle: 'dome-table-lamp',
    title: 'Dôme Table Lamp',
    subtitle: 'Opal glass, polished chrome',
    category: 'lighting',
    price: 420,
    image: pexels(34237532),
    focus: '70% 60%',
    material: 'Mouth-blown opal glass, polished chrome base',
    dimensions: 'H 38 × Ø 30 cm · E27, dimmable',
    description:
      'A mushroom silhouette that diffuses a warm, even glow. Dôme is at its best on a bedside or a reading corner at dusk.',
    finishes: [
      {name: 'Chrome', swatch: '#C9CBCF'},
      {name: 'Brass', swatch: '#B99A63'},
    ],
    badge: 'Best seller',
  },
  {
    handle: 'atelier-desk-lamp',
    title: 'Atelier Desk Lamp',
    subtitle: 'Bronzed steel & brass',
    category: 'lighting',
    price: 290,
    image: pexels(1112598),
    focus: '60% 40%',
    material: 'Powder-coated steel, solid brass joints',
    dimensions: 'H 52 × reach 60 cm',
    description:
      'An adjustable arm with a counterweight and brass knuckles that age beautifully with use.',
  },
  {
    handle: 'orbe-pendant-pair',
    title: 'Orbe Pendant',
    subtitle: 'Pair, mirrored brass',
    category: 'lighting',
    price: 560,
    image: pexels(12127444),
    focus: '55% 25%',
    material: 'Mirror-finish brass shades',
    dimensions: 'Ø 32 cm · drop adjustable to 180 cm',
    description:
      'Two polished domes that reflect a room back to itself. Hung low over a dining table, they make dinner feel like an occasion.',
    badge: 'Limited',
  },
  {
    handle: 'noir-candle',
    title: 'Noir Candle',
    subtitle: 'Amber & oud, 300 g',
    category: 'fragrance',
    price: 68,
    image: pexels(11563557),
    focus: '35% 45%',
    material: 'Coconut & rapeseed wax, matte black glass',
    dimensions: '300 g · approx. 60 hours',
    description:
      'Smoked amber, oud and a trace of leather. Poured by hand in small batches; the vessel becomes a pot once the candle is spent.',
    badge: 'Best seller',
  },
  {
    handle: 'verdure-candle',
    title: 'Verdure Candle',
    subtitle: 'Fig leaf & moss, 280 g',
    category: 'fragrance',
    price: 62,
    image: pexels(6311846),
    focus: '50% 55%',
    material: 'Coconut wax, olive glass, green marble coaster',
    dimensions: '280 g · approx. 55 hours',
    description:
      'Crushed fig leaf, wet moss and cedar. Comes with a hand-cut green marble coaster.',
    badge: 'New',
  },
  {
    handle: 'pierre-dinner-service',
    title: 'Pierre Dinner Service',
    subtitle: '12-piece set, speckled white',
    category: 'tableware',
    price: 220,
    image: pexels(11065504),
    focus: '40% 50%',
    material: 'Speckled stoneware, satin glaze',
    dimensions: 'Plates Ø 27 / 21 cm · bowl Ø 15 cm · mug 35 cl',
    description:
      'Four place settings with a raw-clay foot. Dishwasher safe, made to be used every day.',
  },
  {
    handle: 'sable-bowl',
    title: 'Sable Bowl',
    subtitle: 'Hand-pinched, ivory',
    category: 'tableware',
    price: 42,
    image: pexels(6944482),
    focus: '50% 70%',
    material: 'Porcelain, satin glaze',
    dimensions: 'Ø 11 × H 6 cm',
    description:
      'Pinched by hand, so no two rims are alike. For olives, salt, rings or nothing at all.',
  },
  {
    handle: 'maree-ceramic-collection',
    title: 'Marée Collection',
    subtitle: 'Marbled clay, sea tones',
    category: 'tableware',
    price: 160,
    image: pexels(7674564),
    focus: '50% 50%',
    material: 'Marbled porcelain, clear glaze inside',
    dimensions: 'Set of five pieces',
    description:
      'Coloured clays folded together like a tide line. Each piece carries its own landscape.',
    badge: 'Limited',
  },
  {
    handle: 'soleil-pitcher',
    title: 'Soleil Pitcher',
    subtitle: 'Drip glaze, 1 L',
    category: 'tableware',
    price: 78,
    image: pexels(8789641),
    focus: '55% 55%',
    material: 'Earthenware, drip-glazed by hand',
    dimensions: 'H 19 cm · 1 L',
    description:
      'A Mediterranean pitcher with a slow green drip glaze. For water, lemonade or a loose bunch of wild flowers.',
  },
  {
    handle: 'lin-throw-olive',
    title: 'Lin Throw',
    subtitle: 'Washed linen, olive',
    category: 'textiles',
    price: 180,
    image: pexels(11733651),
    focus: '50% 50%',
    material: '100% European flax linen, stone-washed',
    dimensions: '140 × 220 cm',
    description:
      'Heavyweight linen washed until supple. Throw it over a sofa arm or the foot of a bed; it only gets better.',
    finishes: [
      {name: 'Olive', swatch: '#6F7151'},
      {name: 'Oat', swatch: '#D9CDB8'},
      {name: 'Ink', swatch: '#1E2A3E'},
    ],
  },
  {
    handle: 'oculus-mirror',
    title: 'Oculus Mirror',
    subtitle: 'Round, bone lacquer',
    category: 'objects',
    price: 380,
    image: pexels(15915420),
    focus: '50% 45%',
    material: 'Lacquered ash frame, bevelled glass',
    dimensions: 'Ø 80 cm',
    description:
      'A deep, rounded frame that turns a reflection into a picture. Hangs from a single concealed cleat.',
  },
  {
    handle: 'cadre-frame',
    title: 'Cadre Frame',
    subtitle: 'Natural oak, museum mount',
    category: 'objects',
    price: 95,
    image: pexels(5978715),
    focus: '35% 50%',
    material: 'Solid oak, museum glass',
    dimensions: '40 × 50 cm',
    description:
      'Generous mount, slim oak profile. Made for drawings, photographs and the things you want to keep.',
  },
  {
    handle: 'ondine-candle-set',
    title: 'Ondine Ritual Set',
    subtitle: 'Vase, candle & stone dish',
    category: 'objects',
    price: 135,
    image: pexels(6794691),
    focus: '55% 60%',
    material: 'Stoneware, coconut wax, olive wood',
    dimensions: 'Vase H 20 cm · candle 220 g',
    description:
      'A small composition for a bedside or bathroom: a stacked vase, a scented candle and a dish for the little things.',
    badge: 'New',
  },
];

export function getConceptProduct(handle: string) {
  return CONCEPT_PRODUCTS.find((p) => p.handle === handle) ?? null;
}

export function getCategoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function formatPrice(amount: number, currency = CONCEPT_CURRENCY) {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function getRelatedProducts(product: ConceptProduct, count = 4) {
  const same = CONCEPT_PRODUCTS.filter(
    (p) => p.category === product.category && p.handle !== product.handle,
  );
  const others = CONCEPT_PRODUCTS.filter(
    (p) => p.category !== product.category,
  );
  return [...same, ...others].slice(0, count);
}

export const BEST_SELLERS = CONCEPT_PRODUCTS.filter(
  (p) => p.badge === 'Best seller' || p.badge === 'New',
);
