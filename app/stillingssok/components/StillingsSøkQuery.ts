export const stillingsSøkQuery = () => {
  return {
    size: 40,
    from: 0,
    track_total_hits: true,
    query: {
      bool: {
        should: [],
        minimum_should_match: '0',
        filter: [
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
        ],
      },
    },
    sort: {
      'stilling.published': {
        order: 'desc',
      },
    },
  };
};
