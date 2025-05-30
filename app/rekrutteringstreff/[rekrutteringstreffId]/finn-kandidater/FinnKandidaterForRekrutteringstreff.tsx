'use client';

import SideLayout from '../../../components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../components/tilgangskontroll/roller';
import { KandidatSøkProvider } from '../../../kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '../../../kandidat/KandidatSøkMarkerteContext';
import KandidatTilRekrutteringstreff from './KandidatTilRekrutteringstreff';
import * as React from 'react';

const FinnKandidaterForRekrutteringstreff: React.FC = () => {
  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <SideLayout
          // sidepanel={<KandidatSøkSidebar />}
          >
            <KandidatTilRekrutteringstreff />
          </SideLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default FinnKandidaterForRekrutteringstreff;
