import { StillingsDataForm } from '../../redigerFormType.zod';
import { TextField } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const VelgAntallStillinger: React.FC = ({}) => {
  const { control } = useFormContext<StillingsDataForm>();
  return (
    <div className='w-[7.5rem]'>
      <Controller
        control={control}
        name='praktiskInfo.antallStillinger'
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
              value === null || value === undefined || isNaN(value)
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
};

export default VelgAntallStillinger;
