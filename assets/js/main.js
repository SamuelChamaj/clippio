// Clippio v6.5.4 – Alerts + availability + Web Finder advisor with price estimate
// Stabilná verzia: navbar a footer sú priamo v HTML, aby web fungoval aj po otvorení cez file://.

function escapeHtml(v){
  return String(v||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function parseCsvLine(line){
  let a=[],c='',q=false;
  for(let i=0;i<line.length;i++){
    let ch=line[i],n=line[i+1];
    if(ch==='"'&&q&&n==='"'){c+='"';i++}
    else if(ch==='"')q=!q;
    else if(ch===','&&!q){a.push(c.trim());c=''}
    else c+=ch;
  }
  a.push(c.trim());
  return a;
}

function initNavigation(){
  const burger=document.querySelector('.burger');
  const links=document.querySelector('.links');
  if(burger&&links){
    burger.addEventListener('click',()=>{
      const open=!links.classList.contains('open');
      links.classList.toggle('open',open);
      burger.setAttribute('aria-expanded',String(open));
      burger.classList.toggle('is-open',open);
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      links.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
      burger.classList.remove('is-open');
    }));
  }
  const parts=location.pathname.split('/').filter(Boolean);
  let file=(parts[parts.length-1]||'index').replace('.html','');
  if(file==='index' && parts.length>1) file=parts[parts.length-2];
  const servicePages=['tvorba-videi','video-z-akcie','fotenie-akcii-skol','dronove-zabery','grafika','svadobne-video'];
  const active=file==='web-finder'?'weby':(servicePages.includes(file)?'sluzby':file);
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.dataset.nav===active) a.classList.add('active');
  });
}

function initUpdates(){
  const box=document.getElementById('updates-list');
  if(!box) return;
  const url='https://docs.google.com/spreadsheets/d/1SaqFBIfwYhrTbSzLGQW-mK2BPK2dgUZR9QolSdxKot4/gviz/tq?tqx=out:csv';
  const fallback=[
    {date:'11.06.2026',title:'Nový web Clippio',text:'Spustená nová prezentácia služieb, portfólia a kontaktného dopytu.'},
    {date:'10.06.2026',title:'Dronové zábery a eventy',text:'Pribúdajú ukážky z podujatí, miest a krátkych promo videí.'},
    {date:'09.06.2026',title:'Grafika a video pod jednou značkou',text:'Clippio spája videoprodukciu, dron a vizuálnu identitu.'}
  ];
  const render=items=>{
    box.innerHTML=items.filter(x=>x.title||x.text).slice(0,5).map(x=>`<article class="update-card"><div class="update-date">${escapeHtml(x.date||'Novinka')}</div><div><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.text)}</p></div></article>`).join('')||'<p>Žiadne novinky.</p>';
  };
  fetch(url).then(r=>{if(!r.ok)throw Error();return r.text()}).then(t=>{
    const rows=t.trim().split(/\r?\n/).slice(1).map(parseCsvLine);
    render(rows.map(c=>({date:c[0],title:c[2]||c[1],text:c[3]||c[2]})).reverse());
  }).catch(()=>render(fallback));
}

function initPhotoPrices(){
  const rowsBox=document.getElementById('photo-price-rows');
  const status=document.getElementById('price-status');
  if(!rowsBox) return;
  const url='https://docs.google.com/spreadsheets/d/1Un2kgEMQ2jxUuFsdzAhXkSab8Z0hJ41qsATHA6Ojdig/gviz/tq?tqx=out:csv';
  fetch(url).then(r=>{if(!r.ok)throw Error();return r.text()}).then(t=>{
    const lines=t.trim().split(/\r?\n/).filter(Boolean);
    const data=lines.slice(1).map(parseCsvLine).filter(c=>c[0]&&c[1]);
    if(!data.length) throw Error();
    rowsBox.innerHTML=data.map(c=>`<tr><td>${escapeHtml(c[0])}</td><td>${escapeHtml(c[1])}</td><td>${escapeHtml(c[2]||'')}</td></tr>`).join('');
    if(status) status.textContent='Aktuálne ceny vytlačených fotiek.';
  }).catch(()=>{ if(status) status.textContent='Zobrazujem základné ceny vytlačených fotiek.'; });
}

function initWebProjects(){
  const section=document.getElementById('hotove-weby');
  const box=document.getElementById('web-projects-list');
  if(!section||!box) return;
  const url=(section.getAttribute('data-sheet-url')||'').trim();
  const fallback=[
    {nazov:'RCHbau',url:'https://rchbau.sk',popis:'Firemná prezentácia pre stavebné služby, sadrokartón a maľovanie.',zadanie:'Jednoduchý a dôveryhodný web s prehľadom služieb, kontaktom a technickou prípravou pre vyhľadávače.'},
    {nazov:'Clippio',url:'https://www.clippio.sk',popis:'Vlastný web značky Clippio a živá ukážka štýlu tvorby webov.',zadanie:'Moderná prezentácia služieb, portfólia, cenníka, kontaktu a technickej SEO prípravy.'}
  ];
  const safeUrl=v=>{try{const u=new URL(String(v||''));return /^https?:$/.test(u.protocol)?u.href:'#'}catch(e){return '#'}};
  const render=items=>{
    const clean=items.filter(x=>x.url||x.nazov||x.popis).slice(0,12);
    box.innerHTML=clean.map(x=>{
      const href=safeUrl(x.url);
      const title=x.nazov||x.url||'Hotový web';
      const low=(String(title)+' '+String(x.url||'')).toLowerCase();
      const label=low.includes('clippio')?'Vlastný projekt':(low.includes('rchbau')?'Web pre klienta':'Hotový web');
      return `<article class="web-project-card"><span class="project-label">${escapeHtml(label)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(x.popis||'Ukážka hotového webu.')}</p>${x.zadanie?`<small>${escapeHtml(x.zadanie)}</small>`:''}<a class="mini-btn" href="${href}" target="_blank" rel="noopener">Navštíviť web</a></article>`;
    }).join('')||'<p>Portfólio webov bude doplnené.</p>';
  };
  if(!url || url.includes('SEM_VLOZ')){ render(fallback); return; }
  fetch(url).then(r=>{if(!r.ok)throw Error();return r.text()}).then(t=>{
    const rows=t.trim().split(/\r?\n/).filter(Boolean).slice(1).map(parseCsvLine);
    render(rows.map(c=>({nazov:c[0],url:c[1],popis:c[2],zadanie:c[3]})));
  }).catch(()=>render(fallback));
}


