'use client';

import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import IntervjufordelingRad from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/IntervjufordelingRad';
import {
  flyttPersonTilIndeks,
  type Fordelingsseksjon,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordelingHjelpere';
import type { ArbeidsgiverMedId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringStegProps';
import type { IntervjufordelingDrag } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useIntervjufordelingDragOgSlipp';
import { BodyShort, Box, VStack } from '@navikt/ds-react';
import { DragEvent, FC } from 'react';

interface Props {
  fordeling: ArbeidsgiverIntervjufordelingDTO;
  arbeidsgiver: ArbeidsgiverMedId;
  seksjon: Fordelingsseksjon;
  lagrer: boolean;
  drag: IntervjufordelingDrag;
  navnPåJobbsøker: (personTreffId: string) => string;
  konfliktTekst: (
    personTreffId: string,
    arbeidsgiverTreffId: string,
  ) => string | null;
  onFlytt: (
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    personTreffId: string,
    fokuserKnappId: string,
  ) => void;
}

/**
 * Én av de to listene hos en arbeidsgiver: «Med på speedintervju»
 * (`inkludert`) eller «Ikke gjennomført speedintervju» (`ekskludert`).
 */
const IntervjufordelingListe: FC<Props> = ({
  fordeling,
  arbeidsgiver,
  seksjon,
  lagrer,
  drag,
  navnPåJobbsøker,
  konfliktTekst,
  onFlytt,
}) => {
  const erInkludert = seksjon === 'inkludert';
  const personTreffIder = erInkludert
    ? fordeling.inkludertePersonTreffIder
    : fordeling.ekskludertePersonTreffIder;
  const erSisteDropMål = drag.erDropMål(
    arbeidsgiver.arbeidsgiverTreffId,
    seksjon,
    null,
  );

  const dropPåIndeks = (indeks: number) => (event: DragEvent<HTMLElement>) =>
    drag.slippPerson(event, fordeling, (personTreffId) =>
      flyttPersonTilIndeks(fordeling, personTreffId, seksjon, indeks),
    );

  if (personTreffIder.length === 0) {
    return (
      <Box
        background='neutral-soft'
        borderColor={erSisteDropMål ? 'accent' : 'neutral-subtle'}
        borderRadius='4'
        borderWidth={erSisteDropMål ? '2' : '1'}
        padding='space-12'
        onDragOver={(event) =>
          drag.tillatDropPåSlutten(
            event,
            arbeidsgiver.arbeidsgiverTreffId,
            seksjon,
          )
        }
        onDrop={dropPåIndeks(0)}
      >
        <BodyShort size='small'>
          {erInkludert
            ? 'Ingen er med på speedintervju.'
            : 'Ingen er tatt ut av speedintervjuet.'}
        </BodyShort>
      </Box>
    );
  }

  const visPlasserSist =
    drag.aktivDragKilde?.arbeidsgiverTreffId ===
    arbeidsgiver.arbeidsgiverTreffId;

  return (
    <VStack gap='space-8'>
      <VStack
        as='ol'
        gap='space-8'
        aria-label={
          erInkludert
            ? `Intervjurekkefølge hos ${arbeidsgiver.navn}`
            : `Ikke gjennomført speedintervju hos ${arbeidsgiver.navn}`
        }
      >
        {personTreffIder.map((personTreffId, indeks) => (
          <IntervjufordelingRad
            key={personTreffId}
            fordeling={fordeling}
            arbeidsgiver={arbeidsgiver}
            seksjon={seksjon}
            personTreffId={personTreffId}
            navn={navnPåJobbsøker(personTreffId)}
            indeks={indeks}
            antall={personTreffIder.length}
            konfliktTekst={konfliktTekst(
              personTreffId,
              arbeidsgiver.arbeidsgiverTreffId,
            )}
            lagrer={lagrer}
            drag={drag}
            onFlytt={onFlytt}
          />
        ))}
      </VStack>
      {visPlasserSist && (
        <Box
          background={erSisteDropMål ? 'accent-soft' : 'neutral-soft'}
          borderColor={erSisteDropMål ? 'accent' : 'neutral-subtle'}
          borderRadius='4'
          borderWidth={erSisteDropMål ? '2' : '1'}
          padding='space-8'
          onDragOver={(event) =>
            drag.tillatDropPåSlutten(
              event,
              arbeidsgiver.arbeidsgiverTreffId,
              seksjon,
            )
          }
          onDrop={dropPåIndeks(personTreffIder.length)}
        >
          <BodyShort size='small'>
            {erInkludert
              ? 'Slipp her for å plassere sist over sperrelinjen'
              : 'Slipp her for å plassere sist under sperrelinjen'}
          </BodyShort>
        </Box>
      )}
    </VStack>
  );
};

export default IntervjufordelingListe;
