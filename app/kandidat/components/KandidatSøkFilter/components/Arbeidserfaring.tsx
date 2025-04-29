import {
  SuggestType,
  useUseSugestions,
} from '../../../../api/kandidat-sok/useSugestions';
import { useKandidatSøkFilterContext } from '../../../KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';

const Arbeidserfaring: React.FC = () => {
  const { arbeidserfaring, setArbeidserfaring } = useKandidatSøkFilterContext();

  const [søkeTekst, setSøkeTekst] = React.useState<string>('');

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
    <React.Fragment>
      <UNSAFE_Combobox
        isLoading={isLoading}
        selectedOptions={arbeidserfaring}
        label='Arbeidserfaring'
        options={data ?? []}
        isMultiSelect
        onToggleSelected={onOptionSelected}
        onChange={(val) => setSøkeTekst(val)}
      />
    </React.Fragment>
  );
};

export default Arbeidserfaring;
