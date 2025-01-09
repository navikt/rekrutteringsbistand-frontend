import { Radio, RadioGroup } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../../redigerFormType.zod';

const VelgSektor: React.FC = ({}) => {
  const { control } = useFormContext<StillingsDataForm>();
  return (
    <Controller
      control={control}
      name='praktiskInfo.sektor'
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          legend='VelgSektor'
          value={value}
          onChange={(e) => onChange(e)}
        >
          <Radio value='Privat'>Privat</Radio>
          <Radio value='Offentlig'>Offentlig</Radio>
        </RadioGroup>
      )}
    />
  );
};

export default VelgSektor;
