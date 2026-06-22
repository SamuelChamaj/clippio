document.addEventListener('DOMContentLoaded',()=>{
  const burger=document.querySelector('.burger'); const links=document.querySelector('.links');
  if(burger&&links){burger.addEventListener('click',()=>links.classList.toggle('open')); links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')))}
  const box=document.getElementById('updates-list');
  if(!box) return;
  const url='https://docs.google.com/spreadsheets/d/1SaqFBIfwYhrTbSzLGQW-mK2BPK2dgUZR9QolSdxKot4/gviz/tq?tqx=out:csv';
  const fallback=[
    {date:'11.06.2026',title:'Nový web Clippio',text:'Spustená nová prezentácia služieb, portfólia a kontaktného dopytu.'},
    {date:'10.06.2026',title:'Dronové zábery a eventy',text:'Pribúdajú ukážky z podujatí, miest a krátkych promo videí.'},
    {date:'09.06.2026',title:'Grafika a video pod jednou značkou',text:'Clippio spája videoprodukciu, dron a vizuálnu identitu.'}
  ];
  const esc=v=>String(v||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const parseLine=line=>{let a=[],c='',q=false;for(let i=0;i<line.length;i++){let ch=line[i],n=line[i+1];if(ch==='"'&&q&&n==='"'){c+='"';i++}else if(ch==='"')q=!q;else if(ch===','&&!q){a.push(c.trim());c=''}else c+=ch}a.push(c.trim());return a};
  const render=items=>{box.innerHTML=items.filter(x=>x.title||x.text).slice(0,5).map(x=>`<article class="update-card"><div class="update-date">${esc(x.date||'Novinka')}</div><div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></article>`).join('')||'<p>Žiadne novinky.</p>'};
  fetch(url).then(r=>{if(!r.ok)throw Error();return r.text()}).then(t=>{const rows=t.trim().split(/\r?\n/).slice(1).map(parseLine);render(rows.map(c=>({date:c[0],title:c[2]||c[1],text:c[3]||c[2]})).reverse())}).catch(()=>render(fallback));
});

document.addEventListener('DOMContentLoaded',()=>{
  const rowsBox=document.getElementById('photo-price-rows');
  const status=document.getElementById('price-status');
  if(!rowsBox) return;
  const url='https://docs.google.com/spreadsheets/d/1Un2kgEMQ2jxUuFsdzAhXkSab8Z0hJ41qsATHA6Ojdig/gviz/tq?tqx=out:csv';
  const esc=v=>String(v||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const parseLine=line=>{let a=[],c='',q=false;for(let i=0;i<line.length;i++){let ch=line[i],n=line[i+1];if(ch==='"'&&q&&n==='"'){c+='"';i++}else if(ch==='"')q=!q;else if(ch===','&&!q){a.push(c.trim());c=''}else c+=ch}a.push(c.trim());return a};
  fetch(url).then(r=>{if(!r.ok)throw Error();return r.text()}).then(t=>{
    const lines=t.trim().split(/\r?\n/).filter(Boolean);
    const data=lines.slice(1).map(parseLine).filter(c=>c[0]&&c[1]);
    if(!data.length) throw Error();
    rowsBox.innerHTML=data.map(c=>`<tr><td>${esc(c[0])}</td><td>${esc(c[1])}</td><td>${esc(c[2]||'')}</td></tr>`).join('');
    if(status) status.textContent='Aktuálne ceny vytlačených fotiek.';
  }).catch(()=>{ if(status) status.textContent='Zobrazujem základné ceny. Aktuálne ceny sa dajú upraviť v cenníku.'; });
});
