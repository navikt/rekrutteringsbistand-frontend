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
import SideInnhold from '@/components/layout/SideInnhold';
import SkeletonKort from '@/components/layout/SkeletonKort';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { FC, useEffect } from 'react';

const lagFilterSignatur = (
  filter: ReturnType<typeof useStillingsSøkFilter>,
  { inkluderSide }: { inkluderSide: boolean },
) => {
  const normalisert = {
    sortering: filter.sortering,
    statuser: [...filter.statuser].sort(),
    fylker: [...filter.fylker].sort(),
    kommuner: [...filter.kommuner].sort(),
    portefølje: filter.portefølje,
    inkludering: [...filter.inkludering].sort(),
    inkluderingUnderkategori: [...filter.inkluderingUnderkategori].sort(),
    kategori: [...filter.kategori].sort(),
    publisert: [...filter.publisert].sort(),
    fritekst: [...filter.fritekst],
    utenOppdrag: filter.utenOppdrag,
    formidlinger: filter.formidlinger ?? false,
  } as const;

  const normalisertMedSide = inkluderSide
    ? { ...normalisert, side: filter.side }
    : normalisert;

  return JSON.stringify(normalisertMedSide);
};

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
      return <BodyShort className='mt-8'>Ingen treff på søk</BodyShort>;
    }
    const treffFra = regnUtFørsteTreffFra(
      filter.side ?? 0,
      maksAntallTreffPerSøk ?? 0,
    );
    const fraAntall = treffFra + 1;

    const tilAntall = treffFra + maksAntallTreffPerSøk;

    return (
      <div className='flex items-center justify-end py-1.5'>
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
  const filterKey = lagFilterSignatur(filter, { inkluderSide: false });
  const scrollKey = lagFilterSignatur(filter, { inkluderSide: true });
  return (
    <SWRLaster
      hooks={[combinedHook]}
      skeleton={
        <div className='mt-16'>
          <SideInnhold>
            <SkeletonKort />
          </SideInnhold>
        </div>
      }
    >
      {(data: any) => {
        return (
          <div className='flex h-full flex-col'>
            {/* {visStillingsId && <VisStillingModal kandidatId={kandidatId} />} */}
            <StillingsSøkChips />
            {antallVisning(data.hits?.total?.value)}

            <div className='min-h-0 flex-1'>
              <SideScroll
                key={filterKey}
                lagreScrollNøkkel={`stillinger-${kandidatId ?? scrollKey}`}
              >
                <div className='flex flex-col gap-1'>
                  {data.hits?.hits?.map((hit: any) => (
                    <StillingsKort
                      key={hit._id}
                      stillingData={hit._source}
                      kandidatId={kandidatId}
                    />
                  ))}
                </div>
                <div className={'flex items-center justify-center'}>
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
