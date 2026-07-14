# Changelog

## v7.1.0 – reference-led visual direction and content correction

- Hero bol prerobený podľa dodanej vizuálnej referencie: približne 7/5 kompozícia, trojriadkový nadpis, dvojica CTA, faktická cenová karta a klasifikovaný projektový marquee.
- Homepage má presne požadované poradie: hero, tri hlavné služby, vybrané projekty, ceny, proces, O Samuelovi/Clippio, FAQ, dopyt a pätička.
- Hlavné služby sú iba Webové stránky, E-shopy a objednávkové weby a Natáčanie a spracovanie videí. Fotografia, grafika a dron zostávajú menšie podporné schopnosti.
- Do lokálnych assetov boli doplnené pravdivé náhľady RCHbau a jednoznačne označených modelových projektov FreshCar, STAVEXON a Liora.
- Cenník používa ceny Štart web od 199 €, Firemný web od 499 € a E-shop od 999 € bez zmeny a bez vymyslených metrík.
- Plávajúce CTA a Clippi sa zobrazia iba v bezpečnej zóne pätičky, aby neprekrývali obsah, formuláre ani cookie prvky.
- Zachované zostali formuláre Web3Forms, Google Sheets, Web Finder, Clippi, cookie consent, analytika, právne stránky, SEO súbory a GitHub Pages kompatibilita.

## v6.6.1 – Floating CTA mobile cleanup
- Posunute plavajuce CTA tlacidla nizsie, aby menej prekrývali obsah v pravej spodnej casti.
- Mobilny Clippi button zobrazuje kratsi text „Potrebujete pomôcť?“ namiesto dlhého desktopového textu.
- Text plavajuceho kontaktneho CTA zmeneny z „Nezáväzná ponuka“ na presnejsi „Nezáväzný dopyt“; na mobile sa skracuje na „Dopyt“.
- Cache verzie hlavných stránok posunuté na `v=6.6.1`.

﻿## v6.6.1 â€“ Clippi Light Helper
- Napojena publikovana Google Sheets CMS tabulka pre homepage dostupnost, CTA, homepage oznam a novinky.
- Dostupnost teraz cita aktivne riadky `availabilityStatus`, `availabilityText` a `availabilityMode`; `open`/`true` je zelena, `limited` oranzova a `closed`/`false` cervena.
- Pri `availabilityStatus` vie farbu bodky prepnut aj stlpec `active`: `TRUE` zelena, `FALSE` cervena, `limited` oranzova.
- Novinky na homepage sa citaju zo sekcie `updates` rovnakej tabulky a respektuju `active`, `startDate`, `endDate` a `order`.
- Doplnene CMS riadenie hlavneho CTA, plavajuceho CTA a volitelneho homepage oznamu.
- PridanĂ˝ Clippi Light Helper ako riadenĂ˝ digitĂˇlny konzultant, nie voÄľnĂ˝ AI chatbot.
- DoplnenĂ© novĂ© sĂşbory `/assets/js/clippi-config.js`, `/assets/js/clippi.js` a `/assets/css/clippi.css`.
- Clippi obsahuje otĂˇzky pre webovĂ© strĂˇnky, video tvorbu, fotografovanie, dron zĂˇbery, grafiku, kombinĂˇcie sluĹľieb a nejasnĂ© zadania.
- PridanĂ© jednoduchĂ© scoring pravidlĂˇ, odporĂşÄŤanĂˇ sluĹľba, dĂ´vod odporĂşÄŤania, orientaÄŤnĂ˝ cenovĂ˝ rozsah a ÄŹalĹˇĂ­ krok.
- WebovĂ© odpovede ponĂşkajĂş preklik na existujĂşci `/web-finder/` a ukladajĂş `clippi_service`, `clippi_goal`, `clippi_budget` a `clippi_source` do localStorage.
- DopytovĂ˝ formulĂˇr v paneli pouĹľĂ­va existujĂşci Web3Forms endpoint z kontaktnĂ©ho formulĂˇra.
- DoplnenĂ˝ vlastnĂ˝ avatar Clippiho v `/assets/images/clippi-avatar.png` a pouĹľitĂ˝ v plĂˇvajĂşcom tlaÄŤidle, hlaviÄŤke panela, Ăşvodnej bubline a vĂ˝sledkovej karte.
- PridanĂˇ desktopovĂˇ uvĂ­tacia bublina s krĂˇtkym oneskorenĂ­m, ruÄŤnĂ˝m zatvorenĂ­m a 24-hodinovĂ˝m zapamĂ¤tanĂ­m zatvorenia cez localStorage.
- PlĂˇvajĂşce tlaÄŤidlo Clippiho je posunutĂ© nad existujĂşce dopytovĂ© CTA aj pri cookie liĹˇte, vrĂˇtane mobilnej poistky proti prekrytiu.
- OdosielanĂ˝ dopyt teraz obsahuje skrytĂ˝ `clippi_summary` s vybranou hlavnou sluĹľbou, vĹˇetkĂ˝mi otĂˇzkami a odpoveÄŹami, odporĂşÄŤanĂ­m, cenovĂ˝m rozsahom, zdrojovou strĂˇnkou a dĂˇtumom.
- DoplnenĂ© consent-based meranie klikov na CTA, Web Finder, Clippiho a odoslania formulĂˇrov cez udalosti `cta_click`, `web_finder_click`, `clippi_click` a `lead_form_submit_*`.
- SkrĂˇtenĂ© vybranĂ© obchodnĂ© texty na homepage, strĂˇnke tvorby webov, cennĂ­ku a kontakte, aby web pĂ´sobil rĂ˝chlejĹˇie a viac dopytovo.
- AktualizovanĂ© strĂˇnky Cookies a Ochrana osobnĂ˝ch Ăşdajov o meranie obchodnĂ˝ch klikov bez ukladania obsahu sprĂˇv.
- Helper je napojenĂ˝ na hlavnĂ© strĂˇnky Clippio webu bez zĂˇsahu do demo webov.
- Cache verzie hlavnĂ˝ch strĂˇnok posunutĂ© na `v=6.6.1`.

