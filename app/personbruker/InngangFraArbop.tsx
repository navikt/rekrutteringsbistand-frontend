'use client';

import { useArenaKandidatnr } from '../api/kandidat-sok/useArenaKandidatnr';
import { useSynlighetsevaluering } from '../api/synlighet/evaluering/useSynlighetsevaluering';
import SWRLaster from '../components/SWRLaster';
import Sidelaster from '../components/Sidelaster';
import SideLayout from '../components/layout/SideLayout';
import { useApplikasjonContext } from '../providers/ApplikasjonContext';
import { BodyLong, Button, Heading } from '@navikt/ds-react';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const InngangFraArbop: React.FC = () => {
  const { valgtFnr } = useApplikasjonContext();
  const kandidatnrHook = useArenaKandidatnr(valgtFnr);
  const synlighetHook = useSynlighetsevaluering(valgtFnr);

  const router = useRouter();

  const handleBackClick = () => {
    window.history.back();
  };

  const TilbakeKnapp = () => (
    <Button
      variant='tertiary'
      icon={<ArrowLeftIcon aria-hidden />}
      onClick={handleBackClick}
      style={{ marginBottom: '1rem' }}
    >
      Tilbake
    </Button>
  );

  React.useEffect(() => {
    if (
      kandidatnrHook.data &&
      kandidatnrHook.data.arenaKandidatnr &&
      synlighetHook.data
    ) {
      router.push(
        `/stilling?visKandidatnr=${kandidatnrHook.data.arenaKandidatnr}`,
      );
    }
  }, [kandidatnrHook.data, synlighetHook.data, router]);

  if (!valgtFnr) {
    return (
      <SideLayout>
        <Heading level='2' size='medium' spacing>
          Ingen kandidat valgt i modia dekoratøren
        </Heading>
        <TilbakeKnapp />
      </SideLayout>
    );
  }

  return (
    <SideLayout>
      <SWRLaster hooks={[kandidatnrHook, synlighetHook]} skjulFeilmelding>
        {(kandidatnrData, synlighet) => {
          if (!kandidatnrData || !kandidatnrData.arenaKandidatnr) {
            return (
              <div>
                <Heading level='2' size='large'>
                  Fant ikke kandidaten
                </Heading>
                <TilbakeKnapp />
              </div>
            );
          }
          if (!synlighet) {
            return (
              <div>
                <Heading level='2' size='large'>
                  Fant ikke kandidaten
                </Heading>
                <BodyLong>
                  Kandidaten er ikke synlig i Rekrutteringsbistand.
                </BodyLong>
                <TilbakeKnapp />
              </div>
            );
          }

          if (synlighet && kandidatnrData.arenaKandidatnr) {
            return <Sidelaster />;
          }

          return (
            <div>
              <Heading level='2' size='large'>
                Fant ikke kandidaten
              </Heading>
              <TilbakeKnapp />
            </div>
          );
        }}
      </SWRLaster>
    </SideLayout>
  );
};

export default InngangFraArbop;
