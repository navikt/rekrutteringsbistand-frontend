'use client';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterRomfordeling } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  beregnRotasjonsplan,
  flyttJobbsøkerTilRom,
  fordelJobbsøkerePåRom,
  normaliserRom,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import type {
  TreffgjennomføringDTO,
  RomDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import Møteoppsettpanel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Møteoppsettpanel';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Stegnavigasjon';
import { settDragImage } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/dragImage';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useRapporterLagringsstatus';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useTreffgjennomføringFane';
import { useUtskrift } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useUtskrift';
import {
  lagArbeidsgiverplaner,
  lagRomplaner,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/utskriftsplan';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import {
  ArrowRightLeftIcon,
  DragVerticalIcon,
  PrinterSmallIcon,
} from '@navikt/aksel-icons';
import {
  ActionMenu,
  BodyLong,
  BodyShort,
  Bleed,
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
  LocalAlert,
  Modal,
  Table,
  VStack,
} from '@navikt/ds-react';
import type { DragEvent, FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

const KLOKKESLETT_CELLE_STYLE = {
  paddingInlineEnd: 'var(--ax-space-32)',
};

interface Props {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkereData: JobbsøkereResponseDTO;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  onTilbake: () => void;
  onNeste: () => void;
}

interface Romfeil {
  type: 'flytting' | 'fordeling';
  melding: string;
}

interface Romhandlinger {
  aktivtMålromnummer: number | null;
  aktivPersonTreffId: string | null;
  deaktivert: boolean;
  onDraStart: (
    event: DragEvent<HTMLSpanElement>,
    personTreffId: string,
    romnummer: number,
  ) => void;
  onDraSlutt: () => void;
  onDraOver: (event: DragEvent<HTMLElement>, målromnummer: number) => void;
  onDraUt: (event: DragEvent<HTMLElement>) => void;
  onSlipp: (event: DragEvent<HTMLElement>, målromnummer: number) => void;
  onFlytt: (personTreffId: string, målromnummer: number) => void;
}

type Utskriftsvariant = 'arbeidsgivere' | 'jobbsøkere' | null;

interface RomfordelingProps {
  rom: RomDTO[];
  navnPåJobbsøker: (personTreffId: string) => string;
  idPrefiks: string;
  romhandlinger?: Romhandlinger;
  utskrift?: boolean;
}

const Romfordeling: FC<RomfordelingProps> = ({
  rom,
  navnPåJobbsøker,
  idPrefiks,
  romhandlinger,
  utskrift = false,
}) => {
  const romkort = rom.map((romdata) => {
    const headingId = `${idPrefiks}-rom-${romdata.romnummer}`;
    const erAktivtMålrom =
      romhandlinger?.aktivtMålromnummer === romdata.romnummer;

    return (
      <Box
        as='section'
        aria-labelledby={headingId}
        key={romdata.romnummer}
        background={erAktivtMålrom ? 'accent-soft' : 'neutral-soft'}
        borderColor={
          romhandlinger
            ? erAktivtMålrom
              ? 'accent-strong'
              : 'neutral-subtle'
            : undefined
        }
        borderWidth={romhandlinger ? '2' : undefined}
        borderRadius='8'
        padding={romhandlinger ? 'space-6' : 'space-16'}
        flexBasis={utskrift ? '14rem' : undefined}
        minWidth={utskrift ? '14rem' : undefined}
        className={romhandlinger ? 'min-h-28 transition-colors' : undefined}
        onDragOver={
          romhandlinger
            ? (event) => romhandlinger.onDraOver(event, romdata.romnummer)
            : undefined
        }
        onDragLeave={romhandlinger?.onDraUt}
        onDrop={
          romhandlinger
            ? (event) => romhandlinger.onSlipp(event, romdata.romnummer)
            : undefined
        }
      >
        <VStack gap='space-8'>
          <Heading id={headingId} level='4' size='xsmall'>
            Rom {romdata.romnummer}
          </Heading>

          {romdata.jobbsøkere.length === 0 ? (
            <BodyShort>Ingen jobbsøkere</BodyShort>
          ) : (
            <VStack as='ul' gap='space-4'>
              {romdata.jobbsøkere.map((personTreffId) => {
                const navn = navnPåJobbsøker(personTreffId);
                return (
                  <Box
                    as='li'
                    key={personTreffId}
                    background='neutral-softA'
                    borderRadius='4'
                    padding={romhandlinger ? 'space-4' : 'space-8'}
                    className={
                      romhandlinger
                        ? `${
                            romhandlinger.aktivPersonTreffId === personTreffId
                              ? 'opacity-60'
                              : ''
                          }`
                        : undefined
                    }
                  >
                    {romhandlinger ? (
                      <HStack
                        gap='space-2'
                        align='center'
                        justify='space-between'
                        wrap={false}
                      >
                        <HStack
                          gap='space-2'
                          align='center'
                          wrap={false}
                          data-drag-image
                          className='min-w-0 flex-1'
                        >
                          <span
                            aria-hidden
                            draggable={!romhandlinger.deaktivert}
                            onDragStart={(event) =>
                              romhandlinger.onDraStart(
                                event,
                                personTreffId,
                                romdata.romnummer,
                              )
                            }
                            onDragEnd={romhandlinger.onDraSlutt}
                            className='inline-flex shrink-0 cursor-grab active:cursor-grabbing'
                          >
                            <DragVerticalIcon aria-hidden />
                          </span>
                          <BodyShort size='small' className='min-w-0 flex-1'>
                            <AvkortetTekst>{navn}</AvkortetTekst>
                          </BodyShort>
                        </HStack>
                        {rom.length > 1 && (
                          <ActionMenu>
                            <ActionMenu.Trigger>
                              <Button
                                type='button'
                                size='small'
                                variant='tertiary-neutral'
                                icon={<ArrowRightLeftIcon aria-hidden />}
                                aria-label={`Flytt ${navn} til et annet rom`}
                                title='Flytt til rom'
                                disabled={romhandlinger.deaktivert}
                                data-flytt-person={personTreffId}
                              />
                            </ActionMenu.Trigger>
                            <ActionMenu.Content>
                              <ActionMenu.Group label='Flytt til rom'>
                                {rom
                                  .filter(
                                    ({ romnummer }) =>
                                      romnummer !== romdata.romnummer,
                                  )
                                  .map(({ romnummer }) => (
                                    <ActionMenu.Item
                                      key={romnummer}
                                      onSelect={() =>
                                        romhandlinger.onFlytt(
                                          personTreffId,
                                          romnummer,
                                        )
                                      }
                                    >
                                      Rom {romnummer}
                                    </ActionMenu.Item>
                                  ))}
                              </ActionMenu.Group>
                            </ActionMenu.Content>
                          </ActionMenu>
                        )}
                      </HStack>
                    ) : (
                      <BodyShort>{navn}</BodyShort>
                    )}
                  </Box>
                );
              })}
            </VStack>
          )}
        </VStack>
      </Box>
    );
  });

  return utskrift ? (
    <HStack gap='space-16' align='stretch' wrap>
      {romkort}
    </HStack>
  ) : (
    <HGrid
      gap='space-4'
      columns={{
        xs: 1,
        md: Math.max(1, Math.min(rom.length, 2)),
        xl: Math.max(1, Math.min(rom.length, 5)),
      }}
    >
      {romkort}
    </HGrid>
  );
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
  const [utskrift, setUtskrift] = useState<Utskriftsvariant>(null);
  const [visFordelPåNytt, setVisFordelPåNytt] = useState(false);
  const [optimistiskeRom, setOptimistiskeRom] = useState<RomDTO[] | null>(null);
  const [lagrerRom, setLagrerRom] = useState(false);
  const [aktivtMålromnummer, setAktivtMålromnummer] = useState<number | null>(
    null,
  );
  const [aktivPersonTreffId, setAktivPersonTreffId] = useState<string | null>(
    null,
  );
  const [feil, setFeil] = useState<Romfeil | null>(null);
  const [statusmelding, setStatusmelding] = useState<string | null>(null);
  const dragKildeRef = useRef<{
    personTreffId: string;
    romnummer: number;
  } | null>(null);
  const fokusEtterFlyttingRef = useRef<string | null>(null);
  const utskriftsområdeRef = useRef<HTMLDivElement>(null);

  const lagredeRom = useMemo(
    () => normaliserRom(treffgjennomføring.rom, treffgjennomføring.antallRom),
    [treffgjennomføring.rom, treffgjennomføring.antallRom],
  );
  const visteRom = optimistiskeRom ?? lagredeRom;

  useRapporterLagringsstatus(lagrerRom, onLagringsstatusEndret);

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
  const romIRotasjonen = rotasjonsplan[0]?.rom ?? [];
  const harVenteplasser = rotasjonsplan.some(
    (runde) => runde.ventendeArbeidsgivere.length > 0,
  );
  const harTommeRom = rotasjonsplan.some((runde) =>
    runde.rom.some((rom) => rom.arbeidsgiverTreffId === null),
  );

  const arbeidsgiverplaner = lagArbeidsgiverplaner(
    rotasjonsplan,
    treffgjennomføring.arbeidsgiverRekkefølge.map(
      ({ arbeidsgiverTreffId }) => arbeidsgiverTreffId,
    ),
  );
  const romplaner = lagRomplaner(rotasjonsplan);

  const skrivUt = useUtskrift({
    utskriftsområdeRef,
    dokumenttittel:
      utskrift === 'jobbsøkere'
        ? 'WorkOp-romplan-jobbsokere'
        : 'WorkOp-romplan-arbeidsgivere',
    sidestil: '@page { size: portrait; }',
  });

  const tilbakestillDrag = () => {
    dragKildeRef.current = null;
    setAktivPersonTreffId(null);
    setAktivtMålromnummer(null);
  };

  const flyttOgLagre = async (personTreffId: string, målromnummer: number) => {
    const oppdaterteRom = flyttJobbsøkerTilRom(
      visteRom,
      personTreffId,
      målromnummer,
    );
    if (oppdaterteRom === visteRom) return;

    const navn = navnForJobbsøker(personTreffId);
    setFeil(null);
    setStatusmelding(null);
    setOptimistiskeRom(oppdaterteRom);
    setLagrerRom(true);

    try {
      const oppdatertTreffgjennomføring = await oppdaterRomfordeling(
        rekrutteringstreffId,
        oppdaterteRom,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
      setStatusmelding(`${navn} er flyttet til rom ${målromnummer}.`);
    } catch {
      setFeil({
        type: 'flytting',
        melding: `Kunne ikke flytte ${navn}. Prøv igjen.`,
      });
    } finally {
      setOptimistiskeRom(null);
      setLagrerRom(false);
    }
  };

  const fordelPåNytt = async () => {
    const nyeRom = fordelJobbsøkerePåRom(
      treffgjennomføring.oppmøte,
      treffgjennomføring.antallRom,
    );
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
      setVisFordelPåNytt(false);
      setStatusmelding('Alle fremmøtte er fordelt på nytt.');
    } catch {
      setFeil({
        type: 'fordeling',
        melding: 'Kunne ikke fordele jobbsøkerne på nytt. Prøv igjen.',
      });
    } finally {
      setOptimistiskeRom(null);
      setLagrerRom(false);
    }
  };

  const startDra = (
    event: DragEvent<HTMLSpanElement>,
    personTreffId: string,
    romnummer: number,
  ) => {
    if (lagrerRom) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', personTreffId);
    settDragImage(event);
    dragKildeRef.current = { personTreffId, romnummer };
    requestAnimationFrame(() => setAktivPersonTreffId(personTreffId));
  };

  const draOverRom = (event: DragEvent<HTMLElement>, målromnummer: number) => {
    const kilde = dragKildeRef.current;
    if (!kilde || kilde.romnummer === målromnummer || lagrerRom) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setAktivtMålromnummer(målromnummer);
  };

  const draUtAvRom = (event: DragEvent<HTMLElement>) => {
    const nesteElement = event.relatedTarget;
    if (
      nesteElement instanceof Node &&
      event.currentTarget.contains(nesteElement)
    ) {
      return;
    }
    setAktivtMålromnummer(null);
  };

  const slippIRom = (event: DragEvent<HTMLElement>, målromnummer: number) => {
    event.preventDefault();
    const kilde = dragKildeRef.current;
    tilbakestillDrag();
    if (!kilde || kilde.romnummer === målromnummer || lagrerRom) return;
    void flyttOgLagre(kilde.personTreffId, målromnummer);
  };

  const romhandlinger: Romhandlinger = {
    aktivtMålromnummer,
    aktivPersonTreffId,
    deaktivert: lagrerRom,
    onDraStart: startDra,
    onDraSlutt: tilbakestillDrag,
    onDraOver: draOverRom,
    onDraUt: draUtAvRom,
    onSlipp: slippIRom,
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

          <section aria-labelledby='workop-rotasjonsmatrise-heading'>
            <Heading
              id='workop-rotasjonsmatrise-heading'
              level='4'
              size='xsmall'
              spacing
            >
              Hvem er i hvilket rom
            </Heading>
            <div className='overflow-x-auto'>
              <Table size='small' zebraStripes>
                <caption className='sr-only'>
                  Arbeidsgivernes rotasjonsplan per runde og rom
                </caption>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      scope='col'
                      className='whitespace-nowrap'
                      style={KLOKKESLETT_CELLE_STYLE}
                    >
                      Klokkeslett
                    </Table.HeaderCell>
                    {romIRotasjonen.map((rom) => (
                      <Table.HeaderCell scope='col' key={rom.romnummer}>
                        Rom {rom.romnummer}
                      </Table.HeaderCell>
                    ))}
                    {harVenteplasser && (
                      <Table.HeaderCell scope='col'>Venter</Table.HeaderCell>
                    )}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {rotasjonsplan.map((runde) => (
                    <Table.Row key={runde.runde}>
                      <Table.HeaderCell
                        scope='row'
                        className='whitespace-nowrap'
                        style={KLOKKESLETT_CELLE_STYLE}
                      >
                        {runde.startKlokkeslett}–{runde.sluttKlokkeslett}
                      </Table.HeaderCell>
                      {runde.rom.map((rom) => (
                        <Table.DataCell
                          key={rom.romnummer}
                          className='max-w-48'
                        >
                          <AvkortetTekst>
                            {navnForArbeidsgiver(rom.arbeidsgiverTreffId)}
                          </AvkortetTekst>
                        </Table.DataCell>
                      ))}
                      {harVenteplasser && (
                        <Table.DataCell className='max-w-48'>
                          <AvkortetTekst>
                            {runde.ventendeArbeidsgivere.length > 0
                              ? runde.ventendeArbeidsgivere
                                  .map(navnForArbeidsgiver)
                                  .join(', ')
                              : 'Ingen'}
                          </AvkortetTekst>
                        </Table.DataCell>
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </section>
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

      <Modal
        open={utskrift !== null}
        onClose={() => setUtskrift(null)}
        header={{
          heading:
            utskrift === 'jobbsøkere'
              ? 'Utskrift til jobbsøkere'
              : 'Utskrift til arbeidsgivere',
          closeButton: true,
        }}
        width='90vw'
        placement='top'
      >
        <Modal.Body>
          <div ref={utskriftsområdeRef}>
            {utskrift === 'jobbsøkere'
              ? romplaner.map((romplan) => {
                  const headingId = `workop-utskrift-rom-${romplan.romnummer}`;
                  const jobbsøkereIRommet =
                    visteRom.find((rom) => rom.romnummer === romplan.romnummer)
                      ?.jobbsøkere ?? [];

                  return (
                    <Box
                      as='section'
                      key={romplan.romnummer}
                      aria-labelledby={headingId}
                      borderColor='neutral-subtle'
                      borderWidth='1'
                      borderRadius='8'
                      padding='space-16'
                      marginBlock='space-0 space-16'
                      className='break-inside-avoid last:break-after-auto print:break-after-page'
                    >
                      <Heading id={headingId} level='2' size='medium' spacing>
                        Rom {romplan.romnummer}
                      </Heading>
                      <BodyShort spacing={jobbsøkereIRommet.length === 0}>
                        {jobbsøkereIRommet.length === 0
                          ? 'Ingen jobbsøkere'
                          : 'Jobbsøkere:'}
                      </BodyShort>
                      {jobbsøkereIRommet.length > 0 && (
                        <VStack
                          as='ul'
                          gap='space-2'
                          marginBlock='space-0 space-16'
                        >
                          {jobbsøkereIRommet.map((personTreffId) => (
                            <BodyShort as='li' key={personTreffId}>
                              {navnForJobbsøker(personTreffId)}
                            </BodyShort>
                          ))}
                        </VStack>
                      )}
                      <Table size='small'>
                        <caption className='sr-only'>
                          Arbeidsgivere som kommer til rom {romplan.romnummer}
                        </caption>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell
                              scope='col'
                              className='whitespace-nowrap'
                              style={KLOKKESLETT_CELLE_STYLE}
                            >
                              Klokkeslett
                            </Table.HeaderCell>
                            <Table.HeaderCell scope='col'>
                              Arbeidsgiver
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {romplan.poster.map((post) => (
                            <Table.Row key={post.startKlokkeslett}>
                              <Table.HeaderCell
                                scope='row'
                                className='whitespace-nowrap'
                                style={KLOKKESLETT_CELLE_STYLE}
                              >
                                {post.startKlokkeslett}–{post.sluttKlokkeslett}
                              </Table.HeaderCell>
                              <Table.DataCell>
                                {navnForArbeidsgiver(post.arbeidsgiverTreffId)}
                              </Table.DataCell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </Box>
                  );
                })
              : arbeidsgiverplaner.map((arbeidsgiverplan) => {
                  const headingId = `workop-utskrift-arbeidsgiver-${arbeidsgiverplan.arbeidsgiverTreffId}`;

                  return (
                    <Box
                      as='section'
                      key={arbeidsgiverplan.arbeidsgiverTreffId}
                      aria-labelledby={headingId}
                      borderColor='neutral-subtle'
                      borderWidth='1'
                      borderRadius='8'
                      padding='space-16'
                      marginBlock='space-0 space-16'
                      className='break-inside-avoid last:break-after-auto print:break-after-page'
                    >
                      <Heading id={headingId} level='2' size='medium' spacing>
                        {navnForArbeidsgiver(
                          arbeidsgiverplan.arbeidsgiverTreffId,
                        )}
                      </Heading>
                      <Table size='small'>
                        <caption className='sr-only'>
                          Rom arbeidsgiveren skal til, per klokkeslett
                        </caption>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell
                              scope='col'
                              className='whitespace-nowrap'
                              style={KLOKKESLETT_CELLE_STYLE}
                            >
                              Klokkeslett
                            </Table.HeaderCell>
                            <Table.HeaderCell scope='col'>Rom</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {arbeidsgiverplan.poster.map((post) => (
                            <Table.Row key={post.startKlokkeslett}>
                              <Table.HeaderCell
                                scope='row'
                                className='whitespace-nowrap'
                                style={KLOKKESLETT_CELLE_STYLE}
                              >
                                {post.startKlokkeslett}–{post.sluttKlokkeslett}
                              </Table.HeaderCell>
                              <Table.DataCell>
                                {post.romnummer === null
                                  ? 'Venter'
                                  : `Rom ${post.romnummer}`}
                              </Table.DataCell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </Box>
                  );
                })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            icon={<PrinterSmallIcon aria-hidden />}
            onClick={() => skrivUt()}
          >
            Skriv ut
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => setUtskrift(null)}
          >
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>

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
