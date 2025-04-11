import { useKandidatlisteContext } from '../../../KandidatlisteContext';
import { KandidatVisningProps } from '../../KandidatlisteFilter/useFiltrerteKandidater';
import { Checkbox } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatCheckboxProps {
  kandidat?: KandidatVisningProps;
}

const KandidatCheckbox: React.FC<KandidatCheckboxProps> = ({ kandidat }) => {
  const { markerteKandidater, toggleMarkerKandidat, lukketKandidatliste } =
    useKandidatlisteContext();

  if (!kandidat) {
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
