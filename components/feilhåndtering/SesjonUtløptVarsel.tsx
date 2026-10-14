'use client';

import { SESJON_UTLØPT_MELDING } from '@/app/api/fetcher';
import {
  abonnerPåSesjonUtløpt,
  erSesjonUtløpt,
  lagInnloggingsUrl,
} from '@/util/sesjonUtløpt';
import { Alert, BodyShort, Button, HStack } from '@navikt/ds-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';

// Banneret legger seg over headeren og bør dekke den helt, uten å gå ned i innholdet
const useHeaderhøyde = () => {
  const [høyde, setHøyde] = useState<number>();
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) {
      return;
    }
    const observer = new ResizeObserver(() => setHøyde(header.offsetHeight));
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  return høyde;
};

const SesjonUtløptBanner = () => {
  const headerhøyde = useHeaderhøyde();
  const pathname = usePathname();
  const søkeparametere = useSearchParams().toString();
  const redirect = søkeparametere ? `${pathname}?${søkeparametere}` : pathname;

  return (
    <Alert
      fullWidth
      size='small'
      variant='warning'
      className='fixed top-0 z-101 flex w-full items-center [&>svg]:self-center'
      style={{ minHeight: headerhøyde }}
      aria-live='assertive'
    >
      <HStack gap='space-16' align='center' wrap={false}>
        <BodyShort>
          <strong>{SESJON_UTLØPT_MELDING}.</strong> Logg inn på nytt for å
          fortsette der du var.
        </BodyShort>
        <Button
          as='a'
          href={lagInnloggingsUrl(redirect)}
          size='xsmall'
          className='shrink-0'
        >
          Logg inn på nytt
        </Button>
      </HStack>
    </Alert>
  );
};

/**
 * Vises øverst på siden når et API-kall svarer 401, uansett hvor i appen
 * kallet ble gjort (henting, lagring, sletting osv.).
 */
export default function SesjonUtløptVarsel() {
  const erUtløpt = useSyncExternalStore(
    abonnerPåSesjonUtløpt,
    erSesjonUtløpt,
    () => false,
  );

  return erUtløpt ? <SesjonUtløptBanner /> : null;
}
