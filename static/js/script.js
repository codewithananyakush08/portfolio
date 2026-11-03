(function () {
  var root = document.documentElement;

  /* ---------- Day / Night theme ---------- */
  var btn = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    root.setAttribute('data-bs-theme', t);
    if (icon) icon.className = t === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  }

  applyTheme(root.getAttribute('data-theme') || 'dark');

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Mobile menu: link click par band ---------- */
  var menu = document.getElementById('menu');
  document.querySelectorAll('#menu .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---------- Projects filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.project-item');
  var noMsg = document.getElementById('noProjects');

  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      filterBtns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      var f = b.getAttribute('data-filter');
      var shown = 0;
      items.forEach(function (it) {
        var ok = f === 'all' || it.getAttribute('data-category') === f;
        it.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (noMsg) noMsg.style.display = (shown === 0 && items.length > 0) ? 'block' : 'none';
    });
  });

  /* ---------- Typing effect (home page) ---------- */
  var typed = document.getElementById('typed');
  if (typed) {
    var roles = ['Web Developer', 'Python & Django Developer', 'Frontend Enthusiast'];
    var r = 0, c = 0, del = false;
    (function tick() {
      var word = roles[r];
      typed.textContent = word.substring(0, c);
      if (!del && c < word.length) { c++; setTimeout(tick, 90); }
      else if (!del) { del = true; setTimeout(tick, 1400); }
      else if (c > 0) { c--; setTimeout(tick, 45); }
      else { del = false; r = (r + 1) % roles.length; setTimeout(tick, 300); }
    })();
  }

  /* ---------- Scroll reveal ---------- */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('show'); });
  }
})();