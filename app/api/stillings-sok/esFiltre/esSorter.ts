import { StillingsSøkSorteringTyper } from '../../../stillings-sok/components/StillingsSøkSortering';

export const esSorter = (sorter: string) => {
  switch (sorter) {
    case StillingsSøkSorteringTyper.Utløpsdato:
      return 'asc';
    case StillingsSøkSorteringTyper.Publiseringsdato:
      return 'desc';
    case StillingsSøkSorteringTyper.MestRelevant:
      return [];
    default:
      return 'desc';
  }
};
