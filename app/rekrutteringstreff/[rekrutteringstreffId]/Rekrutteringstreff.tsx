'use client';

import { useRekrutteringstreffContext } from './RekrutteringstreffContext';
import RekrutteringstreffHeader from './_ui/rekrutteringstreff/RekrutteringstreffHeader';
import TabsPanels from './_ui/rekrutteringstreff/TabsPanels';
import RekrutteringstreffForhåndsvisning from './components/RekrutteringstreffForhåndsvisning';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useAlleHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import Stegviser from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/Stegviser';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_domain/constants';
import type { RekrutteringstreffBreadcrumbItem } from '@/app/rekrutteringstreff/_ui/RekrutteringstreffBreadcrumbs';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import Fremdriftspanel from '@/components/Fremdriftspanel';
import SideScroll from '@/components/SideScroll';
import SideLayout from '@/components/layout/SideLayout';
import { Button, Tabs } from '@navikt/ds-react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { parseAsString, useQueryState } from 'nuqs';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';

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

  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const alleHendelserHook = useAlleHendelser(rekrutteringstreffId);
  const { data: jobbsøkere = [] } = useJobbsøkere(rekrutteringstreffId);
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const { data: innlegg } = useInnlegg(rekrutteringstreffId);

  const hendelser = rekrutteringstreffHook.data?.hendelser;
  const activeStep = useMemo(
    () => getActiveStepFromHendelser(hendelser),
    [hendelser],
  );
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';
  const avlyst = activeStep === 'AVLYST';

  const viserFullskjermForhåndsvisning = useMemo(() => {
    if (avlyst) return true;
    return modus === 'preview-page';
  }, [avlyst, modus]);

  const erILesemodus = useMemo(() => {
    if (viserFullskjermForhåndsvisning) return false;
    if (modus === 'edit') return false;
    return true;
  }, [viserFullskjermForhåndsvisning, modus]);

  const rekrutteringstreff = rekrutteringstreffHook.data;

  const sjekklisteItems = useMemo(() => {
    const tittel = rekrutteringstreff?.tittel?.trim() ?? '';
    return {
      arbeidsgiver: (arbeidsgivere?.length ?? 0) > 0,
      navn: tittel.length > 0 && tittel !== 'Treff uten navn',
      sted:
        !!rekrutteringstreff?.gateadresse?.trim() &&
        !!rekrutteringstreff?.poststed?.trim(),
      tidspunkt: !!rekrutteringstreff?.fraTid,
      svarfrist: !!rekrutteringstreff?.svarfrist,
      omtreffet: (innlegg?.length ?? 0) > 0,
    };
  }, [arbeidsgivere, rekrutteringstreff, innlegg]);

  const sjekklistePunkterFullfort = useMemo(
    () => Object.values(sjekklisteItems).filter(Boolean).length,
    [sjekklisteItems],
  );
  const totaltAntallSjekklistePunkter = 6;
  const erPubliseringklar =
    sjekklistePunkterFullfort === totaltAntallSjekklistePunkter;

  const harInvitert = useMemo(
    () =>
      jobbsøkere.some((j) =>
        (j.hendelser ?? []).some(
          (h) => h.hendelsestype === JobbsøkerHendelsestype.INVITER,
        ),
      ),
    [jobbsøkere],
  );

  const tiltidspunktHarPassert = useMemo(() => {
    const til = rekrutteringstreff?.tilTid
      ? new Date(rekrutteringstreff.tilTid)
      : undefined;
    const now = new Date();
    return !!(til && now >= til);
  }, [rekrutteringstreff?.tilTid]);

  useEffect(() => {
    if (avlyst && modus !== 'preview-page') {
      setModus('preview-page');
    }
  }, [avlyst, modus, setModus]);

  useEffect(() => {
    // Vent til data er lastet før vi evt. tvinger edit-modus. Uten dette
    // kan vi sette ?mode=edit før vi vet at treffet er publisert, og da
    // forblir man i edit selv etter publisering.
    if (!rekrutteringstreff) return;
    if (
      !harPublisert &&
      !avlyst &&
      modus !== 'edit' &&
      modus !== 'preview-page'
    ) {
      setModus('edit');
    }
  }, [rekrutteringstreff, avlyst, harPublisert, modus, setModus]);

  const harPublisertTidligereRef = useRef(harPublisert);

  useEffect(() => {
    if (
      harPublisert &&
      !harPublisertTidligereRef.current &&
      !avlyst &&
      modus === 'edit'
    ) {
      setModus('');
    }

    harPublisertTidligereRef.current = harPublisert;
  }, [harPublisert, avlyst, modus, setModus]);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  }, []);

  const handleToggleForhåndsvisning = (nyForhåndsvisning: boolean) => {
    if (avlyst) return;
    if (nyForhåndsvisning) {
      // Gå til preview-page når man klikker Forhåndsvisning
      setModus('preview-page');
    } else {
      setModus('edit');
    }
    scrollToTop();
  };

  const onBekreftRedigerPublisert = () => {
    setModus('edit');
    scrollToTop();
  };

  const gåTilForhåndsvisning = () => {
    setModus('preview-page');
    scrollToTop();
  };

  const avsluttForhåndsvisning = () => {
    // Gå alltid tilbake til redigeringsmodus etter forhåndsvisning
    setModus('edit');
    scrollToTop();
  };

  const onAvbrytRedigering = () => {
    // Etter publisering, ved avbryt redigering, gå til vanlig lesemodus
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

  const skalViseHeader = !viserFullskjermForhåndsvisning;

  const oppdaterData = useCallback(async () => {
    await Promise.all([
      rekrutteringstreffHook.mutate(),
      alleHendelserHook.mutate(),
    ]);
  }, [rekrutteringstreffHook, alleHendelserHook]);

  const onAvlyst = useCallback(() => {
    setModus('preview-page');
    scrollToTop();
  }, [scrollToTop, setModus]);

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
      <SideLayout {...layoutProps}>
        <SideScroll>
          <div className='space-y-4'>
            {!avlyst && (
              <div className='flex flex-wrap justify-end gap-2'>
                <Button
                  type='button'
                  size='small'
                  variant='secondary'
                  onClick={avsluttForhåndsvisning}
                >
                  Avslutt forhåndsvisning
                </Button>
              </div>
            )}
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
              jobbsøkereAntall={jobbsøkere?.length ?? 0}
              arbeidsgivereAntall={arbeidsgivere?.length ?? 0}
              lagrerNoe={lagrerNoe}
              lagretTekst={lagretTekst}
              avlyst={avlyst}
              activeStep={activeStep as any}
              erPubliseringklar={erPubliseringklar}
              harInvitert={harInvitert}
              tiltidspunktHarPassert={tiltidspunktHarPassert}
              rekrutteringstreffId={rekrutteringstreffId}
              oppdaterData={oppdaterData}
              onToggleForhåndsvisning={handleToggleForhåndsvisning}
              onBekreftRedigerPublisert={onBekreftRedigerPublisert}
              onAvlyst={onAvlyst}
              onAvbrytRedigering={onAvbrytRedigering}
            />
          ) : undefined
        }
      >
        <SideScroll>
          <div className='space-y-4'>
            <TabsPanels
              erIVisning={erILesemodus}
              onUpdated={rekrutteringstreffHook.mutate}
              onGåTilForhåndsvisning={gåTilForhåndsvisning}
            />
          </div>
        </SideScroll>
      </SideLayout>
    </Tabs>
  );
};

export default Rekrutteringstreff;
