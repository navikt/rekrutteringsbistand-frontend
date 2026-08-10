'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  fordelIntervjuer,
  oppdaterIntervjufordeling,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøtedagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Stegnavigasjon';
import { settDragImage } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/dragImage';
import {
  erSammeIntervjufordeling,
  finnPlasskonflikter,
  flyttPersonEttSteg,
  flyttPersonTilIndeks,
  flyttPersonTilRad,
  fordelingerForArbeidsgivere,
  type Fordelingsseksjon,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/intervjufordelingHjelpere';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/møtedagNavn';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useRapporterLagringsstatus';
import { useUtskrift } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useUtskrift';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DragVerticalIcon,
  ArrowsCirclepathIcon,
  ExclamationmarkTriangleIcon,
  PrinterSmallIcon,
} from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  ExpansionCard,
  HStack,
  Heading,
  LocalAlert,
  Modal,
  Tooltip,
  VStack,
} from '@navikt/ds-react';
import { DragEvent, FC, useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  onMutate: () => Promise<unknown> | void;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  onTilbake: () => void;
  onNeste: () => void;
}

interface DragKilde {
  arbeidsgiverTreffId: string;
  personTreffId: string;
}

interface DropMål {
  arbeidsgiverTreffId: string;
  seksjon: Fordelingsseksjon;
  personTreffId: string | null;
}

type ArbeidsgiverMedId = ArbeidsgiverDTO & {
  arbeidsgiverTreffId: string;
};

const erstattFordeling = (
  fordelinger: ArbeidsgiverIntervjufordelingDTO[],
  nyFordeling: ArbeidsgiverIntervjufordelingDTO,
) =>
  fordelinger.map((fordeling) =>
    fordeling.arbeidsgiverTreffId === nyFordeling.arbeidsgiverTreffId
      ? nyFordeling
      : fordeling,
  );

