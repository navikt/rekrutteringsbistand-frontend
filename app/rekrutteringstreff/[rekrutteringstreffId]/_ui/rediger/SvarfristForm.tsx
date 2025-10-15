'use client';

import { useRekrutteringstreffData } from '../hooks/useRekrutteringstreffData';
import { useAutosaveRekrutteringstreff } from './hooks/kladd/useAutosaveRekrutteringstreff';
import { useFilteredTimeOptions } from './hooks/useFilteredTimeOptions';
import { useScheduledSave } from './hooks/useScheduledSave';
import DatoTidRad from './tidspunkt/DatoTidRad';
import { isGyldigTid, kombinerDatoOgTid } from './tidspunkt/utils';
import { Heading } from '@navikt/ds-react';
import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
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
  const { autosave } = useAutosaveRekrutteringstreff();
  const { setValue } = useFormContext();

  const [dato, tid] = useWatch({
    control,
    name: ['svarfristDato', 'svarfristTid'],
  });

  const [fraDato, fraTid] = useWatch({
    control,
    name: ['fraDato', 'fraTid'],
  });

  const { treff } = useRekrutteringstreffData();

  // Bruk de nye hooks
  const { scheduleSave } = useScheduledSave(autosave, [
    'fraDato',
    'fraTid',
    'tilDato',
    'tilTid',
    'svarfristDato',
    'svarfristTid',
  ]);

  const svarfristTimeOptions = useFilteredTimeOptions(
    dato,
    fraDato,
    fraTid,
    0, // tillat samme tidspunkt som treffet
  );

  // Last inn eksisterende svarfrist fra API
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

  // Auto-juster svarfrist når svarfrist er etter starttid
  useEffect(() => {
    if (!fraDato || !isGyldigTid(fraTid)) return;

    const startTidspunkt = kombinerDatoOgTid(fraDato, fraTid);
    const svarfristTidspunkt = kombinerDatoOgTid(dato ?? null, tid ?? null);

    if (!startTidspunkt || !svarfristTidspunkt) return;

    // Juster til starttid kun hvis svarfrist er etter starttid
    if (svarfristTidspunkt.getTime() > startTidspunkt.getTime()) {
      setValue('svarfristDato', new Date(fraDato), {
        shouldDirty: true,
        shouldValidate: false,
      });
      setValue('svarfristTid', fraTid, {
        shouldDirty: true,
        shouldValidate: false,
      });
      scheduleSave();
    }
  }, [fraDato, fraTid, dato, tid, setValue, scheduleSave]);

  // Lagre når svarfrist endres (håndteres av DatoTidRad onBlur events)

  return (
    <div className='space-y-4'>
      <Heading level='3' size='small'>
        Svarfrist
      </Heading>
      <div>
        <DatoTidRad<SvarfristFormFields>
          nameDato='svarfristDato'
          nameTid='svarfristTid'
          control={control}
          dateTo={fraDato ?? undefined}
          timeOptions={svarfristTimeOptions}
          onDatoBlur={scheduleSave}
          onTidBlur={scheduleSave}
        />
      </div>
    </div>
  );
};

export default SvarfristForm;
