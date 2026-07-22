'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  oppdaterOppmøte,
  settOppMøteplan,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { formaterNavn } from '@/app/rekrutteringstreff/_utils/formaterNavn';
import {
  BodyShort,
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
  LocalAlert,
  TextField,
  VStack,
} from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import { FC, SyntheticEvent, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  onMutate: () => Promise<unknown> | void;
  onOppsettLagret: () => void;
}

const OppmøteOgOppsett: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  onMutate,
  onOppsettLagret,
}) => {
  const { data: jobbsøkereData } = useJobbsøkere(rekrutteringstreffId);
  const [, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });

  const oppmøtteJobbsøkere = (jobbsøkereData?.jobbsøkere ?? []).filter((j) =>
    møtedag.oppmøte.includes(j.personTreffId),
  );
  const antallMøtt = møtedag.oppmøte.length;
  const antallPåmeldte = jobbsøkereData?.totalt ?? 0;

  const [starttidspunkt, setStarttidspunkt] = useState(møtedag.starttidspunkt);
  const [varighet, setVarighet] = useState(
    String(møtedag.varighetPerMøteMinutter),
  );
  const [pause, setPause] = useState(String(møtedag.pauseMellomMøterMinutter));
  const [antallRom, setAntallRom] = useState(String(møtedag.antallRom));

  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [fjernetOppmøteId, setFjernetOppmøteId] = useState<string | null>(null);

  const antallRomTall = Number(antallRom);
  const færreRomEnnArbeidsgivere =
    Number.isFinite(antallRomTall) &&
    antallRomTall > 0 &&
    antallRomTall < arbeidsgivere.length;

  const fjernOppmøte = async (personTreffId: string) => {
    setFjernetOppmøteId(personTreffId);
    try {
      await oppdaterOppmøte(rekrutteringstreffId, personTreffId, false);
      await onMutate();
    } finally {
      setFjernetOppmøteId(null);
    }
  };

  const settOpp = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLagrer(true);
    setFeil(null);
    try {
      await settOppMøteplan(rekrutteringstreffId, {
        antallRom: antallRomTall,
        starttidspunkt,
        varighetPerMøteMinutter: Number(varighet),
        pauseMellomMøterMinutter: Number(pause),
      });
      await onMutate();
      onOppsettLagret();
    } catch {
      setFeil('Kunne ikke sette opp møteplanen. Prøv igjen.');
    } finally {
      setLagrer(false);
    }
  };

  return (
    <HStack gap='space-4' justify='space-between'>
      <section className='w-1/2'>
        <Heading level='3' size='small' spacing>
          Oppmøte
        </Heading>
        <BodyShort spacing>
          {antallMøtt} møtt av {antallPåmeldte} påmeldte
        </BodyShort>

        {antallMøtt === 0 ? (
          <LocalAlert status='announcement'>
            <LocalAlert.Header>
              <LocalAlert.Title as='h4'>
                Ingen er registrert som møtt ennå
              </LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>
              <VStack gap='space-8' align='start'>
                <span>
                  Oppmøte registreres fra menyen på jobbsøkerkortet i
                  Jobbsøker-fanen.
                </span>
                <Button
                  type='button'
                  variant='secondary'
                  size='small'
                  onClick={() => setFane(RekrutteringstreffTabs.JOBBSØKERE)}
                >
                  Gå til jobbsøkere
                </Button>
              </VStack>
            </LocalAlert.Content>
          </LocalAlert>
        ) : (
          <Box
            background='neutral-soft'
            borderRadius='8'
            padding='space-8'
            as='ul'
          >
            <VStack gap='space-4'>
              {oppmøtteJobbsøkere.map((j) => (
                <Box
                  key={j.personTreffId}
                  background={'neutral-softA'}
                  padding={'space-6'}
                  borderRadius='8'
                  className={'flex justify-between'}
                >
                  <div>
                    <BodyShort weight='semibold'>
                      {formaterNavn(j.etternavn, j.fornavn, j.personTreffId)}
                    </BodyShort>
                    <BodyShort size='small' className='text-text-subtle'>
                      f.nr. {j.fødselsnummer}
                    </BodyShort>
                  </div>
                  <Button
                    type='button'
                    variant='tertiary'
                    size='small'
                    loading={fjernetOppmøteId === j.personTreffId}
                    onClick={() => void fjernOppmøte(j.personTreffId)}
                  >
                    Fjern oppmøte
                  </Button>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </section>

      <section className='w-5/12'>
        <Heading level='3' size='small' spacing>
          Arbeidsgivere ({arbeidsgivere.length})
        </Heading>
        {arbeidsgivere.length > 0 && (
          <Box
            background='neutral-soft'
            borderRadius='8'
            padding='space-8'
            as='ul'
          >
            <VStack gap='space-4'>
              {arbeidsgivere.map((arbeidsgiver) => (
                <Box
                  key={
                    arbeidsgiver.arbeidsgiverTreffId ??
                    arbeidsgiver.organisasjonsnummer
                  }
                  background={'neutral-softA'}
                  padding={'space-6'}
                  borderRadius='8'
                >
                  <BodyShort weight='semibold'>{arbeidsgiver.navn}</BodyShort>
                  <BodyShort size='small' className='text-text-subtle'>
                    org.nr. {arbeidsgiver.organisasjonsnummer}
                  </BodyShort>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </section>

      <section>
        <Heading level='3' size='small' spacing>
          Møteoppsett
        </Heading>
        <form onSubmit={settOpp}>
          <VStack gap='space-16'>
            <HGrid gap='space-16' columns={{ xs: 1, sm: 2, lg: 4 }}>
              <TextField
                label='Starttidspunkt'
                type='time'
                value={starttidspunkt}
                onChange={(e) => setStarttidspunkt(e.target.value)}
              />
              <TextField
                label='Varighet per møte (min)'
                type='number'
                min={1}
                inputMode='numeric'
                value={varighet}
                onChange={(e) => setVarighet(e.target.value)}
              />
              <TextField
                label='Pause mellom møter (min)'
                type='number'
                min={0}
                inputMode='numeric'
                value={pause}
                onChange={(e) => setPause(e.target.value)}
              />
              <TextField
                label='Antall rom'
                type='number'
                min={1}
                inputMode='numeric'
                value={antallRom}
                onChange={(e) => setAntallRom(e.target.value)}
              />
            </HGrid>

            {færreRomEnnArbeidsgivere && (
              <LocalAlert status='announcement'>
                <LocalAlert.Content>
                  Færre rom enn arbeidsgivere – noen arbeidsgivere venter mellom
                  rundene og roterer inn senere.
                </LocalAlert.Content>
              </LocalAlert>
            )}

            {feil && (
              <LocalAlert status='error'>
                <LocalAlert.Content>{feil}</LocalAlert.Content>
              </LocalAlert>
            )}

            <HStack justify='end'>
              <Button type='submit' loading={lagrer}>
                Sett opp møteplan
              </Button>
            </HStack>
          </VStack>
        </form>
      </section>
    </HStack>
  );
};

export default OppmøteOgOppsett;
