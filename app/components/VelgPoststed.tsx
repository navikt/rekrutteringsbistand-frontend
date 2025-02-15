import { TrashIcon } from '@navikt/aksel-icons';
import { Button, TextField } from '@navikt/ds-react';
import * as React from 'react';
import {
  PamPostdataDTO,
  usePamPostdata,
} from '../api/pam-geografi/postdata/[postnummer]/usePamPostdata';
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

  const [valgtPoststed, setValgtPoststed] =
    React.useState<PamPostdataDTO | null>(null);

  const [adresse, setAdresse] = React.useState<string>('');

  React.useEffect(() => {
    if (
      valgtPoststed === null ||
      valgtPoststed.postkode !== location.postalCode
    ) {
      oppdater(index, {
        postalCode: valgtPoststed?.postkode ?? null,
        city: valgtPoststed?.by ?? null,
        address: adresse,
        county: valgtPoststed?.fylke.navn ?? null,
        countyCode: valgtPoststed?.fylke.fylkesnummer ?? null,
        municipal: valgtPoststed?.kommune.navn ?? null,
        municipalCode: valgtPoststed?.kommune.kommunenummer ?? null,
        country: null,
      });
    }
  }, [
    postNummer,
    valgtPoststed,
    adresse,
    index,
    oppdater,
    location.postalCode,
  ]);

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
            <TextField
              label='Poststed'
              value={valgtPoststed?.korrigertNavnBy ?? ''}
              readOnly
            />
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
};

export default VelgPoststed;
