import VelgPoststed from '../../../../components/VelgPoststed';
import { FormidlingDataForm } from '../../../../formidling/ny-formidling/redigerFormidlingFormType';
import { StillingsDataForm } from '../redigerFormType.zod';
import VelgKommuneFylkeEllerLand from './VelgKommuneFylkeEllerLand';
import { BodyLong, Button, Checkbox, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export interface VelgArbeidsstedProps {
  feltNavn: 'omFormidlingen' | 'omStillingen';
}

const VelgArbeidssted: React.FC<VelgArbeidsstedProps> = ({ feltNavn }) => {
  const { control, setValue, watch } = useFormContext<
    StillingsDataForm | FormidlingDataForm
  >();

  const {
    fields: lokasjoner,
    append: leggTilLokasjon,
    remove: fjernLokasjon,
  } = useFieldArray({
    control,
    name: `${feltNavn}.lokasjoner`,
  });

  const {
    fields: adresser,
    append: leggTilAdresse,
    remove: fjernAdresse,
  } = useFieldArray({
    control,
    name: `${feltNavn}.adresser`,
  });

  const [visAdresse, setVisAdresse] = useState(adresser.length > 0);
  const [visLokasjon, setVisLokasjon] = useState(lokasjoner.length > 0);

  const fjernLokasjonId = (id: string) => {
    const index = lokasjoner.findIndex((field) => field.id === id);
    if (index !== -1) {
      fjernLokasjon(index);
    }
  };

  const setAdresseFelt = (adresse: boolean) => {
    if (adresse) {
      setVisAdresse(adresse);
      if (adresser.length === 0) {
        leggTilAdresse({
          address: null,
          postalCode: null,
          city: null,
          county: null,
          municipal: null,
          municipalCode: null,
          country: null,
        });
      }
    } else {
      adresser.forEach((_, index) => fjernAdresse(index));
      setVisAdresse(false);
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
        adresser.map((_, index) => (
          <VelgPoststed
            key={index}
            index={index}
            lokasjonsFelt={feltNavn + '.adresser'}
            control={control}
            fjern={() => fjernAdresse(index)}
            oppdaterPoststed={(postSted: string) => {
              setValue(`${feltNavn}.adresser.${index}.city` as any, postSted);
            }}
            postSted={watch(`${feltNavn}.adresser.${index}.city`) || null}
          />
        ))}

      {visAdresse && (
        <div className='my-4'>
          <Button
            variant='secondary'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              leggTilAdresse({
                address: '',
                postalCode: null,
                city: null,
                county: null,
                municipal: null,
                municipalCode: null,
                country: null,
              });
            }}
            type='button'
          >
            Legg til adresse
          </Button>
        </div>
      )}

      {visLokasjon && (
        <div className='my-4'>
          <VelgKommuneFylkeEllerLand
            lokasjoner={lokasjoner}
            leggTilLokasjon={(lokasjon) => leggTilLokasjon(lokasjon)}
            fjernLokasjonId={(id: string) => fjernLokasjonId(id)}
          />
        </div>
      )}
    </div>
  );
};

export default VelgArbeidssted;
