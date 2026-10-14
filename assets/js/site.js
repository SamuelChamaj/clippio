(() => {
  'use strict';

  const root = new URL(document.querySelector('base')?.href || location.href);
  const assetUrl = (path) => new URL(path, root).href;

  document.querySelectorAll('.site-nav').forEach((nav) => {
    const toggle = nav.querySelector('.site-nav__toggle');
    const panel = nav.querySelector('.site-nav__panel');
    if (!toggle || !panel) return;
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
    };
    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) setOpen(false);
    });
  });

  document.querySelectorAll('.pc-contact-btn').forEach((button) => {
    button.addEventListener('click', () => { location.href = assetUrl('kontakt/'); });
  });

  /* Keep first paint of hero framed like a light scroll (not cropped too high). */
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (window.scrollY < 2) window.scrollTo(0, 0);
  } catch (e) {}

  document.querySelectorAll('[data-parallax-layers]').forEach((layers) => {
    const section = layers.closest('.parallax__header');
    let frame;
    /* Baseline ~ one mouse-wheel tick of parallax so load matches desired framing */
    const BASELINE = 0.18;

    const update = () => {
      frame = null;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const scrolled = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height)));
      const amount = Math.min(1, scrolled + BASELINE * Math.max(0, 1 - scrolled));
      layers.querySelectorAll('[data-parallax-layer]').forEach((layer) => {
        const level = Number(layer.dataset.parallaxLayer);
        const distances = { 1: -90, 2: -45, 3: -140, 4: 0 };
        const baseY = (level === 4) ? 42 : (level === 3 ? -12 : 0);
        const y = baseY + amount * (distances[level] || 0);
        layer.style.transform = 'translate3d(0, ' + y + 'px, 0)';
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  });

  document.querySelectorAll('.contact-form__select-wrap select').forEach((select) => {
    const wrap = select.parentElement;
    if (!wrap || wrap.querySelector('.service-picker')) return;
    select.classList.add('service-picker__native');
    const picker = document.createElement('div');
    picker.className = 'service-picker';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'service-picker__button';
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    const label = document.createElement('span');
    const menu = document.createElement('ul');
    menu.className = 'service-picker__menu';
    menu.hidden = true;
    menu.setAttribute('role', 'listbox');
    const choices = [];
    const paint = () => {
      const current = select.options[select.selectedIndex];
      const empty = !select.value;
      label.textContent = empty ? 'Nevybrané' : (current ? current.textContent : '');
      button.classList.toggle('is-placeholder', empty);
      choices.forEach((choice) => {
        const on = choice.dataset.value === select.value;
        choice.classList.toggle('is-selected', on);
        choice.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    };
    const close = () => {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    };
    Array.from(select.options).forEach((option) => {
      if (!option.value) return;
      const item = document.createElement('li');
      const choice = document.createElement('button');
      choice.type = 'button';
      choice.dataset.value = option.value;
      choice.setAttribute('role', 'option');
      choice.textContent = option.textContent;
      choice.addEventListener('click', () => {
        select.value = option.value;
        paint();
        close();
      });
      choices.push(choice);
      item.appendChild(choice);
      menu.appendChild(item);
    });
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const open = menu.hidden;
      menu.hidden = !open;
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (event) => {
      if (!picker.contains(event.target)) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
    button.appendChild(label);
    picker.append(button, menu);
    wrap.appendChild(picker);
    paint();
  });

  const form = document.querySelector('.contact-form');
  if (form) {
    form.noValidate = true;
    const isValidEmail = (value) => {
      const email = value.trim();
      if (!email || email.length > 254 || /\s/.test(email)) return false;
      const match = email.match(/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/);
      if (!match) return false;
      const domain = email.slice(email.lastIndexOf('@') + 1);
      if (domain.includes('..') || domain.startsWith('-') || domain.endsWith('-')) return false;
      return true;
    };
    const showSent = () => {
      let overlay = document.querySelector('.send-success');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'send-success';
        overlay.hidden = true;
        overlay.innerHTML = '<div class="send-success__card" role="dialog" aria-modal="true" aria-labelledby="send-success-title"><div class="send-success__mark" aria-hidden="true"></div><h2 id="send-success-title">Správa bola úspešne odoslaná</h2><button type="button" data-close>Zavrieť</button></div>';
        document.body.appendChild(overlay);
        const close = () => {
          overlay.classList.remove('is-open');
          overlay.hidden = true;
        };
        overlay.addEventListener('click', (event) => {
          if (event.target === overlay || event.target.closest('[data-close]')) close();
        });
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && !overlay.hidden) close();
        });
      }
      const mark = overlay.querySelector('.send-success__mark');
      mark.innerHTML = '<span class="send-success__ripple"></span><span class="send-success__ball"><svg viewBox="0 0 48 48" class="send-success__check"><path d="M14 25.2 21.2 32.4 34.5 16.8"/></svg></span>';
      overlay.hidden = false;
      overlay.classList.remove('is-open');
      requestAnimationFrame(() => overlay.classList.add('is-open'));
      overlay.querySelector('[data-close]').focus();
    };
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = form.elements.email.value.trim();
      let status = form.querySelector('.contact-form__status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'contact-form__status';
        status.setAttribute('role', 'status');
        form.querySelector('button[type="submit"]').before(status);
      }
      const show = (message, kind) => {
        status.textContent = message;
        status.classList.toggle('is-error', kind === 'error');
        status.classList.toggle('is-ok', kind === 'ok');
      };
      form.elements.email.setAttribute('aria-invalid', 'false');
      if (!isValidEmail(email)) {
        form.elements.email.setAttribute('aria-invalid', 'true');
        show('E-mail je neplatný.', 'error');
        form.elements.email.focus();
        return;
      }
      const payload = new FormData(form);
      payload.set('email', email);
      payload.append('access_key', '0eb8f328-b1f0-473d-a939-370e901a7ac6');
      payload.append('subject', 'Nová správa z kontaktného formulára Clippio');
      payload.append('from_name', 'Clippio web');
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'Odosielam…';
      show('', '');
      try {
        const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error();
        form.reset();
        show('', '');
        showSent();
      } catch {
        show('Správu sa nepodarilo odoslať. Napíš na info@clippio.sk alebo zavolaj.', 'error');
      } finally {
        submit.disabled = false;
        submit.textContent = 'Mám záujem';
      }
    });
  }

  function extractDriveId(urlOrId) {
    if (!urlOrId) return '';
    const s = String(urlOrId);
    if (/^[a-zA-Z0-9_-]{20,}$/.test(s)) return s;
    let m = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m) return m[1];
    m = s.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (m) return m[1];
    m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (m) return m[1];
    return '';
  }

  const USE_LABELS = {
    '11VwHA_mz_b7rf6sTLUtF7FlD7lCofYSI': 'Produkt · motocykel',
    '1CFbYARp8PkMB1fmOtW3BeX8MDwlbSBxZ': 'Produkt · model',
    '1RtOl18fOR1-oiv4e6v2_BQV5Gk38Hv71': 'Event · reportáž',
    '1X3XziwE0JnXpb9oJ9qUuWmYVwdqLWMYx': 'Event · podujatie',
    '1ebZImowBryIQPXmw3pj6UHE1-grjPANR': 'Produkt · vozidlo',
    '1p9JpoQTbd36j8HMaDYNZ1hPvG9lFrVTg': 'Event · podujatie',
    '1pfScwwjR1vCBJB-RrrHUtRJwYjgti-Cr': 'Produkt · model',
    '1ylVh220WZZcz7XOM7UU6fYwN9Gw2krIS': 'Produkt · vozidlo',
    '18orwPBnYEDFJH4bLb7F0A2Lxpm7BdKfr': 'Prevádzka · záhrada',
    '1JjJHzqjBJx8VkBxW093kCmwCZd8FMhMo': 'Detail · príroda',
    '12EQF1r8iMINQuTHicnoIiig4expeJV-v': 'Atmosféra · príroda'
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '\u0026amp;')
      .replace(/</g, '\u0026lt;')
      .replace(/>/g, '\u0026gt;')
      .replace(/"/g, '\u0026quot;')
      .replace(/'/g, '\u0026#39;');
  }

  function labelFor(item) {
    return USE_LABELS[item.id] || item.title || 'Ukážka práce';
  }

  function driveImageUrls(item) {
    const id = extractDriveId(item.id || item.image || '');
    const urls = [];
    if (id) {
      // lh3 is the most reliable public CDN endpoint
      urls.push('https://lh3.googleusercontent.com/d/' + id + '=w1600');
      urls.push('https://lh3.googleusercontent.com/d/' + id + '=s1600');
      urls.push('https://drive.google.com/thumbnail?id=' + id + '&sz=w1600');
      urls.push('https://drive.google.com/uc?export=view&id=' + id);
    }
    if (item.image && urls.indexOf(item.image) === -1) {
      urls.unshift(item.image);
    }
    return urls;
  }

  function bindImageWithFallback(img, urls) {
    let attempt = 0;
    const tryNext = () => {
      if (attempt >= urls.length) {
        img.classList.add('is-broken');
        img.alt = (img.alt || 'Fotka') + ' (nepodarilo sa načítať)';
        return;
      }
      img.src = urls[attempt++];
    };
    img.addEventListener('error', tryNext);
    img.addEventListener('load', () => {
      img.classList.add('is-loaded');
    });
    tryNext();
  }

  function normalizeItems(raw) {
    return (Array.isArray(raw) ? raw : [])
      .filter((i) => i && (i.image || i.id))
      .map((i) => {
        const id = extractDriveId(i.id || i.image || '');
        const urls = driveImageUrls({ id: id, image: i.image });
        return {
          title: USE_LABELS[id] || i.title || 'Ukážka práce Clippio',
          id: id,
          image: urls[0] || i.image,
          _urls: urls
        };
      });
  }

  async function loadGallery() {
    const target = document.querySelector('.portfolio-gallery-loading, .gallery-empty');
    if (!target) return;
    if (target.getAttribute('data-portfolio-source') === 'youtube' || target.closest('[data-portfolio-source="youtube"]')) return;
    const isHome = !!target.closest('#galeria') || (!!document.getElementById('galeria') && !document.querySelector('.portfolio-page'));
    if (!target.classList.contains('portfolio-gallery-loading') && !isHome) return;
    const portfolioSource = (target.getAttribute('data-portfolio-source') || '').trim();
    try {
      let homeListUrl = '';
      let driveListUrl = '';
      let videoListUrl = '';
      let videoFolderId = '';
      try {
        const cfg = await fetch(assetUrl('data/portfolio-config.json'), { cache: 'no-store' });
        if (cfg.ok) {
          const data = await cfg.json();
          homeListUrl = String(data.homeListUrl || '').trim();
          driveListUrl = String(data.driveListUrl || '').trim();
          videoListUrl = String(data.videoListUrl || '').trim();
          videoFolderId = String(data.videoFolderId || '').trim();
        }
      } catch (e) {}
      const sources = [];
      const fotenieFolder = '1WHV9yLnWAbPvmB_w8Y58e6vrB_2BmtYJ';
      if (portfolioSource === 'fotenie' && driveListUrl) {
        const url = new URL(driveListUrl);
        url.searchParams.set('source', 'portfolio');
        url.searchParams.set('folder', fotenieFolder);
        sources.push(url.toString());
      } else if (portfolioSource === 'video') {
        if (videoListUrl) sources.push(videoListUrl);
        sources.push(assetUrl('data/portfolio-video.json'));
      } else if (isHome && homeListUrl) {
        sources.push(homeListUrl);
        sources.push(assetUrl('data/portfolio-page.json'));
      } else {
        if (driveListUrl) sources.push(driveListUrl);
        sources.push(assetUrl('data/portfolio-page.json'));
      }
      let items = [];
      for (const src of sources) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 8000);
          const response = await fetch(src, { cache: 'no-store', signal: controller.signal });
          clearTimeout(timer);
          if (!response.ok) continue;
          const data = await response.json();
          items = normalizeItems(data.items);
          if (items.length) break;
        } catch (e) {}
      }
      if (!items.length) {
        const folder = portfolioSource === 'video' ? videoFolderId : '';
        const driveHref = folder
          ? 'https://drive.google.com/drive/folders/' + folder
          : 'https://www.youtube.com/@Clippio_sk';
        const driveLabel = folder ? 'Otvoriť ukážky na Google Drive' : 'Pozrieť YouTube';
        target.className = 'gallery-empty';
        target.innerHTML = 'Galériu sa nepodarilo načítať. <a href="' + assetUrl('kontakt/') + '">Napíš mi</a> a pošlem ukážky, alebo <a href="' + driveHref + '" target="_blank" rel="noopener noreferrer">' + driveLabel + '</a>.';
        return;
      }
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
        const img = document.createElement('img');
        img.alt = labelFor(item) || ('Ukážka práce Clippio ' + (index + 1));
        img.loading = 'lazy';
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        img.draggable = false;
        bindImageWithFallback(img, item._urls || [item.image]);
        button.appendChild(img);
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
      const urls = item._urls || driveImageUrls(item);
      dialog.innerHTML = '<button class="portfolio-lightbox__close" type="button">Zavrieť</button>' +
        '<button class="portfolio-lightbox__nav portfolio-lightbox__nav--previous" type="button" aria-label="Predchádzajúci obrázok">‹</button>' +
        '<button class="portfolio-lightbox__nav portfolio-lightbox__nav--next" type="button" aria-label="Nasledujúci obrázok">›</button>' +
        '<div class="portfolio-lightbox__image"><img alt="' + escapeHtml(labelFor(item)) + '" draggable="false" referrerpolicy="no-referrer"></div>' +
        '<p class="portfolio-lightbox__count">' + (index + 1) + ' / ' + items.length + '</p>';
      const lbImg = dialog.querySelector('.portfolio-lightbox__image img');
      if (lbImg) bindImageWithFallback(lbImg, urls);
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
