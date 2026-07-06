## v6.5.4 – Web Finder usporiadanie podľa Brandas smeru
- Web Finder dostal kompaktnejšie dvojstĺpcové rozloženie inšpirované stránkou Brandas, ale bez 1:1 kopírovania.
- Postupová tabuľka ostáva zachovaná, no je vložená do tmavšieho poradenského panelu s čistejším rozložením otázok a výsledku.
- Výsledkový panel je vizuálne súčasťou jedného rozhrania, nie odtrhnutá karta mimo kompozície.
- Upravené breakpointy, aby sa na užších obrazovkách nerozťahoval stepper a výsledok neodchádzal mimo viewport.
- Cache verzia Web Finder stránky zvýšená na `v=6.5.4`.

## v6.5.3 – Web Finder poradca + odhad ceny
- Web Finder rozšírený na 6 krokov: cieľ, rozsah, obsah, rozpočet, funkcie a prístup.
- Výsledok teraz odporúča základný balík, najlacnejšiu rozumnú cestu, doplnkové služby, čo zatiaľ neplatiť a kedy už dáva zmysel web na mieru.
- Doplnený orientačný výpočet ceny: základ balíka + odhad doplnkov + poznámka, že nejde o finálnu cenovú ponuku.
- Opravené rozhranie Web Finderu tak, aby stránka pôsobila viac ako poradca a menej ako obyčajný formulár.
- Cache verzia Web Finder stránky zvýšená na `v=6.5.3`.

## v6.5.2 – Web Finder presná postupová tabuľka
- Web Finder krokový výber je vizuálne prerobený presne podľa dodaného Stepper vzoru.
- Stepper karta používa `outer-container`, `step-circle-container`, kruhové indikátory, spojnice, aktívnu bodku a fajku dokončených krokov.
- Doplnil sa presnejší fialový akcent `#5227ff`, úzka postupová karta a výškové správanie obsahu podľa aktívneho kroku.
- Zachovaná je statická HTML/CSS/JS implementácia pre GitHub Pages bez React buildu.


## v6.5.1 – Web Finder stepper UI
- Web Finder prerobený na krokový stepper podľa dodaného návrhu: indikátory krokov, späť/pokračovať, finálne odporúčanie.
- Zachovaná statická HTML/JS kompatibilita pre GitHub Pages bez React buildu.
- Výsledok sa stále automaticky vkladá do dopytového formulára.
- Cache verzia Web Finder stránky zvýšená na `v=6.5.1`.

# Changelog

## v6.5.0 – Clippio Web Finder
- Pridaná nová podstránka `/web-finder/` s interaktívnym výberom vhodného webového balíka.
- Web Finder odporúča Štart, Rast, Predaj/e-shop alebo individuálne riešenie podľa cieľa, rozsahu, obsahu, rozpočtu a zložitosti.
- Výsledok obsahuje dôvody odporúčania, riziká a ďalšie kroky.
- Doplnený formulár, ktorý automaticky preberá výsledok Web Finderu do dopytu cez Web3Forms.
- Doplnené CTA odkazy z homepage a stránky Tvorba webov.
- Doplnené štýly a JavaScript pre Web Finder.
- Aktualizovaný sitemap a cache verzie na upravených stránkach na `v=6.5.0`.

# v6.4.1 – Dynamická dostupnosť cez Google Sheets

- Pridané napojenie sekcie „Aktuálna dostupnosť“ na Google Sheets CMS CSV.
- Stavový bod sa mení podľa hodnoty `availabilityMode` / `availabilityOpen`:
  - `TRUE` / `open` = zelený pulz
  - `FALSE` / `closed` = červený pulz
  - `limited` / `dovolenka` = žltý pulz
- Text dostupnosti sa dá meniť cez `availabilityStatus`.
- Popis dostupnosti sa dá meniť cez `availabilityText`.
- Odstránená potreba dávať zelený emoji priamo do textu.
- Cache verzia hlavnej stránky navýšená na `v=6.4.1`.

## v6.4.0 – portfólio a referencie

- Prepracovaná sekcia referencií na hlavnej stránke na jasnejší dôkazový systém.
- Pridané case studies do portfólia: klientsky web, vlastný systém, obsah/grafika a modelové weby.
- Projekty sú rozlíšené podľa dôkazovej sily: klientská realizácia, vlastný projekt, ukážka alebo externé portfólio.
- Doplnený dôkazový štandard: bez vymyslených percent a bez miešania ukážok s klientskymi realizáciami.
- Aktualizované cache verzie na `v=6.4.0` pre upravené stránky.

