'use client';

import { Alert, BodyShort } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { useEffect } from 'react';

interface KandidatlisteIdManglerProps {
  stillingsId?: string;
  komponent: string;
}

export default function KandidatlisteIdMangler({
  stillingsId,
  komponent,
}: KandidatlisteIdManglerProps) {
  useEffect(() => {
    logger.warn(
      { stillingsId, komponent },
      `Kandidatliste-id mangler for stilling ${stillingsId}`,
    );
  }, [stillingsId, komponent]);

  return (
    <Alert variant='error' className='my-4'>
      <BodyShort className='font-bold'>Fant ikke kandidatlisten</BodyShort>
      <BodyShort>
        Vi klarte ikke å hente kandidatlisten til dette stillingsoppdraget. Prøv
        å laste inn siden på nytt. Rapporter inn via fagsystemsak hvis feilen
        ikke går over.
      </BodyShort>
    </Alert>
  );
}
