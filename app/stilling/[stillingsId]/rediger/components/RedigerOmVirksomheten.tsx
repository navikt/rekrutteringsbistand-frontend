import { Accordion, Heading, TextField } from '@navikt/ds-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { getWorkLocationsAsString } from '../../../../../util/locationUtil';
import RikTekstEditor from '../../../../components/rikteksteditor/RikTekstEditor';
import capitalizeEmployerName from '../../../stilling-util';
import { useStillingsContext } from '../../StillingsContext';
import { StillingsDataForm } from '../redigerFormType.zod';
import StegNavigering from './StegNavigering';
import VelgKontaktperson from './praktiskInfo/VelgKontaktperson';
import { GeografiDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export const RedigerOmVirksomheten: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { stillingsData } = useStillingsContext();
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
          <dl className='grid grid-cols-2'>
            <dt className='font-bold'>Bedrift</dt>
            <dd>
              {capitalizeEmployerName(
                stillingsData.stilling.businessName ?? '-',
              )}
            </dd>
            <dt className='font-bold'>Adresse</dt>
            <dd>
              {getWorkLocationsAsString(
                stillingsData.stilling.employer?.locationList as GeografiDTO[],
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
                />
                <TextField
                  label='Facebook (valgfritt)'
                  {...register('omVirksomheten.facebookpage')}
                />
                <TextField
                  label='LinkedIn (valgfritt)'
                  {...register('omVirksomheten.linkedinpage')}
                />
                <TextField
                  label='Twitter (valgfritt)'
                  {...register('omVirksomheten.linkedinpage')}
                />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          <VelgKontaktperson />
        </div>

        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
