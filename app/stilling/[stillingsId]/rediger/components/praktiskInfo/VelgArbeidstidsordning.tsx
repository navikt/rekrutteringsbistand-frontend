import { FormidlingDataForm } from '../../../../../etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { StillingsArbeidstidsordning } from '../../../../stilling-typer';
import { StillingsDataForm } from '../../redigerFormType.zod';
import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface VelgArbeidstidsordningProps {
  arbeidstidsordningFelt:
    | 'praktiskInfo.arbeidstidsordning'
    | 'omFormidlingen.arbeidstidsordning';
}

const VelgArbeidstidsordning: React.FC<VelgArbeidstidsordningProps> = ({
  arbeidstidsordningFelt,
}) => {
  const { control } = useFormContext<StillingsDataForm | FormidlingDataForm>();

  return (
    <div className='w-[18.75rem]'>
      <Controller
        name={arbeidstidsordningFelt}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Select
            value={field.value ?? ''}
            onChange={(val) => field.onChange(val)}
            label='Arbeidstidsordning (valgfritt)'
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
