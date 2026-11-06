import {
  SuggestType,
  useUseSuggestions,
} from '@/app/api/kandidat-sok/useSuggestions';
import {
  inneholderFødselsnummer,
  verdierLignerFødselsnummer,
} from '@/components/lagrede-søk/fødselsnummer';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useState } from 'react';

interface Props {
  label: string;
  type: SuggestType;
  verdier: string[];
  setVerdier: (verdier: string[]) => void;
}

/**
 * Filter der veilederen kan velge forslag eller skrive egen tekst. Verdier som ligner et fødselsnummer, legges ikke
 * til, og teksten sendes ikke til forslagene. Da havner de verken i URL-en eller i søket.
 */
const FriVerdiCombobox: FC<Props> = ({ label, type, verdier, setVerdier }) => {
  const [søkeTekst, setSøkeTekst] = useState<string>('');
  const [feil, setFeil] = useState<string>();

  const { data, isLoading } = useUseSuggestions(
    inneholderFødselsnummer(søkeTekst) ? '' : søkeTekst,
    type,
  );

  const feilmelding = `${label} kan ikke inneholde fødselsnummer.`;

  const onToggleSelected = (verdi: string, erValgt: boolean) => {
    if (!erValgt) {
      setVerdier(verdier.filter((v) => v !== verdi));
      return;
    }
    const nyeVerdier = [...verdier, verdi];
    if (verdierLignerFødselsnummer(nyeVerdier)) {
      setFeil(feilmelding);
      return;
    }
    setFeil(undefined);
    setVerdier(nyeVerdier);
  };

  return (
    <UNSAFE_Combobox
      size='small'
      isLoading={isLoading}
      selectedOptions={verdier}
      label={label}
      options={data ?? []}
      isMultiSelect
      allowNewValues
      error={feil}
      onToggleSelected={onToggleSelected}
      onChange={(tekst) => {
        setSøkeTekst(tekst);
        // Comboboxen tømmer feltet etter et valg, så feilen står til veilederen skriver noe nytt. Feilen vises også
        // mens veilederen skriver, fordi Aksel husker en avvist verdi og ikke sender den på nytt ved Enter.
        if (tekst)
          setFeil(
            verdierLignerFødselsnummer([...verdier, tekst])
              ? feilmelding
              : undefined,
          );
      }}
    />
  );
};

export default FriVerdiCombobox;