## v6.1.27 – odstránenie duplicitného redirect súboru

- Odstránený koreňový súbor `o-clippio.html`, aby nevznikala duplicitná HTML stránka k `/o-clippio/`.
- Legacy presmerovanie `/o-clippio.html` je riešené cez `404.html` bez samostatného duplicitného súboru.
- Aktualizovaná cache verzia assetov na `v=6.1.27`.


## v6.1.26 – pricing and trust cleanup
- Štart web updated to 199 € across web packages and function demo.
- Homepage proof section now shows clearer package-based examples: Rast, Štart and e-shop.
- Cenník separates web packages from smaller creative services more clearly.
- AI wording reduced and reframed around modern tools plus manual quality control.
- Added legacy redirect for `/o-clippio.html` to `/o-clippio/`.

## v6.1.25 – SEO/cache cleanup po oprave lišty

- Zjednotené cache verzie CSS/JS na `6.1.25` vo všetkých hlavných HTML súboroch.
- Doplnený canonical a robots meta pre `/clippio-function-web/`.
- Pridaný `/ukazkovy-web-start/` do hlavného sitemap.xml, keďže sa naň odkazuje z webu aj portfólia.
- Odstránený nepoužívaný starý JS marquee fallback, aby sa už nemiešal s novou `service-marquee` lištou.
- `noindex` ostáva iba na technických stránkach `404.html` a `/dakujeme/`, ktoré nemajú byť v indexe.


## v6.1.22 – Function Web static fix

- Clippio Function Web bol nahradený stabilnou statickou verziou bez React/Vite buildu.
- Opravené relatívne asset cesty pre GitHub Pages.
- Pridané funkčné prepínanie pozadí, shiny text, typewriter, CountUp, accordion, tabs, formulár, spotlight a nekonečný pás.
- Odstránené staré nepoužívané build chunk súbory z ukážky funkcií.

# Changelog

## v6.1.20
- Opravené vypnuté React Bits textové efekty: shiny text, gradient text a rotujúce slová sú znovu aktívne.
- Aktualizovaný cache query parameter na `v=6.1.20`.

## v6.1.19
- Opravená nekonečná lišta služieb na hlavnej stránke.
- Lišta má teraz pevne oddelené dve rovnaké skupiny a animuje sa cez `translate3d(-50%, 0, 0)`, takže plynulo pokračuje bez statického zalomenia.
- Aktualizovaný cache query parameter na `v=6.1.19`.

## v6.1.17 – Function Web improvement pass

- Prepracovaný `clippio-function-web` z ťažšieho React/Vite buildu na jednoduchú statickú HTML/CSS/JS ukážku vhodnú pre GitHub Pages.
- Pridaný obchodnejší hero blok: funkcie sú prezentované podľa problému, ktorý riešia, nie ako náhodná galéria efektov.
- Doplnil sa celostránkový prepínač vizuálneho režimu: Clean Light, Liquid Glass, Blue Gradient, Dark Premium a Warm Accent.
- Katalóg funkcií má filtre podľa použitia: vizuál, text, interakcie a predaj.
- Zachované sú jasné odkazy späť na Clippio, tvorbu webov, portfólio a kontakt.
- Odstránené staré hashované Vite assety vo Function Webe a ponechané iba produkčné súbory potrebné pre túto ukážku.
- Pridané stabilnejšie mobilné správanie, `prefers-reduced-motion` a jednoduchšie reveal animácie.

## v6.1.16 – smoothness performance pass

- Vypnutá nekonečná pohybujúca sa lišta, ktorá mohla opticky sekať.
- Odstránený ťažký `backdrop-filter` zo sticky/fixed prvkov.
- Odľahčené veľké tiene na kartách a CTA blokoch.
- Na mobile vypnuté scroll reveal animácie pre stabilnejší pohyb.
- Skrátené reveal prechody a znížený stagger delay.
- Vypnutý automatický CTA pulz / pripomienka počas scrollu.
- Optimalizované veľké ikony a favicony.
- Aktualizovaný cache-busting CSS/JS na v6.1.16.

## v6.1.15 – clean URL cleanup

