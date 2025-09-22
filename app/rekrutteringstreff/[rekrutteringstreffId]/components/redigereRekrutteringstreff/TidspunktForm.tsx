'use client';

import DatoTidRad from './tidspunkt/DatoTidRad';
import { rekrutteringstreffVarighet } from './tidspunkt/varighet';
import { useAutosave } from './useAutosave';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Heading, Switch } from '@navikt/ds-react';
import { isSameDay } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type TidspunktFormFields = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
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

  const [flereDager, setFlereDager] = useState(
    fraDato && tilDato ? !isSameDay(fraDato, tilDato) : false,
  );

  useEffect(() => {
    if (fraDato && tilDato) {
      const shouldBeMultipledays = !isSameDay(fraDato, tilDato);
      setFlereDager(shouldBeMultipledays);
    }
  }, [fraDato, tilDato]);

  const periodeUgyldig = useMemo(() => {
    if (!fraDato || !fraTid || !tilTid) return false;
    const sluttDato = (tilDato as Date | null) ?? fraDato;
    const beregnetVarighet = rekrutteringstreffVarighet(
      fraDato,
      fraTid,
      sluttDato,
      tilTid,
    );

    if (!beregnetVarighet) return false;

    return beregnetVarighet === '0 min' || beregnetVarighet.startsWith('-');
  }, [fraDato, fraTid, tilDato, tilTid]);

  const varighet = useMemo(() => {
    if (!fraDato || !fraTid || !tilTid) return '';
    const sluttDato = (tilDato as Date | null) ?? fraDato;
    return rekrutteringstreffVarighet(fraDato, fraTid, sluttDato, tilTid);
  }, [fraDato, fraTid, tilDato, tilTid]);

  const harManuellPeriodefeil = errors.root?.type === 'manualPeriod';

  useEffect(() => {
    if (periodeUgyldig) {
      if (!harManuellPeriodefeil) {
        setError('root', {
          type: 'manualPeriod',
          message: 'Sluttidspunkt kan ikke være før eller lik starttidspunkt.',
        });
      }
    } else if (harManuellPeriodefeil) {
      clearErrors('root');
    }
  }, [periodeUgyldig, harManuellPeriodefeil, setError, clearErrors]);

  const periodUgyldig = periodeUgyldig;

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <Heading level='3' size='small'>
          Tid
        </Heading>
        <Switch
          checked={flereDager}
          onChange={() =>
            setFlereDager((prev) => {
              const next = !prev;
              if (!next && fraDato) {
                setValue('tilDato', fraDato, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
              return next;
            })
          }
        >
          Flere dager
        </Switch>
      </div>

      <div className='flex flex-col lg:flex-row gap-4'>
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
          hideDato={!flereDager}
          onSave={() => save(['tilDato', 'tilTid'])}
        />
      </div>

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
        <BodyShort size='small' className='mt-2'>
          {varighet && !periodUgyldig ? varighet : 'Velg tid'}
        </BodyShort>
      )}
    </div>
  );
};

export default TidspunktForm;
