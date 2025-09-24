'use client';

import { useAutoAdjustEndTime } from './hooks/useAutoAdjustEndTime';
import { useFilteredTimeOptions } from './hooks/useFilteredTimeOptions';
import { useScheduledSave } from './hooks/useScheduledSave';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { rekrutteringstreffVarighet } from './tidspunkt/varighet';
import { useAutosave } from './useAutosave';
import { BodyShort, Heading, Switch } from '@navikt/ds-react';
import { isSameDay, startOfDay } from 'date-fns';
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
  const { save } = useAutosave();

  const [fraDato, fraTid, tilDato, tilTid] = useWatch({
    control,
    name: ['fraDato', 'fraTid', 'tilDato', 'tilTid'],
  });

  const [flereDager, setFlereDager] = useState(
    fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false,
  );

  // Bruk de nye hooks
  const { scheduleSave } = useScheduledSave(save, [
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
    15, // 15 min etter fra-tid
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

  const skalViseTilFelt = fraDato && !!fraTid;

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

        {skalViseTilFelt && (
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
        )}
      </div>

      <BodyShort size='small' className='mt-2'>
        {varighet || 'Velg tid'}
      </BodyShort>
    </div>
  );
};

export default TidspunktForm;
