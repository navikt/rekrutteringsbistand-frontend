'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { rekrutteringstreffVarighet } from './tidspunkt/varighet';
import { useAutosave } from './useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyShort, Checkbox, ErrorMessage, Heading } from '@navikt/ds-react';
import { isSameDay } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type TidspunktFormFields = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
};

const pad = (n: number) => String(n).padStart(2, '0');
const toDate = (iso?: string | null) => (iso ? new Date(iso) : null);
const toHHmm = (iso?: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const TidspunktForm = ({ control }: any) => {
  const {
    setError,
    clearErrors,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { save } = useAutosave();

  const [fraDato, fraTid, tilDato, tilTid] = useWatch({
    control,
    name: ['fraDato', 'fraTid', 'tilDato', 'tilTid'],
  });

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  useEffect(() => {
    if (!treff) return;

    if (!fraDato && treff.fraTid) {
      setValue('fraDato', toDate(treff.fraTid), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
    if (!fraTid && treff.fraTid) {
      setValue('fraTid', toHHmm(treff.fraTid), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
    if (!tilDato && treff.tilTid) {
      setValue('tilDato', toDate(treff.tilTid), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
    if (!tilTid && treff.tilTid) {
      setValue('tilTid', toHHmm(treff.tilTid), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [treff, fraDato, fraTid, tilDato, tilTid, setValue]);

  const [flereDager, setFlereDager] = useState(
    fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false,
  );

  useEffect(() => {
    if (fraDato && tilDato) {
      setFlereDager(!isSameDay(fraDato, tilDato));
    }
  }, [fraDato, tilDato]);

  useEffect(() => {
    if (!flereDager && fraDato && !isSameDay(fraDato, tilDato)) {
      setValue('tilDato', fraDato, { shouldValidate: true, shouldDirty: true });
    }
  }, [flereDager, fraDato, tilDato, setValue]);

  const varighet = useMemo(
    () => rekrutteringstreffVarighet(fraDato, fraTid, tilDato, tilTid),
    [fraDato, fraTid, tilDato, tilTid],
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
    } else if (errors.root?.type === 'manualPeriod') {
      clearErrors('root');
    }
  }, [varighet, errors, setError, clearErrors]);

  const periodUgyldig = varighet.startsWith('-') || varighet === '0 min';

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <Heading level='3' size='small'>
          Tid
        </Heading>
        <Checkbox
          checked={flereDager}
          onChange={() => setFlereDager(!flereDager)}
        >
          Flere dager
        </Checkbox>
      </div>

      <DatoTidRad<TidspunktFormFields>
        label='Fra'
        nameDato='fraDato'
        nameTid='fraTid'
        control={control}
        onSave={() => save(['fraDato', 'fraTid'])}
      />

      <DatoTidRad<TidspunktFormFields>
        label='Til'
        nameDato='tilDato'
        nameTid='tilTid'
        control={control}
        disabledDato={!flereDager}
        disabledTid={false}
        onSave={() => save(['tilDato', 'tilTid'])}
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
    </div>
  );
};

export default TidspunktForm;
