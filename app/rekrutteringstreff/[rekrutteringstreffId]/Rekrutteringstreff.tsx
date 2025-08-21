'use client';

import { useRekrutteringstreffContext } from './RekrutteringstreffContext';
import TreffHeader from './components/TreffHeader';
import Aktiviteter from './components/aktiviteter/components/Aktiviteter';
import RekrutteringstreffArbeidsgivere from './components/arbeidsgivere/Arbeidsgivere';
import Jobbsøkere from './components/jobbsøkere/Jobbsøkere';
import KiLogg from './components/kilogg/components/KiLogg';
import OmTreffet from './components/om-treffet/components/OmTreffet';
import Stegviser from './components/om-treffet/stegviser/Stegviser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { TilgangskontrollForInnhold } from '@/app/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/app/components/tilgangskontroll/roller';
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

  const { data: jobbsøkere } = useJobbsøkere(rekrutteringstreffId);

  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  return (
    <Box.New>
      <TreffHeader endreTittel={fane === RekrutteringstreffTabs.OM_TREFFET} />
      <Stegviser />
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

        <Tabs.Panel value={RekrutteringstreffTabs.OM_TREFFET} className='my-4'>
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
          kreverEnAvRollene={[Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
        >
          <Tabs.Panel value={RekrutteringstreffTabs.KI_LOGG}>
            <KiLogg />
          </Tabs.Panel>
        </TilgangskontrollForInnhold>
      </Tabs>
    </Box.New>
  );
};

export default Rekrutteringstreff;
