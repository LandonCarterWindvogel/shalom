/**
 * Runs blocking, in <head>, before first paint.
 * Flags JavaScript/reduced-motion before reveal styles apply and preloads the
 * home-page school selector stylesheet without needing body access.
 */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('reduced-motion');
    }
  } catch (err) {
    /* matchMedia unavailable — fall through, motion is progressive only. */
  }

  // This stylesheet only contains .school-* selectors, so loading it on
  // every page is harmless and avoids relying on document.body in <head>.
  var schoolStyles = document.createElement('link');
  schoolStyles.rel = 'stylesheet';
  schoolStyles.href = '/css/school-cards.css';
  document.head.appendChild(schoolStyles);
})();