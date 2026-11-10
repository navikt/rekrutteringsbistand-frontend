import { SuggestType } from '@/app/api/kandidat-sok/useSuggestions';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import FriVerdiCombobox from '@/app/kandidat/kandidat-søk-filter/_ui/FriVerdiCombobox';
import { FC } from 'react';

const Kompetanse: FC = () => {
  const { kompetanse, setKompetanse } = useKandidatSøkFilterContext();

  return (
    <FriVerdiCombobox
      label='Kompetanse'
      type={SuggestType.Kompetanse}
      verdier={kompetanse}
      setVerdier={setKompetanse}
    />
  );
};

export default Kompetanse;
