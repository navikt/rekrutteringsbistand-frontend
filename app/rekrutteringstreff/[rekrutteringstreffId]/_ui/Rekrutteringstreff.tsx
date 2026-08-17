'use client';

import RekrutteringstreffUtkastMelding from './RekrutteringstreffUtkastMelding';
import RekrutteringstreffHeader from './header/RekrutteringstreffHeader';
import TabsPanels from './tabs/TabsPanels';
import { useErTreffEier } from './useErTreffEier';
import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import { useFormidlinger } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import { useKanOppretteFormidlingFraTreff } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/useKanOppretteFormidlingFraTreff';
import OmTreffetForIkkeEier from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetForIkkeEier';
import RekrutteringstreffForhåndsvisning from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/forhåndsvisning/RekrutteringstreffForhåndsvisning';
import Stegviser from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/stegviser/Stegviser';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { getMiljø, Miljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';
import { Alert, Tabs } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { FC, useCallback, useState } from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  JOBBSØKERE = 'jobbsøkere',
  ARBEIDSGIVERE = 'arbeidsgivere',
  FORMIDLINGER = 'formidlinger',
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
  const [visForhåndsvisning, setVisForhåndsvisning] = useState(false);

  const erProd = getMiljø() === Miljø.ProdGcp;
  const { error: formidlingerError } = useFormidlinger(
    erProd ? undefined : rekrutteringstreffId,
  );
  const manglerFormidlingstilgang =
    formidlingerError instanceof RekbisError &&
    formidlingerError.statuskode === 403;
  const visFormidlinger = !erProd && !manglerFormidlingstilgang; //TODO Fjern feature toggle når treff-formidling lanseres
  const kanOppretteFormidling = useKanOppretteFormidlingFraTreff();

  const erIkkeEierSomKanFormidle =
    visFormidlinger && !erTreffEier && kanOppretteFormidling;
  const faneForIkkeEierSomKanFormidle =
    fane === RekrutteringstreffTabs.OM_TREFFET ||
    fane === RekrutteringstreffTabs.FORMIDLINGER
      ? fane
      : RekrutteringstreffTabs.OM_TREFFET;

  const handleToggleForhåndsvisning = (ny: boolean) => {
    setVisForhåndsvisning(ny);
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  };

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

        if (erUtkast) {
          return (
            <SideLayout
              header={
                <RekrutteringstreffHeader
                  erIForhåndsvisning={true}
                  onToggleForhåndsvisning={() => navigerTilRediger()}
                  onBekreftRedigerPublisert={navigerTilRediger}
                  visTabs={false}
                />
              }
            >
              <SideInnhold>
                <RekrutteringstreffUtkastMelding erEier={erTreffEier} />
              </SideInnhold>
            </SideLayout>
          );
        }

        const erAvlyst =
          rekrutteringstreff.status === RekrutteringstreffStatus.AVLYST;

        const erPublisert =
          rekrutteringstreff.status === RekrutteringstreffStatus.PUBLISERT;

        const stegviserInnhold = erPublisert ? (
          <Stegviser
            onToggleForhåndsvisning={() => navigerTilRediger()}
            erIForhåndsvisning={true}
            rekrutteringstreffStatus={rekrutteringstreff.status}
          />
        ) : undefined;

        if (erTreffEier) {
          if (visForhåndsvisning) {
            return (
              <SideLayout
                header={
                  <RekrutteringstreffHeader
                    erIForhåndsvisning={true}
                    viserFullskjermForhåndsvisning={true}
                    onToggleForhåndsvisning={handleToggleForhåndsvisning}
                    onBekreftRedigerPublisert={() =>
                      handleToggleForhåndsvisning(false)
                    }
                  />
                }
              >
                <SideInnhold>
                  <RekrutteringstreffForhåndsvisning />
                </SideInnhold>
              </SideLayout>
            );
          }
          return (
            <Tabs value={fane} onChange={(val) => setFane(val)}>
              <SideLayout
                sidepanel={stegviserInnhold}
                sidepanelBredde='320px'
                header={
                  <RekrutteringstreffHeader
                    erIForhåndsvisning={true}
                    onToggleForhåndsvisning={handleToggleForhåndsvisning}
                    onBekreftRedigerPublisert={navigerTilRediger}
                    inTabsContext={true}
                  />
                }
              >
                <SideInnhold
                  utenScroll={fane === RekrutteringstreffTabs.JOBBSØKERE}
                >
                  {erAvlyst && (
                    <Alert variant='warning' className='mb-4'>
                      Dette rekrutteringstreffet er avlyst.
                    </Alert>
                  )}
                  <TabsPanels />
                </SideInnhold>
              </SideLayout>
            </Tabs>
          );
        }

        //TODO Fjern prod sjekk feature toggle når treff-formidling lanseres
        if (
          erIkkeEierSomKanFormidle &&
          (rekrutteringstreff.status === RekrutteringstreffStatus.FULLFØRT ||
            rekrutteringstreff.status === RekrutteringstreffStatus.PUBLISERT) &&
          !erProd
        ) {
          return (
            <Tabs
              value={faneForIkkeEierSomKanFormidle}
              onChange={(val) => setFane(val)}
            >
              <SideLayout
                header={
                  <RekrutteringstreffHeader
                    erIForhåndsvisning={true}
                    onToggleForhåndsvisning={() => navigerTilRediger()}
                    onBekreftRedigerPublisert={navigerTilRediger}
                    inTabsContext={true}
                    visKunOmTreffetOgFormidlinger={true}
                  />
                }
              >
                <SideInnhold>
                  {erAvlyst && (
                    <Alert variant='warning' className='mb-4'>
                      Dette rekrutteringstreffet er avlyst.
                    </Alert>
                  )}
                  <TabsPanels visKunOmTreffetOgFormidlinger={true} />
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
              {erAvlyst && (
                <Alert variant='warning' className='mb-4'>
                  Dette rekrutteringstreffet er avlyst.
                </Alert>
              )}
              <OmTreffetForIkkeEier />
            </SideInnhold>
          </SideLayout>
        );
      }}
    </SWRLaster>
  );
};

export default Rekrutteringstreff;
