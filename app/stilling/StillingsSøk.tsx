'use client';

import { StillingsSøkProvider } from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingForKandidat from './_ui/StillingForKandidat';
import StillingsSøkFilter from './_ui/StillingsSøkFilter';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { useStillingForKandidat } from '@/app/kandidat/vis-kandidat/useStillingForKandidat';
import GeografiFilter from '@/app/stilling/_ui/StillingsSøkFilter/GeografiFilter';
import KategoriFilter from '@/app/stilling/_ui/StillingsSøkFilter/KategoriFilter';
import StatusFilter from '@/app/stilling/_ui/StillingsSøkFilter/StatusFilter';
import StillingsSøkSortering from '@/app/stilling/_ui/StillingsSøkSortering';
import Sidelaster from '@/components/layout/Sidelaster';
import { Roller } from '@/components/tilgangskontroll/roller';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { Accordion } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import { FC, Suspense, useEffect } from 'react';

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
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${newSearch}`,
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
    <>
      {forKandidatNr && <StillingForKandidat kandidatnr={forKandidatNr} />}
      <StillingsSøkFilter
        formidlinger={formidlinger}
        stillingForKandidat={forKandidatNr}
      />
      <div className='@container flex'>
        <div className='hidden @[720px]:block mr-4 pt-4  max-w-[200px]'>
          <Accordion size='small'>
            <Accordion.Item>
              <Accordion.Header>Sorter</Accordion.Header>
              <Accordion.Content>
                <StillingsSøkSortering hideLegend />
              </Accordion.Content>
            </Accordion.Item>
            {(harArbeidsgiverrettetRolle || formidlinger) && (
              <Accordion.Item>
                <Accordion.Header>Status</Accordion.Header>
                <Accordion.Content>
                  <StatusFilter hideLegend />
                </Accordion.Content>
              </Accordion.Item>
            )}
            <Accordion.Item>
              <Accordion.Header>Område</Accordion.Header>
              <Accordion.Content>
                <GeografiFilter hideLegend />
              </Accordion.Content>
            </Accordion.Item>
            {!formidlinger && (
              <Accordion.Item>
                <Accordion.Header>Kategori</Accordion.Header>
                <Accordion.Content>
                  <KategoriFilter hideLegend />
                </Accordion.Content>
              </Accordion.Item>
            )}
          </Accordion>
        </div>
        <div className='flex-grow min-w-0'>
          <StillingsSøkeresultat kandidatId={forKandidatNr} />
        </div>
      </div>
    </>
  );
};

export default StillingsSøk;
