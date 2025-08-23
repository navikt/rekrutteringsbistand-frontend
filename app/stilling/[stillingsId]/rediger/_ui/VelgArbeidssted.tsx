import VelgKommuneFylkeEllerLand from './VelgKommuneFylkeEllerLand';
import { PamPostdataDTO } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { FormidlingDataForm } from '@/app/etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { StillingsDataForm } from '@/app/stilling/[stillingsId]/rediger/redigerFormType.zod';
import VelgPoststed from '@/components/felles/VelgPoststed';
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

export interface VelgArbeidsstedProps {
  feltNavn: 'omFormidlingen' | 'omStillingen';
}

const VelgArbeidssted: React.FC<VelgArbeidsstedProps> = ({ feltNavn }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<StillingsDataForm | FormidlingDataForm>();

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

  const visFeilIngenAdresseValgt =
    (errors as any)?.[feltNavn] &&
    adresser.length === 0 &&
    lokasjoner.length === 0;

  React.useEffect(() => {
    if (!visAdresse && adresser.length > 0) {
      setVisAdresse(true);
    }
  }, [adresser]);

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
        error={visFeilIngenAdresseValgt}
        value='adresse'
        checked={visAdresse}
        onChange={() => setAdresseFelt(!visAdresse)}
      >
        Adresse
      </Checkbox>
      <Checkbox
        error={visFeilIngenAdresseValgt}
        value='lokasjon'
        checked={visLokasjon}
        onChange={() => setVisLokasjon(!visLokasjon)}
      >
        Kommune, fylke eller land
      </Checkbox>

      {visFeilIngenAdresseValgt && (
        <ErrorMessage>
          Du må velge minst én adresse eller én eller flere kommuner, fylker
          eller land.
        </ErrorMessage>
      )}
      {visAdresse &&
        adresser.map((_, index) => (
          <VelgPoststed
            key={index}
            index={index}
            lokasjonsFelt={feltNavn + '.adresser'}
            control={control}
            fjern={() => fjernAdresse(index)}
            oppdaterPoststed={(postSted: PamPostdataDTO) => {
              setValue(
                `${feltNavn}.adresser.${index}.city`,
                postSted.korrigertNavnBy,
              );
              setValue(
                `${feltNavn}.adresser.${index}.county`,
                postSted.fylke.korrigertNavn,
              );
              setValue(
                `${feltNavn}.adresser.${index}.municipal`,
                postSted.kommune.korrigertNavn,
              );
              setValue(
                `${feltNavn}.adresser.${index}.municipalCode`,
                postSted.kommune.kommunenummer,
              );
              setValue(
                `${feltNavn}.adresser.${index}.postalCode`,
                postSted.postkode,
              );
              setValue(`${feltNavn}.adresser.${index}.country`, 'Norge');
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
        <div className='my-4 '>
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
