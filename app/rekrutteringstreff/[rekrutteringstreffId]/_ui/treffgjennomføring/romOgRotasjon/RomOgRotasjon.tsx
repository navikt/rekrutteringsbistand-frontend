'use client';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/StegHeader';
import { lagJobbsøkeroppslag } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import Arbeidsgiverrotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Arbeidsgiverrotasjon';
import Møteoppsettpanel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Møteoppsettpanel';
import Romfordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Romfordeling';
import type { Romhandlinger } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Romkort';
import { useRomDragOgSlipp } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/useRomDragOgSlipp';
import { useRomfordelingLagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/useRomfordelingLagring';
import {
  BodyLong,
  BodyShort,
  Button,
  HStack,
  LocalAlert,
  Modal,
  VStack,
} from '@navikt/ds-react';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    jobbsøkereData: JobbsøkereResponseDTO;
  };

const RomOgRotasjon: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkereData,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const [visFordelPåNytt, setVisFordelPåNytt] = useState(false);
  const [lagrerMøteoppsett, setLagrerMøteoppsett] = useState(false);
  const fokusEtterFlyttingRef = useRef<string | null>(null);
  const { navnPåJobbsøker, initialerPåJobbsøker } = useMemo(
    () => lagJobbsøkeroppslag(jobbsøkereData.jobbsøkere, treffgjennomføring),
    [jobbsøkereData.jobbsøkere, treffgjennomføring],
  );
  const {
    visteRom,
    lagrerRom,
    feil,
    statusmelding,
    flyttOgLagre,
    fordelPåNytt,
    nullstillFeil,
  } = useRomfordelingLagring({
    rekrutteringstreffId,
    romFraServer: treffgjennomføring.rom,
    navnPåJobbsøker,
    onTreffgjennomføringOppdatert,
    onFordeltPåNytt: () => setVisFordelPåNytt(false),
  });

  const lagrer = lagrerRom || lagrerMøteoppsett;
  useRapporterLagringsstatus(lagrer, onLagringsstatusEndret);

  // «Flytt til rom»-knappen gjenskapes ved lagring, så fokus må settes på nytt.
  useEffect(() => {
    if (lagrer) return;
    const personTreffId = fokusEtterFlyttingRef.current;
    if (!personTreffId) return;
    fokusEtterFlyttingRef.current = null;
    document
      .querySelector<HTMLButtonElement>(
        `[data-flytt-person="${CSS.escape(personTreffId)}"]`,
      )
      ?.focus();
  }, [lagrer, visteRom]);

  const drag = useRomDragOgSlipp(lagrer, (personTreffId, målromnummer) => {
    void flyttOgLagre(personTreffId, målromnummer);
  });

  const romhandlinger: Romhandlinger = {
    aktivtMålromnummer: drag.aktivtMålromnummer,
    aktivPersonTreffId: drag.aktivPersonTreffId,
    deaktivert: lagrer,
    onDraStart: drag.onDraStart,
    onDraSlutt: drag.tilbakestillDrag,
    onDraOver: drag.onDraOver,
    onDraUt: drag.onDraUt,
    onSlipp: drag.onSlipp,
    onFlytt: (personTreffId, målromnummer) => {
      fokusEtterFlyttingRef.current = personTreffId;
      void flyttOgLagre(personTreffId, målromnummer);
    },
  };

  return (
    <VStack gap='space-32'>
      <Stegnavigasjon>
        <Button
          type='button'
          variant='secondary'
          disabled={lagrer}
          onClick={onTilbake}
        >
          Tilbake
        </Button>
        <Button type='button' disabled={lagrer} onClick={onNeste}>
          Neste
        </Button>
      </Stegnavigasjon>

      <Møteoppsettpanel
        rekrutteringstreffId={rekrutteringstreffId}
        treffgjennomføring={treffgjennomføring}
        onTreffgjennomføringOppdatert={onTreffgjennomføringOppdatert}
        onLagringsstatusEndret={setLagrerMøteoppsett}
        deaktivert={lagrerRom}
      />

      <section aria-labelledby='workop-romfordeling-heading'>
        <VStack gap='space-16'>
          <StegHeader
            id='workop-romfordeling-heading'
            tittel='Romfordeling'
            beskrivelse='Dra en jobbsøker til et annet rom, eller bruk «Flytt til rom». Jobbsøkeren legges sist i målrommet.'
            lagrer={lagrerRom}
            feil={feil !== null}
            statusmelding={statusmelding}
          />

          {feil?.type === 'flytting' && (
            <LocalAlert as='div' status='error'>
              <LocalAlert.Content>{feil.melding}</LocalAlert.Content>
            </LocalAlert>
          )}

          <Romfordeling
            rom={visteRom}
            navnPåJobbsøker={navnPåJobbsøker}
            idPrefiks='workop-oversikt'
            romhandlinger={romhandlinger}
          />
        </VStack>
      </section>

      <HStack gap='space-8' wrap>
        <Button
          type='button'
          variant='secondary'
          disabled={lagrer}
          onClick={() => {
            nullstillFeil();
            setVisFordelPåNytt(true);
          }}
        >
          Fordel på nytt
        </Button>
      </HStack>

      <Arbeidsgiverrotasjon
        treffgjennomføring={treffgjennomføring}
        arbeidsgivere={arbeidsgivere}
        rom={visteRom}
        initialerPåJobbsøker={initialerPåJobbsøker}
        deaktivert={lagrer}
      />

      <Modal
        open={visFordelPåNytt}
        onClose={() => {
          if (!lagrer) {
            setVisFordelPåNytt(false);
            nullstillFeil();
          }
        }}
        header={{
          heading: 'Fordele alle på nytt?',
          closeButton: !lagrer,
        }}
        width='medium'
      >
        <Modal.Body>
          <VStack gap='space-16'>
            <BodyLong>
              Alle manuelle romplasseringer erstattes. De fremmøtte fordeles på
              nytt i registrert rekkefølge, så flere kan få et annet rom.
            </BodyLong>
            <BodyShort weight='semibold'>
              Interesser, intervjufordeling og vurderinger beholdes.
            </BodyShort>
            {feil?.type === 'fordeling' && (
              <LocalAlert as='div' status='error'>
                <LocalAlert.Content>{feil.melding}</LocalAlert.Content>
              </LocalAlert>
            )}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            loading={lagrerRom}
            disabled={lagrer}
            onClick={() => void fordelPåNytt()}
          >
            Fordel på nytt
          </Button>
          <Button
            type='button'
            variant='secondary'
            disabled={lagrer}
            onClick={() => {
              setVisFordelPåNytt(false);
              nullstillFeil();
            }}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </VStack>
  );
};

export default RomOgRotasjon;
