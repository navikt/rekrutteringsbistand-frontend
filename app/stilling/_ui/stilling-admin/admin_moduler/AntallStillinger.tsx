import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { TextField } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';

export default function AntallStillinger({ inline }: { inline?: boolean }) {
  const { control } = useFormContext<StillingsDataDTO>();
  const content = (
    <div className='w-[7.5rem]'>
      <Controller
        control={control}
        name='stilling.properties.positioncount'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label='Antall stillinger'
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue === '') {
                onChange(null);
              } else {
                const numValue = Number(inputValue);
                onChange(isNaN(numValue) ? null : numValue);
              }
            }}
            value={
              value === null || value === undefined || isNaN(Number(value))
                ? ''
                : String(value)
            }
            type='number'
            error={error?.message}
          />
        )}
      />
    </div>
  );
  if (inline) return content;
  return <RedigerBoks tittel='Antall stillinger'>{content}</RedigerBoks>;
}
