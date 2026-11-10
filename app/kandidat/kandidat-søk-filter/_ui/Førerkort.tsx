import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { Førerkortklasse } from '@/app/kandidat/_util/kandidatsøk-typer';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC } from 'react';

const Førerkort: FC = () => {
  const { førerkort, setFørerkort } = useKandidatSøkFilterContext();

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setFørerkort([...(Array.isArray(førerkort) ? førerkort : []), option]);
    } else {
      setFørerkort(
        Array.isArray(førerkort) ? førerkort.filter((o) => o !== option) : [],
      );
    }
  };

  return (
    <UNSAFE_Combobox
      size='small'
      selectedOptions={førerkort}
      label='Førerkort'
      options={Object.values(Førerkortklasse)}
      isMultiSelect
      onToggleSelected={onOptionSelected}
    />
  );
};

export default Førerkort;
