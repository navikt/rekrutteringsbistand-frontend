import { useKontorSøk } from '@/app/api/kandidat-sok/useKontorSøk';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import navkontorer from '@/components/layout/modiadekoratør/enheter.json';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

const finnEnhetId = (navn: string) =>
  navkontorer.find((k) => k.navn.toLowerCase() === navn.toLowerCase())
    ?.enhetId ?? navn;

const finnNavn = (enhetId: string) =>
  navkontorer.find((k) => k.enhetId === enhetId)?.navn ?? enhetId;

const ValgteKontorer: FC = () => {
  const [søkeTekst, setSøkeTekst] = useState<string>('');
  // Combobox popover kan havne feil offset hvis den portales til body samtidig som body har overflow:hidden.
  // Vi bruker en lokal ref som portal-target slik at positioning lib (floating-ui) får korrekt bounding rect.
  const portalRef = useRef<HTMLDivElement | null>(null);
  const { valgtKontor, setValgtKontor } = useKandidatSøkFilterContext();

  const { data, isLoading } = useKontorSøk(søkeTekst);

  const onOptionSelected = (option: string, isSelected: boolean) => {
    const enhetId = finnEnhetId(option);
    if (isSelected) {
      setValgtKontor([
        ...(Array.isArray(valgtKontor) ? valgtKontor : []),
        enhetId,
      ]);
    } else {
      setValgtKontor(
        Array.isArray(valgtKontor)
          ? valgtKontor.filter((o) => o !== enhetId)
          : [],
      );
    }
  };

  const selectedOptions = (Array.isArray(valgtKontor) ? valgtKontor : []).map(
    finnNavn,
  );

  return (
    <div ref={portalRef}>
      <UNSAFE_Combobox
        isLoading={isLoading}
        selectedOptions={selectedOptions}
        onToggleSelected={onOptionSelected}
        onChange={(val) => setSøkeTekst(val)}
        value={søkeTekst}
        label='Velg kontorer'
        options={data ?? []}
        isMultiSelect
        shouldAutocomplete
      />
    </div>
  );
};

export default ValgteKontorer;
