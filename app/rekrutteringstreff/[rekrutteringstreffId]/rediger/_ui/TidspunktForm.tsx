'use client';

import { RekrutteringstreffFormValues } from './RekrutteringstreffForm';
import { useAutoAdjustEndTime } from './hooks/useAutoAdjustEndTime';
import { useFilteredTimeOptions } from './hooks/useFilteredTimeOptions';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { rekrutteringstreffVarighet } from './tidspunkt/varighet';
import { BodyShort, Heading } from '@navikt/ds-react';
import { useEffect, useMemo } from 'react';
import { Control, useFormContext, useWatch } from 'react-hook-form';

interface Props {
  control: Control<RekrutteringstreffFormValues>;
}

const TidspunktForm = ({ control }: Props) => {
  const { setValue } = useFormContext();

  const [fraDato, fraTid, tilDato, tilTid] = useWatch({
    control,
    name: ['fraDato', 'fraTid', 'tilDato', 'tilTid'],
  });

  const { adjustEndTime } = useAutoAdjustEndTime(setValue, 1);

  const tilTimeOptions = useFilteredTimeOptions(fraDato, fraDato, fraTid, 1);

  useEffect(() => {
    if (fraDato && (!tilDato || fraDato.getTime() !== tilDato.getTime())) {
      setValue('tilDato', fraDato);
    }
  }, [fraDato, tilDato, setValue]);

  useEffect(() => {
    adjustEndTime(fraDato, fraTid, tilDato, tilTid, 'tilDato', 'tilTid');
  }, [fraDato, fraTid, tilDato, tilTid, adjustEndTime]);

  const varighet = useMemo(() => {
    if (!fraDato || !fraTid || !tilTid) return '';
    return rekrutteringstreffVarighet(fraDato, fraTid, fraDato, tilTid);
  }, [fraDato, fraTid, tilTid]);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Heading level='3' size='small'>
          Tid
        </Heading>
      </div>

      <div className='flex flex-col gap-4 lg:flex-row'>
        <DatoTidRad<RekrutteringstreffFormValues>
          nameDato='fraDato'
          nameTid='fraTid'
          control={control}
          timeMax='22:59'
        />

        <DatoTidRad<RekrutteringstreffFormValues>
          label='Til'
          nameDato='tilDato'
          nameTid='tilTid'
          control={control}
          hideDato={true}
          dateFrom={fraDato ?? undefined}
          timeOptions={tilTimeOptions}
        />

        <BodyShort size='small' className='mt-3'>
          {varighet || 'Velg tid'}
        </BodyShort>
      </div>
    </div>
  );
};

export default TidspunktForm;
