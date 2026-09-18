/**
 * Renders every price-bearing surface from the pricing service.
 *
 * Media handling:
 *   - If a product has a photograph (see data/images.js), the card shows it.
 *   - Otherwise, the card uses a typographic panel over the brand gradient.
 *     This is honest — a generic photograph labelled as "Fleece Top" would
 *     not be.
 *
 * Status handling:
 *   confirmed      -> price + "Add to order list" button
 *   uncertain      -> "Availability to be confirmed" + "Contact us to confirm"
 *   missing-price  -> "Price unavailable" + "Contact us to confirm"
 */

import {
  getSchools,
  getSchool,
  getAllItems,
  getAvailableSizes,
  getItemStatus,
  getStatusLabel,
  isPurchasable,
  priceLabel,
  priceNote,
  priceAriaLabel,
  formatSize,
  enquiryHref,
} from './pricing.js';

import { productImage } from '../data/images.js';

/* ---------------------------------------------------------------- helpers */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function mediaBlock(item) {
  const media = el('div', 'product-card__media');
  const src = productImage(item.id);

  if (src) {
    // Photograph — meaningful alt text; no aria-hidden on the wrapper.
    media.classList.add('product-card__media--photo');

    const img = document.createElement('img');
    img.src = src;
    // The item name is the honest description of what the photograph is.
    img.alt = item.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.className = 'product-card__photo';

    media.append(img);
  } else {
    // Typographic panel — decorative, so hidden from assistive tech. The
    // product name already exists as the card heading below.
    media.setAttribute('aria-hidden', 'true');

    const placeholder = el('div', 'product-card__placeholder');
    placeholder.append(el('span', 'product-card__placeholder-mark', item.name));
    placeholder.append(el('span', 'product-card__placeholder-rule'));
    media.append(placeholder);
  }

  return media;
}

function priceBlock(item) {
  const statusLabel = getStatusLabel(item);

  // Non-confirmed items never show a price — the badge is the message.
  if (statusLabel) {
    const wrap = el('p', 'product-card__price product-card__price--quote');
    wrap.append(el('span', 'product-card__status', statusLabel));
    return wrap;
  }

  const label = priceLabel(item);
  const note = priceNote(item);

  if (!label) {
    const wrap = el('p', 'product-card__price product-card__price--quote');
    wrap.textContent = 'Contact us for a quote';
    return wrap;
  }

  const wrap = el('p', 'product-card__price');
  wrap.setAttribute('aria-label', priceAriaLabel(item));
  wrap.append(el('span', 'product-card__amount', label));
  if (note) wrap.append(el('span', 'product-card__note', note));
  return wrap;
}

function itemCard(item, school) {
  const status = getItemStatus(item);
  const purchasable = isPurchasable(item);

  const article = el('article', 'product-card');
  article.dataset.school = school.id;
  article.dataset.item = item.id;
  article.dataset.status = status;
  if (item.kind === 'bundle') article.dataset.kind = 'bundle';
  if (status !== 'confirmed') article.classList.add('product-card--muted');

  const media = mediaBlock(item);

  const body = el('div', 'product-card__body');
  body.append(el('p', 'product-card__school', school.name));
  if (item.kind === 'bundle') {
    body.append(el('p', 'product-card__bundle-tag', 'Bundle price'));
  }
  body.append(el('h3', 'product-card__name', item.name));
  body.append(priceBlock(item));

  const sizes = getAvailableSizes(item);
  if (sizes.length && purchasable) {
    body.append(
      el('p', 'product-card__sizes', `Sizes: ${sizes.map(formatSize).join(' · ')}`)
    );
  }

  const actions = el('div', 'product-card__actions');

  if (purchasable) {
    const addBtn = el('button', 'btn btn--primary btn--small', 'Add to order list');
    addBtn.type = 'button';
    addBtn.setAttribute('data-add-to-order', '');
    addBtn.dataset.schoolId = school.id;
    addBtn.dataset.schoolName = school.name;
    addBtn.dataset.itemId = item.id;
    addBtn.dataset.itemName = item.name;
    addBtn.dataset.itemKind = item.kind || 'product';
    addBtn.dataset.sizes = sizes.join(',');
    addBtn.dataset.priceMap = JSON.stringify(item.pricing || {});
    actions.append(addBtn);

    const direct = el('a', 'product-card__direct', 'Or enquire directly');
    direct.href = enquiryHref(school.id, item.id);
    actions.append(direct);
  } else {
    const ask = el('a', 'btn btn--ghost btn--small', 'Contact us to confirm');
    ask.href = enquiryHref(school.id, item.id);
    actions.append(ask);
  }

  body.append(actions);
  article.append(media, body);
  return article;
}