## v6.5.6 â€“ Web Finder vĂ˝sledok aĹľ po otĂˇzkach
- VĂ˝sledkovĂ˝ panel sa uĹľ nezobrazuje priebeĹľne poÄŤas vĂ˝beru.
- OdporĂşÄŤanie sa otvorĂ­ aĹľ po dokonÄŤenĂ­ poslednĂ©ho kroku a kliknutĂ­ na â€žZobraziĹĄ odporĂşÄŤanieâ€ś.
- Pri nĂˇvrate spĂ¤ĹĄ alebo zmene odpovede sa vĂ˝sledok znovu skryje, aby nepĂ´sobil ako priebeĹľnĂ© odporĂşÄŤanie.
- Cache verzia Web Finder strĂˇnky zvĂ˝ĹˇenĂˇ na `v=6.5.6`.

## v6.5.5 â€“ Web Finder bez modrĂ©ho pozadia
- OdstrĂˇnenĂ© tmavĂ© modrĂ© pozadie hlavnĂ©ho Web Finder panelu.
- ZachovanĂ© Brandas-inĹˇpirovanĂ© usporiadanie, ale prefarbenĂ© do svetlĂ©ho Clippio ĹˇtĂ˝lu.
- Stepper, vĂ˝sledok a cenovĂ˝ odhad ostali funkÄŤne nezmenenĂ©.

## v6.5.4 â€“ Web Finder usporiadanie podÄľa Brandas smeru
- Web Finder dostal kompaktnejĹˇie dvojstÄşpcovĂ© rozloĹľenie inĹˇpirovanĂ© strĂˇnkou Brandas, ale bez 1:1 kopĂ­rovania.
- PostupovĂˇ tabuÄľka ostĂˇva zachovanĂˇ, no je vloĹľenĂˇ do tmavĹˇieho poradenskĂ©ho panelu s ÄŤistejĹˇĂ­m rozloĹľenĂ­m otĂˇzok a vĂ˝sledku.
- VĂ˝sledkovĂ˝ panel je vizuĂˇlne sĂşÄŤasĹĄou jednĂ©ho rozhrania, nie odtrhnutĂˇ karta mimo kompozĂ­cie.
- UpravenĂ© breakpointy, aby sa na uĹľĹˇĂ­ch obrazovkĂˇch nerozĹĄahoval stepper a vĂ˝sledok neodchĂˇdzal mimo viewport.
- Cache verzia Web Finder strĂˇnky zvĂ˝ĹˇenĂˇ na `v=6.5.4`.

## v6.5.3 â€“ Web Finder poradca + odhad ceny
- Web Finder rozĹˇĂ­renĂ˝ na 6 krokov: cieÄľ, rozsah, obsah, rozpoÄŤet, funkcie a prĂ­stup.
- VĂ˝sledok teraz odporĂşÄŤa zĂˇkladnĂ˝ balĂ­k, najlacnejĹˇiu rozumnĂş cestu, doplnkovĂ© sluĹľby, ÄŤo zatiaÄľ neplatiĹĄ a kedy uĹľ dĂˇva zmysel web na mieru.
- DoplnenĂ˝ orientaÄŤnĂ˝ vĂ˝poÄŤet ceny: zĂˇklad balĂ­ka + odhad doplnkov + poznĂˇmka, Ĺľe nejde o finĂˇlnu cenovĂş ponuku.
- OpravenĂ© rozhranie Web Finderu tak, aby strĂˇnka pĂ´sobila viac ako poradca a menej ako obyÄŤajnĂ˝ formulĂˇr.
- Cache verzia Web Finder strĂˇnky zvĂ˝ĹˇenĂˇ na `v=6.5.3`.

## v6.5.2 â€“ Web Finder presnĂˇ postupovĂˇ tabuÄľka
- Web Finder krokovĂ˝ vĂ˝ber je vizuĂˇlne prerobenĂ˝ presne podÄľa dodanĂ©ho Stepper vzoru.
- Stepper karta pouĹľĂ­va `outer-container`, `step-circle-container`, kruhovĂ© indikĂˇtory, spojnice, aktĂ­vnu bodku a fajku dokonÄŤenĂ˝ch krokov.
- Doplnil sa presnejĹˇĂ­ fialovĂ˝ akcent `#5227ff`, Ăşzka postupovĂˇ karta a vĂ˝ĹˇkovĂ© sprĂˇvanie obsahu podÄľa aktĂ­vneho kroku.
- ZachovanĂˇ je statickĂˇ HTML/CSS/JS implementĂˇcia pre GitHub Pages bez React buildu.


