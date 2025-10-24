'use client';

import KandidatSideLayout from './KandidatsideLayout';
import { useKandidatContext } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import KandidatAktivitet from '@/app/kandidat/[kandidatNr]/vis-kandidat/aktivitet-fane/KandidatAktivitet';
import KandidatOversikt from '@/app/kandidat/[kandidatNr]/vis-kandidat/oversikt-fane/KandidatOversikt';
import FinnStillingForKandidatKnapp from '@/app/kandidat/_ui/ActionLinks/FinnStillingForKandidatKnapp';
import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import KandidatIKandidatliste from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatIKandidatliste/KandidatIKandidatliste';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';

enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}

export interface VisKandidatProps {
  kandidatlisteKandidat?: string;
}

export default function VisKandidat({
  kandidatlisteKandidat,
}: VisKandidatProps) {
  // const pathname = usePathname();
  const { kandidatId } = useKandidatContext();
  // const [visStillingId] = useQueryState('visStillingId', {
  //   defaultValue: '',
  //   clearOnDefault: true,
  // });
  const [fane, setFane] = useQueryState('kandidatFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });

  // const stillingsId = (() => {
  //   // Først prøv å hente fra search parameter
  //   // if (visStillingId) {
  //   //   return visStillingId;
  //   // }

  //   // Deretter prøv å hente fra path
  //   if (pathname) {
  //     const segments = pathname.split('/').filter(Boolean);
  //     const stillingIndex = segments.indexOf('stilling');
  //     if (stillingIndex !== -1 && segments[stillingIndex + 1]) {
  //       return segments[stillingIndex + 1];
  //     }
  //   }

  //   return null;
  // })();

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)} className=' w-full'>
      <SideLayout
        header={
          <PanelHeader fullskjermUrl={`/kandidat/${kandidatId}`}>
            <PanelHeader.Section
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
          <SideInnhold>
            {kandidatlisteKandidat && (
              <div className='-mt-5'>
                <KandidatIKandidatliste
                  kandidatlisteKandidat={kandidatlisteKandidat}
                />
              </div>
            )}
            <Tabs.Panel value={Fane.OVERSIKT}>
              <div className='w-full'>
                <KandidatSideLayout>
                  <div className='@container/kandidat-knapper contain-layout'>
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
          </SideInnhold>
        </TilgangskontrollForInnhold>
      </SideLayout>
    </Tabs>
  );
}
