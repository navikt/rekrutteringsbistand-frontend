'use client';

import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import {
  flyttPersonEttSteg,
  flyttPersonTilRad,
  type Fordelingsseksjon,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordelingHjelpere';
import type { ArbeidsgiverMedId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringStegProps';
import type { IntervjufordelingDrag } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useIntervjufordelingDragOgSlipp';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DragVerticalIcon,
  ExclamationmarkTriangleIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, Tooltip } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  fordeling: ArbeidsgiverIntervjufordelingDTO;
  arbeidsgiver: ArbeidsgiverMedId;
  seksjon: Fordelingsseksjon;
  personTreffId: string;
  navn: string;
  indeks: number;
  antall: number;
  /** Tekst som forklarer plasskonflikten, eller `null` når raden er konfliktfri. */
  konfliktTekst: string | null;
  lagrer: boolean;
  drag: IntervjufordelingDrag;
  onFlytt: (
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    personTreffId: string,
    fokuserKnappId: string,
  ) => void;
}

const IntervjufordelingRad: FC<Props> = ({
  fordeling,
  arbeidsgiver,
  seksjon,
  personTreffId,
  navn,
  indeks,
  antall,
  konfliktTekst,
  lagrer,
  drag,
  onFlytt,
}) => {
  const erInkludert = seksjon === 'inkludert';
  const erDropMål = drag.erDropMål(
    arbeidsgiver.arbeidsgiverTreffId,
    seksjon,
    personTreffId,
  );
  const erDraKilde =
    drag.aktivDragKilde?.arbeidsgiverTreffId ===
      arbeidsgiver.arbeidsgiverTreffId &&
    drag.aktivDragKilde.personTreffId === personTreffId;

  // Første rad under sperrelinjen flyttes «over» den, siste rad over flyttes «under».
  const oppEtikett =
    !erInkludert && indeks === 0
      ? `Flytt ${navn} over sperrelinjen hos ${arbeidsgiver.navn}`
      : `Flytt ${navn} opp hos ${arbeidsgiver.navn}`;
  const nedEtikett =
    erInkludert && indeks === antall - 1
      ? `Flytt ${navn} under sperrelinjen hos ${arbeidsgiver.navn}`
      : `Flytt ${navn} ned hos ${arbeidsgiver.navn}`;
  const oppDeaktivert = lagrer || (erInkludert && indeks === 0);
  const nedDeaktivert = lagrer || (!erInkludert && indeks === antall - 1);
  const oppKnappId = `${arbeidsgiver.arbeidsgiverTreffId}|${personTreffId}|opp`;
  const nedKnappId = `${arbeidsgiver.arbeidsgiverTreffId}|${personTreffId}|ned`;

  const flyttEttSteg = (retning: 'opp' | 'ned', knappId: string) =>
    onFlytt(
      flyttPersonEttSteg(fordeling, personTreffId, retning),
      personTreffId,
      knappId,
    );

  return (
    <Box
      as='li'
      background={konfliktTekst ? 'warning-soft' : 'neutral-soft'}
      borderColor={erDropMål ? 'accent' : 'neutral-subtle'}
      borderRadius='4'
      borderWidth={erDropMål ? '2' : '1'}
      padding='space-8'
      className={erDraKilde ? 'opacity-60' : undefined}
      onDragOver={(event) =>
        drag.tillatDropPåRad(
          event,
          arbeidsgiver.arbeidsgiverTreffId,
          seksjon,
          personTreffId,
        )
      }
      onDrop={(event) =>
        drag.slippPerson(event, fordeling, (flyttetPersonTreffId) =>
          flyttPersonTilRad(fordeling, flyttetPersonTreffId, personTreffId),
        )
      }
    >
      <HStack
        gap='space-12'
        align='center'
        justify='space-between'
        wrap={false}
      >
        <HStack
          gap='space-8'
          align='center'
          wrap={false}
          data-drag-image
          className='min-w-0 flex-1'
        >
          <span
            draggable={!lagrer}
            aria-hidden
            className={
              lagrer
                ? 'shrink-0 cursor-not-allowed'
                : 'shrink-0 cursor-grab active:cursor-grabbing'
            }
            onDragStart={(event) =>
              drag.startDrag(
                event,
                arbeidsgiver.arbeidsgiverTreffId,
                personTreffId,
              )
            }
            onDragEnd={drag.avsluttDrag}
          >
            <DragVerticalIcon aria-hidden />
          </span>
          <BodyShort weight='semibold' className='min-w-0 flex-1'>
            <AvkortetTekst>{navn}</AvkortetTekst>
          </BodyShort>
          {konfliktTekst && (
            <Tooltip content={konfliktTekst} describesChild>
              <span
                role='img'
                aria-label='Plasskonflikt'
                tabIndex={0}
                className='inline-flex shrink-0 cursor-help rounded-sm text-(--ax-text-warning-subtle)'
              >
                <ExclamationmarkTriangleIcon aria-hidden />
              </span>
            </Tooltip>
          )}
        </HStack>

        <HStack gap='space-4' align='center' wrap={false} className='shrink-0'>
          <Button
            type='button'
            size='small'
            variant='tertiary-neutral'
            icon={<ArrowUpIcon aria-hidden />}
            aria-label={oppEtikett}
            title={oppEtikett}
            aria-disabled={oppDeaktivert}
            className={oppDeaktivert ? 'opacity-40' : undefined}
            data-flyttknapp={oppKnappId}
            onClick={() => {
              if (oppDeaktivert) return;
              flyttEttSteg('opp', oppKnappId);
            }}
          />
          <Button
            type='button'
            size='small'
            variant='tertiary-neutral'
            icon={<ArrowDownIcon aria-hidden />}
            aria-label={nedEtikett}
            title={nedEtikett}
            aria-disabled={nedDeaktivert}
            className={nedDeaktivert ? 'opacity-40' : undefined}
            data-flyttknapp={nedKnappId}
            onClick={() => {
              if (nedDeaktivert) return;
              flyttEttSteg('ned', nedKnappId);
            }}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default IntervjufordelingRad;
