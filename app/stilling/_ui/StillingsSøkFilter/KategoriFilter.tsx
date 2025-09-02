import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

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
      <Checkbox value={Stillingskategori.Stilling}>
        {stillingskategoriTilVisningsnavn(Stillingskategori.Stilling)}
      </Checkbox>
      <Checkbox value={Stillingskategori.Jobbmesse}>
        {stillingskategoriTilVisningsnavn(Stillingskategori.Jobbmesse)}
      </Checkbox>
    </CheckboxGroup>
  );
}
