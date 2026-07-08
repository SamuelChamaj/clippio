// Clippio v6.6.5 - stable Google Sheets availability colors + editable status text + alerts + Clippi Light Helper
// Stabilná verzia: navbar a footer sú priamo v HTML, aby web fungoval aj po otvorení cez file://.

const CLIPPIO_COOKIE_CONSENT_KEY='clippio_cookie_consent_v1';

function escapeHtml(v){
  return String(v||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function getClippioCookieConsent(){
  try{
    return JSON.parse(localStorage.getItem(CLIPPIO_COOKIE_CONSENT_KEY)||'null')||{};
  }catch(e){
    return {};
  }
}

function canUseClippioAnalytics(){
  return getClippioCookieConsent().analytics===true;
}

function cleanTrackingValue(value,maxLength){
  return String(value||'')
    .replace(/\s+/g,' ')
    .trim()
    .slice(0,maxLength||140);
}

function clippioTrackingText(element){
  if(!element) return '';
  return cleanTrackingValue(
    element.getAttribute('aria-label') ||
    element.getAttribute('title') ||
    element.textContent ||
    element.value ||
    '',
    120
  );
}

function clippioTrackingSection(element){
  const section=element && element.closest ? element.closest('section, header, footer, nav, main') : null;
  if(!section) return '';
  if(section.id) return section.id;
  const heading=section.querySelector('h1,h2,h3,.kicker');
  return clippioTrackingText(heading) || cleanTrackingValue(section.className,80);
}

function clippioTrackEvent(eventName,params){
  if(!canUseClippioAnalytics()) return false;
  const payload=Object.assign({
    page_path:window.location.pathname,
    page_title:document.title,
    page_url:window.location.href
  },params||{});

  if(typeof window.gtag==='function'){
    window.gtag('event',eventName,payload);
  }else if(Array.isArray(window.dataLayer)){
    window.dataLayer.push(Object.assign({event:eventName},payload));
  }else{
    window.dataLayer=[Object.assign({event:eventName},payload)];
  }

  if(typeof window.plausible==='function'){
    window.plausible(eventName,{props:payload});
  }

  try{
    localStorage.setItem('clippio_last_analytics_event',JSON.stringify({
      event:eventName,
      payload,
      date:new Date().toISOString()
    }));
  }catch(e){}

  document.dispatchEvent(new CustomEvent('clippioAnalyticsEvent',{detail:{event:eventName,payload}}));
  return true;
}

window.clippioTrack=clippioTrackEvent;

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

const CLIPPIO_CMS_PUB_ID='2PACX-1vQypNgFRbB3PsaKHmxL4wfWYFu_kh8eR6U2wkwr0b-qOJzLwKeIn-vySWHU4MY1nIGe3twrqZ7nqd6Q';
const CLIPPIO_CMS_CSV_URL=`https://docs.google.com/spreadsheets/d/e/${CLIPPIO_CMS_PUB_ID}/pub?output=csv`;
const CLIPPIO_CMS_GVIZ_URL=`https://docs.google.com/spreadsheets/d/e/${CLIPPIO_CMS_PUB_ID}/gviz/tq`;
let clippioCmsRowsPromise=null;
let clippioCmsLastSource='not-loaded';
let clippioCmsLastError='';

function parseCsvRows(text){
  const rows=[];
  let row=[];
  let cell='';
  let quoted=false;
  const input=String(text||'');

  for(let i=0;i<input.length;i++){
    const ch=input[i];
    const next=input[i+1];

    if(ch==='"'){
      if(quoted && next==='"'){
        cell+='"';
        i++;
      }else{
        quoted=!quoted;
      }
      continue;
    }

    if(ch===',' && !quoted){
      row.push(cell.trim());
      cell='';
      continue;
    }

    if((ch==='\n' || ch==='\r') && !quoted){
      if(ch==='\r' && next==='\n') i++;
      row.push(cell.trim());
      if(row.some(value=>String(value||'').trim())) rows.push(row);
      row=[];
      cell='';
      continue;
    }

    cell+=ch;
  }

  row.push(cell.trim());
  if(row.some(value=>String(value||'').trim())) rows.push(row);
  return rows;
}

function csvRowsToObjects(text){
  const rows=parseCsvRows(text);
  if(rows.length<2) return [];
  const headers=rows[0].map(normalizeCmsKey);

  return rows.slice(1).map(values=>{
    const obj={};
    headers.forEach((key,index)=>{ obj[key]=values[index]||''; });
    return obj;
  });
}

function normalizeCmsKey(value){
  return String(value||'')
    .trim()
    .toLowerCase()
    .replace(/\s+/g,'')
    .replace(/[._-]+/g,'');
}

function isTruthyCmsValue(value){
  return ['true','pravda','prawda','1','yes','ano','áno','on','active','zapnute','zapnuté','open'].includes(String(value||'').trim().toLowerCase());
}

function isFalseyCmsValue(value){
  return ['false','nepravda','0','no','nie','off','inactive','vypnute','vypnuté','closed','zatvorene','zatvorené'].includes(String(value||'').trim().toLowerCase());
}

function isActiveCmsRow(row){
  return isTruthyCmsValue(row && row.active);
}

function firstCmsValue(){
  for(let i=0;i<arguments.length;i++){
    const value=String(arguments[i]||'').trim();
    if(value) return value;
  }
  return '';
}

function gvizCellToString(cell){
  if(!cell) return '';
  const value=cell.f!==undefined ? cell.f : cell.v;
  if(value===null || value===undefined) return '';
  if(value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0,10);
  return String(value).trim();
}

const CLIPPIO_CMS_EXPECTED_HEADERS=['active','section','key','value','title','text','buttontext','buttonlink','date','priority','startdate','enddate','order','internalnote'];

function hasExpectedCmsHeaders(headers){
  const set=new Set((headers||[]).map(normalizeCmsKey));
  return ['active','section','key','value'].every(key=>set.has(key));
}

function gvizRowToValues(row){
  const cells=Array.isArray(row && row.c) ? row.c : [];
  return cells.map(gvizCellToString);
}

function cmsValuesToObject(headers,values){
  const obj={};
  (headers||[]).forEach((key,index)=>{
    const normalized=normalizeCmsKey(key);
    if(normalized) obj[normalized]=values[index]||'';
  });
  return obj;
}

function gvizTableToObjects(response){
  const table=response && response.table;
  if(!table || !Array.isArray(table.cols) || !Array.isArray(table.rows)) return [];

  let headers=table.cols.map(col=>normalizeCmsKey(col.label || col.id));
  let dataRows=table.rows.map(gvizRowToValues);

  // Google Visualization niekedy nepošle hlavičky ako labels, ale ako prvý riadok tabuľky.
  // Bez tejto poistky sa stĺpce pomenujú len A/B/C a CMS potom nevie nájsť active/section/key/value.
  if(!hasExpectedCmsHeaders(headers) && dataRows.length){
    const firstRowHeaders=dataRows[0].map(normalizeCmsKey);
    if(hasExpectedCmsHeaders(firstRowHeaders)){
      headers=firstRowHeaders;
      dataRows=dataRows.slice(1);
    }else if(headers.every(header=>/^[a-z]$/.test(header))){
      headers=CLIPPIO_CMS_EXPECTED_HEADERS;
    }
  }

  return dataRows
    .map(values=>cmsValuesToObject(headers,values))
    .filter(row=>Object.values(row).some(value=>String(value||'').trim()));
}

function loadClippioCmsRowsWithFetch(){
  if(typeof fetch!=='function') return Promise.reject(new Error('Fetch is not available'));
  const controller=typeof AbortController==='function' ? new AbortController() : null;
  const timeout=controller ? window.setTimeout(()=>controller.abort(),6500) : null;
  const csvUrl=`${CLIPPIO_CMS_CSV_URL}&cachebust=${Date.now()}`;
  return fetch(csvUrl,{cache:'no-store',signal:controller?controller.signal:undefined})
    .then(response=>{
      if(timeout) window.clearTimeout(timeout);
      if(!response.ok) throw new Error(`Clippio CMS CSV HTTP ${response.status}`);
      return response.text();
    })
    .then(text=>{
      const rows=csvRowsToObjects(text);
      if(!rows.length) throw new Error('Clippio CMS CSV returned no rows');
      clippioCmsLastSource='csv-fetch';
      return rows;
    });
}

function loadClippioCmsRowsWithGviz(){
  return new Promise((resolve,reject)=>{
    const callbackName=`__clippioCmsGviz_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script=document.createElement('script');
    const cleanup=()=>{
      window.clearTimeout(timeout);
      delete window[callbackName];
      if(script.parentNode) script.parentNode.removeChild(script);
    };
    const timeout=window.setTimeout(()=>{
      cleanup();
      reject(new Error('Clippio CMS gviz timeout'));
    },8000);

    window[callbackName]=response=>{
      try{
        const rows=gvizTableToObjects(response);
        if(!rows.length) throw new Error('Clippio CMS gviz returned no rows');
        clippioCmsLastSource='gviz-script';
        cleanup();
        resolve(rows);
      }catch(error){
        cleanup();
        reject(error);
      }
    };

    script.async=true;
    script.onerror=()=>{
      cleanup();
      reject(new Error('Clippio CMS gviz script failed'));
    };
    script.src=`${CLIPPIO_CMS_GVIZ_URL}?tqx=responseHandler:${callbackName};out:json&cachebust=${Date.now()}`;
    document.head.appendChild(script);
  });
}

function loadClippioCmsRows(){
  if(!clippioCmsRowsPromise){
    clippioCmsRowsPromise=loadClippioCmsRowsWithFetch()
      .catch(error=>{
        clippioCmsLastError=error && error.message ? error.message : String(error||'CSV failed');
        return loadClippioCmsRowsWithGviz();
      })
      .then(rows=>{
        if(!rows.length) throw new Error('Clippio CMS returned no usable rows');
        return rows;
      })
      .catch(error=>{
        clippioCmsLastSource='failed';
        clippioCmsLastError=error && error.message ? error.message : String(error||'CMS failed');
        throw error;
      });
  }
  return clippioCmsRowsPromise;
}

window.clippioCmsDebug=function(){
  return loadClippioCmsRows().then(rows=>({
    ok:true,
    source:clippioCmsLastSource,
    rows:rows.length,
    sample:rows.slice(0,5)
  })).catch(error=>({
    ok:false,
    source:clippioCmsLastSource,
    error:clippioCmsLastError || (error && error.message) || String(error||'unknown')
  }));
};

window.clippioAvailabilityDebug=function(){
  return loadClippioCmsRows().then(rows=>{
    const statusRow=findCmsRow(rows,'availabilityStatus',true);
    const textRow=findCmsRow(rows,'availabilityText',true);
    const modeRow=findCmsRow(rows,'availabilityMode',true);
    const root=document.querySelector('[data-clippio-availability]');
    const resolved=resolveAvailabilityState(rows,'open','');
    return {
      ok:true,
      source:clippioCmsLastSource,
      currentDomState:root ? root.dataset.availabilityState : '',
      resolvedMode:resolved.mode,
      resolvedStatusText:resolved.statusText,
      resolvedBodyText:resolved.bodyText,
      availabilityStatusActive:statusRow ? statusRow.active : '',
      availabilityStatusValue:statusRow ? statusRow.value : '',
      availabilityTextValue:textRow ? textRow.value : '',
      availabilityModeValue:modeRow ? modeRow.value : '',
      expected:'availabilityStatus.active FALSE = červená, availabilityMode.value limited = oranžová, availabilityStatus.value = hlavný text, availabilityText.value = popis', lastResolved:window.__clippioLastAvailability || null, lastError:window.__clippioLastAvailabilityError || ''
    };
  });
};

function findCmsRow(rows,key,includeInactive){
  const normalizedKey=normalizeCmsKey(key);
  const matches=(rows||[]).filter(row=>normalizeCmsKey(row.key)===normalizedKey && (includeInactive || isActiveCmsRow(row)));
  return matches.find(row=>normalizeCmsKey(row.section)==='settings') || matches[0] || null;
}

function findCmsSetting(rows,key){
  return findCmsRow(rows,key,false);
}

function cmsSettingValue(rows,key){
  const row=findCmsSetting(rows,key);
  return row ? firstCmsValue(row.value,row.text,row.title) : '';
}

function cmsRowDateValue(row){
  return firstCmsValue(row && row.date,row && row.createdat,row && row.updatedat);
}

function cmsOrderValue(row){
  const order=Number(String(row && row.order || '').replace(',','.'));
  return Number.isFinite(order) ? order : 9999;
}

function isCmsRowCurrentlyVisible(row){
  if(!isActiveCmsRow(row)) return false;
  const now=new Date();
  const start=parseAlertDate(row.startdate,false);
  const end=parseAlertDate(row.enddate,true);
  if(start && now<start) return false;
  if(end && now>end) return false;
  return true;
}

function getCmsUpdateRows(rows){
  return (rows||[])
    .filter(row=>normalizeCmsKey(row.section)==='updates')
    .filter(row=>!String(row.key||'').trim())
    .filter(isCmsRowCurrentlyVisible)
    .filter(row=>Boolean(firstCmsValue(row.title,row.text,row.value)));
}

function sortCmsRowsForDisplay(items){
  return items.slice().sort((a,b)=>{
    const ao=cmsOrderValue(a);
    const bo=cmsOrderValue(b);
    if(ao!==bo) return ao-bo;

    const ad=parseAlertDate(cmsRowDateValue(a),false);
    const bd=parseAlertDate(cmsRowDateValue(b),false);
    return (bd?bd.getTime():0)-(ad?ad.getTime():0);
  });
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

  const fallback=[
    {date:'11.06.2026',title:'Nový web Clippio',text:'Spustená nová prezentácia služieb, portfólia a kontaktného dopytu.'},
    {date:'10.06.2026',title:'Dronové zábery a eventy',text:'Pribúdajú ukážky z podujatí, miest a krátkych promo videí.'},
    {date:'09.06.2026',title:'Grafika a video pod jednou značkou',text:'Clippio spája videoprodukciu, dron a vizuálnu identitu.'}
  ];

  const render=items=>{
    const clean=(items||[]).filter(x=>x.title||x.text).slice(0,5);
    box.innerHTML=clean.map(x=>{
      const href=safeAlertLink(x.buttonLink||'');
      const button=x.buttonText && href ? `<a class="mini-btn" href="${escapeHtml(href)}">${escapeHtml(x.buttonText)}</a>` : '';
      return `<article class="update-card"><div class="update-date">${escapeHtml(x.date||'Novinka')}</div><div><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.text)}</p>${button}</div></article>`;
    }).join('')||'<p>Žiadne novinky.</p>';
  };

  loadClippioCmsRows()
    .then(rows=>{
      const updates=sortCmsRowsForDisplay(getCmsUpdateRows(rows)).map(row=>({
        date:cmsRowDateValue(row),
        title:firstCmsValue(row.title,row.value),
        text:firstCmsValue(row.text,row.value),
        buttonText:firstCmsValue(row.buttontext),
        buttonLink:firstCmsValue(row.buttonlink)
      }));
      render(updates.length ? updates : fallback);
    })
    .catch(()=>render(fallback));
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
  return isTruthyCmsValue(value);
}

function normalizeAlertKey(value){
  return normalizeCmsKey(value);
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

function stripAvailabilityDiacritics(value){
  return String(value||'')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .trim();
}

function cleanAvailabilityStatusText(value){
  return String(value||'')
    .replace(/^[\s🟢🔴🟡🟠🟣✅❌⚠️]+/u,'')
    .trim();
}

function normalizeAvailabilityMode(value){
  const raw=stripAvailabilityDiacritics(value);
  if(!raw) return '';

  // Poradie je dôležité: „neprijímam“ obsahuje aj slovo „prijímam“, preto sa closed kontroluje prvé.
  if(['false','nepravda','0','no','nie','off','inactive','vypnute','closed','close','red','cervena','zatvorene','full','busy'].includes(raw)) return 'closed';
  if(/neprijimam|neprijima|pozastaven|obsaden|pln[ay]?|nedostupn|zatvoren/.test(raw)) return 'closed';

  if(['limited','limit','obmedzene','obmedzena','obmedzeny','obmedzené','holiday','dovolenka','pause','paused','orange','oranzova','oranzove','amber','yellow','zlta','žltá'].includes(raw)) return 'limited';
  if(/obmedzen|limitovan|ciastocne|ciastocna|dovolenka|docasne|dočasne|pauza/.test(raw)) return 'limited';

  if(['true','pravda','1','yes','ano','open','opened','on','active','green','zelena','prijima','prijimam','prijimame'].includes(raw)) return 'open';
  if(/prijimam|prijima|prijimame|otvoren/.test(raw)) return 'open';

  return '';
}

function inferAvailabilityMode(statusText,textValue){
  const combined=stripAvailabilityDiacritics(String(statusText||'')+' '+String(textValue||''));
  if(/neprijimam|neprijima|pozastaven|obsaden|pln[ay]?|nedostupn|zatvoren/.test(combined)) return 'closed';
  if(/obmedzen|limitovan|ciastocne|ciastocna|dovolenka|docasne|pauza/.test(combined)) return 'limited';
  if(/prijimam|prijima|prijimame|otvoren/.test(combined)) return 'open';
  return 'open';
}

function isAvailabilityControlToken(value){
  const raw=stripAvailabilityDiacritics(value);
  if(!raw) return false;
  return [
    'true','pravda','1','yes','ano','open','opened','on','active','green','zelena','prijima','prijimam','prijimame',
    'false','nepravda','0','no','nie','off','inactive','vypnute','closed','close','red','cervena','zatvorene','full','busy','neprijimam','neprijima',
    'limited','limit','obmedzene','obmedzena','obmedzeny','holiday','dovolenka','pause','paused','orange','oranzova','oranzove','amber','yellow','zlta'
  ].includes(raw);
}

function defaultAvailabilityLabel(mode,fallbackStatus){
  const normalized=normalizeAvailabilityMode(mode);
  if(normalized==='limited') return 'Obmedzená dostupnosť';
  if(normalized==='closed') return 'Momentálne neprijímam nové projekty';
  return fallbackStatus || 'Clippio aktuálne prijíma nové projekty';
}

function resolveAvailabilityState(rows,fallbackStatus,fallbackText){
  const statusRow=findCmsRow(rows,'availabilityStatus',true);
  const textRow=findCmsRow(rows,'availabilityText',true);
  const modeRow=findCmsRow(rows,'availabilityMode',true) ||
    findCmsRow(rows,'availabilityOpen',true) ||
    findCmsRow(rows,'availabilityState',true) ||
    findCmsRow(rows,'acceptingProjects',true);

  const rawStatus=firstCmsValue(statusRow && statusRow.value,statusRow && statusRow.text,statusRow && statusRow.title);
  const rawDescription=firstCmsValue(textRow && textRow.value,textRow && textRow.text,textRow && textRow.title);
  const rawMode=firstCmsValue(modeRow && modeRow.value,modeRow && modeRow.text,modeRow && modeRow.title);

  const activeMode=statusRow ? normalizeAvailabilityMode(statusRow.active) : '';
  const modeFromModeRow=normalizeAvailabilityMode(rawMode);
  const modeFromStatusValue=isAvailabilityControlToken(rawStatus) ? normalizeAvailabilityMode(rawStatus) : '';

  let mode='';
  // Jednoznačné pravidlá tabuľky:
  // 1) availabilityStatus.active = FALSE vypína prijímanie projektov => červená.
  // 2) availabilityMode.value = limited pri active TRUE/blank => oranžová.
  // 3) availabilityStatus.value je text pri guličke, nie hlavný prepínač, pokiaľ tam nie je iba token open/closed/limited.
  if(activeMode==='closed') mode='closed';
  else if(modeFromModeRow) mode=modeFromModeRow;
  else if(activeMode==='limited') mode='limited';
  else if(modeFromStatusValue) mode=modeFromStatusValue;
  else if(activeMode==='open') mode='open';
  else mode=inferAvailabilityMode(rawStatus,rawDescription) || 'open';

  const normalizedMode=normalizeAvailabilityMode(mode) || 'open';
  const statusText=rawStatus && !isAvailabilityControlToken(rawStatus)
    ? cleanAvailabilityStatusText(rawStatus)
    : defaultAvailabilityLabel(normalizedMode,fallbackStatus);

  return {
    mode:normalizedMode,
    statusText:statusText || defaultAvailabilityLabel(normalizedMode,fallbackStatus),
    bodyText:rawDescription || fallbackText,
    debug:{
      statusRow:statusRow || null,
      textRow:textRow || null,
      modeRow:modeRow || null,
      rawStatus,
      rawDescription,
      rawMode,
      activeMode,
      modeFromModeRow,
      modeFromStatusValue
    }
  };
}

function applyAvailabilityVisualState(root,dot,mode){
  const normalized=normalizeAvailabilityMode(mode) || 'open';
  const palette={
    open:{color:'#30bb78',soft:'rgba(48,187,120,.12)',strong:'rgba(48,187,120,.36)',bg:'linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,255,248,.86))',border:'rgba(48,187,120,.18)',animation:'clippioAvailabilityPulseGreen'},
    closed:{color:'#d94343',soft:'rgba(217,67,67,.12)',strong:'rgba(217,67,67,.36)',bg:'linear-gradient(135deg,rgba(255,255,255,.92),rgba(255,244,244,.86))',border:'rgba(214,57,57,.20)',animation:'clippioAvailabilityPulseRed'},
    limited:{color:'#ff9f1a',soft:'rgba(255,159,26,.16)',strong:'rgba(255,159,26,.42)',bg:'linear-gradient(135deg,rgba(255,255,255,.92),rgba(255,249,235,.88))',border:'rgba(255,159,26,.28)',animation:'clippioAvailabilityPulseAmber'}
  };
  const current=palette[normalized] || palette.open;

  root.classList.remove('availability-open','availability-closed','availability-limited','availability-loading');
  root.classList.add(`availability-${normalized}`);
  root.dataset.availabilityState=normalized;
  root.style.background=current.bg;
  root.style.borderColor=current.border;
  root.style.setProperty('--availability-dot-color',current.color);
  root.style.setProperty('--availability-dot-soft',current.soft);
  root.style.setProperty('--availability-dot-strong',current.strong);

  if(dot){
    dot.style.backgroundColor=current.color;
    dot.style.boxShadow=`0 0 0 5px ${current.soft},0 0 0 0 ${current.strong}`;
    dot.style.animationName=current.animation;
  }
}

function initAvailabilityStatus(){
  const root=document.querySelector('[data-clippio-availability]');
  if(!root) return;

  const statusEl=root.querySelector('[data-availability-status]');
  const textEl=root.querySelector('[data-availability-text]');
  const dot=root.querySelector('.availability-status-dot');
  if(!statusEl||!textEl) return;

  const fallbackStatus=cleanAvailabilityStatusText(statusEl.textContent);
  const fallbackText=textEl.textContent;

  const applyState=(mode,statusText,bodyText)=>{
    const normalized=normalizeAvailabilityMode(mode) || inferAvailabilityMode(statusText,bodyText);
    applyAvailabilityVisualState(root,dot,normalized);
    statusEl.textContent=cleanAvailabilityStatusText(statusText) || fallbackStatus;
    textEl.textContent=bodyText || fallbackText;
  };

  root.classList.add('availability-loading');

  loadClippioCmsRows()
    .then(rows=>{
      const resolved=resolveAvailabilityState(rows,fallbackStatus,fallbackText);
      window.__clippioLastAvailability=resolved;
      applyState(resolved.mode,resolved.statusText,resolved.bodyText);
    })
    .catch(error=>{
      root.classList.add('availability-cms-failed');
      window.__clippioLastAvailabilityError=error && error.message ? error.message : String(error||'CMS failed');
      if(window.console && console.warn) console.warn('Clippio CMS sa nepodarilo načítať:',error);
      applyState('open',fallbackStatus,fallbackText);
    });
}

function initCmsSettings(){
  loadClippioCmsRows().then(rows=>{
    const primaryText=cmsSettingValue(rows,'primaryCtaText');
    const primaryLink=safeAlertLink(cmsSettingValue(rows,'primaryCtaLink'));
    document.querySelectorAll('[data-cms-primary-cta]').forEach(link=>{
      if(primaryText) link.textContent=primaryText;
      if(primaryLink) link.setAttribute('href',primaryLink);
    });

    const floatingText=cmsSettingValue(rows,'floatingCtaText');
    const floatingLink=safeAlertLink(cmsSettingValue(rows,'floatingCtaLink'));
    document.querySelectorAll('.floating-cta').forEach(cta=>{
      const label=cta.querySelector('strong') || cta;
      if(floatingText) label.textContent=floatingText;
      if(floatingLink) cta.setAttribute('href',floatingLink);
    });
  }).catch(()=>{});
}

function initHomeNotice(){
  const root=document.querySelector('[data-clippio-home-notice]');
  if(!root) return;

  const titleEl=root.querySelector('[data-home-notice-title]');
  const textEl=root.querySelector('[data-home-notice-text]');
  const linkEl=root.querySelector('[data-home-notice-link]');

  const hide=()=>{ root.hidden=true; root.classList.remove('is-visible'); };
  hide();

  loadClippioCmsRows().then(rows=>{
    const activeRow=findCmsSetting(rows,'homeNoticeActive');
    if(!activeRow || !isTruthyCmsValue(activeRow.value)) return hide();
    if(!isCmsRowCurrentlyVisible(activeRow)) return hide();

    const titleRow=findCmsSetting(rows,'homeNoticeTitle');
    const textRow=findCmsSetting(rows,'homeNoticeText');
    const dateSource=[activeRow,titleRow,textRow].find(row=>row && (row.startdate || row.enddate));
    if(dateSource && !isCmsRowCurrentlyVisible(dateSource)) return hide();

    const title=cmsSettingValue(rows,'homeNoticeTitle') || 'Dôležitý oznam';
    const textValue=cmsSettingValue(rows,'homeNoticeText');
    const buttonText=cmsSettingValue(rows,'homeNoticeButtonText');
    const buttonLink=safeAlertLink(cmsSettingValue(rows,'homeNoticeButtonLink'));

    if(!textValue && !title) return hide();
    if(titleEl) titleEl.textContent=title;
    if(textEl) textEl.textContent=textValue;

    if(linkEl){
      if(buttonText && buttonLink){
        linkEl.textContent=buttonText;
        linkEl.href=buttonLink;
        linkEl.hidden=false;
      }else{
        linkEl.hidden=true;
        linkEl.removeAttribute('href');
      }
    }

    root.hidden=false;
    window.requestAnimationFrame(()=>root.classList.add('is-visible'));
  }).catch(hide);
}

function initClippioAlerts(){
  const root=document.querySelector('[data-clippio-alerts]');
  if(!root) return;

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

  const pickAlert=(rows)=>{
    const current=getCmsUpdateRows(rows).map(row=>({
      title:firstCmsValue(row.title,row.value),
      message:firstCmsValue(row.text,row.value),
      buttonText:firstCmsValue(row.buttontext),
      buttonLink:firstCmsValue(row.buttonlink),
      priority:firstCmsValue(row.priority,'normal'),
      startDateObj:parseAlertDate(row.startdate,false),
      endDateObj:parseAlertDate(row.enddate,true),
      createdAtObj:parseAlertDate(cmsRowDateValue(row),false),
      order:cmsOrderValue(row)
    }));

    current.sort((a,b)=>{
      const pa=String(a.priority||'').toLowerCase()==='high'?1:0;
      const pb=String(b.priority||'').toLowerCase()==='high'?1:0;
      if(pa!==pb) return pb-pa;
      const bd=b.createdAtObj?b.createdAtObj.getTime():0;
      const ad=a.createdAtObj?a.createdAtObj.getTime():0;
      if(bd!==ad) return bd-ad;
      return a.order-b.order;
    });
    return current[0]||null;
  };

  setPanelState('loading',null);
  loadClippioCmsRows()
    .then(rows=>{
      activeAlert=pickAlert(rows);
      setPanelState('ready',activeAlert);
    })
    .catch(()=>{
      activeAlert=null;
      setPanelState('error',null);
    });
}

function initCookieConsent(){
  if(localStorage.getItem(CLIPPIO_COOKIE_CONSENT_KEY)) return;
  const banner=document.createElement('div');
  banner.className='cookie-banner show';
  document.body.classList.add('cookie-banner-visible');
  banner.innerHTML=`<div class="cookie-inner"><div class="cookie-text"><strong>Cookies na Clippio.sk</strong><p>Používame nevyhnutné cookies pre fungovanie webu. Analytické cookies pomáhajú merať návštevnosť cez Google Analytics a vložený obsah z YouTube môže používať vlastné cookies.</p><div class="cookie-panel" id="cookie-panel"><label class="cookie-option"><input type="checkbox" checked disabled> Nevyhnutné cookies <span>– potrebné pre základné fungovanie webu.</span></label><label class="cookie-option"><input type="checkbox" id="cookie-analytics"> Analytické cookies <span>– meranie návštevnosti a zlepšovanie webu.</span></label><label class="cookie-option"><input type="checkbox" id="cookie-media"> Mediálne cookies <span>– vložený obsah, napríklad YouTube.</span></label></div></div><div class="cookie-actions"><button class="settings" type="button" id="cookie-settings">Nastavenia</button><button type="button" id="cookie-necessary">Len nevyhnutné</button><button class="accept" type="button" id="cookie-accept">Prijať všetko</button></div></div>`;
  document.body.appendChild(banner);
  const save=(data)=>{localStorage.setItem(CLIPPIO_COOKIE_CONSENT_KEY,JSON.stringify(data));banner.classList.remove('show');document.body.classList.remove('cookie-banner-visible');document.dispatchEvent(new CustomEvent('clippioConsent',{detail:data}));};
  const panel=banner.querySelector('#cookie-panel');
  banner.querySelector('#cookie-settings').addEventListener('click',()=>panel.classList.toggle('open'));
  banner.querySelector('#cookie-necessary').addEventListener('click',()=>save({necessary:true,analytics:false,media:false,date:new Date().toISOString()}));
  banner.querySelector('#cookie-accept').addEventListener('click',()=>{
    save({necessary:true,analytics:true,media:true,date:new Date().toISOString()});
    clippioTrackEvent('analytics_consent_accept',{event_category:'consent'});
  });
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

function initClickTracking(){
  document.addEventListener('click',event=>{
    const target=event.target && event.target.closest ? event.target : null;
    if(!target) return;

    const clickable=target.closest('a,button,label,[data-step-indicator],[data-finder-copy]');
    if(!clickable || clickable.closest('.cookie-banner')) return;

    const link=clickable.closest('a');
    const href=link ? link.getAttribute('href') || '' : '';
    const payload={
      event_category:'click',
      click_text:clippioTrackingText(clickable),
      click_url:href,
      click_section:clippioTrackingSection(clickable)
    };

    if(clickable.closest('[data-clippi-root]') || clickable.hasAttribute('data-clippi-open')){
      const actionEl=clickable.closest('[data-clippi-action]');
      payload.event_category='clippi';
      payload.clippi_action=clickable.hasAttribute('data-clippi-open') ? 'open' : (actionEl ? actionEl.getAttribute('data-clippi-action') : 'click');
      payload.clippi_answer_index=actionEl && actionEl.hasAttribute('data-option-index') ? actionEl.getAttribute('data-option-index') : '';
      clippioTrackEvent('clippi_click',payload);
      return;
    }

    const webFinderArea=clickable.closest('[data-web-finder],.web-finder-strip,.web-advisor-teaser,.wf-page,.wf-send');
    const opensWebFinder=href && href.indexOf('/web-finder/')!==-1;
    if(webFinderArea || opensWebFinder){
      payload.event_category='web_finder';
      payload.web_finder_action=clickable.matches('label') ? 'answer_select' :
        (clickable.hasAttribute('data-finder-back') ? 'back' :
        (clickable.hasAttribute('data-step-indicator') ? 'step_indicator' :
        (clickable.hasAttribute('data-finder-copy') ? 'copy_result' :
        (opensWebFinder ? 'open' : 'click'))));
      const input=clickable.querySelector ? clickable.querySelector('input[type="radio"]') : null;
      if(input){
        payload.web_finder_question=input.name || '';
        payload.web_finder_value=input.value || '';
      }
      clippioTrackEvent('web_finder_click',payload);
      return;
    }

    const cta=clickable.closest('.floating-cta,.nav-cta,.btn,.mini-btn,.price-btn,.form-btn,.package-detail-link,.service-link,.card-actions a,.web-project-card a,.footer-email');
    if(cta){
      payload.event_category='cta';
      payload.cta_type=cta.className ? cleanTrackingValue(cta.className,100) : cta.tagName.toLowerCase();
      clippioTrackEvent('cta_click',payload);
    }
  });

  document.addEventListener('submit',event=>{
    const form=event.target && event.target.closest ? event.target.closest('form') : null;
    if(!form || !String(form.action||'').includes('api.web3forms.com/submit')) return;
    const subject=form.querySelector('[name="subject"]');
    clippioTrackEvent('lead_form_submit_attempt',{
      event_category:'form',
      form_subject:subject ? cleanTrackingValue(subject.value,120) : '',
      form_section:clippioTrackingSection(form)
    });
  },true);
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
          clippioTrackEvent('lead_form_submit_success',{
            event_category:'form',
            form_subject:data.get('subject') || '',
            form_section:clippioTrackingSection(form)
          });
          showThankYouModal();
        }else{
          const serverMessage=result.message ? String(result.message) : 'Formulár sa nepodarilo odoslať.';
          throw new Error(serverMessage);
        }
      }catch(error){
        clippioTrackEvent('lead_form_submit_error',{
          event_category:'form',
          form_section:clippioTrackingSection(form)
        });
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
  const footer=root.querySelector('[data-finder-footer]');
  const stepContent=root.querySelector('.finder-step-content');
  const progressBar=root.querySelector('[data-finder-progress]');
  const progressText=root.querySelector('[data-finder-progress-text]');
  const currentStepLabel=root.querySelector('[data-finder-current-step-label]');
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
    if(!label) return checked.value;
    const titleEl=label.querySelector('.wf-option-title');
    return titleEl ? titleEl.textContent.replace(/\s+/g,' ').trim() : label.textContent.replace(/\s+/g,' ').trim();
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
    const activeStep=steps.find(step=>Number(step.dataset.finderStep||0)===currentStep);
    if(stepContent && activeStep){
      window.requestAnimationFrame(()=>{
        if(stepContent.classList.contains('wf-question-stage')){
          stepContent.style.height='auto';
        }else{
          stepContent.style.height=`${activeStep.offsetHeight}px`;
        }
      });
    }
    if(progressBar){
      const progress=completed ? 100 : Math.max(1,Math.round((currentStep/totalSteps)*100));
      progressBar.style.width=`${progress}%`;
    }
    if(progressText){
      progressText.textContent=completed ? 'Dokončené' : `Krok ${currentStep} z ${totalSteps}`;
    }
    if(currentStepLabel && activeStep){
      const legend=activeStep.querySelector('legend');
      currentStepLabel.textContent=completed ? 'Odporúčanie je pripravené' : (legend ? legend.textContent.trim() : 'Výber webu');
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
    if(footer){
      footer.hidden=currentStep===1 && !completed;
      footer.classList.toggle('spread',currentStep!==1);
      footer.classList.toggle('end',currentStep===1);
    }
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

  let autoAdvanceTimer=null;

  const scheduleAutoAdvance=()=>{
    if(autoAdvanceTimer) window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer=window.setTimeout(()=>{
      if(currentStep<totalSteps){
        goToStep(currentStep+1);
      }else{
        finishFinder();
      }
    },140);
  };

  const refreshFinderAfterSelection=()=>{
    completed=false;
    calculate();
    updateStepper(0);
    updateOptionStyles();
    scheduleAutoAdvance();
  };

  const finishFinder=()=>{
    completed=true;
    calculate();
    updateStepper(1);
    if(window.matchMedia('(max-width: 980px)').matches && resultCard){
      resultCard.scrollIntoView({behavior:'smooth',block:'start'});
    }
  };

  root.querySelectorAll('input[type="radio"]').forEach(input=>input.addEventListener('change',refreshFinderAfterSelection));

  root.querySelectorAll('.finder-step label').forEach(label=>label.addEventListener('click',()=>{
    const input=label.querySelector('input[type="radio"]');
    if(!input) return;
    window.setTimeout(()=>{
      if(input.checked) refreshFinderAfterSelection();
    },0);
  }));

  indicators.forEach(indicator=>indicator.addEventListener('click',()=>{
    goToStep(indicator.dataset.stepIndicator);
  }));

  if(backBtn){
    backBtn.addEventListener('click',()=>{
      if(currentStep>1) goToStep(currentStep-1);
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
  initCmsSettings();
  initHomeNotice();
  initClippioAlerts();
  initUpdates();
  initPhotoPrices();
  initWebProjects();
  initCookieConsent();
  initFaq();
  initReveal();
  initFloatingCta();
  initClickTracking();
  initWeb3Forms();
  initReactBitsTextEffects();
  initWebFinder();
});
