import { Radio, RadioGroup } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../../redigerFormType.zod';

const VelgOmfang: React.FC = ({}) => {
  const { control } = useFormContext<StillingsDataForm>();
  return (
    <>
      <Controller
        control={control}
        name='praktiskInfo.omfang'
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            legend='Velg omfang'
            value={value}
            onChange={(e) => onChange(e)}
          >
            <Radio value=''>Fulltid</Radio>
            <Radio value=''>Deltid</Radio>
          </RadioGroup>
        )}
      />
    </>
  );
};

export default VelgOmfang;
