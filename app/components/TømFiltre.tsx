'use client';

import { Button } from '@navikt/ds-react';
import * as React from 'react';

const clearAllQueryParams = (exclude: string[] = []) => {
  const searchParams = new URLSearchParams(window.location.search);
  const preservedParams = new URLSearchParams();

  exclude.forEach((param) => {
    const value = searchParams.get(param);
    if (value) preservedParams.set(param, value);
  });

  window.history.pushState(
    {},
    '',
    `${window.location.pathname}${preservedParams.toString() ? '?' + preservedParams.toString() : ''}`,
  );
};

export interface TømFiltreProps {
  fjernFritekst?: () => void;
  exlude?: string[];
}

const TømFiltre: React.FC<TømFiltreProps> = ({ fjernFritekst, exlude }) => {
  const eksluderFilter = ['portefolje', 'visKandidatnr'];
  return (
    <Button
      size='small'
      variant={'tertiary-neutral'}
      className='text-nowrap'
      onClick={() => {
        fjernFritekst?.();
        clearAllQueryParams(
          exlude ? [...eksluderFilter, ...exlude] : eksluderFilter,
        );
      }}
    >
      Fjern alle filtre
    </Button>
  );
};

export default TømFiltre;
