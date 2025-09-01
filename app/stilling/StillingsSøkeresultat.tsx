import { useStillingsSøkFilter } from './StillingsSøkContext';
import StillingsSøkPaginering from './_ui/Pagnering';
import StillingsKort from './_ui/StillingsKort';
import StillingsSøkChips from './_ui/StillingsSøkChips';
import {
  maksAntallTreffPerSøk,
  regnUtFørsteTreffFra,
} from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { useStillingssokTotalData } from '@/app/stilling/store/stillingssokTotalData';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import * as React from 'react';
import { useEffect } from 'react';

interface StillingsSøkeresultatProps {
  kandidatId?: string;
}

const StillingsSøkeresultat: React.FC<StillingsSøkeresultatProps> = ({
  kandidatId,
}) => {
  // Abonner kun på setteren for å unngå re-render ved antall-endringer her.
  const setAntall = useStillingssokTotalData((s) => s.setAntall);
  const filter = useStillingsSøkFilter();
  const {
    valgtNavKontor,
    brukerData: { ident },
  } = useApplikasjonContext();
  const finnStillingerForKandidat: boolean = !!kandidatId;
  const stillingssøkHook = useStillingssøk({
    filter,
    eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    navIdent: ident,
    formidlinger: filter.formidlinger,
    finnStillingerForKandidat,
  });

  const antallVisning = (total: number) => {
    if (!total) {
      return null;
    }
    const treffFra = regnUtFørsteTreffFra(
      filter.side ?? 0,
      maksAntallTreffPerSøk ?? 0,
    );
    const fraAntall = treffFra + 1;

    const tilAntall = treffFra + maksAntallTreffPerSøk;

    return (
      <div>
        Viser {fraAntall}-{tilAntall < total ? tilAntall : total} av {total}{' '}
        Stillingsoppdrag
      </div>
    );
  };

  // Oppdater totals i en effekt (ikke i render) for å unngå React warning.
  useEffect(() => {
    const data = stillingssøkHook.data;
    if (!data) return;
    setAntall({
      alleOppdrag:
        // @ts-expect-error ikke typet
        data?.aggregations?.globalAggregering?.alleOppdrag?.doc_count,

      mineOppdrag:
        // @ts-expect-error ikke typet
        data?.aggregations?.globalAggregering?.mineOppdrag?.doc_count,

      mittKontor:
        // @ts-expect-error ikke typet
        data?.aggregations?.globalAggregering?.mittKontor?.doc_count,
      arbeidsplassen:
        // @ts-expect-error ikke typet
        data?.aggregations?.globalAggregering?.arbeidsplassen?.doc_count,
    });
  }, [stillingssøkHook.data, setAntall]);

  return (
    <SWRLaster hooks={[stillingssøkHook]}>
      {(data) => {
        return (
          <>
            <StillingsSøkChips skjulLagreStandard={!!kandidatId} />
            <div className='flex flex-col gap-1'>
              {data.hits.hits.map((hit) => (
                <StillingsKort
                  key={hit._id}
                  stillingData={hit._source}
                  kandidatId={kandidatId}
                />
              ))}
            </div>
            <div className={'flex justify-between items-center'}>
              {antallVisning(data.hits.total?.value)}
              <StillingsSøkPaginering
                totaltAntallTreff={data.hits.total?.value ?? 0}
              />
            </div>
          </>
        );
      }}
    </SWRLaster>
  );
};

export default StillingsSøkeresultat;
