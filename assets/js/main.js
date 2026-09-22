(function() {
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.body.classList.remove('is-preload');
    }, 100);
  });

  // Hamburger nav: toggle panel and smooth scroll to section
  (function() {
    var header = document.getElementById('site-nav');
    var toggle = document.getElementById('nav-toggle');
    var panel = document.getElementById('nav-panel');
    if (!header || !toggle || !panel) return;

    function openNav() {
      header.classList.add('nav-open');
      toggle.setAttribute('aria-label', 'Close menu');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function() {
      if (header.classList.contains('nav-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Section links are absolute (e.g. "/#about") so they also work off the home
    // page; scroll smoothly when the target is on this page, otherwise navigate.
    panel.querySelectorAll('.nav-links a[href*="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var id = link.hash;
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          closeNav();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        closeNav();
      }
    });
  })();

  // Collapsible condition categories
  (function() {
    document.querySelectorAll('.condition-category-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var category = btn.closest('.condition-category');
        var contentId = btn.getAttribute('aria-controls');
        var content = contentId ? document.getElementById(contentId) : category.querySelector('.condition-category-content');
        if (!content) return;
        var isOpen = category.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        content.hidden = !isOpen;
      });
    });
  })();
})();