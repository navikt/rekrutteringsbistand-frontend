import {
  GeografiType,
  PamGeografi,
} from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { storBokstavSted } from '@/app/kandidat/util';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import {
  aggregateKommunebuckets,
  normaliserKommunekode,
} from '@/util/fylkeOgKommuneMapping';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { FC, Fragment } from 'react';

interface IFylkerOgKommuner {
  geografi: PamGeografi[];
  hideLegend?: boolean;
}

const FylkerOgKommunerFilter: FC<IFylkerOgKommuner> = ({
  geografi,
  hideLegend,
}) => {
  const filterCtx = useStillingsSøkFilter();
  const { fylker, setFylker, kommuner, setKommuner } = filterCtx;
  const {
    brukerData: { ident },
    valgtNavKontor,
  } = useApplikasjonContext();
  const combined = useStillingssøk({
    filter: filterCtx,
    eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    navIdent: ident,
    formidlinger: filterCtx.formidlinger,
  });
  const fylkeBuckets: Array<{ key: string; count: number }> =
    combined.data?.antall?.geografi?.fylker || [];
  // Normaliser kommunebuckets slik at gamle koder samles under nye (eks: 0602,0625,0711,3005 -> 3301)
  const kommuneBucketsRaw: Array<{ key: string; count: number }> =
    combined.data?.antall?.geografi?.kommuner || [];
  const kommuneBuckets = aggregateKommunebuckets(kommuneBucketsRaw);
  const loading = combined.isLoading || combined.isValidating;
  const fylkeCount = (f: string | null) => {
    if (loading) return '-';
    return f
      ? (fylkeBuckets.find((b) => String(b.key) === String(f))?.count ?? 0)
      : 0;
  };
  const kommuneCount = (k: string | null) => {
    if (loading) return '-';
    return k
      ? (kommuneBuckets.find(
          (b) => normaliserKommunekode(b.key) === normaliserKommunekode(k),
        )?.count ?? 0)
      : 0;
  };
  // Etter justering: fylke-count kommer direkte fra ES (inkluderer dokumenter uten kommunekode).
  const fylkeTotal = (f: string | null) => fylkeCount(f);
  const fylkerMedKommuner = geografi
    ?.filter((g) => g.type === GeografiType.FYLKE)
    ?.map((fylke) => ({
      ...fylke,
      kommuner: geografi
        ?.filter((g) => g.type === GeografiType.KOMMUNE)
        ?.filter(
          (kommune: PamGeografi) =>
            fylke.lokasjon.fylkesnummer === kommune.lokasjon.fylkesnummer,
        )
        .sort((a: PamGeografi, b: PamGeografi) => a.navn.localeCompare(b.navn)),
    }))
    .sort((a: PamGeografi, b: PamGeografi) => a.navn.localeCompare(b.navn));
  return (
    <CheckboxGroup
      size='small'
      hideLegend={hideLegend}
      legend='Område'
      value={fylker || []}
      onChange={setFylker}
    >
      {fylkerMedKommuner?.map((fylke) => (
        <Fragment key={fylke.lokasjon.fylkesnummer}>
          <Checkbox value={fylke.lokasjon.fylkesnummer}>
            {storBokstavSted(fylke.navn)} (
            {fylkeTotal(fylke.lokasjon.fylkesnummer)})
          </Checkbox>
          {fylke.lokasjon.fylkesnummer &&
            fylker.includes(fylke.lokasjon.fylkesnummer) &&
            fylke.kommuner &&
            fylke.kommuner.length > 1 && (
              <CheckboxGroup
                className='ml-4'
                onChange={setKommuner}
                hideLegend
                legend={`Velg kommuner i ${storBokstavSted(fylke.navn)}`}
                value={kommuner || []}
              >
                {fylke.kommuner.map((kommune: PamGeografi) => (
                  <Checkbox
                    key={kommune.lokasjon.kommunenummer}
                    value={kommune.lokasjon.kommunenummer}
                  >
                    {storBokstavSted(kommune.navn)} (
                    {kommuneCount(kommune.lokasjon.kommunenummer)})
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
        </Fragment>
      ))}
    </CheckboxGroup>
  );
};

export default FylkerOgKommunerFilter;
