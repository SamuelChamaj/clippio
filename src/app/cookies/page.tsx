import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/legal-page';

export const metadata: Metadata = {
  title: 'Informácie o cookies',
  description: 'Informácie o používaní cookies a externých služieb na webe Clippio.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Informácie o cookies"
      intro="Stránka je postavená jednoducho a nepoužíva cookies na reklamu ani sledovanie návštevníkov."
      sections={[
        {
          title: 'Čo sú cookies',
          body:
            'Cookies sú malé súbory, ktoré si stránka môže uložiť v prehliadači. Pomáhajú napríklad so zapamätaním nastavení alebo s technickým fungovaním webu.',
        },
        {
          title: 'Aké cookies používa táto stránka',
          body:
            'Táto stránka aktuálne nepoužíva marketingové cookies ani analytiku na sledovanie návštevníkov. Ak sa použijú iba nevyhnutné technické cookies, súhlasový banner nie je potrebný.',
        },
        {
          title: 'Kedy bude potrebný súhlas',
          body:
            'Ak sa v budúcnosti pridá analytika, reklama, remarketing, vložené marketingové nástroje alebo podobné nenutné cookies, bude potrebné návštevníkovi dať možnosť súhlasiť aj odmietnuť.',
        },
        {
          title: 'Externé služby',
          body:
            'Na stránke sa môžu načítavať obrázky alebo obsah z externých služieb, napríklad Google Drive alebo Unsplash. Tieto služby môžu mať vlastné technické pravidlá a nastavenia.',
        },
        {
          title: 'Nastavenie cookies',
          body:
            'Cookies vieš kedykoľvek vymazať alebo zablokovať v nastaveniach svojho prehliadača.',
        },
      ]}
    />
  );
}
