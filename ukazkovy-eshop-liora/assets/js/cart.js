'use strict';

(function () {
  const CART_KEY = 'ruzickyLioraCart';

  function getBasePath() {
    return document.body?.dataset?.base || '';
  }

  function assetPath(path) {
    if (!path) return '';
    if (/^https?:\/\//.test(path)) return path;
    return getBasePath() + path;
  }

  function findProduct(productId) {
    return (window.LioraProducts || []).find((product) => product.id === productId);
  }

  function getCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function getLineId(productId, options = {}) {
    const color = options.color || 'podľa dohody';
    return `${productId}__${color.toLowerCase().trim().replace(/\s+/g, '-')}`;
  }

  function addToCart(productId, options = {}) {
    const product = findProduct(productId);
    if (!product) return;

    const quantity = Math.max(1, Number(options.quantity || 1));
    const color = options.color || 'podľa dohody';
    const lineId = getLineId(productId, { color });
    const cart = getCart();
    const existing = cart.find((item) => item.lineId === lineId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        lineId,
        productId,
        quantity,
        color,
        addedAt: new Date().toISOString()
      });
    }

    saveCart(cart);
    window.LioraUI?.showToast?.('Produkt bol pridaný do košíka.');
  }

  function removeFromCart(lineId) {
    saveCart(getCart().filter((item) => item.lineId !== lineId));
    renderCart();
    renderOrderSummary();
  }

  function updateQuantity(lineId, quantity) {
    const nextQuantity = Number(quantity);
    const cart = getCart();
    const item = cart.find((cartItem) => cartItem.lineId === lineId);
    if (!item) return;

    if (nextQuantity <= 0) {
      removeFromCart(lineId);
      return;
    }

    item.quantity = Math.min(99, nextQuantity);
    saveCart(cart);
    renderCart();
    renderOrderSummary();
  }

  function calculateSubtotal() {
    return getCart().reduce((sum, item) => {
      const product = findProduct(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  function calculateTotal() {
    return calculateSubtotal();
  }

  function formatPrice(value) {
    return `${Number(value).toLocaleString('sk-SK', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;
  }

  function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[data-cart-count]').forEach((node) => {
      node.textContent = count;
      node.setAttribute('aria-label', `${count} produktov v košíku`);
    });
  }

  function cartItemTemplate(item) {
    const product = findProduct(item.productId);
    if (!product) return '';
    const itemTotal = product.price * item.quantity;
    return `<article class="cart-item" data-line-id="${item.lineId}">
      <img src="${assetPath(product.image)}" alt="${product.alt}" width="180" height="180">
      <div class="cart-item-copy">
        <h2>${product.name}</h2>
        <p>${product.priceLabel} · Farba: ${item.color}</p>
        <div class="quantity-control" aria-label="Množstvo produktu ${product.name}">
          <button type="button" data-quantity-minus="${item.lineId}" aria-label="Znížiť množstvo">−</button>
          <input type="number" min="1" max="99" value="${item.quantity}" data-quantity-input="${item.lineId}" aria-label="Množstvo">
          <button type="button" data-quantity-plus="${item.lineId}" aria-label="Zvýšiť množstvo">+</button>
        </div>
      </div>
      <div class="cart-item-side">
        <strong>${formatPrice(itemTotal)}</strong>
        <button type="button" class="link-button" data-remove-item="${item.lineId}">Odstrániť</button>
      </div>
    </article>`;
  }

  function renderCart() {
    const itemsNode = document.querySelector('[data-cart-items]');
    const summaryNode = document.querySelector('[data-cart-summary]');
    if (!itemsNode || !summaryNode) return;

    const cart = getCart();
    if (!cart.length) {
      itemsNode.innerHTML = `<div class="empty-state"><h2>Váš košík je zatiaľ prázdny.</h2><p>Vyberte si kyticu, box alebo malý darček v kolekciách.</p><a class="btn btn-primary" href="../kolekcie/">Späť do kolekcií</a></div>`;
      summaryNode.innerHTML = `<h2>Súhrn</h2><p>Žiadne produkty v košíku.</p>`;
      return;
    }

    itemsNode.innerHTML = cart.map(cartItemTemplate).join('');
    const subtotal = calculateSubtotal();
    summaryNode.innerHTML = `<h2>Súhrn</h2>
      <dl class="price-summary">
        <div><dt>Medzisúčet</dt><dd>${formatPrice(subtotal)}</dd></div>
        <div><dt>Doprava / osobný odber</dt><dd>podľa dohody</dd></div>
        <div class="total"><dt>Celkom orientačne</dt><dd>${formatPrice(calculateTotal())}</dd></div>
      </dl>
      <p class="summary-note">Každá objednávka sa potvrdzuje individuálne podľa dostupnosti farieb a termínu výroby.</p>
      <a class="btn btn-primary full" href="../objednavka/">Pokračovať k objednávke</a>`;
  }

  function renderOrderSummary() {
    const node = document.querySelector('[data-order-summary]');
    if (!node) return;
    const cart = getCart();

    if (!cart.length) {
      node.innerHTML = `<h2>Súhrn objednávky</h2><p>Košík je prázdny.</p><a class="btn btn-secondary full" href="../kolekcie/">Vybrať produkty</a>`;
      return;
    }

    const items = cart.map((item) => {
      const product = findProduct(item.productId);
      if (!product) return '';
      return `<li><span>${product.name}<small>${item.quantity}× · ${item.color}</small></span><strong>${formatPrice(product.price * item.quantity)}</strong></li>`;
    }).join('');

    node.innerHTML = `<h2>Súhrn objednávky</h2>
      <ul class="order-items">${items}</ul>
      <dl class="price-summary">
        <div><dt>Medzisúčet</dt><dd>${formatPrice(calculateSubtotal())}</dd></div>
        <div><dt>Doprava / osobný odber</dt><dd>podľa dohody</dd></div>
        <div class="total"><dt>Celkom orientačne</dt><dd>${formatPrice(calculateTotal())}</dd></div>
      </dl>`;
  }

  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add-to-cart]');
    if (addButton) {
      const productId = addButton.getAttribute('data-add-to-cart');
      const form = addButton.closest('[data-product-detail]');
      const quantity = form?.querySelector('[data-detail-quantity]')?.value || 1;
      const color = form?.querySelector('[data-detail-color]')?.value || addButton.getAttribute('data-color') || 'podľa dohody';
      addToCart(productId, { quantity, color });
    }

    const minus = event.target.closest('[data-quantity-minus]');
    if (minus) {
      const lineId = minus.getAttribute('data-quantity-minus');
      const item = getCart().find((cartItem) => cartItem.lineId === lineId);
      if (item) updateQuantity(lineId, item.quantity - 1);
    }

    const plus = event.target.closest('[data-quantity-plus]');
    if (plus) {
      const lineId = plus.getAttribute('data-quantity-plus');
      const item = getCart().find((cartItem) => cartItem.lineId === lineId);
      if (item) updateQuantity(lineId, item.quantity + 1);
    }

    const remove = event.target.closest('[data-remove-item]');
    if (remove) removeFromCart(remove.getAttribute('data-remove-item'));
  });

  document.addEventListener('change', (event) => {
    const input = event.target.closest('[data-quantity-input]');
    if (input) updateQuantity(input.getAttribute('data-quantity-input'), input.value);
  });

  window.LioraCart = {
    addToCart,
    removeFromCart,
    updateQuantity,
    getCart,
    saveCart,
    renderCart,
    calculateSubtotal,
    calculateTotal,
    updateCartCount,
    renderOrderSummary,
    formatPrice,
    assetPath,
    findProduct
  };
})();