function isTruthyAlertValue(value){
  return ['true','prawda','pravda','1','yes','ano','áno','on'].includes(String(value||'').trim().toLowerCase());
}

function normalizeAlertKey(value){
  return String(value||'')
    .trim()
    .toLowerCase()
    .replace(/\s+/g,'')
    .replace(/[._-]+/g,'');
}

function parseAlertDate(value,endOfDay){
  const raw=String(value||'').trim();
  if(!raw) return null;
  let y,m,d;
  const iso=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  const sk=raw.match(/^(\d{1,2})[.\-/]\s*(\d{1,2})[.\-/]\s*(\d{4})/);
  if(iso){ y=Number(iso[1]); m=Number(iso[2]); d=Number(iso[3]); }
  else if(sk){ d=Number(sk[1]); m=Number(sk[2]); y=Number(sk[3]); }
  else{
    const parsed=new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return new Date(y,m-1,d,endOfDay?23:0,endOfDay?59:0,endOfDay?59:0,endOfDay?999:0);
}

function formatAlertDateRange(start,end){
  const dateOptions={day:'numeric',month:'numeric',year:'numeric'};
  const format=date=>date ? date.toLocaleDateString('sk-SK',dateOptions) : '';
  const from=format(start);
  const to=format(end);
  if(from&&to) return `Platí od ${from} do ${to}`;
  if(from) return `Platí od ${from}`;
  if(to) return `Platí do ${to}`;
  return '';
}

function safeAlertLink(value){
  const raw=String(value||'').trim();
  if(!raw) return '';
  if(raw.startsWith('#') || raw.startsWith('/')) return raw;
  try{
    const url=new URL(raw,window.location.origin);
    return /^https?:$/.test(url.protocol) ? url.href : '';
  }catch(e){
    return '';
  }
}

function csvRowsToObjects(text){
  const lines=String(text||'').trim().split(/\r?\n/).filter(Boolean);
  if(lines.length<2) return [];
  const headers=parseCsvLine(lines[0]).map(normalizeAlertKey);
  return lines.slice(1).map(line=>{
    const values=parseCsvLine(line);
    const obj={};
    headers.forEach((key,index)=>{ obj[key]=values[index]||''; });
    return obj;
  });
}


const CLIPPIO_CMS_CSV_URL='https://docs.google.com/spreadsheets/d/e/2PACX-1vQypNgFRbB3PsaKHmxL4wfWYFu_kh8eR6U2wkwr0b-qOJzLwKeIn-vySWHU4MY1nIGe3twrqZ7nqd6Q/pub?gid=2127962883&single=true&output=csv';

function cleanAvailabilityStatusText(value){
  return String(value||'')
    .replace(/^[\s🟢🔴🟡🟠🟣✅❌⚠️]+/u,'')
    .trim();
}

function normalizeAvailabilityMode(value){
  const raw=String(value||'').trim().toLowerCase();
  if(['false','0','no','nie','closed','close','zatvorene','zatvorené','neprijima','neprijímam','neprijíma','full','busy'].includes(raw)) return 'closed';
  if(['limited','limit','obmedzene','obmedzené','holiday','dovolenka','pause','paused'].includes(raw)) return 'limited';
  if(['true','1','yes','ano','áno','open','opened','prijima','prijímam','prijíma'].includes(raw)) return 'open';
  return '';
}

function inferAvailabilityMode(statusText,textValue){
  const combined=(String(statusText||'')+' '+String(textValue||'')).toLowerCase();
  if(/neprij[ií]ma|pozastaven|obsaden|pln[áa]|dovolenka|nedostupn/.test(combined)) return 'closed';
  if(/obmedzen|limitovan|čiastočne|ciastocne/.test(combined)) return 'limited';
  return 'open';
}

function initAvailabilityStatus(){
  const root=document.querySelector('[data-clippio-availability]');
  if(!root) return;

  const statusEl=root.querySelector('[data-availability-status]');
  const textEl=root.querySelector('[data-availability-text]');
  if(!statusEl||!textEl) return;

  const fallbackStatus=cleanAvailabilityStatusText(statusEl.textContent);
  const fallbackText=textEl.textContent;

  const applyState=(mode,statusText,bodyText)=>{
    const normalized=normalizeAvailabilityMode(mode) || inferAvailabilityMode(statusText,bodyText);
    root.classList.remove('availability-open','availability-closed','availability-limited','availability-loading');
    root.classList.add(`availability-${normalized}`);
    statusEl.textContent=cleanAvailabilityStatusText(statusText) || fallbackStatus;
    textEl.textContent=bodyText || fallbackText;
  };

  root.classList.add('availability-loading');

  fetch(CLIPPIO_CMS_CSV_URL,{cache:'no-store'})
    .then(response=>{ if(!response.ok) throw new Error('CMS unavailable'); return response.text(); })
    .then(text=>{
      const rows=csvRowsToObjects(text).filter(row=>normalizeAlertKey(row.section)==='settings');
      const byKey=(key)=>{
        const normalizedKey=normalizeAlertKey(key);
        return rows.find(row=>normalizeAlertKey(row.key)===normalizedKey);
      };
      const valueFor=(key)=>{
        const row=byKey(key);
        if(!row) return '';
        return String(row.value||row.text||row.title||'').trim();
      };

      const status=valueFor('availabilityStatus') || fallbackStatus;
      const description=valueFor('availabilityText') || fallbackText;
      const explicitMode=valueFor('availabilityOpen') || valueFor('availabilityMode') || valueFor('availabilityState') || valueFor('acceptingProjects');
      applyState(explicitMode,status,description);
    })
    .catch(()=>{
      applyState('open',fallbackStatus,fallbackText);
    });
}


function initClippioAlerts(){
  const root=document.querySelector('[data-clippio-alerts]');
  if(!root) return;

  const CSV_URL='https://docs.google.com/spreadsheets/d/e/2PACX-1vSZWpm_N6vGrTv_znBUaxzqn_Q7U2cirALGMMxBAZS3XrfQsCv5kSLsXAXZqpUb_OCgMF-FRDKDtZip/pub?output=csv';
  const button=root.querySelector('.nav-alert__bell');
  const dot=root.querySelector('.nav-alert__dot');
  const panel=root.querySelector('.nav-alert__panel');
  const title=root.querySelector('.nav-alert__title');
  const message=root.querySelector('.nav-alert__message');
  const link=root.querySelector('.nav-alert__link');
  const meta=root.querySelector('.nav-alert__meta');
  if(!button||!panel||!title||!message) return;

  let open=false;
  let activeAlert=null;

  const setOpen=(state)=>{
    open=Boolean(state);
    panel.hidden=!open;
    button.setAttribute('aria-expanded',String(open));
    root.classList.toggle('is-open',open);
  };

  const setPanelState=(state,alert)=>{
    root.classList.remove('has-alert','has-high-alert','has-normal-alert','has-error');
    panel.classList.remove('is-high','is-normal','is-empty','is-error');

    if(dot) dot.hidden=true;
    if(link){ link.hidden=true; link.removeAttribute('href'); link.textContent='Kontaktovať'; }
    if(meta){ meta.hidden=true; meta.textContent=''; }

    if(state==='loading'){
      panel.classList.add('is-empty');
      title.textContent='Kontrolujem upozornenia…';
      message.textContent='Načítavam aktuálny oznam.';
      return;
    }

    if(state==='error'){
      root.classList.add('has-error');
      panel.classList.add('is-error');
      title.textContent='Upozornenia sa nepodarilo načítať';
      message.textContent='Google Sheets zdroj momentálne neodpovedá. Skúste stránku obnoviť alebo ma kontaktujte priamo cez formulár.';
      if(link){ link.href='/kontakt/'; link.textContent='Kontaktovať'; link.hidden=false; }
      return;
    }

    if(!alert){
      panel.classList.add('is-empty');
      title.textContent='Žiadne dôležité upozornenie';
      message.textContent='Momentálne nie je zverejnený žiadny aktívny oznam.';
      return;
    }

    const priority=String(alert.priority||'normal').trim().toLowerCase()==='high'?'high':'normal';
    root.classList.add('has-alert',priority==='high'?'has-high-alert':'has-normal-alert');
    panel.classList.add(priority==='high'?'is-high':'is-normal');
    if(dot) dot.hidden=false;

    title.textContent=alert.title || (priority==='high'?'Dôležité upozornenie':'Upozornenie');
    message.textContent=alert.message || 'Aktuálny oznam Clippio.';

    const href=safeAlertLink(alert.buttonLink);
    const buttonText=String(alert.buttonText||'').trim();
    if(link && href && buttonText){
      link.href=href;
      link.textContent=buttonText;
      link.hidden=false;
    }

    const range=formatAlertDateRange(alert.startDateObj,alert.endDateObj);
    if(meta && range){
      meta.textContent=range;
      meta.hidden=false;
    }
  };

  button.addEventListener('click',()=>setOpen(!open));
  document.addEventListener('click',event=>{
    if(open && !root.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && open){
      setOpen(false);
      button.focus();
    }
  });

  const pickAlert=(items)=>{
    const now=new Date();
    const current=items.map(item=>{
      const start=parseAlertDate(item.startdate,false);
      const end=parseAlertDate(item.enddate,true);
      return {
        active:item.active,
        type:item.type,
        title:item.title,
        message:item.message,
        buttonText:item.buttontext,
        buttonLink:item.buttonlink,
        priority:item.priority,
        startDateObj:start,
        endDateObj:end,
        createdAtObj:parseAlertDate(item.createdat,false)
      };
    }).filter(item=>{
      if(!isTruthyAlertValue(item.active)) return false;
      if(item.startDateObj && now<item.startDateObj) return false;
      if(item.endDateObj && now>item.endDateObj) return false;
      return Boolean(item.title||item.message);
    });
    current.sort((a,b)=>{
      const pa=String(a.priority||'').toLowerCase()==='high'?1:0;
      const pb=String(b.priority||'').toLowerCase()==='high'?1:0;
      if(pa!==pb) return pb-pa;
      return (b.createdAtObj?b.createdAtObj.getTime():0)-(a.createdAtObj?a.createdAtObj.getTime():0);
    });
    return current[0]||null;
  };

  setPanelState('loading',null);
  fetch(CSV_URL,{cache:'no-store'})
    .then(response=>{ if(!response.ok) throw new Error('CSV unavailable'); return response.text(); })
    .then(text=>{
      activeAlert=pickAlert(csvRowsToObjects(text));
      setPanelState('ready',activeAlert);
    })
    .catch(()=>{
      activeAlert=null;
      setPanelState('error',null);
    });
}

function initCookieConsent(){
  const KEY='clippio_cookie_consent_v1';
  if(localStorage.getItem(KEY)) return;
  const banner=document.createElement('div');
  banner.className='cookie-banner show';
  document.body.classList.add('cookie-banner-visible');
  banner.innerHTML=`<div class="cookie-inner"><div class="cookie-text"><strong>Cookies na Clippio.sk</strong><p>Používame nevyhnutné cookies pre fungovanie webu. Analytické cookies pomáhajú merať návštevnosť cez Google Analytics a vložený obsah z YouTube môže používať vlastné cookies.</p><div class="cookie-panel" id="cookie-panel"><label class="cookie-option"><input type="checkbox" checked disabled> Nevyhnutné cookies <span>– potrebné pre základné fungovanie webu.</span></label><label class="cookie-option"><input type="checkbox" id="cookie-analytics"> Analytické cookies <span>– meranie návštevnosti a zlepšovanie webu.</span></label><label class="cookie-option"><input type="checkbox" id="cookie-media"> Mediálne cookies <span>– vložený obsah, napríklad YouTube.</span></label></div></div><div class="cookie-actions"><button class="settings" type="button" id="cookie-settings">Nastavenia</button><button type="button" id="cookie-necessary">Len nevyhnutné</button><button class="accept" type="button" id="cookie-accept">Prijať všetko</button></div></div>`;
  document.body.appendChild(banner);
  const save=(data)=>{localStorage.setItem(KEY,JSON.stringify(data));banner.classList.remove('show');document.body.classList.remove('cookie-banner-visible');document.dispatchEvent(new CustomEvent('clippioConsent',{detail:data}));};
  const panel=banner.querySelector('#cookie-panel');
  banner.querySelector('#cookie-settings').addEventListener('click',()=>panel.classList.toggle('open'));
  banner.querySelector('#cookie-necessary').addEventListener('click',()=>save({necessary:true,analytics:false,media:false,date:new Date().toISOString()}));
  banner.querySelector('#cookie-accept').addEventListener('click',()=>save({necessary:true,analytics:true,media:true,date:new Date().toISOString()}));
}

function initFaq(){
  document.querySelectorAll('.faq-question').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item');
      if(!item) return;
      const open=!item.classList.contains('open');
      item.classList.toggle('open',open);
      btn.setAttribute('aria-expanded',String(open));
    });
  });
}