## v6.5.1 â€“ Web Finder stepper UI
- Web Finder prerobenĂ˝ na krokovĂ˝ stepper podÄľa dodanĂ©ho nĂˇvrhu: indikĂˇtory krokov, spĂ¤ĹĄ/pokraÄŤovaĹĄ, finĂˇlne odporĂşÄŤanie.
- ZachovanĂˇ statickĂˇ HTML/JS kompatibilita pre GitHub Pages bez React buildu.
- VĂ˝sledok sa stĂˇle automaticky vkladĂˇ do dopytovĂ©ho formulĂˇra.
- Cache verzia Web Finder strĂˇnky zvĂ˝ĹˇenĂˇ na `v=6.5.1`.

## v7.0.0 – complete light premium redesign

- Nová informačná architektúra: Weby, E-shopy, Video, Portfólio, Cenník, O Clippio a jednotné CTA Získať ponuku.
- Pridaná samostatná SEO landing page `/eshopy/`.
- Homepage, hlavné služby, cenník, portfólio, kontakt a O Clippio boli kompletne prepracované v svetlom modro-fialovom dizajne.
- Ceny Štart web 199 €, Firemný web 499 € a E-shop 999 € sú centralizované v `assets/js/pricing.js` a použité vo Web Finderi aj Clippim.
- Zachované Web3Forms, Google Sheets CMS, dynamické ceny fotiek, dynamické portfólio, cookie consent, consent-based analytika, Web Finder, Clippi, čisté URL, právne stránky a deployment na GitHub Pages.
- Portfólio jasne oddeľuje reálny klientsky projekt, vlastné projekty, obsahovú prácu a modelové ukážky.
- Doplnené prístupné mobilné menu, focus trap a návrat focusu pri úspešnom dialógu, reduced-motion režim a pravidlá proti prekrývaniu plávajúcich prvkov.
- Aktualizované metadáta, structured data, sitemap, `llms.txt` a README.

## v6.5.0 â€“ Clippio Web Finder
- PridanĂˇ novĂˇ podstrĂˇnka `/web-finder/` s interaktĂ­vnym vĂ˝berom vhodnĂ©ho webovĂ©ho balĂ­ka.
- Web Finder odporĂşÄŤa Ĺ tart, Rast, Predaj/e-shop alebo individuĂˇlne rieĹˇenie podÄľa cieÄľa, rozsahu, obsahu, rozpoÄŤtu a zloĹľitosti.
- VĂ˝sledok obsahuje dĂ´vody odporĂşÄŤania, rizikĂˇ a ÄŹalĹˇie kroky.
- DoplnenĂ˝ formulĂˇr, ktorĂ˝ automaticky preberĂˇ vĂ˝sledok Web Finderu do dopytu cez Web3Forms.
- DoplnenĂ© CTA odkazy z homepage a strĂˇnky Tvorba webov.
- DoplnenĂ© ĹˇtĂ˝ly a JavaScript pre Web Finder.
- AktualizovanĂ˝ sitemap a cache verzie na upravenĂ˝ch strĂˇnkach na `v=6.5.0`.

# v6.4.1 â€“ DynamickĂˇ dostupnosĹĄ cez Google Sheets

- PridanĂ© napojenie sekcie â€žAktuĂˇlna dostupnosĹĄâ€ś na Google Sheets CMS CSV.
- StavovĂ˝ bod sa menĂ­ podÄľa hodnoty `availabilityMode` / `availabilityOpen`:
  - `TRUE` / `open` = zelenĂ˝ pulz
  - `FALSE` / `closed` = ÄŤervenĂ˝ pulz
  - `limited` / `dovolenka` = ĹľltĂ˝ pulz
- Text dostupnosti sa dĂˇ meniĹĄ cez `availabilityStatus`.
- Popis dostupnosti sa dĂˇ meniĹĄ cez `availabilityText`.
- OdstrĂˇnenĂˇ potreba dĂˇvaĹĄ zelenĂ˝ emoji priamo do textu.
- Cache verzia hlavnej strĂˇnky navĂ˝ĹˇenĂˇ na `v=6.4.1`.

## v6.4.0 â€“ portfĂłlio a referencie

- PrepracovanĂˇ sekcia referenciĂ­ na hlavnej strĂˇnke na jasnejĹˇĂ­ dĂ´kazovĂ˝ systĂ©m.
- PridanĂ© case studies do portfĂłlia: klientsky web, vlastnĂ˝ systĂ©m, obsah/grafika a modelovĂ© weby.
- Projekty sĂş rozlĂ­ĹˇenĂ© podÄľa dĂ´kazovej sily: klientskĂˇ realizĂˇcia, vlastnĂ˝ projekt, ukĂˇĹľka alebo externĂ© portfĂłlio.
- DoplnenĂ˝ dĂ´kazovĂ˝ Ĺˇtandard: bez vymyslenĂ˝ch percent a bez mieĹˇania ukĂˇĹľok s klientskymi realizĂˇciami.
- AktualizovanĂ© cache verzie na `v=6.4.0` pre upravenĂ© strĂˇnky.

## v6.1.27 â€“ odstrĂˇnenie duplicitnĂ©ho redirect sĂşboru