- Odstránené koreňové `.html` presmerovania, ktoré duplikovali priečinkové URL.
- Zachované čisté URL cez priečinky s `index.html`.
- Skontrolované a ponechané interné odkazy smerujúce na čisté cesty typu `/weby/`, `/portfolio/`, `/kontakt/`.
- Aktualizovaný cache-busting CSS/JS na v6.1.15.
- README upravené podľa čistejšej štruktúry deployu.

## v6.1.14 – file cleanup & deployment cleanup

- Odstránené nepoužívané duplicitné assety zo staršej štruktúry `assets/`.
- Vyčistený `clippio-function-web` od zdrojového Vite projektu, `package` súborov, duplicitného `dist/` a starých build assetov.
- Odstránené interné README/poznámkové súbory v podpriečinkoch, ktoré nie sú potrebné pre verejný web.
- Zachované `.html` presmerovania kvôli starším odkazom a bezpečnej spätnej kompatibilite.
- Bez zásahu do dizajnu, HTML obsahu, formulárov a produkčných CSS/JS súborov.

## v6.1.13 – animation cleanup & consistency update

- Zjednotené animácie na pokojný fade-up systém s kratším posunom a jednotným easingom.
- Upravené hover efekty kariet, portfólia, ukážkových webov, referencií a CTA tlačidiel.
- Zlepšené mobilné menu: jednoduchý opacity + translateY prechod a stabilnejší hamburger.
- Znížená intenzita animácií na mobile a odstránené rušivé priebežné textové animácie.
- Zjednotený spacing sekcií, radius, tiene a správanie hlavných kariet.
- Upravené referencie do štruktúry klient/projekt, čo sa riešilo, čo bolo dodané a praktický prínos.
- Upravený katalóg ukážkových webov do obchodnejšej a kratšej podoby.
- Doplnená podpora `prefers-reduced-motion` pre prístupnosť.
- Aktualizovaný cache-busting CSS/JS verzie na v6.1.13.


## v6.1.12 – oprava Function Webu a katalógu ukážkových webov

- Pridaný jasný návrat z Clippio Function Webu späť na hlavnú stránku Clippio a do katalógu ukážkových webov.
- Upravené karty funkcií vo Function Webe, aby neboli zbytočne natiahnuté a text sa nelámal do úzkych stĺpcov.
- Upravený katalóg ukážkových webov na stránke Tvorba webov do kompaktnejšieho 2×2 rozloženia.
- Aktualizovaný cache-busting CSS verzie na v6.1.12.

# Changelog

## v6.1.11 – aktualizovaný Clippio Function Web Redone

- Vymenený ukážkový web `clippio-function-web` za novú redone verziu.
- Zachovaný celý zdrojový Vite/React projekt aj deploy build pre GitHub Pages.
- Upravené cesty k JS, CSS a logu tak, aby ukážka fungovala v podpriečinku `/clippio-function-web/`.
- Pôvodný Vite vstup ponechaný ako `index.vite-source.html`, deploy vstup ostáva `index.html`.

## v6.1.10 – aktualizovaný Clippio Function Web

- Nahradená ukážka `Clippio Function Web` novou opravenou verziou zo súboru `clippio-function-web-fixed(1).zip`.
- Aktualizovaný koreňový deploy build v `clippio-function-web/index.html` a `clippio-function-web/assets/`.
- Zachovaný celý zdrojový Vite/React projekt: `src/`, `public/`, `package.json`, `package-lock.json`, `.gitignore`, `dist/` a `index.vite-source.html`.
- Upravené cesty assetov tak, aby ukážka fungovala v podpriečinku `/clippio-function-web/` na GitHub Pages.
- Aktualizované názvy výstupných ZIP balíkov na verziu v6.1.10.


## v6.1.8 – Ukážka funkcií v katalógu webov

- Pridaný samostatný ukážkový web `Clippio Function Web` na URL `/clippio-function-web/`.
- Na hlavnej stránke je karta „Ukážkové weby“ zjednodušená na jedno tlačidlo do katalógu.
- Sekcia `/weby/` bola upravená na katalóg ukážkových webov vrátane ukážky funkcií.
- Portfólio obsahuje novú kartu pre ukážku funkcií a efektov.


## v6.1.6 – oprava portfóliovej sekcie

- Upravená homepage sekcia Portfólio, aby nepôsobila natiahnuto a prázdne.
- Grid portfólia zmenený na maximálne 3 karty v riadku na desktope.
- Doplnený vecnejší text a krátke body ku kartám.
- Ukážkový e-shop Liora ostáva označený ako balík Predaj / e-shop.
- Aktualizovaný cache parameter CSS na `v=6.1.6`.

