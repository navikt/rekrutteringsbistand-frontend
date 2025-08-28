import { StillingsDataForm } from '@/app/stilling/[stillingsId]/rediger-old/redigerFormType.zod';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const VelgArbeidsTid: React.FC = () => {
  const { control } = useFormContext<StillingsDataForm>();

  return (
    <div className='flex flex-col gap-8'>
      <Controller
        control={control}
        name='praktiskInfo.dager'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CheckboxGroup
            legend='Arbeidsdager'
            defaultValue={value}
            onChange={(val) => onChange(val)}
            error={error?.message}
          >
            <Checkbox value='Ukedager'>Ukedager</Checkbox>
            <Checkbox value='Lørdag'>Lørdag</Checkbox>
            <Checkbox value='Søndag'>Søndag</Checkbox>
          </CheckboxGroup>
        )}
      />

      <Controller
        control={control}
        name='praktiskInfo.tid'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CheckboxGroup
            legend='Arbeidstid'
            onChange={(val) => onChange(val)}
            defaultValue={value}
            error={error?.message}
          >
            <Checkbox value='Dagtid'>Dag</Checkbox>
            <Checkbox value='Kveld'>Kveld</Checkbox>
            <Checkbox value='Natt'>Natt</Checkbox>
          </CheckboxGroup>
        )}
      />
    </div>
  );
};

export default VelgArbeidsTid;
