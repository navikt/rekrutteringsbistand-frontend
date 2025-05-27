import RekrutteringstreffDetalj from '../../RekrutteringstreffDetalj';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocationPinIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal, TextField } from '@navikt/ds-react';
// Fjernet Detail da den ikke er i bruk
import { logger } from '@navikt/next-logger';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const stedSchema = z.object({
  gateadresse: z.string().trim().min(1, 'Gateadresse må fylles ut'),
  postnummer: z
    .string()
    .trim()
    .min(1, 'Postnummer må fylles ut')
    .regex(/^\d{4}$/, 'Postnummer må bestå av 4 siffer'),
});

const formId = 'skjema-endre-sted';

export type StedFormFields = z.infer<typeof stedSchema>;

export interface StedProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
}

const Sted: React.FC<StedProps> = ({
  rekrutteringstreff,
  className,
  onUpdated,
}) => {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<StedFormFields>({
    resolver: zodResolver(stedSchema),
    defaultValues: {
      gateadresse: rekrutteringstreff.gateadresse || '',
      postnummer: rekrutteringstreff.postnummer || '',
    },
    mode: 'onChange',
  });

  const harStedsinfo =
    !!rekrutteringstreff.gateadresse || !!rekrutteringstreff.postnummer;

  const åpneModal = () => {
    reset({
      gateadresse: rekrutteringstreff.gateadresse || '',
      postnummer: rekrutteringstreff.postnummer || '',
    });
    modalRef.current?.showModal();
  };

  const close = () => {
    reset({
      gateadresse: rekrutteringstreff.gateadresse || '',
      postnummer: rekrutteringstreff.postnummer || '',
    });
    modalRef.current?.close();
  };

  const onSubmit = async (data: StedFormFields) => {
    const { tittel, beskrivelse, fraTid, tilTid } = rekrutteringstreff;

    try {
      await oppdaterRekrutteringstreff(rekrutteringstreff.id, {
        tittel,
        beskrivelse,
        gateadresse: data.gateadresse,
        postnummer: data.postnummer,
        fraTid,
        tilTid,
      });
      onUpdated();
      close();
    } catch (error) {
      logger.error('Error in postApi:', error);
    }
  };

  const disableSave = !isDirty || !isValid || isSubmitting;

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
            onClick={åpneModal}
          >
            {harStedsinfo ? 'Endre' : 'Legg til'}
          </Button>
        }
        className={className}
      >
        {harStedsinfo ? (
          <BodyShort size='small'>
            {rekrutteringstreff.gateadresse}
            {rekrutteringstreff.gateadresse &&
              rekrutteringstreff.postnummer &&
              ', '}
            {rekrutteringstreff.postnummer}
          </BodyShort>
        ) : (
          <BodyShort size='small' textColor='subtle'>
            Ikke oppgitt
          </BodyShort>
        )}
      </RekrutteringstreffDetalj>
      <Modal
        ref={modalRef}
        header={{ heading: harStedsinfo ? 'Endre sted' : 'Legg til sted' }} // Dynamisk header
        width={400}
        onClose={close}
      >
        <Modal.Body>
          <form
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
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
            <Controller
              name='postnummer'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Postnummer'
                  error={fieldState.error?.message}
                />
              )}
            />
          </form>
        </Modal.Body>
        <Modal.Footer className='pt-2'>
          <Button
            type='submit'
            form={formId}
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
    </>
  );
};

export default Sted;
