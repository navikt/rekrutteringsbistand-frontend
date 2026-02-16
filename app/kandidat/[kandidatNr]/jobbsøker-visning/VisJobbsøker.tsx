'use client';
import { JobbsøkerContextProvider } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import KandidatAktivitet from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/aktivitet-fane/KandidatAktivitet';
import JobbsøkerPåKandidatliste from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/jobbsøker-kandidatliste/JobbsøkerPåKandidatliste';
import JobbbsøkerOversikt from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/JobbbsøkerOversikt';
import { useNullableRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useNullableKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useKandidatNavigeringContext } from '@/providers/KandidatNavigeringContext';
import { LocalAlert, Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';

export type LeggTilKnappType = 'stilling' | 'rekrutteringstreff';

export interface VisJobbsøkerProps {
  kandidatId?: string;
  leggTilKnapp?: LeggTilKnappType;
}
enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}

export default function VisJobbsøker({
  kandidatId,
  leggTilKnapp,
}: VisJobbsøkerProps) {
  const stillingData = useNullableStillingsContext();
  const rekrutteringstreffData = useNullableRekrutteringstreffContext();
  const kandidatliste = useNullableKandidatlisteContext();
  const navigering = useKandidatNavigeringContext();

  const [fane, setFane] = useQueryState('kandidatFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });

  if (!kandidatId) {
    return (
      <div className='p-5'>
        <LocalAlert status='warning'>
          <LocalAlert.Header>
            <LocalAlert.Title>Fant ikke kandidat</LocalAlert.Title>
          </LocalAlert.Header>
          <LocalAlert.Content>Fant ikke kandidat nummer.</LocalAlert.Content>
        </LocalAlert>
      </div>
    );
  }

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <JobbsøkerContextProvider kandidatId={kandidatId}>
        <Tabs value={fane} onChange={(val) => setFane(val)} className='w-full'>
          <SideLayout
            header={
              <PanelHeader
                fullskjermUrl={
                  rekrutteringstreffData
                    ? `/rekrutteringstreff/${rekrutteringstreffData.rekrutteringstreffId}/finn-kandidater/${kandidatId}`
                    : stillingData && kandidatliste
                      ? `/stilling/${stillingData?.stillingsId}/kandidatliste/${kandidatId}`
                      : `/kandidat/${kandidatId}`
                }
              >
                <PanelHeader.Section
                  navigering={{
                    nesteKnapp: () => navigering.nesteKandidat(),
                    forrigeKnapp: () => navigering.forrigeKandidat(),
                    harNeste: navigering.harNesteKandidat,
                    harForrige: navigering.harForrigeKandidat,
                  }}
                  ekstraRader={
                    kandidatliste
                      ? [
                          <JobbsøkerPåKandidatliste
                            key={kandidatId}
                            kandidatId={kandidatId}
                          />,
                        ]
                      : undefined
                  }
                  tabs={
                    <div>
                      <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
                      <Tabs.Tab value={Fane.AKTIVITET} label='Aktiviteter' />
                    </div>
                  }
                />
              </PanelHeader>
            }
          >
            <Tabs.Panel value={Fane.OVERSIKT}>
              <JobbbsøkerOversikt leggTilKnapp={leggTilKnapp} />
            </Tabs.Panel>
            <Tabs.Panel value={Fane.AKTIVITET}>
              <KandidatAktivitet />
            </Tabs.Panel>
          </SideLayout>
        </Tabs>
      </JobbsøkerContextProvider>
    </TilgangskontrollForInnhold>
  );
}
