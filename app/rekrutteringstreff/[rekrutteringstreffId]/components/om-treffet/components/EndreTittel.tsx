import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Modal, Textarea } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, { useRef, useState, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

export interface EndreTittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
}

const MAX_TITLE_LENGTH = 30;

const ZOD_TOO_SMALL = 'too_small';
const ZOD_TOO_BIG = 'too_big';

const schema = z.object({
  nyTittel: z
    .string()
    .trim()
    .min(1, 'Tittel kan ikke være tom.')
    .max(
      MAX_TITLE_LENGTH,
      `Tittelen kan ikke ha mer enn ${MAX_TITLE_LENGTH} tegn.`,
    ),
});
type FormValues = z.infer<typeof schema>;

const EndreTittel = ({
  modalRef,
  rekrutteringstreff,
  onUpdated,
}: EndreTittelProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { nyTittel: rekrutteringstreff.tittel },
  });

  const nyTittel = useWatch({ control, name: 'nyTittel' });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [skalViseTomFeil, setSkalViseTomFeil] = useState(false);

  useEffect(() => {
    setSkalViseTomFeil(false);
  }, [nyTittel]);

  const save = async ({ nyTittel }: FormValues) => {
    try {
      const { id, beskrivelse, sted, fraTid, tilTid } = rekrutteringstreff;
      await oppdaterRekrutteringstreff(id, {
        tittel: nyTittel,
        beskrivelse,
        sted,
        fraTid,
        tilTid,
      });
      onUpdated();
      modalRef.current?.close();
    } catch (error) {
      logger.error('Lagring av tittel feilet:', error);
    }
  };

  const onInvalid = () => {
    if (errors.nyTittel?.type === ZOD_TOO_SMALL) setSkalViseTomFeil(true);
  };

  const clear = () => {
    setValue('nyTittel', '', { shouldValidate: true, shouldDirty: true });
    textareaRef.current?.focus();
  };

  const close = () => {
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff.tittel });
  };

  const errorMsg =
    errors.nyTittel?.type === ZOD_TOO_BIG
      ? errors.nyTittel.message
      : skalViseTomFeil && errors.nyTittel?.type === ZOD_TOO_SMALL
        ? errors.nyTittel.message
        : undefined;

  const disableSave = errors.nyTittel?.type === ZOD_TOO_BIG || isSubmitting;

  return (
    <Modal
      ref={modalRef}
      header={{ heading: 'Endre navn på treffet' }}
      width={400}
      onClose={close}
    >
      <Modal.Body>
        <form
          id='skjema-endre-tittel'
          onSubmit={handleSubmit(save, onInvalid)}
          className='space-y-2'
        >
          <div className='flex items-start'>
            <Controller
              control={control}
              name='nyTittel'
              render={({ field }) => (
                <Textarea
                  {...field}
                  ref={textareaRef}
                  hideLabel
                  label='Ny tittel'
                  maxLength={MAX_TITLE_LENGTH}
                  autoFocus
                  minRows={1}
                  maxRows={1}
                  rows={1}
                  resize={false}
                  className='w-full pt-2 pr-9'
                  error={errorMsg}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (!disableSave) handleSubmit(save, onInvalid)();
                    }
                  }}
                />
              )}
            />

            {nyTittel && (
              <Button
                type='button'
                onClick={clear}
                aria-label='Tøm tittel feltet'
                variant='tertiary'
                size='small'
                className='h-8 p-1 -ml-18 mt-3 flex items-center'
              >
                <XMarkIcon aria-hidden fontSize='1.25rem' />
              </Button>
            )}
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className='pt-0'>
        <Button
          type='submit'
          form='skjema-endre-tittel'
          loading={isSubmitting}
          disabled={disableSave}
        >
          Lagre
        </Button>
        <Button type='button' variant='secondary' onClick={close}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EndreTittel.displayName = 'EndreTittel';
export default EndreTittel;
