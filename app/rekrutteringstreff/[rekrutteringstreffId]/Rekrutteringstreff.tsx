'use client';

import { useRekrutteringstreffContext } from './RekrutteringstreffContext';
import AdminModals, {
  type AdminHendelse,
} from './_ui/rekrutteringstreff/AdminModals';
import HeaderActions from './_ui/rekrutteringstreff/HeaderActions';
import TabsNav from './_ui/rekrutteringstreff/TabsNav';
import TabsPanels from './_ui/rekrutteringstreff/TabsPanels';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useAlleHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import {
  avlysRekrutteringstreff,
  avpubliserRekrutteringstreff,
  publiserRekrutteringstreff,
  fullførRekrutteringstreff,
  gjenåpnRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/status/utførRekrutteringstreffStatusHendelser';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import Stegviser from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/Stegviser';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_domain/constants';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { RekbisError } from '@/util/rekbisError';
import { Tabs } from '@navikt/ds-react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { parseAsString, useQueryState } from 'nuqs';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

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

  const redigerPublisertModalRef = useRef<HTMLDialogElement>(null);
  const publiserModalRef = useRef<HTMLDialogElement>(null);
  const fullførModalRef = useRef<HTMLDialogElement>(null);
  const gjenåpneModalRef = useRef<HTMLDialogElement>(null);
  const administrasjonModalRef = useRef<HTMLDialogElement>(null);
  const [publiserer, setPubliserer] = useState(false);
  const [fullfører, setFullfører] = useState(false);
  const [gjenåpner, setGjenåpner] = useState(false);
  const [aktivModal, setAktivModalState] = useState<AdminHendelse | null>(null);
  const [prosesserer, setProsesserer] = useState<AdminHendelse | null>(null);

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

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  };

  const handleToggleForhåndsvisning = (nyForhåndsvisning: boolean) => {
    if (avlyst) return;
    if (!nyForhåndsvisning && harPublisert) {
      redigerPublisertModalRef.current?.showModal();
      return;
    }
    setModus(nyForhåndsvisning ? '' : 'edit');
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

  const lukkModal = () => {
    administrasjonModalRef.current?.close();
    setAktivModalState(null);
    setProsesserer(null);
  };

  const setAktivAdministrasjonModal = (hendelse: AdminHendelse) => {
    setAktivModalState(hendelse);
    administrasjonModalRef.current?.showModal();
  };

  const openPubliserModal = () => publiserModalRef.current?.showModal();
  const openFullførModal = () => fullførModalRef.current?.showModal();
  const openGjenåpneModal = () => gjenåpneModalRef.current?.showModal();
  const openAvlysModal = () => setAktivAdministrasjonModal('avlys');

  const onPubliserTreffet = async () => {
    setPubliserer(true);
    try {
      await publiserRekrutteringstreff(rekrutteringstreffId);
      await Promise.all([
        rekrutteringstreffHook.mutate(),
        alleHendelserHook.mutate(),
      ]);
    } catch (error) {
      new RekbisError({
        message: 'Publisering av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setPubliserer(false);
    }
  };

  const onFullførRekrutteringstreff = async () => {
    setFullfører(true);
    try {
      await fullførRekrutteringstreff(rekrutteringstreffId);
      await Promise.all([
        rekrutteringstreffHook.mutate(),
        alleHendelserHook.mutate(),
      ]);
    } catch (error) {
      new RekbisError({
        message: 'Avslutting av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setFullfører(false);
    }
  };

  const onGjenåpnTreffet = async () => {
    setGjenåpner(true);
    try {
      await gjenåpnRekrutteringstreff(rekrutteringstreffId);
      await Promise.all([
        rekrutteringstreffHook.mutate(),
        alleHendelserHook.mutate(),
      ]);
    } catch (error) {
      new RekbisError({
        message: 'Gjenåpning av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setGjenåpner(false);
    }
  };

  const håndterAdministrasjon = async (hendelse: AdminHendelse) => {
    if (!rekrutteringstreffId) return;
    setProsesserer(hendelse);
    try {
      if (hendelse === 'avpubliser') {
        await avpubliserRekrutteringstreff(rekrutteringstreffId);
      } else if (hendelse === 'avlys') {
        await avlysRekrutteringstreff(rekrutteringstreffId);
        setModus('');
        scrollToTop();
      }

      await Promise.all([
        rekrutteringstreffHook.mutate(),
        alleHendelserHook.mutate(),
      ]);
      lukkModal();
    } catch (error) {
      new RekbisError({
        message: 'Handling på rekrutteringstreff feilet',
        error,
      });
    } finally {
      setProsesserer(null);
    }
  };

  const modalKonfig: Record<
    AdminHendelse,
    {
      heading: string;
      body: string;
      confirmLabel: string;
      variant: 'primary' | 'secondary' | 'danger';
    }
  > = {
    avpubliser: {
      heading: 'Avpubliser treffet',
      body: 'Treffet blir utilgjengelig for deltakere. Du kan publisere på nytt senere.',
      confirmLabel: 'Avpubliser',
      variant: 'secondary',
    },
    avlys: {
      heading: 'Avlys treffet',
      body: 'Deltakere får ikke lenger tilgang til innholdet og du kan ikke redigere videre. Dette kan ikke angres.',
      confirmLabel: 'Avlys treffet',
      variant: 'danger',
    },
  };

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
                  publiserer={publiserer}
                  fullfører={fullfører}
                  gjenåpner={gjenåpner}
                  harInvitert={harInvitert}
                  tiltidspunktHarPassert={tiltidspunktHarPassert}
                  onToggleForhåndsvisning={handleToggleForhåndsvisning}
                  onOpenPubliser={openPubliserModal}
                  onOpenFullfør={openFullførModal}
                  onOpenGjenåpne={openGjenåpneModal}
                  onOpenAvlys={openAvlysModal}
                  onFullførDirekte={onFullførRekrutteringstreff}
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

      <AdminModals
        redigerPublisertModalRef={redigerPublisertModalRef}
        publiserModalRef={publiserModalRef}
        fullførModalRef={fullførModalRef}
        gjenåpneModalRef={gjenåpneModalRef}
        administrasjonModalRef={administrasjonModalRef}
        publiserer={publiserer}
        fullfører={fullfører}
        gjenåpner={gjenåpner}
        onBekreftRedigerPublisert={() => {
          redigerPublisertModalRef.current?.close();
          setModus('edit');
          scrollToTop();
        }}
        onPubliser={onPubliserTreffet}
        onFullfør={onFullførRekrutteringstreff}
        onGjenåpne={onGjenåpnTreffet}
        aktivModal={aktivModal}
        modalKonfig={modalKonfig}
        prosesserer={prosesserer}
        onAdministrasjon={håndterAdministrasjon}
        onCloseAdministrasjonModal={lukkModal}
      />
    </Tabs>
  );
};

export default Rekrutteringstreff;
