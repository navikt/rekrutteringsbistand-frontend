'use client';

import KandidatTilStilling from '../_ui/KandidatTilStilling';
import { KandidatSøkSidebar } from '@/app/kandidat/KandidatSøkLayout';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
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
          />
        </PanelHeader>
      }
      sidepanel={KandidatSøkSidebar}
    >
      <TilgangskontrollForInnhold
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        ]}
      >
        <div className='pt-5'>
          <KandidatSøkTabs />
          <KandidatTilStilling stillingsData={stillingsData} />
        </div>
      </TilgangskontrollForInnhold>
    </SideLayout>
  );
}