- OdstrĂˇnenĂ˝ koreĹovĂ˝ sĂşbor `o-clippio.html`, aby nevznikala duplicitnĂˇ HTML strĂˇnka k `/o-clippio/`.
- Legacy presmerovanie `/o-clippio.html` je rieĹˇenĂ© cez `404.html` bez samostatnĂ©ho duplicitnĂ©ho sĂşboru.
- AktualizovanĂˇ cache verzia assetov na `v=6.1.27`.


## v6.1.26 â€“ pricing and trust cleanup
- Ĺ tart web updated to 199 â‚¬ across web packages and function demo.
- Homepage proof section now shows clearer package-based examples: Rast, Ĺ tart and e-shop.
- CennĂ­k separates web packages from smaller creative services more clearly.
- AI wording reduced and reframed around modern tools plus manual quality control.
- Added legacy redirect for `/o-clippio.html` to `/o-clippio/`.

## v6.1.25 â€“ SEO/cache cleanup po oprave liĹˇty

- ZjednotenĂ© cache verzie CSS/JS na `6.1.25` vo vĹˇetkĂ˝ch hlavnĂ˝ch HTML sĂşboroch.
- DoplnenĂ˝ canonical a robots meta pre `/clippio-function-web/`.
- PridanĂ˝ `/ukazkovy-web-start/` do hlavnĂ©ho sitemap.xml, keÄŹĹľe sa naĹ odkazuje z webu aj portfĂłlia.
- OdstrĂˇnenĂ˝ nepouĹľĂ­vanĂ˝ starĂ˝ JS marquee fallback, aby sa uĹľ nemieĹˇal s novou `service-marquee` liĹˇtou.
- `noindex` ostĂˇva iba na technickĂ˝ch strĂˇnkach `404.html` a `/dakujeme/`, ktorĂ© nemajĂş byĹĄ v indexe.


## v6.1.22 â€“ Function Web static fix

- Clippio Function Web bol nahradenĂ˝ stabilnou statickou verziou bez React/Vite buildu.
- OpravenĂ© relatĂ­vne asset cesty pre GitHub Pages.
- PridanĂ© funkÄŤnĂ© prepĂ­nanie pozadĂ­, shiny text, typewriter, CountUp, accordion, tabs, formulĂˇr, spotlight a nekoneÄŤnĂ˝ pĂˇs.
- OdstrĂˇnenĂ© starĂ© nepouĹľĂ­vanĂ© build chunk sĂşbory z ukĂˇĹľky funkciĂ­.

# Changelog

## v6.1.20
- OpravenĂ© vypnutĂ© React Bits textovĂ© efekty: shiny text, gradient text a rotujĂşce slovĂˇ sĂş znovu aktĂ­vne.
- AktualizovanĂ˝ cache query parameter na `v=6.1.20`.

## v6.1.19
- OpravenĂˇ nekoneÄŤnĂˇ liĹˇta sluĹľieb na hlavnej strĂˇnke.
- LiĹˇta mĂˇ teraz pevne oddelenĂ© dve rovnakĂ© skupiny a animuje sa cez `translate3d(-50%, 0, 0)`, takĹľe plynulo pokraÄŤuje bez statickĂ©ho zalomenia.
- AktualizovanĂ˝ cache query parameter na `v=6.1.19`.

## v6.1.17 â€“ Function Web improvement pass

- PrepracovanĂ˝ `clippio-function-web` z ĹĄaĹľĹˇieho React/Vite buildu na jednoduchĂş statickĂş HTML/CSS/JS ukĂˇĹľku vhodnĂş pre GitHub Pages.
- PridanĂ˝ obchodnejĹˇĂ­ hero blok: funkcie sĂş prezentovanĂ© podÄľa problĂ©mu, ktorĂ˝ rieĹˇia, nie ako nĂˇhodnĂˇ galĂ©ria efektov.
- Doplnil sa celostrĂˇnkovĂ˝ prepĂ­naÄŤ vizuĂˇlneho reĹľimu: Clean Light, Liquid Glass, Blue Gradient, Dark Premium a Warm Accent.
- KatalĂłg funkciĂ­ mĂˇ filtre podÄľa pouĹľitia: vizuĂˇl, text, interakcie a predaj.
- ZachovanĂ© sĂş jasnĂ© odkazy spĂ¤ĹĄ na Clippio, tvorbu webov, portfĂłlio a kontakt.
- OdstrĂˇnenĂ© starĂ© hashovanĂ© Vite assety vo Function Webe a ponechanĂ© iba produkÄŤnĂ© sĂşbory potrebnĂ© pre tĂşto ukĂˇĹľku.
- PridanĂ© stabilnejĹˇie mobilnĂ© sprĂˇvanie, `prefers-reduced-motion` a jednoduchĹˇie reveal animĂˇcie.

## v6.1.16 â€“ smoothness performance pass

- VypnutĂˇ nekoneÄŤnĂˇ pohybujĂşca sa liĹˇta, ktorĂˇ mohla opticky sekaĹĄ.
- OdstrĂˇnenĂ˝ ĹĄaĹľkĂ˝ `backdrop-filter` zo sticky/fixed prvkov.
- OdÄľahÄŤenĂ© veÄľkĂ© tiene na kartĂˇch a CTA blokoch.
- Na mobile vypnutĂ© scroll reveal animĂˇcie pre stabilnejĹˇĂ­ pohyb.
- SkrĂˇtenĂ© reveal prechody a znĂ­ĹľenĂ˝ stagger delay.
- VypnutĂ˝ automatickĂ˝ CTA pulz / pripomienka poÄŤas scrollu.
- OptimalizovanĂ© veÄľkĂ© ikony a favicony.
- AktualizovanĂ˝ cache-busting CSS/JS na v6.1.16.

