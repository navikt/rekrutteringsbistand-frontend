'use client';

import { useAutoAdjustEndTime } from './hooks/useAutoAdjustEndTime';
import { useFilteredTimeOptions } from './hooks/useFilteredTimeOptions';
import { useScheduledSave } from './hooks/useScheduledSave';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { useAutosave } from './useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { Heading } from '@navikt/ds-react';
import { format, parseISO } from 'date-fns';
import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export type SvarfristFormFields = {
  svarfristDato: Date | null;
  svarfristTid: string;
};

const toDate = (iso?: string | null) => (iso ? parseISO(iso) : null);
const toHHmm = (iso?: string | null) =>
  iso ? format(parseISO(iso), 'HH:mm') : '';

interface Props {
  control: any;
}

const SvarfristForm = ({ control }: Props) => {
  const { save } = useAutosave();
  const { setValue } = useFormContext();

  const [dato, tid] = useWatch({
    control,
    name: ['svarfristDato', 'svarfristTid'],
  });

  const [fraDato, fraTid] = useWatch({
    control,
    name: ['fraDato', 'fraTid'],
  });

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  // Bruk de nye hooks
  const { scheduleSave } = useScheduledSave(save, [
    'svarfristDato',
    'svarfristTid',
  ]);

  const { adjustEndTime } = useAutoAdjustEndTime(setValue, scheduleSave, -24); // 24 timer før

  const svarfristTimeOptions = useFilteredTimeOptions(
    dato,
    fraDato,
    fraTid,
    'before', // Svarfrist må være før starttid
    15,
  );

  // Last inn eksisterende svarfrist fra API
  useEffect(() => {
    if (!treff) return;
    if (!dato && treff.svarfrist) {
      setValue('svarfristDato', toDate(treff.svarfrist), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
    if (!tid && treff.svarfrist) {
      setValue('svarfristTid', toHHmm(treff.svarfrist), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [treff, dato, tid, setValue]);

  // Auto-juster svarfrist når starttidspunkt endres
  useEffect(() => {
    adjustEndTime(fraDato, fraTid, dato, tid, 'svarfristDato', 'svarfristTid');
  }, [fraDato, fraTid, dato, tid, adjustEndTime]);

  return (
    <div className='space-y-4'>
      <Heading level='3' size='small'>
        Svarfrist
      </Heading>
      <div className='ml-5'>
        <DatoTidRad<SvarfristFormFields>
          label=''
          nameDato='svarfristDato'
          nameTid='svarfristTid'
          control={control}
          dateTo={fraDato ?? undefined}
          timeOptions={svarfristTimeOptions}
          onDatoBlur={scheduleSave}
          onTidBlur={scheduleSave}
        />
      </div>
    </div>
  );
};

export default SvarfristForm;
