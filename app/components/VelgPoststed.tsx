import {
  PamPostdataDTO,
  usePamPostdata,
} from '../api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Button, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';

export interface VelgPoststedProps {
  control: Control<any>;
  lokasjonsFelt: string;
  index: number;
  fjern: () => void;
  oppdaterPoststed: (value: PamPostdataDTO) => void;
  postSted: string | null;
}

const VelgPoststed: React.FC<VelgPoststedProps> = ({
  control,
  lokasjonsFelt,
  index,
  fjern,
  oppdaterPoststed,
  postSted,
}) => {
  const [postNummer, setPostNummer] = React.useState<string>('');

  const postNummerHook = usePamPostdata(postNummer);

  React.useEffect(() => {
    if (!postNummerHook.isLoading) {
      const nyttPoststed = postNummerHook.data?.korrigertNavnBy;
      if (postNummerHook.data && nyttPoststed && nyttPoststed !== postSted) {
        oppdaterPoststed(postNummerHook.data);
      }
    }
  }, [postNummerHook, postSted, oppdaterPoststed, index]);

  return (
    <>
      {/* {index > 0 && <hr className='my-4 border-gray-200' />} */}
      <div className='flex flex-col gap-4'>
        <Controller
          name={`${lokasjonsFelt}.${index}.address`}
          control={control}
          render={({ field }) => (
            <TextField label='Adresse' {...field} value={field.value || ''} />
          )}
        />

        <div className='flex flex-row gap-4 justify-baseline'>
          <div className='w-32'>
            <Controller
              name={`${lokasjonsFelt}.${index}.postalCode`}
              control={control}
              render={({ field }) => (
                <TextField
                  label='Postnummer'
                  type='number'
                  maxLength={4}
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    setPostNummer(e.target.value);
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      field.onChange(value);
                    }
                  }}
                />
              )}
            />
          </div>
          <div className='flex-1'>
            <BodyShort weight='semibold'>Poststed</BodyShort>
            <div className='mt-4'>
              <BodyLong>{postSted}</BodyLong>
            </div>
          </div>
          <div>
            <Button
              type='button'
              variant='tertiary'
              icon={<TrashIcon />}
              onClick={() => fjern()}
              title={'fjern'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VelgPoststed;
