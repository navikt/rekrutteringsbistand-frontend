'use client';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  tellRegistreringer,
  harRegistreringer,
  type Treffgjennomføringsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { OppmøteBlokkert } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/OppmøteBlokkert';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Stegnavigasjon';
import {
  lagNavnvisning,
  sorterPåDeltakernummer,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringNavn';
import type {
  StegBasisProps,
  StegLagringProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useRapporterLagringsstatus';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { XMarkIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  HGrid,
  Heading,
  LocalAlert,
  VStack,
  Tooltip,
} from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import { FC, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps & {
    jobbsøkereData: JobbsøkereResponseDTO;
    onNeste: () => void;
    nesteknappTekst: string;
  };

const Oppmøte: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkereData,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  onNeste,
  nesteknappTekst,
}) => {
  const [, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });

  const oppmøtteJobbsøkere = sorterPåDeltakernummer(
    jobbsøkereData.jobbsøkere.filter((jobbsøker) =>
      treffgjennomføring.oppmøte.includes(jobbsøker.personTreffId),
    ),
    treffgjennomføring,
  );
  const visNavn = lagNavnvisning(treffgjennomføring);
  const antallMøtt = treffgjennomføring.oppmøte.length;
  const antallPåmeldte = jobbsøkereData.totalt;

  const [feil, setFeil] = useState<string | null>(null);
  const [fjernetOppmøteId, setFjernetOppmøteId] = useState<string | null>(null);
  const [blokkert, setBlokkert] = useState<{
    navn: string;
    registreringer: Treffgjennomføringsregistreringer;
  } | null>(null);

  useRapporterLagringsstatus(fjernetOppmøteId !== null, onLagringsstatusEndret);

  const fjernOppmøte = async (personTreffId: string) => {
    setFeil(null);
    setFjernetOppmøteId(personTreffId);
    try {
      const oppdatertTreffgjennomføring = await oppdaterOppmøte(
        rekrutteringstreffId,
        personTreffId,
        false,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
    } catch {
      setFeil('Kunne ikke fjerne oppmøtet. Prøv igjen.');
    } finally {
      setFjernetOppmøteId(null);
    }
  };

  const startFjernOppmøte = (personTreffId: string, navn: string) => {
    const registreringer = tellRegistreringer(
      treffgjennomføring,
      personTreffId,
    );
    if (harRegistreringer(registreringer)) {
      setBlokkert({ navn, registreringer });
      return;
    }
    void fjernOppmøte(personTreffId);
  };

  return (
    <VStack gap='space-32'>
      <Stegnavigasjon>
        <Button
          type='button'
          onClick={onNeste}
          disabled={antallMøtt === 0 || arbeidsgivere.length === 0}
        >
          {nesteknappTekst}
        </Button>
      </Stegnavigasjon>

      <HGrid columns={{ xs: 1, lg: 2 }} gap='space-24'>
        <section aria-labelledby='treffgjennomføring-oppmøte-heading'>
          <Heading
            id='treffgjennomføring-oppmøte-heading'
            level='3'
            size='small'
            spacing
          >
            Oppmøte
          </Heading>
          <div className={'flex justify-between'}>
            <BodyShort spacing>
              {antallMøtt} møtt av {antallPåmeldte} påmeldte
            </BodyShort>
            <BodyShort className={'font-semibold'}>Fjern oppmøte</BodyShort>
          </div>

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
                      <Tooltip content={`Fjern oppmøte for ${navn}`}>
                        <Button
                          type='button'
                          variant='tertiary'
                          size={'medium'}
                          className={'mr-2'}
                          icon={<XMarkIcon />}
                          loading={fjernetOppmøteId === jobbsøker.personTreffId}
                          disabled={fjernetOppmøteId !== null}
                          onClick={() =>
                            startFjernOppmøte(jobbsøker.personTreffId, navn)
                          }
                        />
                      </Tooltip>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
          )}
        </section>

        <section aria-labelledby='treffgjennomføring-arbeidsgivere-heading'>
          <Heading
            id='treffgjennomføring-arbeidsgivere-heading'
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

      <OppmøteBlokkert
        åpen={blokkert !== null}
        omtale={blokkert?.navn ?? ''}
        registreringer={
          blokkert?.registreringer ?? { interesser: 0, vurderinger: 0 }
        }
        onLukk={() => setBlokkert(null)}
      />
    </VStack>
  );
};

export default Oppmøte;
