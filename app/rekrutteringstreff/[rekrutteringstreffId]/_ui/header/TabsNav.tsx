'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkerSøk } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

const TabsNav: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: jobbsøkereData } = useJobbsøkerSøk(rekrutteringstreffId, 1, 1);
  const jobbsøkereAntall = jobbsøkereData?.totalt ?? 0;
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const arbeidsgivereAntall = arbeidsgivere?.length ?? 0;

  return (
    <>
      <Tabs.Tab value={RekrutteringstreffTabs.OM_TREFFET} label='Om treffet' />
      <Tabs.Tab
        value={RekrutteringstreffTabs.JOBBSØKERE}
        label={`Jobbsøkere (${jobbsøkereAntall})`}
      />
      <Tabs.Tab
        value={RekrutteringstreffTabs.ARBEIDSGIVERE}
        label={`Arbeidsgivere (${arbeidsgivereAntall})`}
      />
      <Tabs.Tab value={RekrutteringstreffTabs.HENDELSER} label='Hendelser' />
    </>
  );
};

export default TabsNav;
