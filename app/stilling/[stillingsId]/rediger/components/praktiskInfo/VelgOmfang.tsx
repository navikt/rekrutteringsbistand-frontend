import { FormidlingDataForm } from '../../../../../etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { StillingsDataForm } from '../../redigerFormType.zod';
import { ErrorMessage, Radio, RadioGroup, Select } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface VelgOmfangProps {
  omfangFelt: 'praktiskInfo.omfangKode' | 'omFormidlingen.omfangKode';
  omfangProsentFelt:
    | 'praktiskInfo.omfangProsent'
    | 'omFormidlingen.omfangProsent';
}

const VelgOmfang: React.FC<VelgOmfangProps> = ({
  omfangFelt,
  omfangProsentFelt,
}) => {
  const { control, watch } = useFormContext<
    StillingsDataForm | FormidlingDataForm
  >();

  return (
    <div className='flex flex-col gap-4'>
      <Controller
        control={control}
        name={omfangFelt}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <RadioGroup
            error={error?.message}
            legend='Velg omfang'
            value={value ?? ''}
            onChange={(e) => onChange(e)}
          >
            <Radio value='Heltid'>Heltid (100%)</Radio>
            <Radio value='Deltid'>Deltid</Radio>
          </RadioGroup>
        )}
      />

      {watch(omfangFelt) === 'Deltid' && (
        <Controller
          control={control}
          name={omfangProsentFelt}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                className='w-[300px]'
                label='Velg omfang prosent'
                value={value ?? undefined}
                onChange={(e) => onChange(e.target.value)}
              >
                <option value=''>Velg omfang prosent</option>
                <option value='10%'>10%</option>
                <option value='20%'>20%</option>
                <option value='30%'>30%</option>
                <option value='40%'>40%</option>
                <option value='50%'>50%</option>
                <option value='60%'>60%</option>
                <option value='70%'>70%</option>
                <option value='80%'>80%</option>
                <option value='90%'>90%</option>
              </Select>
              {error?.message && <ErrorMessage>{error?.message}</ErrorMessage>}
            </>
          )}
        />
      )}
    </div>
  );
};

export default VelgOmfang;
