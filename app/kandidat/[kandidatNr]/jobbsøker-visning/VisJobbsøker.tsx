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
import { useWindowTile } from '@/components/window/WindowView';
import { useKandidatNavigeringContext } from '@/providers/KandidatNavigeringContext';
import { LocalAlert, Tabs } from '@navikt/ds-react';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

export type LeggTilKnappType = 'stilling' | 'rekrutteringstreff';

export interface VisJobbsøkerProps {
  kandidatId?: string;
  personTreffId?: string;
  leggTilKnapp?: LeggTilKnappType;
}
enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}

export default function VisJobbsøker({
  kandidatId,
  personTreffId,
  leggTilKnapp,
}: VisJobbsøkerProps) {
  const stillingData = useNullableStillingsContext();
  const rekrutteringstreffData = useNullableRekrutteringstreffContext();
  const kandidatliste = useNullableKandidatlisteContext();
  const navigering = useKandidatNavigeringContext();
  const tileInfo = useWindowTile();
  const pathname = usePathname();
  const router = useRouter();

  const erFullskjerm = !tileInfo || tileInfo.tile !== 'detail';

  const fullskjermNavigering = useMemo(() => {
    if (!erFullskjerm || !kandidatId) return null;
    const liste = navigering.kandidatNavigering;
    const index = liste.indexOf(kandidatId);
    if (index === -1) return null;

    const harForrige = index > 0;
    const harNeste = index < liste.length - 1;

    const navigerTil = (nyKandidatId: string) => {
      const segmenter = pathname.split('/');
      segmenter[segmenter.length - 1] = nyKandidatId;
      router.push(segmenter.join('/'));
    };

    return {
      nesteKnapp: () => {
        if (harNeste) navigerTil(liste[index + 1]);
      },
      forrigeKnapp: () => {
        if (harForrige) navigerTil(liste[index - 1]);
      },
      harNeste,
      harForrige,
    };
  }, [
    erFullskjerm,
    navigering.kandidatNavigering,
    kandidatId,
    pathname,
    router,
  ]);

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
      <Tabs value={fane} onChange={(val) => setFane(val)} className='w-full'>
        <SideLayout
          header={
            <PanelHeader
              fullskjermUrl={
                rekrutteringstreffData && personTreffId
                  ? `/rekrutteringstreff/${rekrutteringstreffData.rekrutteringstreffId}/person/${kandidatId}`
                  : rekrutteringstreffData
                    ? `/rekrutteringstreff/${rekrutteringstreffData.rekrutteringstreffId}/finn-kandidater/${kandidatId}`
                    : stillingData && kandidatliste
                      ? `/stilling/${stillingData?.stillingsId}/kandidatliste/${kandidatId}`
                      : stillingData
                        ? `/stilling/${stillingData.stillingsId}/finn-kandidater/${kandidatId}`
                        : `/kandidat/${kandidatId}`
              }
            >
              <PanelHeader.Section
                navigering={
                  fullskjermNavigering ?? {
                    nesteKnapp: () => navigering.nesteKandidat(),
                    forrigeKnapp: () => navigering.forrigeKandidat(),
                    harNeste: navigering.harNesteKandidat,
                    harForrige: navigering.harForrigeKandidat,
                  }
                }
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
          <JobbsøkerContextProvider kandidatId={kandidatId}>
            <Tabs.Panel value={Fane.OVERSIKT}>
              <JobbbsøkerOversikt leggTilKnapp={leggTilKnapp} />
            </Tabs.Panel>
            <Tabs.Panel value={Fane.AKTIVITET}>
              <KandidatAktivitet />
            </Tabs.Panel>
          </JobbsøkerContextProvider>
        </SideLayout>
      </Tabs>
    </TilgangskontrollForInnhold>
  );
}
