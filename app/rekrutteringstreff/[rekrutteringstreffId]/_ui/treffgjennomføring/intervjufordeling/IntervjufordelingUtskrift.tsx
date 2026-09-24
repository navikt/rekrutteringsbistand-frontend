'use client';

import Utskriftsdialog, {
  Utskriftsseksjon,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/Utskriftsdialog';
import type { ArbeidsgiverMedId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/arbeidsgivere';
import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { FC } from 'react';

export interface Utskriftsfordeling {
  arbeidsgiver: ArbeidsgiverMedId;
  personTreffIder: string[];
}

interface Props {
  åpen: boolean;
  fordelinger: Utskriftsfordeling[];
  initialerPåJobbsøker: (personTreffId: string) => string;
  onLukk: () => void;
}

const IntervjufordelingUtskrift: FC<Props> = ({
  åpen,
  fordelinger,
  initialerPåJobbsøker,
  onLukk,
}) => (
  <Utskriftsdialog
    åpen={åpen}
    tittel='Intervjufordeling – utskrift'
    dokumenttittel='WorkOp-intervjufordeling'
    sidestil='@page { size: landscape; margin: 12mm; }'
    onLukk={onLukk}
  >
    <Heading level='1' size='medium' spacing className='hidden print:block'>
      WorkOp – intervjufordeling
    </Heading>
    {fordelinger.map(({ arbeidsgiver, personTreffIder }) => (
      <Utskriftsseksjon
        key={arbeidsgiver.arbeidsgiverTreffId}
        headingId={`utskrift-intervjufordeling-${arbeidsgiver.arbeidsgiverTreffId}`}
        tittel={arbeidsgiver.navn}
      >
        <VStack
          as='ol'
          gap='space-4'
          aria-label={`Intervjurekkefølge for ${arbeidsgiver.navn}`}
          className='m-0 list-none p-0'
        >
          {personTreffIder.map((personTreffId) => (
            <Box as='li' key={personTreffId}>
              <BodyShort>{initialerPåJobbsøker(personTreffId)}</BodyShort>
            </Box>
          ))}
        </VStack>
      </Utskriftsseksjon>
    ))}
  </Utskriftsdialog>
);

export default IntervjufordelingUtskrift;
