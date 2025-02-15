import { TrashIcon } from '@navikt/aksel-icons';
import { Button, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { usePamPostdata } from '../api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { GeografiDTO } from '../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export interface VelgPoststedProps {
  location: GeografiDTO;
  index: number;
  oppdater: (index: number, data: GeografiDTO) => void;
  fjern: () => void;
}

const VelgPoststed: React.FC<VelgPoststedProps> = ({
  location,
  index,
  oppdater,
  fjern,
}) => {
  const [postNummer, setPostNummer] = React.useState<string>(
    location?.postalCode ?? '',
  );

  const hook = usePamPostdata(postNummer);

  const [postSted, setPostSted] = React.useState<string>(location?.city ?? '');

  const [adresse, setAdresse] = React.useState<string>('');

  React.useEffect(() => {
    if (postNummer && postSted) {
      oppdater(index, {
        postalCode: postNummer,
        city: postSted,
        address: adresse,
      });
    }
  }, [postNummer, postSted, adresse, index, oppdater]);

  React.useEffect(() => {
    if (postNummer.length === 4 && hook.data) {
      const postSted = hook.data.korrigertNavnBy;
      setPostSted(postSted ?? 'Ukjent poststed');
    }
  }, [postNummer, hook.data]);

  return (
    <>
      {index > 0 && <hr className='my-4 border-gray-200' />}
      <div className='flex flex-col gap-4 '>
        <TextField
          label='Adresse'
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />

        <div className='flex flex-row gap-4'>
          <div className='w-32'>
            <TextField
              label='Postnummer'
              maxLength={4}
              value={postNummer}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                if (value.length <= 4) {
                  setPostNummer(value);
                }
              }}
            />
          </div>
          <div className='flex-1'>
            <TextField label='Poststed' value={postSted} readOnly />
          </div>
          <Button
            variant='tertiary'
            icon={<TrashIcon />}
            onClick={fjern}
            title={'fjern'}
          />
        </div>
      </div>
    </>
  );

  // return (
  //   <UNSAFE_Combobox
  //     toggleListButton={false}
  //     value={søkeVerdi}
  //     label='Velg postnummer og poststed'
  //     isLoading={hook.isLoading}
  //     options={filteredOptions}
  //     shouldAutocomplete
  //     onChange={(value) => {
  //       setSøkeVerdi(value);
  //     }}
  //     isListOpen={søkeVerdi.length > 1}
  //     onToggleSelected={(value) => {
  //       const poststed = hook.data
  //         ? hook.data.find((item) => item.postalCode === value)
  //         : null;
  //       if (poststed) {
  //         callBack({
  //           address: null,
  //           postalCode: poststed.postalCode,
  //           county: poststed.county.name,
  //           municipal: poststed.municipality.name,
  //           municipalCode: poststed.municipality.code,
  //           city: poststed.city,
  //           country: null,
  //           latitude: null,
  //           longitude: null,
  //         });
  //       }
  //     }}
  //   />
  // );
};

export default VelgPoststed;
