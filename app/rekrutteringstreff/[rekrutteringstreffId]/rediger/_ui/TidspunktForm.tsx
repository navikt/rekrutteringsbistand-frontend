'use client';

import { RekrutteringstreffFormValues } from './RekrutteringstreffForm';
import { useAutoAdjustEndTime } from './hooks/useAutoAdjustEndTime';
import { useFilteredTimeOptions } from './hooks/useFilteredTimeOptions';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { rekrutteringstreffVarighet } from './tidspunkt/varighet';
import { BodyShort, Heading } from '@navikt/ds-react';
import { isSameDay } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
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

  const [flereDager, setFlereDager] = useState(
    fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false,
  );

  const { adjustEndTime } = useAutoAdjustEndTime(setValue, undefined, 1);

  const tilTimeOptions = useFilteredTimeOptions(
    tilDato ?? fraDato,
    fraDato,
    fraTid,
    1, // minst 1 minutt etter fra-tid
  );

  useEffect(() => {
    const computed = fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false;
    const timer = setTimeout(() => {
      setFlereDager((prev) => (prev === computed ? prev : computed));
    }, 0);

    return () => clearTimeout(timer);
  }, [fraDato, tilDato]);

  // Auto-juster sluttidspunkt når startidspunkt endres
  useEffect(() => {
    adjustEndTime(fraDato, fraTid, tilDato, tilTid, 'tilDato', 'tilTid');
  }, [fraDato, fraTid, tilDato, tilTid, adjustEndTime]);

  const varighet = useMemo(() => {
    if (!fraDato || !fraTid || !tilTid) return '';
    const sluttDato = (tilDato as Date | null) ?? fraDato;
    return rekrutteringstreffVarighet(fraDato, fraTid, sluttDato, tilTid);
  }, [fraDato, fraTid, tilDato, tilTid]);

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
          hideDato={!flereDager}
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
