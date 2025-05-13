import { formaterNorskDato } from '../../../../../../components/util';
import RekrutteringstreffDetalj from '../../../RekrutteringstreffDetalj';
import Tidspunktrad from './tidspunktrad';
import { rekrutteringstreffVarighet } from './varighet';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import {
  CalendarIcon,
  ExclamationmarkTriangleIcon,
  PencilIcon,
  PlusIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage, Modal } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { addWeeks, format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export type TidspunktFormFields = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
};

interface Props {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
}

const formaterKlokkeslett = (dato: Date | null): string =>
  dato ? format(dato, 'HH:mm') : '';

export default function Tidspunkt({
  rekrutteringstreff,
  onUpdated,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  const formMethods = useForm<TidspunktFormFields>({
    defaultValues: {
      fraDato: initialFra ?? addWeeks(new Date(), 2),
      fraTid: formaterKlokkeslett(initialFra) || '08:00',
      tilDato: initialTil ?? addWeeks(new Date(), 2),
      tilTid: formaterKlokkeslett(initialTil) || '10:00',
    },
  });

  const { handleSubmit, watch, setError, formState, clearErrors } = formMethods;

  const { fraDato, fraTid, tilDato, tilTid } = watch();
  const varighet = rekrutteringstreffVarighet(fraDato, fraTid, tilDato, tilTid);

  useEffect(() => {
    const erUgyldigPeriode =
      varighet && (varighet.startsWith('-') || varighet === '0 min');

    if (erUgyldigPeriode) {
      if (formState.errors.root?.type !== 'manualPeriod') {
        setError('root', {
          type: 'manualPeriod',
          message: 'Sluttidspunkt kan ikke være før eller lik starttidspunkt.',
        });
      }
      if (formState.errors.tilDato?.type !== 'visualCueOnly') {
        setError('tilDato', { type: 'visualCueOnly' });
      }
      if (formState.errors.tilTid?.type !== 'visualCueOnly') {
        setError('tilTid', { type: 'visualCueOnly' });
      }
    } else {
      if (formState.errors.root?.type === 'manualPeriod') {
        clearErrors('root');
      }
      if (formState.errors.tilDato?.type === 'visualCueOnly') {
        clearErrors('tilDato');
      }
      if (formState.errors.tilTid?.type === 'visualCueOnly') {
        clearErrors('tilTid');
      }
    }
  }, [
    varighet,
    setError,
    clearErrors,
    formState.errors.root,
    formState.errors.tilDato,
    formState.errors.tilTid,
  ]);

  const onSubmit = async (data: TidspunktFormFields) => {
    if (!data.fraDato || !data.tilDato) return;

    const innsendt = rekrutteringstreffVarighet(
      data.fraDato,
      data.fraTid,
      data.tilDato,
      data.tilTid,
    );

    if (
      innsendt.startsWith('-') ||
      (innsendt === '' && data.fraDato && data.tilDato)
    ) {
      if (formState.errors.root?.type !== 'manualPeriod') {
        setError('root', {
          type: 'manualPeriod',
          message: 'Sluttidspunkt kan ikke være før eller lik starttidspunkt.',
        });
      }
      if (formState.errors.tilDato?.type !== 'visualCueOnly') {
        setError('tilDato', { type: 'visualCueOnly' });
      }

      if (formState.errors.tilTid?.type !== 'visualCueOnly') {
        setError('tilTid', { type: 'visualCueOnly' });
      }
      return;
    }

    if (formState.errors.root?.type === 'manualPeriod') {
      clearErrors('root');
    }
    if (formState.errors.tilDato?.type === 'visualCueOnly') {
      clearErrors('tilDato');
    }
    if (formState.errors.tilTid?.type === 'visualCueOnly') {
      clearErrors('tilTid');
    }

    setOpen(false);

    const { tittel, beskrivelse, sted } = rekrutteringstreff;

    try {
      await oppdaterRekrutteringstreff(rekrutteringstreff.id, {
        tittel,
        beskrivelse,
        sted,
        fraTid: toIso(data.fraDato, data.fraTid),
        tilTid: toIso(data.tilDato, data.tilTid),
      });
      onUpdated();
    } catch (error) {
      logger.error('Feil ved lagring av tidspunkt', error);
      setError('root', {
        type: 'api',
        message: 'Lagring feilet. Prøv igjen senere.',
      });
      setOpen(true);
    }
  };

  const formId = 'tidspunktForm';

  return (
    <div className={className}>
      <RekrutteringstreffDetalj
        tittelIkon={<CalendarIcon fontSize='1.5rem' />}
        tittel='Tidspunkt'
        knapp={
          <Button
            variant='tertiary'
            size='small'
            icon={rekrutteringstreff.fraTid ? <PencilIcon /> : <PlusIcon />}
            onClick={() => setOpen(true)}
            aria-expanded={open}
          >
            {rekrutteringstreff.fraTid ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {initialFra && initialTil ? (
          isSameDay(initialFra, initialTil) ? (
            <BodyShort size='small'>
              {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {formaterKlokkeslett(initialFra)}-
                {formaterKlokkeslett(initialTil)}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {formaterKlokkeslett(initialFra)}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialTil, visning: 'tall' })}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {formaterKlokkeslett(initialTil)}
                </BodyShort>
              </BodyShort>
            </>
          )
        ) : (
          <BodyShort size='small' textColor='subtle'>
            &nbsp;
          </BodyShort>
        )}
      </RekrutteringstreffDetalj>

      <Modal
        open={open}
        width={420}
        onClose={() => {
          setOpen(false);
          if (formState.errors.root?.type === 'manualPeriod')
            clearErrors('root');
          if (formState.errors.tilDato?.type === 'visualCueOnly')
            clearErrors('tilDato');
          if (formState.errors.tilTid?.type === 'visualCueOnly')
            clearErrors('tilTid');
        }}
        header={{ heading: 'Tidspunkt' }}
      >
        <Modal.Body>
          <FormProvider {...formMethods}>
            <form
              id={formId}
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4 p-2'
            >
              <Tidspunktrad label='Fra' nameDato='fraDato' nameTid='fraTid' />
              <Tidspunktrad label='Til' nameDato='tilDato' nameTid='tilTid' />

              {formState.errors.root && formState.errors.root.message && (
                <div className='flex items-center gap-1 mt-2'>
                  <ExclamationmarkTriangleIcon
                    aria-hidden
                    fontSize='1.5rem'
                    className='aksel-error-message mr-2'
                  />
                  <ErrorMessage size='medium'>
                    {formState.errors.root.message}
                  </ErrorMessage>
                </div>
              )}

              {(!formState.errors.root ||
                formState.errors.root.type !== 'manualPeriod') &&
                (varighet &&
                !varighet.startsWith('-') &&
                varighet !== '0 min' ? (
                  <BodyShort size='small' textColor='subtle' className='mt-2'>
                    {varighet}
                  </BodyShort>
                ) : (
                  <BodyShort size='small' textColor='subtle' className='mt-2'>
                    Velg tid
                  </BodyShort>
                ))}
            </form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button
            form={formId}
            type='submit'
            disabled={varighet.startsWith('-') || varighet === '0 min'}
          >
            Lagre
          </Button>
          <Button
            variant='secondary'
            type='button'
            onClick={() => {
              setOpen(false);
              if (formState.errors.root?.type === 'manualPeriod')
                clearErrors('root');
              if (formState.errors.tilDato?.type === 'visualCueOnly')
                clearErrors('tilDato');
              if (formState.errors.tilTid?.type === 'visualCueOnly')
                clearErrors('tilTid');
            }}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const toIso = (d: Date, t: string) => {
  const [h, m] = t.split(':').map(Number);
  const copy = new Date(d);
  copy.setHours(h, m, 0, 0);
  return copy.toISOString();
};
