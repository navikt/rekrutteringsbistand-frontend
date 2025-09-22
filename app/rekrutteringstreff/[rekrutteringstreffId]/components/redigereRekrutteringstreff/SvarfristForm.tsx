'use client';

import DatoTidRad from './tidspunkt/DatoTidRad';
import { useAutosave } from './useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { Heading } from '@navikt/ds-react';
import { parseISO, format } from 'date-fns';
import React, { useCallback, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export type SvarfristFormFields = {
  svarfristDato: Date | null;
  svarfristTid: string;
};

const toDate = (iso?: string | null) => (iso ? parseISO(iso) : null);
const toHHmm = (iso?: string | null) =>
  iso ? format(parseISO(iso), 'HH:mm') : '';

interface Props {
  control: any;
}

const SvarfristForm = ({ control }: Props) => {
  const { save } = useAutosave();
  const { setValue } = useFormContext();
  const [dato, tid] = useWatch({
    control,
    name: ['svarfristDato', 'svarfristTid'],
  });

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  useEffect(() => {
    if (!treff) return;
    if (!dato && treff.svarfrist) {
      setValue('svarfristDato', toDate(treff.svarfrist), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
    if (!tid && treff.svarfrist) {
      setValue('svarfristTid', toHHmm(treff.svarfrist), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [treff, dato, tid, setValue]);

  const svarfristGroupRef = useRef<HTMLDivElement | null>(null);

  const saveOnGroupBlur = useCallback(() => {
    if (dato || tid) {
      save(['svarfristDato', 'svarfristTid']);
    }
  }, [dato, tid, save]);

  const handleGroupBlur = useCallback(
    (e: React.FocusEvent) => {
      const container = svarfristGroupRef.current;
      const next = e.relatedTarget as Node | null;
      if (container && next && container.contains(next)) {
        return;
      }
      saveOnGroupBlur();
    },
    [saveOnGroupBlur],
  );

  return (
    <div className='space-y-4'>
      <Heading level='3' size='small'>
        Svarfrist
      </Heading>
      <div ref={svarfristGroupRef} onBlurCapture={handleGroupBlur}>
        <DatoTidRad<SvarfristFormFields>
          label=''
          nameDato='svarfristDato'
          nameTid='svarfristTid'
          control={control}
        />
      </div>
    </div>
  );
};

export default SvarfristForm;
