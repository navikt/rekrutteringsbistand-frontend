import { storForbokstavString } from '@/app/kandidat/util';
import { Chips } from '@navikt/ds-react';
import * as React from 'react';

export const formatChipText = (text: string) => {
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

export interface FilterChipProps {
  type?: string[];
  setVerdi: (verdi: string[]) => void;
  mapVerdiNavn?: (verdi: string) => string;
  className?: string; // ekstra styling (f.eks. truncate)
}

const FilterChip: React.FC<FilterChipProps> = ({
  type,
  setVerdi,
  mapVerdiNavn,
  className,
}) => {
  if (type) {
    return type.map((verdi, i) => (
      <Chips.Removable
        key={i}
        onClick={() => setVerdi(type.filter((i) => i !== verdi))}
        className={`whitespace-nowrap leading-none ${className || ''}`.trim()}
      >
        {mapVerdiNavn
          ? formatChipText(mapVerdiNavn(verdi))
          : formatChipText(storForbokstavString(verdi))}
      </Chips.Removable>
    ));
  }
};

export default FilterChip;
