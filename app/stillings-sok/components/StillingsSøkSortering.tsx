import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsSøkFilter } from '../StillingsSøkContext';

export enum StillingsSøkSorteringTyper {
  MestRelevant = 'mestRelevant',
  Publiseringsdato = 'publiseringsdato',
  Utløpsdato = 'utløpsdato',
}

const StillingsSøkSortering: React.FC = () => {
  const filter = useStillingsSøkFilter();
  return (
    <React.Fragment>
      <Select
        label='Sorter'
        onChange={(e) => filter.setSortering(e.target.value)}
      >
        <option value={StillingsSøkSorteringTyper.Publiseringsdato}>
          Publiseringsdato
        </option>
        <option value={StillingsSøkSorteringTyper.Utløpsdato}>
          Utløpsdato
        </option>
        <option value={StillingsSøkSorteringTyper.MestRelevant}>
          Mest relevant
        </option>
      </Select>
    </React.Fragment>
  );
};

export default StillingsSøkSortering;
