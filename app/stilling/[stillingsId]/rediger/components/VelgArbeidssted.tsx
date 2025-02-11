import { BodyLong, Button, ErrorMessage } from '@navikt/ds-react';
import * as React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import VelgPoststed from '../../../../components/VelgPoststed';
import { StillingsDataForm } from '../redigerFormType.zod';
import VelgKommuneFylkeEllerLand from './VelgKommuneFylkeEllerLand';

const VelgArbeidssted: React.FC = () => {
  const { control, formState, watch } = useFormContext<StillingsDataForm>();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'omStillingen.adresseLokasjoner',
  });

  return (
    <div>
      <BodyLong>
        Oppgi hvor jobben skal foregå. Skriv inn en adresse eller én eller flere
        kommuner, fylker eller land.
      </BodyLong>
      <div className='my-4'>
        <Button
          variant='secondary'
          onClick={() => append({ postalCode: '' })}
          type='button'
        >
          Legg til adresse
        </Button>
      </div>
      {fields.map((field, index) => (
        <VelgPoststed
          key={index}
          location={field}
          index={index}
          oppdater={update}
          fjern={() => remove(index)}
        />
      ))}
      {formState.errors.omStillingen?.adresseLokasjoner?.message && (
        <ErrorMessage>
          {formState.errors.omStillingen.adresseLokasjoner.message}
        </ErrorMessage>
      )}
      <div className='my-4'>
        <VelgKommuneFylkeEllerLand />
      </div>

      {formState.errors.omStillingen?.lokasjoner?.message && (
        <ErrorMessage>
          {formState.errors.omStillingen.lokasjoner.message}
        </ErrorMessage>
      )}
    </div>
  );
};

export default VelgArbeidssted;
