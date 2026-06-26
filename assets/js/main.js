// Clippio v4.6
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
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      links.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
    }));
  }
  const file=(location.pathname.split('/').pop()||'index.html').replace('.html','');
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
  banner.innerHTML=`<div class="cookie-inner"><div class="cookie-text"><strong>Cookies na Clippio.sk</strong><p>Používame nevyhnutné cookies pre fungovanie webu. Analytické cookies pomáhajú merať návštevnosť cez Google Analytics a vložený obsah z YouTube môže používať vlastné cookies.</p><div class="cookie-panel" id="cookie-panel"><label class="cookie-option"><input type="checkbox" checked disabled> Nevyhnutné cookies <span>– potrebné pre základné fungovanie webu.</span></label><label class="cookie-option"><input type="checkbox" id="cookie-analytics"> Analytické cookies <span>– meranie návštevnosti a zlepšovanie webu.</span></label><label class="cookie-option"><input type="checkbox" id="cookie-media"> Mediálne cookies <span>– vložený obsah, napríklad YouTube.</span></label></div></div><div class="cookie-actions"><button class="settings" type="button" id="cookie-settings">Nastavenia</button><button type="button" id="cookie-necessary">Len nevyhnutné</button><button class="accept" type="button" id="cookie-accept">Prijať všetko</button></div></div>`;
  document.body.appendChild(banner);
  const save=(data)=>{localStorage.setItem(KEY,JSON.stringify(data));banner.classList.remove('show');document.dispatchEvent(new CustomEvent('clippioConsent',{detail:data}));};
  const panel=banner.querySelector('#cookie-panel');
  banner.querySelector('#cookie-settings').addEventListener('click',()=>panel.classList.toggle('open'));
  banner.querySelector('#cookie-necessary').addEventListener('click',()=>save({necessary:true,analytics:false,media:false,date:new Date().toISOString()}));
  banner.querySelector('#cookie-accept').addEventListener('click',()=>save({necessary:true,analytics:true,media:true,date:new Date().toISOString()}));
}

document.addEventListener('DOMContentLoaded',()=>{
  initNavigation();
  initUpdates();
  initPhotoPrices();
  initWebProjects();
  initCookieConsent();
});
