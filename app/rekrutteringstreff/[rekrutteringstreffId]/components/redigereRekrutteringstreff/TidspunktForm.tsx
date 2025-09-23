'use client';

import DatoTidRad from './tidspunkt/DatoTidRad';
import { KLOKKESLETT_OPTIONS } from './tidspunkt/TimeInput';
import { isGyldigTid, kombinerDatoOgTid } from './tidspunkt/utils';
import { rekrutteringstreffVarighet } from './tidspunkt/varighet';
import { useAutosave } from './useAutosave';
import { BodyShort, Heading, Switch } from '@navikt/ds-react';
import { addHours, addMinutes, format, isSameDay, startOfDay } from 'date-fns';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type TidspunktFormFields = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
};

const TidspunktForm = ({ control }: any) => {
  const { setValue } = useFormContext();

  const { save } = useAutosave();

  const [fraDato, fraTid, tilDato, tilTid] = useWatch({
    control,
    name: ['fraDato', 'fraTid', 'tilDato', 'tilTid'],
  });

  const [flereDager, setFlereDager] = useState(
    fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false,
  );

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const scheduleSave = useCallback(() => {
    const run = () =>
      save([
        'fraDato',
        'fraTid',
        'tilDato',
        'tilTid',
        'svarfristDato',
        'svarfristTid',
      ]);

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

  useEffect(() => {
    const computed = fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false;
    setFlereDager((prev) => (prev === computed ? prev : computed));
  }, [fraDato, tilDato]);

  useEffect(() => {
    if (!fraDato || !isGyldigTid(fraTid)) return;

    const startTidspunkt = kombinerDatoOgTid(fraDato, fraTid);
    if (!startTidspunkt) return;

    const sluttDato = tilDato ?? fraDato;
    const sluttTidspunkt = kombinerDatoOgTid(sluttDato, tilTid);
    if (sluttTidspunkt && sluttTidspunkt.getTime() > startTidspunkt.getTime()) {
      return;
    }

    const nyttSlutt = addHours(startTidspunkt, 1);
    const nyDato = startOfDay(nyttSlutt);
    const nyTid = format(nyttSlutt, 'HH:mm');

    let oppdatert = false;

    if (!tilDato || startOfDay(tilDato).getTime() !== nyDato.getTime()) {
      setValue('tilDato', nyDato, {
        shouldDirty: true,
        shouldValidate: false,
      });
      oppdatert = true;
    }
    if (tilTid !== nyTid) {
      setValue('tilTid', nyTid, {
        shouldDirty: true,
        shouldValidate: false,
      });
      oppdatert = true;
    }

    if (oppdatert) {
      scheduleSave();
    }
  }, [fraDato, fraTid, tilDato, tilTid, setValue, scheduleSave]);

  const tilTimeOptions = useMemo(() => {
    if (!fraDato || !isGyldigTid(fraTid)) {
      return KLOKKESLETT_OPTIONS;
    }

    const sluttDato = tilDato ?? fraDato;
    if (!sluttDato || !isSameDay(fraDato, sluttDato)) {
      return KLOKKESLETT_OPTIONS;
    }

    const startTidspunkt = kombinerDatoOgTid(fraDato, fraTid);
    if (!startTidspunkt) {
      return KLOKKESLETT_OPTIONS;
    }

    const tidligsteSluttSammeDag = addMinutes(startTidspunkt, 15);
    if (!isSameDay(startTidspunkt, tidligsteSluttSammeDag)) {
      return [];
    }

    const minTimestamp = tidligsteSluttSammeDag.getTime();

    return KLOKKESLETT_OPTIONS.filter((option) => {
      const kandidat = kombinerDatoOgTid(sluttDato, option);
      if (!kandidat) return false;
      return kandidat.getTime() >= minTimestamp;
    });
  }, [fraDato, fraTid, tilDato]);

  const varighet = useMemo(() => {
    if (!fraDato || !fraTid || !tilTid) return '';
    const sluttDato = (tilDato as Date | null) ?? fraDato;
    return rekrutteringstreffVarighet(fraDato, fraTid, sluttDato, tilTid);
  }, [fraDato, fraTid, tilDato, tilTid]);

  const handleToggleFlereDager = () => {
    const next = !flereDager;
    setFlereDager(next);

    if (!next && fraDato) {
      const målDato = startOfDay(fraDato);
      const aktuellTilDato = tilDato ? startOfDay(tilDato) : null;
      if (!aktuellTilDato || aktuellTilDato.getTime() !== målDato.getTime()) {
        setValue('tilDato', målDato, {
          shouldDirty: true,
          shouldValidate: false,
        });
        scheduleSave();
      }
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <Heading level='3' size='small'>
          Tid
        </Heading>
        <Switch checked={flereDager} onChange={handleToggleFlereDager}>
          Flere dager
        </Switch>
      </div>

      <div className='flex flex-col lg:flex-row gap-4'>
        <DatoTidRad<TidspunktFormFields>
          label='Fra'
          nameDato='fraDato'
          nameTid='fraTid'
          control={control}
          onDatoBlur={scheduleSave}
          onTidBlur={scheduleSave}
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
      </div>

      <BodyShort size='small' className='mt-2'>
        {varighet || 'Velg tid'}
      </BodyShort>
    </div>
  );
};

export default TidspunktForm;
