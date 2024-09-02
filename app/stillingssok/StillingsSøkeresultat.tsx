import { Heading, Select } from '@navikt/ds-react';
import * as React from 'react';
import SWRLaster from '../../components/SWRLaster';
import { useStilling } from '../api/stillingssok/stilling';
import StillingsKort from './components/StillingsKort';
import StillingsSøkChips from './components/StillingsSøkTags/StillingsSøkTags';
import { useStillingsSøk } from './StillingsSøkContext';

const StillingsSøkeresultat: React.FC = () => {
  const filter = useStillingsSøk();
  const hook = useStilling(filter);
  return (
    <SWRLaster hook={hook}>
      {(data) => (
        <>
          <div className='flex justify-between'>
            <StillingsSøkChips />
            <div>Lagre TBD</div>
          </div>
          <div className='flex justify-between items-center my-4'>
            <Heading size='medium'>{data.hits.total.value} annonser</Heading>
            <Select label='Sorter'>
              <option value='norge'>Publiseringsdato</option>
              <option value='sverige'>Mest relevant</option>
              <option value='danmark'>Utløpsdato</option>
            </Select>
          </div>
          {data.hits.hits.map((hit) => (
            <StillingsKort key={hit._id} stillingData={hit._source} />
          ))}
        </>
      )}
    </SWRLaster>
  );
};

export default StillingsSøkeresultat;
