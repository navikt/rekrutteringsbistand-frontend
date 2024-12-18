import { Accordion, Button, Heading, TextField } from '@navikt/ds-react';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { getWorkLocationsAsString } from '../../../../util/locationUtil';
import { GeografiListDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RikTekstEditor from '../../../components/rikteksteditor/RikTekstEditor';
import capitalizeEmployerName from '../../stilling-util';
import { useStillingsContext } from '../StillingsContext';
import StegNavigering from './components/StegNavigering';
import { StillingsDataForm } from './redigerFormType.zod';

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
    control,
    formState: { errors },
  } = useFormContext<StillingsDataForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'omVirksomheten.kontaktPersoner',
  });

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger('omVirksomheten', { shouldFocus: true });

    if (isValid) {
      nextStep();
    }
  };

  if (fields.length === 0) {
    append({ name: '', title: '', email: '', phone: '' });
  }

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
                stillingsData.stilling.locationList as GeografiListDTO,
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
            // limitLengde={300} //TODO Maks tegn må avklares
          />

          <Accordion>
            <Accordion.Item>
              <Accordion.Header>
                Legg til nettadresser (valgfritt)
              </Accordion.Header>
              <Accordion.Content>
                <TextField
                  disabled
                  label='Nettside (valgfritt)'
                  // {...register('omVirksomheten.nettside')}
                />
                <TextField
                  disabled
                  label='Facebook (valgfritt)'
                  // {...register('omVirksomheten.facebook')}
                />
                <TextField
                  disabled
                  label='LinkedIn (valgfritt)'
                  // {...register('omVirksomheten.linkedin')}
                />
                <TextField
                  disabled
                  label='Twitter (valgfritt)'
                  // {...register('omVirksomheten.twitter')}
                />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          <Heading size='medium'>Kontaktperson</Heading>
          <p>Vi må vite hvem som er kontaktperson for stillingen.</p>
          {fields.map((field, index) => (
            <div key={field.id} className='grid grid-cols-2 gap-4 items-start'>
              <Controller
                control={control}
                name={`omVirksomheten.kontaktPersoner.${index}.name`}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label='Navn'
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    error={
                      errors.omVirksomheten?.kontaktPersoner?.[index]?.name
                        ?.message
                        ? errors.omVirksomheten?.kontaktPersoner?.[index]?.name
                            ?.message
                        : null
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name={`omVirksomheten.kontaktPersoner.${index}.title`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label='Tittel'
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    error={
                      errors.omVirksomheten?.kontaktPersoner?.[index]?.title
                        ?.message
                        ? errors.omVirksomheten?.kontaktPersoner?.[index]?.title
                            ?.message
                        : null
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name={`omVirksomheten.kontaktPersoner.${index}.email`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    type='email'
                    label='E-post'
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    error={
                      errors.omVirksomheten?.kontaktPersoner?.[index]?.email
                        ?.message
                        ? errors.omVirksomheten?.kontaktPersoner?.[index]?.email
                            ?.message
                        : null
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name={`omVirksomheten.kontaktPersoner.${index}.phone`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    type='tel'
                    label='Telefonnummer'
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    error={
                      (errors.omVirksomheten?.kontaktPersoner?.[index] as any)
                        ?.phone
                        ? errors.omVirksomheten?.kontaktPersoner?.[index]?.phone
                            ?.message
                        : null
                    }
                  />
                )}
              />

              {index > 0 && (
                <>
                  <div> </div>
                  <div className='flex justify-end'>
                    <Button
                      variant='secondary'
                      type='button'
                      onClick={() => remove(index)}
                    >
                      Fjern kontaktperson
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          <div>
            <Button
              variant='secondary'
              type='button'
              onClick={() =>
                append({ name: '', title: '', email: '', phone: '' })
              }
            >
              Legg til flere kontaktpersoner
            </Button>
          </div>
        </div>

        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
