import {
  GeografiType,
  PamGeografi,
} from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { storBokstavSted } from '@/app/kandidat/util';
import {
  aggregateKommunebuckets,
  normaliserKommunekode,
} from '@/util/fylkeOgKommuneMapping';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { FC, Fragment } from 'react';

type Bucket = { key: string; count: number };

interface IFylkerOgKommuner {
  geografi: PamGeografi[];
  fylker: string[];
  setFylker: (val: string[]) => void;
  kommuner: string[];
  setKommuner: (val: string[]) => void;
  fylkeBuckets?: Bucket[];
  kommuneBuckets?: Bucket[];
  loading?: boolean;
  hideLegend?: boolean;
}

const FylkerOgKommunerFilter: FC<IFylkerOgKommuner> = ({
  geografi,
  fylker,
  setFylker,
  kommuner,
  setKommuner,
  fylkeBuckets,
  kommuneBuckets: kommuneBucketsRaw,
  loading,
  hideLegend,
}) => {
  const visCount =
    fylkeBuckets !== undefined || kommuneBucketsRaw !== undefined;
  const kommuneBuckets = aggregateKommunebuckets(kommuneBucketsRaw ?? []);

  const fylkeCount = (f: string | null) => {
    if (loading) return '-';
    return f
      ? ((fylkeBuckets ?? []).find((b) => String(b.key) === String(f))?.count ??
          0)
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
            {storBokstavSted(fylke.navn)}
            {visCount && ` (${fylkeCount(fylke.lokasjon.fylkesnummer)})`}
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
                    {storBokstavSted(kommune.navn)}
                    {visCount &&
                      ` (${kommuneCount(kommune.lokasjon.kommunenummer)})`}
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