const Intervjufordeling: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkere,
  onMutate,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const arbeidsgivereMedId = useMemo(
    () =>
      arbeidsgivere.filter((arbeidsgiver): arbeidsgiver is ArbeidsgiverMedId =>
        Boolean(arbeidsgiver.arbeidsgiverTreffId),
      ),
    [arbeidsgivere],
  );

  const fordelingerFraServer = useMemo(
    () =>
      fordelingerForArbeidsgivere(
        arbeidsgivereMedId.map(
          (arbeidsgiver) => arbeidsgiver.arbeidsgiverTreffId,
        ),
        møtedag.intervjufordelinger,
      ),
    [arbeidsgivereMedId, møtedag.intervjufordelinger],
  );
  const [optimistiskeFordelinger, setOptimistiskeFordelinger] = useState<
    ArbeidsgiverIntervjufordelingDTO[] | null
  >(null);
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [statusmelding, setStatusmelding] = useState('');
  const dragKildeRef = useRef<DragKilde | null>(null);
  const fokusEtterFlyttingRef = useRef<string | null>(null);
  const visDropMålFrameRef = useRef<number | null>(null);
  const utskriftsområdeRef = useRef<HTMLDivElement>(null);
  const [aktivDragKilde, setAktivDragKilde] = useState<DragKilde | null>(null);
  const [dropMål, setDropMål] = useState<DropMål | null>(null);
  const [visUtskrift, setVisUtskrift] = useState(false);
  const [visFordelPåNyttBekreftelse, setVisFordelPåNyttBekreftelse] =
    useState(false);

  const fordelinger = optimistiskeFordelinger ?? fordelingerFraServer;

  useRapporterLagringsstatus(lagrer, onLagringsstatusEndret);

  useEffect(() => {
    if (lagrer) return;
    const flyttknapp = fokusEtterFlyttingRef.current;
    if (!flyttknapp) return;
    fokusEtterFlyttingRef.current = null;
    document
      .querySelector<HTMLButtonElement>(
        `[data-flyttknapp="${CSS.escape(flyttknapp)}"]`,
      )
      ?.focus();
  }, [lagrer, fordelinger]);
  const jobbsøkerePerId = useMemo(
    () =>
      new Map(
        jobbsøkere.map((jobbsøker) => [jobbsøker.personTreffId, jobbsøker]),
      ),
    [jobbsøkere],
  );
  const arbeidsgiverePerId = useMemo(
    () =>
      new Map(
        arbeidsgivereMedId.map((arbeidsgiver) => [
          arbeidsgiver.arbeidsgiverTreffId,
          arbeidsgiver,
        ]),
      ),
    [arbeidsgivereMedId],
  );
  const konflikter = useMemo(
    () => finnPlasskonflikter(fordelinger),
    [fordelinger],
  );

  const fordelingPerArbeidsgiverId = useMemo(
    () =>
      new Map(
        fordelinger.map((fordeling) => [
          fordeling.arbeidsgiverTreffId,
          fordeling,
        ]),
      ),
    [fordelinger],
  );

  const utskriftsfordelinger = useMemo(
    () =>
      arbeidsgivereMedId.flatMap((arbeidsgiver) => {
        const personTreffIder =
          fordelingPerArbeidsgiverId.get(arbeidsgiver.arbeidsgiverTreffId)
            ?.inkludertePersonTreffIder ?? [];

        return personTreffIder.length > 0
          ? [{ arbeidsgiver, personTreffIder }]
          : [];
      }),
    [arbeidsgivereMedId, fordelingPerArbeidsgiverId],
  );
  const skrivUt = useUtskrift({
    utskriftsområdeRef,
    dokumenttittel: 'WorkOp-intervjufordeling',
    sidestil: '@page { size: landscape; margin: 12mm; }',
  });

  const visNavn = lagNavnvisning(møtedag);
  const navnPåJobbsøker = (personTreffId: string) => {
    const jobbsøker = jobbsøkerePerId.get(personTreffId);
    return jobbsøker
      ? visNavn(jobbsøker, jobbsøker.personTreffId)
      : 'Ukjent jobbsøker';
  };

  const lagreFordeling = async (
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    melding: string,
  ) => {
    setFeil(null);
    setStatusmelding('');
    setLagrer(true);
    setOptimistiskeFordelinger(erstattFordeling(fordelinger, nyFordeling));
    try {
      await oppdaterIntervjufordeling(rekrutteringstreffId, nyFordeling);
      await onMutate();
      setStatusmelding(melding);
      setOptimistiskeFordelinger(null);
    } catch {
      setOptimistiskeFordelinger(null);
      setFeil(
        'Kunne ikke lagre intervjufordelingen. Flyttingen ble tilbakestilt. Prøv igjen.',
      );
    } finally {
      setLagrer(false);
    }
  };

  const flyttOgLagre = (
    fordeling: ArbeidsgiverIntervjufordelingDTO,
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    personTreffId: string,
  ) => {
    if (erSammeIntervjufordeling(fordeling, nyFordeling)) return;

    const arbeidsgivernavn =
      arbeidsgiverePerId.get(fordeling.arbeidsgiverTreffId)?.navn ??
      'arbeidsgiveren';
    const inkludertIndeks =
      nyFordeling.inkludertePersonTreffIder.indexOf(personTreffId);
    const melding =
      inkludertIndeks >= 0
        ? `${navnPåJobbsøker(personTreffId)} er flyttet til plass ${inkludertIndeks + 1} hos ${arbeidsgivernavn}.`
        : `${navnPåJobbsøker(personTreffId)} er flyttet under sperrelinjen hos ${arbeidsgivernavn}.`;
    void lagreFordeling(nyFordeling, melding);
  };

  const startDrag = (
    event: DragEvent<HTMLSpanElement>,
    arbeidsgiverTreffId: string,
    personTreffId: string,
  ) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', 'workop-intervjufordeling');
    settDragImage(event);
    const dragKilde = { arbeidsgiverTreffId, personTreffId };
    dragKildeRef.current = dragKilde;
    visDropMålFrameRef.current = requestAnimationFrame(() => {
      setAktivDragKilde(dragKilde);
      visDropMålFrameRef.current = null;
    });
  };

  const avsluttDrag = () => {
    if (visDropMålFrameRef.current !== null) {
      cancelAnimationFrame(visDropMålFrameRef.current);
      visDropMålFrameRef.current = null;
    }
    dragKildeRef.current = null;
    setAktivDragKilde(null);
    setDropMål(null);
  };

  const tillatDropPåRad = (
    event: DragEvent<HTMLElement>,
    arbeidsgiverTreffId: string,
    seksjon: Fordelingsseksjon,
    personTreffId: string,
  ) => {
    if (dragKildeRef.current?.arbeidsgiverTreffId !== arbeidsgiverTreffId) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDropMål({
      arbeidsgiverTreffId,
      seksjon,
      personTreffId,
    });
  };

  const tillatDropPåSlutten = (
    event: DragEvent<HTMLElement>,
    arbeidsgiverTreffId: string,
    seksjon: Fordelingsseksjon,
  ) => {
    if (dragKildeRef.current?.arbeidsgiverTreffId !== arbeidsgiverTreffId) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDropMål({
      arbeidsgiverTreffId,
      seksjon,
      personTreffId: null,
    });
  };

  const slippPerson = (
    event: DragEvent<HTMLElement>,
    fordeling: ArbeidsgiverIntervjufordelingDTO,
    flytt: (personTreffId: string) => ArbeidsgiverIntervjufordelingDTO,
  ) => {
    event.preventDefault();
    const dragKilde = dragKildeRef.current;
    if (
      !dragKilde ||
      dragKilde.arbeidsgiverTreffId !== fordeling.arbeidsgiverTreffId
    ) {
      avsluttDrag();
      return;
    }

    const nyFordeling = flytt(dragKilde.personTreffId);
    const personTreffId = dragKilde.personTreffId;
    avsluttDrag();
    flyttOgLagre(fordeling, nyFordeling, personTreffId);
  };

  const lagreUlagredeEndringerOgGåVidere = async () => {
    const ulagredeFordelinger = fordelinger.filter((fordeling) => {
      if (
        fordeling.inkludertePersonTreffIder.length === 0 &&
        fordeling.ekskludertePersonTreffIder.length === 0
      ) {
        return false;
      }
      const lagret = møtedag.intervjufordelinger.find(
        (eksisterendeFordeling) =>
          eksisterendeFordeling.arbeidsgiverTreffId ===
          fordeling.arbeidsgiverTreffId,
      );
      return !lagret || !erSammeIntervjufordeling(fordeling, lagret);
    });

    setFeil(null);
    setLagrer(true);
    try {
      for (const fordeling of ulagredeFordelinger) {
        await oppdaterIntervjufordeling(rekrutteringstreffId, fordeling);
      }
      if (ulagredeFordelinger.length > 0) {
        await onMutate();
      }
      setOptimistiskeFordelinger(null);
      onNeste();
    } catch {
      setFeil(
        'Kunne ikke lagre intervjufordelingen. Prøv igjen før du går videre.',
      );
    } finally {
      setLagrer(false);
    }
  };

  /**
   * Regner ut rekkefølgen på nytt for alle arbeidsgivere.
   *
   * Overskriver manuelle flyttinger, og krever derfor bekreftelse. De som er
   * flyttet til «ikke med» blir værende der.
   */
  const fordelPåNytt = async () => {
    setVisFordelPåNyttBekreftelse(false);
    setFeil(null);
    setLagrer(true);
    try {
      // Backend regner ut og lagrer i én transaksjon. Vi kan ikke gjette
      // resultatet, så her er det ingen optimistisk oppdatering – vi henter
      // fordelingen på nytt når kallet er ferdig.
      await fordelIntervjuer(rekrutteringstreffId);
      await onMutate();
      setStatusmelding('Intervjuene er fordelt på nytt.');
    } catch {
      setFeil('Kunne ikke fordele på nytt. Prøv igjen.');
    } finally {
      setLagrer(false);
    }
  };

  const renderListe = (
    fordeling: ArbeidsgiverIntervjufordelingDTO,
    arbeidsgiver: ArbeidsgiverMedId,
    seksjon: Fordelingsseksjon,
  ) => {
    const personTreffIder =
      seksjon === 'inkludert'
        ? fordeling.inkludertePersonTreffIder
        : fordeling.ekskludertePersonTreffIder;
    const erInkludert = seksjon === 'inkludert';

    if (personTreffIder.length === 0) {
      const erDropMål =
        dropMål?.arbeidsgiverTreffId === arbeidsgiver.arbeidsgiverTreffId &&
        dropMål.seksjon === seksjon &&
        dropMål.personTreffId === null;
      return (
        <Box
          background='neutral-soft'
          borderColor={erDropMål ? 'accent' : 'neutral-subtle'}
          borderRadius='4'
          borderWidth={erDropMål ? '2' : '1'}
          padding='space-12'
          onDragOver={(event) =>
            tillatDropPåSlutten(
              event,
              arbeidsgiver.arbeidsgiverTreffId,
              seksjon,
            )
          }
          onDrop={(event) =>
            slippPerson(event, fordeling, (personTreffId) =>
              flyttPersonTilIndeks(fordeling, personTreffId, seksjon, 0),
            )
          }
        >
          <BodyShort size='small'>
            {erInkludert
              ? 'Ingen er med på speedintervju.'
              : 'Ingen er tatt ut av speedintervjuet.'}
          </BodyShort>
        </Box>
      );
    }

    const visPlasserSist =
      aktivDragKilde?.arbeidsgiverTreffId === arbeidsgiver.arbeidsgiverTreffId;
    const erSisteDropMål =
      dropMål?.arbeidsgiverTreffId === arbeidsgiver.arbeidsgiverTreffId &&
      dropMål.seksjon === seksjon &&
      dropMål.personTreffId === null;

    return (
      <VStack gap='space-8'>
        <VStack
          as='ol'
          gap='space-8'
          aria-label={
            erInkludert
              ? `Intervjurekkefølge hos ${arbeidsgiver.navn}`
              : `Ikke gjennomført speedintervju hos ${arbeidsgiver.navn}`
          }
        >
          {personTreffIder.map((personTreffId, indeks) => {
            const navn = navnPåJobbsøker(personTreffId);
            const konflikt = konflikter.find(
              (muligKonflikt) =>
                muligKonflikt.personTreffId === personTreffId &&
                muligKonflikt.arbeidsgiverTreffIder.includes(
                  arbeidsgiver.arbeidsgiverTreffId,
                ),
            );
            const andreArbeidsgivere =
              konflikt?.arbeidsgiverTreffIder
                .filter(
                  (arbeidsgiverTreffId) =>
                    arbeidsgiverTreffId !== arbeidsgiver.arbeidsgiverTreffId,
                )
                .map(
                  (arbeidsgiverTreffId) =>
                    arbeidsgiverePerId.get(arbeidsgiverTreffId)?.navn ??
                    'en annen arbeidsgiver',
                )
                .join(', ') ?? '';
            const konfliktTekst = konflikt
              ? `Plass ${konflikt.plass} også hos ${andreArbeidsgivere}`
              : '';
            const erDropMål =
              dropMål?.arbeidsgiverTreffId ===
                arbeidsgiver.arbeidsgiverTreffId &&
              dropMål.seksjon === seksjon &&
              dropMål.personTreffId === personTreffId;
            // Raden dempes først neste frame, slik at dragImage rekker å bli
            // tatt av den udempede raden.
            const erDraKilde =
              aktivDragKilde?.arbeidsgiverTreffId ===
                arbeidsgiver.arbeidsgiverTreffId &&
              aktivDragKilde.personTreffId === personTreffId;
            const flytterOppOverSperre = !erInkludert && indeks === 0;
            const flytterNedUnderSperre =
              erInkludert && indeks === personTreffIder.length - 1;
            const oppEtikett = flytterOppOverSperre
              ? `Flytt ${navn} over sperrelinjen hos ${arbeidsgiver.navn}`
              : `Flytt ${navn} opp hos ${arbeidsgiver.navn}`;
            const nedEtikett = flytterNedUnderSperre
              ? `Flytt ${navn} under sperrelinjen hos ${arbeidsgiver.navn}`
              : `Flytt ${navn} ned hos ${arbeidsgiver.navn}`;
            const oppDeaktivert = lagrer || (erInkludert && indeks === 0);
            const nedDeaktivert =
              lagrer || (!erInkludert && indeks === personTreffIder.length - 1);
            const oppKnappId = `${arbeidsgiver.arbeidsgiverTreffId}|${personTreffId}|opp`;
            const nedKnappId = `${arbeidsgiver.arbeidsgiverTreffId}|${personTreffId}|ned`;

            return (
              <Box
                as='li'
                key={personTreffId}
                background={konflikt ? 'warning-soft' : 'neutral-soft'}
                borderColor={erDropMål ? 'accent' : 'neutral-subtle'}
                borderRadius='4'
                borderWidth={erDropMål ? '2' : '1'}
                padding='space-8'
                className={erDraKilde ? 'opacity-60' : undefined}
                onDragOver={(event) =>
                  tillatDropPåRad(
                    event,
                    arbeidsgiver.arbeidsgiverTreffId,
                    seksjon,
                    personTreffId,
                  )
                }
                onDrop={(event) =>
                  slippPerson(event, fordeling, (flyttetPersonTreffId) =>
                    flyttPersonTilRad(
                      fordeling,
                      flyttetPersonTreffId,
                      personTreffId,
                    ),
                  )
                }
              >
                <HStack
                  gap='space-12'
                  align='center'
                  justify='space-between'
                  wrap={false}
                >
                  <HStack
                    gap='space-8'
                    align='center'
                    wrap={false}
                    data-drag-image
                    // Lange navn brytes inne i selve teksten i stedet for at
                    // dragehåndtak eller pilknapper skyves ned på
                    // egen linje. `min-w-0` er det som gjør at flex-elementet
                    // får lov til å krympe under innholdsbredden sin.
                    className='min-w-0 flex-1'
                  >
                    <span
                      draggable={!lagrer}
                      aria-hidden
                      className={
                        lagrer
                          ? 'shrink-0 cursor-not-allowed'
                          : 'shrink-0 cursor-grab active:cursor-grabbing'
                      }
                      onDragStart={(event) =>
                        startDrag(
                          event,
                          arbeidsgiver.arbeidsgiverTreffId,
                          personTreffId,
                        )
                      }
                      onDragEnd={avsluttDrag}
                    >
                      <DragVerticalIcon aria-hidden />
                    </span>
                    <BodyShort weight='semibold' className='min-w-0 flex-1'>
                      <AvkortetTekst>{navn}</AvkortetTekst>
                    </BodyShort>
                    {konflikt && (
                      <Tooltip content={konfliktTekst} describesChild>
                        <span
                          role='img'
                          aria-label='Plasskonflikt'
                          tabIndex={0}
                          className='inline-flex shrink-0 cursor-help rounded-sm text-(--ax-text-warning-subtle)'
                        >
                          <ExclamationmarkTriangleIcon aria-hidden />
                        </span>
                      </Tooltip>
                    )}
                  </HStack>

                  <HStack
                    gap='space-4'
                    align='center'
                    wrap={false}
                    className='shrink-0'
                  >
                    <Button
                      type='button'
                      size='small'
                      variant='tertiary-neutral'
                      icon={<ArrowUpIcon aria-hidden />}
                      aria-label={oppEtikett}
                      title={oppEtikett}
                      aria-disabled={oppDeaktivert}
                      className={oppDeaktivert ? 'opacity-40' : undefined}
                      data-flyttknapp={oppKnappId}
                      onClick={() => {
                        if (oppDeaktivert) return;
                        fokusEtterFlyttingRef.current = oppKnappId;
                        flyttOgLagre(
                          fordeling,
                          flyttPersonEttSteg(fordeling, personTreffId, 'opp'),
                          personTreffId,
                        );
                      }}
                    />
                    <Button
                      type='button'
                      size='small'
                      variant='tertiary-neutral'
                      icon={<ArrowDownIcon aria-hidden />}
                      aria-label={nedEtikett}
                      title={nedEtikett}
                      aria-disabled={nedDeaktivert}
                      className={nedDeaktivert ? 'opacity-40' : undefined}
                      data-flyttknapp={nedKnappId}
                      onClick={() => {
                        if (nedDeaktivert) return;
                        fokusEtterFlyttingRef.current = nedKnappId;
                        flyttOgLagre(
                          fordeling,
                          flyttPersonEttSteg(fordeling, personTreffId, 'ned'),
                          personTreffId,
                        );
                      }}
                    />
                  </HStack>
                </HStack>
              </Box>
            );
          })}
        </VStack>
        {visPlasserSist && (
          <Box
            background={erSisteDropMål ? 'accent-soft' : 'neutral-soft'}
            borderColor={erSisteDropMål ? 'accent' : 'neutral-subtle'}
            borderRadius='4'
            borderWidth={erSisteDropMål ? '2' : '1'}
            padding='space-8'
            onDragOver={(event) =>
              tillatDropPåSlutten(
                event,
                arbeidsgiver.arbeidsgiverTreffId,
                seksjon,
              )
            }
            onDrop={(event) =>
              slippPerson(event, fordeling, (personTreffId) =>
                flyttPersonTilIndeks(
                  fordeling,
                  personTreffId,
                  seksjon,
                  personTreffIder.length,
                ),
              )
            }
          >
            <BodyShort size='small'>
              {erInkludert
                ? 'Slipp her for å plassere sist over sperrelinjen'
                : 'Slipp her for å plassere sist under sperrelinjen'}
            </BodyShort>
          </Box>
        )}
      </VStack>
    );
  };

  const harInkluderteIntervjuer = utskriftsfordelinger.length > 0;

  return (
    <VStack gap='space-24'>
      <Stegnavigasjon>
        <Button
          type='button'
          variant='secondary'
          onClick={onTilbake}
          disabled={lagrer}
        >
          Tilbake
        </Button>
        <Button
          type='button'
          onClick={() => void lagreUlagredeEndringerOgGåVidere()}
          disabled={!harInkluderteIntervjuer || lagrer}
          loading={lagrer}
        >
          Neste
        </Button>
      </Stegnavigasjon>

      <section
        aria-labelledby='workop-intervjufordeling-heading'
        aria-busy={lagrer}
      >
        <VStack gap='space-16'>
          <StegHeader
            id='workop-intervjufordeling-heading'
            tittel='Intervjufordeling'
            beskrivelse='Dra jobbsøkerne for å endre intervjurekkefølgen, eller bruk pilene. Flytt de som ikke skal delta under sperrelinjen.'
            lagrer={lagrer}
            feil={feil !== null}
            statusmelding={statusmelding}
          />

          {møtedag.interesser.length === 0 && (
            <LocalAlert as='div' status='announcement'>
              <LocalAlert.Content>
                Ingen intervjuønsker er registrert ennå.
              </LocalAlert.Content>
            </LocalAlert>
          )}

          <div className='grid grid-cols-[repeat(auto-fit,minmax(21rem,1fr))] items-start gap-4'>
            {arbeidsgivereMedId.map((arbeidsgiver) => {
              // Kan mangle mens en lagring pågår – se fordelingPerArbeidsgiverId.
              const fordeling = fordelingPerArbeidsgiverId.get(
                arbeidsgiver.arbeidsgiverTreffId,
              );
              if (!fordeling) return null;

              const headingId = `intervjufordeling-${arbeidsgiver.arbeidsgiverTreffId}`;
              const antallJobbsøkere =
                fordeling.inkludertePersonTreffIder.length +
                fordeling.ekskludertePersonTreffIder.length;
              return (
                <ExpansionCard
                  key={arbeidsgiver.arbeidsgiverTreffId}
                  aria-labelledby={headingId}
                  defaultOpen={antallJobbsøkere > 0}
                >
                  <ExpansionCard.Header>
                    <ExpansionCard.Title id={headingId} as='h4'>
                      <AvkortetTekst>{arbeidsgiver.navn}</AvkortetTekst>
                    </ExpansionCard.Title>
                    <ExpansionCard.Description>
                      {fordeling.inkludertePersonTreffIder.length} med ·{' '}
                      {fordeling.ekskludertePersonTreffIder.length} ikke med
                    </ExpansionCard.Description>
                  </ExpansionCard.Header>
                  <ExpansionCard.Content className='[&>.aksel-expansioncard\_\_content-inner]:min-w-0'>
                    <VStack gap='space-16'>
                      <section aria-labelledby={`${headingId}-inkluderte`}>
                        <Heading
                          id={`${headingId}-inkluderte`}
                          level='5'
                          size='xsmall'
                          spacing
                        >
                          Med på speedintervju
                        </Heading>
                        {renderListe(fordeling, arbeidsgiver, 'inkludert')}
                      </section>

                      <Box
                        as='section'
                        aria-labelledby={`${headingId}-ekskluderte`}
                        borderColor='warning'
                        borderWidth='2 0 0 0'
                        paddingBlock='space-12 space-0'
                      >
                        <Heading
                          id={`${headingId}-ekskluderte`}
                          level='5'
                          size='xsmall'
                          spacing
                        >
                          Ikke gjennomført speedintervju
                        </Heading>
                        {renderListe(fordeling, arbeidsgiver, 'ekskludert')}
                      </Box>
                    </VStack>
                  </ExpansionCard.Content>
                </ExpansionCard>
              );
            })}
          </div>
        </VStack>
      </section>

      {feil && (
        <LocalAlert as='div' status='error'>
          <LocalAlert.Content>{feil}</LocalAlert.Content>
        </LocalAlert>
      )}

      <HStack gap='space-8' wrap>
        <Button
          type='button'
          variant='secondary'
          icon={<ArrowsCirclepathIcon aria-hidden />}
          onClick={() => setVisFordelPåNyttBekreftelse(true)}
          disabled={!harInkluderteIntervjuer || lagrer}
        >
          Fordel på nytt
        </Button>
        <Button
          type='button'
          variant='secondary'
          icon={<PrinterSmallIcon aria-hidden />}
          onClick={() => setVisUtskrift(true)}
          disabled={!harInkluderteIntervjuer || lagrer}
        >
          Vis utskrift
        </Button>
      </HStack>

      <Modal
        open={visFordelPåNyttBekreftelse}
        onClose={() => setVisFordelPåNyttBekreftelse(false)}
        header={{ heading: 'Fordele intervjuene på nytt?' }}
        width='small'
      >
        <Modal.Body>
          <BodyLong spacing>
            Rekkefølgen regnes ut på nytt for alle arbeidsgivere. Flyttinger du
            har gjort manuelt blir overskrevet.
          </BodyLong>
          <BodyLong>
            Jobbsøkere du har flyttet under sperrelinjen blir stående der.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            onClick={() => void fordelPåNytt()}
            loading={lagrer}
          >
            Fordel på nytt
          </Button>
          <Button
            type='button'
            variant='secondary'
            disabled={lagrer}
            onClick={() => setVisFordelPåNyttBekreftelse(false)}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        open={visUtskrift}
        onClose={() => setVisUtskrift(false)}
        header={{ heading: 'Intervjufordeling – utskrift', closeButton: true }}
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
              WorkOp – intervjufordeling
            </Heading>
            <VStack gap='space-16'>
              {utskriftsfordelinger.map(({ arbeidsgiver, personTreffIder }) => {
                const headingId = `utskrift-intervjufordeling-${arbeidsgiver.arbeidsgiverTreffId}`;

                return (
                  <Box
                    as='section'
                    key={arbeidsgiver.arbeidsgiverTreffId}
                    aria-labelledby={headingId}
                    borderColor='neutral-subtle'
                    borderWidth='1'
                    borderRadius='8'
                    padding='space-16'
                    className='break-inside-avoid last:break-after-auto print:break-after-page'
                  >
                    <Heading id={headingId} level='2' size='medium' spacing>
                      {arbeidsgiver.navn}
                    </Heading>
                    <VStack
                      as='ol'
                      gap='space-4'
                      aria-label={`Intervjurekkefølge for ${arbeidsgiver.navn}`}
                      className='m-0 list-none p-0'
                    >
                      {personTreffIder.map((personTreffId) => (
                        <Box as='li' key={personTreffId}>
                          <BodyShort>
                            {navnPåJobbsøker(personTreffId)}
                          </BodyShort>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                );
              })}
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
            onClick={() => setVisUtskrift(false)}
          >
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </VStack>
  );
};

export default Intervjufordeling;
