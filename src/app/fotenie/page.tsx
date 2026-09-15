import type { Metadata } from 'next';
import { ServicePage } from '@/components/ui/service-page';

export const metadata: Metadata = {
  title: 'Fotenie',
  description: 'Prirodzené portréty, eventové a produktové fotografie od Clippio. Fotenie od 90 € podľa rozsahu zákazky.',
  alternates: { canonical: '/fotenie' },
  openGraph: {
    title: 'Fotenie | Clippio',
    description: 'Portréty, eventy, produkty a fotografie pre značky s čistým a prirodzeným výsledkom.',
    url: '/fotenie',
  },
};

export default function FoteniePage() {
  return (
    <ServicePage
      title="Fotenie"
      eyebrow="Foto"
      lead="Prirodzené fotografie ľudí, udalostí a produktov s dôrazom na atmosféru, detail a čisté spracovanie."
      description="Fotenie prispôsobím tomu, kde budú fotografie použité. Výsledok môže byť osobný a autentický, alebo presný a vizuálne jednotný pre značku, web či sociálne siete."
      heroImage="/api/portfolio/image/1p9JpoQTbd36j8HMaDYNZ1hPvG9lFrVTg"
      price="od 90 €"
      priceLabel="Orientačná cena"
      priceNote="Základné fotenie do 60 minút. Presná cena závisí od rozsahu, lokality a množstva upravených fotografií."
      deliverables={[
        'výber a úprava finálnych fotografií',
        'farebné a svetelné zjednotenie záberov',
        'digitálne odovzdanie v dohodnutom rozlíšení',
        'jedno kolo primeraných pripomienok',
      ]}
      idealFor={[
        'portréty a osobné projekty',
        'firemné a spoločenské udalosti',
        'produkty, prevádzky a služby',
        'obsah na web a sociálne siete',
      ]}
      steps={[
        { title: 'Zadanie', text: 'Dohodneme si účel fotografií, náladu, miesto a termín.' },
        { title: 'Fotenie', text: 'Počas fotenia priebežne sledujem kompozíciu, svetlo aj prirodzenosť výsledku.' },
        { title: 'Výber a úprava', text: 'Vyberiem najsilnejšie zábery a zjednotím ich do čistého vizuálneho štýlu.' },
        { title: 'Odovzdanie', text: 'Hotové fotografie dostanete digitálne vo formáte vhodnom na dohodnuté použitie.' },
      ]}
      faq={[
        { question: 'Koľko fotografií dostanem?', answer: 'Počet závisí od typu a dĺžky fotenia. Presný rozsah bude vždy uvedený v cenovej ponuke pred potvrdením termínu.' },
        { question: 'Sú fotografie upravené?', answer: 'Áno. Finálny výber zahŕňa základnú farebnú a svetelnú úpravu. Rozsiahla retuš sa naceňuje samostatne.' },
        { question: 'Ako vznikne presná cena?', answer: 'Podľa dĺžky fotenia, počtu výstupov, lokality a náročnosti úprav. Po krátkej dohode dostanete konkrétnu ponuku.' },
      ]}
      serviceType="Fotografické služby"
    />
  );
}
