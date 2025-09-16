'use client';

import { KandidatContextProvider } from './KandidatContext';
import KandidatSide from './KandidatSide';
import KandidatSideLayout from './KandidatsideLayout';
import KandidatlisteBoks from './_ui/KandidatlisteBoks';
import FinnStillingForKandidatKnapp from '@/app/kandidat/_ui/ActionLinks/FinnStillingForKandidatKnapp';
import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { FC } from 'react';

export interface VisKandidatProps {
  kandidatnr: string;
}

const VisKandidat: FC<VisKandidatProps> = ({ kandidatnr }) => {
  const pathname = usePathname();
  const [visStillingId] = useQueryState('visStillingId', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const stillingsId = (() => {
    // Først prøv å hente fra search parameter
    if (visStillingId) {
      return visStillingId;
    }

    // Deretter prøv å hente fra path
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      const stillingIndex = segments.indexOf('stilling');
      if (stillingIndex !== -1 && segments[stillingIndex + 1]) {
        return segments[stillingIndex + 1];
      }
    }

    return null;
  })();

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
            {stillingsId && (
              <StillingsContextProvider stillingsId={stillingsId}>
                <KandidatlisteBoks kandidatnr={kandidatnr} />
              </StillingsContextProvider>
            )}
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
