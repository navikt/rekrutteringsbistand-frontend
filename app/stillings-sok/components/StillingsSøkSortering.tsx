import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsSøkFilter } from '../StillingsSøkContext';

const StillingsSøkSortering: React.FC = () => {
  const filter = useStillingsSøkFilter();
  return (
    <React.Fragment>
      <Select
        label='Sorter'
        onChange={(e) => filter.setSortering(e.target.value)}
      >
        <option value='publiseringsdato'>Publiseringsdato</option>
        <option value='utløpsdato'>Utløpsdato</option>
      </Select>
    </React.Fragment>
  );
};

export default StillingsSøkSortering;
