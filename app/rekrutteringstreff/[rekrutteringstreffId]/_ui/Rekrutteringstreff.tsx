'use client';

import RekrutteringstreffUtkastMelding from './RekrutteringstreffUtkastMelding';
import RekrutteringstreffHeader from './header/RekrutteringstreffHeader';
import TabsPanels from './tabs/TabsPanels';
import { useErTreffEier } from './useErTreffEier';
import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import OmTreffetForIkkeEier from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetForIkkeEier';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { Alert, Tabs } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { FC, useCallback } from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  JOBBSØKERE = 'jobbsøkere',
  ARBEIDSGIVERE = 'arbeidsgivere',
  HENDELSER = 'hendelser',
}

const Rekrutteringstreff: FC = () => {
  const router = useRouter();
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { rekrutteringstreffHook } = useRekrutteringstreffData();
  const erTreffEier = useErTreffEier();

  const navigerTilRediger = useCallback(() => {
    router.push(`/rekrutteringstreff/${rekrutteringstreffId}/rediger`);
  }, [router, rekrutteringstreffId]);

  return (
    <SWRLaster
      hooks={[rekrutteringstreffHook]}
      egenFeilmelding={() => <ManglendeTreffFeilmelding />}
    >
      {(rekrutteringstreff) => {
        const erUtkast =
          rekrutteringstreff.status === RekrutteringstreffStatus.UTKAST;
        const erSlettet =
          rekrutteringstreff.status === RekrutteringstreffStatus.SLETTET;

        if (erSlettet) {
          return (
            <SideLayout header={null}>
              <SideInnhold>
                <Alert variant='warning'>
                  Dette rekrutteringstreffet er slettet og er ikke lenger
                  tilgjengelig.
                </Alert>
              </SideInnhold>
            </SideLayout>
          );
        }

        if (erTreffEier) {
          return (
            <Tabs value={fane} onChange={(val) => setFane(val)}>
              <SideLayout
                header={
                  <RekrutteringstreffHeader
                    erIForhåndsvisning={true}
                    onToggleForhåndsvisning={() => navigerTilRediger()}
                    onBekreftRedigerPublisert={navigerTilRediger}
                    inTabsContext={true}
                  />
                }
              >
                <SideInnhold>
                  {erUtkast && <RekrutteringstreffUtkastMelding />}
                  <TabsPanels />
                </SideInnhold>
              </SideLayout>
            </Tabs>
          );
        }

        return (
          <SideLayout
            header={
              <RekrutteringstreffHeader
                erIForhåndsvisning={true}
                onToggleForhåndsvisning={() => navigerTilRediger()}
                onBekreftRedigerPublisert={navigerTilRediger}
              />
            }
          >
            <SideInnhold>
              <OmTreffetForIkkeEier />
            </SideInnhold>
          </SideLayout>
        );
      }}
    </SWRLaster>
  );
};

export default Rekrutteringstreff;
