(function(){
  if(window.__clippiLightHelperLoaded) return;
  window.__clippiLightHelperLoaded = true;

  const config = window.CLIPPIO_CONFIG || {};
  const storageKeys = config.storage || {};
  const stateKey = storageKeys.state || 'clippi_state_v1';
  const sourceLabel = 'Clippi panel';
  const emptyState = {
    view: 'question',
    service: '',
    currentIndex: 0,
    answers: [],
    recommendation: null,
    lastActivity: ''
  };
  let state = clone(emptyState);
  let openedOnce = false;
  let lastFocus = null;
  let root;
  let floatButton;
  let panel;
  let body;
  let footerBack;

  function clone(value){
    return JSON.parse(JSON.stringify(value));
  }

  function ready(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  }

  function escapeHtml(value){
    return String(value || '').replace(/[&<>"']/g, match => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[match]));
  }

  function normalize(value){
    return String(value || '').toLowerCase();
  }

  function hasText(answer, parts){
    const text = normalize(answer);
    return parts.some(part => text.includes(normalize(part)));
  }

  function getQuestions(){
    const service = config.services && config.services[state.service];
    return service ? service.questions || [] : [];
  }

  function serviceLabel(serviceKey){
    const service = config.services && config.services[serviceKey || state.service];
    return service ? service.label : '';
  }

  function currentQuestion(){
    if(!state.service) return config.firstQuestion;
    return getQuestions()[state.currentIndex] || null;
  }

  function answerSummary(){
    return state.answers.map(item => `- ${item.question}: ${item.answer}`).join('\n');
  }

  function saveState(){
    state.lastActivity = new Date().toISOString();
    try{
      localStorage.setItem(stateKey, JSON.stringify(state));
      localStorage.setItem(storageKeys.service || 'clippi_service', serviceLabel() || '');
      localStorage.setItem(storageKeys.goal || 'clippi_goal', goalAnswer() || '');
      localStorage.setItem(storageKeys.budget || 'clippi_budget', budgetAnswer() || '');
      localStorage.setItem(storageKeys.source || 'clippi_source', sourceLabel);
    }catch(error){}
  }

  function loadState(){
    try{
      const saved = JSON.parse(localStorage.getItem(stateKey) || 'null');
      if(!saved || !Array.isArray(saved.answers)) return null;
      return Object.assign(clone(emptyState), saved);
    }catch(error){
      return null;
    }
  }

  function clearState(){
    state = clone(emptyState);
    try{
      localStorage.removeItem(stateKey);
      localStorage.removeItem(storageKeys.service || 'clippi_service');
      localStorage.removeItem(storageKeys.goal || 'clippi_goal');
      localStorage.removeItem(storageKeys.budget || 'clippi_budget');
      localStorage.removeItem(storageKeys.source || 'clippi_source');
    }catch(error){}
  }

  function goalAnswer(){
    const found = state.answers.find(item => /goal|problem|first|result|type|use/.test(item.id || ''));
    return found ? found.answer : (state.answers[0] ? state.answers[0].answer : '');
  }

  function budgetAnswer(){
    const found = state.answers.find(item => /budget/.test(item.id || ''));
    return found ? found.answer : '';
  }

  function setView(view){
    state.view = view;
    saveState();
    render();
  }

  function init(){
    if(!config.firstQuestion || !config.services) return;
    if(document.querySelector('[data-clippi-root]')) return;

    root = document.createElement('div');
    root.className = 'clippi-root';
    root.setAttribute('data-clippi-root', '');
    root.innerHTML = `
      <button class="clippi-float-btn" type="button" aria-label="Poradiť s výberom služby" aria-controls="clippi-panel" aria-expanded="false" data-clippi-open>
        <span class="clippi-float-btn__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false"><path d="M12 3.25c-4.97 0-9 3.2-9 7.15 0 2.22 1.28 4.2 3.29 5.51l-.75 3.12a.75.75 0 0 0 1.08.83l3.36-1.79c.65.11 1.33.17 2.02.17 4.97 0 9-3.2 9-7.15S16.97 3.25 12 3.25Zm-3.2 8.2a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm3.2 0a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm3.2 0a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Z"/></svg>
        </span>
        <span>Poradiť s výberom</span>
      </button>
      <section class="clippi-panel" id="clippi-panel" role="dialog" aria-label="Clippi digitálny konzultant" hidden>
        <header class="clippi-panel__header">
          <div>
            <strong>Clippi</strong>
            <span>Digitálny konzultant Clippia</span>
          </div>
          <button class="clippi-icon-btn" type="button" aria-label="Zavrieť Clippiho" data-clippi-action="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </header>
        <div class="clippi-panel__body" data-clippi-body></div>
        <footer class="clippi-panel__footer">
          <button class="clippi-link-btn" type="button" data-clippi-action="back">Späť</button>
          <button class="clippi-link-btn" type="button" data-clippi-action="reset">Resetovať výber</button>
        </footer>
      </section>
    `;

    document.body.appendChild(root);
    floatButton = root.querySelector('[data-clippi-open]');
    panel = root.querySelector('.clippi-panel');
    body = root.querySelector('[data-clippi-body]');
    footerBack = root.querySelector('[data-clippi-action="back"]');
    document.body.classList.add('clippi-ready');

    floatButton.addEventListener('click', openPanel);
    root.addEventListener('click', handleClick);
    root.addEventListener('submit', handleSubmit);
    document.addEventListener('keydown', event => {
      if(event.key === 'Escape' && panel && !panel.hidden) closePanel();
    });

    render();
  }

  function openPanel(){
    lastFocus = document.activeElement;
    panel.hidden = false;
    document.body.classList.add('clippi-panel-open');
    floatButton.setAttribute('aria-expanded', 'true');

    if(!openedOnce){
      const saved = loadState();
      openedOnce = true;
      if(saved && saved.answers.length){
        state = saved;
        state.view = 'resume';
      }
    }

    render();
    focusPanel();
  }

  function closePanel(){
    panel.hidden = true;
    document.body.classList.remove('clippi-panel-open');
    floatButton.setAttribute('aria-expanded', 'false');
    if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function focusPanel(){
    window.setTimeout(() => {
      const target = panel.querySelector('.clippi-option, .clippi-primary, .clippi-icon-btn, input, textarea, select');
      if(target) target.focus();
    }, 0);
  }

  function handleClick(event){
    const actionEl = event.target.closest('[data-clippi-action]');
    if(!actionEl) return;
    const action = actionEl.getAttribute('data-clippi-action');

    if(action === 'close') closePanel();
    if(action === 'reset' || action === 'start-over') startOver();
    if(action === 'back') goBack();
    if(action === 'answer') chooseAnswer(Number(actionEl.getAttribute('data-option-index')));
    if(action === 'open-form') setView('form');
    if(action === 'quick-web') setView('question');
    if(action === 'webfinder') openWebFinder();
    if(action === 'resume') {
      state.view = state.recommendation ? 'result' : 'question';
      saveState();
      render();
      focusPanel();
    }
    if(action === 'fresh') startOver();
  }

  function chooseAnswer(index){
    const question = currentQuestion();
    if(!question) return;
    const option = question.options[index];
    const label = typeof option === 'string' ? option : option && option.label;
    if(!label) return;

    if(!state.service){
      state.answers = [{ id: question.id, question: question.text, answer: label }];
      state.service = option.service;
      state.currentIndex = 0;
      state.recommendation = null;
      state.view = option.webFinder ? 'web-prompt' : 'question';
      saveState();
      render();
      focusPanel();
      return;
    }

    const active = getQuestions()[state.currentIndex];
    state.answers = state.answers.filter(item => item.id !== active.id);
    state.answers.push({ id: active.id, question: active.text, answer: label });

    if(state.currentIndex < getQuestions().length - 1){
      state.currentIndex += 1;
      state.view = 'question';
    }else{
      state.recommendation = evaluate();
      state.view = 'result';
    }

    saveState();
    render();
    focusPanel();
  }

  function startOver(){
    clearState();
    openedOnce = true;
    render();
    focusPanel();
  }

  function goBack(){
    if(state.view === 'resume'){
      state.view = 'question';
      render();
      return;
    }
    if(state.view === 'form' || state.view === 'success'){
      state.view = state.recommendation ? 'result' : 'question';
      render();
      return;
    }
    if(state.view === 'result'){
      state.view = 'question';
      state.recommendation = null;
      saveState();
      render();
      return;
    }
    if(state.view === 'web-prompt'){
      clearState();
      render();
      return;
    }
    if(state.service && state.currentIndex > 0){
      const previousQuestion = getQuestions()[state.currentIndex - 1];
      state.currentIndex -= 1;
      state.answers = state.answers.filter(item => item.id !== previousQuestion.id);
      saveState();
      render();
      return;
    }
    if(state.service){
      clearState();
      render();
    }
  }

  function openWebFinder(){
    saveState();
    try{
      localStorage.setItem(storageKeys.service || 'clippi_service', 'Webové stránky');
      localStorage.setItem(storageKeys.goal || 'clippi_goal', goalAnswer() || 'Potrebujem web');
      localStorage.setItem(storageKeys.budget || 'clippi_budget', budgetAnswer() || '');
      localStorage.setItem(storageKeys.source || 'clippi_source', sourceLabel);
    }catch(error){}
    window.location.href = config.webFinderUrl || '/web-finder/';
  }

  function render(){
    if(!body) return;
    if(footerBack) footerBack.disabled = !state.service && state.view !== 'resume';

    if(state.view === 'resume') body.innerHTML = renderResume();
    else if(state.view === 'web-prompt') body.innerHTML = renderWebPrompt();
    else if(state.view === 'result') body.innerHTML = renderResult();
    else if(state.view === 'form') body.innerHTML = renderForm();
    else if(state.view === 'success') body.innerHTML = renderSuccess();
    else body.innerHTML = renderQuestion();
  }

  function renderProgress(){
    if(!state.service) return '<div class="clippi-progress"><span>Otázka 1 z 1</span><i><b style="width:100%"></b></i></div>';
    const total = getQuestions().length + 1;
    const current = Math.min(total, state.currentIndex + 2);
    const width = Math.round((current / total) * 100);
    return `<div class="clippi-progress"><span>Otázka ${current} z ${total}</span><i><b style="width:${width}%"></b></i></div>`;
  }

  function renderQuestion(){
    const question = currentQuestion();
    if(!question) return '';
    const intro = !state.service ? `<p class="clippi-intro">${escapeHtml(config.intro || '')}</p>` : '';
    const options = question.options.map((option, index) => {
      const label = typeof option === 'string' ? option : option.label;
      return `<button class="clippi-option" type="button" data-clippi-action="answer" data-option-index="${index}">${escapeHtml(label)}</button>`;
    }).join('');

    return `
      ${renderProgress()}
      ${intro}
      <div class="clippi-question">
        <span>${escapeHtml(serviceLabel() || 'Clippi Light Helper')}</span>
        <h2>${escapeHtml(question.text)}</h2>
      </div>
      <div class="clippi-options">${options}</div>
    `;
  }

  function renderResume(){
    const savedDate = state.lastActivity ? new Date(state.lastActivity).toLocaleString('sk-SK') : '';
    return `
      <div class="clippi-empty">
        <span>Rozpracovaný výber</span>
        <h2>Pokračovať vo výbere?</h2>
        <p>Našli sme uložené odpovede${savedDate ? ` z ${escapeHtml(savedDate)}` : ''}. Môžete pokračovať alebo začať odznova.</p>
        <div class="clippi-actions">
          <button class="clippi-primary" type="button" data-clippi-action="resume">Pokračovať vo výbere</button>
          <button class="clippi-secondary" type="button" data-clippi-action="fresh">Začať odznova</button>
        </div>
      </div>
    `;
  }

  function renderWebPrompt(){
    return `
      ${renderProgress()}
      <div class="clippi-empty">
        <span>Webové stránky</span>
        <h2>Pre web odporúčam Web Finder.</h2>
        <p>Pre výber webu odporúčam spustiť Web Finder. Je presnejší než krátky chat, pretože sa pýta na cieľ, rozpočet, funkcie a rozsah webu.</p>
        <div class="clippi-actions">
          <button class="clippi-primary" type="button" data-clippi-action="webfinder">Spustiť Web Finder</button>
          <button class="clippi-secondary" type="button" data-clippi-action="quick-web">Chcem len rýchle odporúčanie</button>
        </div>
      </div>
    `;
  }

  function renderResult(){
    const rec = state.recommendation || evaluate();
    const webFinderButton = rec.webFinder ? '<button class="clippi-secondary" type="button" data-clippi-action="webfinder">Spustiť Web Finder</button>' : '';
    return `
      <div class="clippi-result-card">
        <span class="clippi-eyebrow">Odporúčané riešenie</span>
        <h2>${escapeHtml(rec.title)}</h2>
        <p class="clippi-result-intro">${escapeHtml(rec.intro)}</p>
        <dl>
          <div><dt>Prečo</dt><dd>${escapeHtml(rec.why)} ${escapeHtml(rec.suitable || '')}</dd></div>
          <div><dt>Orientačný odhad</dt><dd>${escapeHtml(rec.price)}${rec.priceNote ? `<small>${escapeHtml(rec.priceNote)}</small>` : ''}</dd></div>
          <div><dt>Ďalší krok</dt><dd>${escapeHtml(rec.next)}</dd></div>
        </dl>
        ${rec.warning ? `<p class="clippi-warning">${escapeHtml(rec.warning)}</p>` : ''}
      </div>
      <div class="clippi-actions">
        <button class="clippi-primary" type="button" data-clippi-action="open-form">Poslať nezáväzný dopyt</button>
        ${webFinderButton}
        <button class="clippi-secondary" type="button" data-clippi-action="start-over">Začať odznova</button>
      </div>
    `;
  }

  function renderForm(){
    const rec = state.recommendation || evaluate();
    return `
      <div class="clippi-form-head">
        <span>Dopyt cez Clippiho</span>
        <h2>Poslať nezáväzný dopyt</h2>
        <p>Odporúčanie: <strong>${escapeHtml(rec.title)}</strong> · ${escapeHtml(rec.price)}</p>
      </div>
      <form class="clippi-lead-form" data-clippi-form>
        <label>Meno<input name="Meno" autocomplete="name" required></label>
        <label>E-mail alebo telefón<input name="Kontakt" autocomplete="email" required></label>
        <label>Krátky popis projektu<textarea name="Kratky popis projektu" required placeholder="Čo potrebujete vyriešiť?"></textarea></label>
        <label>Firma<input name="Firma" autocomplete="organization"></label>
        <label>Lokalita<input name="Lokalita" autocomplete="address-level2"></label>
        <label>Termín<input name="Termin"></label>
        <label>Rozpočet<input name="Rozpocet" value="${escapeHtml(budgetAnswer())}"></label>
        <label>Web / sociálne siete<input name="Web alebo socialne siete" placeholder="https://"></label>
        <label>Poznámka<textarea name="Poznamka" placeholder="Doplňujúce informácie"></textarea></label>
        <div class="clippi-form-message" role="status" aria-live="polite"></div>
        <button class="clippi-primary clippi-submit" type="submit">Odoslať dopyt</button>
      </form>
    `;
  }

  function renderSuccess(){
    return `
      <div class="clippi-success">
        <span aria-hidden="true">✓</span>
        <h2>Dopyt bol odoslaný.</h2>
        <p>Ďakujeme. Ozveme sa vám čo najskôr s návrhom ďalšieho postupu. Ak ste pridali dostatok informácií, odpoveď bude presnejšia a rýchlejšia.</p>
        <button class="clippi-secondary" type="button" data-clippi-action="start-over">Začať odznova</button>
      </div>
    `;
  }

  function evaluate(){
    const recs = config.recommendations || {};
    const scores = {
      webStart: 0,
      webRast: 0,
      webPredaj: 0,
      promoVideo: 0,
      reels: 0,
      eventVideo: 0,
      corporatePhoto: 0,
      productPhoto: 0,
      eventPhoto: 0,
      drone: 0,
      graphic: 0,
      comboWebPhoto: 0,
      comboEvent: 0,
      unknown: 0
    };

    const base = {
      web: ['webStart', 'webRast'],
      video: ['promoVideo'],
      photo: ['corporatePhoto'],
      drone: ['drone'],
      graphics: ['graphic'],
      combo: ['comboWebPhoto'],
      unknown: ['unknown']
    };
    (base[state.service] || ['unknown']).forEach(key => { scores[key] += 2; });

    state.answers.forEach(item => scoreAnswer(item, scores));

    let key = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0] || 'unknown';
    if(state.service === 'drone') key = 'drone';
    if(state.service === 'graphics') key = 'graphic';
    if(state.service === 'web' && !/^web/.test(key)) key = 'webRast';
    if(state.service === 'video' && !['promoVideo', 'reels', 'eventVideo'].includes(key)) key = 'promoVideo';
    if(state.service === 'photo' && !['corporatePhoto', 'productPhoto', 'eventPhoto'].includes(key)) key = 'corporatePhoto';
    if(state.service === 'combo' && !['comboWebPhoto', 'comboEvent', 'webRast', 'corporatePhoto', 'reels'].includes(key)) key = 'comboWebPhoto';
    if(state.service === 'unknown' && scores.webRast > scores.unknown + 1) key = 'webRast';
    if(state.service === 'unknown' && scores.comboEvent > scores.webRast && scores.comboEvent > scores.unknown) key = 'comboEvent';

    const result = Object.assign({ key }, recs[key] || recs.unknown);
    state.recommendation = result;
    saveState();
    return result;
  }

  function scoreAnswer(item, scores){
    const answer = item.answer || '';

    if(hasText(answer, ['nie, web ešte nemám', 'len základné informácie', 'predstaviť firmu', 'do 200', '200 – 500', 'pôsobiť profesionálnejšie'])){
      scores.webStart += 3;
    }
    if(hasText(answer, ['získavať dopyty', 'viac sekcií', 'podstránok', 'referencie', 'služby', '500 – 1000', '1000', 'zastaraný', 'nefunguje', 'lepšiť prvý dojem'])){
      scores.webRast += 3;
    }
    if(hasText(answer, ['predávať produkty', 'produkty alebo katalóg', 'predaj služieb', 'predaj', 'katalóg', 'objednávka'])){
      scores.webPredaj += 4;
    }
    if(hasText(answer, ['nemám skoro nič', 'chýba', 'fotky na web', 'kvalitné fotky'])){
      scores.comboWebPhoto += 2;
      scores.corporatePhoto += 2;
    }

    if(hasText(answer, ['promo video', 'firemné video', 'produktové video', 'web', 'reklama', 'prezentácia firmy'])){
      scores.promoVideo += 3;
    }
    if(hasText(answer, ['sociálne siete', 'instagram', 'tiktok', 'shorts', 'facebook', 'do 30 sekúnd', '30 – 60 sekúnd', 'reels'])){
      scores.reels += 4;
    }
    if(hasText(answer, ['video z akcie', 'akciu', 'na akcii', 'dlhší záznam', 'propagáciu akcie', 'konkrétnej akcie'])){
      scores.eventVideo += 4;
      scores.eventPhoto += 3;
      scores.comboEvent += 4;
    }

    if(hasText(answer, ['firmu alebo priestory', 'tím', 'ľudí', 'u nás vo firme', 'interné použitie'])){
      scores.corporatePhoto += 3;
    }
    if(hasText(answer, ['produkty', 'produktové'])){
      scores.productPhoto += 4;
    }
    if(hasText(answer, ['veľa fotiek z celej akcie'])){
      scores.eventPhoto += 4;
    }

    if(hasText(answer, ['dron', 'budovu', 'nehnuteľnosť', 'stavbu', 'krajinu', 'zábery do promo videa', 'surové zábery', 'krátky zostrih'])){
      scores.drone += 4;
    }

    if(hasText(answer, ['plagát', 'leták', 'vizitka', 'banner', 'logo', 'tlač', 'online', 'na akciu'])){
      scores.graphic += 4;
    }

    if(hasText(answer, ['ľudia o mne nevedia', 'google', 'spúšťam novú službu', 'moderný web', 'chcem viac dopytov'])){
      scores.webRast += 2;
      scores.unknown += 1;
    }
    if(hasText(answer, ['web alebo profil pôsobí slabo', 'nemám dobrý obsah', 'lepší prvý dojem', 'vyzerať profesionálnejšie'])){
      scores.corporatePhoto += 2;
      scores.promoVideo += 1;
      scores.webRast += 1;
    }
  }

  async function handleSubmit(event){
    const form = event.target.closest('[data-clippi-form]');
    if(!form) return;
    event.preventDefault();

    if(typeof form.reportValidity === 'function' && !form.reportValidity()) return;

    const message = form.querySelector('.clippi-form-message');
    const button = form.querySelector('.clippi-submit');
    const originalText = button ? button.textContent : '';
    const endpoint = config.web3Forms && config.web3Forms.endpoint;
    const accessKey = config.web3Forms && config.web3Forms.accessKey;

    if(!endpoint || !accessKey || accessKey.includes('SEM_VLOZ')){
      if(message){
        message.className = 'clippi-form-message is-error';
        message.textContent = 'Odosielanie nie je nastavené. Treba doplniť Web3Forms endpoint v clippi-config.js.';
      }
      return;
    }

    if(button){
      button.disabled = true;
      button.textContent = 'Odosielam...';
    }
    if(message){
      message.className = 'clippi-form-message';
      message.textContent = '';
    }

    try{
      const data = buildFormData(form);
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      let result = {};
      try{ result = await response.json(); }catch(error){}
      if(!response.ok || result.success === false) throw new Error(result.message || 'Formulár sa nepodarilo odoslať.');
      clearState();
      state.view = 'success';
      render();
      focusPanel();
    }catch(error){
      if(message){
        message.className = 'clippi-form-message is-error';
        message.innerHTML = 'Dopyt sa nepodarilo odoslať. Skúste to znova alebo napíšte priamo na <a href="mailto:info@clippio.sk">info@clippio.sk</a>.';
      }
    }finally{
      if(button){
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  }

  function buildFormData(form){
    const formData = new FormData(form);
    const rec = state.recommendation || evaluate();
    const now = new Date();
    const page = window.location.href;
    const message = [
      'Nový dopyt cez Clippiho',
      '',
      `Meno: ${formData.get('Meno') || ''}`,
      `Kontakt: ${formData.get('Kontakt') || ''}`,
      `Firma: ${formData.get('Firma') || ''}`,
      `Lokalita: ${formData.get('Lokalita') || ''}`,
      '',
      `Typ služby: ${rec.service || serviceLabel()}`,
      `Odporúčanie Clippiho: ${rec.title}`,
      `Cenová kategória: ${rec.price}`,
      `Termín: ${formData.get('Termin') || ''}`,
      '',
      'Zhrnutie odpovedí:',
      `- Vybraná služba: ${serviceLabel()}`,
      `- Hlavný cieľ: ${goalAnswer()}`,
      `- Podklady: ${materialsAnswer()}`,
      `- Rozpočet: ${formData.get('Rozpocet') || budgetAnswer()}`,
      `- Poznámka: ${formData.get('Poznamka') || ''}`,
      '',
      answerSummary(),
      '',
      `Krátky popis projektu: ${formData.get('Kratky popis projektu') || ''}`,
      `Web / sociálne siete: ${formData.get('Web alebo socialne siete') || ''}`,
      '',
      `Stránka, z ktorej prišiel: ${page}`,
      `Dátum a čas: ${now.toLocaleString('sk-SK')}`
    ].join('\n');

    formData.append('access_key', config.web3Forms.accessKey);
    formData.append('subject', config.web3Forms.subject || 'Nový dopyt cez Clippiho');
    formData.append('from_name', 'Clippi Light Helper');
    formData.append('Typ služby', rec.service || serviceLabel());
    formData.append('Odporúčanie Clippiho', rec.title);
    formData.append('Cenová kategória', rec.price);
    formData.append('Odpovede používateľa', answerSummary());
    formData.append('Stránka', page);
    formData.append('Dátum a čas', now.toISOString());
    formData.append('message', message);
    return formData;
  }

  function materialsAnswer(){
    const found = state.answers.find(item => /assets|content|ready/.test(item.id || ''));
    return found ? found.answer : '';
  }

  ready(init);
})();
