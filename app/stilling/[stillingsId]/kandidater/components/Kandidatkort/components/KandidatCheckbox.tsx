import { kandidaterSchemaDTO } from '../../../../../../api/kandidat/schema.zod';
import { useKandidatlisteContext } from '../../../KandidatlisteContext';
import { Checkbox } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatCheckboxProps {
  kandidat?: kandidaterSchemaDTO;
}

const KandidatCheckbox: React.FC<KandidatCheckboxProps> = ({ kandidat }) => {
  if (!kandidat) {
    return (
      <Checkbox hideLabel disabled>
        {' '}
      </Checkbox>
    );
  }
  const { markerteKandidater, toggleMarkerKandidat, lukketKandidatliste } =
    useKandidatlisteContext();

  return (
    <Checkbox
      disabled={!kandidat.fodselsnr || lukketKandidatliste}
      hideLabel
      checked={markerteKandidater.includes(kandidat)}
      onChange={() => toggleMarkerKandidat(kandidat)}
      aria-labelledby={`id-${kandidat.fornavn}-${kandidat.etternavn}`}
    >
      {' '}
    </Checkbox>
  );
};

export default KandidatCheckbox;