function initReveal(){
  const selector=[
    '.hero',
    '.web-hero',
    '.page-hero',
    '.section-head',
    '.cta-box',
    '.conversion-cta',
    '.web-cta',
    '.about-band',
    '.service',
    '.price-card',
    '.package-detail-card',
    '.package-rule-card',
    '.web-example-mini',
    '.web-example-card',
    '.web-self-portfolio',
    '.web-project-card',
    '.proof-card',
    '.reference-card',
    '.audience-card',
    '.trust-grid article',
    '.process-steps article',
    '.testimonial',
    '.stat',
    '.update-card',
    '.detail-card',
    '.panel',
    '.faq-item'
  ].join(',');
  const items=Array.from(document.querySelectorAll(selector));
  if(!items.length) return;

  const reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lightMotion=window.matchMedia && window.matchMedia('(max-width: 780px)').matches;

  items.forEach(el=>{
    el.classList.add('reveal');
    if(reduceMotion || lightMotion){
      el.classList.add('visible');
      return;
    }
    const localIndex=Array.prototype.indexOf.call(el.parentElement ? el.parentElement.children : [], el);
    const delay=Math.min(Math.max(localIndex,0),2);
    if(delay>0) el.setAttribute('data-reveal-delay',String(delay));
  });
  if(reduceMotion || lightMotion) return;

  if(!('IntersectionObserver' in window)){
    items.forEach(el=>el.classList.add('visible'));
    return;
  }
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.08,rootMargin:'0px 0px -16px 0px'});
  items.forEach(el=>io.observe(el));
}


