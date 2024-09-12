import { StillingsStatusTyper } from '../../../stillingssok/components/StillingsSøkFilter/StatusFilter';

export const esStatuser = (statuser: string[]) => {
  const statusFilter = [];

  if (statuser.includes(StillingsStatusTyper.Publisert)) {
    statusFilter.push({
      bool: {
        should: [
          {
            term: {
              'stilling.status': 'ACTIVE',
            },
          },
          {
            bool: {
              must: [
                {
                  term: {
                    'stilling.status': 'STOPPED',
                  },
                },
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
              ],
            },
          },
        ],
      },
    });
  }

  if (statuser.includes(StillingsStatusTyper.Utløpt)) {
    statusFilter.push({
      bool: {
        must: [
          {
            term: {
              'stilling.status': 'INACTIVE',
            },
          },
          {
            range: {
              'stilling.expires': {
                lt: 'now/d',
              },
            },
          },
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
        ],
      },
    });
  }

  if (statuser.includes(StillingsStatusTyper.Stoppet)) {
    statusFilter.push({
      bool: {
        should: [
          {
            bool: {
              must: [
                {
                  term: {
                    'stilling.status': 'STOPPED',
                  },
                },
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
              ],
            },
          },
        ],
      },
    });
  }

  return statusFilter;
};
