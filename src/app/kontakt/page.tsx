'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { HoverFooter } from '@/components/ui/hover-footer';

const WEB3FORMS_ACCESS_KEY = '0eb8f328-b1f0-473d-a939-370e901a7ac6';
const SUBMIT_COOLDOWN_MS = 30_000;
const LAST_SUBMIT_KEY = 'clippio-contact-last-submit';

export default function KontaktPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get('sluzba');
    const allowedServices = ['Fotenie', 'Natáčanie videí', 'Práca s dronom', 'Iné'];

    if (requestedService && allowedServices.includes(requestedService)) {
      setSelectedService(requestedService);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError('');
    setFormError('');
    setIsCheckingEmail(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') ?? '');

    if (String(formData.get('botcheck') ?? '')) {
      setIsCheckingEmail(false);
      return;
    }

    const lastSubmit = Number(window.localStorage.getItem(LAST_SUBMIT_KEY) ?? 0);
    if (Date.now() - lastSubmit < SUBMIT_COOLDOWN_MS) {
      setFormError('Správa už bola nedávno odoslaná. Skúste to znova o chvíľu.');
      setIsCheckingEmail(false);
      return;
    }

    try {
      const response = await fetch('/api/validate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { valid?: boolean; message?: string };

      if (!response.ok || !data.valid) {
        setEmailError(data.message ?? 'Skontroluj e-mailovú adresu.');
        return;
      }

      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', 'Nová správa z kontaktného formulára Clippio');
      formData.append('from_name', 'Clippio web');
      formData.append('botcheck', '');

      const submitResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const submitData = (await submitResponse.json()) as { success?: boolean; message?: string };

      if (!submitResponse.ok || !submitData.success) {
        setFormError(submitData.message ?? 'Správu sa nepodarilo odoslať. Skúste to znova.');
        return;
      }

      window.localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
      setIsSubmitted(true);
      form.reset();
      setSelectedService('');
    } catch {
      setFormError('Správu sa nepodarilo odoslať. Skúste to znova alebo použite e-mail či telefón.');
    } finally {
      setIsCheckingEmail(false);
    }
  }

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    const timer = window.setTimeout(() => setIsSubmitted(false), 8000);

    return () => window.clearTimeout(timer);
  }, [isSubmitted]);

  return (
    <>
      <main className="contact-page" id="main-content">
      <section className={`contact-page__inner ${isSubmitted ? 'is-blurred' : ''}`} aria-labelledby="contact-page-title">
        <div className="contact-page__copy">
          <Link className="portfolio-page__back" href="/">
            Späť na úvod
          </Link>
          <p>Samuel Chamaj</p>
          <h1 id="contact-page-title">Kontakt</h1>
          <p className="contact-page__lead">
            Ozvi sa telefonicky alebo e-mailom a dohodneme všetko potrebné.
          </p>
          <div className="contact-page__details" aria-label="Kontaktné informácie">
            <a href="tel:+421951025596">
              <span>Telefón</span>
              +421 951 025 596
            </a>
            <a href="mailto:info@clippio.sk">
              <span>E-mail</span>
              info@clippio.sk
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} aria-busy={isCheckingEmail}>
          <p className="contact-form__eyebrow">Kontaktný formulár</p>
          <div className="contact-form__botcheck" aria-hidden="true">
            <label htmlFor="contact-company-site">Webová stránka</label>
            <input id="contact-company-site" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <label>
            Meno / firma
            <input name="name" type="text" autoComplete="name" maxLength={100} required />
          </label>
          <label>
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              aria-invalid={emailError ? 'true' : 'false'}
              aria-describedby={emailError ? 'contact-email-error' : undefined}
              onChange={() => setEmailError('')}
            />
          </label>
          {emailError && (
            <p className="contact-form__error" id="contact-email-error" role="alert">
              {emailError}
            </p>
          )}
          <label>
            <span className="contact-form__label-text">Telefón <small>nepovinné</small></span>
            <input name="phone" type="tel" autoComplete="tel" maxLength={32} />
          </label>
          <label>
            Služba
            <span className="contact-form__select-wrap">
              <select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required>
                <option value="" disabled>
                  Vyber službu
                </option>
                <option value="Fotenie">Fotenie</option>
                <option value="Natáčanie videí">Natáčanie videí</option>
                <option value="Práca s dronom">Práca s dronom</option>
                <option value="Iné">Iné</option>
              </select>
            </span>
          </label>
          <label>
            Správa
            <textarea name="message" rows={6} maxLength={3000} required />
          </label>
          {formError ? (
            <p className="contact-form__error contact-form__error--form" role="alert">
              {formError}
            </p>
          ) : null}
          <button type="submit" disabled={isCheckingEmail}>
            {isCheckingEmail ? 'Odosielam…' : 'Odoslať'}
          </button>
        </form>
      </section>

      {isSubmitted && (
        <div className="contact-success" role="dialog" aria-modal="true" aria-labelledby="contact-success-title">
          <div className="contact-success__card">
            <div className="contact-success__check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="m7.8 12.2 2.8 2.8 5.8-6" />
              </svg>
            </div>
            <h2 id="contact-success-title">Ďakujem za kontaktovanie</h2>
            <p>Budem sa snažiť odpovedať čo najskôr.</p>
            <button type="button" onClick={() => setIsSubmitted(false)} autoFocus>
              Zavrieť
            </button>
          </div>
        </div>
      )}
      </main>
      <HoverFooter />
    </>
  );
}
