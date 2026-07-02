import { useEffect, useMemo, useRef, useState } from 'react';

const themes = [
  {
    id: 'clean-light',
    title: 'Clean Light',
    note: 'Čistý firemný web. Najlepšie pre služby, ktoré majú pôsobiť dôveryhodne a rýchlo.',
  },
  {
    id: 'dark-premium',
    title: 'Dark Premium',
    note: 'Tmavší prémiový dojem. Vhodné pre video, eventy, tech a kreatívne služby.',
  },
  {
    id: 'liquid-glass',
    title: 'Liquid Glass',
    note: 'Glassmorphism a jemné odlesky. Použiť opatrne, inak web začne pôsobiť lacno.',
  },
  {
    id: 'blue-gradient',
    title: 'Blue Gradient',
    note: 'Moderný modrý gradient. Dobré pre online služby, SaaS a digitálne ponuky.',
  },
  {
    id: 'warm-accent',
    title: 'Warm Accent',
    note: 'Teplejší akcent. Vhodné pre osobnejšie značky, ručnú prácu alebo lokálne služby.',
  },
  {
    id: 'image-background',
    title: 'Image Background',
    note: 'Obrazové pozadie. Funguje iba vtedy, keď text zostane čitateľný a fotka má zmysel.',
  },
];

const functionItems = [
  { id: 'blurText', name: 'BlurText', category: 'Textové efekty', tier: 'Rast / Predaj', demo: 'blurText', where: 'Hero nadpis, silné úvodné claimy', description: 'Text sa pri príchode jemne odostrí. Pomáha zvýšiť prvý dojem bez toho, aby web kričal animáciami.' },
  { id: 'splitText', name: 'SplitText', category: 'Textové efekty', tier: 'Rast / Predaj', demo: 'splitText', where: 'Nadpisy sekcií, landing pages', description: 'Rozkladá nadpis na znaky alebo slová. Dobré na premium pocit, ale nie na každý odsek.' },
  { id: 'circularText', name: 'CircularText', category: 'Textové efekty', tier: 'Doplnková funkcia', demo: 'circularText', where: 'Badge, hero doplnok, mikrointerakcia', description: 'Kruhový text vytvorí výrazný vizuálny prvok. Treba ho používať skôr ako detail, nie ako hlavný obsah.' },
  { id: 'textType', name: 'TextType', category: 'Textové efekty', tier: 'Štart / Rast', demo: 'textType', where: 'Hero veta, dynamické služby', description: 'Písací efekt vie ukázať viac služieb na jednom mieste. Dáva zmysel, keď nechceš zahltiť hero textom.' },
  { id: 'shinyText', name: 'ShinyText', category: 'Textové efekty', tier: 'Rast / Predaj', demo: 'shinyText', where: 'CTA, premium nadpis, highlight', description: 'Lesklý prechod cez text zvýrazní dôležitú vetu. Ak sa preženie, pôsobí ako lacný efekt.' },
  { id: 'textPressure', name: 'TextPressure', category: 'Textové efekty', tier: 'Doplnková funkcia', demo: 'textPressure', where: 'Kreatívne weby, portfóliá', description: 'Interaktívny text reaguje na kurzor. Vhodné pre značky, ktoré chcú pôsobiť odvážnejšie.' },
  { id: 'curvedLoop', name: 'CurvedLoop', category: 'Textové efekty', tier: 'Doplnková funkcia', demo: 'curvedLoop', where: 'Marquee pás, event web, kreativita', description: 'Text beží po oblúku. Hodí sa ako atmosférický prvok, nie ako nositeľ dôležitých informácií.' },
  { id: 'fuzzyText', name: 'FuzzyText', category: 'Textové efekty', tier: 'Doplnková funkcia', demo: 'fuzzyText', where: '404, gaming, tech, glitch sekcie', description: 'Roztrasený/glitch text vytvára technický dojem. Použiteľné len tam, kde to sedí so značkou.' },
  { id: 'gradientText', name: 'GradientText', category: 'Textové efekty', tier: 'Štart / Rast', demo: 'gradientText', where: 'Highlighty, čísla, silné slová', description: 'Gradientový text zvýrazní dôležité slovo bez veľkej animácie. Má dobrý pomer efekt/cena.' },
  { id: 'decryptedText', name: 'DecryptedText', category: 'Textové efekty', tier: 'Rast / Predaj', demo: 'decryptedText', where: 'Tech web, tajomnejší reveal', description: 'Text sa skladá z náhodných znakov do čitateľnej vety. Silný efekt, ale nevhodný pre bežný lokálny firemný web.' },
  { id: 'trueFocus', name: 'TrueFocus', category: 'Interakcie', tier: 'Rast', demo: 'trueFocus', where: 'Výber služby, výber balíka', description: 'Zvýrazní aktívne slovo alebo možnosť. Pomáha používateľovi sústrediť sa na výber.' },
  { id: 'scrollFloat', name: 'ScrollFloat', category: 'Scroll efekty', tier: 'Rast / Predaj', demo: 'scrollFloat', where: 'Sekcie dôvery, titulky', description: 'Prvky sa pri scrollovaní jemne nadnášajú. Pôsobí moderne, keď sa nepoužíva na všetko.' },
  { id: 'rotatingText', name: 'RotatingText', category: 'Textové efekty', tier: 'Štart / Rast', demo: 'rotatingText', where: 'Hero claim, premenlivá ponuka', description: 'Strieda slová v jednej vete. Praktické, keď firma robí viac príbuzných služieb.' },
  { id: 'scrollVelocity', name: 'ScrollVelocity', category: 'Scroll efekty', tier: 'Doplnková funkcia', demo: 'scrollVelocity', where: 'Pás značiek, referencie, event', description: 'Bežiaci pás vytvorí pohyb v stránke. Má byť doplnok, nie náhrada za obsah.' },
  { id: 'variableProximity', name: 'VariableProximity', category: 'Interakcie', tier: 'Doplnková funkcia', demo: 'variableProximity', where: 'Kreatívny headline, experimentálne weby', description: 'Text reaguje na vzdialenosť kurzora. Pekné pre ukážku schopností, slabší ROI pri jednoduchom firemnom webe.' },
  { id: 'countUpTrust', name: 'CountUp – čísla dôvery', category: 'Predajné sekcie', tier: 'Štart / Rast', demo: 'countUp', where: 'Štatistiky, dôvera, referencie', description: 'Animované čísla rýchlo ukážu rozsah práce. Zmysel majú iba vtedy, keď sú reálne.' },
  { id: 'countUpSales', name: 'CountUp – predajný metrík', category: 'Predajné sekcie', tier: 'Rast / Predaj', demo: 'countUpSecond', where: 'Landing page, e-shop, lead magnet', description: 'Druhý typ počítadla môže ukázať objednávky, produkty alebo kroky procesu. Nepoužívať na nafúknuté čísla.' },
  { id: 'electricBorder', name: 'ElectricBorder', category: 'Karty a hover', tier: 'Predaj / Doplnková funkcia', demo: 'electricBorder', where: 'Premium karta, CTA box', description: 'Elektrický okraj pritiahne pozornosť ku konkrétnej karte. Dáva zmysel na jednu prioritu, nie na všetky boxy.' },
  { id: 'glareHover', name: 'GlareHover', category: 'Karty a hover', tier: 'Rast', demo: 'glareHover', where: 'Produktová karta, portfólio', description: 'Odlesk pri prejdení myšou zvyšuje pocit interaktivity. Lacný na výkon, použiteľný aj na menších weboch.' },
  { id: 'logoLoop', name: 'LogoLoop', category: 'Predajné sekcie', tier: 'Rast / Predaj', demo: 'logoLoop', where: 'Partneri, klienti, značky', description: 'Loop s logami môže podporiť dôveru. Nemá sa používať, ak nemáš reálne značky alebo referencie.' },
  { id: 'targetCursor', name: 'TargetCursor', category: 'Interakcie', tier: 'Doplnková funkcia', demo: 'targetCursor', where: 'Tech demo, gaming, kreatívne portfólio', description: 'Cielený kurzor mení pocit z webu. Pre bežné firmy môže pôsobiť zbytočne rušivo.' },
  { id: 'gradualBlur', name: 'GradualBlur', category: 'Pozadia a vrstvy', tier: 'Rast', demo: 'gradualBlur', where: 'Prechod medzi sekciami, overlay', description: 'Postupný blur pomáha oddeliť obsah od pozadia. Dobré pri obrazových alebo tmavých sekciách.' },
  { id: 'clickSpark', name: 'ClickSpark', category: 'Interakcie', tier: 'Doplnková funkcia', demo: 'clickSpark', where: 'CTA, hravé weby', description: 'Kliknutie vytvorí malú iskru. Je to detail pre zapamätateľnosť, nie obchodný základ.' },
  { id: 'magnet', name: 'Magnet', category: 'Interakcie', tier: 'Rast / Doplnková funkcia', demo: 'magnet', where: 'CTA tlačidlá, navigácia', description: 'Tlačidlo jemne priťahuje kurzor. Vie zvýšiť pocit kvality pri dôležitom CTA.' },
  { id: 'strands', name: 'Strands', category: 'Pozadia a vrstvy', tier: 'Predaj / Doplnková funkcia', demo: 'strands', where: 'Hero pozadie, tech web', description: 'Jemné prúdy/čiary v pozadí vytvárajú dynamiku. Treba strážiť čitateľnosť textu.' },
  { id: 'stickerPeel', name: 'StickerPeel', category: 'Karty a hover', tier: 'Doplnková funkcia', demo: 'stickerPeel', where: 'Promo štítok, zľava, novinka', description: 'Efekt odlepenej nálepky funguje na promo prvky. Nepatrí do serióznych právnych alebo zdravotných webov.' },
  { id: 'cubes', name: 'Cubes', category: '3D a vizuály', tier: 'Predaj / Doplnková funkcia', demo: 'cubes', where: 'Tech, SaaS, kreatívne štúdio', description: '3D kocky dodajú hĺbku a moderný vzhľad. Na mobile musia zostať jednoduché.' },
  { id: 'metallicPaint', name: 'MetallicPaint', category: '3D a vizuály', tier: 'Doplnková funkcia', demo: 'metallicPaint', where: 'Premium logo, headline, detail', description: 'Metalický efekt pôsobí luxusne, ale ľahko sa zmení na gýč. Použiť iba ako akcent.' },
  { id: 'noise', name: 'Noise', category: 'Pozadia a vrstvy', tier: 'Štart / Rast', demo: 'noise', where: 'Pozadie, jemná textúra', description: 'Jemný šum rozbije sterilný digitálny vzhľad. Je to lacný detail s dobrým vizuálnym prínosom.' },
  { id: 'shapeBlur', name: 'ShapeBlur', category: 'Pozadia a vrstvy', tier: 'Rast / Predaj', demo: 'shapeBlur', where: 'Hero, sekcie s kartami', description: 'Rozmazané tvary vytvoria hĺbku. Musia byť jemné, aby nebrali pozornosť obsahu.' },
  { id: 'imageTrail', name: 'ImageTrail', category: 'Interakcie', tier: 'Doplnková funkcia', demo: 'imageTrail', where: 'Portfólio, kreatívne kampane', description: 'Za kurzorom sa objavujú náhľady. Efekt je výrazný, preto patrí skôr na kreatívne weby než na firemné služby.' },
  { id: 'metaBalls', name: 'MetaBalls', category: 'Pozadia a vrstvy', tier: 'Predaj / Doplnková funkcia', demo: 'metaBalls', where: 'Hero pozadie, moderné landing pages', description: 'Spájajúce sa blob tvary pôsobia fluidne. Dobré na atmosféru, nie na informačný obsah.' },
  { id: 'starBorder', name: 'StarBorder', category: 'Karty a hover', tier: 'Rast / Predaj', demo: 'starBorder', where: 'CTA, prémiová karta', description: 'Hviezdny okraj pomáha vytiahnuť jeden prvok. Ak ho má každá karta, stratí význam.' },
  { id: 'scrollStack', name: 'ScrollStack', category: 'Scroll efekty', tier: 'Predaj', demo: 'scrollStack', where: 'Proces, prípadové štúdie', description: 'Karty sa vrstvia ako príbeh. Vhodné pre vysvetlenie postupu alebo balíkov.' },
  { id: 'magicBento', name: 'MagicBento', category: 'Predajné sekcie', tier: 'Rast / Predaj', demo: 'magicBento', where: 'Prehľad služieb, benefitov', description: 'Bento rozloženie vyzerá moderne a šetrí miesto. Má zmysel pri viacerých rovnocenných výhodách.' },
  { id: 'stack', name: 'Stack', category: 'Karty a hover', tier: 'Rast', demo: 'stack', where: 'Portfólio, ukážky práce', description: 'Naskladané karty naznačia viac obsahu bez zahltenia. Praktické pre portfólio alebo fotky.' },
  { id: 'fluidGlass', name: 'FluidGlass', category: 'Pozadia a vrstvy', tier: 'Predaj', demo: 'fluidGlass', where: 'Premium sekcie, moderné služby', description: 'Tekuté sklo vytvorí prémiový dojem. Vyžaduje disciplínu v kontraste a počte efektov.' },
  { id: 'tiltedCard', name: 'TiltedCard', category: 'Karty a hover', tier: 'Rast', demo: 'tiltedCard', where: 'Portfólio, produkt, služba', description: 'Karta sa pri hoveri nakloní. Efekt je jednoduchý, ale viditeľne zlepší pocit z webu.' },
  { id: 'masonry', name: 'Masonry', category: 'Predajné sekcie', tier: 'Rast / Predaj', demo: 'masonry', where: 'Galéria, realizácie, produkty', description: 'Masonry rozloženie je dobré pre rôzne vysoké fotky. Hodí sa pre remeslá, eventy a portfólio.' },
  { id: 'folder', name: 'Folder', category: 'Interakcie', tier: 'Doplnková funkcia', demo: 'folder', where: 'Súbory, materiály, dokumenty', description: 'Folder metafora je použiteľná pre dokumenty, balíky alebo zdroje. Nie je nutná na bežnom webe.' },
  { id: 'staggeredMenu', name: 'StaggeredMenu', category: 'Navigácia', tier: 'Rast / Predaj', demo: 'staggeredMenu', where: 'Mobilné menu, bočná navigácia', description: 'Položky menu sa zobrazujú postupne. Zlepšuje dojem z navigácie, ak zostane rýchla.' },
  { id: 'profileCard', name: 'ProfileCard', category: 'Predajné sekcie', tier: 'Štart / Rast', demo: 'profileCard', where: 'O firme, garant projektu, referencia', description: 'Profilová karta dodáva ľudskosť a dôveru. Použiť, keď má zmysel ukázať človeka alebo garanta.' },
  { id: 'dock', name: 'Dock', category: 'Navigácia', tier: 'Doplnková funkcia', demo: 'dock', where: 'Rýchle odkazy, app-like web', description: 'Dock menu pôsobí ako aplikácia. Pre firemný web je to skôr bonus než priorita.' },
  { id: 'gooeyNav', name: 'GooeyNav', category: 'Navigácia', tier: 'Doplnková funkcia', demo: 'gooeyNav', where: 'Kreatívna navigácia', description: 'Gooey prechod medzi položkami je hravý. Dobre vyzerá, ale môže odvádzať pozornosť.' },
  { id: 'spotlightCard', name: 'SpotlightCard', category: 'Karty a hover', tier: 'Rast / Predaj', demo: 'spotlightCard', where: 'Cenník, služby, benefity', description: 'Karta reaguje svetlom na kurzor. Výborný kompromis medzi efektom a použiteľnosťou.' },
  { id: 'borderGlow', name: 'BorderGlow', category: 'Karty a hover', tier: 'Rast', demo: 'borderGlow', where: 'CTA, formulár, dôležitý box', description: 'Glow okraj zvýrazní dôležitý prvok. Neprežeň ho, inak web pôsobí lacno.' },
  { id: 'cardSwap', name: 'CardSwap', category: 'Interakcie', tier: 'Rast / Predaj', demo: 'cardSwap', where: 'Pred/po, varianty balíka, služby', description: 'Prepínanie kariet pomáha porovnať viac stavov bez dlhého scrollu.' },
  { id: 'glassIcons', name: 'GlassIcons', category: 'Pozadia a vrstvy', tier: 'Rast / Predaj', demo: 'glassIcons', where: 'Výhody, služby, funkcie', description: 'Ikony v skle zvyšujú vizuálnu kvalitu. Sú vhodné len pri modernom štýle stránky.' },
  { id: 'infiniteMenu', name: 'InfiniteMenu', category: 'Navigácia', tier: 'Doplnková funkcia', demo: 'infiniteMenu', where: 'Kategórie, kreatívne menu', description: 'Nekonečné menu je efektné, ale nie vždy najpraktickejšie. Použiť, keď je zážitok cieľom.' },
  { id: 'stepper', name: 'Stepper', category: 'Predajné sekcie', tier: 'Štart / Rast', demo: 'stepper', where: 'Proces spolupráce, objednávka', description: 'Stepper vysvetlí postup v krokoch. Toto má vysoký obchodný ROI, lebo znižuje neistotu klienta.' },
  { id: 'ferrofluid', name: 'Ferrofluid', category: '3D a vizuály', tier: 'Doplnková funkcia', demo: 'ferrofluid', where: 'Experimentálny hero, tech brand', description: 'Organický tekutý efekt pôsobí veľmi moderne. Je drahší na pozornosť aj výkon, preto len v malom množstve.' },
  { id: 'lineWaves', name: 'LineWaves', category: 'Pozadia a vrstvy', tier: 'Rast / Predaj', demo: 'lineWaves', where: 'Pozadie sekcie, hero dekorácia', description: 'Vlnové čiary pridajú pohyb bez veľkej agresivity. Dobré pozadie pre textové sekcie.' },
  { id: 'gridDistortion', name: 'GridDistortion', category: '3D a vizuály', tier: 'Doplnková funkcia', demo: 'gridDistortion', where: 'Tech vizuál, interaktívna sekcia', description: 'Deformovaná mriežka pôsobí futuristicky. Pre bežný web má nízky ROI, pre tech demo vysoký.' },
  { id: 'prismaticBurst', name: 'PrismaticBurst', category: '3D a vizuály', tier: 'Predaj / Doplnková funkcia', demo: 'prismaticBurst', where: 'Hero highlight, launch sekcia', description: 'Prizmatický výbuch vytvorí silný vizuálny moment. Použiť maximálne raz na stránke.' },
  { id: 'liquidChrome', name: 'LiquidChrome', category: '3D a vizuály', tier: 'Predaj / Doplnková funkcia', demo: 'liquidChrome', where: 'Premium hero, detail značky', description: 'Tekutý chrome efekt je vizuálne silný. Dáva zmysel len pri prémiovej alebo experimentálnej identite.' },
];

