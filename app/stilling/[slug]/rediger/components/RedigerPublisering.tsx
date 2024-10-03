import {
  BodyShort,
  Button,
  Heading,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { oppdaterStilling } from '../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsDataDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { DatoVelger } from './DatoVelger';

export const RedigerPublisering: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { watch, handleSubmit, setValue } = useFormContext<StillingsDataDTO>();

  const onSubmit: SubmitHandler<StillingsDataDTO> = async (data) => {
    setIsLoading(true);
    const response = await oppdaterStilling(data);
    setIsLoading(false);

    if (response.stilling.uuid) {
      router.push(`/stilling/${response.stilling.uuid}`);
    } else {
      alert('Feil ved opprettelse av stilling');
    }
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
            fraDato={publiseringDato ?? undefined}
            label='Publiseres'
            setDato={(val) => console.log(val)}
          />
          <DatoVelger
            label='Avsluttes og skjules'
            fraDato={utløpsDato ?? undefined}
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
          <Button className='w-full' type='submit' loading={isLoading}>
            Lagre
          </Button>
        </div>
      </div>
    </form>
  );
};
