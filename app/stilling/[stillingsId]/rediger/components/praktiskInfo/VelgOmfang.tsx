import { Radio, RadioGroup, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../../redigerFormType.zod';

const VelgOmfang: React.FC = ({}) => {
  const { control, watch } = useFormContext<StillingsDataForm>();
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Controller
        control={control}
        name='praktiskInfo.omfangKode'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <RadioGroup
            legend='Velg omfang'
            value={value}
            onChange={(e) => onChange(e)}
            error={error?.message}
          >
            <Radio value='Heltid'>Heltid (100%)</Radio>
            <Radio value='Deltid'>Deltid</Radio>
          </RadioGroup>
        )}
      />

      {watch('praktiskInfo.omfangKode') === 'Deltid' && (
        <Controller
          control={control}
          name='praktiskInfo.omfangProsent'
          render={({ field: { onChange, value } }) => (
            <TextField
              className='w-[50%]'
              label='Omfang i prosent for deltid'
              description='Må fylles inn.'
            />
          )}
        />
      )}
    </div>
  );
};

export default VelgOmfang;
