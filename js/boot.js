(function () {
  var root = document.documentElement;
  root.classList.add('js');

  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('reduced-motion');
    }
  } catch (err) {
  }

  ['/css/school-cards.css', '/css/navigation-mobile.css'].forEach(function (href) {
    var styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = href;
    document.head.appendChild(styles);
  });
})();
