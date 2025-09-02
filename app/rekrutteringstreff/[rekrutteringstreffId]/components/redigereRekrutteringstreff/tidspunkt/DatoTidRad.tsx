'use client';

import ControlledDatePicker from './ControlledDatepicker';
import TimeInput from './TimeInput';
import { Controller, Path } from 'react-hook-form';

type Props<T extends Record<string, unknown>> = {
  label: string;
  nameDato: Path<T>;
  nameTid: Path<T>;
  control: any;
  disabledDato?: boolean;
  disabledTid?: boolean;
  onSave: () => void;
};

export default function DatoTidRad<T extends Record<string, unknown>>({
  label,
  nameDato,
  nameTid,
  control,
  disabledDato,
  disabledTid,
  onSave,
}: Props<T>) {
  return (
    <div className='flex gap-4 items-start'>
      <Controller
        name={nameDato}
        control={control}
        rules={{ required: 'Dato er obligatorisk' }}
        render={({ field, fieldState }) => (
          <ControlledDatePicker
            label={label}
            value={field.value as Date | null}
            onChange={(date) => field.onChange(date)}
            onBlur={onSave}
            error={fieldState.error}
            disabled={disabledDato}
          />
        )}
      />

      <Controller
        name={nameTid}
        control={control}
        rules={{ required: 'Tid er obligatorisk' }}
        render={({ field, fieldState }) => (
          <TimeInput
            value={field.value ?? ''}
            onChange={field.onChange}
            label={label ? 'Klokkeslett' : ' '}
            hideLabel={true}
            error={fieldState.error?.message}
            disabled={disabledTid}
            onBlur={() => {
              field.onBlur();
              onSave();
            }}
          />
        )}
      />
    </div>
  );
}
