/**
 * Image map — the only place that knows which file represents what.
 * ---------------------------------------------------------------------------
 * RULES
 *  - An entry exists ONLY for a subject we can name truthfully.
 *  - Product photography is added per item id. A product without an entry
 *    falls back to a typographic panel on the product card.
 *  - Partner logos are listed because the business has confirmed each
 *    relationship. If a relationship ends, remove the entry here.
 * ---------------------------------------------------------------------------
 */

export const brand = {
  hero: '/images/bannerwall.jpg',
};

export const schools = {
  'bahia-formosa': '/images/bahia.png',
  'formosa-primary': '/images/formosa.jpg',
};

export const services = {
  'school-uniforms': '/images/school.jpg',
  embroidery: '/images/embroidery.jpg',
  'custom-clothing': '/images/sport.png',
  'church-garments': '/images/toga.jpg',
};

export const craft = {
  sewing: '/images/omisew.jpg',
  labels: '/images/label.jpg',
  sampleGarment: '/images/dress.jpg',
  workshop: '/images/community1.jpg',
};

/**
 * Product photography, keyed by the item id used in data/pricing.js.
 * Only items with a photograph appear here. Everything else renders the
 * typographic fallback panel.
 */
export const products = {
  'formosa-primary-tracksuit': '/images/formosa_primary_tracksuit.jpg',
  'formosa-primary-rainsuit-full': '/images/formosa_primary_raincoat.jpg',
  'formosa-primary-school-dress': '/images/formosa_primary_dress.jpg',
};

/**
 * Confirmed partners. Order is the display order.
 * Each entry: { id, name, logo }.
 */
export const partners = [
  { id: 'crags', name: 'Crags Primary School', logo: '/images/crags.png' },
  { id: 'harkerville', name: 'Harkerville School', logo: '/images/harkerville.jpg' },
  { id: 'pletts', name: 'Plettenberg Bay Secondary School', logo: '/images/pletts.jpg' },
  { id: 'pirates', name: 'Pirates Soccer Club', logo: '/images/pirates.jpg' },
  { id: 'centrallaundry', name: 'Central Laundry', logo: '/images/centrallaundry.jpeg' },
  { id: 'chatty', name: 'Chatty', logo: '/images/chatty.png' },
  { id: 'rural', name: 'Department of Rural Development', logo: '/images/rural.jpeg' },
];

export function schoolImage(schoolId) {
  return schools[schoolId] || null;
}

export function serviceImage(serviceId) {
  return services[serviceId] || null;
}

/** The photograph for an item, or null when none is mapped. */
export function productImage(itemId) {
  return products[itemId] || null;
}

export default {
  brand,
  schools,
  services,
  craft,
  products,
  partners,
  schoolImage,
  serviceImage,
  productImage,
};