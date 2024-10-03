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
import { StillingsDataDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { DatoVelger } from './DatoVelger';
import StegNavigering from './StegNavigering';

export const RedigerPraktiskInfo: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { register, handleSubmit, setValue, watch, control, formState } =
    useFormContext<StillingsDataDTO>();

  const onSubmit: SubmitHandler<StillingsDataDTO> = (data) => {
    console.log(data);
    nextStep();
  };

  const sektor = watch('stilling.properties.sector');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-y-8'>
        <Heading size='large'>Praktisk info</Heading>
        <BodyShort>Fyll inn praktiske detaljer om jobben.</BodyShort>
        <RadioGroup
          legend='Sektor'
          value={sektor}
          onChange={(e) => setValue('stilling.properties.sector', e)}
        >
          <Radio value='privat'>Privat</Radio>
          <Radio value='offentlig'>Offentlig</Radio>
        </RadioGroup>
        <TextField
          label='Antall stillinger'
          {...register('stilling.properties.positioncount', { required: true })}
          type='number'
        />
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <Heading size='small'>Oppstart</Heading>
            <Controller
              name='stilling.properties.starttime'
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
            {formState.errors.stilling?.properties?.starttime && (
              <ErrorMessage>Oppstartsdato er påkrevd</ErrorMessage>
            )}
          </div>
          <div className='flex flex-col'>
            <Heading size='small'>Søknadsfrist</Heading>
            <Controller
              name='stilling.properties.applicationdue'
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
            {formState.errors.stilling?.properties?.applicationdue && (
              <ErrorMessage>Søknadsfrist er påkrevd</ErrorMessage>
            )}
          </div>
        </div>
        <RadioGroup
          {...register('stilling.properties.engagementtype')}
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
          <CheckboxGroup disabled legend='arbeidsdager'>
            <Checkbox value='ukedager'>Ukedager</Checkbox>
            <Checkbox value='lordag'>Lørdag</Checkbox>
            <Checkbox value='sondag'>Søndag</Checkbox>
          </CheckboxGroup>
        </div>
        <div>
          <Heading level='3' size='small'>
            Hvilken tid skal man kunne jobbe?
          </Heading>
          <CheckboxGroup disabled legend='tidspunkt'>
            <Checkbox value='dag'>Dag</Checkbox>
            <Checkbox value='kveld'>Kveld</Checkbox>
            <Checkbox value='natt'>Natt</Checkbox>
          </CheckboxGroup>
        </div>

        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};
