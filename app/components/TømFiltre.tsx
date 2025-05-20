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
  exlude?: string[];
}

const TømFiltre: React.FC<TømFiltreProps> = ({ exlude }) => {
  return (
    <Chips.Removable
      className='text-nowrap'
      onClick={() => clearAllQueryParams(exlude ? exlude : ['portefolje'])}
    >
      Tøm filtre
    </Chips.Removable>
  );
};

export default TømFiltre;
