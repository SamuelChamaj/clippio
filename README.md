# Clippio web – v6.6.2

Statický HTML web pre **Clippio** pripravený na GitHub Pages. Verzia v6.x vychádza z funkčného základu **v5.1.1** a pridáva kontrolovaný Brand Book positioning bez rozbitia pôvodných napojení a funkcií.

## Hlavný positioning

Clippio je slovenské kreatívne štúdio pre profesionálnu digitálnu prezentáciu firiem a značiek.

Hlavný obchodný pilier:
- tvorba profesionálnych firemných webov.

Podporné služby:
- fotografia,
- video produkcia,
- grafický dizajn,
- dronové zábery,
- marketingový obsah.

Tieto služby nemajú pôsobiť ako nesúvisiace ponuky. Ich cieľ je podporiť dôveryhodnú prezentáciu klienta na webe, sociálnych sieťach a v online komunikácii.

## Stav verzie

Aktuálna verzia: **v6.6.2 – oprava Google Sheets CMS loadera**

Obsahovo vychádza z:
- **v6.6.2** – oprava Google Sheets CMS loadera: tabuľka sa načíta cez publikované CSV a pri zlyhaní automaticky cez Google Visualization script fallback. Pridaný je `window.clippioCmsDebug()` na overenie načítania. Stav guličky berie `availabilityMode`: `TRUE` / `open` = zelená, `FALSE` / `closed` = červená, `limited` / `obmedzené` = oranžová. Cache verzie sú zvýšené na `v=6.6.2`.
- **v6.6.0** – Clippi Light Helper: pridaný riadený digitálny konzultant v pravom dolnom rohu, otázky pre web, video, fotky, dron, grafiku, kombinácie služieb a nejasné zadania, scoring odporúčania, orientačné ceny, prepojenie na Web Finder, localStorage pokračovanie a dopyt cez existujúci Web3Forms endpoint. Doplnok používa vlastný avatar `/assets/images/clippi-avatar.png`, desktopové uvítanie a odosiela kompletný súhrn naklikaných odpovedí. Aktualizované cache verzie hlavných stránok na `v=6.6.0`.
- **v6.5.11** – Web Finder question height fix: opravené orezávanie poslednej odpovede v kroku „Rozsah webu“. Výška aktívnej otázky sa už nesmie zamknúť na príliš nízku hodnotu po načítaní fontov alebo zmene viewportu. Aktualizované cache verzie CSS/JS na `v=6.5.11`.
- **v6.5.10** – Web Finder clean back control: odstránené neprofesionálne spodné tlačidlo „Späť“ z formulára, ovládanie späť presunuté do hornej časti progress panelu ako malé čisté tlačidlo, bez prekrývania kariet odpovedí. Aktualizované cache verzie CSS/JS na `v=6.5.10`.
- **v6.5.9** – SEO canonical and meta description cleanup: skrátené meta descriptions na hlavných upravených stránkach, canonical tagy zapísané v štandardnom tvare `rel="canonical" href="..."` a aktualizované cache verzie CSS/JS na `v=6.5.9`.
- **v6.5.8** – Web Finder + portfolio CTA cleanup: balíček zahŕňa predchádzajúci Web Finder update bez tlačidla „Pokračovať“ a zároveň opravuje CTA tlačidlo „Otvoriť hotové weby“ v sekcii Portfólio webov na stránke `/weby/`, aby text sedel v strede a nelámal sa zle na desktope. Aktualizované cache verzie CSS/JS na `v=6.5.8`.
- **v6.5.7** – Web Finder no-continue-button update: odstránené viditeľné tlačidlo „Pokračovať“, výber odpovede posúva formulár automaticky aj pri kliknutí na už vybranú možnosť. Aktualizované cache verzie CSS/JS na `v=6.5.7`.
- **v6.5.6** – Web Finder compact auto-advance update: zmenšený vizuál Web Finderu, kompaktnejší krokový formulár, menšie karty odpovedí, nižšie medzery a automatický prechod na ďalšiu otázku po kliknutí na odpoveď. Aktualizované cache verzie CSS/JS na `v=6.5.6`.
- **v6.5.5** – SEO/GEO and llms update: doplnený `/llms.txt`, upravený `robots.txt`, posilnené lokálne SEO texty na homepage a stránke `/weby/`, doplnené FAQ structured data a lokálne výrazy pre malé firmy, živnostníkov a regióny Zlaté Moravce, Nitra, Levice a Vráble.
- **v6.1.27** – pricing and trust cleanup: Štart web upravený na 199 €, jasnejšie oddelenie webových balíkov od kreatívnych služieb, silnejšia sekcia dôkazov na homepage, civilnejšie formulácie o moderných nástrojoch a redirect `/o-clippio.html` na čistú URL.
- **v6.1.17** – Function Web improvement pass: nahradený ťažší React/Vite build jednoduchšou statickou ukážkou, prepracovaný katalóg funkcií, celostránkový prepínač vizuálu, čistejšie CTA a menší počet assetov.
- **v6.1.16** – smoothness performance pass: vypnutá nekonečná pohybujúca sa lišta, odstránený ťažký blur na sticky/fixed prvkoch, odľahčené tiene, stabilnejšie mobilné správanie a optimalizované ikony.
- **v6.1.15** – clean URL cleanup: odstránené koreňové `.html` presmerovania, interné odkazy ponechané na čistých URL a cache verzia aktualizovaná na 6.1.15.
- **v6.1.14** – vyčistenie produkčného ZIPu od duplicitných assetov, zdrojových Vite súborov a interných poznámok, ktoré nie sú potrebné na GitHub Pages.
- **v6.0.0** – Brand Book positioning update,
- **v6.0.1** – oprava portfólia, cenníka a balíkov,
- **v6.0.2** – rozšírenie webových balíkov a O Clippio,
- **v6.0.3** – oprava layoutu balíkov, väčšie medzery a detailnejší opis balíkov,
- **v6.0.4** – oprava dokumentácie,
- **v6.1.0** – opravené formulácie okolo roku 2019: web už netvrdí, že Clippio stabilne funguje od roku 2019, ale že skúsenosti vznikali cez osobné projekty, vlastnú tvorbu a postupne klientsku prácu.
- **v6.1.0** – doplnené viditeľné ďakovacie okno po úspešnom odoslaní dopytu.
- **v6.0.5** – oprava správania formulára po odoslaní dopytu.

