/**
 * Shalom Designs — SINGLE SOURCE OF TRUTH for all published pricing.
 * ---------------------------------------------------------------------------
 * Catalogue version 2026.
 *
 * SOURCES
 *  - Current Zayin knowledge base (verified 2026 pricing, size-based).
 *  - Prior published catalogue entries that remain on the site.
 *
 * CATALOGUE STATUS
 *  Every product and bundle carries a `status` field:
 *
 *    'confirmed'      Confirmed by the current knowledge base. May be
 *                     displayed with prices and added to an order list.
 *
 *    'uncertain'      Possibly offered, historical, or listed in a category
 *                     the knowledge base marks as unclear (beanies, caps,
 *                     hats, socks, bags, jerseys, accessories).
 *                     Displayed with "Availability to be confirmed".
 *                     Never given a price. Never added to an order list.
 *
 *    'missing-price'  Known to exist but no verified price is available.
 *                     Displayed with "Price unavailable".
 *                     Never added to an order list.
 *
 * RULES
 *  - Never invent prices, products, sizes, colours, discounts, fees.
 *  - "Not in the supplied pricing data" does NOT mean "does not exist".
 *  - "Possibly offered" does NOT mean "discontinued".
 *  - Never remove a product simply because it is absent from the dataset.
 *  - Never combine two products because they appear similar.
 *  - Product pricing is size-based: pricing is a map of size key -> ZAR.
 *  - availableSizes is the ONLY set of sizes the UI may offer.
 * ---------------------------------------------------------------------------
 */

export const CURRENCY = Object.freeze({ code: 'ZAR', symbol: 'R' });
export const CATALOGUE_VERSION = '2026';

export const VENDOR_INFO = Object.freeze({
  name: 'Shalom Designs',
  tagline: 'FOR ALL YOUR SEWING NEEDS!',
  contact: Object.freeze({
    callWhatsapp: '072-707-7684',
    address: '6894 Essenhout Street, New Horizon, Plettenberg Bay',
  }),
  bankDetails: Object.freeze({
    bank: 'First National Bank',
    accountName: 'Shalom Designs',
    accountNumber: '625 159 717 62',
    branchCode: '210514',
    reference: 'Name',
  }),
  terms: 'A 50% DEPOSIT WHEN PLACING AN ORDER',
});

/** All valid catalogue statuses. */
export const STATUS = Object.freeze({
  CONFIRMED: 'confirmed',
  UNCERTAIN: 'uncertain',
  MISSING_PRICE: 'missing-price',
});

/** Canonical order for size keys, smallest to largest. */
export const SIZE_ORDER = Object.freeze([
  '3-4', '5-6', '7-8', '9-10', '11-12', '13-14',
  'small', 'medium', 'large', 'extra-large', '2x-large', '3x-large',
  '15-16', 'adult', 'one-size',
]);

export const SIZE_LABEL = Object.freeze({
  '3-4': '3–4 years',
  '5-6': '5–6 years',
  '7-8': '7–8 years',
  '9-10': '9–10 years',
  '11-12': '11–12 years',
  '13-14': '13–14 years',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  'extra-large': 'Extra Large',
  '2x-large': '2X Large',
  '3x-large': '3X Large',
  '15-16': '15–16 years',
  adult: 'Adult',
  'one-size': 'One size',
});

/**
 * Categories the knowledge base marks as unclear. Documented for reference.
 * If any of these appear on the site, they must be marked 'uncertain'.
 */
export const POSSIBLY_OFFERED_CATEGORIES = Object.freeze([
  'Beanies',
  'Caps',
  'Hats',
  'Socks',
  'Bags',
  'Jerseys',
  'Accessories',
]);

const CHILD_SIZES = ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14'];
const ADULT_SIZES = ['small', 'medium', 'large', 'extra-large', '2x-large', '3x-large'];
const SENIOR_SIZES = ['11-12', '13-14', ...ADULT_SIZES];

function confirmedItem(id, name, pricing, availableSizes, category = 'uniform') {
  return {
    id,
    name,
    category,
    status: STATUS.CONFIRMED,
    pricing,
    availableSizes,
  };
}

