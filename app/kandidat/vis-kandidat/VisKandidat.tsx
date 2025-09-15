'use client';

import { KandidatContextProvider } from './KandidatContext';
import KandidatSide from './KandidatSide';
import KandidatSideLayout from './KandidatsideLayout';
import KandidatlisteBoks from './_ui/KandidatlisteBoks';
import FinnStillingForKandidatKnapp from '@/app/kandidat/_ui/ActionLinks/FinnStillingForKandidatKnapp';
import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { FC } from 'react';

export interface VisKandidatProps {
  kandidatnr: string;
}

const VisKandidat: FC<VisKandidatProps> = ({ kandidatnr }) => {
  const stillingContext = useNullableStillingsContext();

  return (
    <SideLayout
      header={
        <PanelHeader className='pb-2' fullskjermUrl={'/kandidat/' + kandidatnr}>
          <PanelHeader.Section
            title={'Jobbsøker'}
            back={{
              fallbackPath: '/kandidat',
            }}
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
        <KandidatContextProvider kandidatId={kandidatnr}>
          <KandidatSideLayout>
            {stillingContext && <KandidatlisteBoks kandidatnr={kandidatnr} />}
            <div className='@container/kandidat-knapper'>
              <div className='grid grid-cols-1 @3xl:grid-cols-2 gap-4 mb-6'>
                <FinnStillingForKandidatKnapp />
                <NavigerTilAktivitetsplanenKnapp />
              </div>
            </div>
            <KandidatSide />
          </KandidatSideLayout>
        </KandidatContextProvider>
      </TilgangskontrollForInnhold>
    </SideLayout>
  );
};

export default VisKandidat;
