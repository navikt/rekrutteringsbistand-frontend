'use client';

import { UmamiEvent } from '../../util/umamiEvents';
import { useUseBrukerStandardSøk } from '../api/stilling/standardsok/useBrukersStandardsøk';
import Sidelaster from '../components/Sidelaster';
import SideBanner from '../components/layout/SideBanner';
import SideLayout from '../components/layout/SideLayout';
import { useStillingForKandidat } from '../kandidat/vis-kandidat/useStillingForKandidat';
import { useVisKandidatNr } from '../kandidat/vis-kandidat/useVisKandidatNr';
import { useUmami } from '../providers/UmamiContext';
import {
  StillingsSøkProvider,
  useStillingsSøkFilter,
} from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingForKandidat from './components/StillingForKandidat';
import StillingsSøkFilter from './components/StillingsSøkFilter';
import StillingsSøkNavigasjon from './components/StillingsSøkNavigasjon';
import { ReceptionIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

interface StillingsSøkProps {
  formidlinger?: boolean;
  skjulBanner?: boolean;
}

const StillingsSøk = ({ formidlinger, skjulBanner }: StillingsSøkProps) => {
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
        <StillingsSøkLayout
          formidlinger={formidlinger}
          skjulBanner={skjulBanner}
        />
      </StillingsSøkProvider>
    </React.Suspense>
  );
};

const StillingsSøkLayout: React.FC<StillingsSøkProps> = ({
  formidlinger,
  skjulBanner,
}) => {
  const { portefølje, setPortefølje } = useStillingsSøkFilter();
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
          ikon={<ReceptionIcon className='h-6 w-6' />}
          tittel='Stillingsannonser'
          navigasjon={<StillingsSøkNavigasjon />}
          knapper={
            <div>
              <Link href={'/stilling/ny-stilling'}>
                <Button size='small'>Opprett annonse</Button>
              </Link>
            </div>
          }
        />
      }
      // banner={
      //   skjulBanner ? null : (
      //     <>
      //       <SideTopBanner
      //         tittel={
      //           formidlinger ? 'Etterregistrering formidlinger' : 'Stillinger'
      //         }
      //         knappIBanner={
      //           <div>
      //             <Link
      //               href={
      //                 formidlinger
      //                   ? '/etterregistrering/ny-etterregistrering'
      //                   : '/stilling/ny-stilling'
      //               }
      //             >
      //               <Button>
      //                 {formidlinger ? 'Ny etterregistrering' : 'Ny stilling'}
      //               </Button>
      //             </Link>
      //           </div>
      //         }
      //         ikon={
      //           formidlinger ? (
      //             <SVGDarkmode
      //               light={EtterregistreringIkon}
      //               dark={EtterregistreringIkonDark}
      //               alt='Finn stillinger'
      //             />
      //           ) : (
      //             <SVGDarkmode
      //               light={FinnStillingerIkon}
      //               dark={FinnStillingerIkonDark}
      //               alt='Finn stillinger'
      //             />
      //           )
      //         }
      //       />
      //     </>
      //   )
      // }
    >
      {/* <div className='grid gap-4 mb-2'>
        <ToggleGroup
          size='small'
          value={portefølje || StillingsSøkPortefølje.VIS_ALLE}
          onChange={(e) => setPortefølje(e as StillingsSøkPortefølje)}
        >
          <ToggleGroup.Item
            value={StillingsSøkPortefølje.VIS_ALLE}
            label='Alle stillinger'
          />
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[
              Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            ]}
          >
            <ToggleGroup.Item
              value={StillingsSøkPortefølje.VIS_MINE}
              label={
                formidlinger ? 'Mine etterregistreringer' : 'Mine stillinger'
              }
            />
          </TilgangskontrollForInnhold>
        </ToggleGroup>
      </div> */}
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
