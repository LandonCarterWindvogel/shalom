/**
 * Runs blocking, in <head>, before first paint.
 * Only job: flag that JS is available so CSS can safely hide reveal elements,
 * and flag reduced-motion so we never animate for users who asked us not to.
 * Kept tiny and external so the CSP can stay at script-src 'self'.
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
})();