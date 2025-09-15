import {
  SuggestType,
  useUseSugestions,
} from '@/app/api/kandidat-sok/useSugestions';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useState } from 'react';

const Arbeidsønsker: FC = () => {
  const { ønsketYrke, setØnsketYrke } = useKandidatSøkFilterContext();

  const [søkeTekst, setSøkeTekst] = useState<string>('');

  const { data, isLoading } = useUseSugestions(
    søkeTekst,
    SuggestType.ØnsketYrke,
  );

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
    <UNSAFE_Combobox
      size='small'
      isLoading={isLoading}
      selectedOptions={ønsketYrke}
      label='Arbeidsønsker'
      options={data ?? []}
      isMultiSelect
      onToggleSelected={onOptionSelected}
      onChange={(val) => setSøkeTekst(val)}
    />
  );
};

export default Arbeidsønsker;
