'use client';

import RekrutteringstreffHeader from './header/RekrutteringstreffHeader';
import Stegviser from './stegviser/Stegviser';
import { useSjekklisteStatus } from './stegviser/useSjekklisteStatus';
import TabsPanels from './tabs/TabsPanels';
import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { Tabs } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { FC, useCallback, useEffect, useMemo } from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  JOBBSØKERE = 'jobbsøkere',
  ARBEIDSGIVERE = 'arbeidsgivere',
  HENDELSER = 'hendelser',
}

const Rekrutteringstreff: FC = () => {
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });
  const router = useRouter();
  const { rekrutteringstreffId, lagrerNoe } = useRekrutteringstreffContext();

  const { harPublisert, treff: rekrutteringstreff } =
    useRekrutteringstreffData();

  const alleHendelserHook = useAlleHendelser(rekrutteringstreffId);
  const { data: jobbsøkere = [] } = useJobbsøkere(rekrutteringstreffId);
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const { erPubliseringklar } = useSjekklisteStatus();

  const erAvlystEllerFullført =
    rekrutteringstreff?.status === RekrutteringstreffStatus.AVLYST ||
    rekrutteringstreff?.status === RekrutteringstreffStatus.FULLFØRT;

  useEffect(() => {
    if (!rekrutteringstreff) return;
    if (!harPublisert && !erAvlystEllerFullført) {
      router.replace(`/rekrutteringstreff/${rekrutteringstreffId}/rediger`);
    }
  }, [
    harPublisert,
    erAvlystEllerFullført,
    router,
    rekrutteringstreff,
    rekrutteringstreffId,
  ]);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  }, []);

  const navigateTilRedigering = useCallback(() => {
    router.push(`/rekrutteringstreff/${rekrutteringstreffId}/rediger`);
    scrollToTop();
  }, [router, rekrutteringstreffId, scrollToTop]);

  const handleToggleForhåndsvisning = useCallback(
    (nyForhåndsvisning: boolean) => {
      if (!nyForhåndsvisning) {
        navigateTilRedigering();
      }
    },
    [navigateTilRedigering],
  );

  const onBekreftRedigerPublisert = useCallback(() => {
    navigateTilRedigering();
  }, [navigateTilRedigering]);

  const onAvbrytRedigering = useCallback(() => {
    router.push(`/rekrutteringstreff/${rekrutteringstreffId}`);
  }, [router, rekrutteringstreffId]);

  const sisteLagret = useMemo(() => {
    const alle = alleHendelserHook.data;
    if (!alle || alle.length === 0) return undefined;
    const siste = [...alle]
      .sort(
        (a, b) =>
          new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
      )
      .at(0);
    if (!siste) return undefined;
    const tidspunkt = new Date(siste.tidspunkt);
    return Number.isNaN(tidspunkt.getTime()) ? undefined : tidspunkt;
  }, [alleHendelserHook.data]);

  const rekrutteringstreffNavn = useMemo(() => {
    const tittel = rekrutteringstreff?.tittel?.trim();
    if (tittel && tittel.length > 0 && tittel !== 'Treff uten navn') {
      return tittel;
    }
    return 'Rekrutteringstreff';
  }, [rekrutteringstreff?.tittel]);

  const skalViseHeader = true;

  const onPublisert = useCallback(() => {
    setFane(RekrutteringstreffTabs.OM_TREFFET);
    scrollToTop();
  }, [setFane, scrollToTop]);

  if (!rekrutteringstreff) {
    return <></>;
  }

  const viserFullskjermForhåndsvisning = false;
  const erILesemodus = true;

  const stegviserInnhold = (
    <Stegviser
      onToggleForhåndsvisning={handleToggleForhåndsvisning}
      erIForhåndsvisning={true}
      rekrutteringstreffStatus={rekrutteringstreff.status}
    />
  );

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)}>
      <SideLayout
        sidepanel={stegviserInnhold}
        sidepanelBredde='320px'
        header={
          skalViseHeader ? (
            <RekrutteringstreffHeader
              skalViseHeader={skalViseHeader}
              erstattPath={[rekrutteringstreffId, rekrutteringstreffNavn]}
              erIForhåndsvisning={erILesemodus}
              viserFullskjermForhåndsvisning={viserFullskjermForhåndsvisning}
              jobbsøkereAntall={jobbsøkere?.length ?? 0}
              arbeidsgivereAntall={arbeidsgivere?.length ?? 0}
              lagrerNoe={lagrerNoe}
              sisteLagret={sisteLagret ?? null}
              erPubliseringklar={erPubliseringklar}
              onToggleForhåndsvisning={handleToggleForhåndsvisning}
              onBekreftRedigerPublisert={onBekreftRedigerPublisert}
              onAvbrytRedigering={onAvbrytRedigering}
              onPublisert={onPublisert}
              inTabsContext={true}
            />
          ) : undefined
        }
      >
        <SideInnhold>
          <TabsPanels />
        </SideInnhold>
      </SideLayout>
    </Tabs>
  );
};

export default Rekrutteringstreff;
