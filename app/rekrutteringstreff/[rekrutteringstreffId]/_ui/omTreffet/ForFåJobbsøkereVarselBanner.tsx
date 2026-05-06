import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';

interface ForFåJobbsøkereVarselBannerProps {
  antallJobbsøkereSvartJa: number;
}

export default function ForFåJobbsøkereVarselBanner({
  antallJobbsøkereSvartJa,
}: ForFåJobbsøkereVarselBannerProps) {
  return (
    <Box
      className={''}
      borderRadius='12'
      borderWidth={'1'}
      borderColor='danger'
      background='warning-moderate'
      padding='space-20'
    >
      <div className={'items-top flex flex-row gap-2.5'}>
        <ExclamationmarkTriangleIcon
          color={'var(--ax-text-danger-decoration)'}
          className={'shrink-0 text-2xl'}
        ></ExclamationmarkTriangleIcon>
        <div className={'flex flex-col gap-1'}>
          <BodyShort>
            Det må være minimum 3 jobbsøkere som har takket ja for å gjennomføre
            rekrutterinstreffet.
          </BodyShort>
          <BodyShort>
            Nåværende status: {antallJobbsøkereSvartJa} jobbsøkere har takket ja
          </BodyShort>
        </div>
      </div>
    </Box>
  );
}
