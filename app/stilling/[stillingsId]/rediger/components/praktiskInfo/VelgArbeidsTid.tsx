import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../../redigerFormType.zod';

const VelgArbeidsTid: React.FC = () => {
  const { setValue, watch } = useFormContext<StillingsDataForm>();

  return (
    <div className='flex gap-16'>
      <CheckboxGroup
        legend='Arbeidsdager'
        defaultValue={watch('praktiskInfo.dager')}
        onChange={(val) => setValue('praktiskInfo.dager', val)}
      >
        <Checkbox value='Ukedager'>Ukedager</Checkbox>
        <Checkbox value='Lørdag'>Lørdag</Checkbox>
        <Checkbox value='Søndag'>Søndag</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup
        legend='Arbeidstid'
        onChange={(val) => setValue('praktiskInfo.tid', val)}
        defaultValue={watch('praktiskInfo.tid')}
      >
        <Checkbox value='Dagtid'>Dag</Checkbox>
        <Checkbox value='Kveld'>Kveld</Checkbox>
        <Checkbox value='Natt'>Natt</Checkbox>
      </CheckboxGroup>
    </div>
  );
};

export default VelgArbeidsTid;