const categoryOrder = ['Všetko', 'Textové efekty', 'Pozadia a vrstvy', 'Karty a hover', 'Predajné sekcie', 'Interakcie', 'Navigácia', 'Scroll efekty', '3D a vizuály'];

export default function App() {
  const [theme, setTheme] = useState('blue-gradient');
  const [filter, setFilter] = useState('Všetko');
  const activeTheme = themes.find((item) => item.id === theme) ?? themes[0];
  const filteredItems = useMemo(() => {
    if (filter === 'Všetko') return functionItems;
    return functionItems.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <div className={`site theme-${theme}`}>
      <GlobalBackdrop theme={theme} />
      <Header />
      <main>
        <Hero activeTheme={activeTheme} />
        <BackgroundSwitcher activeTheme={activeTheme} theme={theme} setTheme={setTheme} />
        <PracticalWebSection />
        <FunctionShowcase filteredItems={filteredItems} filter={filter} setFilter={setFilter} />
        <SelectionGuide />
        <FinalCTA />
      </main>
      <StickyCTA />
    </div>
  );
}

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Späť na hlavnú stránku Clippio">
        <img src="/logo-clippio.png" alt="Clippio logo" />
        <span>Clippio Function Web</span>
      </a>
      <nav className="nav">
        <a className="nav-home-link" href="/">← Clippio.sk</a>
        <a href="/weby/#katalog-ukazkovych-webov">Katalóg webov</a>
        <a href="#pozadia">Pozadia</a>
        <a href="#web">Web v praxi</a>
        <a href="#ukazky">Ukážky</a>
        <a href="#vyber">Výber</a>
      </nav>
    </header>
  );
}

