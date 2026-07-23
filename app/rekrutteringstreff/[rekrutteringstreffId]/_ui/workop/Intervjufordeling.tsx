'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterIntervjufordeling } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøtedagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import {
  erSammeIntervjufordeling,
  finnPlasskonflikter,
  flyttPersonEttSteg,
  flyttPersonTilIndeks,
  flyttPersonTilRad,
  type Fordelingsseksjon,
  normaliserIntervjufordelinger,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/intervjufordelingHjelpere';
import { formaterNavn } from '@/app/rekrutteringstreff/_utils/formaterNavn';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DragVerticalIcon,
  ExclamationmarkTriangleIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  ExpansionCard,
  HStack,
  Heading,
  LocalAlert,
  Tooltip,
  VStack,
} from '@navikt/ds-react';
import { DragEvent, FC, useMemo, useRef, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  onMutate: () => Promise<unknown> | void;
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
  const [startfordelinger] = useState(() =>
    normaliserIntervjufordelinger({
      arbeidsgiverTreffIder: arbeidsgivereMedId.map(
        (arbeidsgiver) => arbeidsgiver.arbeidsgiverTreffId,
      ),
      personTreffIderIRekkefølge: jobbsøkere.map(
        (jobbsøker) => jobbsøker.personTreffId,
      ),
      ønsker: møtedag.ønsker,
      intervjufordelinger: møtedag.intervjufordelinger,
    }),
  );
  const fordelingerFraServer = useMemo(() => {
    const lagredeArbeidsgiverTreffIder = new Set(
      møtedag.intervjufordelinger.map(
        (fordeling) => fordeling.arbeidsgiverTreffId,
      ),
    );

    return normaliserIntervjufordelinger({
      arbeidsgiverTreffIder: arbeidsgivereMedId.map(
        (arbeidsgiver) => arbeidsgiver.arbeidsgiverTreffId,
      ),
      personTreffIderIRekkefølge: jobbsøkere.map(
        (jobbsøker) => jobbsøker.personTreffId,
      ),
      ønsker: møtedag.ønsker,
      intervjufordelinger: [
        ...møtedag.intervjufordelinger,
        ...startfordelinger.filter(
          (fordeling) =>
            !lagredeArbeidsgiverTreffIder.has(fordeling.arbeidsgiverTreffId),
        ),
      ],
    });
  }, [
    arbeidsgivereMedId,
    jobbsøkere,
    møtedag.intervjufordelinger,
    møtedag.ønsker,
    startfordelinger,
  ]);
  const [optimistiskeFordelinger, setOptimistiskeFordelinger] = useState<
    ArbeidsgiverIntervjufordelingDTO[] | null
  >(null);
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [kunngjøring, setKunngjøring] = useState('');
  const dragKildeRef = useRef<DragKilde | null>(null);
  const visDropMålFrameRef = useRef<number | null>(null);
  const [aktivDragKilde, setAktivDragKilde] = useState<DragKilde | null>(null);
  const [dropMål, setDropMål] = useState<DropMål | null>(null);

  const fordelinger = optimistiskeFordelinger ?? fordelingerFraServer;
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

  const navnPåJobbsøker = (personTreffId: string) => {
    const jobbsøker = jobbsøkerePerId.get(personTreffId);
    return jobbsøker
      ? formaterNavn(
          jobbsøker.etternavn,
          jobbsøker.fornavn,
          jobbsøker.personTreffId,
        )
      : 'Ukjent jobbsøker';
  };

  const lagreFordeling = async (
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    melding: string,
  ) => {
    setFeil(null);
    setLagrer(true);
    setOptimistiskeFordelinger(erstattFordeling(fordelinger, nyFordeling));
    try {
      await oppdaterIntervjufordeling(rekrutteringstreffId, nyFordeling);
      await onMutate();
      setKunngjøring(melding);
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

  const lagreStandardfordelingerOgGåVidere = async () => {
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
              : `Ikke med på speedintervju hos ${arbeidsgiver.navn}`
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
            const flytterOppOverSperre = !erInkludert && indeks === 0;
            const flytterNedUnderSperre =
              erInkludert && indeks === personTreffIder.length - 1;
            const oppEtikett = flytterOppOverSperre
              ? `Flytt ${navn} over sperrelinjen hos ${arbeidsgiver.navn}`
              : `Flytt ${navn} opp hos ${arbeidsgiver.navn}`;
            const nedEtikett = flytterNedUnderSperre
              ? `Flytt ${navn} under sperrelinjen hos ${arbeidsgiver.navn}`
              : `Flytt ${navn} ned hos ${arbeidsgiver.navn}`;

            return (
              <Box
                as='li'
                key={personTreffId}
                background={konflikt ? 'warning-soft' : 'neutral-soft'}
                borderColor={erDropMål ? 'accent' : 'neutral-subtle'}
                borderRadius='4'
                borderWidth={erDropMål ? '2' : '1'}
                padding='space-8'
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
                  gap='space-8'
                  align='center'
                  justify='space-between'
                  wrap
                >
                  <HStack gap='space-8' align='center'>
                    <span
                      draggable={!lagrer}
                      aria-hidden
                      className={
                        lagrer
                          ? 'cursor-not-allowed'
                          : 'cursor-grab active:cursor-grabbing'
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
                    <BodyShort weight='semibold'>{navn}</BodyShort>
                    {konflikt && (
                      <Tooltip content={konfliktTekst} describesChild>
                        <span
                          role='img'
                          aria-label='Plasskonflikt'
                          tabIndex={0}
                          className='inline-flex cursor-help rounded-sm text-(--ax-text-warning-subtle)'
                        >
                          <ExclamationmarkTriangleIcon aria-hidden />
                        </span>
                      </Tooltip>
                    )}
                  </HStack>

                  <HStack gap='space-4' align='center'>
                    <Button
                      type='button'
                      size='small'
                      variant='tertiary-neutral'
                      icon={<ArrowUpIcon aria-hidden />}
                      aria-label={oppEtikett}
                      title={oppEtikett}
                      disabled={lagrer || (erInkludert && indeks === 0)}
                      onClick={() =>
                        flyttOgLagre(
                          fordeling,
                          flyttPersonEttSteg(fordeling, personTreffId, 'opp'),
                          personTreffId,
                        )
                      }
                    />
                    <Button
                      type='button'
                      size='small'
                      variant='tertiary-neutral'
                      icon={<ArrowDownIcon aria-hidden />}
                      aria-label={nedEtikett}
                      title={nedEtikett}
                      disabled={
                        lagrer ||
                        (!erInkludert && indeks === personTreffIder.length - 1)
                      }
                      onClick={() =>
                        flyttOgLagre(
                          fordeling,
                          flyttPersonEttSteg(fordeling, personTreffId, 'ned'),
                          personTreffId,
                        )
                      }
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

  const harInkluderteIntervjuer = fordelinger.some(
    (fordeling) => fordeling.inkludertePersonTreffIder.length > 0,
  );
  const førsteArbeidsgiverMedØnsker = fordelinger.find(
    (fordeling) =>
      fordeling.inkludertePersonTreffIder.length > 0 ||
      fordeling.ekskludertePersonTreffIder.length > 0,
  )?.arbeidsgiverTreffId;

  return (
    <VStack gap='space-24'>
      <section
        aria-labelledby='workop-intervjufordeling-heading'
        aria-busy={lagrer}
      >
        <Heading
          id='workop-intervjufordeling-heading'
          level='3'
          size='small'
          spacing
        >
          Intervjufordeling
        </Heading>
        <BodyShort spacing>
          Dra jobbsøkerne for å endre intervjurekkefølgen, eller bruk pilene.
          Flytt de som ikke skal delta under sperrelinjen.
        </BodyShort>

        {møtedag.ønsker.length === 0 && (
          <LocalAlert status='announcement'>
            <LocalAlert.Content>
              Ingen intervjuønsker er registrert ennå.
            </LocalAlert.Content>
          </LocalAlert>
        )}

        <VStack gap='space-16'>
          {arbeidsgivereMedId.map((arbeidsgiver) => {
            const fordeling = fordelinger.find(
              (muligFordeling) =>
                muligFordeling.arbeidsgiverTreffId ===
                arbeidsgiver.arbeidsgiverTreffId,
            );
            if (!fordeling) return null;

            const headingId = `intervjufordeling-${arbeidsgiver.arbeidsgiverTreffId}`;
            return (
              <ExpansionCard
                key={arbeidsgiver.arbeidsgiverTreffId}
                aria-labelledby={headingId}
                defaultOpen={
                  arbeidsgiver.arbeidsgiverTreffId ===
                  førsteArbeidsgiverMedØnsker
                }
              >
                <ExpansionCard.Header>
                  <ExpansionCard.Title id={headingId} as='h4'>
                    {arbeidsgiver.navn}
                  </ExpansionCard.Title>
                  <ExpansionCard.Description>
                    {fordeling.inkludertePersonTreffIder.length} med ·{' '}
                    {fordeling.ekskludertePersonTreffIder.length} ikke med
                  </ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
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
                        Ikke med på speedintervju
                      </Heading>
                      {renderListe(fordeling, arbeidsgiver, 'ekskludert')}
                    </Box>
                  </VStack>
                </ExpansionCard.Content>
              </ExpansionCard>
            );
          })}
        </VStack>
      </section>

      <div className='sr-only' aria-live='polite' aria-atomic='true'>
        {kunngjøring}
      </div>

      {feil && (
        <LocalAlert status='error'>
          <LocalAlert.Content>{feil}</LocalAlert.Content>
        </LocalAlert>
      )}

      <HStack gap='space-8'>
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
          onClick={() => void lagreStandardfordelingerOgGåVidere()}
          disabled={!harInkluderteIntervjuer || lagrer}
          loading={lagrer}
        >
          Neste
        </Button>
      </HStack>
    </VStack>
  );
};

export default Intervjufordeling;
