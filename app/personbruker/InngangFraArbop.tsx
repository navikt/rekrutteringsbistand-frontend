'use client';

import { useArenaKandidatnr } from '../api/kandidat-sok/useArenaKandidatnr';
import { useSynlighetsevaluering } from '../api/synlighet/evaluering/useSynlighetsevaluering';
import SWRLaster from '../components/SWRLaster';
import Sidelaster from '../components/Sidelaster';
import SideLayout from '../components/layout/SideLayout';
import { useApplikasjonContext } from '../providers/ApplikasjonContext';
import { BodyLong, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const InngangFraArbop: React.FC = () => {
  const { valgtFnr } = useApplikasjonContext();
  const kandidatnrHook = useArenaKandidatnr(valgtFnr);
  const synlighetHook = useSynlighetsevaluering(valgtFnr);

  const router = useRouter();

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
      </SideLayout>
    );
  }

  return (
    <SideLayout>
      <SWRLaster hooks={[kandidatnrHook, synlighetHook]}>
        {(kandidatnrData, synlighet) => {
          if (!kandidatnrData || !kandidatnrData.arenaKandidatnr) {
            return (
              <Heading level='2' size='large'>
                Fant ikke kandidaten
              </Heading>
            );
          }
          if (!synlighet) {
            return (
              <>
                <Heading level='2' size='large'>
                  Fant ikke kandidaten
                </Heading>
                <BodyLong>
                  Kandidaten er ikke synlig i Rekrutteringsbistand.
                </BodyLong>
              </>
            );
          }

          if (synlighet && kandidatnrData.arenaKandidatnr) {
            return <Sidelaster />;
          }

          return (
            <Heading level='2' size='large'>
              Fant ikke kandidaten
            </Heading>
          );
        }}
      </SWRLaster>
    </SideLayout>
  );
};

export default InngangFraArbop;
