/**
 * General contact form. Shares validation + submit handling with the quote form
 * so there is one implementation of "how a form behaves on this site".
 */

import { enhanceForm } from './quote.js';

export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  enhanceForm(form);
}