function Hero({ activeTheme }) {
  return (
    <section id="top" className="hero section-shell">
      <div className="hero-copy">
        <div className="eyebrow"><ShinyText text="Interaktívna ukážková stránka" /></div>
        <h1>
          Web, kde si klient vie pozrieť <GradientText>reálne použiteľné prvky</GradientText> pred objednávkou.
        </h1>
        <BlurText text="Nie každá animácia má obchodný zmysel. Tu sú efekty ukázané tak, aby bolo jasné, kde pomáhajú a kde už len pália rozpočet." />
        <div className="hero-dynamic">
          <span>Aktuálne pozadie:</span>
          <strong>{activeTheme.title}</strong>
          <TextType texts={['firemný web', 'prémiový landing page', 'e-shop demo', 'portfólio', 'predajná sekcia']} />
        </div>
        <div className="hero-actions">
          <a className="btn primary magnet" href="#pozadia">Prepínať pozadia</a>
          <a className="btn secondary" href="#ukazky">Pozrieť ukážky</a>
          <a className="btn secondary" href="/">Späť na Clippio</a>
        </div>
        <p className="boundary-note">Toto nie je kompletný zoznam všetkého, čo sa dá na webe spraviť. Je to výber použiteľných funkcií z priložených promptov, spracovaný ako funkčný web.</p>
      </div>
      <div className="hero-visual spotlight-card">
        <div className="hero-logo-card fluid-glass">
          <img src="/logo-clippio.png" alt="Clippio" />
          <CircularText text="CLIPPIO*FUNCTION*WEB*" />
        </div>
        <div className="floating-proof electric-border">
          <CountUp target={55} suffix="/55" />
          <span>promptových prvkov zapracovaných do stránky</span>
        </div>
        <div className="code-chip"><DecryptedText text="effects ≠ value, unless they support the goal" /></div>
      </div>
    </section>
  );
}