Verzia **v6.6.0** pridáva Clippi Light Helper: rýchly poradenský panel bez AI chatbota, s kontrolovanými otázkami, odporúčaním služby, orientačnou cenou a odoslaním nezáväzného dopytu. Clippi používa vlastný avatar v plávajúcom tlačidle, hlavičke panela, úvodnej bubline a výsledku; na desktope vie zobraziť krátke uvítanie s 24-hodinovým zapamätaním zatvorenia. Balíček zároveň obsahuje všetky úpravy z v6.5.11.

Verzia **v6.6.2** opravuje rizikovú časť Google Sheets CMS: ak prehliadač neprečíta CSV priamo, web použije script fallback. Základná navigácia, formulár ani Clippi sa pri výpadku tabuľky nerozbijú.

Verzia **v6.1.0** upravuje webové balíky tak, aby hlavné karty zostali jednoduché, ale pod nimi pribudli presné podrobnosti, férové obchodné hranice a FAQ k doméne, hostingu, úpravám a fakturácii. Doména na prvý rok je uvedená ako súčasť každého webového balíka.

## Zachované funkcie

- statický web vhodný pre GitHub Pages,
- čisté URL cez priečinky s `index.html`,
- Web3Forms kontaktné formuláre s lokálnou úspešnou/chybovou hláškou,
- floating Smart CTA,
- cookie banner,
- consent-based meranie klikov na CTA, Web Finder, Clippiho a formuláre,
- FAQ bloky,
- napojenie noviniek na Google Spreadsheet,
- napojenie cenníka fotiek na Google Spreadsheet,
- napojenie portfólia hotových webov na Google Spreadsheet,
- lokálne fallback dáta pre dynamické bloky,
- sitemap, robots, favicon, Open Graph a základné SEO prvky,
- `llms.txt` pre lepšiu čitateľnosť webu pre AI/LLM nástroje.
- Web Finder s automatickým prechodom na ďalšiu otázku po výbere odpovede.
- Clippi Light Helper ako riadený poradca pre výber služby, Web Finder preklik a dopyt cez Web3Forms.

