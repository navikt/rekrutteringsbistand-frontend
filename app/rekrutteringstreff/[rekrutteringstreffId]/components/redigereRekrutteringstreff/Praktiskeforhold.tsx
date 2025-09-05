'use client';

import EndreInnlegg from './EndreInnlegg';
import StedForm from './StedForm';
import SvarfristForm from './SvarfristForm';
import TidspunktForm from './TidspunktForm';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { Heading } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';

const PraktiskeForhold = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { control } = useFormContext();

  return (
    <div className='space-y-8'>
      <Heading level='2' size='medium'>
        Praktiske forhold
      </Heading>
      <TidspunktForm
        control={control}
        rekrutteringstreffId={rekrutteringstreffId}
      />
      <StedForm control={control} rekrutteringstreffId={rekrutteringstreffId} />
      <EndreInnlegg onUpdated={() => {}} />
      <SvarfristForm control={control} />
    </div>
  );
};

export default PraktiskeForhold;
