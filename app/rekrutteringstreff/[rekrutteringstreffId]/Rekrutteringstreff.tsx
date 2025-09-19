'use client';

import { useRekrutteringstreffContext } from './RekrutteringstreffContext';
import RekrutteringstreffForhåndsvisning from './components/RekrutteringstreffForhåndsvisning';
import RekrutteringstreffRedigering from './components/RekrutteringstreffRedigering';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useAlleHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import {
  avlysRekrutteringstreff,
  avpubliserRekrutteringstreff,
  RekrutteringstreffAdministrasjonHendelse,
} from '@/app/api/rekrutteringstreff/status/utførRekrutteringstreffStatusHendelser';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SlettRekrutteringstreffModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/SlettRekrutteringstreffModal';
import Aktiviteter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/aktiviteter/Aktiviteter';
import RekrutteringstreffArbeidsgivere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/Arbeidsgivere';
import Jobbsøkere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøkere/Jobbsøkere';
import KiLogg from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/kilogg/components/KiLogg';
import Stegviser from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/Stegviser';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { RekbisError } from '@/util/rekbisError';
import { BodyLong, Button, Modal, Tabs } from '@navikt/ds-react';
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
  const { data: jobbsøkere } = useJobbsøkere(rekrutteringstreffId);
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const hendelser = rekrutteringstreffHook.data?.hendelser;
  const activeStep = useMemo(
    () => getActiveStepFromHendelser(hendelser),
    [hendelser],
  );
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';
  const avlyst = activeStep === 'AVLYST';
  const erIForhåndsvisning = avlyst ? true : modus !== 'edit';

  const redigerPublisertModalRef = useRef<HTMLDialogElement>(null);
  const [aktivModal, setAktivModal] =
    useState<RekrutteringstreffAdministrasjonHendelse | null>(null);
  const [prosesserer, setProsesserer] =
    useState<RekrutteringstreffAdministrasjonHendelse | null>(null);

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

  const tabList = (
    <>
      <Tabs.Tab value={RekrutteringstreffTabs.OM_TREFFET} label='Om treffet' />
      <Tabs.Tab
        value={RekrutteringstreffTabs.JOBBSØKERE}
        label={`Jobbsøkere(${jobbsøkere?.length ?? 0})`}
      />
      <Tabs.Tab
        value={RekrutteringstreffTabs.ARBEIDSGIVERE}
        label={`Arbeidsgivere(${arbeidsgivere?.length ?? 0})`}
      />
      <Tabs.Tab
        value={RekrutteringstreffTabs.AKTIVITETER}
        label='Aktiviteter'
      />
      <Tabs.Tab
        value={RekrutteringstreffTabs.KI_LOGG}
        label='Ki Logg(Kun admin)'
      />
    </>
  );

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

  const lukkModal = () => setAktivModal(null);

  const håndterAdministrasjon = async (
    hendelse: RekrutteringstreffAdministrasjonHendelse,
  ) => {
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
    RekrutteringstreffAdministrasjonHendelse,
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

  const aktivModalKonfig = aktivModal ? modalKonfig[aktivModal] : undefined;

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
              tabs={erIForhåndsvisning ? tabList : undefined}
              meta={lagretTekst}
              actionsRight={
                <div className='flex items-center gap-2'>
                  {!avlyst && (
                    <Button
                      size='small'
                      variant='secondary'
                      onClick={() =>
                        handleToggleForhåndsvisning(!erIForhåndsvisning)
                      }
                    >
                      {erIForhåndsvisning ? 'Rediger' : 'Forhåndsvis'}
                    </Button>
                  )}
                  {harPublisert && !avlyst && (
                    <>
                      <Button
                        size='small'
                        variant='secondary'
                        onClick={() => setAktivModal('avpubliser')}
                      >
                        Avpubliser
                      </Button>
                      <Button
                        size='small'
                        variant='danger'
                        onClick={() => setAktivModal('avlys')}
                      >
                        Avlys treffet
                      </Button>
                    </>
                  )}
                  {activeStep === 'PUBLISERE' && (
                    <SlettRekrutteringstreffModal />
                  )}
                </div>
              }
            />
          </PanelHeader>
        }
      >
        <div className='space-y-4'>
          {erIForhåndsvisning ? (
            <>
              <Tabs.Panel
                value={RekrutteringstreffTabs.OM_TREFFET}
                className='my-4'
              >
                <RekrutteringstreffForhåndsvisning />
              </Tabs.Panel>
              <Tabs.Panel value={RekrutteringstreffTabs.JOBBSØKERE}>
                <Jobbsøkere />
              </Tabs.Panel>
              <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
                <RekrutteringstreffArbeidsgivere />
              </Tabs.Panel>
              <Tabs.Panel value={RekrutteringstreffTabs.AKTIVITETER}>
                <Aktiviteter />
              </Tabs.Panel>

              <TilgangskontrollForInnhold
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
                ]}
              >
                <Tabs.Panel value={RekrutteringstreffTabs.KI_LOGG}>
                  <KiLogg />
                </Tabs.Panel>
              </TilgangskontrollForInnhold>
            </>
          ) : (
            <RekrutteringstreffRedigering
              onUpdated={rekrutteringstreffHook.mutate}
              onGåTilForhåndsvisning={gåTilForhåndsvisning}
            />
          )}
        </div>
      </SideLayout>

      <Modal
        ref={redigerPublisertModalRef}
        header={{ heading: 'Treffet er allerede publisert' }}
      >
        <Modal.Body>
          <BodyLong>
            Dette rekrutteringstreffet er allerede publisert. Hvis du gjør
            endringer nå, vil vi ikke lagre fortløpende per felt. Endringene
            blir lagret når du trykker på knappen Publiser på nytt.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='primary'
            size='small'
            onClick={() => {
              redigerPublisertModalRef.current?.close();
              setModus('edit');
              scrollToTop();
            }}
          >
            Rediger likevel
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='small'
            onClick={() => redigerPublisertModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      {aktivModal && aktivModalKonfig && (
        <Modal
          open={aktivModal !== null}
          onClose={() => {
            if (!prosesserer) lukkModal();
          }}
          header={{ heading: aktivModalKonfig.heading }}
        >
          <Modal.Body>
            <BodyLong>{aktivModalKonfig.body}</BodyLong>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='button'
              size='small'
              variant={aktivModalKonfig.variant}
              loading={prosesserer === aktivModal}
              onClick={() => aktivModal && håndterAdministrasjon(aktivModal)}
            >
              {aktivModalKonfig.confirmLabel}
            </Button>
            <Button
              type='button'
              size='small'
              variant='secondary'
              onClick={() => (!prosesserer ? lukkModal() : undefined)}
              disabled={!!prosesserer}
            >
              Avbryt
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Tabs>
  );
};

export default Rekrutteringstreff;
