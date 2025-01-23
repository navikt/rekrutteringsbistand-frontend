'use client';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import Piktogram from '../../public/ikoner/finn-stillinger.svg';
import { useUseBrukerStandardSøk } from '../api/stilling/standardsok/useBrukersStandardsøk';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import Sidelaster from '../components/Sidelaster';
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
  const hasInitialized = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (searchParams.get('brukStandard') !== null) {
      if (brukerStandardSøkData.data?.søk) {
        router.replace(`?${brukerStandardSøkData.data.søk}`, { scroll: false });
      } else {
        router.replace('?publisert=intern&statuser=publisert', {
          scroll: false,
        });
      }
    }
  }, [searchParams, brukerStandardSøkData.data, router]);

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
            ikon={<Image src={Piktogram} alt='Finn stillinger' />}
            knappIBanner={
              <TilgangskontrollForInnhold
                skjulVarsel
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
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
              label={formidlinger ? 'Mine formidlinger' : 'Mine stillinger'}
            />
          </TilgangskontrollForInnhold>
        </Tabs.List>
        <Tabs.Panel value={StillingsSøkPortefølje.VIS_ALLE}>
          <StillingsSøkeresultat kandidatId={kandidatId} />
          {/* <AlleStillinger
            kandidatnr={kandidatnr}
            finnerStillingForKandidat={finnerStillingForKandidat}
          /> */}
        </Tabs.Panel>
        <Tabs.Panel value={StillingsSøkPortefølje.VIS_MINE}>
          <StillingsSøkeresultat kandidatId={kandidatId} />
          {/* {navIdent ? (
            <MineStillinger
              navIdent={navIdent}
              kandidatnr={kandidatnr}
              finnerStillingForKandidat={finnerStillingForKandidat}
            />
          ) : null} */}
        </Tabs.Panel>
      </Tabs>
    </SideLayout>
  );
};

export default StillingsSøk;