## Najdôležitejšie stránky

- `/` – homepage
- `/sluzby/` – služby
- `/weby/` – tvorba webov a webové balíky
- `/portfolio/` – portfólio a externé prekliky
- `/cennik/` – orientačný cenník a dopytové CTA
- `/o-clippio/` – informácie o Clippio
- `/kontakt/` – kontaktný formulár
- `/dakujeme/` – záložná ďakovacia stránka po odoslaní formulára
- `/llms.txt` – stručný prehľad webu, služieb, lokálnych výrazov a dôležitých URL pre AI/LLM nástroje
- `/web-finder/` – interaktívny výber vhodného webového balíka
- `/cookies/` – cookies
- `/ochrana-osobnych-udajov/` – ochrana osobných údajov

Staré koreňové `.html` presmerovania boli odstránené. Web používa čisté URL cez priečinky s `index.html`.

## Meranie klikov

Spoločný skript `assets/js/main.js` sleduje obchodné kliky iba po súhlase s analytickými cookies. Udalosti sa posielajú do `gtag`, `dataLayer` alebo `plausible`, ak sú na webe doplnené.

Merané udalosti:
- `cta_click` – kliky na hlavné CTA, tlačidlá, balíky a kontaktné odkazy,
- `web_finder_click` – otvorenie Web Finderu, výber odpovedí, späť/kroky a kopírovanie výsledku,
- `clippi_click` – otvorenie Clippiho, odpovede a akcie v paneli,
- `lead_form_submit_attempt`, `lead_form_submit_success`, `lead_form_submit_error` – pokus, úspech alebo chyba odoslania formulára.

Meranie neposiela mená, e-maily ani obsah správ. Pre reálne štatistiky treba mať na webe doplnený GA4, Google Tag Manager alebo kompatibilné meranie.

## Webové balíky

Stránka `/weby/` obsahuje tri hlavné balíky:

### Štart

Pre živnostníka, jednoduchú službu alebo prvú online prezentáciu.

Typicky obsahuje:
- jednu hlavnú stránku alebo landing page,
- základné predstavenie firmy alebo služby,
- niekoľko doplnkových sekcií,
- kontaktné CTA alebo jednoduchý formulár,
- responzívny dizajn,
- základnú technickú a SEO prípravu.

### Rast

Najvýhodnejší balík pre väčšinu lokálnych firiem, remesiel a rastúcich značiek.

Typicky obsahuje:
- 3–6 podstránok podľa rozsahu,
- služby, o firme, realizácie alebo portfólio a kontakt,
- texty upravené na dôveru a dopyt,
- kontaktný formulár, sociálne siete a telefonický kontakt,
- favicon, sitemap, robots a technickú prípravu,
- možnosť prepojenia na YouTube, Google Drive alebo živé realizácie.

### Predaj / e-shop

Pre menší e-shop, katalóg, objednávky, rezervácie alebo predajný web.

Typicky obsahuje:
- štruktúru produktov alebo služieb,
- kategórie a detail produktu alebo služby,
- jasné CTA na objednávku alebo dopyt,
- objednávkový, rezervačný alebo dopytový formulár,
- základné obchodné podstránky,
- technickú prípravu na analytiku a ďalšie rozšírenie.

