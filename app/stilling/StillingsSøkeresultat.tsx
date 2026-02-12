import { useStillingsSøkFilter } from './StillingsSøkContext';
import StillingsKort from './_ui/StillingsKort';
import {
  maksAntallTreffPerSøk,
  regnUtFørsteTreffFra,
} from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import StillingsSøkChips from '@/app/stilling/_ui/StillingsSøkChips';
import StillingsSøkNavigasjon from '@/app/stilling/_ui/StillingsSøkNavigasjon';
import { useStillingssokTotalData } from '@/app/stilling/store/stillingssokTotalData';
import SWRLaster from '@/components/SWRLaster';
import SideScroll from '@/components/SideScroll';
import SideInnhold from '@/components/layout/SideInnhold';
import SkeletonKort from '@/components/layout/SkeletonKort';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { BodyShort } from '@navikt/ds-react';
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
      <LitenPaginering
        fraAntall={fraAntall}
        tilAntall={tilAntall}
        total={total}
        side={filter.side}
        setSide={filter.setSide}
      />
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
    <>
      <div className='ml-4'>
        <StillingsSøkChips />
      </div>
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
            <>
              <div className='mt-4 ml-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2'>
                <StillingsSøkNavigasjon />
                <div className='ml-auto'>
                  {antallVisning(data.hits?.total?.value)}
                </div>
              </div>
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
                </SideScroll>
              </div>
            </>
          );
        }}
      </SWRLaster>
    </>
  );
};

export default StillingsSøkeresultat;
