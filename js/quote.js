/**
 * Enquiry form — validation and submission.
 * Shared with the general contact form via `enhanceForm`.
 *
 * The order list is the source of items; this module only handles the
 * contact details and the submit lifecycle. It does not read pricing data.
 */

const FORM_ENDPOINT = '/';

import { clear as clearOrder } from './cart.js';

/* --------------------------------------------------------------- helpers */

function setText(node, value) {
  if (node) node.textContent = value == null ? '' : String(value);
}

function showFieldError(field, message) {
  const errorNode = field.querySelector('[data-error]');
  const input = field.querySelector('input, select, textarea');
  if (errorNode) setText(errorNode, message);
  if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
  field.classList.toggle('field--invalid', Boolean(message));
}

function clearFieldError(field) {
  showFieldError(field, '');
}

function createOrderReference() {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('');

  let suffix = '';
  try {
    const bytes = new Uint8Array(3);
    window.crypto?.getRandomValues(bytes);
    suffix = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('').slice(0, 4).toUpperCase();
  } catch (error) {
    suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  return `SD-${stamp}-${suffix}`;
}

function isGitHubPagesPreview() {
  return /.github\.io$/i.test(window.location.hostname);
}

/** Native constraint validation first, then our own messages on top. */
function validateField(input) {
  const field = input.closest('.field');
  if (!field) return true;

  if (input.validity.valid) {
    clearFieldError(field);
    return true;
  }

  let message = 'Please check this field.';
  if (input.validity.valueMissing) {
    message = input.dataset.requiredMessage || 'This field is required.';
  } else if (input.validity.typeMismatch && input.type === 'email') {
    message = 'Enter a valid email address, for example name@example.com.';
  } else if (input.validity.rangeUnderflow) {
    message = `Enter a number of ${input.min} or more.`;
  } else if (input.validity.rangeOverflow) {
    message = `Enter a number of ${input.max} or less.`;
  } else if (input.validity.tooShort) {
    message = `Please use at least ${input.minLength} characters.`;
  }

  showFieldError(field, message);
  return false;
}

/* ------------------------------------------------------------- submission */

function enhanceForm(form) {
  if (!form || form.dataset.enhanced === 'true') return;
  form.dataset.enhanced = 'true';

  const status = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector('[type="submit"]');

  function setStatus(message, state) {
    if (!status) return;
    setText(status, message);
    status.dataset.state = state || '';
    status.hidden = !message;
  }

  form.addEventListener(
    'blur',
    (event) => {
      const input = event.target;
      if (input.matches('input, select, textarea')) validateField(input);
    },
    true
  );

  form.addEventListener('input', (event) => {
    const field = event.target.closest?.('.field--invalid');
    if (field) clearFieldError(field);
  });

  form.addEventListener('submit', async (event) => {
    const inputs = Array.from(form.querySelectorAll('input, select, textarea')).filter(
      (input) => input.type !== 'hidden' && input.name !== 'bot-field'
    );

    const invalid = inputs.filter((input) => !validateField(input));

    if (invalid.length) {
      event.preventDefault();
      setStatus('Please correct the highlighted fields and try again.', 'error');
      invalid[0].focus();
      return;
    }

    if (isGitHubPagesPreview()) {
      event.preventDefault();
      setStatus(
        'This GitHub Pages preview does not process enquiries. Please use the production site at shalomdesigns.co.za/contact to send your enquiry.',
        'error'
      );
      return;
    }

    if (!window.fetch || !window.FormData) return; // let the browser POST normally

    event.preventDefault();
    const reference = createOrderReference();
    const referenceField = form.querySelector('[name="order-reference"]');
    if (referenceField) referenceField.value = reference;
    setStatus('Sending your enquiry…', 'pending');
    if (submitButton) submitButton.disabled = true;

    try {
      const body = new URLSearchParams(new FormData(form)).toString();

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      try {
        window.sessionStorage.setItem('shalom.order.reference', reference);
      } catch (storageError) {
        // The confirmation page can still load if session storage is unavailable.
      }
      clearOrder();
      window.location.assign('/thank-you.html');
    } catch (error) {
      setStatus(
        'Sorry, your enquiry could not be sent. Please try again, or contact us directly.',
        'error'
      );
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

/* ------------------------------------------------------------------ boot */

export function initQuoteForm() {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;
  enhanceForm(form);
}

export { enhanceForm };
