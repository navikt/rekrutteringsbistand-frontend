'use client';

import EtterregistreringIkonDark from '../../public/ikoner/etterregistrering-dark.svg';
import EtterregistreringIkon from '../../public/ikoner/etterregistrering.svg';
import FinnStillingerIkonDark from '../../public/ikoner/finn-stillinger-dark.svg';
import FinnStillingerIkon from '../../public/ikoner/finn-stillinger.svg';
import { UmamiEvent } from '../../util/umamiEvents';
import { useUseBrukerStandardSøk } from '../api/stilling/standardsok/useBrukersStandardsøk';
import SVGDarkmode from '../components/SVGDarkmode';
import Sidelaster from '../components/Sidelaster';
import KandidatSplitScreenLayout from '../components/layout/KandidatSplitScreenLayout';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import VisKandidat from '../kandidat/VisKandidat/VisKandidat';
import { useStillingForKandidat } from '../kandidat/VisKandidat/useStillingForKandidat';
import { useUmami } from '../providers/UmamiContext';
import {
  StillingsSøkProvider,
  useStillingsSøkFilter,
} from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingForKandidat from './components/StillingForKandidat';
import StillingsSøkFilter from './components/StillingsSøkFilter';
import { StillingsSøkPortefølje } from './stillingssøk-typer';
import { Button, ToggleGroup } from '@navikt/ds-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';

interface StillingsSøkProps {
  formidlinger?: boolean;
  skjulBanner?: boolean;
}

const StillingsSøk = ({ formidlinger, skjulBanner }: StillingsSøkProps) => {
  const searchParams = useSearchParams();
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const [visKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });
  React.useEffect(() => {
    if (
      !visKandidatnr &&
      searchParams.get('brukStandardsok') !== null &&
      !brukerStandardSøkData.isLoading
    ) {
      const newSearch =
        brukerStandardSøkData.data?.søk ||
        'publisert=intern&statuser=publisert';
      window.history.pushState(
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

  const [visKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

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
    <KandidatSplitScreenLayout
      sidebar={visKandidatnr && <VisKandidat kandidatnr={visKandidatnr} />}
    >
      <SideLayout
        banner={
          skjulBanner ? null : (
            <>
              <SideTopBanner
                tittel={
                  formidlinger ? 'Etterregistrering formidlinger' : 'Stillinger'
                }
                knappIBanner={
                  <div>
                    <Link
                      href={
                        formidlinger
                          ? '/etterregistrering/ny-etterregistrering'
                          : '/stilling/ny-stilling'
                      }
                    >
                      <Button>
                        {formidlinger ? 'Ny etterregistrering' : 'Ny stilling'}
                      </Button>
                    </Link>
                  </div>
                }
                ikon={
                  formidlinger ? (
                    <SVGDarkmode
                      light={EtterregistreringIkon}
                      dark={EtterregistreringIkonDark}
                      alt='Finn stillinger'
                    />
                  ) : (
                    <SVGDarkmode
                      light={FinnStillingerIkon}
                      dark={FinnStillingerIkonDark}
                      alt='Finn stillinger'
                    />
                  )
                }
              />
              {visKandidatnr && (
                <StillingForKandidat kandidatnr={visKandidatnr} />
              )}
            </>
          )
        }
      >
        <div className='grid gap-4 mb-2'>
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
        </div>
        <StillingsSøkFilter
          formidlinger={formidlinger}
          stillingForKandidat={visKandidatnr}
        />
        <StillingsSøkeresultat
          kandidatId={visKandidatnr}
          erFormidling={formidlinger}
        />
      </SideLayout>
    </KandidatSplitScreenLayout>
  );
};

export default StillingsSøk;
