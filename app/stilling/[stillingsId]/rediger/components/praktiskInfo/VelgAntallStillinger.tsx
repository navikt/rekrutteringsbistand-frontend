import { TextField } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../../redigerFormType.zod';

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
            onChange={(e) => onChange(Number(e.target.value))}
            value={value}
            type='number'
            error={error?.message}
          />
        )}
      />
    </div>
  );
};

export default VelgAntallStillinger;
