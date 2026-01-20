'use client';

import LeggTilArbeidsgiverForm from '../arbeidsgiver/LeggTilArbeidsgiverForm';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import InnleggForm from './InnleggForm';
import PraktiskeForhold from './Praktiskeforhold';
import TittelForm from './TittelForm';
import { Box, Heading } from '@navikt/ds-react';
import { FC } from 'react';

interface RekrutteringstreffRedigeringProps {
  onUpdated?: () => void;
  onGåTilForhåndsvisning?: () => void;
}

const RekrutteringstreffRedigering: FC<RekrutteringstreffRedigeringProps> = ({
  onUpdated,
}) => {
  const { harPublisert, oppdaterData } = useRekrutteringstreffData();

  const håndterOppdatert = async () => {
    oppdaterData();
    onUpdated?.();
  };

  return (
    <div className='mx-auto max-w-[64rem] space-y-8'>
      <Box
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='12'
        borderWidth='1'
        padding='space-24'
      >
        <TittelForm onUpdated={håndterOppdatert} />
      </Box>
      <Box
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='12'
        borderWidth='1'
        padding='space-24'
      >
        <PraktiskeForhold />
      </Box>
      <Box
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='12'
        borderWidth='1'
        padding='space-24'
        className='space-y-4'
      >
        <InnleggForm onUpdated={håndterOppdatert} />
      </Box>
      {!harPublisert && (
        <Box
          background='neutral-soft'
          borderColor='neutral-subtle'
          borderRadius='12'
          borderWidth='1'
          padding='space-24'
          className='space-y-4'
        >
          <Heading level='2' size='medium'>
            Arbeidsgivere
          </Heading>
          <LeggTilArbeidsgiverForm variant='inline' />
        </Box>
      )}
      <div aria-hidden className='h-80' />
    </div>
  );
};

export default RekrutteringstreffRedigering;
