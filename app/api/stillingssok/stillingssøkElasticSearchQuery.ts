import { Stillingskategori } from '../../stilling/stilling-typer';
import { StillingsStatus } from '../../stillingssok/components/StillingsSøkFilter/StatusFilter';
import { Publisert } from '../../stillingssok/components/StillingsSøkFilter/SynlighetFilter';
import { StillingsSøkPortefølje } from '../../stillingssok/stillingssøk-typer';
import { generateElasticSearchQueryFylkerOgKommuner } from './stillingssøkElasticSearchQueryFylkeOgKommuner';

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

export function generateElasticSearchQuery(filter: StillingsSøkFilter) {
  const should: any[] = [];
  const must: any[] = [];
  const must_not: any[] = [];
  const term: any[] = [];
  const sort: any = {
    'stilling.published': {
      order: 'desc',
    },
  };

  if (!filter?.portefølje?.includes(StillingsSøkPortefølje.VIS_MINE)) {
    must.push(
      {
        term: {
          'stilling.administration.status': 'DONE',
        },
      },
      {
        exists: {
          field: 'stilling.publishedByAdmin',
        },
      },
      {
        range: {
          'stilling.published': {
            lte: 'now/d',
          },
        },
      },
    );
    must_not.push(
      {
        term: {
          'stilling.status': 'REJECTED',
        },
      },
      {
        term: {
          'stilling.status': 'DELETED',
        },
      },
    );
  }

  if (!filter?.publisert?.includes(Publisert.Dev)) {
    must.push({
      exists: {
        field: 'stilling.publishedByAdmin',
      },
    });
  }

  if (filter?.publisert?.includes(Publisert.Intern)) {
    term.push({
      term: {
        'stilling.source': 'DIR',
      },
    });
  }

  if (filter?.publisert?.includes(Publisert.Arbeidsplassen)) {
    term.push({
      term: {
        'stilling.privacy': 'SHOW_ALL',
      },
    });
  }

  if (filter.statuser.includes(StillingsStatus.Publisert)) {
    should.push({
      term: {
        'stilling.status': 'ACTIVE',
      },
    });
  }
  if (filter.statuser.includes(StillingsStatus.Utløpt)) {
    should.push({
      term: {
        'stilling.status': 'INACTIVE',
      },
    });
  }
  if (filter.statuser.includes(StillingsStatus.Stoppet)) {
    should.push({
      bool: {
        must: [
          {
            term: {
              'stilling.status': 'STOPPED',
            },
          },
        ],
      },
    });
  }

  if (
    filter.kategori.includes(Stillingskategori.Stilling) &&
    filter.kategori.includes(Stillingskategori.Jobbmesse)
  ) {
  } else if (
    filter.kategori.includes(Stillingskategori.Stilling) ||
    filter.kategori.includes(Stillingskategori.Jobbmesse)
  ) {
    filter.kategori.includes(Stillingskategori.Jobbmesse) &&
      should.push({
        term: {
          'stillingsinfo.stillingskategori': 'JOBBMESSE',
        },
      });

    filter.kategori.includes(Stillingskategori.Stilling) &&
      must_not.push(
        {
          term: {
            'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
          },
        },
        {
          term: {
            'stillingsinfo.stillingskategori': 'JOBBMESSE',
          },
        },
        {
          term: {
            'stillingsinfo.stillingskategori': 'FORMIDLING',
          },
        },
      );
  }

  if (filter.inkludering.length > 0) {
    term.push({
      terms: {
        'stilling.properties.tags': filter.inkludering,
      },
    });
  }
  const fylkerKommuner = generateElasticSearchQueryFylkerOgKommuner({
    fylker: filter.fylker,
    kommuner: filter.kommuner,
  });

  const byggQuery = {
    size: 40,
    from: 0,
    track_total_hits: true,
    query: {
      bool: {
        minimum_should_match: '0',
        filter: [
          ...term,
          ...fylkerKommuner,
          {
            bool: {
              must: must,
            },
          },
          {
            bool: {
              must_not: must_not,
            },
          },
          {
            bool: {
              should: should,
            },
          },
        ],
      },
    },
    sort: sort,
  };

  return byggQuery;
}
