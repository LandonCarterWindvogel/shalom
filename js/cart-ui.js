/**
 * Order list UI:
 *  - header badge showing the item count
 *  - "Add to order list" dialog with a real size <select>
 *  - the order list block on the contact page
 *  - wiring the list into the Netlify form payload
 */

import {
  getItems,
  getCount,
  getSubtotal,
  isSubtotalComplete,
  addItem,
  removeItem,
  updateQuantity,
  clear,
  lineKey,
  serializeItems,
} from './cart.js';

import { formatAmount, formatSize } from './pricing.js';

/* ------------------------------------------------------------- helpers */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

/* ------------------------------------------------------------- badge */

function refreshBadges() {
  const count = getCount();
  document.querySelectorAll('[data-order-count]').forEach((node) => {
    node.textContent = String(count);
    node.hidden = count === 0;
  });
  document.querySelectorAll('[data-order-badge]').forEach((node) => {
    node.setAttribute(
      'aria-label',
      count === 0
        ? 'Order list, empty'
        : `Order list, ${count} item${count === 1 ? '' : 's'}`
    );
  });
}

/* ------------------------------------------------------------ dialog */

function ensureDialog() {
  let dialog = document.querySelector('[data-order-dialog]');
  if (dialog) return dialog;

  dialog = document.createElement('dialog');
  dialog.className = 'order-dialog';
  dialog.setAttribute('data-order-dialog', '');
  dialog.setAttribute('aria-labelledby', 'order-dialog-title');
  dialog.innerHTML = `
    <form method="dialog" class="order-dialog__form" novalidate>
      <h2 id="order-dialog-title" class="order-dialog__title">Add to order list</h2>
      <p class="order-dialog__school" data-dialog-school></p>

      <div class="field">
        <label class="field__label" for="order-size">Size</label>
        <select class="field__input" id="order-size" name="size" required
                data-required-message="Please choose a size."></select>
        <p class="field__error" data-dialog-size-error role="alert"></p>
      </div>

      <div class="field">
        <label class="field__label" for="order-quantity">Quantity</label>
        <input class="field__input" id="order-quantity" name="quantity"
               type="number" value="1" min="1" max="99" inputmode="numeric">
      </div>

      <p class="order-dialog__price" data-dialog-price aria-live="polite"></p>
      <p class="order-dialog__note">
        Final total is confirmed by Shalom Designs on your quote.
      </p>

      <div class="order-dialog__actions">
        <button class="btn btn--ghost" type="button" data-dialog-cancel>Cancel</button>
        <button class="btn btn--primary" type="submit">Add to order list</button>
      </div>
    </form>
  `;
  document.body.append(dialog);

  dialog.querySelector('[data-dialog-cancel]').addEventListener('click', () => {
    dialog.close('cancel');
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close('cancel');
  });

  return dialog;
}

function populateSizes(dialog, sizes) {
  const select = dialog.querySelector('#order-size');
  select.textContent = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Select a size';
  select.append(placeholder);

  sizes.forEach((size) => {
    const opt = document.createElement('option');
    opt.value = size;
    opt.textContent = formatSize(size);
    select.append(opt);
  });
}

function refreshDialogPrice(dialog) {
  const select = dialog.querySelector('#order-size');
  const qtyInput = dialog.querySelector('#order-quantity');
  const priceOut = dialog.querySelector('[data-dialog-price]');

  const priceMap = dialog.dataset.priceMap
    ? JSON.parse(dialog.dataset.priceMap)
    : {};
  const price = priceMap[select.value];
  const quantity = Math.max(1, Math.min(99, Number(qtyInput.value) || 1));

  if (!select.value || !Number.isFinite(price)) {
    priceOut.textContent = 'Choose a size to see the price.';
    return;
  }

  const unit = formatAmount(price);
  if (quantity > 1) {
    priceOut.textContent = `${unit} each · ${formatAmount(price * quantity)} for ${quantity}`;
  } else {
    priceOut.textContent = `${unit} each`;
  }
}

function openDialog(button) {
  const dialog = ensureDialog();

  dialog.dataset.schoolId = button.dataset.schoolId || '';
  dialog.dataset.schoolName = button.dataset.schoolName || '';
  dialog.dataset.itemId = button.dataset.itemId || '';
  dialog.dataset.itemName = button.dataset.itemName || '';
  dialog.dataset.itemKind = button.dataset.itemKind || 'product';
  dialog.dataset.priceMap = button.dataset.priceMap || '{}';

  const sizes = (button.dataset.sizes || '').split(',').filter(Boolean);

  dialog.querySelector('#order-dialog-title').textContent =
    `Add ${dialog.dataset.itemName} to order list`;
  dialog.querySelector('[data-dialog-school]').textContent = dialog.dataset.schoolName;

  populateSizes(dialog, sizes);

  const sizeSelect = dialog.querySelector('#order-size');
  sizeSelect.value = sizes[0] || '';
  dialog.querySelector('#order-quantity').value = '1';

  const sizeError = dialog.querySelector('[data-dialog-size-error]');
  sizeError.textContent = '';

  refreshDialogPrice(dialog);
  dialog.showModal();
  sizeSelect.focus();
}

