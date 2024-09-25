export const esVariabler = {
  skjulSlettetOgRejected: {
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
};

export const esErEier = (navIdent: string | undefined) =>
  navIdent
    ? {
        bool: {
          should: [
            {
              term: {
                'stilling.administration.navIdent': navIdent,
              },
            },
            {
              term: {
                'stillingsinfo.eierNavident': navIdent,
              },
            },
          ],
        },
      }
    : [];
