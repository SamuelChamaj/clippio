(() => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll('[data-theme]');
  const savedTheme = localStorage.getItem('clippioFunctionTheme');

  function setTheme(theme) {
    root.setAttribute('data-bg', theme);
    localStorage.setItem('clippioFunctionTheme', theme);
    themeButtons.forEach((button) => button.classList.toggle('active', button.dataset.theme === theme));
  }

  if (savedTheme && [...themeButtons].some((button) => button.dataset.theme === savedTheme)) {
    setTheme(savedTheme);
  }

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => setTheme(button.dataset.theme));
  });

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((item) => revealObserver.observe(item));

  const countItems = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const duration = 900;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.45 });
  countItems.forEach((item) => countObserver.observe(item));

  document.querySelectorAll('.typewriter').forEach((el) => {
    let words = [];
    try { words = JSON.parse(el.dataset.words || '[]'); } catch { words = []; }
    if (!words.length) return;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    function type() {
      const word = words[wordIndex];
      el.textContent = word.slice(0, charIndex);
      if (!deleting && charIndex <= word.length) charIndex += 1;
      if (deleting && charIndex >= 0) charIndex -= 1;
      if (!deleting && charIndex > word.length + 8) deleting = true;
      if (deleting && charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
      }
      setTimeout(type, deleting ? 42 : 70);
    }
    type();
  });

  document.querySelectorAll('.rotating-word').forEach((el) => {
    let words = [];
    try { words = JSON.parse(el.dataset.words || '[]'); } catch { words = []; }
    if (!words.length) return;
    let index = 0;
    setInterval(() => {
      index = (index + 1) % words.length;
      el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
      el.textContent = words[index];
    }, 1600);
  });

  document.querySelectorAll('.spotlight-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const buttons = tabs.querySelectorAll('[data-tab]');
    const panels = tabs.querySelectorAll('[data-panel]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.toggle('active', b === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === button.dataset.tab));
      });
    });
  });

  document.querySelectorAll('.accordion button').forEach((button) => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const open = answer.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      if (!form.checkValidity()) {
        status.textContent = 'Vyplňte typ projektu a rozpočet.';
        return;
      }
      status.textContent = 'Ukážka odoslania funguje. Reálny formulár sa napája podľa projektu.';
      form.reset();
    });
  });

  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('pointerleave', () => {
      button.style.transform = '';
    });
  });
})();
