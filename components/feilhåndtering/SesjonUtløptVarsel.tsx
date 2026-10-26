'use client';

import { useSesjonsslutt } from './useSesjonsslutt';
import { SESJON_UTLØPT_MELDING } from '@/app/api/fetcher';
import {
  abonnerPåSesjonUtløpt,
  erSesjonUtløpt,
  INNLOGGING_I_NY_FANE_URL,
  markerSesjonUtløpt,
} from '@/util/sesjonUtløpt';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, HStack, Link } from '@navikt/ds-react';
import { format } from 'date-fns';
import { ReactNode, useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

// WCAG 2.2.1 krever minst 20 sekunder. Fem minutter gir tid til å lagre eller logge inn.
const VARSEL_FØR_UTLØP_MS = 5 * 60 * 1000;

// Lenke og ikke knapp, fordi den åpner en ny side. Innloggingen skjer i ny
// fane, så det brukeren har fylt ut her, blir liggende.
const LoggInnPåNytt = () => (
  <Link
    href={INNLOGGING_I_NY_FANE_URL}
    target='_blank'
    rel='noopener'
    className='shrink-0'
  >
    Logg inn på nytt
    <ExternalLinkIcon title='åpnes i ny fane' />
  </Link>
);

const SesjonBanner = ({ children }: { children: ReactNode }) => (
  <Alert
    fullWidth
    size='small'
    variant='warning'
    className='flex w-full items-center gap-4 px-6 py-4 [&>svg]:self-center'
  >
    <HStack gap='space-16' align='center' wrap={false}>
      <BodyShort>{children}</BodyShort>
      <LoggInnPåNytt />
    </HStack>
  </Alert>
);

// En åpen modal gjør resten av siden inert, så lenken i headeren kan ikke nås.
// Da flyttes varselet inn i den øverste modalen.
const finnÅpenModal = (): HTMLElement | null => {
  const modaler = [
    ...document.querySelectorAll<HTMLElement>(
      'dialog[open], [role="dialog"][aria-modal="true"]',
    ),
  ].filter((m) => m.tagName !== 'DIALOG' || m.matches(':modal'));
  return modaler.at(-1) ?? null;
};

const useModalSomErÅpen = () => {
  const [modal, setModal] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const oppdater = () => setModal(finnÅpenModal());
    oppdater();
    const observatør = new MutationObserver(oppdater);
    observatør.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open', 'aria-modal'],
    });
    return () => observatør.disconnect();
  }, []);
  return modal;
};

/**
 * Vises under headeren, eller øverst i en åpen modal. Varsler fem minutter før sesjonen går ut, og når den
 * har gått ut. Sesjonen regnes som utløpt når tiden er ute, eller når et
 * API-kall svarer at den er utløpt (henting, lagring, sletting osv.).
 *
 * Live-områdene ligger alltid i DOM-en, slik at skjermlesere leser opp
 * varselet når innholdet dukker opp.
 */
export default function SesjonUtløptVarsel() {
  const erUtløpt = useSyncExternalStore(
    abonnerPåSesjonUtløpt,
    erSesjonUtløpt,
    () => false,
  );
  const sesjonsslutt = useSesjonsslutt();
  const modal = useModalSomErÅpen();
  const [nå, setNå] = useState(0);

  useEffect(() => {
    if (!sesjonsslutt) return;
    const { slutt, hentet } = sesjonsslutt;
    const tilVarsel = setTimeout(
      () => setNå(Date.now()),
      slutt - VARSEL_FØR_UTLØP_MS - hentet,
    );
    const tilUtløp = setTimeout(markerSesjonUtløpt, slutt - hentet);
    return () => {
      clearTimeout(tilVarsel);
      clearTimeout(tilUtløp);
    };
  }, [sesjonsslutt]);

  const snartUtløpt =
    !erUtløpt &&
    sesjonsslutt !== null &&
    Math.max(nå, sesjonsslutt.hentet) >=
      sesjonsslutt.slutt - VARSEL_FØR_UTLØP_MS;

  const varsler = (
    <>
      <div aria-live='polite'>
        {snartUtløpt && (
          <SesjonBanner>
            <strong>Du blir snart logget ut.</strong> Innloggingen din går ut
            kl. {format(sesjonsslutt.slutt, 'HH:mm')}. Logg inn på nytt for å
            fortsette uten å miste det du har gjort.
          </SesjonBanner>
        )}
      </div>
      <div aria-live='assertive'>
        {erUtløpt && (
          <SesjonBanner>
            <strong>{SESJON_UTLØPT_MELDING}.</strong> Logg inn på nytt og gå
            tilbake hit for å fortsette der du var.
          </SesjonBanner>
        )}
      </div>
    </>
  );

  return modal ? createPortal(varsler, modal) : varsler;
}
