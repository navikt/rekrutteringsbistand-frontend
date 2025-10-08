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
import SideScroll from '@/components/SideScroll';
import SkeletonKort from '@/components/layout/SkeletonKort';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FC, useEffect } from 'react';

interface StillingsSøkeresultatProps {
  kandidatId?: string;
  scrollExcludeRefs?: React.RefObject<HTMLElement | null>[];
}

const StillingsSøkeresultat: FC<StillingsSøkeresultatProps> = ({
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
  const combinedHook = useStillingssøk({
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
      <div className='flex items-center py-1.5 justify-end'>
        {fraAntall}-{tilAntall < total ? tilAntall : total} av {total}
        <Button
          disabled={filter.side === 1}
          onClick={() => filter.setSide(filter.side - 1)}
          icon={<ChevronLeftIcon />}
          size='small'
          variant='tertiary'
        />
        <Button
          disabled={tilAntall >= total}
          onClick={() => filter.setSide(filter.side + 1)}
          icon={<ChevronRightIcon />}
          size='small'
          variant='tertiary'
        />
      </div>
    );
  };

  // Oppdater totals i en effekt (ikke i render) for å unngå React warning.
  useEffect(() => {
    const data: any = combinedHook.data;
    if (!data?.antall) return;
    setAntall({});
  }, [combinedHook.data, setAntall]);
  const filterKey = Object.entries(filter)
    .filter(([key]) => key !== 'setSide' && key !== 'side')
    .map(([, value]) => JSON.stringify(value))
    .join('-');
  return (
    <SWRLaster
      hooks={[combinedHook]}
      skeleton={
        <div className='mt-16'>
          <SideScroll>
            <SkeletonKort />
          </SideScroll>
        </div>
      }
    >
      {(data: any) => {
        return (
          <div className='h-full flex flex-col'>
            <div className='flex-shrink-0'>
              <StillingsSøkChips skjulLagreStandard={!!kandidatId} />
              {antallVisning(data.hits?.total?.value)}
            </div>

            <div className='flex-1 min-h-0'>
              <SideScroll key={filterKey}>
                <div className='flex flex-col gap-1'>
                  {data.hits?.hits?.map((hit: any) => (
                    <StillingsKort key={hit._id} stillingData={hit._source} />
                  ))}
                </div>
                <div className={'flex justify-center items-center'}>
                  <StillingsSøkPaginering
                    totaltAntallTreff={data.hits?.total?.value ?? 0}
                  />
                </div>
              </SideScroll>
            </div>
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default StillingsSøkeresultat;
