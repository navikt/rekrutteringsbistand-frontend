import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useUseSugestions } from '../../api/kandidat-sok/useSugestions';

export interface ArbeidsønskerProps {
  children?: React.ReactNode | undefined;
}

const Arbeidsønsker: React.FC<ArbeidsønskerProps> = ({ children }) => {
  const [søkeTekst, setSøkeTekst] = React.useState<string>('');
  const [valgte, setValgte] = React.useState<string[]>([]);

  const { data, isLoading } = useUseSugestions();
  return (
    <React.Fragment>
      <UNSAFE_Combobox
        isLoading={isLoading}
        label='Arbeidsønsker'
        options={data ?? []}
        isMultiSelect
        selectedOptions={valgte}
        onToggleSelected={(verdi, selected) => {
          console.log('🎺 verdi', verdi);
          console.log('🎺 selected', selected);
        }}
        onChange={(val) => setSøkeTekst(val)}
      />
    </React.Fragment>
  );
};

export default Arbeidsønsker;
