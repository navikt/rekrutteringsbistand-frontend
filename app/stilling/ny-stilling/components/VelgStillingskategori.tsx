import { Label, Radio, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent, ReactNode } from 'react';
import { Rolle } from '../../../../types/Roller';
import { Stillingskategori } from '../../../../types/stilling/kategorier';
import { kategoriTilVisningsnavn } from '../../../../util/stilling';
import { ApplikasjonContext } from '../../../ApplikasjonContext';

const kategorier = [
  Stillingskategori.Stilling,
  Stillingskategori.Jobbmesse,
  Stillingskategori.Formidling,
];

type Props = {
  stillingskategori: Stillingskategori | null;
  setStillingskategori: (stillingskategori: Stillingskategori) => void;
  feilmelding?: ReactNode;
};

const VelgStillingskategori: FunctionComponent<Props> = ({
  stillingskategori,
  setStillingskategori,
  feilmelding,
}) => {
  const onStillingskategoriChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStillingskategori(event.target.value as Stillingskategori);
  };

  const { harRolle } = React.useContext(ApplikasjonContext);

  const harTilgang = (kategori: Stillingskategori): boolean => {
    switch (kategori) {
      case Stillingskategori.Stilling:
        return harRolle([
          Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]);

      case Stillingskategori.Jobbmesse:
        return harRolle([
          Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]);

      case Stillingskategori.Formidling:
        return harRolle([
          Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        ]);

      default:
        return false;
    }
  };

  return (
    <RadioGroup
      className='mb-2'
      error={feilmelding}
      legend={<Label as='span'>Hva skal du bruke stillingen til?</Label>}
    >
      {kategorier.map((kategori) =>
        harTilgang(kategori) ? (
          <Radio
            key={kategori}
            checked={stillingskategori === kategori}
            name='stillingskategori'
            value={kategori}
            onChange={onStillingskategoriChange}
          >
            {kategoriTilVisningsnavn(kategori)}
          </Radio>
        ) : null,
      )}
    </RadioGroup>
  );
};

export default VelgStillingskategori;
