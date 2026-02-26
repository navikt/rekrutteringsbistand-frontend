'use client';

import ControlledDatePicker from './ControlledDatepicker';
import TimeInput, { KLOKKESLETT_OPTIONS } from './TimeInput';
import { datoErIFortiden, tidspunktErIFortiden } from '@/util/dato';
import { BodyShort, ErrorMessage } from '@navikt/ds-react';
import { startOfDay } from 'date-fns';
import { useEffect } from 'react';
import {
  Control,
  Controller,
  Path,
  useFormContext,
  useWatch,
} from 'react-hook-form';

type Props<T extends Record<string, unknown>> = {
  label?: string;
  nameDato: Path<T>;
  nameTid: Path<T>;
  control: Control<T>;
  disabledDato?: boolean;
  disabledTid?: boolean;
  hideDato?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  timeOptions?: string[];
  onDatoBlur?: () => void;
  onTidBlur?: () => void;
  timeMax?: string;
  validerFortid?: boolean;
};

export default function DatoTidRad<T extends Record<string, unknown>>({
  label,
  nameDato,
  nameTid,
  control,
  disabledDato,
  disabledTid,
  hideDato,
  dateFrom,
  dateTo,
  timeOptions,
  onDatoBlur,
  onTidBlur,
  timeMax,
  validerFortid = true,
}: Props<T>) {
  const { trigger, watch } = useFormContext();

  const datoVerdi = useWatch({ control, name: nameDato });
  const tidVerdi = useWatch({ control, name: nameTid });

  useEffect(() => {
    if (validerFortid && datoVerdi && tidVerdi) {
      void trigger(nameTid);
    }
  }, [validerFortid, datoVerdi, tidVerdi, trigger, nameTid]);

  const validerTidIkkeTilbake = (tid: unknown) => {
    if (!validerFortid) return true;
    if (typeof tid !== 'string' || !tid) return true;
    const dato = watch(nameDato) as Date | null | undefined;
    if (!dato) return true;
    return tidspunktErIFortiden(dato, tid)
      ? 'Klokkeslett kan ikke være tilbake i tid'
      : true;
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-start gap-4'>
        {label && (
          <div className='mt-3 flex min-w-fit items-center'>
            <BodyShort size='small'>{label}</BodyShort>
          </div>
        )}

        {!hideDato && (
          <Controller
            name={nameDato}
            control={control}
            rules={{
              required: 'Dato er obligatorisk',
              validate: validerFortid
                ? (value) => {
                    const d = value as Date | null;
                    if (!d) return true;
                    if (dateFrom && startOfDay(d) < startOfDay(dateFrom))
                      return 'Dato kan ikke være tilbake i tid';
                    if (datoErIFortiden(d))
                      return 'Dato kan ikke være tilbake i tid';
                    return true;
                  }
                : undefined,
            }}
            render={({ field, fieldState }) => (
              <ControlledDatePicker
                label={label ?? ''}
                value={field.value as Date | null}
                onChange={(date) => {
                  field.onChange(date);
                  void trigger(nameDato);
                  void trigger(nameTid);
                }}
                onBlur={() => {
                  field.onBlur();
                  void trigger(nameDato);
                  void trigger(nameTid);
                  onDatoBlur?.();
                }}
                error={fieldState.error}
                disabled={disabledDato}
                from={dateFrom}
                to={dateTo}
              />
            )}
          />
        )}

        {hideDato && (
          <Controller
            name={nameDato}
            control={control}
            render={({ field }) => {
              const v = field.value as Date | null | undefined;
              return (
                <input
                  type='hidden'
                  value={v instanceof Date ? v.toISOString() : ''}
                  onChange={() => {}}
                />
              );
            }}
          />
        )}

        <Controller
          name={nameTid}
          control={control}
          rules={{
            required: 'Tid er obligatorisk',
            validate: validerTidIkkeTilbake,
          }}
          render={({ field, fieldState }) => {
            const tidValue = typeof field.value === 'string' ? field.value : '';
            return (
              <TimeInput
                value={tidValue}
                onChange={(val) => {
                  field.onChange(val);
                  void trigger(nameTid);
                }}
                label='Klokkeslett'
                hideLabel={true}
                error={!!fieldState.error}
                disabled={disabledTid}
                onBlur={() => {
                  field.onBlur();
                  void trigger(nameTid);
                  onTidBlur?.();
                }}
                className='w-24'
                options={timeOptions ?? KLOKKESLETT_OPTIONS}
                maxTime={timeMax}
              />
            );
          }}
        />
      </div>
      {typeof tidVerdi === 'string' &&
        tidVerdi &&
        validerTidIkkeTilbake(tidVerdi) !== true && (
          <ErrorMessage showIcon className='mt-4'>
            {validerTidIkkeTilbake(tidVerdi) as string}
          </ErrorMessage>
        )}
    </div>
  );
}