## v6.1.15 â€“ clean URL cleanup

- OdstrĂˇnenĂ© koreĹovĂ© `.html` presmerovania, ktorĂ© duplikovali prieÄŤinkovĂ© URL.
- ZachovanĂ© ÄŤistĂ© URL cez prieÄŤinky s `index.html`.
- SkontrolovanĂ© a ponechanĂ© internĂ© odkazy smerujĂşce na ÄŤistĂ© cesty typu `/weby/`, `/portfolio/`, `/kontakt/`.
- AktualizovanĂ˝ cache-busting CSS/JS na v6.1.15.
- README upravenĂ© podÄľa ÄŤistejĹˇej ĹˇtruktĂşry deployu.

## v6.1.14 â€“ file cleanup & deployment cleanup

- OdstrĂˇnenĂ© nepouĹľĂ­vanĂ© duplicitnĂ© assety zo starĹˇej ĹˇtruktĂşry `assets/`.
- VyÄŤistenĂ˝ `clippio-function-web` od zdrojovĂ©ho Vite projektu, `package` sĂşborov, duplicitnĂ©ho `dist/` a starĂ˝ch build assetov.
- OdstrĂˇnenĂ© internĂ© README/poznĂˇmkovĂ© sĂşbory v podprieÄŤinkoch, ktorĂ© nie sĂş potrebnĂ© pre verejnĂ˝ web.
- ZachovanĂ© `.html` presmerovania kvĂ´li starĹˇĂ­m odkazom a bezpeÄŤnej spĂ¤tnej kompatibilite.
- Bez zĂˇsahu do dizajnu, HTML obsahu, formulĂˇrov a produkÄŤnĂ˝ch CSS/JS sĂşborov.

## v6.1.13 â€“ animation cleanup & consistency update

- ZjednotenĂ© animĂˇcie na pokojnĂ˝ fade-up systĂ©m s kratĹˇĂ­m posunom a jednotnĂ˝m easingom.
- UpravenĂ© hover efekty kariet, portfĂłlia, ukĂˇĹľkovĂ˝ch webov, referenciĂ­ a CTA tlaÄŤidiel.
- ZlepĹˇenĂ© mobilnĂ© menu: jednoduchĂ˝ opacity + translateY prechod a stabilnejĹˇĂ­ hamburger.
- ZnĂ­ĹľenĂˇ intenzita animĂˇciĂ­ na mobile a odstrĂˇnenĂ© ruĹˇivĂ© priebeĹľnĂ© textovĂ© animĂˇcie.
- ZjednotenĂ˝ spacing sekciĂ­, radius, tiene a sprĂˇvanie hlavnĂ˝ch kariet.
- UpravenĂ© referencie do ĹˇtruktĂşry klient/projekt, ÄŤo sa rieĹˇilo, ÄŤo bolo dodanĂ© a praktickĂ˝ prĂ­nos.
- UpravenĂ˝ katalĂłg ukĂˇĹľkovĂ˝ch webov do obchodnejĹˇej a kratĹˇej podoby.
- DoplnenĂˇ podpora `prefers-reduced-motion` pre prĂ­stupnosĹĄ.
- AktualizovanĂ˝ cache-busting CSS/JS verzie na v6.1.13.


## v6.1.12 â€“ oprava Function Webu a katalĂłgu ukĂˇĹľkovĂ˝ch webov

- PridanĂ˝ jasnĂ˝ nĂˇvrat z Clippio Function Webu spĂ¤ĹĄ na hlavnĂş strĂˇnku Clippio a do katalĂłgu ukĂˇĹľkovĂ˝ch webov.
- UpravenĂ© karty funkciĂ­ vo Function Webe, aby neboli zbytoÄŤne natiahnutĂ© a text sa nelĂˇmal do Ăşzkych stÄşpcov.
- UpravenĂ˝ katalĂłg ukĂˇĹľkovĂ˝ch webov na strĂˇnke Tvorba webov do kompaktnejĹˇieho 2Ă—2 rozloĹľenia.
- AktualizovanĂ˝ cache-busting CSS verzie na v6.1.12.

# Changelog

## v6.1.11 â€“ aktualizovanĂ˝ Clippio Function Web Redone

- VymenenĂ˝ ukĂˇĹľkovĂ˝ web `clippio-function-web` za novĂş redone verziu.
- ZachovanĂ˝ celĂ˝ zdrojovĂ˝ Vite/React projekt aj deploy build pre GitHub Pages.
- UpravenĂ© cesty k JS, CSS a logu tak, aby ukĂˇĹľka fungovala v podprieÄŤinku `/clippio-function-web/`.
- PĂ´vodnĂ˝ Vite vstup ponechanĂ˝ ako `index.vite-source.html`, deploy vstup ostĂˇva `index.html`.

## v6.1.10 â€“ aktualizovanĂ˝ Clippio Function Web

