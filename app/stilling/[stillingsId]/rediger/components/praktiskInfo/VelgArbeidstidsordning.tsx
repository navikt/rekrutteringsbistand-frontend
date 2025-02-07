import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StillingsArbeidstidsordning } from '../../../../stilling-typer';
import { StillingsDataForm } from '../../redigerFormType.zod';

const VelgArbeidstidsordning: React.FC = ({}) => {
  const { control } = useFormContext<StillingsDataForm>();

  return (
    <div className='w-[18.75rem]'>
      <Controller
        name='praktiskInfo.arbeidstidsordning'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Select
            value={field.value ?? ''}
            onChange={(val) => field.onChange(val)}
            label='Arbeidstidsordning'
            error={error?.message}
          >
            {Object.entries(StillingsArbeidstidsordning).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </Select>
        )}
      />
    </div>
  );
};

export default VelgArbeidstidsordning;
