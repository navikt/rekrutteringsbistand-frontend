'use client';

import { RekrutteringstreffTabs } from '../_ui/Rekrutteringstreff';
import RekrutteringstreffForhåndsvisning from '../_ui/forhåndsvisning/RekrutteringstreffForhåndsvisning';
import RekrutteringstreffHeader from '../_ui/header/RekrutteringstreffHeader';
import Stegviser from '../_ui/stegviser/Stegviser';
import { useSjekklisteStatus } from '../_ui/stegviser/useSjekklisteStatus';
import { useRekrutteringstreffData } from '../_ui/useRekrutteringstreffData';
import RekrutteringstreffRedigering from './_ui/RekrutteringstreffRedigering';
import { useRepubliser } from './_ui/hooks/republiser/useRepubliser';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { Tabs } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

const RedigerRekrutteringstreff: FC = () => {
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });
  const [modus, setModus] = useQueryState(
    'mode',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  );
  const router = useRouter();
  const { rekrutteringstreffId, lagrerNoe } = useRekrutteringstreffContext();

  const { treff: rekrutteringstreff, rekrutteringstreffHook } =
    useRekrutteringstreffData();

  const alleHendelserHook = useAlleHendelser(rekrutteringstreffId);
  const { data: jobbsøkere = [] } = useJobbsøkere(rekrutteringstreffId);
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const { erPubliseringklar } = useSjekklisteStatus();

  const erAvlystEllerFullført =
    rekrutteringstreff?.status === RekrutteringstreffStatus.AVLYST ||
    rekrutteringstreff?.status === RekrutteringstreffStatus.FULLFØRT;

  const viserFullskjermForhåndsvisning = useMemo(
    () => modus === 'preview-page' && !erAvlystEllerFullført,
    [modus, erAvlystEllerFullført],
  );

  useEffect(() => {
    if (!rekrutteringstreff) return;

    const erPreviewMedFeilFane =
      modus === 'preview-page' && fane !== RekrutteringstreffTabs.OM_TREFFET;
    const harUgyldigPreviewModus = erAvlystEllerFullført && modus;

    if (erPreviewMedFeilFane || harUgyldigPreviewModus) {
      setModus('');
      setFane(RekrutteringstreffTabs.OM_TREFFET);
    }
  }, [
    rekrutteringstreff,
    modus,
    fane,
    erAvlystEllerFullført,
    setModus,
    setFane,
  ]);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  }, []);

  const handleToggleForhåndsvisning = useCallback(
    (nyForhåndsvisning: boolean) => {
      if (nyForhåndsvisning) {
        setModus('preview-page');
        setFane(RekrutteringstreffTabs.OM_TREFFET);
      } else {
        setModus('');
      }
      scrollToTop();
    },
    [setModus, setFane, scrollToTop],
  );

  const onBekreftRedigerPublisert = useCallback(() => {}, []);

  const onAvbrytRedigering = useCallback(() => {
    router.push(`/rekrutteringstreff/${rekrutteringstreffId}`);
    scrollToTop();
  }, [router, rekrutteringstreffId, scrollToTop]);

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

  const skalViseHeader =
    modus === 'preview-page' ? true : !viserFullskjermForhåndsvisning;

  const onPublisert = useCallback(() => {
    setModus('');
    setFane(RekrutteringstreffTabs.OM_TREFFET);
    scrollToTop();
    router.push(`/rekrutteringstreff/${rekrutteringstreffId}`);
  }, [setModus, setFane, scrollToTop, router, rekrutteringstreffId]);

  const handleRepubliserFerdig = useCallback(() => {
    router.push(`/rekrutteringstreff/${rekrutteringstreffId}`);
  }, [router, rekrutteringstreffId]);

  const { onRepubliser } = useRepubliser(
    handleRepubliserFerdig,
    scrollToTop,
    rekrutteringstreff,
  );

  const { handleSubmit } = useFormContext();
  const onSubmit = handleSubmit(async () => {
    await onRepubliser();
  });

  if (!rekrutteringstreff) {
    return <></>;
  }

  const stegviserInnhold = (
    <Stegviser
      onToggleForhåndsvisning={handleToggleForhåndsvisning}
      erIForhåndsvisning={false}
      rekrutteringstreffStatus={rekrutteringstreff.status}
    />
  );

  if (viserFullskjermForhåndsvisning) {
    return (
      <SideLayout
        header={
          <RekrutteringstreffHeader
            skalViseHeader={true}
            erstattPath={[rekrutteringstreffId, rekrutteringstreffNavn]}
            erIForhåndsvisning={false}
            viserFullskjermForhåndsvisning={true}
            jobbsøkereAntall={jobbsøkere?.length ?? 0}
            arbeidsgivereAntall={arbeidsgivere?.length ?? 0}
            lagrerNoe={lagrerNoe}
            sisteLagret={sisteLagret ?? null}
            skalViseAutoLagre={true}
            erPubliseringklar={erPubliseringklar}
            onToggleForhåndsvisning={handleToggleForhåndsvisning}
            onBekreftRedigerPublisert={onBekreftRedigerPublisert}
            onAvbrytRedigering={onAvbrytRedigering}
            onPublisert={onPublisert}
            inTabsContext={false}
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
    <form id='rekrutteringstreff-form' onSubmit={onSubmit} noValidate>
      <Tabs value={fane} onChange={(val) => setFane(val)}>
        <SideLayout
          sidepanel={stegviserInnhold}
          sidepanelBredde='320px'
          header={
            skalViseHeader ? (
              <RekrutteringstreffHeader
                skalViseHeader={skalViseHeader}
                erstattPath={[rekrutteringstreffId, rekrutteringstreffNavn]}
                erIForhåndsvisning={false}
                viserFullskjermForhåndsvisning={viserFullskjermForhåndsvisning}
                jobbsøkereAntall={jobbsøkere?.length ?? 0}
                arbeidsgivereAntall={arbeidsgivere?.length ?? 0}
                lagrerNoe={lagrerNoe}
                sisteLagret={sisteLagret ?? null}
                skalViseAutoLagre={true}
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
            <RekrutteringstreffRedigering
              onUpdated={rekrutteringstreffHook.mutate}
            />
          </SideInnhold>
        </SideLayout>
      </Tabs>
    </form>
  );
};

export default RedigerRekrutteringstreff;
