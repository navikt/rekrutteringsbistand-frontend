'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import Arbeidsgivere from '../arbeidsgiver/Arbeidsgivere';
import Formidlinger from '../formidling/Formidlinger';
import Hendelser from '../hendelser/Hendelser';
import Jobbsøkere from '../jobbsøker/Jobbsøkere';
import { JobbsøkerSøkProvider } from '../jobbsøker/filter/JobbsøkerSøkContext';
import { useFormidlinger } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import OmTreffetForEier from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetForEier';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { Miljø, getMiljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

const TabsPanels: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { error: formidlingerError } = useFormidlinger(rekrutteringstreffId);
  const manglerFormidlingstilgang =
    formidlingerError instanceof RekbisError &&
    formidlingerError.statuskode === 403;
  const visFormidlinger =
    getMiljø() !== Miljø.ProdGcp && !manglerFormidlingstilgang;

  return (
    <>
      <Tabs.Panel value={RekrutteringstreffTabs.OM_TREFFET}>
        <OmTreffetForEier />
      </Tabs.Panel>
      <Tabs.Panel value={RekrutteringstreffTabs.JOBBSØKERE}>
        <JobbsøkerSøkProvider>
          <Jobbsøkere />
        </JobbsøkerSøkProvider>
      </Tabs.Panel>
      <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
        <Arbeidsgivere />
      </Tabs.Panel>
      {visFormidlinger && (
        <Tabs.Panel value={RekrutteringstreffTabs.FORMIDLINGER}>
          <Formidlinger />
        </Tabs.Panel>
      )}
      <Tabs.Panel value={RekrutteringstreffTabs.HENDELSER}>
        <Hendelser />
      </Tabs.Panel>
    </>
  );
};

export default TabsPanels;
