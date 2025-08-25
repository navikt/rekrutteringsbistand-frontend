'use client';

import { StillingsSøkProvider } from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingForKandidat from './_ui/StillingForKandidat';
import StillingsSøkFilter from './_ui/StillingsSøkFilter';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { useStillingForKandidat } from '@/app/kandidat/vis-kandidat/useStillingForKandidat';
import GeografiFilter from '@/app/stilling/_ui/StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from '@/app/stilling/_ui/StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from '@/app/stilling/_ui/StillingsSøkFilter/KategoriFilter';
import StatusFilter from '@/app/stilling/_ui/StillingsSøkFilter/StatusFilter';
import StillingsSøkSortering from '@/app/stilling/_ui/StillingsSøkSortering';
import SideBanner from '@/components/layout/SideBanner';
import SideLayout from '@/components/layout/SideLayout';
import Sidelaster from '@/components/layout/Sidelaster';
import { Roller } from '@/components/tilgangskontroll/roller';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

interface StillingsSøkProps {
  formidlinger?: boolean;
  forKandidatNr?: string;
}

const StillingsSøk = ({ formidlinger, forKandidatNr }: StillingsSøkProps) => {
  const searchParams = useSearchParams();
  const brukerStandardSøkData = useUseBrukerStandardSøk();

  React.useEffect(() => {
    if (
      searchParams.get('brukStandardsok') !== null &&
      !brukerStandardSøkData.isLoading
    ) {
      const newSearch =
        brukerStandardSøkData.data?.søk ||
        'publisert=intern&statuser=publisert';
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${newSearch}`,
      );
    }
  }, [searchParams, brukerStandardSøkData]);

  return (
    <React.Suspense fallback={<Sidelaster />}>
      <StillingsSøkProvider formidlinger={formidlinger}>
        <StillingsSøkLayout
          formidlinger={formidlinger}
          forKandidatNr={forKandidatNr}
        />
      </StillingsSøkProvider>
    </React.Suspense>
  );
};

const StillingsSøkLayout: React.FC<StillingsSøkProps> = ({
  formidlinger,
  forKandidatNr,
}) => {
  const { track } = useUmami();
  const { harRolle } = useApplikasjonContext();
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
    <SideLayout
      topBanner={
        <SideBanner
          ikon={<BriefcaseIcon className='h-6 w-6' />}
          tittel='Stillingsoppdrag'
          knapper={
            <div>
              <Link href={'/stilling/ny-stilling'}>
                <Button size='small'>Opprett annonse</Button>
              </Link>
            </div>
          }
        />
      }
    >
      {forKandidatNr && <StillingForKandidat kandidatnr={forKandidatNr} />}
      <StillingsSøkFilter
        formidlinger={formidlinger}
        stillingForKandidat={forKandidatNr}
      />
      <div className='@container flex'>
        <div className='hidden @[720px]:block mr-4 pt-4  max-w-[200px]'>
          <StillingsSøkSortering />
          {(harArbeidsgiverrettetRolle || formidlinger) && <StatusFilter />}
          <GeografiFilter />
          {!formidlinger && (
            <>
              <InkluderingFilter />
              <KategoriFilter />
            </>
          )}
        </div>
        <div className='flex-grow'>
          <StillingsSøkeresultat kandidatId={forKandidatNr} />
        </div>
      </div>
    </SideLayout>
  );
};

export default StillingsSøk;
