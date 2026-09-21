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

  async function loadGallery() {
    const target = document.querySelector('.portfolio-gallery-loading, .gallery-empty');
    if (!target) return;
    const isHome = !!target.closest('#galeria') || (!!document.getElementById('galeria') && !document.querySelector('.portfolio-page'));
    try {
      let homeListUrl = '';
      let driveListUrl = '';
      try {
        const cfg = await fetch(assetUrl('data/portfolio-config.json'), { cache: 'no-store' });
        if (cfg.ok) {
          const data = await cfg.json();
          homeListUrl = String(data.homeListUrl || '').trim();
          driveListUrl = String(data.driveListUrl || '').trim();
        }
      } catch (e) {}
      const sources = [];
      if (isHome && homeListUrl) sources.push(homeListUrl);
      else if (!isHome && driveListUrl) sources.push(driveListUrl);
      else if (driveListUrl) sources.push(driveListUrl);
      sources.push(assetUrl('data/portfolio-page.json'));
      let items = [];
      for (const src of sources) {
        try {
          const response = await fetch(src, { cache: 'no-store' });
          if (!response.ok) continue;
          const data = await response.json();
          items = Array.isArray(data.items) ? data.items.filter((i) => i && i.image) : [];
          if (items.length) break;
        } catch (e) {}
      }
      if (!items.length) return;
      const wrap = document.createElement('div');
      wrap.className = 'portfolio-gallery-center';
      wrap.style.cssText = 'width:100%;display:flex;justify-content:center;';
      const grid = document.createElement('div');
      grid.className = 'masonry-grid portfolio-page__grid portfolio-gallery';
      grid.style.cssText = 'width:min(100%,76rem);max-width:76rem;margin-left:auto;margin-right:auto;';
      items.forEach((item, index) => {
        const button = document.createElement('button');
        button.className = 'masonry-card portfolio-gallery__button';
        button.type = 'button';
        button.innerHTML = '<img src="' + item.image + '" alt="' + (item.title || ('Ukážka práce Clippio ' + (index + 1))) + '" loading="lazy">';
        button.addEventListener('click', () => openLightbox(items, index));
        grid.append(button);
      });
      wrap.append(grid);
      target.replaceWith(wrap);
    } catch { /* retain the existing empty-state message */ }
  }

  function openLightbox(items, index) {
    const dialog = document.createElement('div');
    dialog.className = 'portfolio-lightbox';
    let scale = 1;
    let panX = 0;
    let panY = 0;
    let dragging = false;
    let didDrag = false;
    let lastX = 0;
    let lastY = 0;

    const applyTransform = (img, wrap) => {
      if (!img) return;
      img.style.transition = dragging ? 'none' : 'transform .15s ease-out';
      img.style.transform = 'translate(' + panX + 'px,' + panY + 'px) scale(' + scale + ')';
      if (wrap) {
        wrap.classList.toggle('is-zoomed', scale > 1.01);
        wrap.classList.toggle('is-panning', dragging);
      }
    };

    const resetZoom = () => {
      scale = 1;
      panX = 0;
      panY = 0;
      dragging = false;
      didDrag = false;
    };

    const bindZoom = () => {
      const wrap = dialog.querySelector('.portfolio-lightbox__image');
      const img = wrap && wrap.querySelector('img');
      if (!wrap || !img) return;

      applyTransform(img, wrap);

      wrap.onclick = (e) => {
        e.stopPropagation();
        if (didDrag) { didDrag = false; return; }
        if (scale <= 1.01) {
          scale = 2.5;
          // zoom toward click point
          const rect = wrap.getBoundingClientRect();
          const cx = e.clientX - rect.left - rect.width / 2;
          const cy = e.clientY - rect.top - rect.height / 2;
          panX = -cx * (scale - 1);
          panY = -cy * (scale - 1);
        } else {
          resetZoom();
        }
        applyTransform(img, wrap);
      };

      wrap.onwheel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        const next = Math.min(4, Math.max(1, scale + delta * scale));
        if (next === scale) return;
        const rect = wrap.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        // keep point under cursor stable
        const ratio = next / scale;
        panX = cx - (cx - panX) * ratio;
        panY = cy - (cy - panY) * ratio;
        scale = next;
        if (scale <= 1.01) {
          scale = 1;
          panX = 0;
          panY = 0;
        }
        applyTransform(img, wrap);
      };

      wrap.onpointerdown = (e) => {
        if (scale <= 1.01) return;
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        wrap.setPointerCapture(e.pointerId);
        applyTransform(img, wrap);
      };
      wrap.onpointermove = (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) didDrag = true;
        panX += dx;
        panY += dy;
        lastX = e.clientX;
        lastY = e.clientY;
        applyTransform(img, wrap);
      };
      const endDrag = () => {
        if (!dragging) return;
        dragging = false;
        applyTransform(img, wrap);
      };
      wrap.onpointerup = endDrag;
      wrap.onpointercancel = endDrag;
    };

    const render = () => {
      resetZoom();
      const item = items[index];
      dialog.innerHTML = '<button class="portfolio-lightbox__close" type="button">Zavrieť</button>' +
        '<button class="portfolio-lightbox__nav portfolio-lightbox__nav--previous" type="button" aria-label="Predchádzajúci obrázok">‹</button>' +
        '<button class="portfolio-lightbox__nav portfolio-lightbox__nav--next" type="button" aria-label="Nasledujúci obrázok">›</button>' +
        '<div class="portfolio-lightbox__image"><img src="' + item.image + '" alt="' + (item.title || 'Ukážka práce Clippio') + '" draggable="false"></div>' +
        '<p class="portfolio-lightbox__count">' + (index + 1) + ' / ' + items.length + '</p>';
      dialog.querySelector('.portfolio-lightbox__close').onclick = close;
      dialog.querySelector('.portfolio-lightbox__nav--previous').onclick = (e) => {
        e.stopPropagation();
        index = (index - 1 + items.length) % items.length;
        render();
      };
      dialog.querySelector('.portfolio-lightbox__nav--next').onclick = (e) => {
        e.stopPropagation();
        index = (index + 1) % items.length;
        render();
      };
      bindZoom();
    };
    const onKey = (event) => {
      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'ArrowLeft') {
        index = (index - 1 + items.length) % items.length;
        render();
      } else if (event.key === 'ArrowRight') {
        index = (index + 1) % items.length;
        render();
      }
    };
    const close = () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      dialog.remove();
    };
    dialog.onclick = (event) => { if (event.target === dialog) close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    render();
    document.body.append(dialog);
  }


  function initFooterHover() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.footer-hover-text').forEach((svg) => {
      const ghost = svg.querySelector('.footer-hover-text__ghost');
      const line = svg.querySelector('.footer-hover-text__line');
      const reveal = svg.querySelector('.footer-hover-text__reveal');
      const radial = svg.querySelector('#footerRevealMask, defs radialGradient');
      const linear = svg.querySelector('#footerTextGradient, defs linearGradient');
      if (!radial || !linear) return;

      // Draw blue outline once (like motion.text duration 4s)
      if (line) {
        line.style.strokeDasharray = '1000';
        line.style.strokeDashoffset = '1000';
        requestAnimationFrame(() => {
          line.style.transition = reduce
            ? 'none'
            : 'stroke-dashoffset 4s ease-in-out';
          line.style.strokeDashoffset = '0';
        });
      }

      if (reduce) return;

      const setGradientVisible = (on) => {
        linear.querySelectorAll('stop').forEach((stop) => {
          stop.setAttribute('stop-opacity', on ? '1' : '0');
        });
      };
      setGradientVisible(false);

      const updateMask = (clientX, clientY) => {
        const rect = svg.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const cx = ((clientX - rect.left) / rect.width) * 100;
        const cy = ((clientY - rect.top) / rect.height) * 100;
        radial.setAttribute('cx', cx.toFixed(2) + '%');
        radial.setAttribute('cy', cy.toFixed(2) + '%');
      };

      svg.addEventListener('pointerenter', () => {
        svg.classList.add('is-hovered');
        if (ghost) ghost.style.opacity = '0.7';
        setGradientVisible(true);
      });
      svg.addEventListener('pointerleave', () => {
        svg.classList.remove('is-hovered');
        if (ghost) ghost.style.opacity = '0';
        setGradientVisible(false);
        radial.setAttribute('cx', '50%');
        radial.setAttribute('cy', '50%');
      });
      svg.addEventListener('pointermove', (e) => {
        updateMask(e.clientX, e.clientY);
      });
    });
  }

  initFooterHover();
  loadGallery();
})();
