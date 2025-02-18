import {
  BodyLong,
  Button,
  Checkbox,
  ErrorMessage,
  Heading,
} from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';
import { get, useFieldArray, useFormContext } from 'react-hook-form';
import VelgPoststed from '../../../../components/VelgPoststed';
import { FormidlingDataForm } from '../../../../formidlinger/ny-formidling/redigerFormidlingFormType';
import { StillingsDataForm } from '../redigerFormType.zod';
import VelgKommuneFylkeEllerLand from './VelgKommuneFylkeEllerLand';

export interface VelgArbeidsstedProps {
  lokasjonsFelt: 'omFormidling.lokasjoner' | 'omStillingen.lokasjoner';
  adresseFelt:
    | 'omFormidling.adresseLokasjoner'
    | 'omStillingen.adresseLokasjoner';
}

const VelgArbeidssted: React.FC<VelgArbeidsstedProps> = ({
  adresseFelt,
  lokasjonsFelt,
}) => {
  const { control, formState, watch } = useFormContext<
    StillingsDataForm | FormidlingDataForm
  >();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: adresseFelt,
  });

  const [visAdresse, setVisAdresse] = useState(false);
  const [visLokasjon, setVisLokasjon] = useState(false);

  const errorMessageAdresse = get(formState.errors, adresseFelt)?.message;
  const errorMessageLokasjon = get(formState.errors, lokasjonsFelt)?.message;

  React.useEffect(() => {
    if (fields.length > 0) {
      setVisAdresse(true);
    }
  }, [fields]);

  const setAdresseFelt = (adresse: boolean) => {
    if (adresse) {
      setVisAdresse(adresse);
      append({
        address: '',
        postalCode: null,
        city: null,
        county: null,
        countyCode: null,
        municipal: null,
        municipalCode: null,
        country: null,
      });
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
            onClick={() =>
              append({
                address: null,
                postalCode: '',
                city: null,
                county: null,
                countyCode: null,
                municipal: null,
                municipalCode: null,
                country: null,
              })
            }
            type='button'
          >
            Legg til adresse
          </Button>
        </div>
      )}
      {errorMessageAdresse && (
        <ErrorMessage>{errorMessageAdresse}</ErrorMessage>
      )}
      {visLokasjon && (
        <div className='my-4'>
          <VelgKommuneFylkeEllerLand lokasjonsFelt={lokasjonsFelt} />
        </div>
      )}

      {errorMessageLokasjon && (
        <ErrorMessage>{errorMessageLokasjon}</ErrorMessage>
      )}
    </div>
  );
};

export default VelgArbeidssted;
