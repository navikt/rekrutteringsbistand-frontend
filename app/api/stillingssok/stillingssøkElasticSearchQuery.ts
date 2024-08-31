import { Publisert } from '../../stillingssok/components/StillingsSøkFilter/SynlighetFilter';

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

export function generateElasticSearchQuery(filters: StillingsSøkFilter) {
  const esFilter: any[] = [
    {
      bool: {
        must_not: [
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
        ],
        must: [
          {
            term: {
              'stilling.administration.status': 'DONE',
            },
          },

          {
            range: {
              'stilling.published': {
                lte: 'now/d',
              },
            },
          },
        ],
      },
    },
    {
      bool: {
        must_not: [
          {
            term: {
              'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
            },
          },
          {
            term: {
              'stillingsinfo.stillingskategori': 'FORMIDLING',
            },
          },
        ],
      },
    },
  ];
  const should: any[] = [];

  if (!filters?.publisert?.includes(Publisert.Dev)) {
    console.log('🎺 erHer');
    esFilter.push({
      bool: {
        must: [
          {
            exists: {
              field: 'stilling.publishedByAdmin',
            },
          },
        ],
      },
    });
  }
  return {
    size: 40,
    from: 0,
    track_total_hits: true,
    query: {
      bool: {
        should: should,
        minimum_should_match: '0',
        filter: esFilter,
      },
    },
    sort: {
      'stilling.published': {
        order: 'desc',
      },
    },
  };
}
