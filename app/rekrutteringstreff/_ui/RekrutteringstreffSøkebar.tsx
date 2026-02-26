'use client';

import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import { Search } from '@navikt/ds-react';
import { FC } from 'react';

const RekrutteringstreffSøkebar: FC = () => {
  const { fritekst, setFritekst } = useRekrutteringstreffSøkFilter();

  return (
    <Search
      size='small'
      hideLabel
      label='Søk i rekrutteringstreff'
      placeholder='Søk i rekrutteringstreff'
      variant='secondary'
      value={fritekst}
      onChange={(val) => setFritekst(val)}
      onClear={() => setFritekst('')}
    />
  );
};

export default RekrutteringstreffSøkebar;
