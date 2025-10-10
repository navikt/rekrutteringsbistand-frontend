'use client';

import KandidatTilStilling from '../_ui/KandidatTilStilling';
import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

export default function FinnKandidaterForStilling() {
  const { stillingsData } = useStillingsContext();

  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            erstattPath={[
              stillingsData.stilling.uuid,
              stillingsData?.stilling?.title,
            ]}
            title={'Finn kandidater for stilling'}
          />
        </PanelHeader>
      }
    >
      <TilgangskontrollForInnhold
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        ]}
      >
        <KandidatSøkProvider>
          <KandidatSøkMarkerteContextProvider>
            <KandidatTilStilling stillingsData={stillingsData} />
          </KandidatSøkMarkerteContextProvider>
        </KandidatSøkProvider>
      </TilgangskontrollForInnhold>
    </SideLayout>
  );
}
