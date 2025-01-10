import { Checkbox, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../../redigerFormType.zod';
import { DatoVelger } from '../DatoVelger';

export interface VelgOppstartOgFristProps {
  skjulFrist?: boolean;
}

const VelgOppstartOgFrist: React.FC<VelgOppstartOgFristProps> = ({
  skjulFrist,
}) => {
  const { watch, control } = useFormContext<StillingsDataForm>();

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='flex flex-col'>
        <Heading size='small'>Oppstart</Heading>
        <Controller
          name='praktiskInfo.oppstartSnarest'
          control={control}
          render={({ field }) => (
            <>
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              >
                Etter avtale
              </Checkbox>
            </>
          )}
        />
        <Controller
          name='praktiskInfo.oppstart'
          control={control}
          render={({ field }) => (
            <DatoVelger
              fraDato={
                typeof field.value === 'string' ? field.value : undefined
              }
              disabled={watch('praktiskInfo.oppstartSnarest')}
              setDato={(val) => {
                field.onChange(val);
              }}
            />
          )}
        />
      </div>
      {!skjulFrist && (
        <div className='flex flex-col'>
          <Heading size='small'>Søknadsfrist</Heading>
          <Controller
            name='praktiskInfo.søknadsfristEtterAvtale'
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                >
                  Snarest
                </Checkbox>
              </>
            )}
          />
          <Controller
            name='praktiskInfo.søknadsfrist'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <DatoVelger
                  error={error?.message}
                  fraDato={
                    typeof field.value === 'string' ? field.value : undefined
                  }
                  disabled={watch('praktiskInfo.søknadsfristEtterAvtale')}
                  setDato={(val) => {
                    field.onChange(val);
                  }}
                />
              </>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default VelgOppstartOgFrist;
