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
  const { watch, control, setValue } = useFormContext<StillingsDataForm>();

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col'>
        <Heading size='small'>Oppstart</Heading>
        <Controller
          name='praktiskInfo.oppstartSnarest'
          control={control}
          render={({ field }) => (
            <>
              <Checkbox
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
          disabled={watch('praktiskInfo.oppstartSnarest')}
          fraDato={watch('praktiskInfo.oppstart')}
          setDato={(val) =>
            val ? setValue('praktiskInfo.oppstart', val) : null
          }
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

          <DatoVelger
            disabled={watch('praktiskInfo.søknadsfristEtterAvtale')}
            fraDato={watch('praktiskInfo.søknadsfrist')}
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