function initFloatingCta(){
  const cta=document.querySelector('.floating-cta');
  if(!cta) return;

  const label=cta.querySelector('strong');
  const defaultText=label ? label.textContent : '';
  const CLICK_KEY='clippio_last_cta_click';
  const SESSION_CLICK_KEY='clippio_cta_clicked_this_visit';
  let clicked=false;
  let reminded=false;

  try{ clicked=sessionStorage.getItem(SESSION_CLICK_KEY)==='1'; }catch(e){}

  const markClicked=()=>{
    clicked=true;
    try{
      localStorage.setItem(CLICK_KEY,new Date().toISOString());
      sessionStorage.setItem(SESSION_CLICK_KEY,'1');
    }catch(e){}
  };

  const remind=()=>{
    if(clicked || reminded || !document.body.contains(cta)) return;
    reminded=true;
    cta.classList.add('is-reminding','is-question');
    if(label) label.textContent='Máte otázku? Ponuka →';
    window.setTimeout(()=>cta.classList.remove('is-reminding'),800);
    window.setTimeout(()=>{
      cta.classList.remove('is-question');
      if(label) label.textContent=defaultText;
    },4000);
  };

  const scrollHandler=()=>{
    if(clicked || reminded) return;
    const doc=document.documentElement;
    const max=doc.scrollHeight-window.innerHeight;
    if(max>0 && ((window.scrollY || doc.scrollTop)/max)>0.70){
      remind();
      window.removeEventListener('scroll',scrollHandler);
    }
  };

  cta.addEventListener('click',markClicked,{passive:true});
  // v6.1.16: bez automatického pulzu CTA, aby sa stránka nepohybovala sama od seba.

  document.addEventListener('focusin',(event)=>{
    if(event.target && event.target.closest && event.target.closest('form')){
      document.body.classList.add('form-focus-active');
    }
  });
  document.addEventListener('focusout',()=>{
    window.setTimeout(()=>{
      if(!document.activeElement || !document.activeElement.closest || !document.activeElement.closest('form')){
        document.body.classList.remove('form-focus-active');
      }
    },0);
  });
}




function showThankYouModal(){
  let modal=document.querySelector('.thankyou-modal');
  if(!modal){
    modal=document.createElement('div');
    modal.className='thankyou-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Dopyt bol odoslaný');
    modal.innerHTML='<div class="thankyou-dialog"><div class="thankyou-icon" aria-hidden="true">✓</div><h2>Ďakujem, dopyt bol odoslaný.</h2><p>Správa odišla úspešne. Ozvem sa vám čo najskôr na uvedený kontakt.</p><div class="thankyou-actions"><button class="btn btn-primary thankyou-close" type="button">Zavrieť</button><a class="btn btn-secondary" href="/portfolio/">Pozrieť portfólio</a></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click',event=>{
      if(event.target===modal || event.target.closest('.thankyou-close')){
        closeThankYouModal();
      }
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape' && modal.classList.contains('is-open')) closeThankYouModal();
    });
  }
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
  const close=modal.querySelector('.thankyou-close');
  if(close) close.focus();
}

