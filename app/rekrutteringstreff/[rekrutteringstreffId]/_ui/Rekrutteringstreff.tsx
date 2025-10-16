'use client';

import RekrutteringstreffForhåndsvisning from './forhåndsvisning/RekrutteringstreffForhåndsvisning';
import RekrutteringstreffHeader from './header/RekrutteringstreffHeader';
import { useRekrutteringstreffData } from './hooks/useRekrutteringstreffData';
import { useSjekklisteStatus } from './hooks/useSjekklisteStatus';
import { useRepubliser } from './rediger/hooks/republiser/useRepubliser';
import Stegviser from './stegviser/Stegviser';
import TabsPanels from './tabs/TabsPanels';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SideScroll from '@/components/SideScroll';
import Fremdriftspanel from '@/components/fremdriftspanel/Fremdriftspanel';
import SideLayout from '@/components/layout/SideLayout';
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
    harPublisert,
    activeStep,
    treff: rekrutteringstreff,
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
      setModus('edit');
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

  const skalViseHeader =
    modus === 'preview-page' ? true : !viserFullskjermForhåndsvisning;

  const onPublisert = useCallback(() => {
    setModus('');
    setFane(RekrutteringstreffTabs.OM_TREFFET);
    scrollToTop();
  }, [setModus, setFane, scrollToTop]);

  // Republiser-logikk
  const { onRepubliser } = useRepubliser(
    setModus,
    scrollToTop,
    rekrutteringstreff,
  );

  const { handleSubmit } = useFormContext();
  const onSubmit = handleSubmit(async () => {
    await onRepubliser();
  });

  const renderStegviser = () => (
    <Stegviser
      onToggleForhåndsvisning={handleToggleForhåndsvisning}
      erIForhåndsvisning={erILesemodus}
    />
  );

  const stegviserInnhold = renderStegviser();

  const layoutProps = viserFullskjermForhåndsvisning
    ? ({
        skjulFremdriftspanel: true,
      } as const)
    : ({
        skjulFremdriftspanel: false,
        fremdriftspanelTop: (
          <Fremdriftspanel>{stegviserInnhold}</Fremdriftspanel>
        ),
        fremdriftspanel: <SideScroll>{stegviserInnhold}</SideScroll>,
      } as const);

  if (viserFullskjermForhåndsvisning) {
    return (
      <SideLayout
        {...layoutProps}
        header={
          <RekrutteringstreffHeader
            skalViseHeader={true}
            erstattPath={[rekrutteringstreffId, rekrutteringstreffNavn]}
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
    <form id='rekrutteringstreff-form' onSubmit={onSubmit} noValidate>
      <Tabs value={fane} onChange={(val) => setFane(val)}>
        <SideLayout
          {...layoutProps}
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
                lagretTekst={lagretTekst}
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
    </form>
  );
};

export default Rekrutteringstreff;