function fixedItem(id, name, price) {
  return confirmedItem(id, name, { 'one-size': price }, ['one-size'], 'service');
}

/* ------------------------------------------------------------- schools */

export const schools = [
  {
    id: 'bahia-formosa',
    name: 'Bahia Formosa School',
    summary:
      'Track top, track pants, fleece top and raincoat, with the tracksuit available as a set. Badges, beanies and name labels are listed for confirmation.',

    products: [
      {
        id: 'bahia-formosa-track-top',
        name: 'Track Top',
        category: 'tracksuit',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 325, '5-6': 330, '7-8': 335,
          '9-10': 340, '11-12': 345, '13-14': 350,
          small: 355, medium: 360, large: 365,
          'extra-large': 370, '2x-large': 375, '3x-large': 380,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14', 'small', 'medium', 'large', 'extra-large', '2x-large', '3x-large'],
        unavailableSizes: ['15-16', 'adult'],
      },
      {
        id: 'bahia-formosa-track-pants',
        name: 'Track Pants',
        category: 'tracksuit',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 275, '5-6': 285, '7-8': 295,
          '9-10': 305, '11-12': 315, '13-14': 325,
          small: 335, medium: 345, large: 355,
          'extra-large': 365, '2x-large': 375, '3x-large': 385,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14', 'small', 'medium', 'large', 'extra-large', '2x-large', '3x-large'],
        unavailableSizes: ['15-16', 'adult'],
      },
      {
        id: 'bahia-formosa-fleece-top',
        name: 'Fleece Top',
        category: 'outerwear',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 285, '5-6': 295, '7-8': 305,
          '9-10': 315, '11-12': 325, '13-14': 335,
          small: 345, medium: 345, large: 365,
          'extra-large': 375, '2x-large': 385, '3x-large': 395,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14', 'small', 'medium', 'large', 'extra-large', '2x-large', '3x-large'],
        unavailableSizes: ['15-16', 'adult'],
      },
      {
        id: 'bahia-formosa-raincoat',
        name: 'Raincoat',
        category: 'rainwear',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 350, '5-6': 355, '7-8': 360,
          '9-10': 365, '11-12': 370, '13-14': 375,
          small: 380, medium: 385, large: 390,
          'extra-large': 395, '2x-large': 400, '3x-large': 405,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14', 'small', 'medium', 'large', 'extra-large', '2x-large', '3x-large'],
        unavailableSizes: ['15-16', 'adult'],
      },

      {
        id: 'bahia-formosa-loose-badge',
        name: 'Loose Badge',
        category: 'accessory',
        status: STATUS.CONFIRMED,
        pricing: { 'one-size': 80 },
        availableSizes: ['one-size'],
      },
      {
        id: 'bahia-formosa-winter-beanie',
        name: 'Winter Beanie',
        category: 'accessory',
        status: STATUS.CONFIRMED,
        pricing: { 'one-size': 80 },
        availableSizes: ['one-size'],
      },
      {
        id: 'bahia-formosa-name-on-item',
        name: 'Name on Item',
        category: 'service',
        status: STATUS.CONFIRMED,
        pricing: { 'one-size': 50 },
        availableSizes: ['one-size'],
      },
    ],

    bundles: [
      {
        id: 'bahia-formosa-tracksuit',
        name: 'Tracksuit (Track Top + Track Pants)',
        category: 'bundle',
        status: STATUS.CONFIRMED,
        includes: ['bahia-formosa-track-top', 'bahia-formosa-track-pants'],
        pricing: {
          '3-4': 600, '5-6': 615, '7-8': 630,
          '9-10': 645, '11-12': 660, '13-14': 675,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14'],
        unavailableSizes: ['15-16', 'adult'],
      },
    ],
  },

  {
    id: 'formosa-primary',
    name: 'Formosa Primary School',
    summary:
      'School dress, tracksuit, bodywarmer, golf T-shirt and two rainsuit variants.',

    products: [
      {
        id: 'formosa-primary-school-dress',
        name: 'School Dress',
        category: 'uniform',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 365, '5-6': 375, '7-8': 385,
          '9-10': 395, '11-12': 405, '13-14': 415,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14'],
        unavailableSizes: ['15-16', 'adult'],
      },
      {
        id: 'formosa-primary-tracksuit',
        name: 'Tracksuit',
        category: 'tracksuit',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 390, '5-6': 400, '7-8': 410,
          '9-10': 420, '11-12': 430, '13-14': 440,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14'],
        unavailableSizes: ['15-16', 'adult'],
      },
      {
        id: 'formosa-primary-bodywarmer',
        name: 'Bodywarmer',
        category: 'outerwear',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 200, '5-6': 205, '7-8': 210,
          '9-10': 215, '11-12': 220, '13-14': 225,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14'],
        unavailableSizes: ['15-16', 'adult'],
      },
      {
        id: 'formosa-primary-golf-tshirt',
        name: 'Golf T-Shirt',
        category: 'sportswear',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 155, '5-6': 160, '7-8': 165,
          '9-10': 170, '11-12': 175, '13-14': 180,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14'],
        unavailableSizes: ['15-16', 'adult'],
      },
      {
        id: 'formosa-primary-rainsuit-coat',
        name: 'Rainsuit — Coat Only',
        category: 'rainwear',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 325, '5-6': 330, '7-8': 335,
          '9-10': 340, '11-12': 345, '13-14': 350,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14'],
        unavailableSizes: ['15-16', 'adult'],
      },
      {
        id: 'formosa-primary-rainsuit-full',
        name: 'Rainsuit — Full Suit',
        category: 'rainwear',
        status: STATUS.CONFIRMED,
        pricing: {
          '3-4': 425, '5-6': 430, '7-8': 435,
          '9-10': 440, '11-12': 445, '13-14': 450,
        },
        availableSizes: ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14'],
        unavailableSizes: ['15-16', 'adult'],
      },
    ],

    bundles: [],
  },

  {
    id: 'plettenberg-bay-secondary',
    name: 'Plettenberg Bay Secondary School',
    summary: 'Golf T-shirts, tracksuits and rainsuits with verified pricing for sizes 11–12 through 3X Large.',
    products: [
      confirmedItem('plettenberg-bay-secondary-golf-tshirt', 'Golf T-Shirt', {
        '11-12': 170, '13-14': 175, small: 180, medium: 185,
        large: 190, 'extra-large': 195,
      }, SENIOR_SIZES, 'sportswear'),
      confirmedItem('plettenberg-bay-secondary-tracksuit-top', 'Tracksuit — Top Only', {
        '11-12': 320, '13-14': 330, small: 340, medium: 350,
        large: 360, 'extra-large': 370,
      }, SENIOR_SIZES, 'tracksuit'),
      confirmedItem('plettenberg-bay-secondary-tracksuit-full', 'Tracksuit — Full Suit', {
        '11-12': 420, '13-14': 430, small: 440, medium: 450,
        large: 460, 'extra-large': 470,
      }, SENIOR_SIZES, 'tracksuit'),
      confirmedItem('plettenberg-bay-secondary-rainsuit-coat', 'Rainsuit — Coat Only', {
        '11-12': 370, '13-14': 380, small: 390, medium: 400,
        large: 410, 'extra-large': 420,
      }, SENIOR_SIZES, 'rainwear'),
      confirmedItem('plettenberg-bay-secondary-rainsuit-full', 'Rainsuit — Full Suit', {
        '11-12': 470, '13-14': 480, small: 490, medium: 500,
        large: 510, 'extra-large': 520,
      }, SENIOR_SIZES, 'rainwear'),
      fixedItem('plettenberg-bay-secondary-loose-badge', 'Loose Badge', 80),
      fixedItem('plettenberg-bay-secondary-name-on-item', 'Name on Item', 50),
      fixedItem('plettenberg-bay-secondary-badge-on-item', 'Badge on Item', 90),
    ],
    bundles: [],
  },
  {
    id: 'kranshoek-primary',
    name: 'Kranshoek Primary School',
    summary: 'Tracksuits and raincoats with verified pricing for sizes 3–4 through 13–14.',
    products: [
      confirmedItem('kranshoek-primary-tracksuit', 'Tracksuit', {
        '3-4': 360, '5-6': 370, '7-8': 380,
        '9-10': 390, '11-12': 400, '13-14': 410,
      }, CHILD_SIZES, 'tracksuit'),
      confirmedItem('kranshoek-primary-raincoat', 'Raincoat', {
        '3-4': 320, '5-6': 330, '7-8': 340,
        '9-10': 350, '11-12': 360, '13-14': 370,
      }, CHILD_SIZES, 'rainwear'),
      fixedItem('kranshoek-primary-loose-badge', 'Loose Badge', 80),
      fixedItem('kranshoek-primary-name-on-item', 'Name on Item', 50),
      fixedItem('kranshoek-primary-badge-on-item', 'Badge on Item', 90),
    ],
    bundles: [],
  },
  {
    id: 'harkerville-ek',
    name: 'Harkerville Ek Primary School',
    summary: 'Tracksuits and raincoats with verified pricing for sizes 3–4 through 13–14.',
    products: [
      confirmedItem('harkerville-ek-tracksuit', 'Tracksuit', {
        '3-4': 360, '5-6': 370, '7-8': 380,
        '9-10': 390, '11-12': 400, '13-14': 410,
      }, CHILD_SIZES, 'tracksuit'),
      confirmedItem('harkerville-ek-raincoat', 'Raincoat', {
        '3-4': 330, '5-6': 340, '7-8': 350,
        '9-10': 360, '11-12': 370, '13-14': 380,
      }, CHILD_SIZES, 'rainwear'),
      fixedItem('harkerville-ek-loose-badge', 'Loose Badge', 80),
      fixedItem('harkerville-ek-name-on-item', 'Name on Item', 50),
      fixedItem('harkerville-ek-badge-on-item', 'Badge on Item', 90),
    ],
    bundles: [],
  },
  {
    id: 'kwanokuthula-primary',
    name: 'Kwanokuthula Primary School',
    summary: 'Golf T-shirts, tracksuits and rainsuits with verified pricing for sizes 3–4 through 13–14.',
    products: [
      confirmedItem('kwanokuthula-primary-golf-tshirt', 'Golf T-Shirt', {
        '3-4': 210, '5-6': 220, '7-8': 230,
        '9-10': 240, '11-12': 250, '13-14': 265,
      }, CHILD_SIZES, 'sportswear'),
      confirmedItem('kwanokuthula-primary-tracksuit', 'Tracksuit', {
        '3-4': 500, '5-6': 510, '7-8': 520,
        '9-10': 530, '11-12': 540, '13-14': 550,
      }, CHILD_SIZES, 'tracksuit'),
      confirmedItem('kwanokuthula-primary-rainsuit-coat', 'Rainsuit — Coat Only', {
        '3-4': 410, '5-6': 420, '7-8': 430,
        '9-10': 440, '11-12': 450, '13-14': 460,
      }, CHILD_SIZES, 'rainwear'),
      confirmedItem('kwanokuthula-primary-rainsuit-full', 'Rainsuit — Full Suit', {
        '3-4': 510, '5-6': 520, '7-8': 530,
        '9-10': 540, '11-12': 550, '13-14': 560,
      }, CHILD_SIZES, 'rainwear'),
      fixedItem('kwanokuthula-primary-loose-badge', 'Loose Badge', 80),
      fixedItem('kwanokuthula-primary-name-on-item', 'Name on Item', 50),
      fixedItem('kwanokuthula-primary-badge-on-item', 'Badge on Item', 90),
    ],
    bundles: [],
  },
  {
    id: 'crags-primary',
    name: 'Crags Primary School',
    summary: 'School uniform items supplied by Shalom Designs. Pricing and item details will be added when verified.',
    products: [], bundles: [],
  },
];

/* ------------------------------------------------------------ services */

export const services = [
  {
    id: 'school-uniforms',
    name: 'School uniform items',
    description:
      'Uniform items for the schools listed on this site, with published prices per size.',
    price: null,
    pricingNote: 'See the school pages for published item prices.',
  },
  {
    id: 'embroidery',
    name: 'Embroidery',
    description:
      'School badges, club crests and names on items. Quoted per job — the price depends on the artwork, the placement and the quantity.',
    price: null,
    pricingNote: 'Contact us for an embroidery quote.',
  },
  {
    id: 'alterations',
    name: 'Alterations',
    description:
      'Hemming, zips, waistbands, adjustments. Priced per job from the alterations list.',
    price: null,
    pricingNote: 'See the alterations list for prices.',
  },
  {
    id: 'custom-clothing',
    name: 'Custom clothing',
    description:
      'Sports kit, team clothing and workwear, made to order in the workshop.',
    price: null,
    pricingNote: 'Contact us for a clothing quote.',
  },
  {
    id: 'church-garments',
    name: 'Church garments',
    description:
      'Robes and church garments, made to order in the workshop.',
    price: null,
    pricingNote: 'Contact us for a garment quote.',
  },
];

/* ---------------------------------------------------------- alterations */

export const alterations = {
  year: 2026,
  currency: 'ZAR',
  services: [
    { id: 'trouser-hem-machine', name: 'Trousers / Pants — Machine Hem', price: 80 },
    { id: 'trouser-hem-hand', name: 'Trousers / Pants — Hand Hem', price: 120 },
    { id: 'trouser-turn-up', name: 'Trousers / Pants — Turn-Up', price: 100 },
    { id: 'skirt-dress-hem-machine', name: 'Skirts & Dresses — Machine Hem', price: 90 },
    { id: 'skirt-dress-hem-hand', name: 'Skirts & Dresses — Hand Hem', price: 120 },
    { id: 'jacket-shirt-sleeves', name: 'Jacket / Shirt Sleeves', price: 140 },
    { id: 'waistband-adjustment', name: 'Smaller or Bigger Waistband', price: 140 },
    { id: 'suit-jacket-side-seam', name: 'Smaller Side Seam — Suit Jacket', price: 80 },
    { id: 'darts-pants-skirt', name: 'Darts Into Pants or Skirt', price: 60 },
    { id: 'jacket-new-zip', name: 'New Zip Into Jacket', price: 200 },
    { id: 'garment-new-zip', name: 'New Zip Into Garment', price: 150 },
    { id: 'heavy-duty-chain-zip-sliders', name: 'Heavy Duty Chain Zip and Sliders Per Cover', price: 200 },
    { id: 'zigzag-between-legs', name: 'Zig Zag Between Legs', price: 100 },
    { id: 'zigzag-small-pieces', name: 'Zig Zag Small Pieces', price: 80 },
    { id: 'zoet-pants-between-legs', name: 'Zoet Pants Between Legs', price: 80, needsVerification: true },
    { id: 'shorten-jacket', name: 'Shorten Jacket', price: 150 },
    { id: 'shorten-sleeves', name: 'Shorten Sleeves', price: 150 },
    { id: 'narrow-sleeves', name: 'Narrow Sleeves', price: 80 },
    { id: 'unpicking', name: 'Unpicking', price: 50 },
    {
      id: 'custom-work',
      name: 'Custom Work',
      pricingType: 'hourly',
      minPrice: 150,
      maxPrice: 200,
    },
  ],
};

/* --------------------------------------------------------- pricing notes */

export const pricingNotes = Object.freeze({
  embroidery: 'Contact us for an embroidery quote.',
  logoDigitising: 'Contact us for a quote.',
  nameEmbroidery: 'Contact us for a quote.',
  corporateBranding: 'Contact us for a quote.',
  schoolUniformBranding: 'Contact us for a quote.',
  customGarmentCharges: 'Contact us for a quote.',
  designFees: 'Contact us for a quote.',
  samplingFees: 'Contact us for a quote.',
  deliveryFees: 'Not confirmed.',
  bulkDiscounts: 'Not confirmed.',
  rushCharges: 'Not confirmed.',
});

export default {
  CURRENCY,
  CATALOGUE_VERSION,
  VENDOR_INFO,
  STATUS,
  SIZE_ORDER,
  SIZE_LABEL,
  POSSIBLY_OFFERED_CATEGORIES,
  schools,
  services,
  alterations,
  pricingNotes,
};
