import { storForbokstavString } from '../kandidat/util';
import { Chips } from '@navikt/ds-react';
import * as React from 'react';

export interface FilterChipProps {
  type?: string[];
  setVerdi: (verdi: string[]) => void;
  mapVerdiNavn?: (verdi: string) => string;
}

const FilterChip: React.FC<FilterChipProps> = ({
  type,
  setVerdi,
  mapVerdiNavn,
}) => {
  if (type) {
    return type.map((verdi, i) => (
      <Chips key={verdi + i}>
        <Chips.Removable
          variant='neutral'
          onClick={() => setVerdi(type.filter((i) => i !== verdi))}
        >
          {mapVerdiNavn ? mapVerdiNavn(verdi) : storForbokstavString(verdi)}
        </Chips.Removable>
      </Chips>
    ));
  }
  return null;
};

export default FilterChip;
