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

  const nested = generateElasticSearchQueryFylkerOgKommuner({
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
          ...nested,
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
