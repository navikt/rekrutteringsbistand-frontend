import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import {
  maksAntallTreffPerSøk,
  regnUtFørsteTreffFra,
} from '../api/stillings-sok/stillingssøkElasticSearchQuery';
import { useStillingssøk } from '../api/stillings-sok/useStillingssøk';
import { useApplikasjonContext } from '../ApplikasjonContext';
import SWRLaster from '../components/SWRLaster';
import TømFiltre from '../components/TømFiltre';
import StillingsSøkPaginering from './components/Pagnering';
import StillingsKort from './components/StillingsKort';
import StillingsSøkChips from './components/StillingsSøkChips';
import StillingsSøkSortering from './components/StillingsSøkSortering';
import { useStillingsSøkFilter } from './StillingsSøkContext';

const StillingsSøkeresultat: React.FC = () => {
  const filter = useStillingsSøkFilter();
  const {
    brukerData: { ident },
  } = useApplikasjonContext();
  const hook = useStillingssøk(filter, ident, filter.formidlinger);

  const antallVisning = (fra: number, til: number, total: number) => {
    const treffFra = regnUtFørsteTreffFra(filter.side, maksAntallTreffPerSøk);
    const fraAntall = treffFra + 1;

    const tilAntall = treffFra + maksAntallTreffPerSøk;

    return (
      <Heading size='medium'>
        Viser {fraAntall}-{tilAntall < total ? tilAntall : total} av {total}{' '}
        treff
      </Heading>
    );
  };
  return (
    <SWRLaster hook={hook}>
      {(data) => (
        <>
          <div className='flex justify-between'>
            <StillingsSøkChips />
            <TømFiltre />
          </div>
          <div className='flex justify-between items-center my-4'>
            {antallVisning(
              data.hits.total.value ?? 1,
              data.hits.total.value ?? 1,
              data.hits.total.value,
            )}
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
