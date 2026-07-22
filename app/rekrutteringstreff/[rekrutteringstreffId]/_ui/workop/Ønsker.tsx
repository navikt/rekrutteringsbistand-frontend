'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterØnske } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
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

const WorkOpØnsker: FC<Props> = ({
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
  const harØnske = (personTreffId: string, arbeidsgiverTreffId: string) =>
    møtedag.ønsker.some(
      (ønske) =>
        ønske.personTreffId === personTreffId &&
        ønske.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
  const antallØnsker = (personTreffId: string) =>
    møtedag.ønsker.filter((ønske) => ønske.personTreffId === personTreffId)
      .length;

  const settØnske = async (
    personTreffId: string,
    arbeidsgiverTreffId: string,
    ønsket: boolean,
  ) => {
    const nøkkel = parNøkkel(personTreffId, arbeidsgiverTreffId);
    setFeil(null);
    setLagrerPar(nøkkel);
    try {
      await oppdaterØnske(
        rekrutteringstreffId,
        { personTreffId, arbeidsgiverTreffId },
        ønsket,
      );
      await onMutate();
    } catch {
      setFeil('Kunne ikke lagre ønsket. Prøv igjen.');
    } finally {
      setLagrerPar(null);
    }
  };

  return (
    <VStack gap='space-24'>
      <section aria-labelledby='workop-onsker-heading'>
        <Heading id='workop-onsker-heading' level='3' size='small' spacing>
          Ønsker
        </Heading>
        <BodyShort spacing>
          Registrer hvilke arbeidsgivere de fremmøtte jobbsøkerne ønsker å møte.
        </BodyShort>

        {jobbsøkere.length === 0 ? (
          <LocalAlert status='announcement'>
            <LocalAlert.Content>
              Ingen jobbsøkere er registrert som møtt.
            </LocalAlert.Content>
          </LocalAlert>
        ) : (
          <Intervjumatrise
            caption='Jobbsøkernes ønsker om speedintervju med arbeidsgivere'
            idPrefiks='workop-onsker'
            arbeidsgivere={arbeidsgivere}
            jobbsøkere={jobbsøkere}
            antallForJobbsøker={antallØnsker}
            renderCelle={({
              personTreffId,
              arbeidsgiverTreffId,
              ariaLabelledBy,
            }) => {
              const nøkkel = parNøkkel(personTreffId, arbeidsgiverTreffId);
              return (
                <Checkbox
                  hideLabel
                  checked={harØnske(personTreffId, arbeidsgiverTreffId)}
                  disabled={lagrerPar !== null}
                  aria-labelledby={ariaLabelledBy}
                  onChange={(event) =>
                    void settØnske(
                      personTreffId,
                      arbeidsgiverTreffId,
                      event.target.checked,
                    )
                  }
                >
                  {lagrerPar === nøkkel ? 'Lagrer ønske' : 'Ønsker intervju'}
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
          disabled={møtedag.ønsker.length === 0}
        >
          Neste
        </Button>
      </HStack>
    </VStack>
  );
};

export default WorkOpØnsker;
