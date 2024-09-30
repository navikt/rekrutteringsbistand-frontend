import { Accordion, Button, Heading, TextField } from '@navikt/ds-react';
import React from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import RikTekstEditor from '../../../../../components/rikteksteditor/RikTekstEditor';
import { getWorkLocationsAsString } from '../../../../../util/locationUtil';
import {
  GeografiListDTO,
  StillingsDataDTO,
} from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import capitalizeEmployerName from '../../../stilling-util';
import { useStillingsContext } from '../../StillingsContext';
import StegNavigering from './StegNavigering';

export const RedigerOmVirksomheten: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { stillingsData } = useStillingsContext();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<StillingsDataDTO>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stilling.contactList',
  });

  const onSubmit: SubmitHandler<StillingsDataDTO> = (data) => {
    nextStep();
  };

  if (fields.length === 0) {
    append({ name: '', title: '', email: '', phone: '' });
  }

  const beskrivelse =
    watch('stilling.properties.employerdescription')?.toString() ?? '';

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
              <Controller
                control={control}
                rules={{ required: true }}
                name={`stilling.contactList.${index}.name`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label='Navn'
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    error={
                      (errors.stilling?.contactList?.[index] as any)?.name
                        ? 'Påkrevd felt'
                        : null
                    }
                  />
                )}
              />
              <Controller
                control={control}
                rules={{ required: true }}
                name={`stilling.contactList.${index}.title`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label='Tittel'
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    error={
                      (errors.stilling?.contactList?.[index] as any)?.title
                        ? 'Påkrevd felt'
                        : null
                    }
                  />
                )}
              />

              <Controller
                control={control}
                rules={{ required: true }}
                name={`stilling.contactList.${index}.email`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    type='email'
                    label='E-post'
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    error={
                      (errors.stilling?.contactList?.[index] as any)?.email
                        ? 'Påkrevd felt'
                        : null
                    }
                  />
                )}
              />
              <Controller
                control={control}
                rules={{ required: true }}
                name={`stilling.contactList.${index}.phone`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    type='tel'
                    label='Telefonnummer'
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    error={
                      (errors.stilling?.contactList?.[index] as any)?.phone
                        ? 'Påkrevd felt'
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