function BackgroundSwitcher({ activeTheme, theme, setTheme }) {
  return (
    <section id="pozadia" className="section-shell background-lab">
      <div className="section-head">
        <span className="eyebrow">Globálny prepínač</span>
        <h2>Výber pozadia mení celú stránku, nie iba malý preview box.</h2>
        <p>{activeTheme.note}</p>
      </div>
      <div className="theme-grid">
        {themes.map((item) => (
          <button
            className={`theme-card ${theme === item.id ? 'active' : ''}`}
            key={item.id}
            onClick={() => setTheme(item.id)}
            type="button"
          >
            <span className={`theme-swatch swatch-${item.id}`} />
            <strong>{item.title}</strong>
            <small>{item.note}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function PracticalWebSection() {
  return (
    <section id="web" className="section-shell practical-web">
      <div className="section-head center">
        <span className="eyebrow">Funkcie v reálnom webe</span>
        <h2>Toto nemá byť galéria náhodných efektov. Takto by sa dali použiť v normálnej stránke.</h2>
        <p>Nižšie sú sekcie, ktoré by klient reálne vedel dostať: hero, dôvera, služby, proces, mini e-shop prvok a CTA.</p>
      </div>

      <div className="landing-demo">
        <div className="landing-hero fluid-glass glare-hover">
          <div>
            <span className="pill">Ukážkový landing page blok</span>
            <h3><RotatingText prefix="Web pre" words={['lokálnu firmu', 'prémiovú službu', 'online predaj', 'kreatívne portfólio']} /></h3>
            <p>Efekty sú len podpora. Hlavné je, aby návštevník pochopil ponuku, dôveroval stránke a vedel spraviť ďalší krok.</p>
          </div>
          <button className="btn primary click-spark-button">Nezáväzná ponuka</button>
        </div>

        <div className="bento magic-bento">
          <article><GradientText>Rýchle načítanie</GradientText><p>Animácie nesmú zabíjať výkon.</p></article>
          <article><ShinyText text="Premium dojem" /><p>Len tam, kde zvyšuje vnímanú hodnotu.</p></article>
          <article><CountUp target={3} suffix=" kroky" /><p>Jasný proces spolupráce.</p></article>
          <article><DecryptedText text="Bez slepých sľubov" /><p>Rozsah sa vyberá podľa cieľa.</p></article>
        </div>

        <div className="process-and-shop">
          <StepperDemo />
          <MiniShopDemo />
        </div>
      </div>
    </section>
  );
}

function FunctionShowcase({ filteredItems, filter, setFilter }) {
  return (
    <section id="ukazky" className="section-shell showcase-section">
      <div className="section-head">
        <span className="eyebrow">Použité prvky z promptov</span>
        <h2>Každá funkcia má vlastnú živú ukážku a obchodný dôvod použitia.</h2>
        <p>Nie je to sľub, že všetko patrí do každého balíka. Je to knižnica možností, z ktorej sa vyberá podľa cieľa, rozpočtu a technickej náročnosti.</p>
      </div>
      <div className="filters" aria-label="Filtrovanie funkcií">
        {categoryOrder.map((item) => (
          <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} type="button">
            {item}
          </button>
        ))}
      </div>
      <div className="showcase-grid">
        {filteredItems.map((item) => (
          <FunctionCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}

function FunctionCard({ item }) {
  return (
    <article className={`function-card ${item.demo}`}>
      <div className="function-demo">
        <DemoRenderer demo={item.demo} label={item.name} />
      </div>
      <div className="function-content">
        <div className="function-topline">
          <span>{item.category}</span>
          <b>{item.tier}</b>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <small>Vhodné pre: {item.where}</small>
      </div>
    </article>
  );
}

function DemoRenderer({ demo, label }) {
  switch (demo) {
    case 'blurText': return <BlurText text="Nadpis prichádza čisto" compact />;
    case 'splitText': return <SplitText text="SPLIT" />;
    case 'circularText': return <CircularText text="CLIPPIO*WEB*" small />;
    case 'textType': return <TextType texts={['web', 'e-shop', 'landing page']} compact />;
    case 'shinyText': return <ShinyText text="Shiny CTA" />;
    case 'textPressure': return <TextPressure text="PRESS" />;
    case 'curvedLoop': return <CurvedLoop text="moderný web ✦ čistý efekt ✦" />;
    case 'fuzzyText': return <FuzzyText text="GLITCH" />;
    case 'gradientText': return <GradientText>Gradient highlight</GradientText>;
    case 'decryptedText': return <DecryptedText text="Hover decrypt" />;
    case 'trueFocus': return <TrueFocus words={['Štart', 'Rast', 'Predaj']} />;
    case 'scrollFloat': return <ScrollFloat />;
    case 'rotatingText': return <RotatingText words={['web', 'video', 'brand']} />;
    case 'scrollVelocity': return <ScrollVelocity />;
    case 'variableProximity': return <VariableProximity text="PROXIMITY" />;
    case 'countUp': return <CountUp target={30} suffix="+" />;
    case 'countUpSecond': return <CountUp target={12} suffix=" sekcií" />;
    case 'electricBorder': return <div className="demo-tile electric-border">CTA karta</div>;
    case 'glareHover': return <div className="demo-tile glare-hover">Hover odlesk</div>;
    case 'logoLoop': return <LogoLoop />;
    case 'targetCursor': return <TargetCursorDemo />;
    case 'gradualBlur': return <GradualBlurDemo />;
    case 'clickSpark': return <ClickSparkDemo />;
    case 'magnet': return <MagnetDemo />;
    case 'strands': return <StrandsDemo />;
    case 'stickerPeel': return <StickerPeelDemo />;
    case 'cubes': return <CubesDemo />;
    case 'metallicPaint': return <MetallicPaintDemo />;
    case 'noise': return <NoiseDemo />;
    case 'shapeBlur': return <ShapeBlurDemo />;
    case 'imageTrail': return <ImageTrailDemo />;
    case 'metaBalls': return <MetaBallsDemo />;
    case 'starBorder': return <div className="demo-tile star-border">Star border</div>;
    case 'scrollStack': return <ScrollStackDemo />;
    case 'magicBento': return <MagicBentoDemo />;
    case 'stack': return <StackDemo />;
    case 'fluidGlass': return <div className="demo-tile fluid-glass">Fluid glass</div>;
    case 'tiltedCard': return <TiltedCardDemo />;
    case 'masonry': return <MasonryDemo />;
    case 'folder': return <FolderDemo />;
    case 'staggeredMenu': return <StaggeredMenuDemo />;
    case 'profileCard': return <ProfileCardDemo />;
    case 'dock': return <DockDemo />;
    case 'gooeyNav': return <GooeyNavDemo />;
    case 'spotlightCard': return <div className="demo-tile spotlight-card">Spotlight</div>;
    case 'borderGlow': return <div className="demo-tile border-glow">Glow border</div>;
    case 'cardSwap': return <CardSwapDemo />;
    case 'glassIcons': return <GlassIconsDemo />;
    case 'infiniteMenu': return <InfiniteMenuDemo />;
    case 'stepper': return <StepperDemo mini />;
    case 'ferrofluid': return <FerrofluidDemo />;
    case 'lineWaves': return <LineWavesDemo />;
    case 'gridDistortion': return <GridDistortionDemo />;
    case 'prismaticBurst': return <PrismaticBurstDemo />;
    case 'liquidChrome': return <LiquidChromeDemo />;
    default: return <div className="demo-tile">{label}</div>;
  }
}

function SelectionGuide() {
  return (
    <section id="vyber" className="section-shell guide-section">
      <div className="section-head center">
        <span className="eyebrow">Rozumný výber</span>
        <h2>Efekty nie sú cieľ. Cieľ je lepší web za rozumný rozpočet.</h2>
        <p>Najväčšia chyba by bola ukázať klientovi všetko a tváriť sa, že všetko automaticky patrí do každého balíka.</p>
      </div>
      <div className="guide-grid">
        <article>
          <h3>Jednoduchý firemný web</h3>
          <p>Clean pozadie, jasné CTA, služby, kontakt, ľahké hover efekty. Tu je ROI v dôvere a rýchlosti, nie v 3D animáciách.</p>
        </article>
        <article>
          <h3>Prémiovejší web</h3>
          <p>Silnejší hero, glass karty, textové efekty, referencie, proces a lepšie mikrointerakcie. Efekty musia podporiť hodnotu služby.</p>
        </article>
        <article>
          <h3>Predajný web alebo e-shop</h3>
          <p>Produktové karty, výber variantov, FAQ, dôveryhodnostné prvky, CTA bloky a jasný tok objednávky. Tu má dizajn slúžiť konverzii.</p>
        </article>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-shell final-cta">
      <div>
        <span className="eyebrow">Záver</span>
        <h2>Chceš web s funkciami, ktoré dávajú zmysel?</h2>
        <p>Vyberú sa iba prvky, ktoré pomôžu webu pôsobiť lepšie, predávať jasnejšie alebo zjednodušiť používanie. Nie všetko musí byť na každom webe.</p>
        <p className="boundary-note">Táto stránka slúži ako ukážka možných funkcií. Konkrétny rozsah webu sa vždy vyberá podľa cieľa projektu, rozpočtu a technickej náročnosti.</p>
      </div>
      <div className="hero-actions">
        <a className="btn primary" href="mailto:info@clippio.sk">Kontaktovať Clippio</a>
        <a className="btn secondary" href="/weby/#katalog-ukazkovych-webov">Katalóg ukážkových webov</a>
        <a className="btn secondary" href="/">Späť na Clippio.sk</a>
      </div>
    </section>
  );
}

function StickyCTA() {
  return <a className="sticky-cta border-glow" href="#top">↑ Ukážky</a>;
}

function GlobalBackdrop({ theme }) {
  return (
    <div className="global-backdrop" aria-hidden="true">
      <div className="blob blob-one" />
      <div className="blob blob-two" />
      <div className="blob blob-three" />
      {theme === 'image-background' && <div className="image-layer" />}
      <div className="noise-layer" />
      <LineWavesDecor />
    </div>
  );
}

function BlurText({ text, compact = false }) {
  return (
    <p className={`blur-text ${compact ? 'compact' : ''}`}>
      {text.split(' ').map((word, index) => <span style={{ '--i': index }} key={`${word}-${index}`}>{word}</span>)}
    </p>
  );
}

function SplitText({ text }) {
  return <div className="split-text">{text.split('').map((char, index) => <span key={index} style={{ '--i': index }}>{char}</span>)}</div>;
}

function CircularText({ text, small = false }) {
  const chars = text.split('');
  return (
    <div className={`circular ${small ? 'small' : ''}`}>
      {chars.map((char, index) => <span key={index} style={{ transform: `rotate(${index * (360 / chars.length)}deg)` }}>{char}</span>)}
      <b>C</b>
    </div>
  );
}

function TextType({ texts, compact = false }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[index];
    const speed = deleting ? 45 : 85;
    const timeout = setTimeout(() => {
      if (!deleting && sub < current.length) setSub(sub + 1);
      else if (!deleting && sub === current.length) setDeleting(true);
      else if (deleting && sub > 0) setSub(sub - 1);
      else {
        setDeleting(false);
        setIndex((index + 1) % texts.length);
      }
    }, !deleting && sub === current.length ? 1000 : speed);
    return () => clearTimeout(timeout);
  }, [texts, index, sub, deleting]);
  return <span className={`type-text ${compact ? 'compact' : ''}`}>{texts[index].slice(0, sub)}<i>|</i></span>;
}

function ShinyText({ text }) {
  return <span className="shiny-text">{text}</span>;
}

function GradientText({ children }) {
  return <span className="gradient-text">{children}</span>;
}

function DecryptedText({ text }) {
  const [value, setValue] = useState(text);
  const chars = 'ABCD1234!?/#@';
  function scramble() {
    let step = 0;
    const timer = setInterval(() => {
      setValue(text.split('').map((char, i) => (i < step ? char : chars[Math.floor(Math.random() * chars.length)])).join(''));
      step += 1;
      if (step > text.length) {
        clearInterval(timer);
        setValue(text);
      }
    }, 35);
  }
  return <button className="decrypted" onMouseEnter={scramble} onClick={scramble} type="button">{value}</button>;
}

function TextPressure({ text }) {
  const ref = useRef(null);
  const [x, setX] = useState(50);
  return (
    <div className="pressure" ref={ref} onMouseMove={(e) => {
      const rect = ref.current.getBoundingClientRect();
      setX(((e.clientX - rect.left) / rect.width) * 100);
    }}>
      {text.split('').map((char, index) => <span key={index} style={{ fontVariationSettings: `'wght' ${300 + Math.abs(x - index * 18) * 8}` }}>{char}</span>)}
    </div>
  );
}

function CurvedLoop({ text }) {
  return (
    <svg className="curved-loop" viewBox="0 0 420 90">
      <defs><path id="curve" d="M 10 50 Q 210 0 410 50" /></defs>
      <text><textPath href="#curve">{text.repeat(3)}</textPath></text>
    </svg>
  );
}

function FuzzyText({ text }) {
  return <div className="fuzzy-text">{text}</div>;
}

function TrueFocus({ words }) {
  const [active, setActive] = useState(1);
  return <div className="true-focus">{words.map((word, index) => <button key={word} className={active === index ? 'active' : ''} onMouseEnter={() => setActive(index)} type="button">{word}</button>)}</div>;
}

function ScrollFloat() {
  return <div className="scroll-float"><span>float</span><span>scroll</span><span>clean</span></div>;
}

function RotatingText({ words, prefix = '' }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % words.length), 1500);
    return () => clearInterval(timer);
  }, [words.length]);
  return <span className="rotating-text">{prefix && <em>{prefix} </em>}<b>{words[index]}</b></span>;
}

function ScrollVelocity() {
  return <div className="velocity"><span>efekt ✦ sekcia ✦ predaj ✦ dôvera ✦ </span></div>;
}

function VariableProximity({ text }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(0);
  return (
    <div className="variable-proximity" ref={ref} onMouseMove={(e) => {
      const rect = ref.current.getBoundingClientRect();
      setPos(((e.clientX - rect.left) / rect.width) * text.length);
    }}>
      {text.split('').map((char, index) => <span key={index} style={{ transform: `scale(${1 + Math.max(0, 1 - Math.abs(pos - index) / 3) * 0.55})` }}>{char}</span>)}
    </div>
  );
}

function CountUp({ target, suffix = '' }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      start += Math.max(1, Math.ceil(target / 32));
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else setValue(start);
    }, 35);
    return () => clearInterval(timer);
  }, [target]);
  return <strong className="count-up">{value}{suffix}</strong>;
}

