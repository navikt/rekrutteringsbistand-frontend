'use client';
import type { MøteoppsettFormValues } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/møteoppsettSkjema';
import { HStack, TextField } from '@navikt/ds-react';
import { FC } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<MøteoppsettFormValues>;
  errors: FieldErrors<MøteoppsettFormValues>;
}

const MøteoppsettFelter: FC<Props> = ({ register, errors }) => (
  <HStack gap='space-16' wrap>
    <TextField
      label='Starttidspunkt'
      type='time'
      error={errors.starttidspunkt?.message}
      className='w-full sm:w-48'
      {...register('starttidspunkt')}
    />
    <TextField
      label='Varighet per møte (min)'
      type='number'
      min={1}
      step={1}
      inputMode='numeric'
      error={errors.varighetPerMøteMinutter?.message}
      className='w-full sm:w-56'
      {...register('varighetPerMøteMinutter', { valueAsNumber: true })}
    />
  </HStack>
);

export default MøteoppsettFelter;
