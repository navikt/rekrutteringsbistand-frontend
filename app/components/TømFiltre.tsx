'use client';

import { Chips } from '@navikt/ds-react';

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

const TømFiltre = () => {
  return (
    <Chips.Removable
      className='text-nowrap'
      onClick={() => clearAllQueryParams(['portefolje'])}
    >
      Tøm filtre
    </Chips.Removable>
  );
};

export default TømFiltre;
