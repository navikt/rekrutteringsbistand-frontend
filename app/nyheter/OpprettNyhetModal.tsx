'use client';

import RikTekstEditor from '@/components/felles/rikteksteditor/RikTekstEditor';
import { Button, Modal, TextField } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface NyhetForm {
  tittel: string;
  beskrivelse: string;
}

export const OpprettNyhetModal = () => {
  const nyhetModalRef = useRef<HTMLDialogElement>(null);
  const [, setEditorContent] = useState('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NyhetForm>({
    defaultValues: {
      tittel: '',
      beskrivelse: '',
    },
  });

  const onSubmit: SubmitHandler<NyhetForm> = () => {
    // const nyhet = {
    //   tittel: data.tittel,
    //   beskrivelse: editorContent,
    // };
    // Backend lagrer nyhet
    // console.log({ editorContent: editorContent });
    nyhetModalRef.current?.close();
    reset();
    setEditorContent('');
  };

  return (
    <div>
      <Button onClick={() => nyhetModalRef.current?.showModal()}>
        Opprett nyhet
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
                <label className='navds-label mb-2 block'>Beskrivelse</label>
                <RikTekstEditor
                  utviklerExtensions
                  id={'opprett-nyhet'}
                  onChange={(tekst: string) => setEditorContent(tekst)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit'>Opprett nyhet</Button>
            <Button
              type='button'
              variant='secondary'
              onClick={() => {
                reset();
                setEditorContent('');
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
