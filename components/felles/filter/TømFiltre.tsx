'use client';

import { Chips } from '@navikt/ds-react';
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
  const eksluderFilter = ['portefolje', 'visKandidatnr', 'finnStilling'];
  return (
    <Chips.Toggle
      checkmark={false}
      variant='neutral'
      key={'Fjern alle filtre'}
      onClick={() => {
        fjernFritekst?.();
        clearAllQueryParams(
          exlude ? [...eksluderFilter, ...exlude] : eksluderFilter,
        );
      }}
    >
      Fjern alle filtre
    </Chips.Toggle>
  );
};

export default TømFiltre;
