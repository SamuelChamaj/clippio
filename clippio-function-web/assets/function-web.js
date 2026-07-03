(() => {
  const body = document.body;
  const themeButtons = [...document.querySelectorAll('[data-theme-value]')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const functionCards = [...document.querySelectorAll('[data-category]')];
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');

  const savedTheme = localStorage.getItem('clippio-function-theme');
  if (savedTheme) setTheme(savedTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => setTheme(button.dataset.themeValue));
  });

  function setTheme(theme) {
    body.dataset.theme = theme;
    localStorage.setItem('clippio-function-theme', theme);
    themeButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.themeValue === theme);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      functionCards.forEach((card) => {
        const visible = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !visible);
      });
    });
  });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        mobileMenu.classList.remove('is-open');
        window.setTimeout(() => { mobileMenu.hidden = true; }, 220);
      } else {
        mobileMenu.hidden = false;
        window.requestAnimationFrame(() => mobileMenu.classList.add('is-open'));
      }
    });

    mobileMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        window.setTimeout(() => { mobileMenu.hidden = true; }, 220);
      }
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;
  const revealItems = [...document.querySelectorAll('.reveal')];

  if (reducedMotion || isSmallScreen || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach((item) => observer.observe(item));
  }
})();
