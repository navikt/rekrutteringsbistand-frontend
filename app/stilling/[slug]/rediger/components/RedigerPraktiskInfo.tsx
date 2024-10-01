import {
  BodyShort,
  Checkbox,
  CheckboxGroup,
  Heading,
  Radio,
  RadioGroup,
  TextField,
} from '@navikt/ds-react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { StillingsDataDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { DatoVelger } from './DatoVelger';
import StegNavigering from './StegNavigering';

export const RedigerPraktiskInfo: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { register, handleSubmit, setValue, watch } =
    useFormContext<StillingsDataDTO>();

  // defaultValues: {
  //   ansettelsesform:
  //     stillingsData?.stilling?.properties?.engagementtype ?? '',
  //   dager: stillingsData?.stilling?.properties?.workday as any,
  //   tid: stillingsData?.stilling?.properties?.workhours as any,
  //   soknadsfrist: 'etterAvtale',
  //   sektor: 'privat',
  //   antallStillinger: '1',
  //   oppstart: 'snarest',
  // },

  const onSubmit: SubmitHandler<StillingsDataDTO> = (data) => {
    console.log(data);
    nextStep();
  };

  const sektor = watch('stilling.properties.sector');

  const starttime = watch('stilling.properties.starttime');
  const applicationdue = watch('stilling.properties.applicationdue');

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
            <Checkbox
              checked={starttime === 'Snarest'}
              onChange={(e) =>
                setValue(
                  'stilling.properties.starttime',
                  e.target.checked ? 'Snarest' : '',
                )
              }
            >
              Snarest
            </Checkbox>
            <DatoVelger
              disabled={starttime === 'Snarest'}
              // fraDato={starttime ? new Date(starttime) : undefined}
              setDato={(val) => console.log(val)}
            />
          </div>
          <div className='flex flex-col'>
            <Heading size='small'>Søknadsfrist</Heading>
            <Checkbox
              checked={applicationdue === 'etterAvtale'}
              onChange={(e) =>
                setValue(
                  'stilling.properties.applicationdue',
                  e.target.checked ? 'etterAvtale' : '', // TODO Verifisere at dette er riktig
                )
              }
            >
              Etter avtale
            </Checkbox>
            <DatoVelger
              disabled={applicationdue === 'etterAvtale'}
              // }
              setDato={(val) => console.log(val)}
            />
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
