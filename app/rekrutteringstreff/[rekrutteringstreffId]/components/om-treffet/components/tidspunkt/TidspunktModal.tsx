'use client';

import DatoTidRad from './DatoTidRad';
import { formaterKlokkeslett, toIso } from './utils';
import { rekrutteringstreffVarighet } from './varighet';
import {
  oppdaterRekrutteringstreff,
  toOppdaterRekrutteringstreffDto,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import type { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage, Modal } from '@navikt/ds-react';
import { addWeeks, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

type Props = {
  rekrutteringstreff: RekrutteringstreffDTO;
  modalRef: React.RefObject<HTMLDialogElement | null>;
  onUpdated: () => void;
};

type TidspunktFormFields = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
};

export default function TidspunktModal({
  rekrutteringstreff,
  modalRef,
  onUpdated,
}: Props) {
  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  const methods = useForm<TidspunktFormFields>({
    defaultValues: {
      fraDato: initialFra ?? addWeeks(new Date(), 2),
      fraTid: formaterKlokkeslett(initialFra) || '08:00',
      tilDato: initialTil ?? addWeeks(new Date(), 2),
      tilTid: formaterKlokkeslett(initialTil) || '10:00',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const [fraDato, fraTid, tilDato, tilTid] = useWatch({
    control: methods.control,
    name: ['fraDato', 'fraTid', 'tilDato', 'tilTid'],
  });

  const varighet = useMemo(
    () => rekrutteringstreffVarighet(fraDato, fraTid, tilDato, tilTid),
    [fraDato, fraTid, tilDato, tilTid],
  );
  const periodUgyldig = useMemo(
    () => varighet.startsWith('-') || varighet === '0 min',
    [varighet],
  );

  useEffect(() => {
    const ugyldig =
      varighet && (varighet.startsWith('-') || varighet === '0 min');

    if (ugyldig) {
      if (errors.root?.type !== 'manualPeriod') {
        setError('root', {
          type: 'manualPeriod',
          message: 'Sluttidspunkt kan ikke være før eller lik starttidspunkt.',
        });
      }
      if (errors.tilDato?.type !== 'visualCueOnly')
        setError('tilDato', { type: 'visualCueOnly' });
      if (errors.tilTid?.type !== 'visualCueOnly')
        setError('tilTid', { type: 'visualCueOnly' });
    } else {
      if (errors.root?.type === 'manualPeriod') clearErrors('root');
      if (errors.tilDato?.type === 'visualCueOnly') clearErrors('tilDato');
      if (errors.tilTid?.type === 'visualCueOnly') clearErrors('tilTid');
    }
  }, [varighet, errors, setError, clearErrors]);

  const onSubmit = async (data: TidspunktFormFields) => {
    if (periodUgyldig) return;

    modalRef.current?.close();

    await oppdaterRekrutteringstreff(
      rekrutteringstreff.id,
      toOppdaterRekrutteringstreffDto({
        ...rekrutteringstreff,
        fraTid: toIso(data.fraDato!, data.fraTid),
        tilTid: toIso(data.tilDato!, data.tilTid),
      }),
    );
    onUpdated();
  };

  const close = () => {
    modalRef.current?.close();
    clearErrors();
  };

  const formId = 'tidspunktForm';

  return (
    <Modal
      ref={modalRef}
      width={360}
      onClose={close}
      header={{ heading: 'Velg tidspunkt' }}
    >
      <Modal.Body>
        <FormProvider {...methods}>
          <form
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <DatoTidRad<TidspunktFormFields>
              label='Fra'
              nameDato='fraDato'
              nameTid='fraTid'
            />
            <DatoTidRad<TidspunktFormFields>
              label='Til'
              nameDato='tilDato'
              nameTid='tilTid'
            />

            {errors.root?.message ? (
              <div className='flex items-center gap-1 mt-2'>
                <ExclamationmarkTriangleIcon
                  aria-hidden
                  fontSize='1.5rem'
                  className='aksel-error-message mr-2'
                />
                <ErrorMessage size='medium'>{errors.root.message}</ErrorMessage>
              </div>
            ) : (
              <BodyShort size='small' textColor='subtle' className='mt-2'>
                {varighet && !periodUgyldig ? varighet : 'Velg tid'}
              </BodyShort>
            )}
          </form>
        </FormProvider>
      </Modal.Body>

      <Modal.Footer className='pt-1'>
        <Button
          type='submit'
          form={formId}
          disabled={periodUgyldig}
          loading={isSubmitting}
        >
          Lagre
        </Button>
        <Button variant='secondary' type='button' onClick={close}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
