'use client';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  fordelRom,
  oppdaterRomfordeling,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  beregnRotasjonsplan,
  flyttJobbsøkerTilRom,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import Møteoppsettpanel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Møteoppsettpanel';
import RomOgRotasjonUtskrift, {
  type Utskriftsvariant,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/RomOgRotasjonUtskrift';
import Romfordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Romfordeling';
import type { Romhandlinger } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Romkort';
import Rotasjonsmatrise from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Rotasjonsmatrise';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Stegnavigasjon';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useRapporterLagringsstatus';
import { useRomdrag } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useRomdrag';
import {
  lagArbeidsgiverplaner,
  lagRomplaner,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/utskriftsplan';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Bleed,
  Box,
  Button,
  HStack,
  Heading,
  LocalAlert,
  Modal,
  VStack,
} from '@navikt/ds-react';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    jobbsøkereData: JobbsøkereResponseDTO;
  };

interface Romfeil {
  type: 'flytting' | 'fordeling';
  melding: string;
}

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
  const [utskrift, setUtskrift] = useState<Utskriftsvariant>(null);
  const [visFordelPåNytt, setVisFordelPåNytt] = useState(false);
  const [optimistiskeRom, setOptimistiskeRom] = useState<RomDTO[] | null>(null);
  const [lagrerRom, setLagrerRom] = useState(false);
  const [feil, setFeil] = useState<Romfeil | null>(null);
  const [statusmelding, setStatusmelding] = useState<string | null>(null);
  const fokusEtterFlyttingRef = useRef<string | null>(null);

  const visteRom = optimistiskeRom ?? treffgjennomføring.rom;

  useRapporterLagringsstatus(lagrerRom, onLagringsstatusEndret);

  // «Flytt til rom»-knappen gjenskapes ved lagring, så fokus må settes på nytt.
  useEffect(() => {
    if (lagrerRom) return;
    const personTreffId = fokusEtterFlyttingRef.current;
    if (!personTreffId) return;
    fokusEtterFlyttingRef.current = null;
    document
      .querySelector<HTMLButtonElement>(
        `[data-flytt-person="${CSS.escape(personTreffId)}"]`,
      )
      ?.focus();
  }, [lagrerRom, visteRom]);

  const jobbsøkereById = new Map(
    jobbsøkereData.jobbsøkere.map((jobbsøker) => [
      jobbsøker.personTreffId,
      jobbsøker,
    ]),
  );
  const arbeidsgivereById = new Map(
    arbeidsgivere.flatMap((arbeidsgiver) =>
      arbeidsgiver.arbeidsgiverTreffId
        ? [[arbeidsgiver.arbeidsgiverTreffId, arbeidsgiver] as const]
        : [],
    ),
  );

  const visNavn = lagNavnvisning(treffgjennomføring);
  const navnForJobbsøker = (personTreffId: string) => {
    const jobbsøker = jobbsøkereById.get(personTreffId);
    return jobbsøker
      ? visNavn(jobbsøker, jobbsøker.personTreffId)
      : 'Ukjent jobbsøker';
  };
  const navnForArbeidsgiver = (arbeidsgiverTreffId: string | null) =>
    arbeidsgiverTreffId
      ? (arbeidsgivereById.get(arbeidsgiverTreffId)?.navn ??
        'Ukjent arbeidsgiver')
      : 'Tomt';

  const rotasjonsplan = beregnRotasjonsplan(
    treffgjennomføring.arbeidsgiverRekkefølge,
    treffgjennomføring.antallRom,
    treffgjennomføring.starttidspunkt,
    treffgjennomføring.varighetPerMøteMinutter,
  );
  const sisteRunde = rotasjonsplan.at(-1);
  const harVenteplasser = rotasjonsplan.some(
    (runde) => runde.ventendeArbeidsgivere.length > 0,
  );
  const harTommeRom = rotasjonsplan.some((runde) =>
    runde.rom.some((rom) => rom.arbeidsgiverTreffId === null),
  );

  const lagreRomfordeling = async (
    nyeRom: RomDTO[],
    type: Romfeil['type'],
    feilmelding: string,
    suksessmelding: string,
  ) => {
    setFeil(null);
    setStatusmelding(null);
    setOptimistiskeRom(nyeRom);
    setLagrerRom(true);
    try {
      const oppdatertTreffgjennomføring = await oppdaterRomfordeling(
        rekrutteringstreffId,
        nyeRom,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
      setStatusmelding(suksessmelding);
      return true;
    } catch {
      setFeil({ type, melding: feilmelding });
      return false;
    } finally {
      setOptimistiskeRom(null);
      setLagrerRom(false);
    }
  };

  const flyttOgLagre = async (personTreffId: string, målromnummer: number) => {
    const oppdaterteRom = flyttJobbsøkerTilRom(
      visteRom,
      personTreffId,
      målromnummer,
    );
    if (oppdaterteRom === visteRom) return;

    const navn = navnForJobbsøker(personTreffId);
    await lagreRomfordeling(
      oppdaterteRom,
      'flytting',
      `Kunne ikke flytte ${navn}. Prøv igjen.`,
      `${navn} er flyttet til rom ${målromnummer}.`,
    );
  };

  const fordelPåNytt = async () => {
    setFeil(null);
    setStatusmelding(null);
    setLagrerRom(true);
    try {
      const oppdatertTreffgjennomføring = await fordelRom(rekrutteringstreffId);
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
      setStatusmelding('Alle fremmøtte er fordelt på nytt.');
      setVisFordelPåNytt(false);
    } catch {
      setFeil({
        type: 'fordeling',
        melding: 'Kunne ikke fordele jobbsøkerne på nytt. Prøv igjen.',
      });
    } finally {
      setLagrerRom(false);
    }
  };

  const drag = useRomdrag(lagrerRom, (personTreffId, målromnummer) => {
    void flyttOgLagre(personTreffId, målromnummer);
  });

  const romhandlinger: Romhandlinger = {
    aktivtMålromnummer: drag.aktivtMålromnummer,
    aktivPersonTreffId: drag.aktivPersonTreffId,
    deaktivert: lagrerRom,
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
          disabled={lagrerRom}
          onClick={onTilbake}
        >
          Tilbake
        </Button>
        <Button type='button' disabled={lagrerRom} onClick={onNeste}>
          Neste
        </Button>
      </Stegnavigasjon>

      <Møteoppsettpanel
        rekrutteringstreffId={rekrutteringstreffId}
        treffgjennomføring={treffgjennomføring}
        onTreffgjennomføringOppdatert={onTreffgjennomføringOppdatert}
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
            navnPåJobbsøker={navnForJobbsøker}
            idPrefiks='workop-oversikt'
            romhandlinger={romhandlinger}
          />
        </VStack>
      </section>

      <HStack gap='space-8' wrap>
        <Button
          type='button'
          variant='secondary'
          disabled={lagrerRom}
          onClick={() => {
            setFeil(null);
            setVisFordelPåNytt(true);
          }}
        >
          Fordel på nytt
        </Button>
      </HStack>

      <section aria-labelledby='workop-rotasjon-heading'>
        <VStack gap='space-16'>
          <Heading id='workop-rotasjon-heading' level='3' size='small'>
            Arbeidsgiverrotasjon
          </Heading>
          <Box background='neutral-soft' borderRadius='8' padding='space-6'>
            <VStack gap='space-12' align='start'>
              <BodyShort>
                {rotasjonsplan.length} runder fra{' '}
                {rotasjonsplan[0]?.startKlokkeslett ??
                  treffgjennomføring.starttidspunkt}{' '}
                til{' '}
                {sisteRunde?.sluttKlokkeslett ??
                  treffgjennomføring.starttidspunkt}
                . Hver arbeidsgiver besøker alle rom.
              </BodyShort>
              {harVenteplasser && (
                <BodyShort size='small'>
                  Noen arbeidsgivere venter mellom rundene fordi det er færre
                  rom enn arbeidsgivere.
                </BodyShort>
              )}
              {harTommeRom && (
                <BodyShort size='small'>
                  Noen rom står tomme i enkelte runder fordi det er flere rom
                  enn arbeidsgivere.
                </BodyShort>
              )}
              <Bleed marginInline='space-6'>
                <HStack gap='space-8' wrap>
                  <Button
                    type='button'
                    variant='secondary'
                    icon={<PrinterSmallIcon aria-hidden />}
                    disabled={lagrerRom}
                    onClick={() => setUtskrift('arbeidsgivere')}
                  >
                    Utskrift til arbeidsgivere
                  </Button>
                  <Button
                    type='button'
                    variant='secondary'
                    icon={<PrinterSmallIcon aria-hidden />}
                    disabled={lagrerRom}
                    onClick={() => setUtskrift('jobbsøkere')}
                  >
                    Utskrift til jobbsøkere
                  </Button>
                </HStack>
              </Bleed>
            </VStack>
          </Box>

          <Rotasjonsmatrise
            rotasjonsplan={rotasjonsplan}
            harVenteplasser={harVenteplasser}
            navnForArbeidsgiver={navnForArbeidsgiver}
          />
        </VStack>
      </section>

      <RomOgRotasjonUtskrift
        variant={utskrift}
        romplaner={lagRomplaner(rotasjonsplan)}
        arbeidsgiverplaner={lagArbeidsgiverplaner(
          rotasjonsplan,
          treffgjennomføring.arbeidsgiverRekkefølge.map(
            ({ arbeidsgiverTreffId }) => arbeidsgiverTreffId,
          ),
        )}
        rom={visteRom}
        navnForJobbsøker={navnForJobbsøker}
        navnForArbeidsgiver={navnForArbeidsgiver}
        onLukk={() => setUtskrift(null)}
      />

      <Modal
        open={visFordelPåNytt}
        onClose={() => {
          if (!lagrerRom) {
            setVisFordelPåNytt(false);
            setFeil(null);
          }
        }}
        header={{
          heading: 'Fordele alle på nytt?',
          closeButton: !lagrerRom,
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
            onClick={() => void fordelPåNytt()}
          >
            Fordel på nytt
          </Button>
          <Button
            type='button'
            variant='secondary'
            disabled={lagrerRom}
            onClick={() => {
              setVisFordelPåNytt(false);
              setFeil(null);
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