- NahradenĂˇ ukĂˇĹľka `Clippio Function Web` novou opravenou verziou zo sĂşboru `clippio-function-web-fixed(1).zip`.
- AktualizovanĂ˝ koreĹovĂ˝ deploy build v `clippio-function-web/index.html` a `clippio-function-web/assets/`.
- ZachovanĂ˝ celĂ˝ zdrojovĂ˝ Vite/React projekt: `src/`, `public/`, `package.json`, `package-lock.json`, `.gitignore`, `dist/` a `index.vite-source.html`.
- UpravenĂ© cesty assetov tak, aby ukĂˇĹľka fungovala v podprieÄŤinku `/clippio-function-web/` na GitHub Pages.
- AktualizovanĂ© nĂˇzvy vĂ˝stupnĂ˝ch ZIP balĂ­kov na verziu v6.1.10.


## v6.1.8 â€“ UkĂˇĹľka funkciĂ­ v katalĂłgu webov

- PridanĂ˝ samostatnĂ˝ ukĂˇĹľkovĂ˝ web `Clippio Function Web` na URL `/clippio-function-web/`.
- Na hlavnej strĂˇnke je karta â€žUkĂˇĹľkovĂ© webyâ€ś zjednoduĹˇenĂˇ na jedno tlaÄŤidlo do katalĂłgu.
- Sekcia `/weby/` bola upravenĂˇ na katalĂłg ukĂˇĹľkovĂ˝ch webov vrĂˇtane ukĂˇĹľky funkciĂ­.
- PortfĂłlio obsahuje novĂş kartu pre ukĂˇĹľku funkciĂ­ a efektov.


## v6.1.6 â€“ oprava portfĂłliovej sekcie

- UpravenĂˇ homepage sekcia PortfĂłlio, aby nepĂ´sobila natiahnuto a prĂˇzdne.
- Grid portfĂłlia zmenenĂ˝ na maximĂˇlne 3 karty v riadku na desktope.
- DoplnenĂ˝ vecnejĹˇĂ­ text a krĂˇtke body ku kartĂˇm.
- UkĂˇĹľkovĂ˝ e-shop Liora ostĂˇva oznaÄŤenĂ˝ ako balĂ­k Predaj / e-shop.
- AktualizovanĂ˝ cache parameter CSS na `v=6.1.6`.

# Changelog

## v6.1.5 â€“ ukĂˇĹľkovĂ˝ e-shop pre balĂ­k Predaj

- PridanĂ˝ ukĂˇĹľkovĂ˝ e-shop SatĂ©novĂ© ruĹľe Liora pod `/ukazkovy-eshop-liora/`.
- Homepage, portfĂłlio a strĂˇnka Tvorba webov teraz ukazujĂş tri rozsahy webov: Ĺ tart, Rast a Predaj/e-shop.
- E-shop ukĂˇĹľka obsahuje produktovĂ˝ katalĂłg, detail produktu, frontend koĹˇĂ­k, objednĂˇvkovĂ˝ formulĂˇr, galĂ©riu, kontakt a spĂ¤tnĂ˝ odkaz na Clippio.
- UkĂˇĹľka mĂˇ vlastnĂ˝ sitemap.xml, robots.txt, canonical URL, aby nepĂ´sobila ako reĂˇlny obchod vo vyhÄľadĂˇvanĂ­.

## v6.1.4 â€“ spoloÄŤnĂˇ karta UkĂˇĹľkovĂ© weby

- Na homepage a v portfĂłliu boli dve samostatnĂ© ukĂˇĹľkovĂ© karty zlĂşÄŤenĂ© do jednej karty â€žUkĂˇĹľkovĂ© webyâ€ś.
- FreshCar Nitra a STAVEXON sĂş teraz prezentovanĂ© ako dve poloĹľky v jednej kategĂłrii ukĂˇĹľkovĂ˝ch webov.
- Na strĂˇnke Tvorba webov bola sekcia ukĂˇĹľok zjednotenĂˇ do jednej vĂ¤ÄŤĹˇej karty s porovnanĂ­m balĂ­kov Ĺ tart a Rast.
- CieÄľom je znĂ­ĹľiĹĄ vizuĂˇlnu duplicitu a jasnejĹˇie ukĂˇzaĹĄ, Ĺľe ide o ukĂˇĹľkovĂ© weby podÄľa rozsahu balĂ­ka.

## v6.1.3 â€“ ukĂˇĹľkovĂ© weby pre balĂ­ky Ĺ tart a Rast

- PridanĂ˝ ukĂˇĹľkovĂ˝ jednostrĂˇnkovĂ˝ web FreshCar Nitra pre balĂ­k Ĺ tart do `/ukazkovy-web-start/`.
- Homepage a portfĂłlio uĹľ oznaÄŤujĂş ukĂˇĹľky vĹˇeobecnejĹˇie ako â€žukĂˇĹľkovĂ© webyâ€ś.
- Na strĂˇnke Tvorba webov pribudla dvojica ukĂˇĹľok: Ĺ tart a Rast.
- FreshCar mĂˇ spĂ¤tnĂş navigĂˇciu na Clippio v hornej liĹˇte, navigĂˇcii a pĂ¤te.
- UkĂˇĹľka Ĺ tart mĂˇ vlastnĂ˝ canonical a mĂ´Ĺľe byĹĄ indexovanĂˇ ako ukĂˇĹľkovĂ˝ web v portfĂłliu.

