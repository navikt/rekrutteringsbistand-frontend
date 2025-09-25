'use client';

import { KandidatContextProvider } from './KandidatContext';
import KandidatSideLayout from './KandidatsideLayout';
import KandidatlisteBoks from './_ui/KandidatlisteBoks';
import FinnStillingForKandidatKnapp from '@/app/kandidat/_ui/ActionLinks/FinnStillingForKandidatKnapp';
import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import KandidatNavn from '@/app/kandidat/vis-kandidat/_ui/KandidatNavn';
import KandidatAktivitet from '@/app/kandidat/vis-kandidat/aktivitet-fane/KandidatAktivitet';
import KandidatOversikt from '@/app/kandidat/vis-kandidat/oversikt-fane/KandidatOversikt';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import SideScroll from '@/components/SideScroll';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Tabs } from '@navikt/ds-react';
import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { FC } from 'react';

enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}
export interface VisKandidatProps {
  kandidatnr: string;
}

const VisKandidat: FC<VisKandidatProps> = ({ kandidatnr }) => {
  const pathname = usePathname();
  const [visStillingId] = useQueryState('visStillingId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const [fane, setFane] = useQueryState('kandidatFane', {
    defaultValue: 'oversikt',
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
    <KandidatContextProvider kandidatId={kandidatnr}>
      <Tabs value={fane} onChange={(val) => setFane(val)} className=' w-full'>
        <SideLayout
          header={
            <PanelHeader
              className='pb-2'
              fullskjermUrl={'/kandidat/' + kandidatnr}
            >
              <PanelHeader.Section
                title={<KandidatNavn />}
                back={{
                  fallbackPath: '/kandidat',
                }}
                tabs={
                  <>
                    <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
                    <Tabs.Tab value={Fane.AKTIVITET} label='Aktiviteter' />
                  </>
                }
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
            <SideScroll>
              <Tabs.Panel value={Fane.OVERSIKT}>
                <div className='w-full'>
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
                  </KandidatSideLayout>
                  <KandidatOversikt />
                </div>
              </Tabs.Panel>

              <Tabs.Panel value={Fane.AKTIVITET}>
                <div className='w-full'>
                  <KandidatAktivitet />
                </div>
              </Tabs.Panel>
            </SideScroll>
          </TilgangskontrollForInnhold>
        </SideLayout>
      </Tabs>
    </KandidatContextProvider>
  );
};

export default VisKandidat;
