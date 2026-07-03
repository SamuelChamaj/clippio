(() => {
  const doc = document;
  const body = doc.body;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const on = (el, event, fn) => el && el.addEventListener(event, fn, { passive: event.includes('move') ? true : undefined });

  // Mobile menu
  const toggle = doc.querySelector('.menu-toggle');
  const nav = doc.querySelector('#nav');
  on(toggle, 'click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((a) => on(a, 'click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  // Section reveal
  const reveals = [...doc.querySelectorAll('.reveal')];
  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => observer.observe(el));
  }

  // Theme switcher
  doc.querySelectorAll('.theme-card[data-theme]').forEach((button) => {
    on(button, 'click', () => {
      body.dataset.theme = button.dataset.theme;
      doc.querySelectorAll('.theme-card').forEach((item) => item.classList.toggle('active', item === button));
    });
  });

  // Filters per section
  doc.querySelectorAll('.filter-bar').forEach((bar) => {
    const section = bar.closest('.section');
    const cards = [...section.querySelectorAll('.demo-card[data-type]')];
    bar.querySelectorAll('.filter').forEach((button) => {
      on(button, 'click', () => {
        const filter = button.dataset.filter;
        bar.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
        cards.forEach((card) => {
          card.hidden = !(filter === 'all' || card.dataset.type === filter);
        });
      });
    });
  });

  // Split text
  doc.querySelectorAll('.split-text').forEach((el) => {
    const text = el.dataset.text || el.textContent || '';
    el.textContent = '';
    [...text].forEach((char, i) => {
      const span = doc.createElement('span');
      span.textContent = char;
      span.style.setProperty('--i', i);
      el.appendChild(span);
    });
  });

  // Typewriter / rotating text
  function cycleWords(el, withTyping = false) {
    const words = (el.dataset.words || '').split('|').filter(Boolean);
    if (!words.length) return;
    let index = 0;
    let char = 0;
    let deleting = false;
    const tick = () => {
      const word = words[index];
      if (!withTyping) {
        el.textContent = word;
        index = (index + 1) % words.length;
        return;
      }
      el.textContent = word.slice(0, char);
      if (!deleting) {
        char += 1;
        if (char > word.length + 8) deleting = true;
      } else {
        char -= 1;
        if (char <= 0) {
          deleting = false;
          index = (index + 1) % words.length;
        }
      }
    };
    tick();
    setInterval(tick, withTyping ? 90 : 1450);
  }
  doc.querySelectorAll('.typewriter').forEach((el) => cycleWords(el, true));
  doc.querySelectorAll('.rotating-text').forEach((el) => cycleWords(el, false));

  // Focus words
  doc.querySelectorAll('.focus-words').forEach((wrap) => {
    const words = [...wrap.querySelectorAll('span')];
    let index = 0;
    const activate = () => {
      words.forEach((word, i) => word.classList.toggle('active', i === index));
      index = (index + 1) % words.length;
    };
    activate();
    setInterval(activate, 1300);
  });

  // Decrypted text
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&';
  doc.querySelectorAll('.decrypt').forEach((button) => {
    const final = button.dataset.final || button.textContent.trim();
    let timer;
    on(button, 'mouseenter', () => {
      let frame = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        button.textContent = [...final].map((char, i) => {
          if (char === ' ') return ' ';
          if (i < frame / 2) return final[i];
          return alphabet[Math.floor(Math.random() * alphabet.length)];
        }).join('');
        frame += 1;
        if (frame > final.length * 2 + 4) {
          clearInterval(timer);
          button.textContent = final;
        }
      }, 38);
    });
  });

  // CountUp when visible
  function animateNumber(el) {
    const to = Number(el.dataset.to || 0);
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const counters = [...doc.querySelectorAll('.countup')];
  if (prefersReduced || !('IntersectionObserver' in window)) counters.forEach((el) => { el.textContent = el.dataset.to || '0'; });
  else {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => counterObserver.observe(el));
  }

  // Scroll float
  const floatEls = [...doc.querySelectorAll('.float-on-scroll')];
  function updateFloat() {
    const y = window.scrollY || 0;
    floatEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const offset = Math.max(-10, Math.min(10, (window.innerHeight / 2 - rect.top) / 38));
      el.style.setProperty('--float', `${offset}px`);
    });
  }
  if (!prefersReduced) {
    on(window, 'scroll', updateFloat);
    updateFloat();
  }

  // Spotlight cards and custom cursor
  const cursor = doc.querySelector('.cursor-dot');
  if (!prefersReduced && matchMedia('(pointer:fine)').matches) {
    on(window, 'mousemove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add('active');
    });
    doc.querySelectorAll('a,button,.demo-card,[data-tilt]').forEach((el) => {
      on(el, 'mouseenter', () => cursor.classList.add('hover'));
      on(el, 'mouseleave', () => cursor.classList.remove('hover'));
    });
  }
  doc.querySelectorAll('.spotlight').forEach((card) => {
    on(card, 'mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--y', `${event.clientY - rect.top}px`);
    });
  });

  // Tilt cards
  doc.querySelectorAll('[data-tilt]').forEach((card) => {
    on(card, 'mousemove', (event) => {
      if (prefersReduced || !matchMedia('(pointer:fine)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    on(card, 'mouseleave', () => { card.style.transform = ''; });
  });

  // Stack demo
  doc.querySelectorAll('.stack-demo').forEach((el) => {
    const toggleStack = () => el.classList.toggle('open');
    on(el, 'click', toggleStack);
    on(el, 'keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') toggleStack(); });
  });

  // Staggered menu
  doc.querySelectorAll('.stagger-btn').forEach((button) => {
    on(button, 'click', () => button.nextElementSibling?.classList.toggle('open'));
  });

  // Card swap
  doc.querySelectorAll('.card-swap').forEach((wrap) => {
    const cards = [...wrap.querySelectorAll('article')];
    cards.forEach((card, index) => on(card, 'click', () => {
      cards.forEach((item, i) => item.classList.toggle('active', i === index));
    }));
    let index = 0;
    setInterval(() => {
      index = (index + 1) % cards.length;
      cards.forEach((item, i) => item.classList.toggle('active', i === index));
    }, 2200);
  });

  // Stepper
  doc.querySelectorAll('.stepper').forEach((stepper) => {
    const dots = [...stepper.querySelectorAll('.steps i')];
    const text = stepper.querySelector('.step-text');
    const labels = ['1. Cieľ webu', '2. Návrh a obsah', '3. Funkčný výstup'];
    let index = 0;
    stepper.querySelector('.step-next')?.addEventListener('click', () => {
      index = (index + 1) % labels.length;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      text.textContent = labels[index];
    });
  });

  // ClickSpark
  doc.querySelectorAll('.click-spark').forEach((card) => {
    card.addEventListener('click', (event) => {
      const rect = card.getBoundingClientRect();
      for (let i = 0; i < 9; i++) {
        const spark = doc.createElement('span');
        const angle = (Math.PI * 2 * i) / 9;
        const distance = 34 + Math.random() * 18;
        spark.className = 'spark';
        spark.style.left = `${event.clientX - rect.left}px`;
        spark.style.top = `${event.clientY - rect.top}px`;
        spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
        spark.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
        card.appendChild(spark);
        setTimeout(() => spark.remove(), 620);
      }
    });
  });

  // Magnet button
  doc.querySelectorAll('.magnet').forEach((el) => {
    on(el, 'mousemove', (event) => {
      if (prefersReduced || !matchMedia('(pointer:fine)').matches) return;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
    });
    on(el, 'mouseleave', () => { el.style.transform = ''; });
  });

  // Image trail
  doc.querySelectorAll('.image-trail').forEach((area) => {
    let last = 0;
    on(area, 'mousemove', (event) => {
      if (prefersReduced || !matchMedia('(pointer:fine)').matches) return;
      const now = Date.now();
      if (now - last < 90) return;
      last = now;
      const rect = area.getBoundingClientRect();
      const dot = doc.createElement('span');
      dot.className = 'trail-dot';
      dot.style.left = `${event.clientX - rect.left}px`;
      dot.style.top = `${event.clientY - rect.top}px`;
      area.appendChild(dot);
      setTimeout(() => dot.remove(), 760);
    });
  });

  // Business hint
  const hint = doc.querySelector('#businessHint');
  const out = doc.querySelector('.hint-output');
  const hints = [
    'Dobré pre kreatívny web, nie nutne pre účtovníctvo.',
    'Použiť len v hero alebo CTA. Nie všade.',
    'Ak to spomaľuje web, ide to preč.',
    'Najlepší efekt je ten, ktorý pomáha predaju.'
  ];
  let hintIndex = 0;
  on(hint, 'click', () => {
    out.textContent = hints[hintIndex % hints.length];
    hintIndex += 1;
  });
})();
