import {
  BodyShort,
  Checkbox,
  CheckboxGroup,
  Heading,
  Radio,
  RadioGroup,
  TextField,
} from '@navikt/ds-react';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { StillingsAnsettelsesform } from '../../stilling-typer';
import { DatoVelger } from './components/DatoVelger';
import StegNavigering from './components/StegNavigering';
import { PraktiskInfoSchema, StillingsDataForm } from './redigerFormType.zod';

export const RedigerPraktiskInfo: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState,
    getValues,
  } = useFormContext<StillingsDataForm>();

  const onSubmit: SubmitHandler<StillingsDataForm> = (data) => {
    const valider = PraktiskInfoSchema.safeParse(data.praktiskInfo);

    if (valider.success) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-y-8'>
        <Heading size='large'>Praktisk info</Heading>
        <BodyShort>Fyll inn praktiske detaljer om jobben.</BodyShort>
        <Controller
          control={control}
          name='praktiskInfo.sektor'
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              legend='Sektor'
              value={value}
              onChange={(e) => onChange(e)}
            >
              <Radio value='Privat'>Privat</Radio>
              <Radio value='Offentlig'>Offentlig</Radio>
            </RadioGroup>
          )}
        />
        <TextField
          label='Antall stillinger'
          {...register('praktiskInfo.antallStillinger', { required: true })}
          type='number'
        />
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
                    Snarest
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
                    Etter avtale
                  </Checkbox>
                </>
              )}
            />
            <Controller
              name='praktiskInfo.søknadsfrist'
              control={control}
              render={({ field }) => (
                <DatoVelger
                  fraDato={
                    typeof field.value === 'string' ? field.value : undefined
                  }
                  disabled={watch('praktiskInfo.søknadsfristEtterAvtale')}
                  setDato={(val) => {
                    field.onChange(val);
                  }}
                />
              )}
            />
          </div>
        </div>
        <Controller
          name='praktiskInfo.ansettelsesform'
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onChange={(val) => field.onChange(val)}
                legend='Ansettelsesform'
              >
                {Object.entries(StillingsAnsettelsesform).map(
                  ([key, value]) => (
                    <Radio key={key} value={value}>
                      {key}
                    </Radio>
                  ),
                )}
              </RadioGroup>
            </>
          )}
        />

        <div>
          <Heading level='3' size='small'>
            Hvilke dager skal man kunne jobbe?
          </Heading>
          <CheckboxGroup
            legend='arbeidsdager'
            defaultValue={watch('praktiskInfo.dager')}
            onChange={(val) => setValue('praktiskInfo.dager', val)}
          >
            <Checkbox value='Ukedager'>Ukedager</Checkbox>
            <Checkbox value='Lørdag'>Lørdag</Checkbox>
            <Checkbox value='Søndag'>Søndag</Checkbox>
          </CheckboxGroup>
        </div>
        <div>
          <Heading level='3' size='small'>
            Hvilken tid skal man kunne jobbe?
          </Heading>
          <CheckboxGroup
            legend='tidspunkt'
            onChange={(val) => setValue('praktiskInfo.tid', val)}
            defaultValue={watch('praktiskInfo.tid')}
          >
            <Checkbox value='Dagtid'>Dag</Checkbox>
            <Checkbox value='Kveld'>Kveld</Checkbox>
            <Checkbox value='Natt'>Natt</Checkbox>
          </CheckboxGroup>
        </div>

        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};
