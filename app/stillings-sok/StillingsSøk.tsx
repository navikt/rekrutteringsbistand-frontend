'use client';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import Piktogram from '../../public/ikoner/finn-stillinger.svg';
import { useUseBrukerStandardSøk } from '../api/stilling/standardsok/useBrukersStandardsøk';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import Sidelaster from '../components/Sidelaster';
import SVGDarkmode from '../components/SVGDarkmode';
import { Roller } from '../components/tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { useStillingForKandidat } from '../kandidat/[kandidatId]/forslag-fane/useStillingForKandidat';
import StillingsSøkSidePanel from './components/StillingsSøkSidePanel';
import { StillingsSøkPortefølje } from './stillingssøk-typer';
import {
  StillingsSøkProvider,
  useStillingsSøkFilter,
} from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';

interface StillingsSøkProps {
  formidlinger?: boolean;
  skjulBanner?: boolean;
  kandidatId?: string;
}

const StillingsSøk = ({
  formidlinger,
  skjulBanner,
  kandidatId,
}: StillingsSøkProps) => {
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
          kandidatId={kandidatId}
        />
      </StillingsSøkProvider>
    </React.Suspense>
  );
};

const StillingsSøkLayout: React.FC<StillingsSøkProps> = ({
  formidlinger,
  skjulBanner,
  kandidatId,
}) => {
  const { portefølje, setPortefølje } = useStillingsSøkFilter();

  const kandidatStillingssøkData = useStillingForKandidat(kandidatId ?? null);

  if (kandidatId && kandidatStillingssøkData?.isLoading) {
    return <Sidelaster />;
  }

  return (
    <SideLayout
      banner={
        skjulBanner ? null : (
          <SideTopBanner
            tittel={
              formidlinger ? 'Etterregistrering formidlinger' : 'Stillinger'
            }
            ikon={<SVGDarkmode src={Piktogram} alt='Finn stillinger' />}
            knappIBanner={
              formidlinger ? (
                <TilgangskontrollForInnhold
                  skjulVarsel
                  kreverEnAvRollene={[
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                  ]}
                >
                  <Link href={'/formidlinger/ny-formidling'}>
                    <Button
                      icon={<PlusCircleIcon aria-hidden />}
                      variant='secondary'
                    >
                      Opprett etterregistrering
                    </Button>
                  </Link>
                </TilgangskontrollForInnhold>
              ) : (
                <TilgangskontrollForInnhold
                  skjulVarsel
                  kreverEnAvRollene={[
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                  ]}
                >
                  <Link href={'/stilling/ny-stilling'}>
                    <Button
                      icon={<PlusCircleIcon aria-hidden />}
                      variant='secondary'
                    >
                      Opprett ny
                    </Button>
                  </Link>
                </TilgangskontrollForInnhold>
              )
            }
          />
        )
      }
      sidepanel={
        <StillingsSøkSidePanel
          formidlinger={formidlinger}
          kandidatId={kandidatId}
        />
      }
    >
      <Tabs
        defaultValue={portefølje || StillingsSøkPortefølje.VIS_ALLE}
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
          <StillingsSøkeresultat kandidatId={kandidatId} />
        </Tabs.Panel>
        <Tabs.Panel value={StillingsSøkPortefølje.VIS_MINE}>
          <StillingsSøkeresultat kandidatId={kandidatId} />
        </Tabs.Panel>
      </Tabs>
    </SideLayout>
  );
};

export default StillingsSøk;
