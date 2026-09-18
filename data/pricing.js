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

/** All valid catalogue statuses. */
export const STATUS = Object.freeze({
  CONFIRMED: 'confirmed',
  UNCERTAIN: 'uncertain',
  MISSING_PRICE: 'missing-price',
});

/** Canonical order for size keys, smallest to largest. */
export const SIZE_ORDER = Object.freeze([
  '3-4', '5-6', '7-8', '9-10', '11-12', '13-14', '15-16', 'adult',
]);

export const SIZE_LABEL = Object.freeze({
  '3-4': '3–4 years',
  '5-6': '5–6 years',
  '7-8': '7–8 years',
  '9-10': '9–10 years',
  '11-12': '11–12 years',
  '13-14': '13–14 years',
  '15-16': '15–16 years',
  adult: 'Adult',
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

/* ------------------------------------------------------------- schools */

export const schools = [
  {
    id: 'bahia-formosa',
    name: 'Bahia Formosa School',
    summary: 'Fleece top, track pants, track top and raincoat, with verified pricing from children’s sizes through 3XL.',
    products: [
      {'id':'bahia-formosa-fleece-top','name':'Fleece Top','category':'outerwear','status':'confirmed','pricing':{'3-4':285,'5-6':295,'7-8':305,'9-10':315,'11-12':325,'13-14':335,'Small':345,'Medium':345,'Large':365,'Extra_Large':375,'2x_Large':385,'3x_Large':395},'availableSizes':['3-4','5-6','7-8','9-10','11-12','13-14','Small','Medium','Large','Extra_Large','2x_Large','3x_Large']},
      {'id':'bahia-formosa-track-pants','name':'Track Pants','category':'tracksuit','status':'confirmed','pricing':{'3-4':275,'5-6':285,'7-8':295,'9-10':305,'11-12':315,'13-14':325,'Small':335,'Medium':345,'Large':355,'Extra_Large':365,'2x_Large':375,'3x_Large':385},'availableSizes':['3-4','5-6','7-8','9-10','11-12','13-14','Small','Medium','Large','Extra_Large','2x_Large','3x_Large']},
      {'id':'bahia-formosa-track-top','name':'Track Top','category':'tracksuit','status':'confirmed','pricing':{'3-4':325,'5-6':330,'7-8':335,'9-10':340,'11-12':345,'13-14':350,'Small':355,'Medium':360,'Large':365,'Extra_Large':370,'2x_Large':375,'3x_Large':380},'availableSizes':['3-4','5-6','7-8','9-10','11-12','13-14','Small','Medium','Large','Extra_Large','2x_Large','3x_Large']},
      {'id':'bahia-formosa-raincoat','name':'Raincoat','category':'rainwear','status':'confirmed','pricing':{'3-4':350,'5-6':355,'7-8':360,'9-10':365,'11-12':370,'13-14':375,'Small':380,'Medium':385,'Large':390,'Extra_Large':395,'2x_Large':400,'3x_Large':405},'availableSizes':['3-4','5-6','7-8','9-10','11-12','13-14','Small','Medium','Large','Extra_Large','2x_Large','3x_Large']},
      { id:'bahia-formosa-loose-badge', name:'Loose Badge', category:'accessory', status:STATUS.CONFIRMED, flatPrice:80, pricingType:'flat' },
      { id:'bahia-formosa-name-on-item', name:'Name on Item', category:'service', status:STATUS.CONFIRMED, flatPrice:50, pricingType:'flat' },
      { id:'bahia-formosa-winter-beanie', name:'Winter Beanie', category:'accessory', status:STATUS.CONFIRMED, flatPrice:80, pricingType:'flat' },
    ],
    bundles: [],
  },
  {
    id: 'formosa-primary',
    name: 'Formosa Primary School',
    summary: 'Golf T-shirt, tracksuit, bodywarmer, school dress and rainsuit options with verified size pricing.',
    products: [
      {'id':'formosa-primary-golf-tshirt','name':'Golf T-Shirt','category':'sportswear','status':'confirmed','pricing':{'3-4':155,'5-6':160,'7-8':165,'9-10':170,'11-12':175,'13-14':180},'availableSizes':['3-4','5-6','7-8','9-10','11-12','13-14']},
      {'id':'formosa-primary-tracksuit','name':'Tracksuit','category':'tracksuit','status':'confirmed','pricing':{'3-4':390,'5-6':400,'7-8':410,'9-10':420,'11-12':430,'13-14':440},'availableSizes':['3-4','5-6','7-8','9-10','11-12','13-14']},
      {'id':'formosa-primary-bodywarmer','name':'Bodywarmer','category':'outerwear','status':'confirmed','pricing':{'3-4':200,'5-6':205,'7-8':210,'9-10':215,'11-12':220,'13-14':225},'availableSizes':['3-4','5-6','7-8','9-10','11-12','13-14']},
      {'id':'formosa-primary-school-dress','name':'School Dress','category':'uniform','status':'confirmed','pricing':{'3-4':365,'5-6':375,'7-8':385,'9-10':395,'11-12':405,'13-14':415},'availableSizes':['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'formosa-primary-rainsuit-coat',name:'Rainsuit — Coat Only',category:'rainwear',status:STATUS.CONFIRMED,pricing:{'3-4':325,'5-6':330,'7-8':335,'9-10':340,'11-12':345,'13-14':350},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'formosa-primary-rainsuit-full',name:'Rainsuit — Full Suit',category:'rainwear',status:STATUS.CONFIRMED,pricing:{'3-4':425,'5-6':430,'7-8':435,'9-10':440,'11-12':445,'13-14':450},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'formosa-primary-loose-badge',name:'Loose Badge',category:'accessory',status:STATUS.CONFIRMED,flatPrice:80,pricingType:'flat'},
      {id:'formosa-primary-name-on-item',name:'Name on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:50,pricingType:'flat'},
      {id:'formosa-primary-badge-on-item',name:'Badge on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:90,pricingType:'flat'},
    ],
    bundles: [],
  },
  {
    id:'plettenberg-bay-secondary',
    name:'Plettenberg Bay Secondary School',
    summary:'Golf T-shirts, tracksuits and rainsuits with verified pricing from sizes 11–12 through XL.',
    products:[
      {id:'pletts-secondary-golf-tshirt',name:'Golf T-Shirt',category:'sportswear',status:STATUS.CONFIRMED,pricing:{'11-12':170,'13-14':175,'Small':180,'Medium':185,'Large':190,'Extra_Large':195},availableSizes:['11-12','13-14','Small','Medium','Large','Extra_Large']},
      {id:'pletts-secondary-tracksuit-top',name:'Tracksuit — Top Only',category:'tracksuit',status:STATUS.CONFIRMED,pricing:{'11-12':320,'13-14':330,'Small':340,'Medium':350,'Large':360,'Extra_Large':370},availableSizes:['11-12','13-14','Small','Medium','Large','Extra_Large']},
      {id:'pletts-secondary-tracksuit-full',name:'Tracksuit — Full Suit',category:'tracksuit',status:STATUS.CONFIRMED,pricing:{'11-12':420,'13-14':430,'Small':440,'Medium':450,'Large':460,'Extra_Large':470},availableSizes:['11-12','13-14','Small','Medium','Large','Extra_Large']},
      {id:'pletts-secondary-rainsuit-coat',name:'Rainsuit — Coat Only',category:'rainwear',status:STATUS.CONFIRMED,pricing:{'11-12':370,'13-14':380,'Small':390,'Medium':400,'Large':410,'Extra_Large':420},availableSizes:['11-12','13-14','Small','Medium','Large','Extra_Large']},
      {id:'pletts-secondary-rainsuit-full',name:'Rainsuit — Full Suit',category:'rainwear',status:STATUS.CONFIRMED,pricing:{'11-12':470,'13-14':480,'Small':490,'Medium':500,'Large':510,'Extra_Large':520},availableSizes:['11-12','13-14','Small','Medium','Large','Extra_Large']},
      {id:'pletts-secondary-loose-badge',name:'Loose Badge',category:'accessory',status:STATUS.CONFIRMED,flatPrice:80,pricingType:'flat'},
      {id:'pletts-secondary-name-on-item',name:'Name on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:50,pricingType:'flat'},
      {id:'pletts-secondary-badge-on-item',name:'Badge on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:90,pricingType:'flat'},
    ],bundles:[],
  },
  {
    id:'kwanokuthula-primary',
    name:'Kwanokuthula Primary School',
    summary:'Golf T-shirts, tracksuits and rainsuits with verified pricing for sizes 3–4 through 13–14.',
    products:[
      {id:'kwanokuthula-primary-golf-tshirt',name:'Golf T-Shirt',category:'sportswear',status:STATUS.CONFIRMED,pricing:{'3-4':210,'5-6':220,'7-8':230,'9-10':240,'11-12':250,'13-14':265},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'kwanokuthula-primary-tracksuit',name:'Tracksuit',category:'tracksuit',status:STATUS.CONFIRMED,pricing:{'3-4':500,'5-6':510,'7-8':520,'9-10':530,'11-12':540,'13-14':550},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'kwanokuthula-primary-rainsuit-coat',name:'Rainsuit — Coat Only',category:'rainwear',status:STATUS.CONFIRMED,pricing:{'3-4':410,'5-6':420,'7-8':430,'9-10':440,'11-12':450,'13-14':460},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'kwanokuthula-primary-rainsuit-full',name:'Rainsuit — Full Suit',category:'rainwear',status:STATUS.CONFIRMED,pricing:{'3-4':510,'5-6':520,'7-8':530,'9-10':540,'11-12':550,'13-14':560},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'kwanokuthula-primary-loose-badge',name:'Loose Badge',category:'accessory',status:STATUS.CONFIRMED,flatPrice:80,pricingType:'flat'},
      {id:'kwanokuthula-primary-name-on-item',name:'Name on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:50,pricingType:'flat'},
      {id:'kwanokuthula-primary-badge-on-item',name:'Badge on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:90,pricingType:'flat'},
    ],bundles:[],
  },
  {
    id:'kranshoek-primary',
    name:'Kranshoek Primary School',
    summary:'Tracksuits and raincoats with verified pricing for sizes 3–4 through 13–14.',
    products:[
      {id:'kranshoek-primary-tracksuit',name:'Tracksuit',category:'tracksuit',status:STATUS.CONFIRMED,pricing:{'3-4':360,'5-6':370,'7-8':380,'9-10':390,'11-12':400,'13-14':410},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'kranshoek-primary-raincoat',name:'Raincoat',category:'rainwear',status:STATUS.CONFIRMED,pricing:{'3-4':320,'5-6':330,'7-8':340,'9-10':350,'11-12':360,'13-14':370},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'kranshoek-primary-loose-badge',name:'Loose Badge',category:'accessory',status:STATUS.CONFIRMED,flatPrice:80,pricingType:'flat'},
      {id:'kranshoek-primary-name-on-item',name:'Name on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:50,pricingType:'flat'},
      {id:'kranshoek-primary-badge-on-item',name:'Badge on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:90,pricingType:'flat'},
    ],bundles:[],
  },
  {
    id:'harkerville-ek',
    name:'Harkerville Ek Primary School',
    summary:'Tracksuits and raincoats with verified pricing for sizes 3–4 through 13–14.',
    products:[
      {id:'harkerville-ek-tracksuit',name:'Tracksuit',category:'tracksuit',status:STATUS.CONFIRMED,pricing:{'3-4':360,'5-6':370,'7-8':380,'9-10':390,'11-12':400,'13-14':410},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'harkerville-ek-raincoat',name:'Raincoat',category:'rainwear',status:STATUS.CONFIRMED,pricing:{'3-4':330,'5-6':340,'7-8':350,'9-10':360,'11-12':370,'13-14':380},availableSizes:['3-4','5-6','7-8','9-10','11-12','13-14']},
      {id:'harkerville-ek-loose-badge',name:'Loose Badge',category:'accessory',status:STATUS.CONFIRMED,flatPrice:80,pricingType:'flat'},
      {id:'harkerville-ek-name-on-item',name:'Name on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:50,pricingType:'flat'},
      {id:'harkerville-ek-badge-on-item',name:'Badge on Item',category:'service',status:STATUS.CONFIRMED,flatPrice:90,pricingType:'flat'},
    ],bundles:[],
  },
  {
    id:'crags-primary',
    name:'Crags Primary School',
    summary:'School uniform pricing will be added when verified.',
    products:[],bundles:[],
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
  STATUS,
  SIZE_ORDER,
  SIZE_LABEL,
  POSSIBLY_OFFERED_CATEGORIES,
  schools,
  services,
  alterations,
  pricingNotes,
};