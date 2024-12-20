import {
  BodyShort,
  Checkbox,
  Heading,
  TextField,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import RikTekstEditor from '../../../components/rikteksteditor/RikTekstEditor';
import StegNavigering from './components/StegNavigering';
import { StillingsDataForm } from './redigerFormType.zod';
export const RedigerOmStillingen: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { register, setValue, handleSubmit, watch, control } =
    useFormContext<StillingsDataForm>();

  const [visAdresseFelt, setVisAdressefelt] = React.useState<boolean>(true);
  const [visKommuneFelt, setVisKommuneFelt] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<StillingsDataForm> = (data) => {
    nextStep();
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

      <form onSubmit={handleSubmit(onSubmit)}>
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
            <p>
              Velg hvor kandidatene skal jobbe. Skriv inn en adresse eller én
              eller flere kommuner, fylker eller land.
            </p>

            <Checkbox
              value='adresse'
              checked={visAdresseFelt}
              onChange={(v) => setVisAdressefelt(v.target.checked)}
            >
              Adresse
            </Checkbox>
            {visAdresseFelt && (
              <>
                <Controller
                  control={control}
                  name={`omStillingen.arbeidssted.adresse`}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label='Navn'
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
              </>
            )}
            <Checkbox
              checked={visKommuneFelt}
              onChange={(v) => setVisKommuneFelt(v.target.checked)}
              value='taxi'
            >
              Kommune, fylke eller land
            </Checkbox>
            {visAdresseFelt && (
              <div className='grid grid-cols-2 gap-4 mt-4'>
                <TextField
                  label='Adresse'
                  //TODO
                  // {...register('stilling.employer.location.address')}
                />
                <TextField
                  label='Postnummer'
                  // {...register('stilling.employer.location.postalCode')}
                />
              </div>
            )}

            {visKommuneFelt && (
              <UNSAFE_Combobox
                className='mt-4'
                disabled
                label='Kommune, fylke, eller land'
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
