import { StillingsDataForm } from '@/app/stilling/[stillingsId]/rediger-old/redigerFormType.zod';
import { DatoVelger } from '@/app/stilling/[stillingsId]/rediger/_ui/_ui/DatoVelger';
import { Checkbox, ErrorMessage, Heading } from '@navikt/ds-react';
import { addWeeks, format } from 'date-fns';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface VelgOppstartOgFristProps {
  skjulFrist?: boolean;
}

const VelgOppstartOgFrist: React.FC<VelgOppstartOgFristProps> = ({
  skjulFrist,
}) => {
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<StillingsDataForm>();

  React.useEffect(() => {
    if (watch('praktiskInfo.søknadsfrist') && !watch('innspurt.avsluttes')) {
      setValue('innspurt.avsluttes', watch('praktiskInfo.søknadsfrist'));
    }
  }, [watch, setValue]);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col'>
        <Heading size='small'>Oppstart</Heading>
        <div className='flex gap-8'>
          <DatoVelger
            key='oppstart'
            disabled={watch('praktiskInfo.oppstartEtterAvtale')}
            valgtDato={watch('praktiskInfo.oppstart')}
            setDato={(val) =>
              val ? setValue('praktiskInfo.oppstart', val) : null
            }
          />

          <Controller
            name='praktiskInfo.oppstartEtterAvtale'
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              >
                Etter avtale
              </Checkbox>
            )}
          />
        </div>

        {errors?.praktiskInfo?.oppstart && (
          <ErrorMessage>{errors.praktiskInfo?.oppstart?.message}</ErrorMessage>
        )}
      </div>
      {!skjulFrist && (
        <div className='flex flex-col'>
          <Heading size='small'>Søknadsfrist</Heading>
          <div className='flex gap-8 '>
            <DatoVelger
              disabled={watch('praktiskInfo.søknadsfristSnarest')}
              valgtDato={watch('praktiskInfo.søknadsfrist')}
              setDato={(val) => {
                if (val) {
                  setValue('praktiskInfo.søknadsfrist', val);
                  setValue('innspurt.avsluttes', val);
                }
              }}
            />
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
                      if (e.target.checked) {
                        setValue(
                          'innspurt.avsluttes',
                          format(addWeeks(new Date(), 3), 'dd.MM.yyyy'),
                        );
                      }
                    }}
                  >
                    Snarest
                  </Checkbox>
                </>
              )}
            />
          </div>
          {errors?.praktiskInfo?.søknadsfrist && (
            <ErrorMessage>
              {errors.praktiskInfo?.søknadsfrist?.message}
            </ErrorMessage>
          )}
        </div>
      )}
    </div>
  );
};

export default VelgOppstartOgFrist;
