'use client';

import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  fordelIntervjuer,
  oppdaterIntervjufordeling,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type {
  ArbeidsgiverIntervjufordelingDTO,
  TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import IntervjufordelingListe from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/IntervjufordelingListe';
import IntervjufordelingUtskrift from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/IntervjufordelingUtskrift';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/StegHeader';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Stegnavigasjon';
import {
  erSammeIntervjufordeling,
  finnPlasskonflikter,
  fordelingerForArbeidsgivere,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordelingHjelpere';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import {
  medArbeidsgiverTreffId,
  type StegBasisProps,
  type StegLagringProps,
  type StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringStegProps';
import { useIntervjufordelingDragOgSlipp } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useIntervjufordelingDragOgSlipp';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useRapporterLagringsstatus';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { ArrowsCirclepathIcon, PrinterSmallIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  Button,
  ExpansionCard,
  HStack,
  Heading,
  LocalAlert,
  Modal,
  VStack,
} from '@navikt/ds-react';
import { Box } from '@navikt/ds-react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    jobbsøkere: JobbsøkerDTO[];
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
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkere,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const arbeidsgivereMedId = useMemo(
    () => arbeidsgivere.filter(medArbeidsgiverTreffId),
    [arbeidsgivere],
  );

  const fordelingerFraServer = useMemo(
    () =>
      fordelingerForArbeidsgivere(
        arbeidsgivereMedId.map(
          (arbeidsgiver) => arbeidsgiver.arbeidsgiverTreffId,
        ),
        treffgjennomføring.intervjufordelinger,
      ),
    [arbeidsgivereMedId, treffgjennomføring.intervjufordelinger],
  );
  const [optimistiskeFordelinger, setOptimistiskeFordelinger] = useState<
    ArbeidsgiverIntervjufordelingDTO[] | null
  >(null);
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [statusmelding, setStatusmelding] = useState('');
  const fokusEtterFlyttingRef = useRef<string | null>(null);
  const [visUtskrift, setVisUtskrift] = useState(false);
  const [visFordelPåNyttBekreftelse, setVisFordelPåNyttBekreftelse] =
    useState(false);

  const fordelinger = optimistiskeFordelinger ?? fordelingerFraServer;

  useRapporterLagringsstatus(lagrer, onLagringsstatusEndret);

  // Flytteknappene forsvinner og gjenskapes når listen lagres, så fokus må settes på nytt.
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

  const visNavn = lagNavnvisning(treffgjennomføring);
  const navnPåJobbsøker = (personTreffId: string) => {
    const jobbsøker = jobbsøkerePerId.get(personTreffId);
    return jobbsøker
      ? visNavn(jobbsøker, jobbsøker.personTreffId)
      : 'Ukjent jobbsøker';
  };

  const konfliktTekst = (
    personTreffId: string,
    arbeidsgiverTreffId: string,
  ) => {
    const konflikt = konflikter.find(
      (muligKonflikt) =>
        muligKonflikt.personTreffId === personTreffId &&
        muligKonflikt.arbeidsgiverTreffIder.includes(arbeidsgiverTreffId),
    );
    if (!konflikt) return null;

    const andreArbeidsgivere = konflikt.arbeidsgiverTreffIder
      .filter((annenId) => annenId !== arbeidsgiverTreffId)
      .map(
        (annenId) =>
          arbeidsgiverePerId.get(annenId)?.navn ?? 'en annen arbeidsgiver',
      )
      .join(', ');
    return `Plass ${konflikt.plass} også hos ${andreArbeidsgivere}`;
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
      const oppdatert = await oppdaterIntervjufordeling(
        rekrutteringstreffId,
        nyFordeling,
      );
      await onTreffgjennomføringOppdatert(oppdatert);
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

  const drag = useIntervjufordelingDragOgSlipp(flyttOgLagre);

  const lagreUlagredeEndringerOgGåVidere = async () => {
    const ulagredeFordelinger = fordelinger.filter((fordeling) => {
      if (
        fordeling.inkludertePersonTreffIder.length === 0 &&
        fordeling.ekskludertePersonTreffIder.length === 0
      ) {
        return false;
      }
      const lagret = treffgjennomføring.intervjufordelinger.find(
        (eksisterendeFordeling) =>
          eksisterendeFordeling.arbeidsgiverTreffId ===
          fordeling.arbeidsgiverTreffId,
      );
      return !lagret || !erSammeIntervjufordeling(fordeling, lagret);
    });

    setFeil(null);
    setLagrer(true);
    try {
      let sistLagret: TreffgjennomføringDTO | undefined;
      for (const fordeling of ulagredeFordelinger) {
        sistLagret = await oppdaterIntervjufordeling(
          rekrutteringstreffId,
          fordeling,
        );
      }
      if (sistLagret) {
        await onTreffgjennomføringOppdatert(sistLagret);
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

  const fordelPåNytt = async () => {
    setVisFordelPåNyttBekreftelse(false);
    setFeil(null);
    setLagrer(true);
    try {
      await onTreffgjennomføringOppdatert(
        await fordelIntervjuer(rekrutteringstreffId),
      );
      setStatusmelding('Intervjuene er fordelt på nytt.');
    } catch {
      setFeil('Kunne ikke fordele på nytt. Prøv igjen.');
    } finally {
      setLagrer(false);
    }
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
            beskrivelse='Fordeling av jobbsøkerne basert på deres ønsker.   Dra jobbsøkerne for å endre intervjurekkefølgen, eller bruk pilene. Flytt de som ikke skal delta under sperrelinjen.'
            lagrer={lagrer}
            feil={feil !== null}
            statusmelding={statusmelding}
          />

          {treffgjennomføring.interesser.length === 0 && (
            <LocalAlert as='div' status='announcement'>
              <LocalAlert.Content>
                Ingen interesser er registrert ennå.
              </LocalAlert.Content>
            </LocalAlert>
          )}

          <div className='grid grid-cols-[repeat(auto-fit,minmax(21rem,1fr))] items-start gap-4'>
            {arbeidsgivereMedId.map((arbeidsgiver) => {
              const fordeling = fordelingPerArbeidsgiverId.get(
                arbeidsgiver.arbeidsgiverTreffId,
              );
              if (!fordeling) return null;

              const headingId = `intervjufordeling-${arbeidsgiver.arbeidsgiverTreffId}`;
              const antallJobbsøkere =
                fordeling.inkludertePersonTreffIder.length +
                fordeling.ekskludertePersonTreffIder.length;
              const listeprops = {
                fordeling,
                arbeidsgiver,
                lagrer,
                drag,
                navnPåJobbsøker,
                konfliktTekst,
                onFlytt: (
                  nyFordeling: ArbeidsgiverIntervjufordelingDTO,
                  personTreffId: string,
                  fokuserKnappId: string,
                ) => {
                  fokusEtterFlyttingRef.current = fokuserKnappId;
                  flyttOgLagre(fordeling, nyFordeling, personTreffId);
                },
              };

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
                        <IntervjufordelingListe
                          {...listeprops}
                          seksjon='inkludert'
                        />
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
                        <IntervjufordelingListe
                          {...listeprops}
                          seksjon='ekskludert'
                        />
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

      <IntervjufordelingUtskrift
        åpen={visUtskrift}
        fordelinger={utskriftsfordelinger}
        navnPåJobbsøker={navnPåJobbsøker}
        onLukk={() => setVisUtskrift(false)}
      />
    </VStack>
  );
};

export default Intervjufordeling;
