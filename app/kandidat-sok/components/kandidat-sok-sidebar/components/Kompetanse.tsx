import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import {
  SuggestType,
  useUseSugestions,
} from '../../../../api/kandidat-sok/useSugestions';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';

const Kompetanse: React.FC = () => {
  const { kompetanse, setKompetanse } = useKandidatSøkFilter();

  const [søkeTekst, setSøkeTekst] = React.useState<string>('');

  const { data, isLoading } = useUseSugestions(
    søkeTekst,
    SuggestType.Kompetanse,
  );

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setKompetanse([...(Array.isArray(kompetanse) ? kompetanse : []), option]);
    } else {
      setKompetanse(
        Array.isArray(kompetanse) ? kompetanse.filter((o) => o !== option) : [],
      );
    }
  };

  return (
    <React.Fragment>
      <UNSAFE_Combobox
        isLoading={isLoading}
        selectedOptions={kompetanse}
        label='Kompetanse'
        description='For eksempel fagbrev, sertifisering, ferdigheter eller programmer'
        options={data ?? []}
        isMultiSelect
        onToggleSelected={onOptionSelected}
        onChange={(val) => setSøkeTekst(val)}
      />
    </React.Fragment>
  );
};

export default Kompetanse;
