import { TrashIcon } from '@navikt/aksel-icons';
import { Button, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import { usePamPostdata } from '../api/pam-geografi/postdata/[postnummer]/usePamPostdata';

export interface VelgPoststedProps {
  control: Control<any>;
  lokasjonsFelt: string;
  index: number;
  fjern: () => void;
  update: (index: number, value: any) => void;
  postSted: string | null;
}

const VelgPoststed: React.FC<VelgPoststedProps> = ({
  control,
  lokasjonsFelt,
  index,
  fjern,
  update,
  postSted,
}) => {
  // const [postNummer, setPostNummer] = React.useState<string>('');

  const postNummerHook = usePamPostdata(`${lokasjonsFelt}.${index}.postalCode`);

  React.useEffect(() => {
    if (!postNummerHook.isLoading) {
      const nyttPoststed = postNummerHook.data?.korrigertNavnBy;
      if (nyttPoststed !== null && nyttPoststed !== postSted) {
        update(index, {
          ...location, // preserve all other fields
          city: nyttPoststed,
        });
      }
    }
  }, [postNummerHook, postSted, update, index]);

  return (
    <>
      {/* {index > 0 && <hr className='my-4 border-gray-200' />} */}
      <div className='flex flex-col gap-4 '>
        <Controller
          name={`${lokasjonsFelt}.${index}.address`}
          control={control}
          render={({ field }) => <TextField label='Adresse' {...field} />}
        />

        <div className='flex flex-row gap-4'>
          <div className='w-32'>
            <Controller
              name={`${lokasjonsFelt}.${index}.postalCode`}
              control={control}
              render={({ field }) => (
                <TextField
                  label='Postnummer'
                  maxLength={4}
                  {...field}
                  onChange={(e) => {
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
            <Controller
              name={`${lokasjonsFelt}.${index}.city`}
              control={control}
              render={({ field }) => (
                <TextField
                  label='Poststed'
                  readOnly
                  {...field}
                  onChange={() => {}} // prevent onChange warning for readonly field
                />
              )}
            />
          </div>
          <Button
            type='button'
            variant='tertiary'
            icon={<TrashIcon />}
            onClick={() => fjern()}
            title={'fjern'}
          />
        </div>
      </div>
    </>
  );
};

export default VelgPoststed;
