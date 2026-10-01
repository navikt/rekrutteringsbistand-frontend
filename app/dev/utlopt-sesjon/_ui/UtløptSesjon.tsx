'use client';

import { useSWRGet } from '@/app/api/useSWRGet';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { z } from 'zod';

const utløptSesjonEndepunkt = '/api/dev/utlopt-sesjon';

export default function UtløptSesjon() {
  const hook = useSWRGet(utløptSesjonEndepunkt, z.object({}));

  return (
    <VStack gap='space-16'>
      <Heading level='2' size='large'>
        Simulert utløpt sesjon
      </Heading>
      <BodyShort>
        Denne siden kaller et endepunkt som svarer 401, slik backend gjør når
        sesjonen er utløpt.
      </BodyShort>
      <SWRLaster hooks={[hook]}>
        {(data) => <BodyShort>Uventet svar: {JSON.stringify(data)}</BodyShort>}
      </SWRLaster>
    </VStack>
  );
}