## v6.1.0 â€“ PravdivĂ© formulĂˇcie histĂłrie znaÄŤky

## v6.1.1 â€“ STAVEXON ukĂˇĹľka balĂ­ka Rast

- PridanĂ˝ ukĂˇĹľkovĂ˝ firemnĂ˝ web STAVEXON pod `/ukazkovy-web-stavexon/`.
- STAVEXON doplnenĂ˝ do portfĂłlia pod kartu Clippio.sk v sekcii hotovĂ˝ch webov.
- Na strĂˇnku Tvorba webov pridanĂˇ ukĂˇĹľka balĂ­ka Rast v praxi.
- DoplnenĂ© CTA odkazy na ukĂˇĹľku a dopyt podobnĂ©ho webu.
- DoplnenĂ© URL STAVEXON do hlavnĂ©ho sitemap.xml.
- ZachovanĂˇ obchodnĂˇ logika: STAVEXON zodpovedĂˇ pribliĹľne balĂ­ku Rast, nie balĂ­ku Ĺ tart.

- OpravenĂ© formulĂˇcie okolo roku 2019, aby web netvrdil, Ĺľe Clippio ako ĹˇtĂşdio stabilne funguje od roku 2019.
- Homepage Ĺˇtatistika zmenenĂˇ na â€žskĂşsenosti z osobnĂ˝ch projektovâ€ś.
- StrĂˇnka O Clippio upravenĂˇ tak, aby jasne komunikovala osobnĂ© projekty, vlastnĂş tvorbu a postupnĂş klientsku prĂˇcu.
- Bez zĂˇsahu do formulĂˇrov, Web3Forms, spreadsheet napojenĂ­, cookie banneru a floating CTA.

## v6.1.0 â€“ ÄŽakovacie okno po odoslanĂ­ dopytu

- DoplnenĂ© viditeÄľnĂ© modĂˇlne okno â€žÄŽakujem, dopyt bol odoslanĂ˝â€ś po ĂşspeĹˇnom odoslanĂ­ formulĂˇra.
- ZachovanĂˇ inline spĂ¤tnĂˇ vĂ¤zba pri formulĂˇri.
- ZachovanĂˇ zĂˇloĹľnĂˇ strĂˇnka `/dakujeme/` pre prĂ­pad vypnutĂ©ho JavaScriptu.
- AktualizovanĂ© cache verzie CSS/JS na `v=6.1.0`.
- Bez zĂˇsahu do Web3Forms access key, spreadsheet napojenĂ­, cookie banneru a floating CTA.

## v6.0.5 â€“ Web3Forms odosielanie fix
- OpravenĂ© sprĂˇvanie kontaktnĂ˝ch formulĂˇrov po odoslanĂ­ dopytu.
- FormulĂˇre sa uĹľ nemajĂş presmerovaĹĄ na technickĂş strĂˇnku `api.web3forms.com/submit/success` s JSON hlĂˇĹˇkou.
- DoplnenĂ© JavaScriptovĂ© odosielanie cez `fetch` so sprĂˇvou priamo na webe.
- DoplnenĂˇ zĂˇloĹľnĂˇ strĂˇnka `/dakujeme/` pre prĂ­pad, Ĺľe JavaScript nebude dostupnĂ˝.
- DoplnenĂ© zĂˇkladnĂ© ĹˇtĂ˝ly pre ĂşspeĹˇnĂş a chybovĂş hlĂˇĹˇku formulĂˇra.
- Bez zĂˇsahu do ostatnĂ˝ch napojenĂ­ a obsahu webu.

## v6.0.4 â€“ README fix
- AktualizovanĂ˝ hlavnĂ˝ README.md, ktorĂ˝ predtĂ˝m zostal pri starom oznaÄŤenĂ­ v4.7/v5.1.1.
- DoplnenĂ˝ aktuĂˇlny popis verzie v6.x, ĹˇtruktĂşry, balĂ­kov, napojenĂ­ a nasadenia.
- Bez zĂˇsahu do funkciĂ­ webu.

## v6.0.3 â€“ Package detail and layout fix
- OpravenĂ˝ prekrytĂ˝ badge â€žNajvĂ˝hodnejĹˇieâ€ś v balĂ­ku Rast.
- ZvĂ¤ÄŤĹˇenĂˇ medzera medzi spoloÄŤnĂ˝m zĂˇkladom webovĂ˝ch balĂ­kov a kartami balĂ­kov.
- RozĹˇĂ­renĂ˝ opis balĂ­kov Ĺ tart, Rast a Predaj na strĂˇnke Tvorba webov aj v cennĂ­ku.
- RozĹˇĂ­renĂˇ sekcia O Clippio na homepage a strĂˇnke O Clippio.
- ZachovanĂ© existujĂşce napojenia, formulĂˇre, cookie banner a floating CTA.


