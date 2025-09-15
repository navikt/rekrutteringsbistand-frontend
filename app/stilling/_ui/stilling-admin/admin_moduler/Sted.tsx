import { PamPostdataDTO } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import VelgKommuneFylkeEllerLand from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/VelgKommuneFylkeEllerLand';
import VelgPoststed from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/VelgPoststed';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, ErrorMessage } from '@navikt/ds-react';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function Sted() {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<StillingsDataDTO>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stilling.locationList',
  });
  const adresserIndekser = fields
    .map((f, idx) => ({ f, idx }))
    .filter(({ f }) => f.address !== null);
  const lokasjonIndekser = fields
    .map((f, idx) => ({ f, idx }))
    .filter(({ f }) => f.address === null);
  const visAdresse = adresserIndekser.length > 0;
  const harLokasjoner = lokasjonIndekser.length > 0;
  const [visLokasjonVelger, setVisLokasjonVelger] = useState(harLokasjoner);
  const visFeilIngenAdresseValgt =
    (errors as any)?.stilling?.locationList && fields.length === 0;

  const leggTilAdresse = () =>
    append({
      address: '',
      postalCode: null,
      city: null,
      county: null,
      municipal: null,
      municipalCode: null,
      country: null,
    });
  const fjernAdresse = (indexIFields: number) => remove(indexIFields);
  const leggTilLokasjon = (lokasjon: any) => append({ ...lokasjon });
  const fjernLokasjonId = (id: string) => {
    const index = fields.findIndex((f) => f.id === id);
    if (index !== -1) remove(index);
  };

  return (
    <RedigerBoks tittel='Sted'>
      <BodyLong className='mb-2'>
        Oppgi hvor jobben skal foregå. Skriv inn en adresse eller én eller flere
        kommuner, fylker eller land.
      </BodyLong>
      {visFeilIngenAdresseValgt && (
        <ErrorMessage className='mt-2'>
          Du må legge til minst én adresse eller én eller flere kommuner, fylker
          eller land.
        </ErrorMessage>
      )}
      {visAdresse && (
        <div className='flex flex-col gap-6 mt-4'>
          {adresserIndekser.map(({ idx }) => (
            <VelgPoststed
              key={fields[idx].id}
              index={idx}
              lokasjonsFelt={'stilling.locationList'}
              control={control}
              fjern={() => fjernAdresse(idx)}
              oppdaterPoststed={(postSted: PamPostdataDTO) => {
                setValue(
                  `stilling.locationList.${idx}.city`,
                  postSted.korrigertNavnBy,
                );
                setValue(
                  `stilling.locationList.${idx}.county`,
                  postSted.fylke.korrigertNavn,
                );
                setValue(
                  `stilling.locationList.${idx}.municipal`,
                  postSted.kommune.korrigertNavn,
                );
                setValue(
                  `stilling.locationList.${idx}.municipalCode`,
                  postSted.kommune.kommunenummer,
                );
                setValue(
                  `stilling.locationList.${idx}.postalCode`,
                  postSted.postkode,
                );
                setValue(`stilling.locationList.${idx}.country`, 'Norge');
              }}
              postSted={watch(`stilling.locationList.${idx}.city`) || null}
            />
          ))}
        </div>
      )}
      {visLokasjonVelger && (
        <div className='my-4'>
          <VelgKommuneFylkeEllerLand
            lokasjoner={lokasjonIndekser.map(({ f }) => f as any)}
            leggTilLokasjon={(lokasjon) => leggTilLokasjon(lokasjon)}
            fjernLokasjonId={(id: string) => fjernLokasjonId(id)}
          />
        </div>
      )}
      <div className='flex flex-row gap-6 mt-6'>
        <Button
          icon={<PlusCircleIcon />}
          size='small'
          variant='tertiary'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            leggTilAdresse();
          }}
        >
          Legg til adresse
        </Button>
        <Button
          icon={<PlusCircleIcon />}
          size='small'
          variant='tertiary'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setVisLokasjonVelger(true);
          }}
        >
          Legg til land, fylke eller kommune
        </Button>
      </div>
    </RedigerBoks>
  );
}
