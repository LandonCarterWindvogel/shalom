(function () {
  var root = document.documentElement;
  root.classList.add('js');

  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('reduced-motion');
    }
  } catch (err) {
  }

  var schoolStyles = document.createElement('link');
  schoolStyles.rel = 'stylesheet';
  schoolStyles.href = '/css/school-cards.css';
  document.head.appendChild(schoolStyles);
})();
