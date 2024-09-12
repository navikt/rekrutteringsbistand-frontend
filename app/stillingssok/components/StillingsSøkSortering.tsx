import { Select } from '@navikt/ds-react';
import * as React from 'react';

const StillingsSøkSortering: React.FC = () => {
  return (
    <React.Fragment>
      <Select label='Sorter'>
        <option value='norge'>Publiseringsdato</option>
        <option value='sverige'>Mest relevant</option>
        <option value='danmark'>Utløpsdato</option>
      </Select>
    </React.Fragment>
  );
};

export default StillingsSøkSortering;
