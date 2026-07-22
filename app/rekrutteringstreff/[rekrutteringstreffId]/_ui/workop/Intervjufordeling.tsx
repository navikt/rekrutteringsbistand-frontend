'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterTildeling } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import Intervjumatrise from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/Intervjumatrise';
import {
  BodyShort,
  Button,
  Checkbox,
  HStack,
  Heading,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { FC, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkere: JobbsøkerDTO[];
  onMutate: () => Promise<unknown> | void;
  onTilbake: () => void;
  onNeste: () => void;
}

const parNøkkel = (personTreffId: string, arbeidsgiverTreffId: string) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const Intervjufordeling: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkere,
  onMutate,
  onTilbake,
  onNeste,
}) => {
  const [lagrerPar, setLagrerPar] = useState<string | null>(null);
  const [feil, setFeil] = useState<string | null>(null);
  const harPar = (
    par: { personTreffId: string; arbeidsgiverTreffId: string }[],
    personTreffId: string,
    arbeidsgiverTreffId: string,
  ) =>
    par.some(
      (intervjupar) =>
        intervjupar.personTreffId === personTreffId &&
        intervjupar.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
  const antallForJobbsøker = (personTreffId: string) =>
    møtedag.tildelinger.filter(
      (tildeling) => tildeling.personTreffId === personTreffId,
    ).length;
  const antallForArbeidsgiver = (arbeidsgiverTreffId: string) =>
    møtedag.tildelinger.filter(
      (tildeling) => tildeling.arbeidsgiverTreffId === arbeidsgiverTreffId,
    ).length;

  const settTildeling = async (
    personTreffId: string,
    arbeidsgiverTreffId: string,
    tildelt: boolean,
  ) => {
    setFeil(null);
    setLagrerPar(parNøkkel(personTreffId, arbeidsgiverTreffId));
    try {
      await oppdaterTildeling(
        rekrutteringstreffId,
        { personTreffId, arbeidsgiverTreffId },
        tildelt,
      );
      await onMutate();
    } catch {
      setFeil('Kunne ikke lagre intervjutildelingen. Prøv igjen.');
    } finally {
      setLagrerPar(null);
    }
  };

  return (
    <VStack gap='space-24'>
      <section aria-labelledby='workop-intervjufordeling-heading'>
        <Heading
          id='workop-intervjufordeling-heading'
          level='3'
          size='small'
          spacing
        >
          Intervjufordeling
        </Heading>
        <BodyShort spacing>
          Fordel speedintervjuer blant kombinasjonene jobbsøkerne har ønsket.
        </BodyShort>

        {møtedag.ønsker.length === 0 ? (
          <LocalAlert status='announcement'>
            <LocalAlert.Content>
              Ingen intervjuønsker er registrert ennå.
            </LocalAlert.Content>
          </LocalAlert>
        ) : (
          <Intervjumatrise
            caption='Faktisk fordeling av speedintervjuer mellom jobbsøkere og arbeidsgivere'
            idPrefiks='workop-tildelinger'
            arbeidsgivere={arbeidsgivere}
            jobbsøkere={jobbsøkere}
            antallForJobbsøker={antallForJobbsøker}
            antallForArbeidsgiver={antallForArbeidsgiver}
            renderCelle={({
              personTreffId,
              arbeidsgiverTreffId,
              ariaLabelledBy,
            }) => {
              const ønsket = harPar(
                møtedag.ønsker,
                personTreffId,
                arbeidsgiverTreffId,
              );
              if (!ønsket) {
                return (
                  <BodyShort size='small' className='text-text-subtle'>
                    Ikke ønsket
                  </BodyShort>
                );
              }

              return (
                <Checkbox
                  hideLabel
                  checked={harPar(
                    møtedag.tildelinger,
                    personTreffId,
                    arbeidsgiverTreffId,
                  )}
                  disabled={lagrerPar !== null}
                  aria-labelledby={ariaLabelledBy}
                  onChange={(event) =>
                    void settTildeling(
                      personTreffId,
                      arbeidsgiverTreffId,
                      event.target.checked,
                    )
                  }
                >
                  Tildel intervju
                </Checkbox>
              );
            }}
          />
        )}
      </section>

      {feil && (
        <LocalAlert status='error'>
          <LocalAlert.Content>{feil}</LocalAlert.Content>
        </LocalAlert>
      )}

      <HStack gap='space-8'>
        <Button type='button' variant='secondary' onClick={onTilbake}>
          Tilbake
        </Button>
        <Button
          type='button'
          onClick={onNeste}
          disabled={møtedag.tildelinger.length === 0}
        >
          Neste
        </Button>
      </HStack>
    </VStack>
  );
};

export default Intervjufordeling;
