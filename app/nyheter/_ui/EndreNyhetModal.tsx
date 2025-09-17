'use client';

import {
  NyheterDTO,
  oppdaterNyhet,
  opprettNyhet,
} from '@/app/api/bruker/nyheter/[...slug]/nyhet-admin';
import RikTekstEditor from '@/components/felles/rikteksteditor/RikTekstEditor';
import { RekbisError } from '@/util/rekbisError';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button, Modal, TextField } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface NyhetForm {
  tittel: string;
  innhold: string;
}

interface EndreNyhetModalProps {
  eksisterendeNyhet?: NyheterDTO;
  refetch: () => void;
}

export default function EndreNyhetModal({
  eksisterendeNyhet,
  refetch,
}: EndreNyhetModalProps) {
  const nyhetModalRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NyhetForm>({
    defaultValues: eksisterendeNyhet
      ? eksisterendeNyhet
      : { tittel: '', innhold: '' },
  });

  const onSubmit: SubmitHandler<NyhetForm> = async (nyhetForm) => {
    if (eksisterendeNyhet) {
      const oppdatertNyhet = {
        ...eksisterendeNyhet,
        ...nyhetForm,
      };
      setLoading(true);
      try {
        await oppdaterNyhet(oppdatertNyhet);
      } catch (error) {
        throw new RekbisError({
          message: 'Noe gikk galt ved oppdatering av nyhet',
          error,
        });
      }
    } else {
      try {
        await opprettNyhet(nyhetForm);
      } catch (error) {
        throw new RekbisError({
          message: 'Noe gikk galt ved oppretting av nyhet',
          error,
        });
      }
    }
    refetch();
    setLoading(false);
    nyhetModalRef.current?.close();
    reset();
  };

  return (
    <div>
      {eksisterendeNyhet ? (
        <Button
          onClick={() => nyhetModalRef.current?.showModal()}
          variant='tertiary'
          icon={<PencilIcon />}
        >
          Endre
        </Button>
      ) : (
        <Button size='small' onClick={() => nyhetModalRef.current?.showModal()}>
          {eksisterendeNyhet ? 'Oppdater nyhet' : 'Opprett nyhet'}
        </Button>
      )}

      <Modal
        className='w-full'
        ref={nyhetModalRef}
        header={{
          heading: eksisterendeNyhet ? 'Oppdater nyhet' : 'Opprett ny nyhet',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className='flex flex-col gap-4'>
              <Controller
                name='tittel'
                control={control}
                rules={{ required: 'Tittel er påkrevd' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Tittel'
                    error={errors.tittel?.message}
                  />
                )}
              />

              <div>
                <label className='navds-label mb-2 block'>Innhold</label>
                <Controller
                  name='innhold'
                  control={control}
                  render={({ field }) => (
                    <RikTekstEditor
                      utviklerExtensions
                      id={'oppdater-nyhet'}
                      tekst={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button loading={loading} type='submit'>
              Oppdater nyhet
            </Button>
            <Button
              loading={loading}
              type='button'
              variant='secondary'
              onClick={() => {
                reset();
                nyhetModalRef.current?.close();
              }}
            >
              Avbryt
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
