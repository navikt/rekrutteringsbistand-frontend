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
import { zodResolver } from '@hookform/resolvers/zod';
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
import { FC, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkereData: JobbsøkereResponseDTO;
  onMutate: () => Promise<unknown> | void;
  onOppsettLagret: () => void;
}

const MøteoppsettFormSchema = z.object({
  starttidspunkt: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Oppgi et gyldig starttidspunkt.'),
  varighetPerMøteMinutter: z
    .number({ error: 'Oppgi varighet per møte.' })
    .int({ error: 'Varigheten må være et helt antall minutter.' })
    .min(1, { error: 'Varigheten må være minst 1 minutt.' }),
  pauseMellomMøterMinutter: z
    .number({ error: 'Oppgi pause mellom møtene.' })
    .int({ error: 'Pausen må være et helt antall minutter.' })
    .min(0, { error: 'Pausen kan ikke være negativ.' }),
  antallRom: z
    .number({ error: 'Oppgi antall rom.' })
    .int({ error: 'Antall rom må være et helt tall.' })
    .min(1, { error: 'Det må være minst 1 rom.' }),
});

type MøteoppsettFormValues = z.infer<typeof MøteoppsettFormSchema>;

const tilMøteoppsettFormValues = (
  møtedag: MøtedagDTO,
): MøteoppsettFormValues => ({
  starttidspunkt: møtedag.starttidspunkt,
  varighetPerMøteMinutter: møtedag.varighetPerMøteMinutter,
  pauseMellomMøterMinutter: møtedag.pauseMellomMøterMinutter,
  antallRom: møtedag.antallRom,
});

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

  const {
    control,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<MøteoppsettFormValues>({
    resolver: zodResolver(MøteoppsettFormSchema),
    defaultValues: tilMøteoppsettFormValues(møtedag),
  });
  const antallRom = useWatch({ control, name: 'antallRom' });
  const [feil, setFeil] = useState<string | null>(null);
  const [fjernetOppmøteId, setFjernetOppmøteId] = useState<string | null>(null);

  useEffect(() => {
    if (isDirty) return;
    reset({
      starttidspunkt: møtedag.starttidspunkt,
      varighetPerMøteMinutter: møtedag.varighetPerMøteMinutter,
      pauseMellomMøterMinutter: møtedag.pauseMellomMøterMinutter,
      antallRom: møtedag.antallRom,
    });
  }, [
    isDirty,
    møtedag.antallRom,
    møtedag.pauseMellomMøterMinutter,
    møtedag.starttidspunkt,
    møtedag.varighetPerMøteMinutter,
    reset,
  ]);

  const færreRomEnnArbeidsgivere =
    Number.isFinite(antallRom) &&
    antallRom > 0 &&
    antallRom < arbeidsgivere.length;

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

  const settOpp = async (verdier: MøteoppsettFormValues) => {
    setFeil(null);

    try {
      const oppdatertMøtedag = await settOppMøteplan(
        rekrutteringstreffId,
        verdier,
      );
      reset(tilMøteoppsettFormValues(oppdatertMøtedag));
      await onMutate();
      onOppsettLagret();
    } catch {
      setFeil('Kunne ikke sette opp møteplanen. Prøv igjen.');
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
            <Box
              background='neutral-soft'
              borderRadius='8'
              padding='space-8'
              className='max-h-72 overflow-y-auto'
              role='region'
              aria-label='Fremmøtte jobbsøkere'
              tabIndex={0}
            >
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
            Arbeidsgivere
          </Heading>
          <BodyShort spacing>
            {arbeidsgivere.length}{' '}
            {arbeidsgivere.length === 1
              ? 'arbeidsgiver deltar'
              : 'arbeidsgivere deltar'}
          </BodyShort>
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
        <form onSubmit={handleSubmit(settOpp)} noValidate>
          <VStack gap='space-16'>
            <HGrid gap='space-16' columns={{ xs: 1, sm: 2, lg: 4 }}>
              <TextField
                label='Starttidspunkt'
                type='time'
                error={errors.starttidspunkt?.message}
                {...register('starttidspunkt')}
              />
              <TextField
                label='Varighet per møte (min)'
                type='number'
                min={1}
                step={1}
                inputMode='numeric'
                error={errors.varighetPerMøteMinutter?.message}
                {...register('varighetPerMøteMinutter', {
                  valueAsNumber: true,
                })}
              />
              <TextField
                label='Pause mellom møter (min)'
                type='number'
                min={0}
                step={1}
                inputMode='numeric'
                error={errors.pauseMellomMøterMinutter?.message}
                {...register('pauseMellomMøterMinutter', {
                  valueAsNumber: true,
                })}
              />
              <TextField
                label='Antall rom'
                type='number'
                min={1}
                step={1}
                inputMode='numeric'
                error={errors.antallRom?.message}
                {...register('antallRom', { valueAsNumber: true })}
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
                loading={isSubmitting}
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
