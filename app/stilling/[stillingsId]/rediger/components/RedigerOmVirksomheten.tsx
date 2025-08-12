import { getWorkLocationAsString } from '../../../../../util/locationUtil';
import { GeografiDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RikTekstEditor from '../../../../components/rikteksteditor/RikTekstEditor';
import capitalizeEmployerName from '../../../stilling-util';
import { useStillingsContext } from '../../StillingsContext';
import { StillingsDataForm } from '../redigerFormType.zod';
import OppsummerValidering from './OppsummerValidering';
import StegNavigering from './StegNavigering';
import VelgKontaktperson from './praktiskInfo/VelgKontaktperson';
import { Accordion, Heading, TextField } from '@navikt/ds-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const RedigerOmVirksomheten: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { stillingsData } = useStillingsContext();

  const [oppsummerValidering, setOppsummerValidering] =
    React.useState<boolean>(false);

  const {
    watch,
    setValue,
    trigger,
    register,
    formState: { errors },
  } = useFormContext<StillingsDataForm>();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger('omVirksomheten', { shouldFocus: true });

    setOppsummerValidering(!isValid);

    if (isValid) {
      nextStep();
    }
  };

  return (
    <div>
      <Heading size='large' className='mb-4'>
        Om virksomheten
      </Heading>
      <form onSubmit={handleStepSubmit}>
        <div className='flex flex-col space-y-8'>
          <dl className=' flex xl:grid xl:grid-cols-2 flex-col'>
            <dt className='font-bold'>Bedrift</dt>
            <dd>
              {capitalizeEmployerName(
                stillingsData.stilling.businessName ?? '-',
              )}
            </dd>
            <dt className='font-bold'>Adresse</dt>
            <dd>
              {getWorkLocationAsString(
                stillingsData.stilling.employer?.location as GeografiDTO,
              )}
            </dd>
            <dt className='font-bold'>Organisasjonsnummer</dt>
            <dd>{stillingsData.stilling?.employer?.orgnr ?? '-'}</dd>
            <dt className='font-bold'>Annonsenummer</dt>
            <dd>{stillingsData.stilling?.id ?? '-'}</dd>
          </dl>

          <span>Beskrivelse av bedriften (valgfritt)</span>

          <RikTekstEditor
            id='rediger-om-virksomheten'
            tekst={watch('omVirksomheten.beskrivelse') ?? ''}
            onChange={(e) => setValue('omVirksomheten.beskrivelse', e)}
          />

          <Accordion>
            <Accordion.Item>
              <Accordion.Header>
                Legg til nettadresser (valgfritt)
              </Accordion.Header>
              <Accordion.Content>
                <TextField
                  label='Nettside (valgfritt)'
                  {...register('omVirksomheten.employerhomepage')}
                  error={errors.omVirksomheten?.employerhomepage?.message}
                />
                <TextField
                  label='Facebook (valgfritt)'
                  {...register('omVirksomheten.facebookpage')}
                  error={errors.omVirksomheten?.facebookpage?.message}
                />
                <TextField
                  label='LinkedIn (valgfritt)'
                  {...register('omVirksomheten.linkedinpage')}
                  error={errors.omVirksomheten?.linkedinpage?.message}
                />
                <TextField
                  label='X (Tidligere twitter) (valgfritt)'
                  {...register('omVirksomheten.twitteraddress')}
                  error={errors.omVirksomheten?.twitteraddress?.message}
                />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          <VelgKontaktperson />
        </div>
        {oppsummerValidering && (
          <OppsummerValidering feltNavn='omVirksomheten' />
        )}
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
