'use client';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  tellRegistreringer,
  harRegistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { FjernOppmøteBekreftelse } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/FjernOppmøteBekreftelse';
import {
  lagNavnvisning,
  sorterPåDeltakernummer,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/møtedagNavn';
import type { MøtedagOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useMøtedagFane';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useRapporterLagringsstatus';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import {
  BodyShort,
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import { FC, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  jobbsøkereData: JobbsøkereResponseDTO;
  onMøtedagOppdatert: MøtedagOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  onNeste: () => void;
  nesteknappTekst: string;
}

const Oppmøte: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  jobbsøkereData,
  onMøtedagOppdatert,
  onLagringsstatusEndret,
  onNeste,
  nesteknappTekst,
}) => {
  const [, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });

  // Lista leses som kortbunken, i den rekkefølgen kortene ble delt ut.
  const oppmøtteJobbsøkere = sorterPåDeltakernummer(
    jobbsøkereData.jobbsøkere.filter((jobbsøker) =>
      møtedag.oppmøte.includes(jobbsøker.personTreffId),
    ),
    møtedag,
  );
  const visNavn = lagNavnvisning(møtedag);
  const antallMøtt = møtedag.oppmøte.length;
  const antallPåmeldte = jobbsøkereData.totalt;

  const [feil, setFeil] = useState<string | null>(null);
  const [fjernetOppmøteId, setFjernetOppmøteId] = useState<string | null>(null);
  const [bekreftFjerning, setBekreftFjerning] = useState<{
    personTreffId: string;
    navn: string;
  } | null>(null);

  useRapporterLagringsstatus(fjernetOppmøteId !== null, onLagringsstatusEndret);

  const fjernOppmøte = async (
    personTreffId: string,
    bekreftSlettRegistreringer = false,
  ) => {
    setFeil(null);
    setFjernetOppmøteId(personTreffId);
    try {
      const oppdatertMøtedag = await oppdaterOppmøte(
        rekrutteringstreffId,
        personTreffId,
        false,
        bekreftSlettRegistreringer,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
      setBekreftFjerning(null);
    } catch {
      setFeil('Kunne ikke fjerne oppmøtet. Prøv igjen.');
    } finally {
      setFjernetOppmøteId(null);
    }
  };

  const startFjernOppmøte = (personTreffId: string, navn: string) => {
    if (harRegistreringer(tellRegistreringer(møtedag, personTreffId))) {
      setBekreftFjerning({ personTreffId, navn });
      return;
    }
    void fjernOppmøte(personTreffId);
  };

  return (
    <VStack gap='space-32'>
      {/* Lista skroller med resten av siden, så knappen må stå øverst for å
          være innen rekkevidde uansett hvor mange som er møtt. */}
      <HStack justify='end'>
        <Button
          type='button'
          onClick={onNeste}
          disabled={antallMøtt === 0 || arbeidsgivere.length === 0}
        >
          {nesteknappTekst}
        </Button>
      </HStack>

      <HGrid columns={{ xs: 1, lg: 2 }} gap='space-24'>
        <section aria-labelledby='møtedag-oppmøte-heading'>
          <Heading id='møtedag-oppmøte-heading' level='3' size='small' spacing>
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
              <VStack as='ul' gap='space-4' aria-label='Fremmøtte jobbsøkere'>
                {oppmøtteJobbsøkere.map((jobbsøker) => {
                  const navn = visNavn(jobbsøker, jobbsøker.personTreffId);
                  return (
                    <Box
                      as='li'
                      key={jobbsøker.personTreffId}
                      background='neutral-softA'
                      padding='space-6'
                      borderRadius='8'
                      className='flex justify-between gap-2'
                    >
                      <div className='min-w-0'>
                        <BodyShort weight='semibold'>
                          <AvkortetTekst>{navn}</AvkortetTekst>
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
          )}
        </section>

        <section aria-labelledby='møtedag-arbeidsgivere-heading'>
          <Heading
            id='møtedag-arbeidsgivere-heading'
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
                    <BodyShort weight='semibold'>
                      <AvkortetTekst>{arbeidsgiver.navn}</AvkortetTekst>
                    </BodyShort>
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

      {feil && (
        <LocalAlert as='div' status='error'>
          <LocalAlert.Content>{feil}</LocalAlert.Content>
        </LocalAlert>
      )}

      {bekreftFjerning && (
        <FjernOppmøteBekreftelse
          åpen
          omtale={bekreftFjerning.navn}
          registreringer={tellRegistreringer(
            møtedag,
            bekreftFjerning.personTreffId,
          )}
          lagrer={fjernetOppmøteId === bekreftFjerning.personTreffId}
          feil={feil}
          onBekreft={() =>
            void fjernOppmøte(bekreftFjerning.personTreffId, true)
          }
          onAvbryt={() => setBekreftFjerning(null)}
        />
      )}
    </VStack>
  );
};

export default Oppmøte;
