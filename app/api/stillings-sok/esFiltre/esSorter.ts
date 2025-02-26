import { StillingsSøkSorteringTyper } from '../../../stillings-sok/components/StillingsSøkSortering';

export const esSorter = (sorter: string) => {
  switch (sorter) {
    case StillingsSøkSorteringTyper.Utløpsdato:
      return {
        sort: {
          'stilling.expires': { order: 'asc' },
        },
      };
    case StillingsSøkSorteringTyper.Publiseringsdato:
      return {
        sort: {
          'stilling.published': { order: 'desc' },
        },
      };
    case StillingsSøkSorteringTyper.MestRelevant:
      return [];
  }
};
