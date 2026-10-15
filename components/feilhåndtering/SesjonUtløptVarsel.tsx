'use client';

import { SESJON_UTLØPT_MELDING } from '@/app/api/fetcher';
import {
  abonnerPåSesjonUtløpt,
  erSesjonUtløpt,
  lagInnloggingsUrl,
} from '@/util/sesjonUtløpt';
import { Alert, BodyShort, Button, HStack } from '@navikt/ds-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSyncExternalStore } from 'react';

const SesjonUtløptBanner = () => {
  const pathname = usePathname();
  const søkeparametere = useSearchParams().toString();
  const redirect = søkeparametere ? `${pathname}?${søkeparametere}` : pathname;

  return (
    <Alert
      fullWidth
      size='small'
      variant='warning'
      className='flex w-full items-center gap-4 px-6 py-4 [&>svg]:self-center'
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
 * Vises under headeren når et API-kall svarer at sesjonen er utløpt, uansett
 * hvor i appen kallet ble gjort (henting, lagring, sletting osv.).
 */
export default function SesjonUtløptVarsel() {
  const erUtløpt = useSyncExternalStore(
    abonnerPåSesjonUtløpt,
    erSesjonUtløpt,
    () => false,
  );

  return erUtløpt ? <SesjonUtløptBanner /> : null;
}
