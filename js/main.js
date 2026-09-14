import { initNavigation, initHeaderScroll } from './navigation.js';
import { initProducts } from './products.js';
import { initFilters } from './filters.js';
import { initQuoteForm } from './quote.js';
import { initContactForm } from './contact.js';
import { prefillEnquiryFromQuery } from './enquiry-context.js';
import { initPartners } from './partners.js';
import { initCartUI } from './cart-ui.js';
import { initAssistantLauncher } from './assistant.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* --------------------------------------------------------------- reveal */

let revealObserver = null;
const REVEAL_SELECTOR = '[data-reveal], [data-mask-reveal]';

function revealAll() {
  document.querySelectorAll(REVEAL_SELECTOR).forEach((node) => {
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );
  }

  document
    .querySelectorAll(`${REVEAL_SELECTOR}:not(.is-revealed)`)
    .forEach((node) => {
      revealObserver.observe(node);
    });
}

/* --------------------------------------------------------- page goed */

function initYear() {
  const node = document.querySelector('[data-year]');
  if (node) node.textContent = String(new Date().getFullYear());
}

function initFooterCredit() {
  const legal = document.querySelector('.footer__legal');
  if (!legal || legal.querySelector('.footer__credit')) return;

  legal.style.display = 'flex';
  legal.style.flexDirection = 'column';
  legal.style.alignItems = 'center';
  legal.style.justifyContent = 'center';
  legal.style.textAlign = 'center';
  legal.style.gap = '0.3rem';

  const credit = document.createElement('p');
  credit.className = 'footer__credit';
  credit.style.margin = '0';

  const link = document.createElement('a');
  link.href = 'https://github.com/LandonCarterWindvogel';
  link.textContent = 'Built by Landon Carter Windvogel';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  credit.appendChild(link);
  legal.appendChild(credit);
}

function init() {
  initNavigation();
  initHeaderScroll();
  initProducts();
  initFilters();
  initQuoteForm();
  prefillEnquiryFromQuery();
  initContactForm();
  initPartners();
  initCartUI();
  initAssistantLauncher();
  initYear();
  initFooterCredit();
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
