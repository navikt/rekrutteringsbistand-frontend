import {
  SuggestType,
  useUseSugestions,
} from '../../../api/kandidat-sok/useSugestions';
import { useKandidatSøkFilterContext } from '../../KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';

const Språk: React.FC = () => {
  const { språk, setSpråk } = useKandidatSøkFilterContext();

  const [søkeTekst, setSøkeTekst] = React.useState<string>('');

  const { data, isLoading } = useUseSugestions(søkeTekst, SuggestType.Språk);

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setSpråk([...(Array.isArray(språk) ? språk : []), option]);
    } else {
      setSpråk(Array.isArray(språk) ? språk.filter((o) => o !== option) : []);
    }
  };

  return (
    <React.Fragment>
      <UNSAFE_Combobox
        isLoading={isLoading}
        selectedOptions={språk}
        label='Språk'
        options={data ?? []}
        isMultiSelect
        onToggleSelected={onOptionSelected}
        onChange={(val) => setSøkeTekst(val)}
      />
    </React.Fragment>
  );
};

export default Språk;