## v6.0.2 â€“ finĂˇlny obsahovĂ˝ patch
- RozĹˇĂ­renĂ© webovĂ© balĂ­ky na strĂˇnke Tvorba webov aj v cennĂ­ku.
- BalĂ­k Rast doplnenĂ˝ ako profesionĂˇlny firemnĂ˝ web s konkrĂ©tnym rozsahom.
- BalĂ­k Predaj jasnejĹˇie oznaÄŤenĂ˝ ako objednĂˇvkovĂ˝ web / menĹˇĂ­ e-shop.
- StrĂˇnka O Clippio doplnenĂˇ o viac kontextu, prĂ­stup a dĂ´vody spoluprĂˇce.
- ZachovanĂ© existujĂşce napojenia, formulĂˇre, cookie banner, floating CTA a lokĂˇlna ĹˇtruktĂşra URL.

# Changelog

## v5.0.1

### OpravenĂ©
- OpravenĂ© naÄŤĂ­tanie CSS, JavaScriptu, obrĂˇzkov a favicon pri ÄŤistĂ˝ch URL typu `/sluzby/`.
- VĹˇetky internĂ© odkazy a asset cesty zmenenĂ© na root-relative tvar pre GitHub Pages.
- StarĂ© koreĹovĂ© `.html` presmerovania odstrĂˇnenĂ©; web pouĹľĂ­va ÄŤistĂ© URL cez prieÄŤinky.


## v5.0.0

### ZmenenĂ©
- PodstrĂˇnky sĂş presunutĂ© do prieÄŤinkov s `index.html`, aby URL fungovali bez `.html`.
- InternĂ© odkazy, canonical URL a sitemap boli upravenĂ© na ÄŤistĂ© URL.
- KoreĹovĂ© `.html` presmerovania odstrĂˇnenĂ©, aby bol deploy ÄŤistejĹˇĂ­.

## v6.0.0 â€“ Controlled Brand Book positioning update
- ZĂˇklad ponechanĂ˝ na funkÄŤnej verzii v5.1.1.
- Homepage prepracovanĂˇ podÄľa Brand Book positioningu: profesionĂˇlna digitĂˇlna prezentĂˇcia, web ako hlavnĂ˝ pilier, foto/video/grafika/dron ako podpora.
- ZachovanĂ© pĂ´vodnĂ© funkÄŤnĂ© moduly: navigĂˇcia, formulĂˇre Web3Forms, novinky zo spreadsheetu, ceny fotiek zo spreadsheetu, hotovĂ© weby zo spreadsheetu, FAQ, cookie banner a floating CTA.
- WebovĂ© balĂ­ky rozĹˇĂ­renĂ© na Ĺ tart, Rast a Predaj/e-shop s jasnĂ˝mi vĂ˝hodami, hranicami, faktĂşrou, prototypom a zĂˇrukou.
- Recenzie nahradenĂ© pripravenĂ˝m dĂ´kazovĂ˝m blokom bez faloĹˇnĂ˝ch hodnotenĂ­.
- PortfĂłlio prepracovanĂ© na reĂˇlne projekty a overiteÄľnĂ© odkazy.
## v6.0.1 â€“ oprava portfĂłlia, cennĂ­ka a balĂ­kov
- ZvĂ˝raznenĂ˝ YouTube blok ako jasnĂ˝ preklik na YouTube portfĂłlio.
- DoplnenĂ˝ preklik na Google Drive s grafikou v portfĂłliu.
- OdstrĂˇnenĂ© nĂˇvĹˇtevnĂ­cky nevhodnĂ© internĂ© vysvetlenie pri hotovĂ˝ch weboch.
- RozĹˇĂ­renĂ˝ cennĂ­k o viac informĂˇciĂ­, priame CTA na dopyt a jasnejĹˇie vysvetlenie cien.
- SkrĂˇtenĂ© a skompaktnenĂ© webovĂ© balĂ­ky, aby karty nepĂ´sobili zbytoÄŤne roztiahnuto.
- ZachovanĂ© napojenia, formulĂˇre, cookie banner, floating CTA a existujĂşce sekcie.

## v6.1.2 â€“ spĂ¤tnĂˇ navigĂˇcia zo STAVEXON ukĂˇĹľky

- DoplnenĂˇ hornĂˇ liĹˇta s nĂˇvratom spĂ¤ĹĄ na Clippio v ukĂˇĹľkovom webe STAVEXON.
- DoplnenĂ˝ odkaz spĂ¤ĹĄ na Clippio do mobilnej navigĂˇcie aj pĂ¤ty ukĂˇĹľky.
- CieÄľ: nĂˇvĹˇtevnĂ­k sa po otvorenĂ­ ukĂˇĹľkovĂ©ho webu nezasekne mimo hlavnej strĂˇnky Clippio.

## v6.1.9 â€“ doplnenĂ˝ zdrojovĂ˝ projekt Clippio Function Web

- Do prieÄŤinka `clippio-function-web/` boli doplnenĂ© aj zdrojovĂ© Vite/React sĂşbory.
- FunkÄŤnĂˇ statickĂˇ verzia pre GitHub Pages ostĂˇva v koreĹovom `clippio-function-web/index.html`.
- PĂ´vodnĂ˝ Vite vstupnĂ˝ sĂşbor je uloĹľenĂ˝ ako `clippio-function-web/index.vite-source.html`, aby neprepĂ­sal deploy verziu.



## v6.1.23
- DefinitĂ­vna oprava nekoneÄŤnej liĹˇty: pohyb rieĹˇi JS cez requestAnimationFrame, nie CSS animĂˇcia.
- LiĹˇta si sama duplikuje obsah a posĂşva sa pixelovo bez skoku.
