import { StillingsSøkPortefølje } from '../../stillingssok/stillingssøk-typer';
import { geografiDTO } from '../stilling/geografi/useGeografi';
import { esFylkerOgKommuner } from './esFiltre/esFylkerOgKommuner';
import { esInkludering } from './esFiltre/esInkludering';
import { esKategori } from './esFiltre/esKategori';
import { esStatuser } from './esFiltre/esStatuser';
import { esSynlighet } from './esFiltre/esSynlighet';
import { esErEier, esVariabler } from './esFiltre/esVariabler';

export type StillingsSøkFilter = {
  statuser: string[];
  fylker: string[];
  kommuner: string[];
  portefølje: string;
  inkludering: string[];
  inkluderingUnderkategori: string[];
  kategori: string[];
  publisert: string[];
};

export function generateElasticSearchQuery(
  filter: StillingsSøkFilter,
  navIdent?: string,
  geografiData?: geografiDTO,
) {
  const valgteFilter: any[] = [];
  const term: any[] = [];
  const sort: any = {
    'stilling.published': {
      order: 'desc',
    },
  };

  valgteFilter.push();

  if (!filter?.portefølje?.includes(StillingsSøkPortefølje.VIS_MINE)) {
    valgteFilter.push(esVariabler.skjulSlettetOgRejected);
  } else {
    valgteFilter.push(esErEier(navIdent));
  }

  if (filter?.statuser) {
    valgteFilter.push(...esStatuser(filter.statuser));
  }

  if (
    filter.inkludering.length > 0 ||
    filter.inkluderingUnderkategori.length > 0
  ) {
    term.push(
      ...esInkludering({
        inkludering: filter.inkludering,
        inkluderingUnderkategori: filter.inkluderingUnderkategori,
      }),
    );
  }

  if (filter.kategori.length > 0) {
    valgteFilter.push(...esKategori(filter.kategori));
  }

  if (filter.publisert.length > 0) {
    valgteFilter.push(...esSynlighet(filter.publisert));
  }

  if (
    (geografiData && filter.fylker?.length > 0) ||
    filter.kommuner?.length > 0
  ) {
    const valgteFylker =
      geografiData?.fylker.filter((fylke) =>
        filter?.fylker.includes(fylke.code),
      ) ?? [];
    const valgteKommuner =
      geografiData?.kommuner.filter((kommune) =>
        filter?.kommuner.includes(kommune.code),
      ) ?? [];

    const valgteFylkerOgKommuner: geografiDTO = {
      fylker: valgteFylker,
      kommuner: valgteKommuner,
    };

    valgteFilter.push(esFylkerOgKommuner(valgteFylkerOgKommuner));
  }

  const byggQuery = {
    size: 40,
    from: 0,
    track_total_hits: true,
    query: {
      bool: {
        minimum_should_match: '0',
        filter: [...term, ...valgteFilter],
      },
    },
    sort: sort,
  };

  return byggQuery;
}
