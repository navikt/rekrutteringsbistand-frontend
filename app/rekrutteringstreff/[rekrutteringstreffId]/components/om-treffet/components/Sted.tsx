import RekrutteringstreffDetalj from '../../RekrutteringstreffDetalj';
import { usePamPostdata } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocationPinIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal, TextField } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, { useEffect, useId, useRef, useMemo } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const stedSchema = z.object({
  gateadresse: z.string().trim().min(1, 'Gateadresse må fylles ut'),
  postnummer: z
    .string()
    .trim()
    .min(1, 'Postnummer må fylles ut')
    .regex(/^\d{4}$/, 'Postnummer må bestå av 4 siffer'),
  poststed: z.string().optional(),
});
type StedFormFields = z.infer<typeof stedSchema>;

interface StedProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
}

const Sted: React.FC<StedProps> = ({
  rekrutteringstreff,
  onUpdated,
  className,
}) => {
  const {
    id,
    gateadresse = '',
    postnummer = '',
    tittel,
    beskrivelse,
    fraTid,
    tilTid,
  } = rekrutteringstreff;

  const formId = useId();
  const modalRef = useRef<HTMLDialogElement>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    watch,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<StedFormFields>({
    resolver: zodResolver(stedSchema),
    defaultValues: {
      gateadresse: gateadresse || undefined,
      postnummer: postnummer || undefined,
      poststed: '',
    },
    mode: 'onBlur',
  });

  const watchPostnummer = watch('postnummer');
  const { data: postdata, isLoading } = usePamPostdata(watchPostnummer);

  useEffect(() => {
    if (watchPostnummer.length !== 4 || isLoading) return;
    setValue('poststed', postdata?.korrigertNavnBy ?? '', {
      shouldDirty: true,
      shouldValidate: false,
    });
  }, [watchPostnummer, isLoading, postdata, setValue]);

  const harStedsinfo = useMemo(
    () => !!gateadresse || !!postnummer,
    [gateadresse, postnummer],
  );

  const open = () => {
    reset();
    modalRef.current?.showModal();
  };
  const close = () => {
    modalRef.current?.close();
    reset();
  };

  const submit: SubmitHandler<StedFormFields> = async ({
    gateadresse,
    postnummer,
  }: StedFormFields) => {
    try {
      await oppdaterRekrutteringstreff(id, {
        tittel,
        beskrivelse,
        gateadresse,
        postnummer,
        fraTid,
        tilTid,
      });
      onUpdated();
      close();
    } catch (err) {
      logger.error('Feil ved oppdatering av sted:', err);
    }
  };

  return (
    <>
      <RekrutteringstreffDetalj
        tittelIkon={<LocationPinIcon fontSize='1.5rem' />}
        tittel='Sted'
        knapp={
          <Button
            icon={harStedsinfo ? <PencilIcon /> : <PlusIcon />}
            variant='tertiary'
            size='small'
            onClick={open}
          >
            {harStedsinfo ? 'Endre' : 'Legg til'}
          </Button>
        }
        className={className}
      >
        {harStedsinfo && (
          <>
            <BodyShort size='small'>{gateadresse}</BodyShort>
            {postnummer && (
              <BodyShort size='small' textColor='subtle'>
                {postnummer}
                {watch('poststed') && ` ${watch('poststed')}`}
              </BodyShort>
            )}
          </>
        )}
      </RekrutteringstreffDetalj>

      <Modal
        ref={modalRef}
        header={{ heading: harStedsinfo ? 'Endre sted' : 'Legg til sted' }}
        width={400}
        onClose={close}
      >
        <Modal.Body>
          <form
            id={formId}
            onSubmit={handleSubmit(submit)}
            className='space-y-4'
          >
            <Controller
              name='gateadresse'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Gateadresse'
                  error={fieldState.error?.message}
                  autoFocus
                />
              )}
            />
            <div className='flex gap-4'>
              <Controller
                name='postnummer'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Postnummer'
                    htmlSize={12}
                    error={fieldState.error?.message}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      clearErrors('postnummer');
                      setValue('poststed', '', {
                        shouldDirty: false,
                        shouldValidate: false,
                      });
                      if (value.length <= 4) field.onChange(value);
                    }}
                  />
                )}
              />
              <BodyShort className='pt-8'>
                {watch('poststed') ||
                  (watchPostnummer.length === 4 && !isLoading
                    ? 'Ukjent poststed'
                    : '')}
              </BodyShort>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            form={formId}
            type='submit'
            loading={isSubmitting}
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Lagre
          </Button>
          <Button variant='secondary' onClick={close}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sted;
