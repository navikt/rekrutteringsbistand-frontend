import { Radio, RadioGroup } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormidlingDataForm } from '../../../../../formidling/ny-formidling/redigerFormidlingFormType';
import { StillingsDataForm } from '../../redigerFormType.zod';

interface VelgSektorProps {
  sektorFelt: 'praktiskInfo.sektor' | 'omFormidlingen.sektor';
}

const VelgSektor: React.FC<VelgSektorProps> = ({ sektorFelt }) => {
  const { control } = useFormContext<StillingsDataForm | FormidlingDataForm>();
  return (
    <Controller
      control={control}
      name={sektorFelt}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <RadioGroup
          legend='Velg sektor'
          value={value || ''}
          onChange={(e) => onChange(e)}
          error={error?.message}
        >
          <Radio value='Privat'>Privat</Radio>
          <Radio value='Offentlig'>Offentlig</Radio>
        </RadioGroup>
      )}
    />
  );
};

export default VelgSektor;
