'use client';

import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingsSøkFilter from './_ui/StillingsSøkFilter';
import { useStillingForKandidat } from '@/app/kandidat/vis-kandidat/useStillingForKandidat';
import GeografiFilter from '@/app/stilling/_ui/StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from '@/app/stilling/_ui/StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from '@/app/stilling/_ui/StillingsSøkFilter/KategoriFilter';
import StatusFilter from '@/app/stilling/_ui/StillingsSøkFilter/StatusFilter';
import StillingSøkebar from '@/app/stilling/_ui/StillingsSøkFilter/StillingSøkebar';
import StillingsSøkSortering from '@/app/stilling/_ui/StillingsSøkSortering';
import MittStandardsøk from '@/app/stilling/_ui/standardsøk/MittStandardsøk';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import Sidelaster from '@/components/layout/Sidelaster';
import { OpprettKnapp } from '@/components/opprett/OpprettKnapp';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { useSearchParams } from 'next/navigation';
import { FC, useRef } from 'react';

interface StillingsSøkProps {
  formidlinger?: boolean;
  forKandidatNr?: string;
}

const StillingsSøkLayout: FC<StillingsSøkProps> = ({
  formidlinger,
  forKandidatNr,
}) => {
  const { track } = useUmami();
  const searchParams = useSearchParams();

  const stillingsøkFilterRef = useRef<HTMLDivElement>(null);

  // Sjekk om det finnes andre parametere enn den vi forventer
  const harAndreParametere = searchParams.size > 0;

  const skalHenteKandidatData = forKandidatNr && !harAndreParametere;

  const kandidatStillingssøkData = useStillingForKandidat(
    skalHenteKandidatData ? forKandidatNr : null,
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
      sidepanelTittel='Filtrer'
      header={
        <PanelHeader>
          <PanelHeader.Section
            actionsRight={
              <TilgangskontrollForInnhold
                skjulVarsel
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
                ]}
              >
                <OpprettKnapp kategori={Stillingskategori.Stilling} />
              </TilgangskontrollForInnhold>
            }
          />
        </PanelHeader>
      }
      sidepanelBredde='250px'
      sidepanel={
        <div className='flex flex-col  gap-4'>
          <StillingSøkebar alltidÅpen={false} />
          <MittStandardsøk />
          <StillingsSøkSortering />
          <StatusFilter />
          <GeografiFilter />
          <KategoriFilter />
          <InkluderingFilter />
        </div>
      }
    >
      <SideInnhold utenScroll>
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
        </div>
      </SideInnhold>
    </SideLayout>
  );
};

export default StillingsSøkLayout;