Platobná brána, sklad, účtovníctvo a automatizácie sa naceňujú osobitne podľa konkrétneho systému.

## Dôležité obchodné pravidlá

Pri webových projektoch sa používa jasne ohraničený proces:

- úvodná konzultácia,
- návrh smerovania,
- vizuálny koncept homepage pri kvalifikovanom projekte,
- klikateľný prototyp v dohodnutom rozsahu,
- vývoj webu,
- kontrola a schválenie,
- platba po schválení hotového webu v dohodnutom rozsahu,
- spustenie,
- 6-mesačná záruka na dodanú funkčnosť.

Dôležité: tieto výhody neznamenajú neobmedzené úpravy, nové sekcie zadarmo alebo neustále prerábanie smerovania projektu. Rozsah musí byť vždy dohodnutý dopredu.

## Štruktúra projektu

```txt
/
├── index.html
├── sluzby/
│   └── index.html
├── portfolio/
│   └── index.html
├── kontakt/
│   └── index.html
├── weby/
│   └── index.html
├── cennik/
│   └── index.html
├── web-finder/
│   └── index.html
├── o-clippio/
│   └── index.html
├── cookies/
│   └── index.html
├── ochrana-osobnych-udajov/
│   └── index.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── web-finder-redesign.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   └── icons/
├── favicon/
├── data/
├── docs/
├── robots.txt
├── llms.txt
├── sitemap.xml
├── CNAME
├── README.md
└── .nojekyll
```

## Nasadenie na GitHub Pages

Nahraj obsah priečinka `clippio-main` priamo do koreňa repozitára.

Správne:

```txt
index.html
sluzby/index.html
portfolio/index.html
assets/css/style.css
assets/js/main.js
robots.txt
llms.txt
sitemap.xml
CNAME
.nojekyll
```

Nesprávne:

```txt
clippio-main/index.html
clippio-main/sluzby/index.html
```

Na GitHub Pages musí byť obsah priečinka `clippio-main` v roote repozitára, nie vložený ako ďalší podpriečinok.

## Poznámky k úpravám

- Navbar a footer sú priamo v HTML, aby web fungoval aj pri otvorení zo ZIPu cez `file://`.
- Pri úpravách textov treba zachovať positioning: web ako hlavný pilier, ostatné kreatívne služby ako podpora digitálnej prezentácie.
- Nepoužívať falošné recenzie, vymyslené čísla ani náhodné vizuály ako klientsku prácu.
- Cenník a dynamické bloky musia zostať napojené na existujúci JavaScript a spreadsheet/fallback systém.
- Analytické eventy musia rešpektovať `clippio_cookie_consent_v1`; bez analytického súhlasu sa obchodné kliky neposielajú.

## Changelog

### v6.5.11 – Web Finder question height fix

- Opravené orezávanie poslednej odpovede v kroku „Rozsah webu“.
- Aktívny blok otázky už používa prirodzenú výšku namiesto rizikového pevného JS výpočtu.
- Doplnená poistka v `main.js`, aby sa pri novej Web Finder štruktúre nenastavovala pevná výška obsahu.
- Aktualizované cache verzie `style.css`, `web-finder-redesign.css` a `main.js` na `v=6.5.11`.
- Balíček obsahuje aj všetky úpravy z v6.5.10.

### v6.5.10 – Web Finder clean back control

- Odstránené spodné tlačidlo „Späť“ z formulára Web Finderu.
- Pridané malé čisté tlačidlo „← Späť“ do hornej časti progress panelu.
- Tlačidlo sa nezobrazuje na prvom kroku a nezakrýva odpovede.
- Aktualizované cache verzie `style.css`, `web-finder-redesign.css` a `main.js` na `v=6.5.10`.
- Balíček obsahuje aj všetky úpravy z v6.5.9.

### v6.5.9 – SEO canonical and meta description cleanup

