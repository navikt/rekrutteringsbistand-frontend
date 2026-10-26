import { usynligKandidaterSchemaDTO } from '@/app/api/kandidat/schema.zod';
import { storForbokstav } from '@/app/kandidat/util';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';
import { erValgbarKandidat } from '@/app/stilling/[stillingsId]/kandidatliste/util';
import { Checkbox } from '@navikt/ds-react';
import { FC } from 'react';

export interface KandidatCheckboxProps {
  kandidat?: KandidatVisningProps;
  usynligKandidat?: usynligKandidaterSchemaDTO;
  slettet?: boolean;
}

const KandidatCheckbox: FC<KandidatCheckboxProps> = ({
  kandidat,
  usynligKandidat,
  slettet,
}) => {
  const { markerteKandidater, toggleMarkerKandidat, lukketKandidatliste } =
    useKandidatlisteContext();

  const navn = kandidat
    ? `${kandidat.etternavn}, ${kandidat.fornavn}`
    : usynligKandidat
      ? `${storForbokstav(usynligKandidat.etternavn)}, ${storForbokstav(usynligKandidat.fornavn)}`
      : '';

  if (!kandidat || slettet) {
    return (
      <Checkbox hideLabel disabled>
        Velg kandidat {navn}
      </Checkbox>
    );
  }

  return (
    <Checkbox
      key={kandidat.fodselsdato}
      hideLabel
      disabled={!erValgbarKandidat(kandidat) || lukketKandidatliste}
      checked={markerteKandidater.some(
        (k) => k.fodselsnr === kandidat.fodselsnr,
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={() => toggleMarkerKandidat(kandidat)}
    >
      Velg kandidat {navn}
    </Checkbox>
  );
};

export default KandidatCheckbox;
