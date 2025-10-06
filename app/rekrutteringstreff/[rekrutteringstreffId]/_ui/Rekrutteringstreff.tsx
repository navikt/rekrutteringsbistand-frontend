'use client';

import RekrutteringstreffForhåndsvisning from './forhåndsvisning/RekrutteringstreffForhåndsvisning';
import RekrutteringstreffHeader from './header/RekrutteringstreffHeader';
import { useRekrutteringstreffData } from './hooks/useRekrutteringstreffData';
import { useSjekklisteStatus } from './hooks/useSjekklisteStatus';
import { useAutosave, useInnleggAutosave } from './rediger/useAutosave';
import Stegviser from './stegviser/Stegviser';
import TabsPanels from './tabs/TabsPanels';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useAlleHendelser';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import type { RekrutteringstreffBreadcrumbItem } from '@/app/rekrutteringstreff/_ui/RekrutteringstreffBreadcrumbs';
import Fremdriftspanel from '@/components/Fremdriftspanel';
import SideScroll from '@/components/SideScroll';
import SideLayout from '@/components/layout/SideLayout';
import { RekbisError } from '@/util/rekbisError';
import { Tabs } from '@navikt/ds-react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { parseAsString, useQueryState } from 'nuqs';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  JOBBSØKERE = 'jobbsøkere',
  ARBEIDSGIVERE = 'arbeidsgivere',
  HENDELSER = 'hendelser',
  KI_LOGG = 'ki_logg',
}

