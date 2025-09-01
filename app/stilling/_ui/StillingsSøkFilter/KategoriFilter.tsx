import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

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

export interface KategoriFilterProps {
  hideLegend?: boolean;
}

export default function KategoriFilter({ hideLegend }: KategoriFilterProps) {
  const { kategori, setKategori } = useStillingsSøkFilter();
  return (
    <CheckboxGroup
      hideLegend={hideLegend}
      size='small'
      legend='Kategori'
      value={kategori}
      onChange={setKategori}
    >
      {kategorier.map((kategori) => (
        <Checkbox key={kategori} value={kategori}>
          {stillingskategoriTilVisningsnavn(kategori)}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