- Skrátené meta descriptions na stránkach `/`, `/weby/` a `/web-finder/`, aby ich SEO nástroje neoznačovali ako príliš dlhé.
- Canonical tagy ponechané na týchto stránkach a zapísané v štandardnom tvare `rel="canonical" href="..."`.
- Aktualizované cache verzie `style.css`, `web-finder-redesign.css` a `main.js` na `v=6.5.9`.
- Balíček obsahuje aj všetky úpravy z v6.5.8.

### v6.5.8 – Web Finder + portfolio CTA cleanup

- Balíček obsahuje aj úpravy z v6.5.7: Web Finder bez viditeľného tlačidla „Pokračovať“ a automatický prechod po kliknutí na odpoveď.
- Opravené CTA tlačidlo „Otvoriť hotové weby“ v sekcii Portfólio webov na stránke `/weby/`.
- Tlačidlo má na desktope centrovaný text, pevnejšie proporcie a `white-space: nowrap`, aby sa text nelámal nepekne do dvoch riadkov.
- Na menších obrazovkách ostáva tlačidlo responzívne cez `width:100%` a môže sa zalomiť normálne.
- Aktualizované cache verzie `style.css`, `web-finder-redesign.css` a `main.js` na `v=6.5.8`.

### v6.5.7 – Web Finder no-continue-button update

- Odstránené viditeľné tlačidlo „Pokračovať“ z Web Finderu.
- Automatický prechod funguje po kliknutí na odpoveď vrátane už predvolene vybranej možnosti.
- Na ďalších krokoch ostáva iba tlačidlo „Späť“.
- Aktualizované cache verzie `web-finder-redesign.css` a `main.js` na `v=6.5.7`.

### v6.5.6 – Web Finder compact auto-advance update

- Zmenšený desktopový layout Web Finderu, aby nepôsobil nafúknuto na veľkých obrazovkách.
- Zmenšené nadpisy, medzery, karty odpovedí, krokové bodky a kontajner formulára.
- Po kliknutí na odpoveď sa Web Finder automaticky presunie na ďalšiu otázku.
- Na poslednej otázke sa po výbere odpovede automaticky zobrazí výsledné odporúčanie.
- Aktualizované cache verzie `web-finder-redesign.css` a `main.js` na `v=6.5.6`.

### v6.5.5 – SEO/GEO and llms update

- Doplnený `llms.txt` s prehľadom služieb, balíkov, lokálneho pôsobenia a dôležitých URL.
- Upravený `robots.txt` tak, aby explicitne povoľoval `/llms.txt` a ponechal sitemap.
- Posilnené lokálne SEO na homepage a stránke `/weby/` pre výrazy ako tvorba webov Zlaté Moravce, tvorba web stránok Nitra, web pre živnostníka a firemný web pre malú firmu.
- Doplnené FAQ structured data na homepage a stránke `/weby/`.
- Zachované existujúce CSS, JS, formuláre, navigácia, spreadsheet napojenia a dizajnový systém.

## v6.1.13 – animation cleanup & consistency update

- Zjednotené animácie na pokojný fade-up systém.
- Upravené hover efekty kariet a CTA tlačidiel na jednotné hodnoty.
- Zlepšené mobilné menu, mobilná plynulosť a stabilita kariet.
- Zjednotený spacing sekcií a vizuálne správanie hlavných blokov.
- Upravené referencie a katalóg ukážkových webov do obchodnejšej podoby.
- Pridaná a rozšírená podpora `prefers-reduced-motion`.


### v6.0.4 – README fix

- Aktualizovaný hlavný `README.md`, ktorý predtým zostal pri starom označení v4.7/v5.1.1.
- Doplnený aktuálny popis verzie v6.x, štruktúry, balíkov, napojení a nasadenia.
- Bez zásahu do funkcií webu.

### v6.0.3 – Package detail and layout fix

