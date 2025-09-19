'use client';

import { useRekrutteringstreffContext } from './RekrutteringstreffContext';
import HeaderActions from './_ui/rekrutteringstreff/HeaderActions';
import TabsNav from './_ui/rekrutteringstreff/TabsNav';
import TabsPanels from './_ui/rekrutteringstreff/TabsPanels';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useAlleHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import Stegviser from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/Stegviser';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_domain/constants';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { Tabs } from '@navikt/ds-react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { parseAsString, useQueryState } from 'nuqs';
import { FC, useCallback, useEffect, useMemo } from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  JOBBSØKERE = 'jobbsøkere',
  ARBEIDSGIVERE = 'arbeidsgivere',
  AKTIVITETER = 'aktiviteter',
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
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

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
  const erIForhåndsvisning = avlyst ? true : modus !== 'edit';

  const rekrutteringstreff = rekrutteringstreffHook.data;

  const sjekklisteItems = useMemo(() => {
    const tittel = rekrutteringstreff?.tittel?.trim() ?? '';
    return {
      arbeidsgiver: (arbeidsgivere?.length ?? 0) > 0,
      navn: tittel.length > 0 && tittel !== 'Nytt rekrutteringstreff',
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
    if (avlyst && modus === 'edit') {
      setModus('');
    }
  }, [avlyst, modus, setModus]);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  }, []);

  const handleToggleForhåndsvisning = (nyForhåndsvisning: boolean) => {
    if (avlyst) return;
    setModus(nyForhåndsvisning ? '' : 'edit');
    scrollToTop();
  };

  const onBekreftRedigerPublisert = () => {
    setModus('edit');
    scrollToTop();
  };

  const gåTilForhåndsvisning = () => {
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

  const headerTittel = useMemo(() => {
    if (avlyst) return 'Rekrutteringstreff';
    if (!harPublisert) return 'Nytt rekrutteringstreff';
    if (!erIForhåndsvisning) return 'Rediger rekrutteringstreffet';
    return 'Rekrutteringstreff';
  }, [avlyst, harPublisert, erIForhåndsvisning]);

  const oppdaterData = useCallback(async () => {
    await Promise.all([
      rekrutteringstreffHook.mutate(),
      alleHendelserHook.mutate(),
    ]);
  }, [rekrutteringstreffHook, alleHendelserHook]);

  const onAvlyst = useCallback(() => {
    setModus('');
    scrollToTop();
  }, [scrollToTop, setModus]);

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)}>
      <SideLayout
        skjulFremdriftspanel={false}
        fremdriftspanel={
          <Stegviser
            onToggleForhåndsvisning={handleToggleForhåndsvisning}
            erIForhåndsvisning={erIForhåndsvisning}
          />
        }
        header={
          <PanelHeader>
            <PanelHeader.Section
              title={headerTittel}
              tabs={
                erIForhåndsvisning ? (
                  <TabsNav
                    jobbsøkereAntall={jobbsøkere?.length ?? 0}
                    arbeidsgivereAntall={arbeidsgivere?.length ?? 0}
                  />
                ) : undefined
              }
              meta={lagretTekst}
              actionsRight={
                <HeaderActions
                  avlyst={avlyst}
                  activeStep={activeStep as any}
                  erIForhåndsvisning={erIForhåndsvisning}
                  erPubliseringklar={erPubliseringklar}
                  harInvitert={harInvitert}
                  tiltidspunktHarPassert={tiltidspunktHarPassert}
                  rekrutteringstreffId={rekrutteringstreffId}
                  oppdaterData={oppdaterData}
                  onToggleForhåndsvisning={handleToggleForhåndsvisning}
                  onBekreftRedigerPublisert={onBekreftRedigerPublisert}
                  onAvlyst={onAvlyst}
                />
              }
            />
          </PanelHeader>
        }
      >
        <div className='space-y-4'>
          <TabsPanels
            erIForhåndsvisning={erIForhåndsvisning}
            onUpdated={rekrutteringstreffHook.mutate}
            onGåTilForhåndsvisning={gåTilForhåndsvisning}
          />
        </div>
      </SideLayout>
    </Tabs>
  );
};

export default Rekrutteringstreff;
