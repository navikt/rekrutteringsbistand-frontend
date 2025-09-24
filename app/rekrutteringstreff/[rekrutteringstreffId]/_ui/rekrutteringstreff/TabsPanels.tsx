'use client';

import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/Rekrutteringstreff';
import Aktiviteter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/aktiviteter/Aktiviteter';
import RekrutteringstreffArbeidsgivere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/Arbeidsgivere';
import Jobbsøkere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøkere/Jobbsøkere';
import KiLogg from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/kilogg/components/KiLogg';
import RekrutteringstreffForhåndsvisning from '@/app/rekrutteringstreff/[rekrutteringstreffId]/components/RekrutteringstreffForhåndsvisning';
import RekrutteringstreffRedigering from '@/app/rekrutteringstreff/[rekrutteringstreffId]/components/RekrutteringstreffRedigering';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  erIForhåndsvisning: boolean;
  onUpdated: () => Promise<any> | void;
  onGåTilForhåndsvisning: () => void;
  erPubliseringklar: boolean;
  oppdaterData: () => Promise<void>;
}

const TabsPanels: FC<Props> = ({
  erIForhåndsvisning,
  onUpdated,
  onGåTilForhåndsvisning,
  erPubliseringklar,
  oppdaterData,
}) => {
  if (!erIForhåndsvisning) {
    return (
      <RekrutteringstreffRedigering
        onUpdated={onUpdated}
        onGåTilForhåndsvisning={onGåTilForhåndsvisning}
        erPubliseringklar={erPubliseringklar}
        oppdaterData={oppdaterData}
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
