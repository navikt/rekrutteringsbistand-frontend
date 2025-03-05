import { useStillingsSøkFilter } from '../StillingsSøkContext';
import { Select } from '@navikt/ds-react';
import * as React from 'react';

export enum StillingsSøkSorteringTyper {
  MestRelevant = 'mestRelevant',
  Publiseringsdato = 'publiseringsdato',
  Utløpsdato = 'utløpsdato',
}

const StillingsSøkSortering: React.FC = () => {
  const filter = useStillingsSøkFilter();
  return (
    <Select
      label='Sorter'
      value={filter.sortering}
      onChange={(e) => filter.setSortering(e.target.value)}
    >
      <option value={StillingsSøkSorteringTyper.Publiseringsdato}>
        Publiseringsdato
      </option>
      <option value={StillingsSøkSorteringTyper.Utløpsdato}>Utløpsdato</option>
      <option value={StillingsSøkSorteringTyper.MestRelevant}>
        Mest relevant
      </option>
    </Select>
  );
};

export default StillingsSøkSortering;
