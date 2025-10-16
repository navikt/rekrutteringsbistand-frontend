'use client';

import { useAutosaveRekrutteringstreff } from './hooks/kladd/useAutosave';
import { useAutoAdjustEndTime } from './hooks/useAutoAdjustEndTime';
import { useFilteredTimeOptions } from './hooks/useFilteredTimeOptions';
import { useScheduledSave } from './hooks/useScheduledSave';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { rekrutteringstreffVarighet } from './tidspunkt/varighet';
import { BodyShort, Heading } from '@navikt/ds-react';
import { isSameDay } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type TidspunktFormFields = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
};

interface Props {
  control: any;
}

const TidspunktForm = ({ control }: Props) => {
  const { setValue } = useFormContext();
  const { autosave } = useAutosaveRekrutteringstreff();

  const [fraDato, fraTid, tilDato, tilTid] = useWatch({
    control,
    name: ['fraDato', 'fraTid', 'tilDato', 'tilTid'],
  });

  const [flereDager, setFlereDager] = useState(
    fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false,
  );

  // Bruk nye hooks
  const { scheduleSave } = useScheduledSave(autosave, [
    'fraDato',
    'fraTid',
    'tilDato',
    'tilTid',
    'svarfristDato',
    'svarfristTid',
  ]);

  const { adjustEndTime } = useAutoAdjustEndTime(setValue, scheduleSave, 1);

  const tilTimeOptions = useFilteredTimeOptions(
    tilDato ?? fraDato,
    fraDato,
    fraTid,
    1, // minst 1 minutt etter fra-tid
  );

  useEffect(() => {
    const computed = fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false;
    setFlereDager((prev) => (prev === computed ? prev : computed));
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
      <div className='flex justify-between items-center'>
        <Heading level='3' size='small'>
          Tid
        </Heading>
      </div>

      <div className='flex flex-col lg:flex-row gap-4'>
        <DatoTidRad<TidspunktFormFields>
          nameDato='fraDato'
          nameTid='fraTid'
          control={control}
          onDatoBlur={scheduleSave}
          onTidBlur={scheduleSave}
          timeMax='22:59'
        />

        <DatoTidRad<TidspunktFormFields>
          label='Til'
          nameDato='tilDato'
          nameTid='tilTid'
          control={control}
          hideDato={!flereDager}
          dateFrom={fraDato ?? undefined}
          timeOptions={tilTimeOptions}
          onDatoBlur={scheduleSave}
          onTidBlur={scheduleSave}
        />

        <BodyShort size='small' className='mt-3'>
          {varighet || 'Velg tid'}
        </BodyShort>
      </div>
    </div>
  );
};

export default TidspunktForm;
