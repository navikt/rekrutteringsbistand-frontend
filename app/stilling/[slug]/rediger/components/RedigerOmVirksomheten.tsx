import { Accordion, Button, Heading, TextField } from '@navikt/ds-react';
import React from 'react';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import RikTekstEditor from '../../../../../components/rikteksteditor/RikTekstEditor';
import { getWorkLocationsAsString } from '../../../../../util/locationUtil';
import { LocationListDTO, stillingsDataDTO } from '../../../stilling-typer';
import capitalizeEmployerName from '../../../stilling-util';
import { useStillingsContext } from '../../StillingsContext';
import StegNavigering from './StegNavigering';

export const RedigerOmVirksomheten: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { stillingsData, editStillingsData } = useStillingsContext();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<stillingsDataDTO>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stilling.contactList',
  });

  const onSubmit: SubmitHandler<stillingsDataDTO> = (data) => {
    nextStep();
  };

  if (fields.length === 0) {
    append({ name: '', title: '', email: '', phone: '' });
  }

  const beskrivelse = watch('stilling.properties.employerdescription');

  return (
    <div>
      <Heading size='large' className='mb-4'>
        Om virksomheten
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                stillingsData.stilling.locationList as LocationListDTO,
              )}
            </dd>
            <dt className='font-bold'>Organisasjonsnummer</dt>
            <dd>{stillingsData.stilling?.employer?.orgnr ?? '-'}</dd>
            <dt className='font-bold'>Annonsenummer</dt>
            <dd>{stillingsData.stilling?.annonsenr ?? '-'}</dd>
          </dl>

          <span>Beskrivelse av bedriften (valgfritt)</span>
          <RikTekstEditor
            id='rediger-om-virksomheten'
            tekst={beskrivelse ?? ''}
            onChange={(e) =>
              setValue('stilling.properties.employerdescription', e)
            }
            limitLengde={300}
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
          <p>
            Vi må vite hvem som er ansvarlig for ansettelsen hos virksomheten.
          </p>
          {fields.map((field, index) => (
            <div key={field.id} className='grid grid-cols-2 gap-4 items-start'>
              <TextField
                label='Navn'
                {...(register(`stilling.contactList.${index}.name`),
                { required: true })}
                //TODO
                // error={
                //   (errors.stilling?.contactList?.[index] as any)?.name?.message
                //     ? 'Påkrevd'
                //     : undefined
                // }
              />
              <TextField
                label='Tittel'
                {...(register(`stilling.contactList.${index}.title`),
                { required: true })}
                // error={fields[index].title.error ? 'Påkrevd' : undefined}
              />
              <TextField
                label='E-post'
                {...(register(`stilling.contactList.${index}.email`),
                { required: true })}
                // error={fields[index].email.error ? 'Påkrevd' : undefined}
                type='email'
              />
              <TextField
                label='Telefonnummer'
                {...(register(`stilling.contactList.${index}.phone`),
                { required: true })}
                // error={fields[index].phone.error ? 'Påkrevd' : undefined}
                type='tel'
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
