'use client';

import { StillingsSøkProvider } from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingsSøkFilter from './_ui/StillingsSøkFilter';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { useStillingForKandidat } from '@/app/kandidat/vis-kandidat/useStillingForKandidat';
import GeografiFilter from '@/app/stilling/_ui/StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from '@/app/stilling/_ui/StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from '@/app/stilling/_ui/StillingsSøkFilter/KategoriFilter';
import StatusFilter from '@/app/stilling/_ui/StillingsSøkFilter/StatusFilter';
import StillingSøkebar from '@/app/stilling/_ui/StillingsSøkFilter/StillingSøkebar';
import StillingsSøkSortering from '@/app/stilling/_ui/StillingsSøkSortering';
import MittStandardsøk from '@/app/stilling/_ui/standardsøk/MittStandardsøk';
import { EKSCLUDERTE_STANDARDSOK_PARAMETERE } from '@/app/stilling/_ui/standardsøk/standardSokUtils';
import SideScroll from '@/components/SideScroll';
import Sidelaster from '@/components/layout/Sidelaster';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { useSearchParams } from 'next/navigation';
import { FC, Suspense, useEffect, useRef } from 'react';

interface StillingsSøkProps {
  formidlinger?: boolean;
  forKandidatNr?: string;
}

const StillingsSøk = ({ formidlinger, forKandidatNr }: StillingsSøkProps) => {
  const searchParams = useSearchParams();
  const brukerStandardSøkData = useUseBrukerStandardSøk();

  useEffect(() => {
    if (
      searchParams.get('brukStandardsok') !== null &&
      !brukerStandardSøkData.isLoading
    ) {
      const newSearch =
        brukerStandardSøkData.data?.søk ||
        'publisert=intern&statuser=publisert';

      const eksludert = EKSCLUDERTE_STANDARDSOK_PARAMETERE;
      const urlSearchParams = new URLSearchParams(newSearch);
      eksludert.forEach((param) => {
        if (urlSearchParams.has(param)) {
          urlSearchParams.delete(param);
        }
      });

      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${urlSearchParams.toString()}`,
      );
    }
  }, [searchParams, brukerStandardSøkData]);

  return (
    <Suspense fallback={<Sidelaster />}>
      <StillingsSøkProvider formidlinger={formidlinger}>
        <StillingsSøkLayout
          formidlinger={formidlinger}
          forKandidatNr={forKandidatNr}
        />
      </StillingsSøkProvider>
    </Suspense>
  );
};

const StillingsSøkLayout: FC<StillingsSøkProps> = ({
  formidlinger,
  forKandidatNr,
}) => {
  const { track } = useUmami();
  const { harRolle } = useApplikasjonContext();

  const stillingsøkFilterRef = useRef<HTMLDivElement>(null);

  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);

  const kandidatStillingssøkData = useStillingForKandidat(
    forKandidatNr ?? null,
  );

  if (forKandidatNr) {
    track(UmamiEvent.Stilling.forslag_til_stilling_fane);
  }

  if (forKandidatNr && kandidatStillingssøkData?.isLoading) {
    return <Sidelaster />;
  }

  if (
    kandidatStillingssøkData &&
    kandidatStillingssøkData.kandidatStillingssøk?.yrkeJobbonskerObj?.length
  ) {
    const antallYrkesJobbØnsker =
      kandidatStillingssøkData.kandidatStillingssøk?.yrkeJobbonskerObj[0]
        ?.sokeTitler?.length;
    if (antallYrkesJobbØnsker > 0) {
      track(UmamiEvent.Stilling.antall_yrkesjobbønsker_fra_kandidat, {
        antall: antallYrkesJobbØnsker,
      });
    }
  }

  return (
    <div className='@container flex contain-layout'>
      <div className='flex-grow min-w-0'>
        <div ref={stillingsøkFilterRef}>
          <StillingsSøkFilter
            formidlinger={formidlinger}
            stillingForKandidat={forKandidatNr}
          />
        </div>
        <div className='@container flex contain-layout'>
          <div className='flex-grow min-w-0'>
            <StillingsSøkeresultat
              kandidatId={forKandidatNr}
              scrollExcludeRefs={[stillingsøkFilterRef]}
            />
          </div>
        </div>
      </div>
      <div className='hidden @[720px]:block ml-4 pt-4 max-w-[200px]'>
        <StillingSøkebar alltidÅpen={false} />
        <SideScroll>
          <div className='flex flex-col pt-4 max-w-[200px] gap-4'>
            <MittStandardsøk />
            <StillingsSøkSortering />
            {(harArbeidsgiverrettetRolle || formidlinger) && <StatusFilter />}
            <GeografiFilter />
            {!formidlinger && <KategoriFilter />}
            <InkluderingFilter />
          </div>
        </SideScroll>
      </div>
    </div>
  );
};

export default StillingsSøk;
