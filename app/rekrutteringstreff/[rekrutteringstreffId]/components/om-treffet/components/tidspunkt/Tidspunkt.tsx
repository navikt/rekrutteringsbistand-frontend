import RekrutteringstreffDetalj from '../../../RekrutteringstreffDetalj';
import Tidspunktrad from './tidspunktrad';
import { rekrutteringstreffVarighet } from './varighet';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import {
  RekrutteringstreffDTO,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import {
  CalendarIcon,
  ExclamationmarkTriangleIcon,
  PencilIcon,
  PlusIcon,
} from '@navikt/aksel-icons';
import { Modal, Button, BodyShort, ErrorMessage } from '@navikt/ds-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export type TidspunktFormFields = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
};

export type FormData = TidspunktFormFields & { root?: string };

interface Props {
  rekrutteringstreff: RekrutteringstreffDTO;
  className?: string;
}

const formaterKlokkeslett = (dato: Date | null): string =>
  dato ? format(dato, 'HH:mm') : '';

export default function Tidspunkt({ rekrutteringstreff, className }: Props) {
  const [open, setOpen] = useState(false);
  const treff = useRekrutteringstreff(rekrutteringstreff.id);

  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  const formMethods = useForm<FormData>({
    defaultValues: {
      fraDato: initialFra,
      fraTid: formaterKlokkeslett(initialFra) || '08:00',
      tilDato: initialTil,
      tilTid: formaterKlokkeslett(initialTil) || '10:00',
    },
  });

  const { handleSubmit, watch, setError, formState, reset, clearErrors } =
    formMethods;

  useEffect(() => {
    const newInitialFra = rekrutteringstreff.fraTid
      ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
      : null;
    const newInitialTil = rekrutteringstreff.tilTid
      ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
      : null;

    reset({
      fraDato: newInitialFra,
      fraTid: formaterKlokkeslett(newInitialFra) || '08:00',
      tilDato: newInitialTil,
      tilTid: formaterKlokkeslett(newInitialTil) || '10:00',
    });
  }, [rekrutteringstreff.fraTid, rekrutteringstreff.tilTid, reset]);

  const { fraDato, fraTid, tilDato, tilTid } = watch();
  const varighet = rekrutteringstreffVarighet(fraDato, fraTid, tilDato, tilTid);

  const onSubmit = async (data: FormData) => {
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
      setError('root', { type: 'manual', message: 'Vrengt periode' });
      return;
    }

    if (formState.errors.root) clearErrors('root');

    setOpen(false);

    const { tittel, beskrivelse, sted } = rekrutteringstreff;

    await oppdaterRekrutteringstreff(rekrutteringstreff.id, {
      tittel,
      beskrivelse,
      sted,
      fraTid: toIso(data.fraDato, data.fraTid),
      tilTid: toIso(data.tilDato, data.tilTid),
    });

    treff.mutate();
  };

  const formId = 'tidspunktForm';

  return (
    <div className={className}>
      <RekrutteringstreffDetalj
        tittelIkon={<CalendarIcon fontSize='1.5rem' />}
        tittel='Tidspunkt'
        knapp={
          !open && (
            <Button
              variant='tertiary'
              size='small'
              icon={rekrutteringstreff.fraTid ? <PencilIcon /> : <PlusIcon />}
              onClick={() => setOpen(true)}
              aria-expanded={open}
            >
              {rekrutteringstreff.fraTid ? 'Endre' : 'Legg til'}
            </Button>
          )
        }
      >
        {initialFra && initialTil ? (
          isSameDay(initialFra, initialTil) ? (
            <BodyShort size='small'>
              {format(initialFra, 'dd.MM.yyyy')}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {formaterKlokkeslett(initialFra)}-
                {formaterKlokkeslett(initialTil)}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {format(initialFra, 'dd.MM.yyyy')}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {formaterKlokkeslett(initialFra)}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {format(initialTil, 'dd.MM.yyyy')}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {formaterKlokkeslett(initialTil)}
                </BodyShort>
              </BodyShort>
            </>
          )
        ) : (
          <BodyShort size='small' textColor='subtle'>
            Ikke satt
          </BodyShort>
        )}
      </RekrutteringstreffDetalj>

      <Modal
        open={open}
        width={420}
        onClose={() => {
          setOpen(false);
          if (formState.errors.root) clearErrors('root');
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

              {formState.errors.root ? (
                <div
                  className='flex items-center gap-1'
                  style={{ color: 'var(--a-text-danger)' }}
                >
                  <ExclamationmarkTriangleIcon aria-hidden fontSize='1.25rem' />
                  <ErrorMessage size='medium'>
                    {formState.errors.root.message}
                  </ErrorMessage>
                </div>
              ) : varighet &&
                (varighet.startsWith('-') || varighet === '0 min') ? (
                <BodyShort
                  size='small'
                  style={{ color: 'var(--a-text-danger)' }}
                >
                  {varighet}
                </BodyShort>
              ) : (
                <BodyShort size='small' textColor='subtle'>
                  {varighet || 'Velg tid'}
                </BodyShort>
              )}
            </form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button form={formId} type='submit'>
            Lagre
          </Button>
          <Button
            variant='secondary'
            type='button'
            onClick={() => {
              setOpen(false);
              if (formState.errors.root) clearErrors('root');
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
