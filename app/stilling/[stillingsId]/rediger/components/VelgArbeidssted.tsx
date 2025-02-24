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
import { FormidlingDataForm } from '../../../../formidlinger/ny-formidling/redigerFormidlingFormType';
import { StillingsDataForm } from '../redigerFormType.zod';
import VelgKommuneFylkeEllerLand from './VelgKommuneFylkeEllerLand';

export interface VelgArbeidsstedProps {
  feltNavn: 'omFormidling.locationList' | 'omStillingen.locationList';
}

const VelgArbeidssted: React.FC<VelgArbeidsstedProps> = ({ feltNavn }) => {
  const { control } = useFormContext<StillingsDataForm | FormidlingDataForm>();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: feltNavn,
  });

  const [visAdresse, setVisAdresse] = useState(false);
  const [visLokasjon, setVisLokasjon] = useState(false);

  const fjernId = (id: string) => {
    const index = fields.findIndex((field) => field.id === id);
    if (index !== -1) {
      remove(index);
    }
  };

  React.useEffect(() => {
    if (fields.length > 0) {
      if (fields.some((f) => f.postalCode !== null)) {
        setVisAdresse(true);
      }
      if (fields.some((f) => f.postalCode === null)) {
        setVisLokasjon(true);
      }
    }
  }, [fields]);

  const setAdresseFelt = (adresse: boolean) => {
    if (adresse) {
      setVisAdresse(adresse);
      if (fields.some((f) => f.postalCode !== null)) {
        append({
          address: '',
          postalCode: '',
          city: '',
          county: null,
          countyCode: null,
          municipal: null,
          municipalCode: null,
          country: null,
        });
      }
    } else {
      setVisAdresse(false);
      // remove();
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
        fields
          .filter((l) => l.postalCode !== null)
          .map((_, index) => (
            <VelgPoststed
              key={index}
              index={index}
              lokasjonsFelt={feltNavn}
              control={control}
              fjern={() => remove(index)}
              update={update}
              postSted={fields[index].city}
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
      {!visAdresse && !visLokasjon && (
        <ErrorMessage>
          Velg minst én adresse eller lokasjon for stillingen.
        </ErrorMessage>
      )}
      {/* {errorMessageAdresse && (
        <ErrorMessage>{errorMessageAdresse}</ErrorMessage>
      )} */}
      {visLokasjon && (
        <div className='my-4'>
          <VelgKommuneFylkeEllerLand
            lokasjoner={fields.filter((l) => l.postalCode === null)}
            leggTilLokasjon={(lokasjon) => append(lokasjon)}
            fjernLokasjonId={(id: string) => fjernId(id)}
          />
        </div>
      )}

      {/* {errorMessageLokasjon && (
        <ErrorMessage>{errorMessageLokasjon}</ErrorMessage>
      )} */}
    </div>
  );
};

export default VelgArbeidssted;
