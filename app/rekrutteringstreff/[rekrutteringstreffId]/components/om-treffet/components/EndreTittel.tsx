import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Modal, Textarea } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export interface EndreTittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
}

const MAX_TITLE_LENGTH = 30;

const schema = z.object({
  nyTittel: z
    .string()
    .trim()
    .min(1, 'Tittel kan ikke være tom.')
    .max(MAX_TITLE_LENGTH, 'Tittelen kan ikke være lenger enn 30 tegn.'),
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
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<FormValues>({
    defaultValues: { nyTittel: rekrutteringstreff?.tittel ?? '' },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const nyTittelValue = watch('nyTittel');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async ({ nyTittel }: FormValues) => {
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

  const handleClearTittel = () => {
    setValue('nyTittel', '', { shouldValidate: true, shouldDirty: true });
    textareaRef.current?.focus();
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff?.tittel ?? '' });
  };

  return (
    <Modal
      ref={modalRef}
      header={{ heading: 'Endre navn på treffet' }}
      width={400}
      onClose={handleCloseModal}
    >
      <Modal.Body>
        <form
          id='skjema-endre-tittel'
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-2'
        >
          <div className='flex items-start'>
            <Controller
              name='nyTittel'
              control={control}
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
                  error={
                    errors.nyTittel?.type === 'too_big'
                      ? errors.nyTittel.message
                      : isSubmitted && errors.nyTittel?.type === 'too_small'
                        ? errors.nyTittel.message
                        : undefined
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (isValid && !isSubmitting) handleSubmit(onSubmit)();
                    }
                  }}
                />
              )}
            />

            {nyTittelValue && (
              <Button
                type='button'
                onClick={handleClearTittel}
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
          disabled={errors.nyTittel?.type === 'too_big' || isSubmitting}
        >
          Lagre
        </Button>
        <Button type='button' variant='secondary' onClick={handleCloseModal}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EndreTittel.displayName = 'EndreTittel';
export default EndreTittel;
