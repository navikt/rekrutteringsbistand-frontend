'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
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
  jobbsøkereData: JobbsøkereResponseDTO;
  onMutate: () => Promise<unknown> | void;
  onOppsettLagret: () => void;
}

const OppmøteOgOppsett: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkereData,
  onMutate,
  onOppsettLagret,
}) => {
  const [, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });

  const oppmøtteJobbsøkere = jobbsøkereData.jobbsøkere.filter((jobbsøker) =>
    møtedag.oppmøte.includes(jobbsøker.personTreffId),
  );
  const antallMøtt = møtedag.oppmøte.length;
  const antallPåmeldte = jobbsøkereData.totalt;

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
    setFeil(null);
    setFjernetOppmøteId(personTreffId);
    try {
      await oppdaterOppmøte(rekrutteringstreffId, personTreffId, false);
      await onMutate();
    } catch {
      setFeil('Kunne ikke fjerne oppmøtet. Prøv igjen.');
    } finally {
      setFjernetOppmøteId(null);
    }
  };

  const settOpp = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeil(null);

    const varighetTall = Number(varighet);
    const pauseTall = Number(pause);
    const gyldigStarttidspunkt = /^([01]\d|2[0-3]):[0-5]\d$/.test(
      starttidspunkt,
    );
    const gyldigOppsett =
      gyldigStarttidspunkt &&
      Number.isInteger(antallRomTall) &&
      antallRomTall >= 1 &&
      Number.isInteger(varighetTall) &&
      varighetTall >= 1 &&
      Number.isInteger(pauseTall) &&
      pauseTall >= 0;

    if (!gyldigOppsett) {
      setFeil('Kontroller starttidspunkt, varighet, pause og antall rom.');
      return;
    }

    setLagrer(true);
    try {
      await settOppMøteplan(rekrutteringstreffId, {
        antallRom: antallRomTall,
        starttidspunkt,
        varighetPerMøteMinutter: varighetTall,
        pauseMellomMøterMinutter: pauseTall,
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
    <VStack gap='space-32'>
      <HGrid columns={{ xs: 1, lg: 2 }} gap='space-24'>
        <section aria-labelledby='workop-oppmøte-heading'>
          <Heading id='workop-oppmøte-heading' level='3' size='small' spacing>
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
            <Box background='neutral-soft' borderRadius='8' padding='space-8'>
              <VStack as='ul' gap='space-4'>
                {oppmøtteJobbsøkere.map((jobbsøker) => (
                  <Box
                    as='li'
                    key={jobbsøker.personTreffId}
                    background='neutral-softA'
                    padding='space-6'
                    borderRadius='8'
                    className='flex justify-between gap-2'
                  >
                    <div>
                      <BodyShort weight='semibold'>
                        {formaterNavn(
                          jobbsøker.etternavn,
                          jobbsøker.fornavn,
                          jobbsøker.personTreffId,
                        )}
                      </BodyShort>
                      <BodyShort size='small' className='text-text-subtle'>
                        f.nr. {jobbsøker.fødselsnummer}
                      </BodyShort>
                    </div>
                    <Button
                      type='button'
                      variant='tertiary'
                      size='small'
                      loading={fjernetOppmøteId === jobbsøker.personTreffId}
                      disabled={fjernetOppmøteId !== null}
                      onClick={() => void fjernOppmøte(jobbsøker.personTreffId)}
                    >
                      Fjern oppmøte
                    </Button>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
        </section>

        <section aria-labelledby='workop-arbeidsgivere-heading'>
          <Heading
            id='workop-arbeidsgivere-heading'
            level='3'
            size='small'
            spacing
          >
            Arbeidsgivere ({arbeidsgivere.length})
          </Heading>
          {arbeidsgivere.length > 0 && (
            <Box background='neutral-soft' borderRadius='8' padding='space-8'>
              <VStack as='ul' gap='space-4'>
                {arbeidsgivere.map((arbeidsgiver) => (
                  <Box
                    as='li'
                    key={
                      arbeidsgiver.arbeidsgiverTreffId ??
                      arbeidsgiver.organisasjonsnummer
                    }
                    background='neutral-softA'
                    padding='space-6'
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
      </HGrid>

      <section aria-labelledby='workop-møteoppsett-heading'>
        <Heading id='workop-møteoppsett-heading' level='3' size='small' spacing>
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
                step={1}
                inputMode='numeric'
                value={varighet}
                onChange={(e) => setVarighet(e.target.value)}
              />
              <TextField
                label='Pause mellom møter (min)'
                type='number'
                min={0}
                step={1}
                inputMode='numeric'
                value={pause}
                onChange={(e) => setPause(e.target.value)}
              />
              <TextField
                label='Antall rom'
                type='number'
                min={1}
                step={1}
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
              <Button
                type='submit'
                loading={lagrer}
                disabled={antallMøtt === 0 || arbeidsgivere.length === 0}
              >
                Sett opp møteplan
              </Button>
            </HStack>
          </VStack>
        </form>
      </section>
    </VStack>
  );
};

export default OppmøteOgOppsett;
