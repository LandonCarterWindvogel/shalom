/**
 * Order list — a client-side list of items the customer wants quoted.
 * With size-specific pricing, each line stores the exact price for the
 * selected size. A subtotal can therefore be calculated honestly.
 *
 * This is still an ENQUIRY, not an order: no payment, no stock reservation.
 *
 * Storage: localStorage with an in-memory fallback.
 */

const STORAGE_KEY = 'shalom.order.v2';

let memoryFallback = null;

function read() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return memoryFallback ? memoryFallback.slice() : [];
  }
}

function write(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    memoryFallback = items.slice();
  }
  document.dispatchEvent(
    new CustomEvent('order:updated', { detail: { count: items.length } })
  );
}

/** Stable key for dedupe: same item + same size = same line. */
export function lineKey(item) {
  return `${item.schoolId}::${item.itemId}::${(item.size || '').trim().toLowerCase()}`;
}

export function getItems() {
  return read();
}

export function getCount() {
  return read().length;
}

/** Sum of price × quantity across lines that have a known price. */
export function getSubtotal() {
  return read().reduce((sum, line) => {
    if (!Number.isFinite(line.price)) return sum;
    return sum + line.price * line.quantity;
  }, 0);
}

/** True if every line has a known price. */
export function isSubtotalComplete() {
  return read().every((line) => Number.isFinite(line.price));
}

export function addItem({
  schoolId,
  schoolName,
  itemId,
  itemName,
  itemKind = 'product',
  size,
  sizeLabel,
  price,
  quantity,
}) {
  const items = read();
  const candidate = {
    schoolId,
    schoolName,
    itemId,
    itemName,
    itemKind,
    size: (size || '').trim(),
    sizeLabel: sizeLabel || size || '',
    price: Number.isFinite(price) ? price : null,
    quantity: Math.max(1, Math.min(99, Number(quantity) || 1)),
  };
  const key = lineKey(candidate);
  const existing = items.find((i) => lineKey(i) === key);

  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + candidate.quantity);
  } else {
    items.push(candidate);
  }

  write(items);
  return candidate;
}

export function updateQuantity(key, quantity) {
  const items = read();
  const line = items.find((i) => lineKey(i) === key);
  if (!line) return;
  line.quantity = Math.max(1, Math.min(99, Number(quantity) || 1));
  write(items);
}

export function removeItem(key) {
  const items = read().filter((i) => lineKey(i) !== key);
  write(items);
}

export function clear() {
  write([]);
}

/** Plain-text rendering of the list, used as the Netlify form payload. */
export function serializeItems() {
  const items = read();
  if (!items.length) return '';

  const lines = items.map((item, index) => {
    const parts = [
      `${index + 1}. ${item.itemName}`,
      `   School: ${item.schoolName}`,
      `   Size: ${item.sizeLabel || item.size || '(to be confirmed)'}`,
      `   Quantity: ${item.quantity}`,
    ];
    if (Number.isFinite(item.price)) {
      parts.push(`   Unit price: R${item.price}`);
      parts.push(`   Line total: R${item.price * item.quantity}`);
    } else {
      parts.push('   Unit price: to be confirmed');
    }
    return parts.join('\n');
  });

  const subtotal = getSubtotal();
  const footer = isSubtotalComplete()
    ? `\nSubtotal (indicative): R${subtotal}`
    : '\nSubtotal: some items priced on quote';

  return lines.join('\n\n') + footer;
}