import { ParallaxComponent } from '@/components/ui/parallax-scrolling';

const services = [
  'Strih krátkych promo videí',
  'Titulky a formátovanie na Reels, TikTok a Shorts',
  'Mesačný balík klipov z jedného natáčania',
];

const steps = [
  ['Materiál', 'Pošleš video, fotky alebo link na úložisko.'],
  ['Výber', 'Vyberieme najsilnejšie momenty a navrhneme krátky scenár.'],
  ['Publikácia', 'Dostaneš hotové výstupy pripravené na sociálne siete.'],
];

export default function App() {
  return (
    <main>
      <nav className="site-nav" aria-label="Hlavná navigácia">
        <a href="#top" className="brand">
          Clippio
        </a>
        <div className="nav-links">
          <a href="#sluzby">Služby</a>
          <a href="#proces">Proces</a>
          <a href="#kontakt">Kontakt</a>
        </div>
      </nav>

      <section id="top" className="hero-shell">
        <ParallaxComponent title="Clippio" />
        <div className="hero-copy">
          <p className="eyebrow">Krátke videá pre malé firmy</p>
          <h1>Premeníme tvoje zábery na klipy, ktoré sa dajú rovno publikovať.</h1>
          <p>
            Strih, rytmus, titulky a exporty pre sociálne siete bez zbytočnej produkčnej omáčky.
          </p>
          <a className="primary-link" href="mailto:hello@clippio.sk">
            Napísať o spolupráci
          </a>
        </div>
      </section>

      <section id="sluzby" className="section services-section">
        <p className="eyebrow">Čo robíme</p>
        <h2>Obsah, ktorý nezostane navždy v galérii.</h2>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-item" key={service}>
              <span aria-hidden="true"></span>
              <h3>{service}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="proces" className="section process-section">
        <p className="eyebrow">Ako to ide</p>
        <h2>Jednoduchý postup bez nekonečných briefov.</h2>
        <div className="process-list">
          {steps.map(([title, text]) => (
            <article className="process-item" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="kontakt" className="section contact-section">
        <p className="eyebrow">Kontakt</p>
        <h2>Pošli materiál alebo nápad. Ozveme sa s konkrétnym návrhom.</h2>
        <a className="primary-link light" href="mailto:hello@clippio.sk">
          hello@clippio.sk
        </a>
      </section>
    </main>
  );
}
