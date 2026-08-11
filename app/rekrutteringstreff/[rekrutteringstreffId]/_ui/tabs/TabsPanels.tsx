'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import Arbeidsgivere from '../arbeidsgiver/Arbeidsgivere';
import Formidlinger from '../formidling/Formidlinger';
import Hendelser from '../hendelser/Hendelser';
import Jobbsøkere from '../jobbsøker/Jobbsøkere';
import { JobbsøkerSøkProvider } from '../jobbsøker/filter/JobbsøkerSøkContext';
import Treffgjennomforing from '../treffgjennomforing/Treffgjennomforing';
import { useTreffgjennomforingFane } from '../treffgjennomforing/useTreffgjennomforingFane';
import { useFormidlinger } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import OmTreffetForEier from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetForEier';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import Fanepanel from '@/components/layout/Fanepanel';
import { Miljø, getMiljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';
import { FC } from 'react';

const TabsPanels: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const erProd = getMiljø() === Miljø.ProdGcp;
  const { error: formidlingerError } = useFormidlinger(
    erProd ? undefined : rekrutteringstreffId,
  );
  const manglerFormidlingstilgang =
    formidlingerError instanceof RekbisError &&
    formidlingerError.statuskode === 403;
  const visFormidlinger = !erProd && !manglerFormidlingstilgang;
  const { visTreffgjennomforing } = useTreffgjennomforingFane();
  return (
    <>
      <Fanepanel value={RekrutteringstreffTabs.OM_TREFFET}>
        <OmTreffetForEier />
      </Fanepanel>
      <Fanepanel value={RekrutteringstreffTabs.JOBBSØKERE}>
        <JobbsøkerSøkProvider>
          <Jobbsøkere />
        </JobbsøkerSøkProvider>
      </Fanepanel>
      <Fanepanel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
        <Arbeidsgivere />
      </Fanepanel>
      {visTreffgjennomforing && (
        <Fanepanel value={RekrutteringstreffTabs.TREFFGJENNOMFORING}>
          <Treffgjennomforing />
        </Fanepanel>
      )}
      {visFormidlinger && (
        <Fanepanel value={RekrutteringstreffTabs.FORMIDLINGER}>
          <Formidlinger />
        </Fanepanel>
      )}
      <Fanepanel value={RekrutteringstreffTabs.HENDELSER}>
        <Hendelser />
      </Fanepanel>
    </>
  );
};

export default TabsPanels;
