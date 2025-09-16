import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
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
  const filterCtx = useStillingsSøkFilter();
  const { kategori, setKategori } = filterCtx;
  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const combined = useStillingssøk({
    filter: filterCtx,
    eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    navIdent: brukerData?.ident,
    formidlinger: filterCtx.formidlinger,
  });

  const kategoriBuckets = combined.data?.antall?.kategoriBuckets;
  const loading = combined.isLoading || combined.isValidating;

  const finnCount = (kategoriKey: string) => {
    if (loading) return '-';

    // Bruk kategoriBuckets som matcher søkelogikken nøyaktig
    if (kategoriBuckets) {
      if (kategoriKey === Stillingskategori.Stilling) {
        return kategoriBuckets.stilling || 0;
      } else if (kategoriKey === Stillingskategori.Jobbmesse) {
        return kategoriBuckets.jobbmesse || 0;
      }
    }

    return 0;
  };

  return (
    <CheckboxGroup
      hideLegend={hideLegend}
      size='small'
      legend='Kategori'
      value={kategori}
      onChange={setKategori}
    >
      <Checkbox value={Stillingskategori.Stilling}>
        {stillingskategoriTilVisningsnavn(Stillingskategori.Stilling)} (
        {finnCount(Stillingskategori.Stilling)})
      </Checkbox>
      <Checkbox value={Stillingskategori.Jobbmesse}>
        {stillingskategoriTilVisningsnavn(Stillingskategori.Jobbmesse)} (
        {finnCount(Stillingskategori.Jobbmesse)})
      </Checkbox>
    </CheckboxGroup>
  );
}
