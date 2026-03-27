'use client';

import {
  Sortering,
  SorteringLabel,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import { Radio, RadioGroup } from '@navikt/ds-react';

export default function RekrutteringstreffSøkSortering() {
  const { sortering, setSortering } = useRekrutteringstreffSøkFilter();

  return (
    <RadioGroup
      size='small'
      legend='Sorter'
      value={sortering}
      onChange={(val) => setSortering(val as Sortering)}
      className='pb-2'
    >
      {Object.values(Sortering).map((value) => (
        <Radio key={value} value={value}>
          {SorteringLabel[value]}
        </Radio>
      ))}
    </RadioGroup>
  );
}
