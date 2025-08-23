import { storForbokstavString } from '@/app/kandidat/util';
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
  const formatChipText = (text: string) => {
    let formattedText = text.replace(/_/g, ' ');

    formattedText = formattedText.replace(
      /([a-z])([A-Z])/g,
      (match, p1, p2) => `${p1} ${p2.toLowerCase()}`,
    );

    formattedText = formattedText.replace(
      /([A-Z])([A-Z][a-z])/g,
      (match, p1, p2) => `${p1} ${p2.charAt(0).toLowerCase()}${p2.slice(1)}`,
    );

    return formattedText;
  };

  if (type) {
    return (
      <Chips size='small' className='m-0 p-0'>
        {type.map((verdi, i) => (
          <Chips.Removable
            key={i}
            onClick={() => setVerdi(type.filter((i) => i !== verdi))}
          >
            {mapVerdiNavn
              ? formatChipText(mapVerdiNavn(verdi))
              : formatChipText(storForbokstavString(verdi))}
          </Chips.Removable>
        ))}{' '}
      </Chips>
    );
  }
  return null;
};

export default FilterChip;
