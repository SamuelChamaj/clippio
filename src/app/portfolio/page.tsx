import type { Metadata } from 'next';
import Link from 'next/link';
import { HoverFooter } from '@/components/ui/hover-footer';
import { PortfolioGallery } from '@/components/ui/portfolio-gallery';

export const metadata: Metadata = {
  title: 'Portfólio',
  description: 'Výber fotografií a vizuálnej práce Samuel Chamaj / Clippio.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfólio | Clippio',
    description: 'Zábery a vizuálne výstupy z tvorby Clippio.',
    url: '/portfolio',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <main className="portfolio-page" id="main-content">
        <header className="portfolio-page__header">
          <Link className="portfolio-page__back" href="/">
            Späť na úvod
          </Link>
          <p>Portfólio</p>
          <h1>Zábery mojej práce.</h1>
          <span>Výber fotografií, momentov a vizuálnych výstupov z mojej tvorby.</span>
        </header>

        <PortfolioGallery showTitles={false} />
      </main>
      <HoverFooter />
    </>
  );
}
