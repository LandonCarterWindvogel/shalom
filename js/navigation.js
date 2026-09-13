/**
 * Mobile navigation: toggle, Escape to close, focus containment, and
 * automatic reset when the viewport crosses into the desktop layout.
 * Containment is achieved with `inert` on <main>/<footer> rather than a
 * hand-rolled focus trap — fewer edge cases, native behaviour.
 */

const DESKTOP_QUERY = '(min-width: 60rem)';

export function initNavigation() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (!header || !toggle || !nav) return;

  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const desktop = window.matchMedia(DESKTOP_QUERY);
  const toggleText = toggle.querySelector('.nav-toggle__text');

  let lastFocused = null;

  function isOpen() {
    return header.classList.contains('nav-open');
  }

  function setToggleLabel(open) {
    if (toggleText) toggleText.textContent = open ? 'Close' : 'Menu';
  }

  function setBackgroundInert(value) {
    if (main) main.inert = value;
    if (footer) footer.inert = value;
  }

  function open() {
    lastFocused = document.activeElement;
    header.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    setToggleLabel(true);
    nav.inert = false;
    setBackgroundInert(true);

    const first = nav.querySelector('a, button');
    if (first) first.focus();
  }

  function close({ restoreFocus = true } = {}) {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    setToggleLabel(false);
    setBackgroundInert(false);

    if (desktop.matches) {
      nav.inert = false;
    } else {
      nav.inert = true;
    }

    if (restoreFocus && lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  }

  function toggleNav() {
    if (isOpen()) close();
    else open();
  }

  toggle.addEventListener('click', toggleNav);

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link && !desktop.matches) close({ restoreFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      event.preventDefault();
      close();
    }
  });

  function syncToViewport() {
    if (desktop.matches) {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      setToggleLabel(false);
      nav.inert = false;
      setBackgroundInert(false);
    } else {
      nav.inert = !isOpen();
    }
  }

  if (typeof desktop.addEventListener === 'function') {
    desktop.addEventListener('change', syncToViewport);
  } else if (typeof desktop.addListener === 'function') {
    desktop.addListener(syncToViewport);
  }

  syncToViewport();
}

/** Adds a hairline + shadow to the sticky header once the page has scrolled. */
export function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  let ticking = false;

  function update() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
}