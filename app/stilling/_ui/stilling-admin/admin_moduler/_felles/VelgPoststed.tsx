// Flyttet fra _old/_ui/VelgPoststed.tsx
import {
  PamPostdataDTO,
  usePamPostdata,
} from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { XMarkIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Button, TextField } from '@navikt/ds-react';
import { FC, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

export interface VelgPoststedProps {
  control: Control<any>;
  lokasjonsFelt: string;
  index: number;
  fjern: () => void;
  oppdaterPoststed: (value: PamPostdataDTO) => void;
  postSted: string | null;
}

const VelgPoststed: FC<VelgPoststedProps> = ({
  control,
  lokasjonsFelt,
  index,
  fjern,
  oppdaterPoststed,
  postSted,
}) => {
  const [postNummer, setPostNummer] = useState<string>('');

  const postNummerHook = usePamPostdata(postNummer);

  useEffect(() => {
    if (!postNummerHook.isLoading) {
      const nyttPoststed = postNummerHook.data?.korrigertNavnBy;
      if (postNummerHook.data && nyttPoststed && nyttPoststed !== postSted) {
        oppdaterPoststed(postNummerHook.data);
      }
    }
  }, [postNummerHook, postSted, oppdaterPoststed, index]);

  return (
    <Box.New background='neutral-moderate' padding='3' borderRadius='large'>
      <div>
        <div className='py-3 flex justify-between'>
          <BodyLong>Adresse {index + 1}</BodyLong>
          <div>
            <Button
              size='small'
              type='button'
              variant='tertiary'
              icon={<XMarkIcon />}
              onClick={() => fjern()}
              title={'fjern'}
            >
              Fjern
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Controller
            name={`${lokasjonsFelt}.${index}.address`}
            control={control}
            render={({ field }) => (
              <TextField
                label='Gateadresse'
                {...field}
                value={field.value || ''}
              />
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
          </div>
        </div>
      </div>
    </Box.New>
  );
};

export default VelgPoststed;
