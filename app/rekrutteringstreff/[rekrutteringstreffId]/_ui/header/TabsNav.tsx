'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useFormidlinger } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { Miljø, getMiljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

interface TabsNavProps {
  visKunOmTreffetOgFormidlinger?: boolean;
}

const TabsNav: FC<TabsNavProps> = ({
  visKunOmTreffetOgFormidlinger = false,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: jobbsøkereData } = useJobbsøkere(rekrutteringstreffId);
  const jobbsøkereAntall = jobbsøkereData?.totalt ?? 0;
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const arbeidsgivereAntall = arbeidsgivere?.length ?? 0;

  const erProd = getMiljø() === Miljø.ProdGcp;
  const { data: formidlinger, error: formidlingerError } = useFormidlinger(
    erProd ? undefined : rekrutteringstreffId,
  );
  const formidlingerAntall = formidlinger?.length ?? 0;
  const manglerFormidlingstilgang =
    formidlingerError instanceof RekbisError &&
    formidlingerError.statuskode === 403;
  const visFormidlinger = !manglerFormidlingstilgang;

  return (
    <>
      <Tabs.Tab value={RekrutteringstreffTabs.OM_TREFFET} label='Om treffet' />
      {!visKunOmTreffetOgFormidlinger && (
        <Tabs.Tab
          value={RekrutteringstreffTabs.JOBBSØKERE}
          label={`Jobbsøkere (${jobbsøkereAntall})`}
        />
      )}
      {!visKunOmTreffetOgFormidlinger && (
        <Tabs.Tab
          value={RekrutteringstreffTabs.ARBEIDSGIVERE}
          label={`Arbeidsgivere (${arbeidsgivereAntall})`}
        />
      )}
      {visFormidlinger && (
        <Tabs.Tab
          value={RekrutteringstreffTabs.FORMIDLINGER}
          label={`Formidlinger (${formidlingerAntall})`}
        />
      )}
      {!visKunOmTreffetOgFormidlinger && (
        <Tabs.Tab value={RekrutteringstreffTabs.HENDELSER} label='Hendelser' />
      )}
    </>
  );
};

export default TabsNav;
