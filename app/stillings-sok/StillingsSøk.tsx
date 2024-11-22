'use client';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import Piktogram from '../../public/ikoner/finn-stillinger.svg';
import { Rolle } from '../../types/Roller';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import Sidelaster from '../components/Sidelaster';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { useKandidatStillingssøkData } from '../kandidat/[kandidatId]/forslag-fane/setKandidatStillingssøkData';
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
}: StillingsSøkProps) => (
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

const StillingsSøkLayout: React.FC<StillingsSøkProps> = ({
  formidlinger,
  skjulBanner,
  kandidatId,
}) => {
  const { portefølje, setPortefølje } = useStillingsSøkFilter();

  const stillingssøkData = useKandidatStillingssøkData(kandidatId ?? null);

  console.log('🎺 stillingssøkData', stillingssøkData);
  if (kandidatId && stillingssøkData?.isLoading) {
    console.log('🎺 "Sidelaster"');
    return <Sidelaster />;
  }

  console.log('🎺 "StillingsSøkLayout"');
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
                  Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                  Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
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
              Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
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
