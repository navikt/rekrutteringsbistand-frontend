import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';
import { Checkbox } from '@navikt/ds-react';

export interface KandidatCheckboxProps {
  kandidat?: KandidatVisningProps;
  slettet?: boolean;
}

const KandidatCheckbox: React.FC<KandidatCheckboxProps> = ({
  kandidat,
  slettet,
}) => {
  const { markerteKandidater, toggleMarkerKandidat, lukketKandidatliste } =
    useKandidatlisteContext();

  if (!kandidat || slettet) {
    return (
      <Checkbox hideLabel disabled>
        {' '}
      </Checkbox>
    );
  }

  return (
    <Checkbox
      key={kandidat.fodselsdato}
      hideLabel
      disabled={!kandidat.fodselsnr || lukketKandidatliste}
      checked={markerteKandidater.some(
        (k) => k.fodselsnr === kandidat.fodselsnr,
      )}
      onChange={() => toggleMarkerKandidat(kandidat)}
      aria-labelledby={`id-${kandidat.fornavn}-${kandidat.etternavn}`}
    >
      {' '}
    </Checkbox>
  );
};

export default KandidatCheckbox;
