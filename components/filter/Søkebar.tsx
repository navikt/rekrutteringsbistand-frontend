'use client';

import { Search } from '@navikt/ds-react';
import { useState } from 'react';

export interface SøkebarProps {
  label: string;
  onSøk: (verdi: string) => void;
  valider?: (verdi: string) => string | undefined;
  placeholder?: string;
}

export default function Søkebar({
  label,
  onSøk,
  valider,
  placeholder,
}: SøkebarProps) {
  const [verdi, setVerdi] = useState('');
  const [feil, setFeil] = useState<string>();

  const søk = () => {
    const trimmet = verdi.trim();
    if (!trimmet) return;
    const valideringsfeil = valider?.(trimmet);
    if (valideringsfeil) {
      setFeil(valideringsfeil);
      return;
    }
    onSøk(trimmet);
    setVerdi('');
    setFeil(undefined);
  };

  return (
    <Search
      size='small'
      variant='secondary'
      hideLabel
      label={label}
      placeholder={placeholder ?? label}
      value={verdi}
      error={feil}
      onChange={(nyVerdi) => {
        setVerdi(nyVerdi);
        setFeil(undefined);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          søk();
        } else if (e.key === 'Escape') {
          setVerdi('');
          setFeil(undefined);
        }
      }}
      onSearchClick={søk}
    />
  );
}
