import {
  BodyShort,
  Checkbox,
  CheckboxGroup,
  ErrorMessage,
  Heading,
  Radio,
  RadioGroup,
  TextField,
} from '@navikt/ds-react';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../redigerUtil';
import { DatoVelger } from './DatoVelger';
import StegNavigering from './StegNavigering';

export const RedigerPraktiskInfo: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { register, handleSubmit, setValue, watch, control, formState } =
    useFormContext<StillingsDataForm>();

  const onSubmit: SubmitHandler<StillingsDataForm> = (data) => {
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-y-8'>
        <Heading size='large'>Praktisk info</Heading>
        <BodyShort>Fyll inn praktiske detaljer om jobben.</BodyShort>
        <RadioGroup
          legend='Sektor'
          value={watch('praktiskInfo.sektor')}
          onChange={(e) => setValue('praktiskInfo.sektor', e)}
        >
          <Radio value='privat'>Privat</Radio>
          <Radio value='offentlig'>Offentlig</Radio>
        </RadioGroup>
        <TextField
          label='Antall stillinger'
          {...register('praktiskInfo.antallStillinger', { required: true })}
          type='number'
        />
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <Heading size='small'>Oppstart</Heading>
            <Controller
              name='praktiskInfo.oppstart'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Checkbox
                    checked={field.value === 'Snarest'}
                    onChange={(e) => {
                      field.onChange(e.target.checked ? 'Snarest' : '');
                    }}
                  >
                    Snarest
                  </Checkbox>
                  <DatoVelger
                    fraDato={
                      typeof field.value === 'string' ? field.value : undefined
                    }
                    disabled={field.value === 'Snarest'}
                    setDato={(val) => {
                      if (val && field.value !== 'Snarest') {
                        field.onChange(val);
                      }
                    }}
                  />
                </>
              )}
            />
            {formState.errors.praktiskInfo?.oppstart && (
              <ErrorMessage>Oppstartsdato er påkrevd</ErrorMessage>
            )}
          </div>
          <div className='flex flex-col'>
            <Heading size='small'>Søknadsfrist</Heading>
            <Controller
              name='praktiskInfo.søknadsfrist'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Checkbox
                    checked={field.value === 'etterAvtale'}
                    onChange={(e) =>
                      field.onChange(e.target.checked ? 'etterAvtale' : '')
                    }
                  >
                    Etter avtale
                  </Checkbox>
                  <DatoVelger
                    fraDato={
                      typeof field.value === 'string' ? field.value : undefined
                    }
                    disabled={field.value === 'etterAvtale'}
                    setDato={(val) => {
                      if (val && field.value !== 'etterAvtale') {
                        field.onChange(val);
                      }
                    }}
                  />
                </>
              )}
            />
            {formState.errors.praktiskInfo?.søknadsfrist && (
              <ErrorMessage>Søknadsfrist er påkrevd</ErrorMessage>
            )}
          </div>
        </div>
        <RadioGroup
          value={watch('praktiskInfo.ansettelsesform')}
          onChange={(val) => setValue('praktiskInfo.ansettelsesform', val)}
          legend='Ansettelsesform'
        >
          <Radio value='fast'>Fast</Radio>
          <Radio value='deltid'>Deltid</Radio>
          <Radio value='rotasjon'>Rotasjon</Radio>
          <Radio value='ikkeOppgitt'>Ikke oppgitt</Radio>
        </RadioGroup>
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
