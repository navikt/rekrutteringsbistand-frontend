'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { useAutosave } from './useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export type SvarfristFormFields = {
  svarfristDato: Date | null;
  svarfristTid: string;
};

const pad = (n: number) => String(n).padStart(2, '0');
const toDate = (iso?: string | null) => (iso ? new Date(iso) : null);
const toHHmm = (iso?: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const SvarfristForm = ({ control }: any) => {
  const { save } = useAutosave();
  const { setValue } = useFormContext();
  const [dato, tid] = useWatch({
    control,
    name: ['svarfristDato', 'svarfristTid'],
  });

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);

  React.useEffect(() => {
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

  return (
    <div className='space-y-4'>
      <Heading level='3' size='small'>
        Svarfrist
      </Heading>
      <DatoTidRad<SvarfristFormFields>
        label=''
        nameDato='svarfristDato'
        nameTid='svarfristTid'
        control={control}
        onSave={() => save(['svarfristDato', 'svarfristTid'])}
      />
    </div>
  );
};

export default SvarfristForm;