/* ------------------------------------------------------------- renderers */

export function renderSchoolProducts(mount, schoolId) {
  const school = getSchool(schoolId);
  if (!school) return;

  mount.textContent = '';
  const grid = el('div', 'product-grid');

  const everything = [...(school.bundles || []), ...school.products];

  everything.forEach((item, index) => {
    const card = itemCard(item, school);
    card.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 60}ms`);
    card.setAttribute('data-reveal', '');
    grid.append(card);
  });

  mount.append(grid);
}

export function renderPriceList(mount) {
  mount.textContent = '';
  const fragment = document.createDocumentFragment();

  getSchools().forEach((school) => {
    const section = el('section', 'price-list__school');
    section.append(el('h3', 'price-list__school-name', school.name));
    const list = el('ul', 'price-list__items');

    const everything = [...(school.bundles || []), ...school.products];

    everything.forEach((item) => {
      const row = el('li', 'price-row');
      row.append(el('span', 'price-row__name', item.name));

      const priceCell = el('span', 'price-row__price');
      const label = priceLabel(item);
      const note = priceNote(item);

      if (label) {
        priceCell.setAttribute('aria-label', priceAriaLabel(item));
        priceCell.append(el('span', 'price-row__amount', label));
        if (note) priceCell.append(el('span', 'price-row__note', note));
      } else {
        const statusLabel = getStatusLabel(item);
        priceCell.append(
          el(
            'span',
            'price-row__amount',
            statusLabel || 'Contact us for a quote'
          )
        );
      }

      row.append(priceCell);
      list.append(row);
    });

    section.append(list);
    fragment.append(section);
  });

  mount.append(fragment);
}

export function renderCatalogue(mount, schoolId = 'all') {
  const items = getAllItems().filter(
    (p) => schoolId === 'all' || p.schoolId === schoolId
  );

  mount.textContent = '';

  if (!items.length) {
    mount.append(el('p', 'empty-state', 'No items match this filter yet.'));
    return;
  }

  const grid = el('div', 'product-grid');

  items.forEach((item, index) => {
    const school = getSchool(item.schoolId);
    const card = itemCard(item, school);
    card.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 50}ms`);
    card.setAttribute('data-reveal', '');
    grid.append(card);
  });

  mount.append(grid);
}

export function initProducts() {
  const priceListMount = document.querySelector('[data-price-list]');
  if (priceListMount) renderPriceList(priceListMount);

  document.querySelectorAll('[data-school-products]').forEach((mount) => {
    renderSchoolProducts(mount, mount.dataset.schoolProducts);
  });

  // Bind school summary copy to the pricing data, so the two can never
  // drift apart the way the static copy once did.
  document.querySelectorAll('[data-school-summary]').forEach((node) => {
    const school = getSchool(node.dataset.schoolSummary);
    if (school && school.summary) node.textContent = school.summary;
  });

  const catalogueMount = document.querySelector('[data-catalogue]');
  if (catalogueMount) {
    const params = new URLSearchParams(window.location.search);
    const school = params.get('school') || 'all';
    renderCatalogue(catalogueMount, school);
  }
}