# Changelog

## v6.1.5 – ukážkový e-shop pre balík Predaj

- Pridaný ukážkový e-shop Saténové ruže Liora pod `/ukazkovy-eshop-liora/`.
- Homepage, portfólio a stránka Tvorba webov teraz ukazujú tri rozsahy webov: Štart, Rast a Predaj/e-shop.
- E-shop ukážka obsahuje produktový katalóg, detail produktu, frontend košík, objednávkový formulár, galériu, kontakt a spätný odkaz na Clippio.
- Ukážka má vlastný sitemap.xml, robots.txt, canonical URL, aby nepôsobila ako reálny obchod vo vyhľadávaní.

## v6.1.4 – spoločná karta Ukážkové weby

- Na homepage a v portfóliu boli dve samostatné ukážkové karty zlúčené do jednej karty „Ukážkové weby“.
- FreshCar Nitra a STAVEXON sú teraz prezentované ako dve položky v jednej kategórii ukážkových webov.
- Na stránke Tvorba webov bola sekcia ukážok zjednotená do jednej väčšej karty s porovnaním balíkov Štart a Rast.
- Cieľom je znížiť vizuálnu duplicitu a jasnejšie ukázať, že ide o ukážkové weby podľa rozsahu balíka.

## v6.1.3 – ukážkové weby pre balíky Štart a Rast

- Pridaný ukážkový jednostránkový web FreshCar Nitra pre balík Štart do `/ukazkovy-web-start/`.
- Homepage a portfólio už označujú ukážky všeobecnejšie ako „ukážkové weby“.
- Na stránke Tvorba webov pribudla dvojica ukážok: Štart a Rast.
- FreshCar má spätnú navigáciu na Clippio v hornej lište, navigácii a päte.
- Ukážka Štart má vlastný canonical a môže byť indexovaná ako ukážkový web v portfóliu.

## v6.1.0 – Pravdivé formulácie histórie značky

## v6.1.1 – STAVEXON ukážka balíka Rast

- Pridaný ukážkový firemný web STAVEXON pod `/ukazkovy-web-stavexon/`.
- STAVEXON doplnený do portfólia pod kartu Clippio.sk v sekcii hotových webov.
- Na stránku Tvorba webov pridaná ukážka balíka Rast v praxi.
- Doplnené CTA odkazy na ukážku a dopyt podobného webu.
- Doplnené URL STAVEXON do hlavného sitemap.xml.
- Zachovaná obchodná logika: STAVEXON zodpovedá približne balíku Rast, nie balíku Štart.

- Opravené formulácie okolo roku 2019, aby web netvrdil, že Clippio ako štúdio stabilne funguje od roku 2019.
- Homepage štatistika zmenená na „skúsenosti z osobných projektov“.
- Stránka O Clippio upravená tak, aby jasne komunikovala osobné projekty, vlastnú tvorbu a postupnú klientsku prácu.
- Bez zásahu do formulárov, Web3Forms, spreadsheet napojení, cookie banneru a floating CTA.

## v6.1.0 – Ďakovacie okno po odoslaní dopytu

- Doplnené viditeľné modálne okno „Ďakujem, dopyt bol odoslaný“ po úspešnom odoslaní formulára.
- Zachovaná inline spätná väzba pri formulári.
- Zachovaná záložná stránka `/dakujeme/` pre prípad vypnutého JavaScriptu.
- Aktualizované cache verzie CSS/JS na `v=6.1.0`.
- Bez zásahu do Web3Forms access key, spreadsheet napojení, cookie banneru a floating CTA.

## v6.0.5 – Web3Forms odosielanie fix
- Opravené správanie kontaktných formulárov po odoslaní dopytu.
- Formuláre sa už nemajú presmerovať na technickú stránku `api.web3forms.com/submit/success` s JSON hláškou.
- Doplnené JavaScriptové odosielanie cez `fetch` so správou priamo na webe.
- Doplnená záložná stránka `/dakujeme/` pre prípad, že JavaScript nebude dostupný.
- Doplnené základné štýly pre úspešnú a chybovú hlášku formulára.
- Bez zásahu do ostatných napojení a obsahu webu.

