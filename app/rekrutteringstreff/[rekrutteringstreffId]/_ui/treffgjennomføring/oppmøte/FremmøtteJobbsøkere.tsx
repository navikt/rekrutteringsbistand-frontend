import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type { Navnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { XMarkIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Heading,
  LocalAlert,
  Tooltip,
  VStack,
} from '@navikt/ds-react';

interface Props {
  jobbsøkere: JobbsøkerDTO[];
  antallMøtt: number;
  antallPåmeldte: number;
  visNavn: Navnvisning;
  personTreffIdSomFjernes: string | null;
  onFjernOppmøte: (personTreffId: string, navn: string) => void;
  onGåTilJobbsøkere: () => void;
}

export default function FremmøtteJobbsøkere({
  jobbsøkere,
  antallMøtt,
  antallPåmeldte,
  visNavn,
  personTreffIdSomFjernes,
  onFjernOppmøte,
  onGåTilJobbsøkere,
}: Props) {
  return (
    <section aria-labelledby='treffgjennomføring-oppmøte-heading'>
      <Heading
        id='treffgjennomføring-oppmøte-heading'
        level='3'
        size='small'
        spacing
      >
        Oppmøte
      </Heading>
      <div className='flex justify-between'>
        <BodyShort spacing>
          {antallMøtt} møtt av {antallPåmeldte} påmeldte
        </BodyShort>
        <BodyShort className='font-semibold'>Fjern oppmøte</BodyShort>
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
                onClick={onGåTilJobbsøkere}
              >
                Gå til jobbsøkere
              </Button>
            </VStack>
          </LocalAlert.Content>
        </LocalAlert>
      ) : (
        <Box background='neutral-soft' borderRadius='8' padding='space-8'>
          <VStack as='ul' gap='space-4' aria-label='Fremmøtte jobbsøkere'>
            {jobbsøkere.map((jobbsøker) => {
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
                      size='medium'
                      className='mr-2'
                      icon={<XMarkIcon />}
                      loading={
                        personTreffIdSomFjernes === jobbsøker.personTreffId
                      }
                      disabled={personTreffIdSomFjernes !== null}
                      onClick={() =>
                        onFjernOppmøte(jobbsøker.personTreffId, navn)
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
  );
}
