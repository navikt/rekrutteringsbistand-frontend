'use client';

import DatoTidRad from './tidspunkt/DatoTidRad';
import { KLOKKESLETT_OPTIONS } from './tidspunkt/TimeInput';
import { isGyldigTid, kombinerDatoOgTid } from './tidspunkt/utils';
import { useAutosave } from './useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { Heading } from '@navikt/ds-react';
import {
  addHours,
  format,
  isSameDay,
  parseISO,
  startOfDay,
  subMinutes,
} from 'date-fns';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const scheduleSave = useCallback(() => {
    const run = () => save(['svarfristDato', 'svarfristTid']);

    if (typeof window === 'undefined') {
      void run();
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveTimeoutRef.current = null;
      void run();
    }, 0);
  }, [save]);

  const svarfristTimeOptions = useMemo(() => {
    if (!dato || !fraDato || !isGyldigTid(fraTid)) {
      return KLOKKESLETT_OPTIONS;
    }

    if (!isSameDay(dato, fraDato)) {
      return KLOKKESLETT_OPTIONS;
    }

    const startTidspunkt = kombinerDatoOgTid(fraDato, fraTid);
    if (!startTidspunkt) {
      return KLOKKESLETT_OPTIONS;
    }

    const senesteSvarfristSammeDag = subMinutes(startTidspunkt, 15);
    if (!isSameDay(startTidspunkt, senesteSvarfristSammeDag)) {
      return [];
    }

    const maksTimestamp = senesteSvarfristSammeDag.getTime();

    return KLOKKESLETT_OPTIONS.filter((option) => {
      const kandidat = kombinerDatoOgTid(dato, option);
      if (!kandidat) return false;
      return kandidat.getTime() <= maksTimestamp;
    });
  }, [dato, fraDato, fraTid]);

  useEffect(() => {
    if (!fraDato || !isGyldigTid(fraTid)) return;

    const startTidspunkt = kombinerDatoOgTid(fraDato, fraTid);
    if (!startTidspunkt) return;

    const nåværendeSvarfrist = kombinerDatoOgTid(dato, tid ?? null);
    if (
      nåværendeSvarfrist &&
      nåværendeSvarfrist.getTime() < startTidspunkt.getTime()
    ) {
      return;
    }

    const foreslåttSvarfrist = addHours(startTidspunkt, -24);
    const nyDato = startOfDay(foreslåttSvarfrist);
    const nyTid = format(foreslåttSvarfrist, 'HH:mm');

    let oppdatert = false;

    if (!dato || startOfDay(dato).getTime() !== nyDato.getTime()) {
      setValue('svarfristDato', nyDato, {
        shouldDirty: true,
        shouldValidate: false,
      });
      oppdatert = true;
    }

    if (tid !== nyTid) {
      setValue('svarfristTid', nyTid, {
        shouldDirty: true,
        shouldValidate: false,
      });
      oppdatert = true;
    }

    if (oppdatert) {
      scheduleSave();
    }
  }, [dato, tid, fraDato, fraTid, setValue, scheduleSave]);

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
