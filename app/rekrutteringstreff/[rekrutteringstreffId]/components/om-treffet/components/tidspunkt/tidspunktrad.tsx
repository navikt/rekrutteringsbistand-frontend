import ControlledDatePicker from './ControlledDatepicker';
import type { FormData, TidspunktFormFields } from './Tidspunkt';
import { Select } from '@navikt/ds-react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

const KLOKKESLETT_OPTIONS = Array.from({ length: 24 }, (_, h) =>
  [0, 15, 30, 45].map(
    (m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
  ),
).flat();

interface TidspunktradProps {
  label: string;
  nameDato: FieldPath<FormData>;
  nameTid: FieldPath<FormData>;
}

export default function Tidspunktrad({
  label,
  nameDato,
  nameTid,
}: TidspunktradProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const dateError = errors[nameDato] as FieldError | undefined;
  const timeError = errors[nameTid] as FieldError | undefined;

  return (
    <div className='flex gap-4 items-start'>
      <span className='w-10 pt-3'>{label}</span>{' '}
      <Controller
        name={nameDato}
        control={control}
        rules={{ required: 'Obligatorisk' }}
        render={({ field }) => (
          <ControlledDatePicker
            label={label}
            value={field.value as Date | null}
            onChange={field.onChange}
            error={dateError}
          />
        )}
      />
      <Controller
        name={nameTid}
        control={control}
        rules={{ required: 'Obligatorisk' }}
        render={({ field }) => (
          <Select
            {...field}
            label={`${label} tid`}
            hideLabel
            size='medium'
            className='h-[48px] min-w-[6rem]'
            error={timeError ? timeError.message || true : undefined}
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
