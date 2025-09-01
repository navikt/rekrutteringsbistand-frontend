'use client';

import { useRekrutteringstreffContext } from './RekrutteringstreffContext';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import Aktiviteter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/aktiviteter/Aktiviteter';
import RekrutteringstreffArbeidsgivere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/Arbeidsgivere';
import Jobbsøkere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøkere/Jobbsøkere';
import KiLogg from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/kilogg/components/KiLogg';
import EndreTittel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/_ui/EndreTittel';
import OmTreffet from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/_ui/OmTreffet';
import Stegviser from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/Stegviser';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Box, Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  JOBBSØKERE = 'jobbsøkere',
  ARBEIDSGIVERE = 'arbeidsgivere',
  AKTIVITETER = 'aktiviteter',
  KI_LOGG = 'ki_logg',
}

const Rekrutteringstreff: React.FC = () => {
  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const { data: jobbsøkere } = useJobbsøkere(rekrutteringstreffId);
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  return (
    <Box.New>
      <div className='grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start'>
        <div className='space-y-4'>
          <EndreTittel onUpdated={rekrutteringstreffHook.mutate} />

          <Tabs value={fane} onChange={(val) => setFane(val)}>
            <Tabs.List className='w-full'>
              <Tabs.Tab
                value={RekrutteringstreffTabs.OM_TREFFET}
                label='Om treffet'
              />
              <Tabs.Tab
                value={RekrutteringstreffTabs.JOBBSØKERE}
                label={`Jobbsøkere(${jobbsøkere?.length ?? 0})`}
              />
              <Tabs.Tab
                value={RekrutteringstreffTabs.ARBEIDSGIVERE}
                label={`Arbeidsgivere(${arbeidsgivere?.length ?? 0})`}
              />
              <Tabs.Tab
                value={RekrutteringstreffTabs.AKTIVITETER}
                label='Aktiviteter'
              />
              <Tabs.Tab
                value={RekrutteringstreffTabs.KI_LOGG}
                label='Ki Logg(Kun admin)'
              />
            </Tabs.List>

            <Tabs.Panel
              value={RekrutteringstreffTabs.OM_TREFFET}
              className='my-4'
            >
              <OmTreffet />
            </Tabs.Panel>
            <Tabs.Panel value={RekrutteringstreffTabs.JOBBSØKERE}>
              <Jobbsøkere />
            </Tabs.Panel>
            <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
              <RekrutteringstreffArbeidsgivere />
            </Tabs.Panel>
            <Tabs.Panel value={RekrutteringstreffTabs.AKTIVITETER}>
              <Aktiviteter />
            </Tabs.Panel>

            <TilgangskontrollForInnhold
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
              ]}
            >
              <Tabs.Panel value={RekrutteringstreffTabs.KI_LOGG}>
                <KiLogg />
              </Tabs.Panel>
            </TilgangskontrollForInnhold>
          </Tabs>
        </div>

        <aside>
          <Stegviser />
        </aside>
      </div>
    </Box.New>
  );
};

export default Rekrutteringstreff;