function closeThankYouModal(){
  const modal=document.querySelector('.thankyou-modal');
  if(modal) modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

function initWeb3Forms(){
  const forms=document.querySelectorAll('form[action*="api.web3forms.com/submit"]');
  if(!forms.length) return;
  forms.forEach(form=>{
    const button=form.querySelector('button[type="submit"]');
    const originalText=button ? button.textContent : '';
    let message=form.querySelector('.form-message');
    if(!message){
      message=document.createElement('div');
      message.className='form-message';
      message.setAttribute('role','status');
      message.setAttribute('aria-live','polite');
      const legal=form.querySelector('.form-legal');
      if(legal) form.insertBefore(message,legal);
      else form.appendChild(message);
    }

    form.addEventListener('submit',async event=>{
      if(!window.fetch || !window.FormData) return;
      event.preventDefault();

      const trap=form.querySelector('[name="botcheck"]');
      if(trap && trap.checked) return;

      message.className='form-message';
      message.textContent='';
      if(button){
        button.disabled=true;
        button.textContent='Odosielam dopyt...';
      }

      try{
        const data=new FormData(form);
        data.delete('redirect');
        const response=await fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}});
        let result={};
        try{ result=await response.json(); }catch(e){ result={}; }

        if(response.ok && result.success){
          form.reset();
          message.className='form-message success';
          message.innerHTML='<strong>Dopyt bol odoslaný.</strong><span>Ďakovacie okno sa zobrazilo. Ozvem sa vám čo najskôr na uvedený kontakt.</span>';
          showThankYouModal();
        }else{
          const serverMessage=result.message ? String(result.message) : 'Formulár sa nepodarilo odoslať.';
          throw new Error(serverMessage);
        }
      }catch(error){
        message.className='form-message error';
        message.innerHTML='<strong>Dopyt sa nepodarilo odoslať.</strong><span>Skúste to znova alebo napíšte priamo na <a href="mailto:info@clippio.sk">info@clippio.sk</a>.</span>';
      }finally{
        if(button){
          button.disabled=false;
          button.textContent=originalText;
        }
      }
    });
  });
}


function initReactBitsTextEffects(){
  document.querySelectorAll('.rb-rotating-text[data-rotate-texts]').forEach(el=>{
    const texts=(el.getAttribute('data-rotate-texts')||'').split('|').map(t=>t.trim()).filter(Boolean);
    if(!texts.length) return;
    const word=document.createElement('span');
    word.className='rb-rotate-word';
    word.textContent=texts[0];
    el.textContent='';
    el.appendChild(word);
    el.setAttribute('aria-label',texts[0]);
  });
}



