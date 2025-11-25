import { useKompetanse } from '@/app/api/pam-ontologi/kompetansenavn/useKompetanse';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useMemo, useState } from 'react';

const Kompetanse: FC = () => {
  const { kompetanse, setKompetanse } = useKandidatSøkFilterContext();
  const [søkeTekst, setSøkeTekst] = useState<string>('');
  const kompetanseHook = useKompetanse(
    søkeTekst.length > 1 ? søkeTekst : undefined,
  );

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      const janzz = kompetanseHook.data?.find((item) => item.label === option);
      if (janzz) {
        setKompetanse([
          ...(Array.isArray(kompetanse) ? kompetanse : []),
          janzz.label,
        ]);
      }
    } else {
      setKompetanse(
        Array.isArray(kompetanse) ? kompetanse.filter((o) => o !== option) : [],
      );
    }
  };

  const kompetanseValg = useMemo(
    () =>
      kompetanseHook.data?.map((item) => ({
        label: item.label,
        value: item.label,
      })) ?? [],
    [kompetanseHook.data],
  );

  return (
    <UNSAFE_Combobox
      size='small'
      isLoading={kompetanseHook.isLoading}
      selectedOptions={kompetanse}
      value={søkeTekst}
      allowNewValues
      label='Kompetanse'
      // description='For eksempel fagbrev, sertifisering, ferdigheter eller programmer'
      options={kompetanseValg}
      toggleListButton={false}
      isMultiSelect
      isListOpen={søkeTekst.length > 1}
      onChange={(val) => setSøkeTekst(val)}
      onToggleSelected={onOptionSelected}
    />
  );
};

export default Kompetanse;
