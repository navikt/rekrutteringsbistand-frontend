import { StillingsSøkPortefølje } from '../../../stilling/stillingssøk-typer';

export const esSynlighet = (portefølje: StillingsSøkPortefølje) => {
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

  // if (portefølje === StillingsSøkPortefølje.INTERN) {
  //   synlighetFilter.push({
  //     term: {
  //       'stilling.source': 'DIR',
  //     },
  //   });
  // }

  if (portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO) {
    synlighetFilter.push({
      term: {
        'stilling.privacy': 'SHOW_ALL',
      },
    });
  }

  return synlighetFilter;
};
