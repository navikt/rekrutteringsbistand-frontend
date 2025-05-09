import ControlledDatePicker from './ControlledDatepicker';
import { Select } from '@navikt/ds-react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

const klokkeslett = Array.from({ length: 24 }, (_, h) =>
  [0, 15, 30, 45].map(
    (m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
  ),
).flat();

export default function Tidspunktrad({
  label,
  nameDato,
  nameTid,
}: {
  label: string;
  nameDato: string;
  nameTid: string;
}) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='flex gap-4 items-start'>
      <span className='w-10 pt-3'>{label}</span>

      <Controller
        name={nameDato}
        control={control}
        rules={{ required: 'Obligatorisk' }}
        render={({ field }) => (
          <ControlledDatePicker
            label={label}
            value={field.value}
            onChange={field.onChange}
            error={errors[nameDato] as FieldError | undefined}
          />
        )}
      />

      <Select
        {...register(nameTid, { required: 'Obligatorisk' })}
        hideLabel
        label='Tid'
        size='medium'
        className='h-[48px] min-w-[6rem]'
      >
        {klokkeslett.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </Select>
    </div>
  );
}
