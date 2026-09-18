/**
 * Pricing service — the only module allowed to read data/pricing.js.
 * Every other module asks this one for prices, so there is one read path
 * and one formatting path for money on the entire site.
 */

import {
  CURRENCY,
  STATUS,
  SIZE_ORDER,
  SIZE_LABEL,
  schools,
  services,
  alterations,
  pricingNotes,
  CATALOGUE_VERSION,
} from '../data/pricing.js';

const { symbol } = CURRENCY;

/* ------------------------------------------------------------ formatting */

export function formatAmount(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return `${symbol}${n.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}`;
}

export function formatSize(size) {
  return SIZE_LABEL[size] || size || '';
}

/** Sort an array of size keys into canonical order. */
export function sortSizes(sizes) {
  return [...sizes].sort(
    (a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b)
  );
}

/* -------------------------------------------------------- price lookups */

/** The price of a product at a specific size, or null if unknown. */
export function getPriceForSize(product, size) {
  if (!product || !product.pricing) return null;
  const value = product.pricing[size];
  return Number.isFinite(value) ? value : null;
}

/** True if the size is offered and priced for this product. */
export function isSizeAvailable(product, size) {
  if (!product || !Array.isArray(product.availableSizes)) return false;
  if (!product.availableSizes.includes(size)) return false;
  return getPriceForSize(product, size) !== null;
}

/** Sorted list of sizes this product may be sold in. */
export function getAvailableSizes(product) {
  if (!product || !Array.isArray(product.availableSizes)) return [];
  return sortSizes(product.availableSizes);
}

/** Min price across all available sizes. Null if none. */
export function getMinPrice(product) {
  const values = getAvailableSizes(product)
    .map((s) => getPriceForSize(product, s))
    .filter((n) => n !== null);
  return values.length ? Math.min(...values) : null;
}

/** Max price across all available sizes. Null if none. */
export function getMaxPrice(product) {
  const values = getAvailableSizes(product)
    .map((s) => getPriceForSize(product, s))
    .filter((n) => n !== null);
  return values.length ? Math.max(...values) : null;
}

/**
 * Short label for a product card.
 *   single price   -> "R155"
 *   multiple sizes -> "From R325"
 *   no pricing     -> null
 */
export function priceLabel(product) {
  const min = getMinPrice(product);
  if (min === null) return null;
  const max = getMaxPrice(product);
  if (max === null || max === min) return formatAmount(min);
  return `From ${formatAmount(min)}`;
}

/** "Price varies by size" when the product spans a range. */
export function priceNote(product) {
  const min = getMinPrice(product);
  const max = getMaxPrice(product);
  if (min === null) return null;
  if (max !== null && max !== min) return 'Price varies by size';
  return null;
}

/** Full accessible description for a price element. */
export function priceAriaLabel(product) {
  const min = getMinPrice(product);
  const max = getMaxPrice(product);
  if (min === null) return 'Price on request';
  if (max === null || max === min) return `Price ${formatAmount(min)}`;
  return `From ${formatAmount(min)} to ${formatAmount(max)}. Price varies by size.`;
}

/* -------------------------------------------------------- status helpers */

/** The catalogue status of an item. Defaults to 'confirmed' if unset. */
export function getItemStatus(item) {
  return (item && item.status) || STATUS.CONFIRMED;
}

/** Human-readable status label for UI badges. */
export function getStatusLabel(item) {
  switch (getItemStatus(item)) {
    case STATUS.UNCERTAIN:
      return 'Availability to be confirmed';
    case STATUS.MISSING_PRICE:
      return 'Price unavailable';
    default:
      return null;
  }
}

/**
 * True only when the item is confirmed AND has pricing.
 * Only purchasable items may be added to an order list.
 */
export function isPurchasable(item) {
  if (!item) return false;
  if (getItemStatus(item) !== STATUS.CONFIRMED) return false;
  return getMinPrice(item) !== null;
}

/* -------------------------------------------------------------- lookups */

export function getSchools() {
  return schools;
}

export function getSchool(schoolId) {
  return schools.find((s) => s.id === schoolId) || null;
}

/** Every product across every school, tagged with its school. */
export function getAllProducts() {
  return schools.flatMap((school) =>
    school.products.map((product) => ({
      ...product,
      schoolId: school.id,
      schoolName: school.name,
      kind: 'product',
    }))
  );
}

/** Every bundle across every school, tagged with its school. */
export function getAllBundles() {
  return schools.flatMap((school) =>
    (school.bundles || []).map((bundle) => ({
      ...bundle,
      schoolId: school.id,
      schoolName: school.name,
      kind: 'bundle',
    }))
  );
}

/** Products + bundles, flattened. */
export function getAllItems() {
  return [...getAllProducts(), ...getAllBundles()];
}

/** Find any item by school + id, product or bundle. */
export function getItem(schoolId, itemId) {
  const school = getSchool(schoolId);
  if (!school) return null;

  const product = school.products.find((p) => p.id === itemId);
  if (product) {
    return { ...product, schoolId, schoolName: school.name, kind: 'product' };
  }

  const bundle = (school.bundles || []).find((b) => b.id === itemId);
  if (bundle) {
    return { ...bundle, schoolId, schoolName: school.name, kind: 'bundle' };
  }

  return null;
}

/** Kept for backwards compatibility. */
export function getProduct(schoolId, productId) {
  return getItem(schoolId, productId);
}

export function getServices() {
  return services;
}

export function getAlterations() {
  return alterations;
}

export function getPricingNote(key) {
  return pricingNotes[key] || null;
}

export function getCatalogueVersion() {
  return CATALOGUE_VERSION;
}

/* ------------------------------------------------------------------ misc */

/** Build a deep link to the contact page with a note about this item. */
export function enquiryHref(schoolId, itemId) {
  const params = new URLSearchParams();
  if (schoolId) params.set('school', schoolId);
  if (itemId) params.set('item', itemId);
  const qs = params.toString();
  return qs ? `/contact?${qs}#enquiry` : '/contact#enquiry';
}