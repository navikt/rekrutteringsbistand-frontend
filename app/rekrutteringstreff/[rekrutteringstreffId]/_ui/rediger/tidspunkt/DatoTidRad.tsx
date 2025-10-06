'use client';

import ControlledDatePicker from './ControlledDatepicker';
import TimeInput, { KLOKKESLETT_OPTIONS } from './TimeInput';
import { BodyShort } from '@navikt/ds-react';
import { Controller, Path } from 'react-hook-form';

type Props<T extends Record<string, unknown>> = {
  label?: string;
  nameDato: Path<T>;
  nameTid: Path<T>;
  control: any;
  disabledDato?: boolean;
  disabledTid?: boolean;
  hideDato?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  timeOptions?: string[];
  onDatoBlur?: () => void;
  onTidBlur?: () => void;
  timeMax?: string;
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
}: Props<T>) {
  return (
    <div className='flex gap-4 items-start'>
      {label && (
        <div className='flex items-center min-w-fit mt-3'>
          <BodyShort size='small'>{label}</BodyShort>
        </div>
      )}

      {!hideDato && (
        <Controller
          name={nameDato}
          control={control}
          rules={{ required: 'Dato er obligatorisk' }}
          render={({ field, fieldState }) => (
            <ControlledDatePicker
              label={label ?? ''}
              value={field.value as Date | null}
              onChange={(date) => field.onChange(date)}
              onBlur={() => {
                field.onBlur();
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
          render={({ field }) => (
            <input
              type='hidden'
              value={field.value?.toISOString() || ''}
              onChange={() => {}}
            />
          )}
        />
      )}

      <Controller
        name={nameTid}
        control={control}
        rules={{ required: 'Tid er obligatorisk' }}
        render={({ field, fieldState }) => (
          <TimeInput
            value={field.value ?? ''}
            onChange={field.onChange}
            label='Klokkeslett'
            hideLabel={true}
            error={fieldState.error?.message}
            disabled={disabledTid}
            onBlur={() => {
              field.onBlur();
              onTidBlur?.();
            }}
            className='w-24'
            options={timeOptions ?? KLOKKESLETT_OPTIONS}
            maxTime={timeMax}
          />
        )}
      />
    </div>
  );
}
