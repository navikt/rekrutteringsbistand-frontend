'use client';

import LeggTilArbeidsgiverForm from './arbeidsgivere/LeggTilArbeidsgiverForm';
import InnleggForm from './redigereRekrutteringstreff/InnleggForm';
import PraktiskeForhold from './redigereRekrutteringstreff/Praktiskeforhold';
import TittelForm from './redigereRekrutteringstreff/TittelForm';
import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import { Heading, Box } from '@navikt/ds-react';
import { FC } from 'react';

interface RekrutteringstreffRedigeringProps {
  onUpdated?: () => void;
  onGåTilForhåndsvisning?: () => void;
}

const RekrutteringstreffRedigering: FC<RekrutteringstreffRedigeringProps> = ({
  onUpdated,
}) => {
  const { activeStep, harPublisert, oppdaterData } =
    useRekrutteringstreffData();

  const håndterOppdatert = async () => {
    await oppdaterData();
    onUpdated?.();
  };

  return (
    <div className='space-y-8 max-w-[64rem] mx-auto'>
      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <TittelForm onUpdated={håndterOppdatert} />
      </Box.New>

      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <PraktiskeForhold />
      </Box.New>

      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
        className='space-y-4'
      >
        <Heading level='2' size='medium'>
          Introduksjon
        </Heading>
        <InnleggForm onUpdated={håndterOppdatert} />
      </Box.New>

      {!harPublisert && (
        <Box.New
          background='neutral-soft'
          borderColor='neutral-subtle'
          borderRadius='xlarge'
          borderWidth='1'
          padding='6'
          className='space-y-4'
        >
          <Heading level='2' size='medium'>
            Arbeidsgivere
          </Heading>
          <LeggTilArbeidsgiverForm variant='inline' />
        </Box.New>
      )}

      <div aria-hidden className='h-80' />
    </div>
  );
};

export default RekrutteringstreffRedigering;
