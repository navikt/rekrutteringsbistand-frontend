import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import {
  maksAntallTreffPerSøk,
  regnUtFørsteTreffFra,
} from '../api/stillings-sok/stillingssøkElasticSearchQuery';
import { useStillingssøk } from '../api/stillings-sok/useStillingssøk';
import { useApplikasjonContext } from '../ApplikasjonContext';
import SWRLaster from '../components/SWRLaster';
import LagreStandardsøk from './components/LagreStandardsøk';
import StillingsSøkPaginering from './components/Pagnering';
import StillingsKort from './components/StillingsKort';
import StillingsSøkChips from './components/StillingsSøkChips';
import StillingsSøkSortering from './components/StillingsSøkSortering';
import { useStillingsSøkFilter } from './StillingsSøkContext';

const StillingsSøkeresultat: React.FC<{ kandidatId?: string }> = ({
  kandidatId,
}) => {
  const filter = useStillingsSøkFilter();
  const {
    brukerData: { ident },
  } = useApplikasjonContext();
  const stillingssøkHook = useStillingssøk(filter, ident, filter.formidlinger);

  const antallVisning = (total: number) => {
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
    <SWRLaster hooks={[stillingssøkHook]}>
      {(data) => (
        <>
          <div className='flex items-center gap-2 min-h-[80px]'>
            <StillingsSøkChips />
            <LagreStandardsøk />
          </div>
          <div className='flex justify-between items-center my-4'>
            {antallVisning(data.hits.total.value)}
            <StillingsSøkSortering />
          </div>
          {data.hits.hits.map((hit) => (
            <StillingsKort
              key={hit._id}
              stillingData={hit._source}
              kandidatId={kandidatId}
            />
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
