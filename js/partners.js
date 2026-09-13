/**
 * Renders the partner carousel.
 *
 * Technique: a continuous marquee. The list is duplicated in the DOM so a
 * single linear translate from 0 to -50% loops seamlessly. Duplicates are
 * marked aria-hidden so screen readers hear each partner once.
 *
 * Motion respects prefers-reduced-motion via CSS (see components.css).
 */

import { partners } from '../data/images.js';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function buildItem(partner, { clone = false } = {}) {
  const item = el('li', 'partner-carousel__item');
  if (clone) item.setAttribute('aria-hidden', 'true');

  const img = document.createElement('img');
  img.src = partner.logo;
  img.alt = clone ? '' : partner.name;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.className = 'partner-carousel__logo';

  item.append(img);
  return item;
}

export function renderPartnerCarousel(mount) {
  if (!mount || !partners.length) return;

  mount.textContent = '';

  const wrapper = el('div', 'partner-carousel');
  const track = el('ul', 'partner-carousel__track');

  // Original items — the accessible set.
  partners.forEach((partner) => {
    track.append(buildItem(partner));
  });

  // Duplicate set for the seamless loop.
  partners.forEach((partner) => {
    track.append(buildItem(partner, { clone: true }));
  });

  wrapper.append(track);
  mount.append(wrapper);
}

export function initPartners() {
  document
    .querySelectorAll('[data-partners]')
    .forEach((mount) => renderPartnerCarousel(mount));
}