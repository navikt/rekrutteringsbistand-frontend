import { SuggestType } from '@/app/api/kandidat-sok/useSuggestions';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import FriVerdiCombobox from '@/app/kandidat/kandidat-søk-filter/_ui/FriVerdiCombobox';
import { FC } from 'react';

const Arbeidserfaring: FC = () => {
  const { arbeidserfaring, setArbeidserfaring } = useKandidatSøkFilterContext();

  return (
    <FriVerdiCombobox
      label='Arbeidserfaring'
      type={SuggestType.Arbeidserfaring}
      verdier={arbeidserfaring}
      setVerdier={setArbeidserfaring}
    />
  );
};

export default Arbeidserfaring;
