'use client';

import { KandidatContextProvider } from './KandidatContext';
import KandidatSide from './KandidatSide';
import KandidatSideLayout from './KandidatsideLayout';
import KandidatlisteBoks from './_ui/KandidatlisteBoks';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

export interface VisKandidatProps {
  kandidatnr: string;
}

const VisKandidat: React.FC<VisKandidatProps> = ({ kandidatnr }) => {
  const stillingContext = useNullableStillingsContext();

  return (
    <SideLayout
      header={
        <PanelHeader className='pb-2'>
          <PanelHeader.Section title={'Jobbsøker'} />
        </PanelHeader>
      }
    >
      <TilgangskontrollForInnhold
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        ]}
      >
        <KandidatContextProvider kandidatId={kandidatnr}>
          <KandidatSideLayout>
            {stillingContext && <KandidatlisteBoks kandidatnr={kandidatnr} />}
            <KandidatSide />
          </KandidatSideLayout>
        </KandidatContextProvider>
      </TilgangskontrollForInnhold>
    </SideLayout>
  );
};

export default VisKandidat;
