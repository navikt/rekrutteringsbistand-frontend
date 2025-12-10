'use client';

import StedForm from './StedForm';
import SvarfristForm from './SvarfristForm';
import TidspunktForm from './TidspunktForm';
import { Box, Heading } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';

const PraktiskeForhold = () => {
  const { control } = useFormContext();

  return (
    <div className='space-y-8'>
      <Heading level='2' size='medium'>
        Praktiske forhold
      </Heading>
      <Box.New background='neutral-moderate' borderRadius='xlarge' padding='3'>
        <TidspunktForm control={control} />
      </Box.New>
      <Box.New background='neutral-moderate' borderRadius='xlarge' padding='3'>
        <SvarfristForm control={control} />
      </Box.New>
      <Box.New background='neutral-moderate' borderRadius='xlarge' padding='3'>
        <StedForm control={control} />
      </Box.New>
    </div>
  );
};

export default PraktiskeForhold;
