'use client';

import SideLayout from '../../../components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../components/tilgangskontroll/roller';
import { KandidatSøkProvider } from '../../../kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '../../../kandidat/KandidatSøkMarkerteContext';
import KandidatSøkSidebar from '../../../kandidat/components/kandidat-sok-sidebar/KandidatSøkSidebar';
import KandidatTilStilling from './KandidatTilRekrutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import * as React from 'react';

const FinnKandidaterForRekrutteringstreff: React.FC = () => {
  const { rekrutteringstreffData } = useRekrutteringstreff();

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <SideLayout sidepanel={<KandidatSøkSidebar />}>
            <KandidatTilRekrutteringstreff
              rekrutteringstreffData={stillingsData}
            />
          </SideLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default FinnKandidaterForRekrutteringstreff;
