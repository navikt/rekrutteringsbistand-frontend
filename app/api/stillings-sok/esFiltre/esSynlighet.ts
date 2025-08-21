import { StillingsSøkPortefølje } from '../../../stilling/stillingssøk-typer';

export const esSynlighet = (
  portefølje: StillingsSøkPortefølje,
  formidlinger: boolean,
) => {
  const formidling = [
    {
      bool: {
        must_not: [
          {
            term: {
              'stillingsinfo.stillingskategori': 'FORMIDLING',
            },
          },
        ],
      },
    },
  ];

  const stillinger = [
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

  const synlighetFilter: any[] = formidlinger ? formidling : stillinger;

  if (portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO) {
    synlighetFilter.push({
      term: {
        'stilling.privacy': 'SHOW_ALL',
      },
    });
  }

  return synlighetFilter;
};
