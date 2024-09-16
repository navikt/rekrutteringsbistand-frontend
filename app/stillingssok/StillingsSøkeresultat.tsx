import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import SWRLaster from '../../components/SWRLaster';
import { useStillingssøk } from '../api/stillingssok/useStillingssøk';
import { useApplikasjonContext } from '../ApplikasjonContext';
import StillingsSøkPaginering from './components/Pagnering';
import StillingsKort from './components/StillingsKort';
import StillingsSøkSortering from './components/StillingsSøkSortering';
import StillingsSøkChips from './components/StillingsSøkTags/StillingsSøkTags';
import { useStillingsSøkFilter } from './StillingsSøkContext';

const StillingsSøkeresultat: React.FC = () => {
  const filter = useStillingsSøkFilter();
  const { navIdent } = useApplikasjonContext();
  const hook = useStillingssøk(filter, navIdent);
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
            <StillingsSøkSortering />
          </div>
          {data.hits.hits.map((hit) => (
            <StillingsKort key={hit._id} stillingData={hit._source} />
          ))}
          <StillingsSøkPaginering
            totaltAntallTreff={data.hits.total.value ?? 0}
          />
        </>
      )}
    </SWRLaster>
  );
};

export default StillingsSøkeresultat;