- Opravený prekrytý badge „Najvýhodnejšie“ v balíku Rast.
- Zväčšená medzera medzi spoločným základom webových balíkov a kartami balíkov.
- Rozšírený opis balíkov Štart, Rast a Predaj na stránke Tvorba webov aj v cenníku.
- Rozšírená sekcia O Clippio na homepage a stránke O Clippio.
- Zachované existujúce napojenia, formuláre, cookie banner a floating CTA.

### v6.0.2 – finálny obsahový patch

- Rozšírené webové balíky na stránke Tvorba webov aj v cenníku.
- Balík Rast doplnený ako profesionálny firemný web s konkrétnym rozsahom.
- Balík Predaj jasnejšie označený ako objednávkový web / menší e-shop.
- Stránka O Clippio doplnená o viac kontextu, prístup a dôvody spolupráce.
- Zachované existujúce napojenia, formuláre, cookie banner, floating CTA a lokálna štruktúra URL.

### v6.0.1 – oprava portfólia, cenníka a balíkov

- Zvýraznený YouTube blok ako jasný preklik na YouTube portfólio.
- Doplnený preklik na Google Drive s grafikou v portfóliu.
- Odstránené návštevnícky nevhodné interné vysvetlenie pri hotových weboch.
- Rozšírený cenník o viac informácií, priame CTA na dopyt a jasnejšie vysvetlenie cien.
- Skrátené a skompaktnené webové balíky, aby karty nepôsobili zbytočne roztiahnuto.
- Zachované napojenia, formuláre, cookie banner, floating CTA a existujúce sekcie.

### v6.0.0 – Controlled Brand Book positioning update

- Základ ponechaný na funkčnej verzii v5.1.1.
- Homepage prepracovaná podľa Brand Book positioningu.
- Profesionálna digitálna prezentácia nastavená ako hlavný výsledok.
- Web nastavený ako hlavný komerčný pilier.
- Foto, video, grafika a dron nastavené ako podpora webu a značky.
- Zachované pôvodné funkčné moduly.
- Webové balíky rozšírené na Štart, Rast a Predaj/e-shop.
- Recenzie nahradené pripraveným dôkazovým blokom bez falošných hodnotení.
- Portfólio prepracované na reálne projekty a overiteľné odkazy.

### v5.1.1 – Floating Smart CTA

- Smart floating CTA pridané na všetky stránky webu.
- Jemné upozornenie po 60 sekundách alebo po 70 % scrollu.
- CTA sa skryje pri vypĺňaní formulára na mobile a neprekrýva cookie banner.
- Kliknutie sa ukladá do localStorage.

### v5.1 – Trust & Conversion Update

- Pridané CTA prvky na zvýšenie počtu dopytov.
- Pridaná sekcia Pre koho je Clippio.
- Rozšírená dôveryhodnosť hlavnej stránky.
- Pridané FAQ.
- Pripravený dôkazový blok pre reálne a schválené recenzie.
- Upravený text O Clippio.
- Zlepšené texty pri formulári.

### v5.0.1

- Opravené načítanie CSS, JavaScriptu, obrázkov a favicon pri čistých URL typu `/sluzby/`.
- Všetky interné odkazy a asset cesty zmenené na root-relative tvar pre GitHub Pages.
- Staré koreňové `.html` presmerovania odstránené; web používa čisté URL cez priečinky.

### v5.0.0

- Podstránky sú presunuté do priečinkov s `index.html`, aby URL fungovali bez `.html`.
- Interné odkazy, canonical URL a sitemap boli upravené na čisté URL.
- Koreňové `.html` presmerovania odstránené, aby bol deploy čistejší.




## v6.1.12 – aktualizovaný Clippio Function Web Redone

- Vymenený ukážkový web Clippio Function Web za novú redone verziu.
- V projekte ostal celý zdrojový Vite/React projekt aj funkčná deploy verzia pre GitHub Pages.
- Deploy vstup pre web je `clippio-function-web/index.html`; pôvodný Vite vstup je `clippio-function-web/index.vite-source.html`.

