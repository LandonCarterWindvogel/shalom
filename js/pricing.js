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
  if (product && Number.isFinite(product.flatPrice)) return product.flatPrice;
  const values = getAvailableSizes(product)
    .map((s) => getPriceForSize(product, s))
    .filter((n) => n !== null);
  return values.length ? Math.min(...values) : null;
}

/** Max price across all available sizes. Null if none. */
export function getMaxPrice(product) {
  if (product && Number.isFinite(product.flatPrice)) return product.flatPrice;
  const values = getAvailableSizes(product)
    .map((s) => getPriceForSize(product, s))
    .filter((n) => n !== null);
  return values.length ? Math.max(...values) : null;
}
}