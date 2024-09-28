import {
  BodyShort,
  Checkbox,
  Heading,
  Search,
  TextField,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RikTekstEditor from '../../../../../components/rikteksteditor/RikTekstEditor';
import { stillingsDataDTO } from '../../../stilling-typer';
import { useStillingsContext } from '../../StillingsContext';
import StegNavigering from './StegNavigering';

export const RedigerOmStillingen: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { stillingsData, editStillingsData } = useStillingsContext();
  const { register, setValue, handleSubmit, watch } =
    useForm<stillingsDataDTO>();

  const [visAdresseFelt, setVisAdressefelt] = React.useState<boolean>(true);
  const [visKommuneFelt, setVisKommuneFelt] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<stillingsDataDTO> = (data) => {
    nextStep();
  };

  const tekst = watch('stilling.properties.adtext');

  return (
    <div className='space-y-8'>
      <Heading size='large'>Om stillingen</Heading>
      <p>
        Vi anbefaler å lese våre tips om hvordan du skriver en{' '}
        <Link
          target='_blank'
          href='https://arbeidsplassen.nav.no/skikkelig-bra-stillingsannonse'
        >
          skikkelig god stillingsannonse
        </Link>{' '}
        (åpnes i ny fane).
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-8'>
          <div>
            <Heading size='small'>Yrkestittel (JANZZ)</Heading>
            <Search
              label='Finn yrkeskategori (standard for yrkesklassifisering - STYRK)'
              variant='simple'
              {...register('stilling.title')}
              onChange={(e) => {
                setValue('stilling.title', e);
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
              id='stilling-beskrivelse'
              tekst={tekst ?? ''}
              onChange={(e) => setValue('stilling.properties.adtext', e)}
              limitLengde={800}
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
              <div className='grid grid-cols-2 gap-4 mt-4'>
                <TextField
                  label='Adresse'
                  {...register('stilling.employer.location.address')}
                />
                <TextField
                  label='Postnummer'
                  {...register('stilling.employer.location.postalCode')}
                />
              </div>
            )}
            <Checkbox
              disabled
              className='mt-4'
              checked={visKommuneFelt}
              onChange={(v) => setVisKommuneFelt(v.target.checked)}
              value='taxi'
            >
              Kommune, fylke eller land
            </Checkbox>
            {visKommuneFelt && (
              <UNSAFE_Combobox
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
                onToggleSelected={(verdi, selected) => {}}
              />
            )}
          </div>
        </div>
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
