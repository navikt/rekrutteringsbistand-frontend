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
      <Box background='neutral-moderate' borderRadius='12' padding='space-12'>
        <TidspunktForm control={control} />
      </Box>
      <Box background='neutral-moderate' borderRadius='12' padding='space-12'>
        <SvarfristForm control={control} />
      </Box>
      <Box background='neutral-moderate' borderRadius='12' padding='space-12'>
        <StedForm control={control} />
      </Box>
    </div>
  );
};

export default PraktiskeForhold;
