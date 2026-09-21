(() => {
  'use strict';

  const root = new URL(document.querySelector('base')?.href || location.href);
  const assetUrl = (path) => new URL(path, root).href;

  document.querySelectorAll('.pc-contact-btn').forEach((button) => {
    button.addEventListener('click', () => { location.href = assetUrl('kontakt/'); });
  });

  document.querySelectorAll('[data-parallax-layers]').forEach((layers) => {
    const section = layers.closest('.parallax__header');
    let frame;

    const update = () => {
      frame = undefined;
      const bounds = section.getBoundingClientRect();
      const amount = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height)));
      layers.querySelectorAll('[data-parallax-layer]').forEach((layer) => {
        const level = Number(layer.dataset.parallaxLayer);
        const distances = { 1: -46, 2: -24, 3: -74, 4: 42 };
        layer.style.transform = `translate3d(0, ${amount * distances[level]}px, 0)`;
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  });

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = form.elements.email.value.trim();
      const error = form.querySelector('.contact-form__error--form');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (error) error.textContent = 'Skontroluj e-mailovú adresu.';
        return;
      }
      const payload = new FormData(form);
      payload.append('access_key', '0eb8f328-b1f0-473d-a939-370e901a7ac6');
      payload.append('subject', 'Nová správa z kontaktného formulára Clippio');
      payload.append('from_name', 'Clippio web');
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'Odosielam…';
      try {
        const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error();
        form.reset();
        alert('Ďakujem za kontaktovanie. Budem sa snažiť odpovedať čo najskôr.');
      } catch {
        if (error) error.textContent = 'Správu sa nepodarilo odoslať. Skúste to znova alebo použite e-mail či telefón.';
      } finally {
        submit.disabled = false;
        submit.textContent = 'Odoslať';
      }
    });
  }

  function renderGallery(target, items) {
    const grid = document.createElement('div');
    grid.className = 'masonry-grid portfolio-page__grid portfolio-gallery';
    items.forEach((item, index) => {
      const button = document.createElement('button');
      button.className = 'masonry-card portfolio-gallery__button';
      button.type = 'button';
      if (item.type === 'video') button.classList.add('is-video');
      const title = item.title || `Ukážka práce Clippio ${index + 1}`;
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = title;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = () => {
        img.src = assetUrl('assets/images/clippio-logo.png');
        img.alt = 'Náhľad sa nepodarilo načítať';
      };
      button.append(img);
      if (item.type === 'video') {
        const badge = document.createElement('span');
        badge.className = 'portfolio-gallery__video-badge';
        badge.setAttribute('aria-hidden', 'true');
        badge.textContent = '▶';
        button.append(badge);
      }
      button.addEventListener('click', () => openLightbox(items, index));
      grid.append(button);
    });
    target.replaceWith(grid);
  }

  function showGalleryMessage(target, html) {
    target.className = 'gallery-empty';
    target.innerHTML = html;
  }

  async function fetchItems(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error('fetch failed ' + response.status);
    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];
    return items.filter((item) => item && item.image);
  }

  async function loadGallery() {
    const target = document.querySelector('.portfolio-gallery-loading, .gallery-empty');
    if (!target) return;

    const isHomeGallery = !!target.closest('#galeria') || (!!document.getElementById('galeria') && !document.querySelector('.portfolio-page'));
    const emptyLabel = isHomeGallery ? 'Galéria' : 'Portfólio';

    try {
      let driveListUrl = '';
      let homeListUrl = '';
      try {
        const configResponse = await fetch(assetUrl('data/portfolio-config.json'), { cache: 'no-store' });
        if (configResponse.ok) {
          const config = await configResponse.json();
          driveListUrl = String(config.driveListUrl || '').trim();
          homeListUrl = String(config.homeListUrl || '').trim();
        }
      } catch {
        /* config is optional */
      }

      const sources = [];
      if (isHomeGallery && homeListUrl) sources.push(homeListUrl);
      else if (!isHomeGallery && driveListUrl) sources.push(driveListUrl);
      else if (driveListUrl) sources.push(driveListUrl);
      sources.push(assetUrl('data/portfolio-page.json'));

      let items = [];
      let lastError = null;
      for (const source of sources) {
        try {
          items = await fetchItems(source);
          if (items.length) break;
        } catch (error) {
          lastError = error;
        }
      }

      if (!items.length) {
        showGalleryMessage(
          target,
          lastError
            ? '<p>' + emptyLabel + ' sa nepodarilo načítať. Skús obnoviť stránku alebo <a href="kontakt">napíš mi</a>.</p>'
            : '<p>' + emptyLabel + ' sa pripravuje. Skús to neskôr alebo <a href="kontakt">napíš mi</a>.</p>'
        );
        return;
      }

      renderGallery(target, items);
    } catch {
      showGalleryMessage(
        target,
        '<p>' + emptyLabel + ' sa nepodarilo načítať. Skús obnoviť stránku alebo <a href="kontakt">napíš mi</a>.</p>'
      );
    }
  }

  function openLightbox(items, index) {
    const dialog = document.createElement('div');
    dialog.className = 'portfolio-lightbox';
    const render = () => {
      const item = items[index];
      const title = item.title || 'Ukážka práce Clippio';
      let mediaHtml;
      if (item.type === 'video' && item.video) {
        mediaHtml = `<div class="portfolio-lightbox__image portfolio-lightbox__video"><iframe src="${item.video}" title="${title}" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe></div>`;
      } else {
        mediaHtml = `<div class="portfolio-lightbox__image"><img src="${item.image}" alt="${title}"></div>`;
      }
      dialog.innerHTML = `<button class="portfolio-lightbox__close">Zavrieť</button><button class="portfolio-lightbox__nav portfolio-lightbox__nav--previous" aria-label="Predchádzajúci">‹</button><button class="portfolio-lightbox__nav portfolio-lightbox__nav--next" aria-label="Nasledujúci">›</button>${mediaHtml}<p class="portfolio-lightbox__count">${index + 1} / ${items.length}</p>`;
      dialog.querySelector('.portfolio-lightbox__close').onclick = close;
      dialog.querySelector('.portfolio-lightbox__nav--previous').onclick = () => {
        index = (index - 1 + items.length) % items.length;
        render();
      };
      dialog.querySelector('.portfolio-lightbox__nav--next').onclick = () => {
        index = (index + 1) % items.length;
        render();
      };
    };
    const close = () => {
      document.body.style.overflow = '';
      dialog.remove();
    };
    dialog.onclick = (event) => {
      if (event.target === dialog) close();
    };
    document.addEventListener(
      'keydown',
      function onKey(event) {
        if (event.key === 'Escape') {
          close();
          document.removeEventListener('keydown', onKey);
        }
      },
      { once: true }
    );
    document.body.style.overflow = 'hidden';
    render();
    document.body.append(dialog);
  }


  function initFooterHover() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.footer-hover-text').forEach((svg) => {
      const ghost = svg.querySelector('.footer-hover-text__ghost');
      const line = svg.querySelector('.footer-hover-text__line');
      const radial = svg.querySelector('defs radialGradient');
      if (!radial) return;

      // draw outline animation once
      if (line) {
        line.style.strokeDasharray = '1000';
        line.style.strokeDashoffset = '1000';
        requestAnimationFrame(() => {
          if (reduce) {
            line.style.transition = 'none';
            line.style.strokeDashoffset = '0';
          } else {
            line.style.transition = 'stroke-dashoffset 3.2s cubic-bezier(0.76, 0, 0.24, 1)';
            line.style.strokeDashoffset = '0';
          }
        });
      }

      if (reduce) return;

      const updateMask = (clientX, clientY) => {
        const rect = svg.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const cx = ((clientX - rect.left) / rect.width) * 100;
        const cy = ((clientY - rect.top) / rect.height) * 100;
        radial.setAttribute('cx', cx.toFixed(2) + '%');
        radial.setAttribute('cy', cy.toFixed(2) + '%');
      };

      const linear = svg.querySelector('defs linearGradient');
      const defaultStops = linear
        ? Array.from(linear.querySelectorAll('stop')).map((stop) => stop.getAttribute('stop-color') || '#3ca2fa')
        : [];
      const hoverStops = ['#eab308', '#ef4444', '#80eeb4', '#06b6d4', '#8b5cf6'];

      const paintStops = (colors) => {
        if (!linear) return;
        const stops = linear.querySelectorAll('stop');
        stops.forEach((stop, index) => {
          stop.setAttribute('stop-color', colors[index % colors.length]);
        });
      };

      svg.addEventListener('pointerenter', () => {
        svg.classList.add('is-hovered');
        if (ghost) ghost.style.opacity = '0.7';
        paintStops(hoverStops);
      });
      svg.addEventListener('pointerleave', () => {
        svg.classList.remove('is-hovered');
        if (ghost) ghost.style.opacity = '0';
        radial.setAttribute('cx', '50%');
        radial.setAttribute('cy', '50%');
        paintStops(defaultStops.length ? defaultStops : ['#f5f5f5', '#25e7dd', '#7c5cff', '#ffffff']);
      });
      svg.addEventListener('pointermove', (event) => {
        updateMask(event.clientX, event.clientY);
      });
    });
  }

  initFooterHover();
  loadGallery();
})();
