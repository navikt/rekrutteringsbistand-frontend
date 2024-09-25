import { Pagination } from '@navikt/ds-react';

import { maksAntallTreffPerSøk } from '../../api/stillings-sok/stillingssøkElasticSearchQuery';
import { useStillingsSøkFilter } from '../StillingsSøkContext';

type PagineringProps = {
  totaltAntallTreff: number;
};

const StillingsSøkPaginering: React.FunctionComponent<PagineringProps> = ({
  totaltAntallTreff,
}) => {
  const filter = useStillingsSøkFilter();

  // const { searchParams, navigate } = useNavigering();

  // const [side, setSide] = useState<number>(hentSøkekriterier(searchParams).side);
  // const [skalScrolleTilToppen, setSkalScrolleTilToppen] = useState<boolean>(false);
  // const enhetstype = useEnhetstype();

  // useEffect(() => {
  //     const sidetall = hentSøkekriterier(searchParams).side;
  //     setSide(sidetall);
  // }, [searchParams]);

  // useEffect(() => {
  //     if (skalScrolleTilToppen) {
  //         window.scrollTo({
  //             top: 0,
  //         });
  //     }
  // }, [side, skalScrolleTilToppen]);

  // const onPageChange = (valgtSide: number) => {
  //     setSkalScrolleTilToppen(true);
  //     setSide(valgtSide);

  //     oppdaterUrlMedParam({
  //         navigate,
  //         searchParams,
  //         parameter: QueryParam.Side,
  //         verdi: valgtSide === 1 ? null : valgtSide,
  //         state: {
  //             harByttetSide: true,
  //         },
  //     });
  // };

  const antallSider = regnUtAntallSider(
    totaltAntallTreff,
    maksAntallTreffPerSøk,
  );

  if (antallSider <= 1) {
    return null;
  }

  return (
    <Pagination
      className={'flex justify-center my-4'}
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
