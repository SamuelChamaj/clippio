// Clippio – oznamy (Etapa 2)
(async function() {
  const page = location.pathname.replace(/\/$/, '') || '/';
  const pageKey = page === '/' || page.endsWith('/index.html') ? 'index' :
                  page.includes('/videa') ? 'videa' :
                  page.includes('/portfolio') ? 'portfolio' :
                  page.includes('/kontakt') ? 'kontakt' : 'other';

  let items = [];
  try {
    const res = await fetch((document.querySelector('base')?.href || '/') + 'data/announcements.json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      items = data.items || [];
    }
  } catch(e) {}

  const relevant = items.filter(a => a.where === 'all' || a.where === pageKey);
  if (!relevant.length) return;

  const dismissed = JSON.parse(localStorage.getItem('clippio-dismissed') || '[]');

  relevant.forEach(a => {
    if (dismissed.includes(a.id)) return;
    const el = document.createElement('div');
    el.className = 'clippio-ann';
    el.dataset.pos = a.position;
    el.dataset.variant = a.variant;
    const icons = { success: '✓', info: 'ℹ', warning: '⚠', error: '⛔' };
    const isModal = a.position === 'center-modal';
    el.innerHTML = `
      <div class="clippio-ann__inner">
        <span class="clippio-ann__icon">${icons[a.variant] || 'ℹ'}</span>
        <div class="clippio-ann__text">
          <strong>${a.title || ''}</strong>
          <span>${a.body || ''}</span>
        </div>
        <button class="clippio-ann__close" aria-label="Zavrieť">×</button>
      </div>
    `;
    el.querySelector('.clippio-ann__close').onclick = () => {
      el.remove();
      dismissed.push(a.id);
      localStorage.setItem('clippio-dismissed', JSON.stringify(dismissed));
      if (isModal) document.body.classList.remove('clippio-modal-open');
    };
    document.body.appendChild(el);
    if (isModal) document.body.classList.add('clippio-modal-open');
  });
})();
