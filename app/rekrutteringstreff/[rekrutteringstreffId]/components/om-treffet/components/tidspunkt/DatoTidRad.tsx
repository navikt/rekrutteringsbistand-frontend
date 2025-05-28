import ControlledDatePicker from './ControlledDatepicker';
import { Select } from '@navikt/ds-react';
import { Controller, Path, useFormContext } from 'react-hook-form';

const KLOKKESLETT_OPTIONS = [...Array(24)].flatMap((_, h) =>
  [0, 15, 30, 45].map(
    (m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
  ),
);

type Props<T extends Record<string, unknown>> = {
  label: string;
  nameDato: Path<T>;
  nameTid: Path<T>;
};

export default function DatoTidRad<T extends Record<string, unknown>>({
  label,
  nameDato,
  nameTid,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <div className='flex gap-4 items-start  justify-end'>
      <span className='w-10 pt-3'>{label}</span>

      <Controller
        name={nameDato}
        control={control}
        rules={{ required: 'Obligatorisk' }}
        render={({ field, fieldState }) => (
          <ControlledDatePicker
            label={label}
            value={field.value as Date | null}
            onChange={field.onChange}
            error={fieldState.error}
          />
        )}
      />

      <Controller
        name={nameTid}
        control={control}
        rules={{ required: 'Obligatorisk' }}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            hideLabel
            label={`${label} tid`}
            size='medium'
            className='h-[48px] min-w-[6rem]'
            error={fieldState.invalid}
            value={field.value as string}
          >
            {KLOKKESLETT_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        )}
      />
    </div>
  );
}
