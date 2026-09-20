/**
 * Progressive-enhancement filters.
 * Every filter is a real <a href="?…"> so it works with JS disabled and is
 * crawlable. When JS is available we intercept, update the URL with
 * history.replaceState, and re-render in place without a full page load.
 */

import { renderCatalogue } from './products.js';

function applyPressedState(group, activeValue) {
  group.querySelectorAll('[data-filter-value]').forEach((link) => {
    const isActive = link.dataset.filterValue === activeValue;
    link.setAttribute('aria-current', isActive ? 'true' : 'false');
    link.classList.toggle('is-active', isActive);
  });
}

export function initFilters() {
  const group = document.querySelector('[data-filter-group]');
  const mount = document.querySelector('[data-catalogue]');

  if (!group || !mount) return;

  function currentValue() {
    return new URLSearchParams(window.location.search).get('school') || 'all';
  }

  function apply(value, { updateUrl = true } = {}) {
    renderCatalogue(mount, value);
    applyPressedState(group, value);

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (value === 'all') url.searchParams.delete('school');
      else url.searchParams.set('school', value);
      window.history.replaceState({}, '', url);
    }

    // Newly injected cards need observing, and focus should move somewhere useful.
    document.dispatchEvent(new CustomEvent('catalogue:updated', { detail: { value: safeValue } }));
  }

  group.addEventListener('click', (event) => {
    const link = event.target.closest('[data-filter-value]');
    if (!link) return;

    // Let modified clicks behave natively (new tab, download, etc.).
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    event.preventDefault();
    apply(link.dataset.filterValue);

    const heading = mount.querySelector('h2, h3');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  });

  apply(currentValue(), { updateUrl: false });
}