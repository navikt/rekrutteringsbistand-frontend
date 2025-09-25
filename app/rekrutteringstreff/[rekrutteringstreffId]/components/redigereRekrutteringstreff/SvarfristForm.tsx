'use client';

import { useAutoAdjustEndTime } from './hooks/useAutoAdjustEndTime';
import { useFilteredTimeOptions } from './hooks/useFilteredTimeOptions';
import { useScheduledSave } from './hooks/useScheduledSave';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { isGyldigTid, kombinerDatoOgTid } from './tidspunkt/utils';
import { useAutosave } from './useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { Heading } from '@navikt/ds-react';
import { format, parseISO, addMinutes, isSameDay } from 'date-fns';
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

  const { adjustEndTime } = useAutoAdjustEndTime(
    setValue,
    scheduleSave,
    -24, // 24 timer før
  );

  const svarfristTimeOptions = useFilteredTimeOptions(
    dato,
    fraDato,
    fraTid,
    -15, // 15 min før starttid
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
  }, [fraDato, fraTid, adjustEndTime]);

  // Juster til siste mulige kvarter hvis bruker velger samme dag og ugyldig tid
  useEffect(() => {
    if (!dato || !fraDato || !isGyldigTid(fraTid) || !isSameDay(dato, fraDato))
      return;

    const startTs = kombinerDatoOgTid(fraDato, fraTid);
    const currentTs = isGyldigTid(tid) ? kombinerDatoOgTid(dato, tid) : null;

    if (!startTs) return;

    // Hvis current tid er lik eller etter starttid, sett til 15 min før starttid
    if (currentTs && currentTs.getTime() >= startTs.getTime()) {
      const nyTs = addMinutes(startTs, -15);
      const nyTid = format(nyTs, 'HH:mm');

      if (nyTid !== tid) {
        setValue('svarfristTid', nyTid, {
          shouldDirty: true,
          shouldValidate: false,
        });
        scheduleSave();
      }
    }
  }, [dato, fraDato, fraTid, tid, setValue, scheduleSave]);

  return (
    <div className='space-y-4'>
      <Heading level='3' size='small'>
        Svarfrist
      </Heading>
      <div>
        <DatoTidRad<SvarfristFormFields>
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
