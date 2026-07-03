// Clippio v6.1.16 – smoothness performance pass
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
  const active=servicePages.includes(file)?'sluzby':file;
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


document.addEventListener('DOMContentLoaded',()=>{
  initNavigation();
  initUpdates();
  initPhotoPrices();
  initWebProjects();
  initCookieConsent();
  initFaq();
  initReveal();
  initFloatingCta();
  initWeb3Forms();
  initReactBitsTextEffects();
});

// v6.1.22 hard marquee fallback
(function(){
  const track = document.querySelector('.strip[data-real-marquee="true"] .strip-track');
  if(!track) return;
  track.style.animation = 'clippioRealInfiniteStrip 12s linear infinite';
  track.style.willChange = 'transform';
})();
