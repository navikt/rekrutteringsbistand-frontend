'use client';

import EtterregistreringIkonDark from '../../public/ikoner/etterregistrering-dark.svg';
import EtterregistreringIkon from '../../public/ikoner/etterregistrering.svg';
import FinnStillingerIkonDark from '../../public/ikoner/finn-stillinger-dark.svg';
import FinnStillingerIkon from '../../public/ikoner/finn-stillinger.svg';
import { UmamiEvent } from '../../util/umamiEvents';
import { useUseBrukerStandardSøk } from '../api/stilling/standardsok/useBrukersStandardsøk';
import SVGDarkmode from '../components/SVGDarkmode';
import Sidelaster from '../components/Sidelaster';
import HovedInnholdKort from '../components/layout/HovedInnholdKort';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { useStillingForKandidat } from '../kandidat/VisKandidat/forslag-til-stilling/useStillingForKandidat';
import { useUmami } from '../providers/UmamiContext';
import {
  StillingsSøkProvider,
  useStillingsSøkFilter,
} from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';
import StillingsSøkFilter from './components/StillingsSøkFilter';
import { StillingsSøkPortefølje } from './stillingssøk-typer';
import { Tabs } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';

interface StillingsSøkProps {
  formidlinger?: boolean;
  skjulBanner?: boolean;
  kandidatId?: string;
}

const StillingsSøk = ({ formidlinger, skjulBanner }: StillingsSøkProps) => {
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
      window.history.pushState(
        {},
        '',
        `${window.location.pathname}?${newSearch}`,
      );
    }
  }, [
    searchParams,
    brukerStandardSøkData.isLoading,
    brukerStandardSøkData.data,
  ]);

  if (brukerStandardSøkData.isLoading) {
    return <Sidelaster />;
  }

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

  const [stillingForKandidat] = useQueryState('stillingForKandidat', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const kandidatStillingssøkData = useStillingForKandidat(
    stillingForKandidat ?? null,
  );

  if (stillingForKandidat) {
    track(UmamiEvent.Stilling.forslag_til_stilling_fane);
  }

  if (stillingForKandidat && kandidatStillingssøkData?.isLoading) {
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
    <HovedInnholdKort className='w-full'>
      <SideLayout
        banner={
          skjulBanner ? null : (
            <SideTopBanner
              tittel={
                formidlinger ? 'Etterregistrering formidlinger' : 'Stillinger'
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
          )
        }
      >
        <StillingsSøkFilter
          formidlinger={formidlinger}
          stillingForKandidat={stillingForKandidat}
        />
        <Tabs
          value={portefølje || StillingsSøkPortefølje.VIS_ALLE}
          onChange={(e) => setPortefølje(e as StillingsSøkPortefølje)}
        >
          <Tabs.List>
            <Tabs.Tab value={StillingsSøkPortefølje.VIS_ALLE} label='Alle' />
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              ]}
            >
              <Tabs.Tab
                value={StillingsSøkPortefølje.VIS_MINE}
                label={
                  formidlinger ? 'Mine etterregistreringer' : 'Mine stillinger'
                }
              />
            </TilgangskontrollForInnhold>
          </Tabs.List>
          <Tabs.Panel value={StillingsSøkPortefølje.VIS_ALLE}>
            <StillingsSøkeresultat
              kandidatId={stillingForKandidat}
              erFormidling={formidlinger}
            />
          </Tabs.Panel>
          <Tabs.Panel value={StillingsSøkPortefølje.VIS_MINE}>
            <StillingsSøkeresultat
              kandidatId={stillingForKandidat}
              erFormidling={formidlinger}
            />
          </Tabs.Panel>
        </Tabs>
      </SideLayout>
    </HovedInnholdKort>
  );
};

export default StillingsSøk;