function LogoLoop() {
  return <div className="logo-loop"><span>CLIPPIO</span><span>WEB</span><span>VIDEO</span><span>AI</span></div>;
}

function TargetCursorDemo() {
  return <div className="target-demo"><span />Klikni cieľ</div>;
}

function GradualBlurDemo() {
  return <div className="gradual-blur"><b>Text nad fotkou</b><span /></div>;
}

function ClickSparkDemo() {
  const [sparks, setSparks] = useState([]);
  return <button className="spark-demo" onClick={() => setSparks((items) => [...items.slice(-4), Date.now()])} type="button">Klikni{sparks.map((spark) => <i key={spark} />)}</button>;
}

function MagnetDemo() {
  const [style, setStyle] = useState({});
  const ref = useRef(null);
  return <button ref={ref} className="magnet-demo" style={style} onMouseMove={(e) => {
    const rect = ref.current.getBoundingClientRect();
    setStyle({ transform: `translate(${(e.clientX - rect.left - rect.width / 2) / 6}px, ${(e.clientY - rect.top - rect.height / 2) / 6}px)` });
  }} onMouseLeave={() => setStyle({})} type="button">Magnet CTA</button>;
}

function StrandsDemo() {
  return <div className="strands-demo"><span /><span /><span /></div>;
}

