import {
  SuggestType,
  useUseSugestions,
} from '@/app/api/kandidat-sok/useSugestions';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useState } from 'react';

const Språk: FC = () => {
  const { språk, setSpråk } = useKandidatSøkFilterContext();

  const [søkeTekst, setSøkeTekst] = useState<string>('');

  const { data, isLoading } = useUseSugestions(søkeTekst, SuggestType.Språk);

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setSpråk([...(Array.isArray(språk) ? språk : []), option]);
    } else {
      setSpråk(Array.isArray(språk) ? språk.filter((o) => o !== option) : []);
    }
  };

  return (
    <UNSAFE_Combobox
      size='small'
      isLoading={isLoading}
      selectedOptions={språk}
      label='Språk'
      options={data ?? []}
      isMultiSelect
      onToggleSelected={onOptionSelected}
      onChange={(val) => setSøkeTekst(val)}
    />
  );
};

export default Språk;
