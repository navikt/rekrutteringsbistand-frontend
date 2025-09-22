'use client';

import DatoTidRad from './tidspunkt/DatoTidRad';
import { rekrutteringstreffVarighet } from './tidspunkt/varighet';
import { useAutosave } from './useAutosave';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Heading, Switch } from '@navikt/ds-react';
import { isSameDay } from 'date-fns';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
      setFlereDager(!isSameDay(fraDato, tilDato));
    }
  }, [fraDato, tilDato]);

  // Når brukeren skrur av "Flere dager", sørg for at tilDato settes lik fraDato (kun en gang / ved avvik)
  useEffect(() => {
    if (!flereDager && fraDato) {
      if (!tilDato || !isSameDay(fraDato, tilDato)) {
        setValue('tilDato', fraDato, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [flereDager, fraDato, tilDato, setValue]);

  const varighet = useMemo(() => {
    if (!fraDato || !fraTid || !tilTid) return '';
    const sluttDato = (tilDato as Date | null) ?? fraDato;
    return rekrutteringstreffVarighet(fraDato, fraTid, sluttDato, tilTid);
  }, [fraDato, fraTid, tilDato, tilTid]);

  const intervalGroupRef = useRef<HTMLDivElement | null>(null);

  const validateAndMaybeSave = useCallback(() => {
    if (!fraDato || !fraTid || !tilTid) {
      if (errors.root?.type === 'manualPeriod') clearErrors('root');
      return;
    }

    const sluttDato = (tilDato as Date | null) ?? fraDato;
    const v = rekrutteringstreffVarighet(fraDato, fraTid, sluttDato, tilTid);
    const ugyldig = v === '0 min' || v?.startsWith('-');

    if (ugyldig) {
      setError('root', {
        type: 'manualPeriod',
        message: 'Sluttidspunkt kan ikke være før eller lik starttidspunkt.',
      });
    } else {
      if (errors.root?.type === 'manualPeriod') clearErrors('root');
      save(['fraDato', 'fraTid', 'tilDato', 'tilTid']);
    }
  }, [
    fraDato,
    fraTid,
    tilDato,
    tilTid,
    errors.root,
    clearErrors,
    setError,
    save,
  ]);

  const handleGroupBlur = useCallback(
    (e: React.FocusEvent) => {
      const container = intervalGroupRef.current;
      const next = e.relatedTarget as Node | null;
      if (container && next && container.contains(next)) {
        // Fokus fortsatt inne i gruppa
        return;
      }
      // Fokus flyttet ut av intervallgruppen -> valider & lagre
      validateAndMaybeSave();
    },
    [validateAndMaybeSave],
  );

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <Heading level='3' size='small'>
          Tid
        </Heading>
        <Switch
          checked={flereDager}
          // Viktig: Ikke kalle setValue direkte her for å unngå React warning (setState i annen komponent under render).
          onChange={() => setFlereDager((prev) => !prev)}
        >
          Flere dager
        </Switch>
      </div>

      <div
        ref={intervalGroupRef}
        className='flex flex-col lg:flex-row gap-4'
        onBlurCapture={handleGroupBlur}
      >
        <DatoTidRad<TidspunktFormFields>
          label='Fra'
          nameDato='fraDato'
          nameTid='fraTid'
          control={control}
        />

        <DatoTidRad<TidspunktFormFields>
          label='Til'
          nameDato='tilDato'
          nameTid='tilTid'
          control={control}
          hideDato={!flereDager}
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
          {varighet && !errors.root ? varighet : 'Velg tid'}
        </BodyShort>
      )}
    </div>
  );
};

export default TidspunktForm;
