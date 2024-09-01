import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';

import { useStillingsSøk } from '../../StillingsSøkContext';
import { Stillingskategori } from '../../../stilling/stilling-typer';

const kategorier = [Stillingskategori.Stilling, Stillingskategori.Jobbmesse];

const stillingskategoriTilVisningsnavn = (kategori: Stillingskategori) => {
  switch (kategori) {
    case Stillingskategori.Stilling:
      return 'Stilling';
    case Stillingskategori.Jobbmesse:
      return 'Jobbmesse';
    default:
      return '';
  }
};

const KategoriFilter: React.FC = () => {
  const { kategori, setKategori } = useStillingsSøk();

  return (
    <CheckboxGroup legend='Kategori' value={kategori} onChange={setKategori}>
      {kategorier.map((kategori) => (
        <Checkbox key={kategori} value={kategori}>
          {stillingskategoriTilVisningsnavn(kategori)}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default KategoriFilter;
