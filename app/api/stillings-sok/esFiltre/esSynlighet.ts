export const esSynlighet = (synlighet: string[]) => {
  const synlighetFilter: any[] = [
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

  if (synlighet.includes('intern') && synlighet.includes('arbeidsplassen')) {
    return synlighetFilter;
  }

  if (synlighet.includes('intern')) {
    synlighetFilter.push({
      term: {
        'stilling.source': 'DIR',
      },
    });
  }
  if (synlighet.includes('arbeidsplassen')) {
    synlighetFilter.push({
      term: {
        'stilling.privacy': 'SHOW_ALL',
      },
    });
  }

  return synlighetFilter;
};
