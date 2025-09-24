'use client';

import StedForm from './StedForm';
import SvarfristForm from './SvarfristForm';
import TidspunktForm from './TidspunktForm';
import { Heading } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';

const PraktiskeForhold = () => {
  const { control } = useFormContext();

  return (
    <div className='space-y-8'>
      <Heading level='2' size='medium'>
        Praktiske forhold
      </Heading>
      <TidspunktForm control={control} />
      <SvarfristForm control={control} />

      <StedForm control={control} />
    </div>
  );
};

export default PraktiskeForhold;
