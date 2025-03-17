'use client';

import SideLayout from '../../../components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../components/tilgangskontroll/roller';
import { KandidatSøkProvider } from '../../../kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '../../../kandidat/KandidatSøkMarkerteContext';
import KandidatSøkSidebar from '../../../kandidat/components/kandidat-sok-sidebar/KandidatSøkSidebar';
import { useStillingsContext } from '../StillingsContext';
import KandidatTilStilling from './KandidatTilStilling';
import * as React from 'react';

// export interface FinnKandidaterForStillingProps {
//   stillingsId: string;
// }

const FinnKandidaterForStilling: React.FC = ({}) => {
  const { stillingsData } = useStillingsContext();

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
            <KandidatTilStilling stillingsData={stillingsData} />
          </SideLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default FinnKandidaterForStilling;
