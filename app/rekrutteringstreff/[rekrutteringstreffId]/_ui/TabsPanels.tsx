'use client';

import OmTreffet from './OmTreffet';
import { RekrutteringstreffTabs } from './Rekrutteringstreff';
import RekrutteringstreffRedigering from './RekrutteringstreffRedigering';
import RekrutteringstreffArbeidsgivere from './arbeidsgivere/Arbeidsgivere';
import Hendelser from './hendelser/Hendelser';
import Jobbsøkere from './jobbsøkere/Jobbsøkere';
import KiLogg from './kilogg/components/KiLogg';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  erIVisning: boolean;
  onUpdated: () => Promise<any> | void;
}

const TabsPanels: FC<Props> = ({ erIVisning, onUpdated }) => {
  if (!erIVisning) {
    return <RekrutteringstreffRedigering onUpdated={onUpdated} />;
  }

  return (
    <>
      <Tabs.Panel value={RekrutteringstreffTabs.OM_TREFFET}>
        <OmTreffet />
      </Tabs.Panel>
      <Tabs.Panel value={RekrutteringstreffTabs.JOBBSØKERE}>
        <Jobbsøkere />
      </Tabs.Panel>
      <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
        <RekrutteringstreffArbeidsgivere />
      </Tabs.Panel>
      <Tabs.Panel value={RekrutteringstreffTabs.HENDELSER}>
        <Hendelser />
      </Tabs.Panel>
      <TilgangskontrollForInnhold
        kreverEnAvRollene={[Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
      >
        <Tabs.Panel value={RekrutteringstreffTabs.KI_LOGG}>
          <KiLogg />
        </Tabs.Panel>
      </TilgangskontrollForInnhold>
    </>
  );
};

export default TabsPanels;