## v6.1.6 – ukážkový e-shop pre balík Predaj

- Pridaný ukážkový e-shop Saténové ruže Liora do priečinka `/ukazkovy-eshop-liora/`.
- Ukážka doplnená na homepage do spoločnej karty „Ukážkové weby“ ako príklad balíka Predaj/e-shop.
- Stránka `/weby/` rozšírená z dvoch ukážok na tri: Štart, Rast a Predaj/e-shop.
- Portfólio doplnené o samostatnú kartu e-shopu s vysvetlením, čo ukážka obsahuje a čo už patrí do individuálneho nacenenia.
- E-shop ukážka má spätnú navigáciu na Clippio, canonical URL, sitemap, robots.txt.

## v6.1.4 – spoločná karta Ukážkové weby

- Dve samostatné karty FreshCar Nitra a STAVEXON boli na homepage a v portfóliu zlúčené do jednej karty „Ukážkové weby“.
- Na stránke Tvorba webov sú ukážky balíkov Štart a Rast zobrazené v jednej spoločnej sekcii.
- Úprava znižuje duplicitu a lepšie vysvetľuje, že ide o porovnanie rozsahu webov podľa balíka.

## v6.1.3 – ukážkové weby pre balíky Štart a Rast

- Pridaný ukážkový jednostránkový web FreshCar Nitra do priečinka `/ukazkovy-web-start/`.
- FreshCar doplnený do homepage portfólia a do sekcie hotových webov ako príklad rozsahu balíka Štart.
- Sekcia na stránke Tvorba webov zmenená z jednej ukážky balíka Rast na sekciu „Ukážkové weby“ s dvomi kartami: Štart a Rast.
- Označenie v kartách upravené na „ukážkové weby“, aby nepôsobilo, že portfólio ukazuje iba jeden balík.
- FreshCar ukážka má spätný odkaz na Clippio v hornej lište, navigácii aj footeri.
- Ukážka Štart má vlastný canonical a môže byť indexovaná ako ukážkový web v portfóliu.

## v6.1.1 – STAVEXON ukážka balíka Rast

- Pridaný ukážkový firemný web STAVEXON do priečinka `/ukazkovy-web-stavexon/`.
- STAVEXON doplnený do portfólia hneď pod kartu Clippio.sk v sekcii hotových webov.
- Na stránku `/weby/` pridaná sekcia „Pozri si ukážku balíka Rast v praxi“.
- Doplnené CTA na ukážkový web a dopyt na podobný web.
- Doplnené URL STAVEXON do hlavného sitemap.xml.
- Zachovaný positioning Clippio: STAVEXON je dôkaz balíka Rast, nie lacné demo balíka Štart.

## v6.1.0 – Webové balíky a obchodné hranice

Zmeny:

- doplnená informácia, že doména na prvý rok je v cene každého webového balíka,
- zachované jednoduché karty balíkov s checklist výhodami,
- pridaná sekcia „Podrobnosti webových balíkov“,
- doplnené rozpisy, čo jednotlivé balíky obsahujú a čo neobsahujú,
- doplnené spoločné obchodné pravidlá pre webové balíky,
- doplnené vysvetlenie rozdielu medzi menšou úpravou a novou prácou,
- doplnené FAQ otázky k doméne, hostingu, úpravám a fakturácii,
- upravené cache verzie súborov na `6.1.0`.

### v6.1.2

Fix: Ukážkový web STAVEXON má viditeľný návrat späť na hlavný web Clippio cez hornú lištu, navigáciu a footer.



## Oprava portfólia v6.1.6

Táto verzia opravuje natiahnutú sekciu portfólia na homepage a portfóliovej stránke. Karty majú viac kontextu, profesionálnejší text a rozumnejšie rozloženie.


## v6.1.27

Oprava duplicity: odstránený samostatný koreňový redirect `o-clippio.html`; presmerovanie starého odkazu rieši `404.html`.
