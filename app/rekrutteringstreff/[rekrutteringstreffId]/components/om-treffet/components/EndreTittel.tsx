// app/(…)/EndreTittel.tsx
'use client';

import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/tittelValidering/useValiderRekrutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { RobotFrownIcon, RobotSmileIcon, XMarkIcon } from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  Button,
  Loader,
  Modal,
  Textarea,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

// app/(…)/EndreTittel.tsx

// app/(…)/EndreTittel.tsx

interface Props {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
}

const MAX = 50;
const AUTO = 'Nytt rekrutteringstreff';

const schema = z.object({
  nyTittel: z.string().trim().min(1).max(MAX),
});
type Form = z.infer<typeof schema>;

const EndreTittel = ({ modalRef, rekrutteringstreff, onUpdated }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { nyTittel: rekrutteringstreff.tittel },
  });

  const nyTittel = useWatch({ control, name: 'nyTittel' });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    trigger: validate,
    data: analyse,
    error: analyseError,
    isMutating: validating,
  } = useValiderRekrutteringstreff();

  useEffect(() => {
    if (nyTittel?.trim()) validate({ tittel: nyTittel, beskrivelse: null });
  }, [nyTittel, validate]);

  const disableSave =
    isSubmitting ||
    validating ||
    analyse?.bryterRetningslinjer ||
    !!errors.nyTittel;

  const save = async ({ nyTittel }: Form) => {
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
    } catch (e) {
      logger.error('Lagring av tittel feilet:', e);
    }
  };

  const clear = () =>
    setValue('nyTittel', '', { shouldValidate: true, shouldDirty: true });

  const close = () => {
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff.tittel });
  };

  return (
    <Modal
      ref={modalRef}
      header={{ heading: 'Endre navn på treffet' }}
      width={400}
      onClose={close}
      onFocus={() => {
        if (rekrutteringstreff.tittel === AUTO) reset({ nyTittel: '' });
        textareaRef.current?.focus();
      }}
    >
      <Modal.Body>
        <form
          id='endre-tittel'
          onSubmit={handleSubmit(save)}
          className='space-y-4'
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
                  maxLength={MAX}
                  minRows={1}
                  maxRows={1}
                  resize={false}
                  className='w-full pt-2 pr-9'
                  error={
                    errors.nyTittel?.message ||
                    (analyse?.bryterRetningslinjer
                      ? 'Tittelen bryter retningslinjene'
                      : undefined)
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (!disableSave) handleSubmit(save)();
                    }
                  }}
                />
              )}
            />

            {nyTittel && (
              <Button
                type='button'
                onClick={clear}
                variant='tertiary'
                size='small'
                className='h-8 p-1 -ml-18 mt-3'
              >
                <XMarkIcon aria-hidden fontSize='1.25rem' />
              </Button>
            )}
          </div>

          {validating && (
            <div className='flex justify-center'>
              <Loader size='xlarge' title='Validerer tittel...' />
            </div>
          )}

          {analyseError && !validating && (
            <Alert variant='error'>
              {analyseError.message ?? 'En feil oppstod under validering.'}
            </Alert>
          )}

          {analyse && !validating && !analyseError && (
            <div className='flex items-center gap-3 mt-2'>
              {analyse.bryterRetningslinjer ? (
                <RobotFrownIcon
                  aria-hidden
                  fontSize='2em'
                  className='text-red-600'
                />
              ) : (
                <RobotSmileIcon
                  aria-hidden
                  fontSize='2em'
                  className='text-green-800'
                />
              )}
              <span
                className={
                  analyse.bryterRetningslinjer
                    ? 'text-red-700'
                    : 'text-green-700'
                }
              >
                <BodyLong>{analyse.begrunnelse}</BodyLong>
              </span>
            </div>
          )}

          {analyseError && !validating && (
            <div className='flex items-center gap-3 mt-2'>
              <RobotFrownIcon
                aria-hidden
                fontSize='2em'
                className='text-red-600'
              />
              <span className='text-red-700 font-semibold'>
                {analyseError.message ?? 'En feil oppstod under validering.'}
              </span>
            </div>
          )}
        </form>
      </Modal.Body>

      <Modal.Footer className='pt-1'>
        <Button
          type='submit'
          form='endre-tittel'
          loading={isSubmitting}
          disabled={disableSave}
        >
          Lagre
        </Button>
        <Button variant='secondary' onClick={close}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EndreTittel;
