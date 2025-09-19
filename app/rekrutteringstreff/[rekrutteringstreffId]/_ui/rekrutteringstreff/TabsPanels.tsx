'use client';

import { RekrutteringstreffTabs } from '../../Rekrutteringstreff';
import Aktiviteter from '../../_ui/aktiviteter/Aktiviteter';
import RekrutteringstreffArbeidsgivere from '../../_ui/arbeidsgivere/Arbeidsgivere';
import Jobbsøkere from '../../_ui/jobbsøkere/Jobbsøkere';
import KiLogg from '../../_ui/kilogg/components/KiLogg';
import RekrutteringstreffForhåndsvisning from '../../components/RekrutteringstreffForhåndsvisning';
import RekrutteringstreffRedigering from '../../components/RekrutteringstreffRedigering';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  erIForhåndsvisning: boolean;
  onUpdated: () => Promise<any> | void;
  onGåTilForhåndsvisning: () => void;
}

const TabsPanels: FC<Props> = ({
  erIForhåndsvisning,
  onUpdated,
  onGåTilForhåndsvisning,
}) => {
  if (!erIForhåndsvisning) {
    return (
      <RekrutteringstreffRedigering
        onUpdated={onUpdated}
        onGåTilForhåndsvisning={onGåTilForhåndsvisning}
      />
    );
  }

  return (
    <>
      <Tabs.Panel value={RekrutteringstreffTabs.OM_TREFFET} className='my-4'>
        <RekrutteringstreffForhåndsvisning />
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
    </>
  );
};

export default TabsPanels;
