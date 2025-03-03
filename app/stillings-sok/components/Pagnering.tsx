import { maksAntallTreffPerSøk } from '../../api/stillings-sok/stillingssøkElasticSearchQuery';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import { Pagination } from '@navikt/ds-react';

type PagineringProps = {
  totaltAntallTreff: number;
};

const StillingsSøkPaginering: React.FunctionComponent<PagineringProps> = ({
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
      className={'my-4 flex justify-center'}
      page={filter.side}
      count={antallSider}
      onPageChange={(page) => filter.setSide(page)}
    />
  );
};

const regnUtAntallSider = (
  totaltAntallTreff: number,
  maksAntallTreffPerSøk: number,
) => {
  const antallSider = Math.ceil(totaltAntallTreff / maksAntallTreffPerSøk);
  const maksAntallTreffStøttetAvES = 10000;
  const maksAntallSider = maksAntallTreffStøttetAvES / 40 - 1;

  return Math.min(antallSider, maksAntallSider);
};

export default StillingsSøkPaginering;
