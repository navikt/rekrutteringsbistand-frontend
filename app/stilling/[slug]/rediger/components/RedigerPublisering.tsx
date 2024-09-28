import {
  BodyShort,
  Button,
  Heading,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { stillingsDataDTO } from '../../../stilling-typer';
import { DatoVelger } from './DatoVelger';

export const RedigerPublisering: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { watch, handleSubmit, setValue } = useFormContext<stillingsDataDTO>();

  const onSubmit: SubmitHandler<stillingsDataDTO> = (data) => {
    console.log(data);
  };

  const publiseringDato = watch('stilling.published');
  const utløpsDato = watch('stilling.expires');
  const publiseringstype = watch('stilling.source');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-8'>
        <Heading level='2' size='large'>
          Innspurt
        </Heading>
        <BodyShort spacing>
          Velg når, og hvor stillingen skal publiseres.
        </BodyShort>

        <div className='flex gap-4 mb-4'>
          <DatoVelger
            fraDato={publiseringDato ? new Date(publiseringDato) : undefined}
            label='Publiseres'
            setDato={(val) => console.log(val)}
          />
          <DatoVelger
            label='Avsluttes og skjules'
            fraDato={utløpsDato ? new Date(utløpsDato) : undefined}
            setDato={(val) => console.log(val)}
          />
        </div>

        <RadioGroup
          legend='Hvor skal stillingen publiseres?'
          value={publiseringstype}
          onChange={(val) => setValue('stilling.source', val)}
        >
          <Radio value='DIR'>NAV (Intern)</Radio>
          <Radio value='SHOW_ALL'>arbeidsplassen.no (Ekstern)</Radio>
        </RadioGroup>

        <div className='flex gap-4'>
          <Button className='w-full' disabled>
            Lagre
          </Button>
        </div>
      </div>
    </form>
  );
};
