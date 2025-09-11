import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC } from 'react';

export enum Førerkortklasse {
  LettMotorsykkel = 'A1 - Lett motorsykkel',
  MellomtungMotorsykkel = 'A2 - Mellomtung motorsykkel',
  TungMotorsykkel = 'A - Tung motorsykkel',
  Personbil = 'B - Personbil',
  PersonbilMedTilhenger = 'BE - Personbil med tilhenger',
  LettLastebil = 'C1 - Lett lastebil',
  LettLastebilMedTilhenger = 'C1E - Lett lastebil med tilhenger',
  Lastebil = 'C - Lastebil',
  LastebilMedTilhenger = 'CE - Lastebil med tilhenger',
  Minibuss = 'D1 - Minibuss',
  MinibussMedTilhenger = 'D1E - Minibuss med tilhenger',
  Buss = 'D - Buss',
  BussMedTilhenger = 'DE - Buss med tilhenger',
  Traktor = 'T - Traktor',
  Snøscooter = 'S - Snøscooter',
}

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
