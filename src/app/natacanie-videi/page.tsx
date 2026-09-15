import type { Metadata } from 'next';
import { ServicePage } from '@/components/ui/service-page';

export const metadata: Metadata = {
  title: 'Natáčanie videí',
  description: 'Krátke videá, reels, eventové a prezentačné video od Clippio. Jednoduché krátke video od 90 €.',
  alternates: { canonical: '/natacanie-videi' },
  openGraph: {
    title: 'Natáčanie videí | Clippio',
    description: 'Dynamické videá pre sociálne siete, udalosti, produkty a značky.',
    url: '/natacanie-videi',
  },
};

export default function NatacanieVideiPage() {
  return (
    <ServicePage
      title="Natáčanie videí"
      eyebrow="Video"
      lead="Krátke a zrozumiteľné videá, ktoré zachytia atmosféru, produkt alebo príbeh bez zbytočnej výplne."
      description="Video pripravím podľa cieľa a platformy. Pri krátkych formátoch dbám na tempo a jasnú myšlienku, pri eventoch a prezentáciách na prirodzený priebeh a použiteľný výsledok."
      heroImage="https://images.unsplash.com/photo-1595020738512-66672a9d72a9?auto=format&fit=crop&w=1800&q=85"
      price="od 90 €"
      priceLabel="Krátke video"
      priceNote="Krátke natáčanie bez strihu. Postprodukcia a väčšie produkcie sa naceňujú individuálne."
      deliverables={[
        'natáčanie podľa dohodnutého scenára alebo osnovy',
        'strih, základné farebné spracovanie a zvuk',
        'formát pripravený pre vybranú platformu',
        'jedno kolo primeraných pripomienok',
      ]}
      idealFor={[
        'Reels, TikTok a krátke videá',
        'produkty, služby a prevádzky',
        'udalosti a krátke reportáže',
        'prezentačný obsah pre web',
      ]}
      steps={[
        { title: 'Smer videa', text: 'Určíme hlavnú myšlienku, formát, dĺžku a spôsob použitia.' },
        { title: 'Príprava', text: 'Spresníme miesto, potrebné zábery a jednoduchý scenár alebo osnovu.' },
        { title: 'Natáčanie', text: 'Zachytím hlavné aj doplnkové zábery tak, aby bol strih prirodzený a dynamický.' },
        { title: 'Postprodukcia', text: 'Video zostrihám, farebne zjednotím a pripravím v dohodnutom formáte.' },
      ]}
      faq={[
        { question: 'Je v cene aj strih?', answer: 'Nie. Strih, titulky, grafika a zvuk sa naceňujú samostatne podľa požadovaného rozsahu.' },
        { question: 'Viete pripraviť vertikálnu aj horizontálnu verziu?', answer: 'Áno, ak sa s oboma formátmi počíta už pri príprave natáčania. Viac výstupných verzií môže ovplyvniť cenu.' },
        { question: 'Koľko stojí väčšie firemné video?', answer: 'Cena závisí od scenára, lokácií, dĺžky natáčania a postprodukcie. Po zadaní pripravím rozpis rozsahu a konkrétnu cenu.' },
      ]}
      serviceType="Videoprodukcia"
    />
  );
}