function StickerPeelDemo() {
  return <div className="sticker-peel">NOVINKA</div>;
}

function CubesDemo() {
  return <div className="cubes-demo"><i /><i /><i /></div>;
}

function MetallicPaintDemo() {
  return <div className="metallic-paint">Metallic</div>;
}

function NoiseDemo() {
  return <div className="noise-demo"><span>jemná textúra</span></div>;
}

function ShapeBlurDemo() {
  return <div className="shape-blur"><span /><span /></div>;
}

function ImageTrailDemo() {
  return <div className="image-trail"><span /><span /><span />Trail</div>;
}

function MetaBallsDemo() {
  return <div className="metaballs"><span /><span /><span /></div>;
}

function ScrollStackDemo() {
  return <div className="scroll-stack"><span>01</span><span>02</span><span>03</span></div>;
}

function MagicBentoDemo() {
  return <div className="mini-bento"><span /><span /><span /><span /></div>;
}

function StackDemo() {
  return <div className="stack-demo"><span /><span /><span /></div>;
}

function TiltedCardDemo() {
  return <div className="tilted-card"><b>3D karta</b></div>;
}

function MasonryDemo() {
  return <div className="masonry-demo"><span /><span /><span /><span /></div>;
}

function FolderDemo() {
  return <div className="folder-demo"><span /><b>Projekt</b></div>;
}

