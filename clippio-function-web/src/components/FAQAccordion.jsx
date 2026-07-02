import { useState } from 'react';

const faqs = [
  {
    q: 'Sú všetky funkcie automaticky v každom balíku?',
    a: 'Nie. To by bolo obchodne aj technicky zlé. Pri lacnejšom webe majú zmysel len prvky, ktoré pomôžu prehľadnosti a kontaktu. Výraznejšie efekty patria skôr do väčšieho rozsahu.'
  },
  {
    q: 'Kedy sa oplatí použiť animácie?',
    a: 'Keď zlepšia prvý dojem, čitateľnosť alebo orientáciu. Ak animácia len rozptyľuje, znižuje hodnotu webu namiesto toho, aby ju zvyšovala.'
  },
  {
    q: 'Dá sa spraviť aj jednoduchý e-shop?',
    a: 'Áno, ale treba rozlíšiť ukážkový košík, dopytový košík a reálny e-shop s platbou. To sú tri rozdielne úrovne práce a ceny.'
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-stack">
      {faqs.map((item, index) => (
        <article className="faq-item" key={item.q}>
          <button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
            <span>{item.q}</span>
            <strong>{openIndex === index ? '−' : '+'}</strong>
          </button>
          {openIndex === index && <p>{item.a}</p>}
        </article>
      ))}
    </div>
  );
}
