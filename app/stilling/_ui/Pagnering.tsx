import { maksAntallTreffPerSøk } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Pagination } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

type PagineringProps = {
  totaltAntallTreff: number;
};

const StillingsSøkPaginering: FunctionComponent<PagineringProps> = ({
  totaltAntallTreff,
}) => {
  const filter = useStillingsSøkFilter();
  const antallSider = regnUtAntallSider(
    totaltAntallTreff,
    maksAntallTreffPerSøk,
  );

  if (antallSider <= 1) {
    return null;
  }

  return (
    <Pagination
      size='small'
      className={'my-4 flex justify-center'}
      page={filter.side}
      count={antallSider}
      onPageChange={(page) => filter.setSide(page)}
    />
  );
};

export const regnUtAntallSider = (
  totaltAntallTreff: number,
  maksAntallTreffPerSøk: number,
) => {
  const antallSider = Math.ceil(totaltAntallTreff / maksAntallTreffPerSøk);
  const maksAntallTreffStøttetAvES = 10000;
  const maksAntallSider = maksAntallTreffStøttetAvES / 40 - 1;
  return Math.min(antallSider, maksAntallSider);
};

export default StillingsSøkPaginering;