function handleDialogSubmit(dialog, event) {
  event.preventDefault();

  const select = dialog.querySelector('#order-size');
  const qtyInput = dialog.querySelector('#order-quantity');
  const sizeError = dialog.querySelector('[data-dialog-size-error]');

  if (!select.value) {
    sizeError.textContent = 'Please choose a size.';
    select.focus();
    return;
  }

  const priceMap = JSON.parse(dialog.dataset.priceMap || '{}');
  const price = Number.isFinite(priceMap[select.value]) ? priceMap[select.value] : null;

  const added = addItem({
    schoolId: dialog.dataset.schoolId,
    schoolName: dialog.dataset.schoolName,
    itemId: dialog.dataset.itemId,
    itemName: dialog.dataset.itemName,
    itemKind: dialog.dataset.itemKind,
    size: select.value,
    sizeLabel: formatSize(select.value),
    price,
    quantity: qtyInput.value,
  });

  dialog.close('added');
  showToast(`Added ${added.itemName} (${added.sizeLabel}) to your order list.`);
}

/* -------------------------------------------------------------- toast */

let toastTimer = null;

function showToast(message) {
  let toast = document.querySelector('[data-toast]');
  if (!toast) {
    toast = document.createElement('p');
    toast.className = 'toast';
    toast.setAttribute('data-toast', '');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4000);
}

/* --------------------------------------------------- contact-page list */

function syncHiddenField() {
  const field = document.querySelector('[name="order-list"]');
  if (field) field.value = serializeItems();
}

function renderOrderList(mount) {
  const items = getItems();
  mount.textContent = '';

  if (!items.length) {
    mount.hidden = true;
    syncHiddenField();
    return;
  }

  mount.hidden = false;

  mount.append(
    el(
      'h2',
      'order-list__heading',
      `Your order list (${items.length} item${items.length === 1 ? '' : 's'})`
    )
  );

  mount.append(
    el(
      'p',
      'order-list__intro',
      'These are the items you want a quote for. Change a quantity, ' +
        'remove an item, or add more from the school pages. The final ' +
        'total is confirmed by Shalom Designs.'
    )
  );

  const list = el('ul', 'order-list__items');

  items.forEach((item) => {
    const key = lineKey(item);
    const li = el('li', 'order-list__item');

    const main = el('div', 'order-list__main');
    main.append(el('p', 'order-list__name', item.itemName));

    const metaText = [item.schoolName, item.sizeLabel ? `Size: ${item.sizeLabel}` : null]
      .filter(Boolean)
      .join(' · ');
    main.append(el('p', 'order-list__meta', metaText));

    if (Number.isFinite(item.price)) {
      main.append(
        el('p', 'order-list__line-price', `${formatAmount(item.price)} each`)
      );
    } else {
      main.append(el('p', 'order-list__line-price', 'Priced on quote'));
    }

    const controls = el('div', 'order-list__controls');

    const qtyLabel = el('label', 'visually-hidden', `Quantity for ${item.itemName}`);
    qtyLabel.setAttribute('for', `qty-${key}`);

    const qty = document.createElement('input');
    qty.className = 'order-list__qty';
    qty.type = 'number';
    qty.min = '1';
    qty.max = '99';
    qty.value = String(item.quantity);
    qty.id = `qty-${key}`;
    qty.addEventListener('change', () => {
      updateQuantity(key, qty.value);
      refreshBadges();
      renderOrderList(mount);
    });

    const remove = el('button', 'order-list__remove', 'Remove');
    remove.type = 'button';
    remove.addEventListener('click', () => {
      removeItem(key);
      refreshBadges();
      renderOrderList(mount);
    });

    controls.append(qtyLabel, qty, remove);
    li.append(main, controls);
    list.append(li);
  });

  mount.append(list);

  const subtotal = getSubtotal();
  const complete = isSubtotalComplete();

  const summary = el('div', 'order-list__summary');
  summary.append(
    el(
      'p',
      'order-list__subtotal',
      complete
        ? `Subtotal (indicative): ${formatAmount(subtotal)}`
        : 'Some items are priced on quote.'
    )
  );
  summary.append(
    el(
      'p',
      'order-list__subtotal-note',
      'This is an indicative subtotal. Your final quote is confirmed by Shalom Designs.'
    )
  );
  mount.append(summary);

  const actions = el('div', 'order-list__actions');
  const clearBtn = el('button', 'link-arrow', 'Clear the list');
  clearBtn.type = 'button';
  clearBtn.addEventListener('click', () => {
    clear();
    refreshBadges();
    renderOrderList(mount);
  });
  actions.append(clearBtn);
  mount.append(actions);

  syncHiddenField();
}

/* --------------------------------------------------------------- boot */

export function initCartUI() {
  refreshBadges();

  document.addEventListener('click', (event) => {
    const addBtn = event.target.closest('[data-add-to-order]');
    if (addBtn) {
      event.preventDefault();
      openDialog(addBtn);
    }
  });

  const dialog = ensureDialog();
  dialog.querySelector('form').addEventListener('submit', (event) => {
    handleDialogSubmit(dialog, event);
  });
  dialog.querySelector('#order-size').addEventListener('change', () => {
    refreshDialogPrice(dialog);
  });
  dialog.querySelector('#order-quantity').addEventListener('input', () => {
    refreshDialogPrice(dialog);
  });

  document.addEventListener('order:updated', () => {
    refreshBadges();
    syncHiddenField();
  });

  const listMount = document.querySelector('[data-order-list]');
  if (listMount) renderOrderList(listMount);
}