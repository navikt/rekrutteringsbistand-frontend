import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';

interface ForFåJobbsøkereVarselBannerProps {
  antallJobbsøkereSvartJa: number;
  antallJobbsøkereFåttJobb: number;
}

export default function ForFåJobbsøkereVarselBanner({
  antallJobbsøkereSvartJa,
  antallJobbsøkereFåttJobb,
}: ForFåJobbsøkereVarselBannerProps) {
  const antallSvartJaEllerFåttJobb =
    (antallJobbsøkereSvartJa || 0) + (antallJobbsøkereFåttJobb || 0);
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
        <InformationSquareIcon
          color={'var(--ax-text-danger-decoration)'}
          className={'shrink-0 text-2xl'}
        ></InformationSquareIcon>
        <div className={'flex flex-col gap-1'}>
          <BodyShort>
            Det må være minimum 3 jobbsøkere som har takket ja for å gjennomføre
            rekrutteringstreffet.
          </BodyShort>
          <BodyShort>
            Nåværende status: {antallSvartJaEllerFåttJobb} jobbsøker
            {antallSvartJaEllerFåttJobb === 1 ? '' : 'e'} har takket ja
          </BodyShort>
        </div>
      </div>
    </Box>
  );
}
