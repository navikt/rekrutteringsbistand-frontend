'use client';
import type { MøteoppsettSkjemaverdier } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/møteoppsettSkjema';
import { HStack, TextField } from '@navikt/ds-react';
import { FC } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<MøteoppsettSkjemaverdier>;
  errors: FieldErrors<MøteoppsettSkjemaverdier>;
  deaktivert?: boolean;
}

const MøteoppsettFelter: FC<Props> = ({ register, errors, deaktivert }) => (
  <HStack gap='space-16' wrap>
    <TextField
      label='Starttidspunkt'
      type='time'
      disabled={deaktivert}
      error={errors.starttidspunkt?.message}
      className='w-full sm:w-48'
      {...register('starttidspunkt')}
    />
    <TextField
      label='Varighet per møte (min)'
      type='number'
      disabled={deaktivert}
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
