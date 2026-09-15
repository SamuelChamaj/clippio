import Link from 'next/link';
import { HoverFooter } from '@/components/ui/hover-footer';

export default function NotFoundPage() {
  return (
    <>
      <main className="not-found-page" id="main-content">
        <div className="not-found-page__inner">
          <p>404</p>
          <h1>Táto stránka neexistuje.</h1>
          <span>Odkaz mohol byť zmenený alebo odstránený. Pokračujte späť na úvod alebo si pozrite portfólio.</span>
          <div className="not-found-page__actions">
            <Link className="button button--primary" href="/">
              Späť na úvod
            </Link>
            <Link className="button button--secondary" href="/portfolio">
              Pozrieť portfólio
            </Link>
          </div>
        </div>
      </main>
      <HoverFooter />
    </>
  );
}
