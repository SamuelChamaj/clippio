import { useState } from 'react';
import BackgroundSelector from './components/BackgroundSelector.jsx';
import FeatureCatalog from './components/FeatureCatalog.jsx';
import PackageComparison from './components/PackageComparison.jsx';
import StickyCTA from './components/StickyCTA.jsx';
import BlurText from './components/functions/BlurText.jsx';
import ShinyText from './components/functions/ShinyText.jsx';
import TextType from './components/functions/TextType.jsx';

export default function App() {
  const [activeBackground, setActiveBackground] = useState('liquid-glass');

  return (
    <div className={`app app-${activeBackground}`}>
      <Header />
      <main>
        <Hero />
        <BoundaryNotice />
        <BackgroundSelector activeBackground={activeBackground} setActiveBackground={setActiveBackground} />
        <FeatureCatalog />
        <PackageComparison />
        <UseCases />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Clippio Function Web">
        <img src="./logo-clippio.png" alt="Logo Clippio" />
        <span>Clippio.</span>
      </a>
      <nav aria-label="Hlavná navigácia">
        <a href="#pozadia">Pozadia</a>
        <a href="#funkcie">Funkcie</a>
        <a href="#vyber">Výber</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <span className="eyebrow">Ukážkový výber funkcií</span>
        <h1>
          <BlurText text="Clippio Function Web" animateBy="words" />
        </h1>
        <p className="hero__lead">
          Ukážka efektov, sekcií a funkcií, ktoré môže mať moderný web od Clippio.
        </p>
        <p>
          Nie každý web potrebuje všetky efekty. Tento prehľad ukazuje funkcie, ktoré sa dajú vybrať podľa cieľa webu, rozpočtu a štýlu značky.
        </p>
        <div className="hero__typing">
          <span>Ukážky pre </span>
          <TextType text={['jednoduché firemné weby', 'prémiové landing pages', 'e-shop a predajné weby']} />
        </div>
        <div className="hero__actions">
          <a className="button button-primary" href="#funkcie">Pozrieť funkcie</a>
          <a className="button button-secondary" href="#pozadia">Ukázať pozadia</a>
        </div>
      </div>

      <aside className="hero__panel" aria-label="Ukážka funkcie">
        <img src="./logo-clippio.png" alt="Logo Clippio" />
        <ShinyText text="Funkcie, ktoré majú dôvod" />
        <div className="panel-grid">
          <span>Text efekty</span>
          <span>Glass UI</span>
          <span>Mini košík</span>
          <span>CTA bloky</span>
        </div>
      </aside>
    </section>
  );
}

function BoundaryNotice() {
  return (
    <section className="boundary-card">
      <div>
        <span className="eyebrow">Obchodná hranica</span>
        <h2>Nie všetko patrí do každého webu.</h2>
      </div>
      <p>
        Pri lacnejšom webe má zmysel použiť menej efektov, aby stránka zostala rýchla, čistá a lacnejšia. Pri prémiovom alebo predajnom webe sa môžu vybrať výraznejšie animácie a interaktívne prvky.
      </p>
    </section>
  );
}

function UseCases() {
  return (
    <section className="section usecases-section">
      <div className="section-heading">
        <span className="eyebrow">Rozhodovanie podľa ROI</span>
        <h2>Vyberaj funkcie podľa toho, čo majú zarobiť alebo zjednodušiť.</h2>
      </div>
      <div className="usecase-grid">
        <article>
          <h3>Jednoduchý firemný web</h3>
          <p>Čisté pozadie, jednoduché CTA, základné animácie, kontaktný formulár a prehľadné služby.</p>
        </article>
        <article>
          <h3>Prémiovejší web</h3>
          <p>Animovaný hero, glass karty, jemné textové efekty, referencie, proces spolupráce a výraznejšia vizuálna identita.</p>
        </article>
        <article>
          <h3>Predajný web alebo e-shop</h3>
          <p>Produktové karty, CTA sekcie, FAQ, výber variantov, košík, dôveryhodnostné prvky a predajné texty.</p>
        </article>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta" id="kontakt">
      <span className="eyebrow">Finálny výber</span>
      <h2>Chceš web s funkciami, ktoré dávajú zmysel?</h2>
      <p>
        Vyberieme len tie prvky, ktoré pomôžu tvojmu webu pôsobiť lepšie, predávať jasnejšie alebo zjednodušiť používanie. Nie všetko musí byť na každom webe.
      </p>
      <div className="hero__actions">
        <a className="button button-light" href="mailto:info@clippio.sk">Kontaktovať Clippio</a>
        <a className="button button-outline-light" href="/weby/">Pozrieť balíky webov</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        Táto stránka slúži ako ukážka možných funkcií. Konkrétny rozsah webu sa vždy vyberá podľa cieľa projektu, rozpočtu a technickej náročnosti.
      </p>
      <span>Clippio Function Web</span>
    </footer>
  );
}
