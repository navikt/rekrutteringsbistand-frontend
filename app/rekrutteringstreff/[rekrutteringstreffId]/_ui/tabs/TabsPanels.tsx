'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import Arbeidsgivere from '../arbeidsgiver/Arbeidsgivere';
import Formidlinger from '../formidling/Formidlinger';
import Hendelser from '../hendelser/Hendelser';
import Jobbsøkere from '../jobbsøker/Jobbsøkere';
import { JobbsøkerSøkProvider } from '../jobbsøker/filter/JobbsøkerSøkContext';
import { useFormidlinger } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { useKanOppretteFormidlingFraTreff } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/useKanOppretteFormidlingFraTreff';
import OmTreffetForEier from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetForEier';
import OmTreffetForIkkeEier from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetForIkkeEier';
import { useErTreffEier } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useErTreffEier';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import Fanepanel from '@/components/layout/Fanepanel';
import { Miljø, getMiljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';
import { FC } from 'react';

interface TabsPanelsProps {
  visKunOmTreffetOgFormidlinger?: boolean;
}

const TabsPanels: FC<TabsPanelsProps> = ({
  visKunOmTreffetOgFormidlinger = false,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const erProd = getMiljø() === Miljø.ProdGcp;
  const { error: formidlingerError } = useFormidlinger(
    erProd ? undefined : rekrutteringstreffId,
  );
  const manglerFormidlingstilgang =
    formidlingerError instanceof RekbisError &&
    formidlingerError.statuskode === 403;
  const visFormidlinger = !erProd && !manglerFormidlingstilgang; //TODO Fjern feature toggle når treff-formidling lanseres
  const erTreffEier = useErTreffEier();
  const kanOppretteFormidling = useKanOppretteFormidlingFraTreff();

  const erIkkeEierSomKanFormidle =
    visFormidlinger && !erTreffEier && kanOppretteFormidling;

  return (
    <>
      <Fanepanel value={RekrutteringstreffTabs.OM_TREFFET}>
        {erIkkeEierSomKanFormidle ? (
          <OmTreffetForIkkeEier />
        ) : (
          <>{erTreffEier && <OmTreffetForEier />}</>
        )}
      </Fanepanel>
      {!visKunOmTreffetOgFormidlinger &&
        (erTreffEier || erIkkeEierSomKanFormidle) && (
          <Fanepanel value={RekrutteringstreffTabs.JOBBSØKERE}>
            <JobbsøkerSøkProvider>
              <Jobbsøkere />
            </JobbsøkerSøkProvider>
          </Fanepanel>
        )}
      {!visKunOmTreffetOgFormidlinger && erTreffEier && (
        <Fanepanel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
          <Arbeidsgivere />
        </Fanepanel>
      )}
      {visFormidlinger && (erTreffEier || erIkkeEierSomKanFormidle) && (
        <Fanepanel value={RekrutteringstreffTabs.FORMIDLINGER}>
          <Formidlinger />
        </Fanepanel>
      )}
      {!visKunOmTreffetOgFormidlinger && erTreffEier && (
        <Fanepanel value={RekrutteringstreffTabs.HENDELSER}>
          <Hendelser />
        </Fanepanel>
      )}
    </>
  );
};

export default TabsPanels;
