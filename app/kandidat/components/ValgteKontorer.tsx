import { useKontorSøk } from '../../api/kandidat-sok/useKontorSøk';
import { useKandidatSøkFilterContext } from '../KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';

const ValgteKontorer: React.FC = () => {
  const [søkeTekst, setSøkeTekst] = React.useState<string>('');
  const { valgtKontor, setValgtKontor } = useKandidatSøkFilterContext();

  const { data, isLoading } = useKontorSøk(søkeTekst);

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setValgtKontor([
        ...(Array.isArray(valgtKontor) ? valgtKontor : []),
        option,
      ]);
    } else {
      setValgtKontor(
        Array.isArray(valgtKontor)
          ? valgtKontor.filter((o) => o !== option)
          : [],
      );
    }
  };

  return (
    <UNSAFE_Combobox
      isLoading={isLoading}
      selectedOptions={valgtKontor}
      onToggleSelected={onOptionSelected}
      onChange={(val) => setSøkeTekst(val)}
      label='Velg kontorer'
      options={data ?? []}
      isMultiSelect
    />
  );
};

export default ValgteKontorer;
