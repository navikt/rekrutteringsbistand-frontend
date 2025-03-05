import { useStilling } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import SWRLaster from '../../../components/SWRLaster';
import SideLayout from '../../../components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../components/tilgangskontroll/roller';
import { KandidatSøkProvider } from '../../../kandidat/KandidaSokContext';
import { KandidatSøkMarkerteContextProvider } from '../../../kandidat/KandidatSøkMarkerteContext';
import KandidatSøkSidebar from '../../../kandidat/components/kandidat-sok-sidebar/KandidatSøkSidebar';
import KandidatTilStilling from './KandidatTilStilling';
import * as React from 'react';

export interface FinnKandidaterFaneProps {
  stillingsId: string;
}

const FinnKandidaterFane: React.FC<FinnKandidaterFaneProps> = ({
  stillingsId,
}) => {
  const stillingsDataHook = useStilling(stillingsId);

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <SWRLaster hooks={[stillingsDataHook]}>
            {(stillingsData) => {
              return (
                <SideLayout sidepanel={<KandidatSøkSidebar />}>
                  <KandidatTilStilling stillingsData={stillingsData} />
                </SideLayout>
              );
            }}
          </SWRLaster>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default FinnKandidaterFane;
