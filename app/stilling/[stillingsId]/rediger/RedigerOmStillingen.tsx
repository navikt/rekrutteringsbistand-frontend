import {
  BodyShort,
  Heading,
  TextField,
  ToggleGroup,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import RikTekstEditor from '../../../components/rikteksteditor/RikTekstEditor';
import StegNavigering from './components/StegNavigering';
import { StillingsDataForm } from './redigerFormType.zod';
export const RedigerOmStillingen: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { register, setValue, watch, control, trigger } =
    useFormContext<StillingsDataForm>();

  const [adresseValg, setAdresseValg] = React.useState<'adresse' | 'kommune'>(
    'adresse',
  );

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger('omStillingen', { shouldFocus: true });

    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className='space-y-8'>
      <Heading size='large'>Om stillingen</Heading>
      <span>
        Vi anbefaler å lese våre tips om hvordan du skriver en{' '}
        <Link
          target='_blank'
          href='https://arbeidsplassen.nav.no/skikkelig-bra-stillingsannonse'
        >
          skikkelig god stillingsannonse
        </Link>{' '}
        (åpnes i ny fane).
      </span>

      <form onSubmit={handleStepSubmit}>
        <div className='space-y-8'>
          <div>
            <UNSAFE_Combobox
              options={[]}
              disabled
              label='Velg yrkestittel (standard for yrkesklassifisering - JANZZ)'
              // {...register('omStillingen.tittel')}
              onChange={(e) => {
                // setValue('omStillingen.tittel', e);
              }}
            />
          </div>
          <div>
            <Heading size='small'>Beskriv stillingen </Heading>
            <BodyShort className='mb-4'>
              Kan sees av kandidater som mottar stillingen, og andre
              NAV-ansatte. Unngå å skrive informasjon som kan avsløre
              personopplysninger.{' '}
            </BodyShort>
            <RikTekstEditor
              id='rediger-stilling-beskrivelse'
              tekst={watch('omStillingen.beskrivelse') ?? ''}
              onChange={(e) => setValue('omStillingen.beskrivelse', e)}
              // limitLengde={800}
            />
          </div>

          <div>
            <h3 className='text-xl font-semibold mb-4'>Arbeidssted</h3>

            <ToggleGroup
              className='my-4'
              fill
              defaultValue={adresseValg}
              onChange={(e) => setAdresseValg(e as 'adresse' | 'kommune')}
              variant='neutral'
            >
              <ToggleGroup.Item value={'adresse'} label='Adresse' />
              <ToggleGroup.Item
                value={'kommune'}
                label='Kommune, fylke eller land'
              />
            </ToggleGroup>

            {adresseValg === 'adresse' && (
              <div className='mt-2'>
                <Controller
                  control={control}
                  name={`omStillingen.arbeidssted.adresse`}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label='Adresse'
                      onChange={(e) => onChange(e.target.value)}
                      value={value ?? ''}
                      // error={
                      // errors.omVirksomheten?.kontaktPersoner?.[index]?.name
                      //   ?.message
                      //   ? errors.omVirksomheten?.kontaktPersoner?.[index]
                      //       ?.name?.message
                      //   : null
                      // }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`omStillingen.arbeidssted.postnummer`}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      className='w-6'
                      label='Postnummer'
                      onChange={(e) => onChange(e.target.value)}
                      value={value ?? ''}
                      // error={
                      // errors.omVirksomheten?.kontaktPersoner?.[index]?.name
                      //   ?.message
                      //   ? errors.omVirksomheten?.kontaktPersoner?.[index]
                      //       ?.name?.message
                      //   : null
                      // }
                    />
                  )}
                />
              </div>
            )}

            {adresseValg === 'kommune' && (
              <UNSAFE_Combobox
                className='mt-4'
                label=''
                description='Du kan velge flere kommuner, fylker eller land'
                options={[
                  'car',
                  'bus',
                  'train',
                  'skateboard',
                  'bicycle',
                  'motorcycle',
                  'boat',
                  'airplane',
                  'helicopter',
                  'truck',
                  'van',
                  'scooter',
                ]}
                isMultiSelect
              />
            )}
          </div>
        </div>
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