## v6.0.4 – README fix
- Aktualizovaný hlavný README.md, ktorý predtým zostal pri starom označení v4.7/v5.1.1.
- Doplnený aktuálny popis verzie v6.x, štruktúry, balíkov, napojení a nasadenia.
- Bez zásahu do funkcií webu.

## v6.0.3 – Package detail and layout fix
- Opravený prekrytý badge „Najvýhodnejšie“ v balíku Rast.
- Zväčšená medzera medzi spoločným základom webových balíkov a kartami balíkov.
- Rozšírený opis balíkov Štart, Rast a Predaj na stránke Tvorba webov aj v cenníku.
- Rozšírená sekcia O Clippio na homepage a stránke O Clippio.
- Zachované existujúce napojenia, formuláre, cookie banner a floating CTA.


## v6.0.2 – finálny obsahový patch
- Rozšírené webové balíky na stránke Tvorba webov aj v cenníku.
- Balík Rast doplnený ako profesionálny firemný web s konkrétnym rozsahom.
- Balík Predaj jasnejšie označený ako objednávkový web / menší e-shop.
- Stránka O Clippio doplnená o viac kontextu, prístup a dôvody spolupráce.
- Zachované existujúce napojenia, formuláre, cookie banner, floating CTA a lokálna štruktúra URL.

# Changelog

## v5.0.1

### Opravené
- Opravené načítanie CSS, JavaScriptu, obrázkov a favicon pri čistých URL typu `/sluzby/`.
- Všetky interné odkazy a asset cesty zmenené na root-relative tvar pre GitHub Pages.
- Staré koreňové `.html` presmerovania odstránené; web používa čisté URL cez priečinky.


## v5.0.0

### Zmenené
- Podstránky sú presunuté do priečinkov s `index.html`, aby URL fungovali bez `.html`.
- Interné odkazy, canonical URL a sitemap boli upravené na čisté URL.
- Koreňové `.html` presmerovania odstránené, aby bol deploy čistejší.

## v6.0.0 – Controlled Brand Book positioning update
- Základ ponechaný na funkčnej verzii v5.1.1.
- Homepage prepracovaná podľa Brand Book positioningu: profesionálna digitálna prezentácia, web ako hlavný pilier, foto/video/grafika/dron ako podpora.
- Zachované pôvodné funkčné moduly: navigácia, formuláre Web3Forms, novinky zo spreadsheetu, ceny fotiek zo spreadsheetu, hotové weby zo spreadsheetu, FAQ, cookie banner a floating CTA.
- Webové balíky rozšírené na Štart, Rast a Predaj/e-shop s jasnými výhodami, hranicami, faktúrou, prototypom a zárukou.
- Recenzie nahradené pripraveným dôkazovým blokom bez falošných hodnotení.
- Portfólio prepracované na reálne projekty a overiteľné odkazy.
## v6.0.1 – oprava portfólia, cenníka a balíkov
- Zvýraznený YouTube blok ako jasný preklik na YouTube portfólio.
- Doplnený preklik na Google Drive s grafikou v portfóliu.
- Odstránené návštevnícky nevhodné interné vysvetlenie pri hotových weboch.
- Rozšírený cenník o viac informácií, priame CTA na dopyt a jasnejšie vysvetlenie cien.
- Skrátené a skompaktnené webové balíky, aby karty nepôsobili zbytočne roztiahnuto.
- Zachované napojenia, formuláre, cookie banner, floating CTA a existujúce sekcie.

## v6.1.2 – spätná navigácia zo STAVEXON ukážky

- Doplnená horná lišta s návratom späť na Clippio v ukážkovom webe STAVEXON.
- Doplnený odkaz späť na Clippio do mobilnej navigácie aj päty ukážky.
- Cieľ: návštevník sa po otvorení ukážkového webu nezasekne mimo hlavnej stránky Clippio.

## v6.1.9 – doplnený zdrojový projekt Clippio Function Web

- Do priečinka `clippio-function-web/` boli doplnené aj zdrojové Vite/React súbory.
- Funkčná statická verzia pre GitHub Pages ostáva v koreňovom `clippio-function-web/index.html`.
- Pôvodný Vite vstupný súbor je uložený ako `clippio-function-web/index.vite-source.html`, aby neprepísal deploy verziu.



## v6.1.23
- Definitívna oprava nekonečnej lišty: pohyb rieši JS cez requestAnimationFrame, nie CSS animácia.
- Lišta si sama duplikuje obsah a posúva sa pixelovo bez skoku.
