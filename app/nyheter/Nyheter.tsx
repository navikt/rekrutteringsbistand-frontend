'use client';

import { useNyheter } from '@/app/api/bruker/nyheter/useNyheter';
import EndreNyhetModal from '@/app/nyheter/_ui/EndreNyhetModal';
import LegacyNyheter from '@/app/nyheter/_ui/LegacyNyheter';
import NyhetVisning from '@/app/nyheter/_ui/NyhetVisning';
import SWRLaster from '@/components/SWRLaster';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { MegaphoneSpeakingIcon } from '@navikt/aksel-icons';
import * as React from 'react';

const Nyheter: React.FC = () => {
  const nyheterHook = useNyheter();

  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            title={
              <div className='flex items-center gap-2'>
                <MegaphoneSpeakingIcon /> Nyheter
              </div>
            }
            skjulBrødsmuler
            actionsRight={
              <TilgangskontrollForInnhold
                skjulVarsel
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
                ]}
              >
                <EndreNyhetModal refetch={() => nyheterHook.mutate()} />
              </TilgangskontrollForInnhold>
            }
          />
        </PanelHeader>
      }
    >
      <div className='flex flex-col gap-4 mb-4'>
        <SideInnhold>
          <SWRLaster hooks={[nyheterHook]}>
            {(nyheterData) => {
              window.localStorage.setItem(
                'antallLesteNyheter',
                JSON.stringify(nyheterData.length),
              );

              return nyheterData
                .sort(
                  (a, b) =>
                    new Date(b.opprettetDato).getTime() -
                    new Date(a.opprettetDato).getTime(),
                )
                .map((nyhet) => (
                  <NyhetVisning
                    key={nyhet.nyhetId}
                    nyhet={nyhet}
                    refetch={() => nyheterHook.mutate()}
                  />
                ));
            }}
          </SWRLaster>
          <LegacyNyheter />
        </SideInnhold>
      </div>
    </SideLayout>
  );
};

export default Nyheter;
