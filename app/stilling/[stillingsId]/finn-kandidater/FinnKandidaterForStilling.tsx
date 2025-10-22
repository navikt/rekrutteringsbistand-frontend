'use client';

import KandidatTilStilling from '../_ui/KandidatTilStilling';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import KandidatSøkFilter from '@/app/kandidat/kandidat-søk-filter/KandidatSøkFilter';
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
          <PanelHeader.Section />
        </PanelHeader>
      }
      sidepanelBredde='250px'
      sidepanelTittel='Filtrer'
      sidepanel={<KandidatSøkFilter />}
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
