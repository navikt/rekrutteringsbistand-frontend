import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useUseSugestions } from '../../../api/kandidat-sok/useSugestions';
import { useKandidatSøkFilter } from '../../KandidaSokContext';

export interface ArbeidsønskerProps {
  children?: React.ReactNode | undefined;
}

const Arbeidsønsker: React.FC<ArbeidsønskerProps> = ({ children }) => {
  const { ønsketYrke, setØnsketYrke } = useKandidatSøkFilter();

  const [søkeTekst, setSøkeTekst] = React.useState<string>('');

  const { data, isLoading } = useUseSugestions(søkeTekst);

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setØnsketYrke([...(Array.isArray(ønsketYrke) ? ønsketYrke : []), option]);
    } else {
      setØnsketYrke(
        Array.isArray(ønsketYrke) ? ønsketYrke.filter((o) => o !== option) : [],
      );
    }
  };

  return (
    <React.Fragment>
      <UNSAFE_Combobox
        isLoading={isLoading}
        selectedOptions={ønsketYrke}
        label='Arbeidsønsker'
        options={data ?? []}
        isMultiSelect
        onToggleSelected={onOptionSelected}
        onChange={(val) => setSøkeTekst(val)}
      />
    </React.Fragment>
  );
};

export default Arbeidsønsker;
