import { useStillingsSøkFilter } from './StillingsSøkContext';
import StillingsSøkPaginering from './_ui/Pagnering';
import StillingsKort from './_ui/StillingsKort';
import StillingsSøkChips from './_ui/StillingsSøkChips';
import {
  maksAntallTreffPerSøk,
  regnUtFørsteTreffFra,
} from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import * as React from 'react';

interface StillingsSøkeresultatProps {
  kandidatId?: string;
}

const StillingsSøkeresultat: React.FC<StillingsSøkeresultatProps> = ({
  kandidatId,
}) => {
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

  return (
    <SWRLaster hooks={[stillingssøkHook]}>
      {(data) => {
        return (
          <>
            <StillingsSøkChips skjulLagreStandard={!!kandidatId} />
            {data.hits.hits.map((hit) => (
              <StillingsKort
                key={hit._id}
                stillingData={hit._source}
                kandidatId={kandidatId}
              />
            ))}
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
