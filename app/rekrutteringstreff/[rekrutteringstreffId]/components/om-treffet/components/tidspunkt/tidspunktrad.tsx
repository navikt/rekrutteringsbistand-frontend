import ControlledDatePicker from './ControlledDatepicker';
import type { FormData, TidspunktFormFields } from './Tidspunkt';
import { Select } from '@navikt/ds-react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

// Definer utenfor komponenten for å unngå regenerering ved hver render
const KLOKKESLETT_OPTIONS = Array.from({ length: 24 }, (_, h) =>
  [0, 15, 30, 45].map(
    (m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
  ),
).flat();

interface TidspunktradProps {
  label: string;
  nameDato: keyof TidspunktFormFields;
  nameTid: keyof TidspunktFormFields;
}

export default function Tidspunktrad({
  label,
  nameDato,
  nameTid,
}: TidspunktradProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormData>(); // Spesifiser FormData for bedre typeinferens på errors

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
            value={field.value as Date | null} // ControlledDatePicker forventer Date | null
            onChange={field.onChange}
            error={errors[nameDato] as FieldError | undefined} // ControlledDatePicker forventer FieldError | undefined
          />
        )}
      />

      <Select
        {...register(nameTid, { required: 'Obligatorisk' })}
        hideLabel
        label='Tid'
        size='medium'
        className='h-[48px] min-w-[6rem]'
        error={errors[nameTid]?.message} // Select forventer string | undefined for error message
      >
        {KLOKKESLETT_OPTIONS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>
    </div>
  );
}
