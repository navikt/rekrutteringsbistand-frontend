'use client';

import { Search } from '@navikt/ds-react';
import { useState } from 'react';

export interface SøkebarProps {
  label: string;
  onSøk: (verdi: string) => void;
  placeholder?: string;
}

export default function Søkebar({ label, onSøk, placeholder }: SøkebarProps) {
  const [verdi, setVerdi] = useState('');

  const søk = () => {
    const trimmet = verdi.trim();
    if (!trimmet) return;
    onSøk(trimmet);
    setVerdi('');
  };

  return (
    <Search
      size='small'
      variant='secondary'
      hideLabel
      label={label}
      placeholder={placeholder ?? label}
      value={verdi}
      onChange={setVerdi}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          søk();
        } else if (e.key === 'Escape') {
          setVerdi('');
        }
      }}
      onSearchClick={søk}
    />
  );
}
