'use client';

import DatoTidRad from './tidspunkt/DatoTidRad';
import { useAutosave } from './useAutosave';
import { Heading } from '@navikt/ds-react';

export type SvarfristFormFields = {
  svarfristDato: Date | null;
  svarfristTid: string;
};

const SvarfristForm = ({ control }: any) => {
  const { save } = useAutosave();

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
