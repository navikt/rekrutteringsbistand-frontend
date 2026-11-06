import SVGDarkmode from '@/components/layout/SVGDarkmode';
import FigurMedSøppelbøtte from '@/public/illustrasjoner/figur_med_søppelbøtte.svg';
import FigurMedSøppelbøtteDark from '@/public/illustrasjoner/figur_med_søppelbøtte_dark.svg';
import ForvirretFigur from '@/public/illustrasjoner/forvirret_figur.svg';
import ForvirretFigurDark from '@/public/illustrasjoner/forvirret_figur_dark.svg';
import { BodyShort, Box } from '@navikt/ds-react';
import Image from 'next/image';
import { FC } from 'react';

interface ManglendeTreffFeilmeldingProps {
  erUtilgjengelig?: boolean;
}

export const ManglendeTreffFeilmelding: FC<ManglendeTreffFeilmeldingProps> = ({
  erUtilgjengelig,
}) => {
  const melding = erUtilgjengelig
    ? 'Rekrutteringstreffet er enten skjult eller slettet og er derfor ikke lenger tilgjengelig'
    : 'Kunne ikke laste rekrutteringstreffet';

  return (
    <Box className='flex flex-col items-center gap-4 py-8 text-center'>
      <SVGDarkmode
        light={erUtilgjengelig ? FigurMedSøppelbøtte : ForvirretFigur}
        dark={erUtilgjengelig ? FigurMedSøppelbøtteDark : ForvirretFigurDark}
        alt={erUtilgjengelig ? 'Figur med søppelbøtte' : 'Forvirret figur'}
      />
      <BodyShort>{melding}</BodyShort>
    </Box>
  );
};
