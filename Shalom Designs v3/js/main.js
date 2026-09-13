/**
 * Entry point. Wires up feature modules and the few bits of page furniture
 * that do not justify a file of their own.
 */

import { initNavigation, initHeaderScroll } from './navigation.js';
import { initProducts } from './products.js';
import { initFilters } from './filters.js';
import { initQuoteForm } from './quote.js';
import { initContactForm } from './contact.js';
import { initPartners } from './partners.js';
import { initCartUI } from './cart-ui.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* --------------------------------------------------------------- reveal */

let revealObserver = null;

function revealAll() {
  document.querySelectorAll('[data-reveal]').forEach((node) => {
    node.classList.add('is-revealed');
  });
}

function observeReveals() {
  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    revealAll();
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
  }

  document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((node) => {
    revealObserver.observe(node);
  });
}

/* ------------------------------------------------------- page furniture */

function initYear() {
  const node = document.querySelector('[data-year]');
  if (node) node.textContent = String(new Date().getFullYear());
}

function init() {
  initNavigation();
  initHeaderScroll();
  initProducts();
  initFilters();
  initQuoteForm();
  initContactForm();
  initPartners();
  initCartUI();
  initYear();
  observeReveals();

  document.addEventListener('catalogue:updated', observeReveals);

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches) revealAll();
      else observeReveals();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}