import {
  SuggestType,
  useUseSugestions,
} from '@/app/api/kandidat-sok/useSugestions';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useState } from 'react';

const Kompetanse: FC = () => {
  const { kompetanse, setKompetanse } = useKandidatSøkFilterContext();

  const [søkeTekst, setSøkeTekst] = useState<string>('');

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
    <UNSAFE_Combobox
      size='small'
      isLoading={isLoading}
      selectedOptions={kompetanse}
      allowNewValues
      label='Kompetanse'
      // description='For eksempel fagbrev, sertifisering, ferdigheter eller programmer'
      options={data ?? []}
      isMultiSelect
      onToggleSelected={onOptionSelected}
      onChange={(val) => setSøkeTekst(val)}
    />
  );
};

export default Kompetanse;
