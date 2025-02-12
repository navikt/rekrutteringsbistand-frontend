import {
  BodyLong,
  Button,
  Checkbox,
  ErrorMessage,
  Heading,
} from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';
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

  const [visAdresse, setVisAdresse] = useState(false);
  const [visLokasjon, setVisLokasjon] = useState(false);

  React.useEffect(() => {
    if (fields.length > 0) {
      setVisAdresse(true);
    }
  }, [fields]);

  const setAdresseFelt = (adresse: boolean) => {
    if (adresse) {
      setVisAdresse(adresse);
      append({ postalCode: '' });
    } else {
      setVisAdresse(false);
      remove();
    }
  };

  return (
    <div>
      <Heading size='medium'>Arbeidssted</Heading>
      <BodyLong>
        Oppgi hvor jobben skal foregå. Skriv inn en adresse eller én eller flere
        kommuner, fylker eller land.
      </BodyLong>

      <Checkbox
        value='adresse'
        checked={visAdresse}
        onChange={() => setAdresseFelt(!visAdresse)}
      >
        Adresse
      </Checkbox>
      <Checkbox
        value='lokasjon'
        checked={visLokasjon}
        onChange={() => setVisLokasjon(!visLokasjon)}
      >
        Kommune, fylke eller land
      </Checkbox>

      {visAdresse &&
        fields.map((field, index) => (
          <VelgPoststed
            key={index}
            location={field}
            index={index}
            oppdater={update}
            fjern={() => remove(index)}
          />
        ))}

      {visAdresse && (
        <div className='my-4'>
          <Button
            variant='secondary'
            onClick={() => append({ postalCode: '' })}
            type='button'
          >
            Legg til adresse
          </Button>
        </div>
      )}
      {formState.errors.omStillingen?.adresseLokasjoner?.message && (
        <ErrorMessage>
          {formState.errors.omStillingen.adresseLokasjoner.message}
        </ErrorMessage>
      )}
      {visLokasjon && (
        <div className='my-4'>
          <VelgKommuneFylkeEllerLand />
        </div>
      )}

      {formState.errors.omStillingen?.lokasjoner?.message && (
        <ErrorMessage>
          {formState.errors.omStillingen.lokasjoner.message}
        </ErrorMessage>
      )}
    </div>
  );
};

export default VelgArbeidssted;
