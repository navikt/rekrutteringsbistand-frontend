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
  const { watch, control, setValue, getValues } =
    useFormContext<StillingsDataForm>();

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col'>
        <Heading size='small'>Oppstart</Heading>
        <Controller
          name='praktiskInfo.oppstartEtterAvtale'
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

        <DatoVelger
          key='oppstart'
          disabled={watch('praktiskInfo.oppstartEtterAvtale')}
          valgtDato={watch('praktiskInfo.oppstart')}
          setDato={(val) =>
            val ? setValue('praktiskInfo.oppstart', val) : null
          }
        />
      </div>
      {!skjulFrist && (
        <div className='flex flex-col'>
          <Heading size='small'>Søknadsfrist</Heading>

          <Controller
            key='søknadsfrist'
            name='praktiskInfo.søknadsfristSnarest'
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

          <DatoVelger
            disabled={watch('praktiskInfo.søknadsfristSnarest')}
            valgtDato={watch('praktiskInfo.søknadsfrist')}
            setDato={(val) =>
              val ? setValue('praktiskInfo.søknadsfrist', val) : null
            }
          />
        </div>
      )}
    </div>
  );
};

export default VelgOppstartOgFrist;
