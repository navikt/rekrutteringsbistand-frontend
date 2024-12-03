import { Label, Radio, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent, ReactNode } from 'react';
import { useApplikasjonContext } from '../../../ApplikasjonContext';
import { kategoriTilVisningsnavn } from '../../stilling-util';
import { Stillingskategori } from '../../stilling-typer';
import { Roller } from '../../../components/tilgangskontroll/roller';

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

  const { harRolle } = useApplikasjonContext();

  const harTilgang = (kategori: Stillingskategori): boolean => {
    switch (kategori) {
      case Stillingskategori.Stilling:
        return harRolle([
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]);

      case Stillingskategori.Jobbmesse:
        return harRolle([
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]);

      case Stillingskategori.Formidling:
        return harRolle([
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
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
