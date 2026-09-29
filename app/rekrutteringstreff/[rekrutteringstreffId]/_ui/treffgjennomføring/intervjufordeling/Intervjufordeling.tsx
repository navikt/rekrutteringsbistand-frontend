'use client';

import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import BekreftFordelPåNyttDialog from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/BekreftFordelPåNyttDialog';
import Feilvarsel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/Feilvarsel';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/StegHeader';
import { harArbeidsgiverTreffId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/arbeidsgivere';
import { lagJobbsøkeroppslag } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import {
  type StegBasisProps,
  type StegLagringProps,
  type StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useFokusEtterLagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useFokusEtterLagring';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import IntervjufordelingKort from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/IntervjufordelingKort';
import IntervjufordelingUtskrift from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/IntervjufordelingUtskrift';
import { lagIntervjufordelingsvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/intervjufordelingsvisning';
import {
  erSammeIntervjufordeling,
  fordelingerForArbeidsgivere,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/intervjurekkefølge';
import { useIntervjufordelingDragOgSlipp } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/useIntervjufordelingDragOgSlipp';
import { useIntervjufordelingLagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/useIntervjufordelingLagring';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import { ArrowsCirclepathIcon, PrinterSmallIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, HStack, LocalAlert, VStack } from '@navikt/ds-react';
import { FC, useMemo, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    jobbsøkere: JobbsøkerDTO[];
  };

const Intervjufordeling: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkere,
  oppdatering,
  onLagringsstatusEndret,
  onTilbake,
  onNeste,
}) => {
  const arbeidsgivereMedId = useMemo(
    () => arbeidsgivere.filter(harArbeidsgiverTreffId),
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
  const {
    fordelinger,
    lagrer,
    feil,
    statusmelding,
    lagreFordeling,
    fordelPåNytt,
  } = useIntervjufordelingLagring({
    rekrutteringstreffId,
    fordelingerFraServer,
    oppdatering,
  });
  const [visUtskrift, setVisUtskrift] = useState(false);
  const [visFordelPåNyttBekreftelse, setVisFordelPåNyttBekreftelse] =
    useState(false);

  useRapporterLagringsstatus(lagrer, onLagringsstatusEndret);

  const huskFokus = useFokusEtterLagring(
    'data-flyttknapp',
    lagrer,
    fordelinger,
  );

  const { navnPåJobbsøker, initialerPåJobbsøker } = useMemo(
    () => lagJobbsøkeroppslag(jobbsøkere, treffgjennomføring),
    [jobbsøkere, treffgjennomføring],
  );
  const { kort, utskriftsfordelinger, konfliktTekst, navnPåArbeidsgiver } =
    useMemo(
      () => lagIntervjufordelingsvisning(arbeidsgivereMedId, fordelinger),
      [arbeidsgivereMedId, fordelinger],
    );

  const flyttOgLagre = (
    fordeling: ArbeidsgiverIntervjufordelingDTO,
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    personTreffId: string,
  ) => {
    if (erSammeIntervjufordeling(fordeling, nyFordeling)) return;

    const arbeidsgivernavn = navnPåArbeidsgiver(fordeling.arbeidsgiverTreffId);
    const inkludertIndeks =
      nyFordeling.inkludertePersonTreffIder.indexOf(personTreffId);
    const melding =
      inkludertIndeks >= 0
        ? `${navnPåJobbsøker(personTreffId)} er flyttet til plass ${inkludertIndeks + 1} hos ${arbeidsgivernavn}.`
        : `${navnPåJobbsøker(personTreffId)} er flyttet under sperrelinjen hos ${arbeidsgivernavn}.`;
    void lagreFordeling(nyFordeling, melding);
  };

  const drag = useIntervjufordelingDragOgSlipp(flyttOgLagre);

  const harInkluderteIntervjuer = utskriftsfordelinger.length > 0;

  return (
    <VStack gap='space-24'>
      <Stegnavigasjon
        tilbake={{ onClick: onTilbake, deaktivert: lagrer }}
        neste={{
          onClick: onNeste,
          deaktivert: !harInkluderteIntervjuer || lagrer,
          laster: lagrer,
        }}
      />

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

          <div className='grid grid-cols-[repeat(auto-fit,minmax(min(21rem,100%),1fr))] items-start gap-4'>
            {kort.map(({ arbeidsgiver, fordeling }) => (
              <IntervjufordelingKort
                key={arbeidsgiver.arbeidsgiverTreffId}
                fordeling={fordeling}
                arbeidsgiver={arbeidsgiver}
                lagrer={lagrer}
                drag={drag}
                navnPåJobbsøker={navnPåJobbsøker}
                konfliktTekst={konfliktTekst}
                onFlytt={(nyFordeling, personTreffId, fokuserKnappId) => {
                  huskFokus(fokuserKnappId);
                  flyttOgLagre(fordeling, nyFordeling, personTreffId);
                }}
              />
            ))}
          </div>
        </VStack>
      </section>

      {feil && <Feilvarsel>{feil}</Feilvarsel>}

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

      <BekreftFordelPåNyttDialog
        åpen={visFordelPåNyttBekreftelse}
        tittel='Fordele intervjuene på nytt?'
        width='small'
        lagrer={lagrer}
        onBekreft={() => {
          setVisFordelPåNyttBekreftelse(false);
          void fordelPåNytt();
        }}
        onAvbryt={() => setVisFordelPåNyttBekreftelse(false)}
      >
        <BodyLong spacing>
          Rekkefølgen regnes ut på nytt for alle arbeidsgivere. Flyttinger du
          har gjort manuelt blir overskrevet.
        </BodyLong>
        <BodyLong>
          Jobbsøkere du har flyttet under sperrelinjen blir stående der.
        </BodyLong>
      </BekreftFordelPåNyttDialog>

      <IntervjufordelingUtskrift
        åpen={visUtskrift}
        fordelinger={utskriftsfordelinger}
        initialerPåJobbsøker={initialerPåJobbsøker}
        onLukk={() => setVisUtskrift(false)}
      />
    </VStack>
  );
};

export default Intervjufordeling;
