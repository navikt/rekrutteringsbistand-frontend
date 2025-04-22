import RikTekstEditor from '../../../../components/rikteksteditor/RikTekstEditor';
import { StillingsDataForm } from '../redigerFormType.zod';
import OppsummerValidering from './OppsummerValidering';
import StegNavigering from './StegNavigering';
import VelgArbeidssted from './VelgArbeidssted';
import VelgStillingTittel from './VelgStillingTittel';
import { BodyShort, ErrorMessage, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

export const RedigerOmStillingen: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<StillingsDataForm>();

  const [oppsummerValidering, setOppsummerValidering] =
    React.useState<boolean>(false);

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger('omStillingen', { shouldFocus: true });

    setOppsummerValidering(!isValid);

    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className='space-y-8'>
      <Heading size='large'>Om stillingen</Heading>
      <span className='mb-4'>
        Vi anbefaler å lese våre tips{' '}
        <Link
          target='_blank'
          href='https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Slik-skriver-du-gode-stillingsannonser-for-direktemeldte-stillinger.aspx'
        >
          slik skriver du gode stillingsannonser for direktemeldte stillinger
        </Link>{' '}
        (åpnes i ny fane).
      </span>

      <form onSubmit={handleStepSubmit}>
        <div className='space-y-8'>
          <div>
            <VelgStillingTittel
              categoryList={watch('omStillingen.categoryList')}
              callBack={(val) => setValue('omStillingen.categoryList', val)}
              error={errors.omStillingen?.categoryList?.message}
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
            <ErrorMessage>
              {errors.omStillingen?.beskrivelse?.message}
            </ErrorMessage>
          </div>

          <div>
            <VelgArbeidssted feltNavn='omStillingen' />
            {errors.omStillingen?.adresser && (
              <ErrorMessage>
                {errors.omStillingen?.adresser?.message}
              </ErrorMessage>
            )}
          </div>
        </div>
        {oppsummerValidering && <OppsummerValidering feltNavn='omStillingen' />}
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
