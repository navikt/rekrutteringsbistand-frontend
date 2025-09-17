'use client';

import { useRekrutteringstreffContext } from './RekrutteringstreffContext';
import RekrutteringstreffForhåndsvisning from './components/RekrutteringstreffForhåndsvisning';
import RekrutteringstreffRedigering from './components/RekrutteringstreffRedigering';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import Aktiviteter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/aktiviteter/Aktiviteter';
import RekrutteringstreffArbeidsgivere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/Arbeidsgivere';
import Jobbsøkere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøkere/Jobbsøkere';
import KiLogg from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/kilogg/components/KiLogg';
import Stegviser from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/Stegviser';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { BodyLong, Button, Modal, Tabs } from '@navikt/ds-react';
import { parseAsString, useQueryState } from 'nuqs';
import { FC, useRef } from 'react';

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
  // Query param mode=edit -> redigeringsmodus, ellers forhåndsvisning
  const [modus, setModus] = useQueryState(
    'mode',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  );
  const erIForhåndsvisning = modus !== 'edit';
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const { data: jobbsøkere } = useJobbsøkere(rekrutteringstreffId);
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const harPublisert =
    rekrutteringstreffHook.data?.hendelser?.some(
      (h) => h.hendelsestype === 'PUBLISER',
    ) ?? false;

  const redigerPublisertModalRef = useRef<HTMLDialogElement>(null);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  };

  const handleToggleForhåndsvisning = (nyForhåndsvisning: boolean) => {
    // Hvis vi er publisert og skal inn i redigering, vis bekreftelsesdialog først
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

  return (
    <Tabs value={fane} onChange={(val) => setFane(val)}>
      <SideLayout
        fremdriftspanel={
          <Stegviser
            onToggleForhåndsvisning={handleToggleForhåndsvisning}
            erIForhåndsvisning={erIForhåndsvisning}
          />
        }
        header={
          <PanelHeader>
            <PanelHeader.Section
              title={'Rekrutteringstreff'}
              tabs={erIForhåndsvisning ? tabList : undefined}
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
    </Tabs>
  );
};

export default Rekrutteringstreff;
