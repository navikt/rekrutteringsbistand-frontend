'use client';

import {
  RekrutteringstreffSortering,
  useRekrutteringstreffSøkFilter,
} from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import { Radio, RadioGroup } from '@navikt/ds-react';

export default function RekrutteringstreffSøkSortering() {
  const { sortering, setSortering } = useRekrutteringstreffSøkFilter();

  return (
    <RadioGroup
      size='small'
      legend='Sorter'
      value={sortering}
      onChange={(val) => setSortering(val as RekrutteringstreffSortering)}
      className='pb-2'
    >
      <Radio value={RekrutteringstreffSortering.Publiseringsdato}>
        Publiseringsdato
      </Radio>
      <Radio value={RekrutteringstreffSortering.Utløpsdato}>Utløpsdato</Radio>
    </RadioGroup>
  );
}
