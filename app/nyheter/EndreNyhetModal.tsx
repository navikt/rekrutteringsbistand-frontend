'use client';

import { oppdaterNyhet } from '@/app/api/bruker/nyheter/[...slug]/nyhet-admin';
import RikTekstEditor from '@/components/felles/rikteksteditor/RikTekstEditor';
import { Button, Modal, TextField } from '@navikt/ds-react';
import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PencilIcon } from '@navikt/aksel-icons';
import * as React from 'react';

interface NyhetData {
  id: string;
  tittel: string;
  innhold: string;
}

interface NyhetForm {
  tittel: string;
  innhold: string;
}

export const EndreNyhetModal = (nyhet: NyhetData) => {
  const nyhetModalRef = useRef<HTMLDialogElement>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NyhetForm>({
    defaultValues: {
      tittel: nyhet.tittel,
      innhold: nyhet.innhold,
    },
  });

  const onSubmit: SubmitHandler<NyhetForm> = (nyhetForm ) => {
    const oppdatertNyhet = {
      id: nyhet.id,
      ...nyhetForm
    }
    oppdaterNyhet(oppdatertNyhet);

    nyhetModalRef.current?.close();
    reset();
  };

  return (
    <div>
      <Button onClick={() => nyhetModalRef.current?.showModal()}
        variant='tertiary'
        icon={<PencilIcon />}
      >
        Endre
      </Button>

      <Modal
        className='w-full'
        ref={nyhetModalRef}
        header={{ heading: 'Opprett ny nyhet' }}
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
            <Button type='submit'>Oppdater nyhet</Button>
            <Button
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
};