function StaggeredMenuDemo() {
  return <div className="staggered-menu"><span>Domov</span><span>Služby</span><span>Kontakt</span></div>;
}

function ProfileCardDemo() {
  return <div className="profile-card-demo"><span>SC</span><b>Garant projektu</b><small>web / video / AI</small></div>;
}

function DockDemo() {
  return <div className="dock-demo"><button>⌂</button><button>✦</button><button>✉</button></div>;
}

function GooeyNavDemo() {
  return <div className="gooey-nav"><button>Web</button><button>Video</button><button>AI</button></div>;
}

function CardSwapDemo() {
  const [active, setActive] = useState(false);
  return <button className={`card-swap ${active ? 'active' : ''}`} onClick={() => setActive(!active)} type="button"><span>{active ? 'Predaj' : 'Štart'}</span></button>;
}

function GlassIconsDemo() {
  return <div className="glass-icons"><span>✦</span><span>↗</span><span>✓</span></div>;
}

function InfiniteMenuDemo() {
  return <div className="infinite-menu"><span>Web</span><span>SEO</span><span>CTA</span><span>UX</span></div>;
}

function StepperDemo({ mini = false }) {
  const [step, setStep] = useState(1);
  return (
    <div className={`stepper ${mini ? 'mini' : ''}`}>
      {[1, 2, 3].map((item) => <button key={item} className={step === item ? 'active' : ''} onClick={() => setStep(item)} type="button">{item}</button>)}
      <p>{step === 1 ? 'Cieľ webu' : step === 2 ? 'Výber funkcií' : 'Nasadenie'}</p>
    </div>
  );
}

