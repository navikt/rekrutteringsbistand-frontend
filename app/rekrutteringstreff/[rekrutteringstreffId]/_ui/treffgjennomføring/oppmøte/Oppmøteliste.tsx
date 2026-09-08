import { JOBBSØKERE_PER_SIDE } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/hentJobbsøkersideForGjennomføring';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { tellRegistreringer } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/registreringer';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import Autolagringsstatus from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/Autolagringsstatus';
import type { Navnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import Oppmøterad from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/Oppmøterad';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import {
  BodyShort,
  Box,
  Heading,
  HStack,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';

interface Props {
  jobbsøkere: JobbsøkerDTO[];
  side: number;
  onSidebytte: (side: number) => void;
  treffgjennomføring: TreffgjennomføringDTO;
  antallMøtt: number;
  antallPåmeldte: number;
  visNavn: Navnvisning;
  lagrer?: boolean;
  feil?: boolean;
  statusmelding?: string | null;
  deaktivert?: boolean;
  erOppmøteVentende: (personTreffId: string) => boolean;
  feilForOppmøte: (personTreffId: string) => string | null;
  onToggleOppmøte: (
    personTreffId: string,
    navn: string,
    skalMøte: boolean,
  ) => void;
}

export default function Oppmøteliste({
  jobbsøkere,
  side,
  onSidebytte,
  treffgjennomføring,
  antallMøtt,
  antallPåmeldte,
  visNavn,
  lagrer = false,
  feil = false,
  statusmelding,
  deaktivert = false,
  erOppmøteVentende,
  feilForOppmøte,
  onToggleOppmøte,
}: Props) {
  const oppmøteSet = new Set(treffgjennomføring.oppmøte);

  const total = antallPåmeldte;
  const skalVisePaginering = total > JOBBSØKERE_PER_SIDE;
  const fraAntall = total === 0 ? 0 : (side - 1) * JOBBSØKERE_PER_SIDE + 1;
  const tilAntall = Math.min(side * JOBBSØKERE_PER_SIDE, total);

  return (
    <section aria-labelledby='treffgjennomføring-oppmøte-heading'>
      <HStack
        align='center'
        justify='space-between'
        paddingBlock='space-0 space-8'
      >
        <Heading id='treffgjennomføring-oppmøte-heading' level='3' size='small'>
          Oppmøte
        </Heading>
        <Autolagringsstatus
          lagrer={lagrer}
          feil={feil}
          statusmelding={statusmelding}
        />
      </HStack>
      <HStack
        align='center'
        justify='space-between'
        paddingBlock='space-0 space-8'
      >
        <BodyShort>
          {antallMøtt} møtt av {antallPåmeldte} påmeldte
        </BodyShort>
        <BodyShort className='font-semibold'>Oppmøte</BodyShort>
      </HStack>

      {total === 0 ? (
        <LocalAlert status='announcement'>
          <LocalAlert.Header>
            <LocalAlert.Title as='h4'>
              Ingen jobbsøkere lagt til ennå
            </LocalAlert.Title>
          </LocalAlert.Header>
          <LocalAlert.Content>
            Det er ingen jobbsøkere registrert på dette rekrutteringstreffet.
          </LocalAlert.Content>
        </LocalAlert>
      ) : (
        <Box background='neutral-soft' borderRadius='8' padding='space-8'>
          {skalVisePaginering && (
            <Box paddingBlock='space-0 space-8' className='flex justify-end'>
              <LitenPaginering
                fraAntall={fraAntall}
                tilAntall={tilAntall}
                total={total}
                side={side}
                setSide={onSidebytte}
              />
            </Box>
          )}
          <VStack as='ul' gap='space-4' aria-label='Jobbsøkere'>
            {jobbsøkere.map((jobbsøker) => {
              const navn = visNavn(jobbsøker, jobbsøker.personTreffId);
              return (
                <Oppmøterad
                  key={jobbsøker.personTreffId}
                  jobbsøker={jobbsøker}
                  navn={navn}
                  erMøtt={oppmøteSet.has(jobbsøker.personTreffId)}
                  registreringer={tellRegistreringer(
                    treffgjennomføring,
                    jobbsøker.personTreffId,
                  )}
                  venter={erOppmøteVentende(jobbsøker.personTreffId)}
                  feil={feilForOppmøte(jobbsøker.personTreffId)}
                  deaktivert={deaktivert}
                  onToggleOppmøte={(skalMøte) =>
                    onToggleOppmøte(jobbsøker.personTreffId, navn, skalMøte)
                  }
                />
              );
            })}
          </VStack>
          {skalVisePaginering && (
            <Box paddingBlock='space-12 space-0' className='flex justify-end'>
              <LitenPaginering
                fraAntall={fraAntall}
                tilAntall={tilAntall}
                total={total}
                side={side}
                setSide={onSidebytte}
              />
            </Box>
          )}
        </Box>
      )}
    </section>
  );
}
