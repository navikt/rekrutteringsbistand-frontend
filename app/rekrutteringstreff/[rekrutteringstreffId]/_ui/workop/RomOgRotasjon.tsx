'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterRomfordeling } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  beregnRotasjonsplan,
  flyttJobbsøkerTilRom,
  fordelJobbsøkerePåRom,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import type {
  MøtedagDTO,
  RomDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import WorkOpStegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/WorkOpStegHeader';
import { formaterNavn } from '@/app/rekrutteringstreff/_utils/formaterNavn';
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
import { Fragment, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const KLOKKESLETT_CELLE_STYLE = {
  paddingInlineEnd: 'var(--ax-space-32)',
};

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkereData: JobbsøkereResponseDTO;
  onMøtedagOppdatert: (møtedag: MøtedagDTO) => void | Promise<void>;
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
                          {navn}
                        </BodyShort>
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
  møtedag,
  arbeidsgivere,
  jobbsøkereData,
  onMøtedagOppdatert,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const [visRotasjonsplan, setVisRotasjonsplan] = useState(false);
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
  const [kunngjøring, setKunngjøring] = useState<string | null>(null);
  const dragKildeRef = useRef<{
    personTreffId: string;
    romnummer: number;
  } | null>(null);
  const utskriftsområdeRef = useRef<HTMLDivElement>(null);
  const visteRom = optimistiskeRom ?? møtedag.rom;

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

  const navnForJobbsøker = (personTreffId: string) => {
    const jobbsøker = jobbsøkereById.get(personTreffId);
    return jobbsøker
      ? formaterNavn(
          jobbsøker.etternavn,
          jobbsøker.fornavn,
          jobbsøker.personTreffId,
        )
      : 'Ukjent jobbsøker';
  };
  const navnForArbeidsgiver = (arbeidsgiverTreffId: string | null) =>
    arbeidsgiverTreffId
      ? (arbeidsgivereById.get(arbeidsgiverTreffId)?.navn ??
        'Ukjent arbeidsgiver')
      : 'Tomt';

  const rotasjonsplan = beregnRotasjonsplan(
    møtedag.arbeidsgiverRekkefølge,
    møtedag.antallRom,
    møtedag.starttidspunkt,
    møtedag.varighetPerMøteMinutter,
    møtedag.pauseMellomMøterMinutter,
  );
  const sisteRunde = rotasjonsplan.at(-1);
  const harVenteplasser = rotasjonsplan.some(
    (runde) => runde.ventendeArbeidsgivere.length > 0,
  );
  const harTommeRom = rotasjonsplan.some((runde) =>
    runde.rom.some((rom) => rom.arbeidsgiverTreffId === null),
  );

  const skrivUt = useReactToPrint({
    contentRef: utskriftsområdeRef,
    documentTitle: 'WorkOp-rom-og-rotasjonsplan',
    pageStyle: '@page { size: landscape; }',
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
    setKunngjøring(null);
    setOptimistiskeRom(oppdaterteRom);
    setLagrerRom(true);
    onLagringsstatusEndret(true);

    try {
      const oppdatertMøtedag = await oppdaterRomfordeling(
        rekrutteringstreffId,
        oppdaterteRom,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
      setKunngjøring(`${navn} er flyttet til rom ${målromnummer}.`);
    } catch {
      setFeil({
        type: 'flytting',
        melding: `Kunne ikke flytte ${navn}. Prøv igjen.`,
      });
    } finally {
      setOptimistiskeRom(null);
      setLagrerRom(false);
      onLagringsstatusEndret(false);
    }
  };

  const fordelPåNytt = async () => {
    const nyeRom = fordelJobbsøkerePåRom(møtedag.oppmøte, møtedag.antallRom);
    setFeil(null);
    setKunngjøring(null);
    setOptimistiskeRom(nyeRom);
    setLagrerRom(true);
    onLagringsstatusEndret(true);

    try {
      const oppdatertMøtedag = await oppdaterRomfordeling(
        rekrutteringstreffId,
        nyeRom,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
      setVisFordelPåNytt(false);
      setKunngjøring('Alle fremmøtte er fordelt på nytt.');
    } catch {
      setFeil({
        type: 'fordeling',
        melding: 'Kunne ikke fordele jobbsøkerne på nytt. Prøv igjen.',
      });
    } finally {
      setOptimistiskeRom(null);
      setLagrerRom(false);
      onLagringsstatusEndret(false);
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
    onFlytt: (personTreffId, målromnummer) =>
      void flyttOgLagre(personTreffId, målromnummer),
  };

  return (
    <VStack gap='space-32'>
      <section aria-labelledby='workop-romfordeling-heading'>
        <VStack gap='space-16'>
          <WorkOpStegHeader
            id='workop-romfordeling-heading'
            tittel='Romfordeling'
            beskrivelse='Dra en jobbsøker til et annet rom, eller bruk «Flytt til rom». Jobbsøkeren legges sist i målrommet.'
            lagrer={lagrerRom}
            feil={feil !== null}
            kunngjøring={kunngjøring}
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
        <Heading id='workop-rotasjon-heading' level='3' size='small' spacing>
          Arbeidsgiverrotasjon
        </Heading>
        <Box background='neutral-soft' borderRadius='8' padding='space-6'>
          <VStack gap='space-12' align='start'>
            <BodyShort>
              {rotasjonsplan.length} runder fra{' '}
              {rotasjonsplan[0]?.startKlokkeslett ?? møtedag.starttidspunkt} til{' '}
              {sisteRunde?.sluttKlokkeslett ?? møtedag.starttidspunkt}. Hver
              arbeidsgiver besøker alle rom.
            </BodyShort>
            {harVenteplasser && (
              <BodyShort size='small'>
                Noen arbeidsgivere venter mellom rundene fordi det er færre rom
                enn arbeidsgivere.
              </BodyShort>
            )}
            {harTommeRom && (
              <BodyShort size='small'>
                Noen rom står tomme i enkelte runder fordi det er flere rom enn
                arbeidsgivere.
              </BodyShort>
            )}
            <Bleed marginInline='space-6'>
              <Button
                type='button'
                variant='secondary'
                disabled={lagrerRom}
                onClick={() => setVisRotasjonsplan(true)}
              >
                Vis rotasjonsplan
              </Button>
            </Bleed>
          </VStack>
        </Box>
      </section>

      <HStack gap='space-8' justify='space-between' wrap>
        <HStack gap='space-8'>
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
        </HStack>
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
        open={visRotasjonsplan}
        onClose={() => setVisRotasjonsplan(false)}
        header={{ heading: 'Rotasjonsplan', closeButton: true }}
        width='90vw'
        placement='top'
      >
        <Modal.Body>
          <div ref={utskriftsområdeRef}>
            <Heading
              level='1'
              size='medium'
              spacing
              className='hidden print:block'
            >
              WorkOp – rom og rotasjonsplan
            </Heading>

            <VStack gap='space-24'>
              <section aria-labelledby='workop-utskrift-rom-heading'>
                <Heading
                  id='workop-utskrift-rom-heading'
                  level='2'
                  size='small'
                  spacing
                >
                  Romfordeling
                </Heading>
                <Romfordeling
                  rom={visteRom}
                  navnPåJobbsøker={navnForJobbsøker}
                  idPrefiks='workop-utskrift'
                  utskrift
                />
              </section>

              <section aria-labelledby='workop-utskrift-rotasjon-heading'>
                <Heading
                  id='workop-utskrift-rotasjon-heading'
                  level='2'
                  size='small'
                  spacing
                >
                  Arbeidsgiverrotasjon
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
                        {visteRom.map((rom) => (
                          <Table.HeaderCell scope='col' key={rom.romnummer}>
                            Rom {rom.romnummer}
                          </Table.HeaderCell>
                        ))}
                        {harVenteplasser && (
                          <Table.HeaderCell scope='col'>
                            Venter
                          </Table.HeaderCell>
                        )}
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {rotasjonsplan.map((runde, indeks) => {
                        const nesteRunde = rotasjonsplan[indeks + 1];
                        const visPause =
                          møtedag.pauseMellomMøterMinutter > 0 && nesteRunde;

                        return (
                          <Fragment key={runde.runde}>
                            <Table.Row>
                              <Table.HeaderCell
                                scope='row'
                                className='whitespace-nowrap'
                                style={KLOKKESLETT_CELLE_STYLE}
                              >
                                {runde.startKlokkeslett}–
                                {runde.sluttKlokkeslett}
                              </Table.HeaderCell>
                              {runde.rom.map((rom) => (
                                <Table.DataCell key={rom.romnummer}>
                                  {navnForArbeidsgiver(rom.arbeidsgiverTreffId)}
                                </Table.DataCell>
                              ))}
                              {harVenteplasser && (
                                <Table.DataCell>
                                  {runde.ventendeArbeidsgivere.length > 0
                                    ? runde.ventendeArbeidsgivere
                                        .map(navnForArbeidsgiver)
                                        .join(', ')
                                    : 'Ingen'}
                                </Table.DataCell>
                              )}
                            </Table.Row>
                            {visPause && (
                              <Table.Row>
                                <Table.HeaderCell
                                  scope='row'
                                  className='whitespace-nowrap'
                                  style={KLOKKESLETT_CELLE_STYLE}
                                >
                                  {runde.sluttKlokkeslett}–
                                  {nesteRunde.startKlokkeslett}
                                </Table.HeaderCell>
                                <Table.DataCell
                                  colSpan={
                                    runde.rom.length + Number(harVenteplasser)
                                  }
                                >
                                  <BodyShort size='small'>
                                    Pause og bytte av rom
                                  </BodyShort>
                                </Table.DataCell>
                              </Table.Row>
                            )}
                          </Fragment>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>
              </section>
            </VStack>
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
            onClick={() => setVisRotasjonsplan(false)}
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
              Ønsker, intervjufordeling og vurderinger beholdes.
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
