'use client';

import { RekrutteringstreffTabs } from './Rekrutteringstreff';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

type Props = {
  jobbsøkereAntall: number;
  arbeidsgivereAntall: number;
};

const TabsNav: FC<Props> = ({ jobbsøkereAntall, arbeidsgivereAntall }) => {
  return (
    <>
      <Tabs.Tab value={RekrutteringstreffTabs.OM_TREFFET} label='Om treffet' />
      <Tabs.Tab
        value={RekrutteringstreffTabs.JOBBSØKERE}
        label={`Jobbsøkere (${jobbsøkereAntall ?? 0})`}
      />
      <Tabs.Tab
        value={RekrutteringstreffTabs.ARBEIDSGIVERE}
        label={`Arbeidsgivere (${arbeidsgivereAntall ?? 0})`}
      />
      <Tabs.Tab value={RekrutteringstreffTabs.HENDELSER} label='Hendelser' />
      <Tabs.Tab
        value={RekrutteringstreffTabs.KI_LOGG}
        label='Ki Logg(Kun admin)'
      />
    </>
  );
};

export default TabsNav;
