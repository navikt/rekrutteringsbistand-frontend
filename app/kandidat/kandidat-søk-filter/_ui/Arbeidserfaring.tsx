import {
  SuggestType,
  useUseSugestions,
} from '@/app/api/kandidat-sok/useSugestions';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useState } from 'react';

const Arbeidserfaring: FC = () => {
  const { arbeidserfaring, setArbeidserfaring } = useKandidatSøkFilterContext();

  const [søkeTekst, setSøkeTekst] = useState<string>('');

  const { data, isLoading } = useUseSugestions(
    søkeTekst,
    SuggestType.Arbeidserfaring,
  );

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setArbeidserfaring([
        ...(Array.isArray(arbeidserfaring) ? arbeidserfaring : []),
        option,
      ]);
    } else {
      setArbeidserfaring(
        Array.isArray(arbeidserfaring)
          ? arbeidserfaring.filter((o) => o !== option)
          : [],
      );
    }
  };

  return (
    <UNSAFE_Combobox
      size='small'
      isLoading={isLoading}
      selectedOptions={arbeidserfaring}
      label='Arbeidserfaring'
      options={data ?? []}
      isMultiSelect
      allowNewValues
      onToggleSelected={onOptionSelected}
      onChange={(val) => setSøkeTekst(val)}
    />
  );
};

export default Arbeidserfaring;
