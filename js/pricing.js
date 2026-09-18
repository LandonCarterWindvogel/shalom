/**
 * Pricing service — the only module allowed to read data/pricing.js.
 * All product cards, price lists and order dialogs use this service.
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

export function sortSizes(sizes) {
  return [...sizes].sort((a, b) => {
    const ai = SIZE_ORDER.indexOf(a);
    const bi = SIZE_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

/* -------------------------------------------------------- price lookups */

export function getPriceForSize(product, size) {
  if (!product) return null;
  if (Number.isFinite(product.flatPrice)) return product.flatPrice;
  if (!product.pricing) return null;
  const value = product.pricing[size];
  return Number.isFinite(value) ? value : null;
}

export function isSizeAvailable(product, size) {
  if (!product) return false;
  if (Number.isFinite(product.flatPrice)) return true;
  if (!Array.isArray(product.availableSizes)) return false;
  return product.availableSizes.includes(size) && getPriceForSize(product, size) !== null;
}

export function getAvailableSizes(product) {
  if (!product) return [];
  if (Number.isFinite(product.flatPrice)) return [];
  if (!Array.isArray(product.availableSizes)) return [];
  return sortSizes(product.availableSizes);
}

export function getMinPrice(product) {
  if (product && Number.isFinite(product.flatPrice)) return product.flatPrice;
  const values = getAvailableSizes(product)
    .map((size) => getPriceForSize(product, size))
    .filter((value) => value !== null);
  return values.length ? Math.min(...values) : null;
}

export function getMaxPrice(product) {
  if (product && Number.isFinite(product.flatPrice)) return product.flatPrice;
  const values = getAvailableSizes(product)
    .map((size) => getPriceForSize(product, size))
    .filter((value) => value !== null);
  return values.length ? Math.max(...values) : null;
}

/* ------------------------------------------------------------- catalogue */

export function getSchools() {
  return schools;
}

export function getSchool(schoolId) {
  return schools.find((school) => school.id === schoolId) || null;
}

export function getAllItems() {
  return schools.flatMap((school) =>
    [...(school.bundles || []), ...(school.products || [])].map((item) => ({
      ...item,
      schoolId: school.id,
      schoolName: school.name,
    }))
  );
}

export function getItem(schoolId, itemId) {
  const school = getSchool(schoolId);
  if (!school) return null;
  return [...(school.bundles || []), ...(school.products || [])].find(
    (item) => item.id === itemId
  ) || null;
}

/* -------------------------------------------------------------- status */

export function getItemStatus(item) {
  return item?.status || STATUS.MISSING_PRICE;
}

export function getStatusLabel(item) {
  const status = getItemStatus(item);
  if (status === STATUS.UNCERTAIN) return 'Availability to be confirmed';
  if (status === STATUS.MISSING_PRICE) return 'Price unavailable';
  return '';
}

export function isPurchasable(item) {
  return getItemStatus(item) === STATUS.CONFIRMED &&
    (Number.isFinite(item?.flatPrice) || getMinPrice(item) !== null);
}

/* --------------------------------------------------------------- labels */

export function priceLabel(item) {
  if (getItemStatus(item) !== STATUS.CONFIRMED) return null;

  const min = getMinPrice(item);
  const max = getMaxPrice(item);
  if (min === null) return null;

  if (min === max) return formatAmount(min);
  return `From ${formatAmount(min)}`;
}

export function priceNote(item) {
  if (getItemStatus(item) !== STATUS.CONFIRMED) return null;

  const min = getMinPrice(item);
  const max = getMaxPrice(item);
  if (min === null || min === max) return null;

  return `up to ${formatAmount(max)} depending on size`;
}

export function priceAriaLabel(item) {
  const label = priceLabel(item);
  const note = priceNote(item);
  return [label, note].filter(Boolean).join(' ');
}

export function enquiryHref(schoolId, itemId = '') {
  const params = new URLSearchParams();
  if (schoolId) params.set('school', schoolId);
  if (itemId) params.set('item', itemId);
  const query = params.toString();
  return `/contact#enquiry${query ? `?${query}` : ''}`;
}

/* ------------------------------------------------------------- exports */

export {
  CURRENCY,
  CATALOGUE_VERSION,
  STATUS,
  SIZE_ORDER,
  SIZE_LABEL,
  schools,
  services,
  alterations,
  pricingNotes,
};

export default {
  CURRENCY,
  CATALOGUE_VERSION,
  STATUS,
  SIZE_ORDER,
  SIZE_LABEL,
  schools,
  services,
  alterations,
  pricingNotes,
  getSchools,
  getSchool,
  getAllItems,
};
