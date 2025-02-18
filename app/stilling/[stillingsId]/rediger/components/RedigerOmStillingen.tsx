import { BodyShort, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import RikTekstEditor from '../../../../components/rikteksteditor/RikTekstEditor';
import { StillingsDataForm } from '../redigerFormType.zod';
import StegNavigering from './StegNavigering';
import VelgArbeidssted from './VelgArbeidssted';
import VelgStillingTittel from './VelgStillingTittel';
export const RedigerOmStillingen: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { setValue, watch, trigger, formState } =
    useFormContext<StillingsDataForm>();

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
        </Link>
        (åpnes i ny fane).
      </span>

      <form onSubmit={handleStepSubmit}>
        <div className='space-y-8'>
          <div>
            <VelgStillingTittel
              categoryList={watch('omStillingen.categoryList')}
              callBack={(val) => setValue('omStillingen.categoryList', val)}
              error={formState.errors.omStillingen?.categoryList?.message}
            />
          </div>
          <div>
            <Heading size='small'>Beskriv stillingen </Heading>
            <BodyShort className='mb-4'>
              Kan sees av kandidater som mottar stillingen og andre Nav-ansatte.
              Ikke skriv informasjon som kan avsløre personopplysninger.
            </BodyShort>
            <RikTekstEditor
              id='rediger-stilling-beskrivelse'
              tekst={watch('omStillingen.beskrivelse') ?? ''}
              onChange={(e) => setValue('omStillingen.beskrivelse', e)}
              // limitLengde={800}
            />
          </div>

          <div>
            <VelgArbeidssted
              lokasjonsFelt='omStillingen.lokasjoner'
              adresseFelt='omStillingen.adresseLokasjoner'
            />
          </div>
        </div>
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
