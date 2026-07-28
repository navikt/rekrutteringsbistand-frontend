'use client';

import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  oppdaterOppmøte,
  settOppMøteplan,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { FjernOppmøteBekreftelse } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/FjernOppmøteBekreftelse';
import {
  tellRegistreringer,
  harRegistreringer,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/møtedagsregistreringer';
import { formaterWorkOpNavn } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/workopNavn';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon } from '@navikt/aksel-icons';
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
import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkereData: JobbsøkereResponseDTO;
  onMøtedagOppdatert: (oppdatertMøtedag: MøtedagDTO) => Promise<unknown> | void;
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
});

type MøteoppsettFormValues = z.infer<typeof MøteoppsettFormSchema>;

const tilMøteoppsettFormValues = (
  møtedag: MøtedagDTO,
): MøteoppsettFormValues => ({
  starttidspunkt: møtedag.starttidspunkt,
  varighetPerMøteMinutter: møtedag.varighetPerMøteMinutter,
  pauseMellomMøterMinutter: møtedag.pauseMellomMøterMinutter,
});

const OppmøteOgOppsett: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkereData,
  onMøtedagOppdatert,
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
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<MøteoppsettFormValues>({
    resolver: zodResolver(MøteoppsettFormSchema),
    defaultValues: tilMøteoppsettFormValues(møtedag),
  });
  // Hver arbeidsgiver har sitt eget rom, så antallet følger av arbeidsgiverne
  // og kan ikke velges.
  const antallRom = Math.max(arbeidsgivere.length, 1);
  const oppmøtelisteRef = useRef<HTMLDivElement>(null);
  const [kanSkrolleNed, setKanSkrolleNed] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [fjernetOppmøteId, setFjernetOppmøteId] = useState<string | null>(null);
  const [bekreftFjerning, setBekreftFjerning] = useState<{
    personTreffId: string;
    navn: string;
  } | null>(null);
  const harMøteplan = møtedag.rom.length > 0;

  useEffect(() => {
    if (isDirty) return;
    reset({
      starttidspunkt: møtedag.starttidspunkt,
      varighetPerMøteMinutter: møtedag.varighetPerMøteMinutter,
      pauseMellomMøterMinutter: møtedag.pauseMellomMøterMinutter,
    });
  }, [
    isDirty,
    møtedag.pauseMellomMøterMinutter,
    møtedag.starttidspunkt,
    møtedag.varighetPerMøteMinutter,
    reset,
  ]);

  const fjernOppmøte = async (personTreffId: string) => {
    setFeil(null);
    setFjernetOppmøteId(personTreffId);
    try {
      const oppdatertMøtedag = await oppdaterOppmøte(
        rekrutteringstreffId,
        personTreffId,
        false,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
      setBekreftFjerning(null);
    } catch {
      setFeil('Kunne ikke fjerne oppmøtet. Prøv igjen.');
    } finally {
      setFjernetOppmøteId(null);
    }
  };

  useEffect(() => {
    const liste = oppmøtelisteRef.current;
    if (!liste) return;

    const oppdaterSkrollindikator = () => {
      const gjenstår =
        liste.scrollHeight - liste.scrollTop - liste.clientHeight;
      setKanSkrolleNed(gjenstår > 1);
    };

    oppdaterSkrollindikator();
    liste.addEventListener('scroll', oppdaterSkrollindikator);
    const størrelsesovervåker = new ResizeObserver(oppdaterSkrollindikator);
    størrelsesovervåker.observe(liste);

    return () => {
      liste.removeEventListener('scroll', oppdaterSkrollindikator);
      størrelsesovervåker.disconnect();
    };
  }, [oppmøtteJobbsøkere.length]);

  const startFjernOppmøte = (personTreffId: string, navn: string) => {
    if (harRegistreringer(tellRegistreringer(møtedag, personTreffId))) {
      setBekreftFjerning({ personTreffId, navn });
      return;
    }
    void fjernOppmøte(personTreffId);
  };

  const lagreMøteoppsett = async (verdier: MøteoppsettFormValues) => {
    setFeil(null);

    try {
      const oppdatertMøtedag = await settOppMøteplan(rekrutteringstreffId, {
        ...verdier,
        antallRom,
      });
      reset(tilMøteoppsettFormValues(oppdatertMøtedag));
      await onMøtedagOppdatert(oppdatertMøtedag);
      onOppsettLagret();
    } catch {
      setFeil('Kunne ikke opprette møteplanen. Prøv igjen.');
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
            <VStack gap='space-4'>
              <Box
                ref={oppmøtelisteRef}
                background='neutral-soft'
                borderRadius='8'
                padding='space-8'
                className='max-h-72 overflow-y-auto'
                role='region'
                aria-label='Fremmøtte jobbsøkere'
                aria-describedby={
                  kanSkrolleNed ? 'workop-oppmøte-skrollhjelp' : undefined
                }
                tabIndex={0}
              >
                <VStack as='ul' gap='space-4'>
                  {oppmøtteJobbsøkere.map((jobbsøker) => {
                    const navn = formaterWorkOpNavn(
                      jobbsøker.fornavn,
                      jobbsøker.etternavn,
                      jobbsøker.personTreffId,
                    );
                    return (
                      <Box
                        as='li'
                        key={jobbsøker.personTreffId}
                        background='neutral-softA'
                        padding='space-6'
                        borderRadius='8'
                        className='flex justify-between gap-2'
                      >
                        <div>
                          <BodyShort weight='semibold'>{navn}</BodyShort>
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
                          onClick={() =>
                            startFjernOppmøte(jobbsøker.personTreffId, navn)
                          }
                        >
                          Fjern oppmøte
                        </Button>
                      </Box>
                    );
                  })}
                </VStack>
              </Box>

              {kanSkrolleNed && (
                <HStack gap='space-4' align='center' justify='center'>
                  <ChevronDownIcon aria-hidden fontSize='1.25rem' />
                  <BodyShort size='small' className='text-text-subtle'>
                    Bla ned for å se flere
                  </BodyShort>
                </HStack>
              )}
              <span id='workop-oppmøte-skrollhjelp' className='sr-only'>
                Lista kan blas nedover for å se flere jobbsøkere.
              </span>
            </VStack>
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
        <form onSubmit={handleSubmit(lagreMøteoppsett)} noValidate>
          <VStack gap='space-16'>
            {harMøteplan && (
              <LocalAlert status='announcement'>
                <LocalAlert.Header>
                  <LocalAlert.Title as='h4'>
                    Møteplanen er opprettet
                  </LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                  Gå til romfordelingen for å flytte jobbsøkere manuelt eller
                  fordele alle på nytt. Innstillingene under endres ikke etter
                  at møteplanen er opprettet.
                </LocalAlert.Content>
              </LocalAlert>
            )}

            <HGrid gap='space-16' columns={{ xs: 1, sm: 2, lg: 3 }}>
              <TextField
                label='Starttidspunkt'
                type='time'
                readOnly={harMøteplan}
                error={errors.starttidspunkt?.message}
                {...register('starttidspunkt')}
              />
              <TextField
                label='Varighet per møte (min)'
                type='number'
                min={1}
                step={1}
                inputMode='numeric'
                readOnly={harMøteplan}
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
                readOnly={harMøteplan}
                error={errors.pauseMellomMøterMinutter?.message}
                {...register('pauseMellomMøterMinutter', {
                  valueAsNumber: true,
                })}
              />
            </HGrid>

            {feil && (
              <LocalAlert as='div' status='error'>
                <LocalAlert.Content>{feil}</LocalAlert.Content>
              </LocalAlert>
            )}

            <HStack justify='end' gap='space-8' wrap>
              {harMøteplan ? (
                <Button type='button' onClick={onOppsettLagret}>
                  Gå til romfordeling
                </Button>
              ) : (
                <Button
                  type='submit'
                  loading={isSubmitting}
                  disabled={antallMøtt === 0 || arbeidsgivere.length === 0}
                >
                  Opprett møteplan
                </Button>
              )}
            </HStack>
          </VStack>
        </form>
      </section>

      {bekreftFjerning && (
        <FjernOppmøteBekreftelse
          åpen
          jobbsøkernavn={bekreftFjerning.navn}
          registreringer={tellRegistreringer(
            møtedag,
            bekreftFjerning.personTreffId,
          )}
          lagrer={fjernetOppmøteId === bekreftFjerning.personTreffId}
          feil={feil}
          onBekreft={() => void fjernOppmøte(bekreftFjerning.personTreffId)}
          onAvbryt={() => setBekreftFjerning(null)}
        />
      )}
    </VStack>
  );
};

export default OppmøteOgOppsett;
