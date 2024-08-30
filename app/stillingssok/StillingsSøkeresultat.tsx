import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import SWRLaster from '../../components/SWRLaster';
import { useStilling } from '../api/stillingssok/stilling';
import StillingsKort from './components/StillingsKort';

export interface IStillingsSøkeresultat {
  søkekriterier?: any;
}

const StillingsSøkeresultat: React.FC<IStillingsSøkeresultat> = ({
  søkekriterier,
}) => {
  const hook = useStilling(søkekriterier);
  return (
    <SWRLaster hook={hook}>
      {(data) => (
        <>
          <div className='flex justify-between'>
            <div>Filtre TBD</div>
            <div>Lagre TBD</div>
          </div>
          <div className='flex justify-between'>
            <Heading size='medium'>{data.hits.total.value} annonser</Heading>
            <>kommer</>
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
