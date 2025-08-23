'use client';

import { StillingsSøkProvider } from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingForKandidat from './_ui/StillingForKandidat';
import StillingsSøkFilter from './_ui/StillingsSøkFilter';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { useStillingForKandidat } from '@/app/kandidat/vis-kandidat/useStillingForKandidat';
import { useVisKandidatNr } from '@/app/kandidat/vis-kandidat/useVisKandidatNr';
import SideBanner from '@/components/layout/SideBanner';
import SideLayout from '@/components/layout/SideLayout';
import Sidelaster from '@/components/layout/Sidelaster';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

interface StillingsSøkProps {
  formidlinger?: boolean;
}

const StillingsSøk = ({ formidlinger }: StillingsSøkProps) => {
  const searchParams = useSearchParams();
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const [visKandidatnr] = useVisKandidatNr();
  React.useEffect(() => {
    if (
      !visKandidatnr &&
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
        <StillingsSøkLayout formidlinger={formidlinger} />
      </StillingsSøkProvider>
    </React.Suspense>
  );
};

const StillingsSøkLayout: React.FC<StillingsSøkProps> = ({ formidlinger }) => {
  const { track } = useUmami();

  const [visKandidatnr] = useVisKandidatNr();

  const kandidatStillingssøkData = useStillingForKandidat(
    visKandidatnr ?? null,
  );

  if (visKandidatnr) {
    track(UmamiEvent.Stilling.forslag_til_stilling_fane);
  }

  if (visKandidatnr && kandidatStillingssøkData?.isLoading) {
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
      {visKandidatnr && <StillingForKandidat kandidatnr={visKandidatnr} />}
      <StillingsSøkFilter
        formidlinger={formidlinger}
        stillingForKandidat={visKandidatnr}
      />
      <StillingsSøkeresultat kandidatId={visKandidatnr} />
    </SideLayout>
  );
};

export default StillingsSøk;
