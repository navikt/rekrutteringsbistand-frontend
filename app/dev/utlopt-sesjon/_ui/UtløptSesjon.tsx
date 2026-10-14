'use client';

import { postApi } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import SWRLaster from '@/components/SWRLaster';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { z } from 'zod';

const utløptSesjonEndepunkt = '/api/dev/utlopt-sesjon';

export default function UtløptSesjon() {
  const [skalHente, setSkalHente] = useState(false);
  const hook = useSWRGet(
    skalHente ? utløptSesjonEndepunkt : null,
    z.object({}),
  );
  const [lagringFeilet, setLagringFeilet] = useState(false);
  const [annen401, setAnnen401] = useState(false);

  // Etterligner handlinger som fanger feilen selv og viser en egen melding
  const lagre = async () => {
    try {
      await postApi(utløptSesjonEndepunkt, {});
    } catch {
      setLagringFeilet(true);
    }
  };

  const lagreMedGyldigSesjon = async () => {
    try {
      await postApi(`${utløptSesjonEndepunkt}?sesjon=gyldig`, {});
    } catch {
      setAnnen401(true);
    }
  };

  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section title='Simulert utløpt sesjon' skjulBrødsmuler />
        </PanelHeader>
      }
    >
      <SideInnhold>
        <VStack gap='space-16'>
          <BodyShort>
            Knappene kaller et endepunkt som svarer 401, slik backend gjør når
            sesjonen er utløpt.
          </BodyShort>
          <HStack gap='space-8'>
            <Button
              size='small'
              variant='secondary'
              onClick={() => setSkalHente(true)}
            >
              Simuler henting
            </Button>
            <Button size='small' variant='secondary' onClick={lagre}>
              Simuler lagring
            </Button>
            <Button
              size='small'
              variant='secondary'
              onClick={lagreMedGyldigSesjon}
            >
              Simuler annen 401
            </Button>
          </HStack>
          {lagringFeilet && <BodyShort>Klarte ikke å lagre</BodyShort>}
          {annen401 && <BodyShort>Fikk 401 med gyldig sesjon</BodyShort>}
          {skalHente && (
            <SWRLaster hooks={[hook]}>
              {(data) => (
                <BodyShort>Uventet svar: {JSON.stringify(data)}</BodyShort>
              )}
            </SWRLaster>
          )}
        </VStack>
      </SideInnhold>
    </SideLayout>
  );
}