function FerrofluidDemo() {
  return <div className="ferrofluid"><span /><span /><span /></div>;
}

function LineWavesDemo() {
  return <svg className="linewaves" viewBox="0 0 300 100"><path d="M0 50 C60 10 90 90 150 50 S240 10 300 50" /><path d="M0 65 C60 25 90 105 150 65 S240 25 300 65" /></svg>;
}

function GridDistortionDemo() {
  return <div className="grid-distortion">{Array.from({ length: 24 }).map((_, i) => <span key={i} />)}</div>;
}

function PrismaticBurstDemo() {
  return <div className="prismatic-burst"><span /></div>;
}

function LiquidChromeDemo() {
  return <div className="liquid-chrome"><span /></div>;
}

function MiniShopDemo() {
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState('Rast');
  return (
    <div className="mini-shop fluid-glass">
      <div className="shop-preview glare-hover"><span>WEB</span></div>
      <h3>Mini e-shop / objednávkový prvok</h3>
      <p>Ukážka variantu, množstva a súhrnu. Nie je to platobná brána, len funkčný predajný prvok.</p>
      <div className="variant-row">
        {['Štart', 'Rast', 'Predaj'].map((item) => <button className={variant === item ? 'active' : ''} key={item} onClick={() => setVariant(item)} type="button">{item}</button>)}
      </div>
      <div className="qty-row">
        <button onClick={() => setQty(Math.max(1, qty - 1))} type="button">−</button>
        <b>{qty}</b>
        <button onClick={() => setQty(qty + 1)} type="button">+</button>
      </div>
      <strong>Súhrn: {variant} × {qty}</strong>
    </div>
  );
}

function LineWavesDecor() {
  return <svg className="decor-waves" viewBox="0 0 1000 260"><path d="M0 100 C140 20 260 180 420 90 S720 40 1000 120" /><path d="M0 160 C160 70 320 220 500 140 S760 90 1000 190" /></svg>;
}
