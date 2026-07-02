'use strict';

(function () {
  const base = document.body?.dataset?.base || '';
  const categories = window.LioraCategories || [];
  let selectedCategory = 'Všetko';
  let selectedSort = 'default';

  function showToast(message) {
    const toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2300);
  }

  window.LioraUI = { showToast };

  function productHref(productId) {
    return `${base}produkt/?id=${encodeURIComponent(productId)}`;
  }

  function productCard(product) {
    return `<article class="product-card reveal">
      <a class="product-image" href="${productHref(product.id)}" aria-label="Detail produktu ${product.name}">
        <img src="${window.LioraCart.assetPath(product.image)}" alt="${product.alt}" width="640" height="640" loading="lazy">
        ${product.badge ? `<span>${product.badge}</span>` : ''}
      </a>
      <div class="product-card-body">
        <p class="product-category">${product.category}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="product-card-bottom">
          <strong>${product.priceLabel}</strong>
          <div>
            <button class="btn small btn-primary" type="button" data-add-to-cart="${product.id}">Pridať do košíka</button>
            <a class="btn small btn-ghost" href="${productHref(product.id)}">Detail</a>
          </div>
        </div>
      </div>
    </article>`;
  }

  function sortProducts(products) {
    const list = [...products];
    if (selectedSort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (selectedSort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }

  function filteredProducts() {
    const products = window.LioraProducts || [];
    let list = products;
    if (selectedCategory === 'Skladom ihneď') {
      list = products.filter((product) => !product.isCustom);
    } else if (selectedCategory !== 'Všetko') {
      list = products.filter((product) => product.category === selectedCategory);
    }
    return sortProducts(list);
  }

  function renderFeaturedProducts() {
    const node = document.querySelector('[data-featured-products]');
    if (!node) return;
    const wanted = ['satenova-kytica-classic', 'kytica-jemada-pink', 'ruze-v-elegantnom-boxe', 'luxusna-kytica-na-vyrocie'];
    node.innerHTML = wanted
      .map((id) => window.LioraCart.findProduct(id))
      .filter(Boolean)
      .map(productCard)
      .join('');
  }

  function renderCategoryFilters() {
    const node = document.querySelector('[data-category-filters]');
    if (!node) return;
    node.innerHTML = categories.map((category) => `<button type="button" class="chip${category === selectedCategory ? ' is-active' : ''}" data-category="${category}">${category}</button>`).join('');
  }

  function renderProductGrid() {
    const node = document.querySelector('[data-product-grid]');
    if (!node) return;
    const products = filteredProducts();
    node.innerHTML = products.length ? products.map(productCard).join('') : '<div class="empty-state"><h2>Nenašli sa žiadne produkty.</h2><p>Skúste inú kategóriu.</p></div>';
  }

  function renderCatalog() {
    renderCategoryFilters();
    renderProductGrid();
    observeReveals();
  }

  function renderProductDetail() {
    const node = document.querySelector('[data-product-detail]');
    if (!node) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'satenova-kytica-classic';
    const product = window.LioraCart.findProduct(id) || window.LioraCart.findProduct('satenova-kytica-classic');
    if (!product) return;

    document.title = `${product.name} | Saténové ruže Liora`;
    const similar = (window.LioraProducts || []).filter((item) => item.id !== product.id).slice(0, 3);

    node.innerHTML = `<div class="product-detail reveal">
      <div class="product-detail-media">
        <img src="${window.LioraCart.assetPath(product.image)}" alt="${product.alt}" width="900" height="900">
      </div>
      <div class="product-detail-copy">
        <p class="eyebrow">${product.category}</p>
        <h1>${product.name}</h1>
        <p class="detail-price">${product.priceLabel}</p>
        <p class="lead">${product.id === 'satenova-kytica-classic' ? 'Ručne vyrábaná saténová kytica s elegantným vzhľadom, vhodná ako darček na narodeniny, výročie, Valentín, Deň matiek alebo ako poďakovanie.' : product.description}</p>
        <div class="detail-controls">
          <label>Množstvo<input type="number" min="1" value="1" data-detail-quantity></label>
          <label>Farba<select data-detail-color>
            <option>ružová</option>
            <option>červená</option>
            <option>biela</option>
            <option>bordová</option>
            <option>pastelová kombinácia</option>
            <option>podľa dohody</option>
          </select></label>
        </div>
        <div class="detail-actions">
          <button class="btn btn-primary" type="button" data-add-to-cart="${product.id}">Pridať do košíka</button>
          <a class="btn btn-secondary" href="${base}kosik/">Pokračovať do košíka</a>
        </div>
        <ul class="check-list">
          <li>Ručná výroba zo saténu</li>
          <li>Odporúčané príležitosti: ${product.occasions.join(', ')}</li>
          <li>Farby sa potvrdzujú podľa dostupnosti materiálu</li>
        </ul>
        <p class="demo-note">Každá objednávka sa potvrdzuje individuálne podľa dostupnosti farieb a termínu výroby.</p>
        <div class="faq-list compact" data-faq>
          <article class="faq-item"><button type="button" aria-expanded="false">Dá sa upraviť farebná kombinácia?</button><div><p>Áno, pri objednávke môžete doplniť poznámku a farby sa doladia podľa dostupnosti.</p></div></article>
          <article class="faq-item"><button type="button" aria-expanded="false">Je cena finálna?</button><div><p>Pri hotových produktoch je cena pevná. Pri produktoch na mieru je cena orientačná od uvedenej sumy.</p></div></article>
        </div>
      </div>
    </div>`;

    const relatedNode = document.querySelector('[data-related-products]');
    if (relatedNode) relatedNode.innerHTML = similar.map(productCard).join('');
  }

  function setupMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-site-nav]');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    nav.addEventListener('click', (event) => {
      if (!event.target.closest('a')) return;
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  }

  function setupFaq() {
    document.querySelectorAll('[data-faq]').forEach((list) => {
      list.addEventListener('click', (event) => {
        const button = event.target.closest('.faq-item > button');
        if (!button) return;
        const item = button.parentElement;
        const open = item.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(open));
      });
    });
  }

  function setupForms() {
    const contact = document.querySelector('[data-contact-form]');
    if (contact) {
      contact.addEventListener('submit', (event) => {
        event.preventDefault();
        contact.reset();
        const status = document.querySelector('[data-contact-status]');
        if (status) status.textContent = 'Ďakujeme. Toto je ukážkový formulár, správa nebola reálne odoslaná.';
        showToast('Demo správa bola pripravená.');
      });
    }

    const order = document.querySelector('[data-order-form]');
    if (order) {
      order.addEventListener('submit', (event) => {
        event.preventDefault();
        const box = document.querySelector('[data-order-confirmation]');
        if (!box) return;
        box.hidden = false;
        box.innerHTML = `<h2>Ďakujeme. Toto je ukážkový web, objednávka nebola reálne odoslaná.</h2><p>Demo objednávka č. <strong>LR-2026-001</strong></p><a class="btn btn-primary" href="../kolekcie/">Pokračovať späť do kolekcií</a>`;
        localStorage.removeItem('ruzickyLioraCart');
        window.LioraCart.updateCartCount();
        window.LioraCart.renderOrderSummary();
        order.reset();
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  function observeReveals() {
    const reveals = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    reveals.forEach((node) => observer.observe(node));
  }

  document.addEventListener('click', (event) => {
    const categoryButton = event.target.closest('[data-category]');
    if (categoryButton) {
      selectedCategory = categoryButton.getAttribute('data-category');
      renderCatalog();
    }
  });

  document.addEventListener('change', (event) => {
    const sort = event.target.closest('[data-sort-products]');
    if (sort) {
      selectedSort = sort.value;
      renderProductGrid();
      observeReveals();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    renderFeaturedProducts();
    renderCatalog();
    renderProductDetail();
    window.LioraCart.renderCart();
    window.LioraCart.renderOrderSummary();
    window.LioraCart.updateCartCount();
    setupFaq();
    setupForms();
    observeReveals();
  });
})();