const Rekrutteringstreff: FC = () => {
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });
  const [modus, setModus] = useQueryState(
    'mode',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  );
  const { rekrutteringstreffId, lagrerNoe } = useRekrutteringstreffContext();

  const {
    avlyst,
    harPublisert,
    activeStep,
    treff: rekrutteringstreff,
    innlegg,
    rekrutteringstreffHook,
  } = useRekrutteringstreffData();

  const alleHendelserHook = useAlleHendelser(rekrutteringstreffId);
  const { data: jobbsøkere = [] } = useJobbsøkere(rekrutteringstreffId);
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const { erPubliseringklar } = useSjekklisteStatus();

  const erAvlystEllerFullført =
    activeStep === 'AVLYST' || activeStep === 'FULLFØRE';

  const viserFullskjermForhåndsvisning = useMemo(
    () => modus === 'preview-page' && !erAvlystEllerFullført,
    [modus, erAvlystEllerFullført],
  );

  const eksplisittEditModus = modus === 'edit';
  const autoEditModus =
    rekrutteringstreff && !harPublisert && !erAvlystEllerFullført;

  const erIEditModus = useMemo(
    () => eksplisittEditModus || autoEditModus,
    [eksplisittEditModus, autoEditModus],
  );

  const erILesemodus = !viserFullskjermForhåndsvisning && !erIEditModus;

  useEffect(() => {
    if (!rekrutteringstreff) return;

    const erPreviewMedFeilFane =
      modus === 'preview-page' && fane !== RekrutteringstreffTabs.OM_TREFFET;
    const harModusVedAvlystEllerFullført = erAvlystEllerFullført && modus;

    if (erPreviewMedFeilFane || harModusVedAvlystEllerFullført) {
      setModus('');
    }
  }, [rekrutteringstreff, modus, fane, erAvlystEllerFullført, setModus]);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  }, []);

  const handleToggleForhåndsvisning = (nyForhåndsvisning: boolean) => {
    if (nyForhåndsvisning) {
      setModus('preview-page');
      setFane(RekrutteringstreffTabs.OM_TREFFET);
    } else {
      setModus(erIEditModus ? 'edit' : '');
    }
    scrollToTop();
  };

  const onBekreftRedigerPublisert = () => {
    setModus('edit');
    scrollToTop();
  };

  const onAvbrytRedigering = () => {
    setModus('');
    scrollToTop();
  };

  const lagretTekst = useMemo(() => {
    const alle = alleHendelserHook.data;
    if (!alle || alle.length === 0) return undefined;
    const siste = [...alle]
      .sort(
        (a, b) =>
          new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
      )
      .at(0);
    if (!siste) return undefined;
    const relativ = formatDistanceToNow(new Date(siste.tidspunkt), {
      locale: nb,
      addSuffix: true,
    });
    return `Lagret ${relativ}`;
  }, [alleHendelserHook.data]);

  const rekrutteringstreffNavn = useMemo(() => {
    const tittel = rekrutteringstreff?.tittel?.trim();
    if (tittel && tittel.length > 0 && tittel !== 'Treff uten navn') {
      return tittel;
    }
    return 'Rekrutteringstreff';
  }, [rekrutteringstreff?.tittel]);

  const breadcrumbs: RekrutteringstreffBreadcrumbItem[] = useMemo(() => {
    if (!harPublisert && !avlyst) {
      return [{ label: 'Nytt rekrutteringstreff' }];
    }

    return [{ label: rekrutteringstreffNavn }];
  }, [harPublisert, avlyst, rekrutteringstreffNavn]);

  const skalViseHeader =
    modus === 'preview-page' ? true : !viserFullskjermForhåndsvisning;

  const onPublisert = useCallback(() => {
    setModus('');
    setFane(RekrutteringstreffTabs.OM_TREFFET);
    scrollToTop();
  }, [setModus, setFane, scrollToTop]);

  // Republiser-logikk
  const { getValues, watch, formState } = useFormContext();
  const { save } = useAutosave();
  const { save: saveInnlegg } = useInnleggAutosave();
  const kiTittelLogg = useKiLogg(rekrutteringstreffId, 'tittel');
  const kiInnleggLogg = useKiLogg(rekrutteringstreffId, 'innlegg');
  const { startLagring, stoppLagring } = useRekrutteringstreffContext();

  const markerSisteKiLoggSomLagret = useCallback(async () => {
    const mark = async (
      liste:
        | { id: string; opprettetTidspunkt: string; lagret: boolean }[]
        | undefined,
      setLagret?: (arg: { id: string; lagret: boolean }) => Promise<void>,
    ) => {
      if (!liste || liste.length === 0 || !setLagret) return;

      const sorted = [...liste].sort(
        (a, b) =>
          new Date(b.opprettetTidspunkt).getTime() -
          new Date(a.opprettetTidspunkt).getTime(),
      );
      const siste = sorted[0];

      if (siste && !siste.lagret) {
        await setLagret({ id: siste.id, lagret: true });
      }
    };

    try {
      const [tittelListe, innleggListe] = await Promise.all([
        kiTittelLogg.refresh(),
        kiInnleggLogg.refresh(),
      ]);

      await Promise.all([
        mark(tittelListe ?? kiTittelLogg.data, kiTittelLogg.setLagret),
        mark(innleggListe ?? kiInnleggLogg.data, kiInnleggLogg.setLagret),
      ]);
    } catch (error) {
      new RekbisError({
        message: 'Kunne ikke oppdatere KI-logg lagret-status:',
        error,
      });
    }
  }, [kiTittelLogg, kiInnleggLogg]);

  const onRepubliser = useCallback(async () => {
    try {
      startLagring('republiser');
      await save(undefined, true);
      const values: any = getValues();
      const currentHtml: string = (values?.htmlContent ?? '') as string;
      const backendHtml: string = (innlegg?.[0]?.htmlContent ?? '') as string;
      const shouldSaveInnlegg =
        (currentHtml ?? '').trim() !== (backendHtml ?? '').trim() &&
        (currentHtml ?? '').trim().length > 0;
      if (shouldSaveInnlegg) {
        await saveInnlegg(undefined, true);
      }
      await markerSisteKiLoggSomLagret();
      setModus('');
      scrollToTop();
    } finally {
      stoppLagring('republiser');
    }
  }, [
    startLagring,
    stoppLagring,
    save,
    saveInnlegg,
    getValues,
    innlegg,
    markerSisteKiLoggSomLagret,
    setModus,
    scrollToTop,
  ]);

  const tittelKiFeil = (watch('tittelKiFeil' as any) as any) ?? false;
  const innleggKiFeil = (watch('innleggKiFeil' as any) as any) ?? false;
  const harKiFeil = !!tittelKiFeil || !!innleggKiFeil;
  const harAndreSkjemafeil = Boolean(
    formState.errors &&
      Object.keys(formState.errors).some((key) => key !== 'root'),
  );
  const harFeil = harKiFeil || harAndreSkjemafeil;

  const DEFAULT_TITTEL = 'Treff uten navn';
  const lagretTittel = rekrutteringstreff?.tittel ?? '';
  const manglerNavn =
    typeof lagretTittel === 'string' && lagretTittel.trim() === DEFAULT_TITTEL;
  const republiserDisabled = harFeil || manglerNavn;

  const renderStegviser = () => (
    <Stegviser
      onToggleForhåndsvisning={handleToggleForhåndsvisning}
      erIForhåndsvisning={erILesemodus}
    />
  );

  const stegviserInnhold = renderStegviser();

  const layoutProps = {
    skjulFremdriftspanel: false,
    fremdriftspanelTop: <Fremdriftspanel>{stegviserInnhold}</Fremdriftspanel>,
    fremdriftspanel: <SideScroll>{stegviserInnhold}</SideScroll>,
  } as const;

  if (viserFullskjermForhåndsvisning) {
    return (
      <SideLayout
        {...layoutProps}
        header={
          <RekrutteringstreffHeader
            skalViseHeader={true}
            breadcrumbs={breadcrumbs}
            erIForhåndsvisning={false}
            viserFullskjermForhåndsvisning={true}
            jobbsøkereAntall={jobbsøkere?.length ?? 0}
            arbeidsgivereAntall={arbeidsgivere?.length ?? 0}
            lagrerNoe={lagrerNoe}
            lagretTekst={lagretTekst}
            erPubliseringklar={erPubliseringklar}
            onToggleForhåndsvisning={handleToggleForhåndsvisning}
            onBekreftRedigerPublisert={onBekreftRedigerPublisert}
            onAvbrytRedigering={onAvbrytRedigering}
            onPublisert={onPublisert}
            onRepubliser={onRepubliser}
            republiserDisabled={republiserDisabled}
            inTabsContext={false}
          />
        }
      >
        <SideScroll>
          <div className='space-y-4'>
            <RekrutteringstreffForhåndsvisning />
          </div>
        </SideScroll>
      </SideLayout>
    );
  }

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)}>
      <SideLayout
        {...layoutProps}
        header={
          skalViseHeader ? (
            <RekrutteringstreffHeader
              skalViseHeader={skalViseHeader}
              breadcrumbs={breadcrumbs}
              erIForhåndsvisning={erILesemodus}
              viserFullskjermForhåndsvisning={viserFullskjermForhåndsvisning}
              jobbsøkereAntall={jobbsøkere?.length ?? 0}
              arbeidsgivereAntall={arbeidsgivere?.length ?? 0}
              lagrerNoe={lagrerNoe}
              lagretTekst={lagretTekst}
              erPubliseringklar={erPubliseringklar}
              onToggleForhåndsvisning={handleToggleForhåndsvisning}
              onBekreftRedigerPublisert={onBekreftRedigerPublisert}
              onAvbrytRedigering={onAvbrytRedigering}
              onPublisert={onPublisert}
              onRepubliser={onRepubliser}
              republiserDisabled={republiserDisabled}
              inTabsContext={true}
            />
          ) : undefined
        }
      >
        <SideScroll>
          <div className='space-y-4'>
            <TabsPanels
              erIVisning={erILesemodus}
              onUpdated={rekrutteringstreffHook.mutate}
            />
          </div>
        </SideScroll>
      </SideLayout>
    </Tabs>
  );
};

export default Rekrutteringstreff;
