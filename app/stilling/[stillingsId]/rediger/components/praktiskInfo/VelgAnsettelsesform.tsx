import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StillingsAnsettelsesform } from '../../../../stilling-typer';
import { StillingsDataForm } from '../../redigerFormType.zod';

const VelgAnsettelsesform: React.FC = ({}) => {
  const { control } = useFormContext<StillingsDataForm>();

  return (
    <div className='w-[18.75rem]'>
      <Controller
        name='praktiskInfo.ansettelsesform'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Select
            value={field.value ?? ''}
            onChange={(val) => field.onChange(val)}
            label='Ansettelsesform'
            error={error?.message}
          >
            {Object.entries(StillingsAnsettelsesform).map(([key, value]) => (
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

export default VelgAnsettelsesform;
