'use client';

import { markerSesjonUtløpt, nullstillSesjonUtløpt } from '@/util/sesjonUtløpt';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

// Login-proxyen i Nais (Wonderwall) svarer på dette endepunktet.
// https://doc.nais.io/auth/reference/#session-endpoint
const SESJON_URL = '/oauth2/session';

const sesjonSchema = z.object({
  session: z.object({
    active: z.boolean(),
    ends_in_seconds: z.number(),
  }),
});

type Sesjonsslutt = {
  // Når sesjonen går ut, målt med nettleserens klokke.
  slutt: number;
  // Når vi sist hentet sesjonen, så komponenten kan regne ut hvor lenge det er igjen.
  hentet: number;
};

/**
 * Henter når sesjonen går ut, ved lasting og hver gang fanen får fokus igjen.
 * Har brukeren logget inn på nytt i en annen fane, fjernes varselet om utløpt
 * sesjon, og alle SWR-kall hentes på nytt så feil fra utløpt sesjon forsvinner.
 */
export const useSesjonsslutt = (): Sesjonsslutt | null => {
  const [sesjonsslutt, setSesjonsslutt] = useState<Sesjonsslutt | null>(null);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    let pågående: AbortController | null = null;

    const hent = async () => {
      // focus og visibilitychange kommer ofte samtidig. Bare det siste kallet
      // får lov til å oppdatere tilstanden.
      pågående?.abort();
      const kontroller = new AbortController();
      pågående = kontroller;
      try {
        const svar = await fetch(SESJON_URL, {
          credentials: 'include',
          cache: 'no-store',
          signal: kontroller.signal,
        });
        // Leser alltid kroppen. Ellers regnes kallet som åpent, og
        // nettleseren (og networkidle i Playwright) venter på det.
        const tekst = await svar.text();
        if (kontroller.signal.aborted) return;
        if (svar.status === 401) {
          markerSesjonUtløpt();
          return;
        }
        // Lokalt og i tester uten mock finnes ikke endepunktet.
        if (!svar.ok) return;
        const data = sesjonSchema.safeParse(JSON.parse(tekst));
        if (!data.success) return;
        if (!data.data.session.active) {
          markerSesjonUtløpt();
          return;
        }
        // Bruker ends_in_seconds og ikke ends_at, så det ikke spiller noen
        // rolle om klokka i nettleseren går feil.
        const nå = Date.now();
        setSesjonsslutt({
          slutt: nå + data.data.session.ends_in_seconds * 1000,
          hentet: nå,
        });
        if (nullstillSesjonUtløpt()) {
          void mutate(() => true);
        }
      } catch {
        // Uten svar viser vi ikke noe varsel før et API-kall feiler.
      } finally {
        if (pågående === kontroller) pågående = null;
      }
    };

    const vedSynlig = () => {
      if (document.visibilityState === 'visible') hent();
    };

    hent();
    window.addEventListener('focus', hent);
    document.addEventListener('visibilitychange', vedSynlig);
    return () => {
      pågående?.abort();
      window.removeEventListener('focus', hent);
      document.removeEventListener('visibilitychange', vedSynlig);
    };
  }, [mutate]);

  return sesjonsslutt;
};