function initWebFinder(){
  const root=document.querySelector('[data-web-finder]');
  if(!root) return;

  const title=root.querySelector('[data-finder-title]');
  const price=root.querySelector('[data-finder-price]');
  const description=root.querySelector('[data-finder-description]');
  const totalPriceEl=root.querySelector('[data-finder-total-price]');
  const priceNoteEl=root.querySelector('[data-finder-price-note]');
  const pathEl=root.querySelector('[data-finder-path]');
  const addonsEl=root.querySelector('[data-finder-addons]');
  const notNeededEl=root.querySelector('[data-finder-not-needed]');
  const customNoteEl=root.querySelector('[data-finder-custom-note]');
  const reasonsEl=root.querySelector('[data-finder-reasons]');
  const warningsEl=root.querySelector('[data-finder-warnings]');
  const nextEl=root.querySelector('[data-finder-next-list]');
  const summaryEl=document.querySelector('[data-finder-summary]');
  const copyBtn=root.querySelector('[data-finder-copy]');
  const resultCard=root.querySelector('[data-finder-result]');
  const resultEyebrow=root.querySelector('[data-finder-result-eyebrow]');
  const layout=root.querySelector('.web-finder-layout');
  const stepper=root.querySelector('[data-web-finder-stepper]');
  const steps=Array.from(root.querySelectorAll('[data-finder-step]'));
  const indicators=Array.from(root.querySelectorAll('[data-step-indicator]'));
  const connectors=Array.from(root.querySelectorAll('[data-step-connector]'));
  const backBtn=root.querySelector('[data-finder-back]');
  const nextBtn=root.querySelector('[data-finder-next]');
  const footer=root.querySelector('[data-finder-footer]');
  const stepContent=root.querySelector('.finder-step-content');
  const totalSteps=steps.length || 1;
  let currentStep=1;
  let completed=false;

  const read=name=>{
    const checked=root.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  };

  const optionText=name=>{
    const checked=root.querySelector(`input[name="${name}"]:checked`);
    if(!checked) return '';
    const label=checked.closest('label');
    return label ? label.textContent.replace(/\s+/g,' ').trim() : checked.value;
  };

  const unique=items=>[...new Set((items||[]).filter(Boolean))];

  const renderList=(el,items,emptyText)=>{
    if(!el) return;
    const list=unique(items);
    if(!list.length){
      el.innerHTML=`<li>${escapeHtml(emptyText||'Nie je potrebné nič špeciálne dopĺňať.')}</li>`;
      return;
    }
    el.innerHTML=list.map(item=>`<li>${escapeHtml(item)}</li>`).join('');
  };

  const money=n=>`${Math.round(n).toLocaleString('sk-SK')} €`;

  const updateOptionStyles=()=>{
    root.querySelectorAll('.finder-step label').forEach(label=>{
      const input=label.querySelector('input[type="radio"]');
      label.classList.toggle('is-selected',!!(input&&input.checked));
    });
  };

  const updateStepper=(direction=0)=>{
    if(!stepper) return;
    stepper.dataset.direction=direction<0?'back':'forward';
    steps.forEach(step=>{
      const stepNumber=Number(step.dataset.finderStep||0);
      const isActive=stepNumber===currentStep;
      step.hidden=!isActive;
      step.classList.toggle('is-active',isActive);
    });
    if(stepContent){
      const activeStep=steps.find(step=>Number(step.dataset.finderStep||0)===currentStep);
      if(activeStep){
        window.requestAnimationFrame(()=>{
          stepContent.style.height=`${activeStep.offsetHeight}px`;
        });
      }
    }
    indicators.forEach(indicator=>{
      const stepNumber=Number(indicator.dataset.stepIndicator||0);
      const isActive=stepNumber===currentStep;
      const isComplete=stepNumber<currentStep || completed;
      indicator.classList.toggle('is-active',isActive&&!completed);
      indicator.classList.toggle('is-complete',isComplete);
      indicator.classList.toggle('is-inactive',!isActive&&!isComplete);
      indicator.setAttribute('aria-current',isActive&&!completed?'step':'false');
    });
    connectors.forEach(connector=>{
      const stepNumber=Number(connector.dataset.stepConnector||0);
      connector.classList.toggle('is-complete',stepNumber<currentStep || completed);
    });
    if(backBtn) backBtn.hidden=currentStep===1;
    if(footer) footer.classList.toggle('spread',currentStep!==1);
    if(footer) footer.classList.toggle('end',currentStep===1);
    if(nextBtn) nextBtn.textContent=currentStep===totalSteps?'Zobraziť odporúčanie':'Pokračovať';
    if(resultEyebrow) resultEyebrow.textContent='Finálne odporúčanie';
    if(resultCard){
      resultCard.hidden=!completed;
      resultCard.classList.toggle('is-final',completed);
      resultCard.classList.toggle('is-visible',completed);
    }
    if(layout) layout.classList.toggle('is-result-hidden',!completed);
  };

  const goToStep=(stepNumber)=>{
    const nextStep=Math.max(1,Math.min(totalSteps,Number(stepNumber)||1));
    const direction=nextStep>=currentStep?1:-1;
    currentStep=nextStep;
    completed=false;
    updateStepper(direction);
  };

  const packages={
    start:{
      title:'Štart web',
      price:'od 199 €',
      base:199,
      description:'Jednostránkový web alebo landing page pre základnú prezentáciu, rýchle spustenie a jasný kontakt.',
      defaultPath:'Štart web + jasný kontakt + základné sekcie. Najprv overiť dopyt, až potom pridávať väčšie funkcie.',
      customNote:'Web na mieru zatiaľ netreba. Dával by zmysel až pri objednávkovom toku, automatizácii alebo vlastnej databáze.',
      next:['pripraviť logo, kontakt a základnú ponuku','vybrať jednu hlavnú akciu, ktorú má návštevník urobiť','poslať 2–3 referenčné weby, ktoré sa vám páčia']
    },
    rast:{
      title:'Rast firemný web',
      price:'od 499 €',
      base:499,
      description:'Firemný web pre služby, dôveru, viac podstránok, portfólio a lepšie vysvetlenie ponuky.',
      defaultPath:'Rast firemný web + najnutnejšie doplnky. Toto je rozumnejšie než tlačiť veľký predajný systém bez dôkazov.',
      customNote:'Web na mieru riešte až vtedy, keď bežné sekcie, formuláre, portfólio alebo jednoduché CMS nestačia.',
      next:['spísať služby a cieľové skupiny','dodať fotky, realizácie alebo dôkazy','určiť hlavné CTA: telefonát, formulár alebo dopyt']
    },
    predaj:{
      title:'Predaj / e-shop',
      price:'od 999 €',
      base:999,
      description:'Predajný web, katalóg, objednávkový tok alebo menší e-shop. Tu už rozhoduje produktová štruktúra a proces objednávky.',
      defaultPath:'Predaj / e-shop + iba tie predajné funkcie, ktoré sú potrebné na prvú funkčnú verziu.',
      customNote:'Web na mieru dáva zmysel pri netypickej platbe, vlastnom účte zákazníka, napojeniach alebo komplikovanom objednávkovom procese.',
      next:['spísať produkty, varianty a spôsob objednávky','určiť platbu, dopravu alebo rezerváciu','počítať s väčším rozsahom testovania']
    },
    individual:{
      title:'Web na mieru',
      price:'individuálne, orientačne od 1200 €+',
      base:1200,
      custom:true,
      description:'Riešenie pre špeciálnu funkciu, automatizáciu, napojenie, databázu, klientsku zónu alebo nejasný veľký rozsah.',
      defaultPath:'Najprv krátke zadanie a minimálna funkčná verzia. Veľký systém bez presného rozsahu je najrýchlejšia cesta k zbytočným nákladom.',
      customNote:'Tu už balík nie je dobrý odhad. Cenu určuje hlavne logika funkcií, počet obrazoviek, dáta a napojenia.',
      next:['spísať presné funkcie a scenáre používania','oddeliť nutné funkcie od pekných nápadov','začať menším prototypom, nie veľkým systémom naslepo']
    }
  };

  const addonCatalog={
    copy:{name:'Texty k webu',min:40,max:120},
    editCopy:{name:'Úprava existujúcich textov',min:20,max:70},
    photos:{name:'Fotografie',min:50,max:200},
    graphics:{name:'Grafika / bannery',min:30,max:150},
    logo:{name:'Logo alebo jednoduchá vizuálna úprava',min:50,max:180},
    seo:{name:'SEO základ',min:40,max:120},
    cms:{name:'Prepojenie na Google Sheets / jednoduché CMS',min:60,max:180},
    advancedForm:{name:'Pokročilejší kontaktný formulár',min:30,max:90},
    portfolio:{name:'Galéria / portfólio',min:30,max:100},
    blog:{name:'Blog / novinky',min:50,max:150},
    reservation:{name:'Rezervačný alebo objednávkový prvok',min:100,max:300},
    catalog:{name:'Produktový katalóg',min:120,max:350},
    ecommerce:{name:'E-shop funkcie',min:250,max:700},
    video:{name:'Dron / video obsah',min:0,max:0,custom:'individuálne'},
    custom:{name:'Individuálna funkcia na mieru',min:150,max:350,plus:true}
  };

  const addAddon=(addons,key)=>{
    const item=addonCatalog[key];
    if(item && !addons.some(addon=>addon.name===item.name)) addons.push(item);
  };

  const addonLabel=addon=>{
    if(addon.custom) return `${addon.name} — ${addon.custom}`;
    const plus=addon.plus?'+':'';
    if(addon.min===0 && addon.max===0) return `${addon.name} — podľa rozsahu`;
    return `${addon.name} — približne +${money(addon.min)} až ${money(addon.max)}${plus}`;
  };

  const calculate=()=>{
    const purpose=read('wf-purpose');
    const scope=read('wf-scope');
    const content=read('wf-content');
    const budget=read('wf-budget');
    const features=read('wf-features');
    const approach=read('wf-approach');
    const score={start:0,rast:0,predaj:0,individual:0};
    const reasons=[];
    const warnings=[];
    const notNeeded=[];
    const addons=[];

    if(purpose==='basic'){ score.start+=5; score.rast+=1; reasons.push('cieľ je základná online prezentácia, nie veľký systém'); }
    if(purpose==='trust'){ score.rast+=5; score.start+=1; reasons.push('potrebujete pôsobiť dôveryhodnejšie a lepšie vysvetliť služby'); }
    if(purpose==='leads'){ score.rast+=5; score.predaj+=1; reasons.push('cieľom sú dopyty, preto dáva zmysel silnejšia štruktúra a CTA'); }
    if(purpose==='sales'){ score.predaj+=5; score.rast+=2; reasons.push('predaj alebo objednávky už potrebujú premyslený predajný tok'); }
    if(purpose==='system'){ score.individual+=6; score.predaj+=2; reasons.push('špeciálne funkcie treba najprv presne zadefinovať'); }

    if(scope==='one'){ score.start+=4; reasons.push('rozsah jednej stránky drží cenu aj rozhodovanie pod kontrolou'); }
    if(scope==='few'){ score.rast+=4; reasons.push('3–5 podstránok už potrebuje firemnú štruktúru, nie iba jednoduchú vizitku'); }
    if(scope==='many'){ score.rast+=3; score.predaj+=1; reasons.push('viac obsahu potrebuje lepšiu architektúru a jasné rozdelenie služieb'); }
    if(scope==='shop'){ score.predaj+=5; score.rast+=1; reasons.push('produkty alebo katalóg posúvajú projekt do predajného riešenia'); }
    if(scope==='custom'){ score.individual+=5; reasons.push('individuálny tok znamená vyššie riziko rozsahu a ceny'); }

    if(content==='ready'){ score.start+=1; score.rast+=1; }
    if(content==='partial'){ score.rast+=2; addAddon(addons,'editCopy'); reasons.push('materiály existujú, ale treba ich upratať do predajnej štruktúry'); }
    if(content==='needText'){ score.rast+=1; addAddon(addons,'copy'); warnings.push('ak chýbajú texty, cena sa zvýši o prípravu obsahu'); }
    if(content==='needVisuals'){ score.rast+=1; addAddon(addons,'photos'); addAddon(addons,'graphics'); warnings.push('bez fotiek alebo grafiky bude web slabší, aj keď technicky funguje'); }
    if(content==='unclear'){ score.individual+=2; addAddon(addons,'editCopy'); warnings.push('nejasné zadanie je väčšie riziko než samotná technická tvorba webu'); }

    if(budget==='low'){ score.start+=5; if(['sales','system'].includes(purpose)||['shop','custom'].includes(scope)||['catalog','ecommerce','custom'].includes(features)) warnings.push('rozpočet do 250 € nesedí na e-shop, systém ani väčší firemný web'); }
    if(budget==='mid'){ score.rast+=4; }
    if(budget==='high'){ score.rast+=2; score.predaj+=4; }
    if(budget==='premium'){ score.predaj+=3; score.individual+=2; }
    if(budget==='unknown'){ score.rast+=1; }

    if(features==='basic'){ score.start+=2; notNeeded.push('blog, CMS, katalóg a e-shop funkcie'); }
    if(features==='formPortfolio'){ score.rast+=3; addAddon(addons,'portfolio'); reasons.push('formulár, CTA a portfólio zvyšujú dôveru aj počet dopytov'); }
    if(features==='cms'){ score.rast+=3; addAddon(addons,'cms'); addAddon(addons,'blog'); reasons.push('správa obsahu má zmysel, ak budete web reálne aktualizovať'); }
    if(features==='catalog'){ score.predaj+=2; score.rast+=2; addAddon(addons,'catalog'); addAddon(addons,'reservation'); reasons.push('katalóg alebo rezervácia je lacnejší medzikrok pred plným e-shopom'); }
    if(features==='ecommerce'){ score.predaj+=5; addAddon(addons,'ecommerce'); reasons.push('e-shop funkcie vyžadujú viac testovania a presnejšie zadanie'); }
    if(features==='custom'){ score.individual+=6; addAddon(addons,'custom'); warnings.push('vlastná funkcia bez presného rozsahu sa nedá naceniť presne'); }

    if(approach==='fast'){ score.start+=3; warnings.push('rýchly a lacný prístup znamená obmedziť rozsah, nie pridávať funkcie'); }
    if(approach==='quality'){ score.rast+=3; reasons.push('pri kvalitnom firemnom webe má zmysel investovať do štruktúry, dôvery a obsahu'); }
    if(approach==='sales'){ score.predaj+=3; }
    if(approach==='custom'){ score.individual+=4; warnings.push('individuálne riešenie treba rozsekať na nutné a voliteľné funkcie'); }
    if(approach==='validate'){ score.start+=3; score.rast+=1; reasons.push('overenie nápadu lacnejšie je rozumnejšie než hneď stavať veľký web'); }

    let key=Object.entries(score).sort((a,b)=>b[1]-a[1])[0][0];

    const wantsSales=['sales'].includes(purpose)||['shop'].includes(scope)||['catalog','ecommerce'].includes(features)||approach==='sales';
    const wantsCustom=purpose==='system'||scope==='custom'||features==='custom'||approach==='custom';
    const budgetTooLowForShop=budget==='low'||budget==='mid';

    if(wantsCustom){
      key='individual';
    }else if(wantsSales && budgetTooLowForShop){
      key=(scope==='one'&&features!=='ecommerce')?'start':'rast';
      warnings.push('plný e-shop by teraz pravdepodobne pálil rozpočet; lacnejšie je začať katalógom alebo dopytovým tokom');
    }else if(wantsSales){
      key='predaj';
    }

    if(key==='start'){
      notNeeded.push('plný e-shop','klientska zóna','vlastná databáza','komplexné automatizácie');
      if(features==='basic') notNeeded.push('viac podstránok bez jasného dôvodu');
    }
    if(key==='rast'){
      notNeeded.push('vlastný systém na mieru','zložité automatizácie','plný e-shop, ak zatiaľ stačí dopyt alebo katalóg');
      if(features==='formPortfolio') addAddon(addons,'advancedForm');
      if(scope==='many'||purpose==='leads') addAddon(addons,'seo');
    }
    if(key==='predaj'){
      notNeeded.push('netypické funkcie na mieru, kým nie je jasný základný predajný proces','klientska zóna, ak nie je nutná pre prvú verziu');
      if(features==='ecommerce') addAddon(addons,'seo');
    }
    if(key==='individual'){
      notNeeded.push('veľký systém bez prototypu','funkcie, ktoré nepodporujú predaj, úsporu času alebo lepšiu obsluhu klienta');
      addAddon(addons,'custom');
    }

    if(key==='predaj'){
      const ecommerceName=addonCatalog.ecommerce.name;
      for(let i=addons.length-1;i>=0;i--){
        if(addons[i].name===ecommerceName) addons.splice(i,1);
      }
      if(features==='ecommerce') addAddon(addons,'seo');
    }

    const data=packages[key];
    const uniqueReasons=unique(reasons).slice(0,5);
    const uniqueWarnings=unique(warnings.length ? warnings : ['najväčšie riziko je nejasné zadanie: bez cieľa, obsahu a termínu sa cena nedá držať presne']).slice(0,5);
    const uniqueNotNeeded=unique(notNeeded).slice(0,5);
    const addonItems=unique(addons.map(addon=>addon.name)).map(name=>addons.find(addon=>addon.name===name));

    const addonMin=addonItems.reduce((sum,addon)=>sum+(addon.custom?0:addon.min),0);
    const addonMax=addonItems.reduce((sum,addon)=>sum+(addon.custom?0:addon.max),0);
    const hasIndividualAddon=addonItems.some(addon=>addon.custom||addon.plus);
    let estimateText='';
    let priceNote='Presná cena sa dá určiť až po krátkom zadaní. Tento odhad slúži na rýchlu orientáciu, nie ako finálna cenová ponuka.';

    if(data.custom){
      estimateText='individuálne, orientačne od 1200 €+';
      priceNote='Presná cena závisí hlavne od funkcií, napojení, dát a počtu obrazoviek. Bez zadania by bola presná suma iba hádanie.';
    }else if(addonItems.length){
      const min=data.base+addonMin;
      const max=data.base+addonMax;
      estimateText=hasIndividualAddon ? `približne od ${money(min)}+` : `približne ${money(min)} až ${money(max)}`;
    }else{
      estimateText=`približne od ${money(data.base)}`;
    }

    const addonText=addonItems.map(addonLabel);
    const path=data.custom ? data.defaultPath : `${data.title} + ${addonItems.length ? addonItems.map(addon=>addon.name).slice(0,3).join(' + ') : 'bez zbytočných doplnkov'}. ${wantsSales&&budgetTooLowForShop?'Plný e-shop nechať až po overení záujmu.':data.defaultPath}`;

    if(title) title.textContent=data.title;
    if(price) price.textContent=data.price;
    if(description) description.textContent=data.description;
    if(totalPriceEl) totalPriceEl.textContent=estimateText;
    if(priceNoteEl) priceNoteEl.textContent=priceNote;
    if(pathEl) pathEl.textContent=path;
    if(customNoteEl) customNoteEl.textContent=data.customNote;
    renderList(reasonsEl,uniqueReasons,'Toto je najjednoduchší základ podľa zvolených odpovedí.');
    renderList(warningsEl,uniqueWarnings,'Zatiaľ nevidno zásadné riziko, no presnosť ceny závisí od zadania.');
    renderList(addonsEl,addonText,'Zatiaľ nie sú potrebné platené doplnky navyše.');
    renderList(notNeededEl,uniqueNotNeeded,'Zatiaľ nevyzerá, že treba niečo odkladať.');
    if(nextEl) nextEl.innerHTML=data.next.map(item=>`<li>${escapeHtml(item)}</li>`).join('');

    const summary=[
      'Odporúčanie Web Finderu:',
      `Balík: ${data.title} — ${data.price}`,
      `Odhadovaná cena: ${estimateText}`,
      `Najlacnejšia rozumná cesta: ${path}`,
      `Cieľ: ${optionText('wf-purpose')}`,
      `Rozsah: ${optionText('wf-scope')}`,
      `Obsah: ${optionText('wf-content')}`,
      `Rozpočet: ${optionText('wf-budget')}`,
      `Funkcie: ${optionText('wf-features')}`,
      `Termín/prístup: ${optionText('wf-approach')}`,
      `Odporúčané doplnky: ${addonText.join('; ') || 'bez doplnkov navyše'}`,
      `Čo zatiaľ netreba: ${uniqueNotNeeded.join('; ') || 'nič zásadné'}`,
      `Riziká: ${uniqueWarnings.join('; ')}`,
      `Ďalší krok: ${data.next.join('; ')}`,
      'Poznámka k cene: Presná cena závisí od rozsahu, obsahu, funkcií a dodaných materiálov.'
    ].join('\n');

    if(summaryEl) summaryEl.value=summary;
    updateOptionStyles();
    return summary;
  };

  root.querySelectorAll('input[type="radio"]').forEach(input=>input.addEventListener('change',()=>{
    completed=false;
    calculate();
    updateStepper(0);
    updateOptionStyles();
  }));

  indicators.forEach(indicator=>indicator.addEventListener('click',()=>{
    goToStep(indicator.dataset.stepIndicator);
  }));

  if(backBtn){
    backBtn.addEventListener('click',()=>{
      if(currentStep>1) goToStep(currentStep-1);
    });
  }

  if(nextBtn){
    nextBtn.addEventListener('click',()=>{
      if(currentStep<totalSteps){
        goToStep(currentStep+1);
      }else{
        completed=true;
        calculate();
        updateStepper(1);
        if(window.matchMedia('(max-width: 980px)').matches && resultCard){
          resultCard.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  }

  if(copyBtn){
    copyBtn.addEventListener('click',async()=>{
      const summary=calculate();
      try{
        await navigator.clipboard.writeText(summary);
        copyBtn.textContent='Skopírované';
        window.setTimeout(()=>{copyBtn.textContent='Skopírovať odporúčanie';},1600);
      }catch(e){
        if(summaryEl){summaryEl.focus();summaryEl.select();}
      }
    });
  }

  updateStepper(0);
  calculate();
}

document.addEventListener('DOMContentLoaded',()=>{
  initNavigation();
  initAvailabilityStatus();
  initClippioAlerts();
  initUpdates();
  initPhotoPrices();
  initWebProjects();
  initCookieConsent();
  initFaq();
  initReveal();
  initFloatingCta();
  initWeb3Forms();
  initReactBitsTextEffects();
  initWebFinder();
});
