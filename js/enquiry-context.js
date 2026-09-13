/**
 * Prefills the enquiry form from a deep link like
 * /contact?school=bahia-formosa&item=bahia-formosa-track-top#enquiry
 * (built by pricing.js's enquiryHref, used on "Contact us to confirm" and
 * "Or enquire directly" links).
 *
 * Only fills fields the visitor hasn't already touched, and only on first
 * load — it never overwrites something they've typed. If the order list
 * already has items, this steps back, since the order list block gives a
 * fuller, itemised context than a single query-string item could.
 */

import { getSchool, getItem } from './pricing.js';
import { getCount } from './cart.js';

export function prefillEnquiryFromQuery() {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const schoolId = params.get('school');
  const itemId = params.get('item');
  if (!schoolId && !itemId) return;
  if (getCount() > 0) return; // the order list already carries full context

  const school = schoolId ? getSchool(schoolId) : null;
  const item = schoolId && itemId ? getItem(schoolId, itemId) : null;

  const schoolField = form.querySelector('#q-school');
  if (schoolField && !schoolField.value && school) {
    schoolField.value = item ? `${school.name} — ${item.name}` : school.name;
  }

  const messageField = form.querySelector('#q-message');
  if (messageField && !messageField.value && item) {
    messageField.value = `I'd like a quote for: ${item.name} (${school.name}).`;
  }
}
