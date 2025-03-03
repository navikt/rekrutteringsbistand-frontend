import { FormidlingDataForm } from '../../../../../formidling/ny-formidling/redigerFormidlingFormType';
import { StillingsAnsettelsesform } from '../../../../stilling-typer';
import { StillingsDataForm } from '../../redigerFormType.zod';
import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface VelgAnsettelsesformProps {
  ansettelsesformFelt:
    | 'praktiskInfo.ansettelsesform'
    | 'omFormidlingen.ansettelsesform';
}

const VelgAnsettelsesform: React.FC<VelgAnsettelsesformProps> = ({
  ansettelsesformFelt,
}) => {
  const { control } = useFormContext<StillingsDataForm | FormidlingDataForm>();

  return (
    <div className='w-[18.75rem]'>
      <Controller
        name={ansettelsesformFelt}
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
