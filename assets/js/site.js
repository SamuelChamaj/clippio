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
    try {
      const response = await fetch(assetUrl('data/portfolio-page.json'));
      const { items = [] } = await response.json();
      if (!items.length) return;
      const grid = document.createElement('div');
      grid.className = 'masonry-grid portfolio-page__grid portfolio-gallery';
      items.forEach((item, index) => {
        const button = document.createElement('button');
        button.className = 'masonry-card portfolio-gallery__button';
        button.type = 'button';
        button.innerHTML = `<img src="${item.image}" alt="Ukážka práce Clippio ${index + 1}">`;
        button.addEventListener('click', () => openLightbox(items, index));
        grid.append(button);
      });
      target.replaceWith(grid);
    } catch { /* retain the existing empty-state message */ }
  }

  function openLightbox(items, index) {
    const dialog = document.createElement('div');
    dialog.className = 'portfolio-lightbox';
    const render = () => {
      const item = items[index];
      dialog.innerHTML = `<button class="portfolio-lightbox__close">Zavrieť</button><button class="portfolio-lightbox__nav portfolio-lightbox__nav--previous" aria-label="Predchádzajúci obrázok">‹</button><button class="portfolio-lightbox__nav portfolio-lightbox__nav--next" aria-label="Nasledujúci obrázok">›</button><div class="portfolio-lightbox__image"><img src="${item.image}" alt="${item.title || 'Ukážka práce Clippio'}"></div><p class="portfolio-lightbox__count">${index + 1} / ${items.length}</p>`;
      dialog.querySelector('.portfolio-lightbox__close').onclick = close;
      dialog.querySelector('.portfolio-lightbox__nav--previous').onclick = () => { index = (index - 1 + items.length) % items.length; render(); };
      dialog.querySelector('.portfolio-lightbox__nav--next').onclick = () => { index = (index + 1) % items.length; render(); };
    };
    const close = () => { document.body.style.overflow = ''; dialog.remove(); };
    dialog.onclick = (event) => { if (event.target === dialog) close(); };
    document.addEventListener('keydown', function onKey(event) { if (event.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } }, { once: true });
    document.body.style.overflow = 'hidden';
    render();
    document.body.append(dialog);
  }

  loadGallery();
})();
