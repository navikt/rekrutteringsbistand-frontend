'use client';

import { RekrutteringstreffKort } from './RekrutteringstreffKort';
import {
  RekrutteringstreffFraSøkeresultatDTO,
  useRekrutteringstreffOversikt,
} from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import {
  RekrutteringstreffSortering,
  useRekrutteringstreffSøkFilter,
} from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import SWRLaster from '@/components/SWRLaster';
import SideScroll from '@/components/SideScroll';
import { FC, ReactNode, useMemo } from 'react';

export interface RekrutteringstreffSøkProps {
  children?: ReactNode;
}

const matcherFritekst = (
  treff: RekrutteringstreffFraSøkeresultatDTO,
  søketekst: string,
): boolean => {
  const lower = søketekst.toLowerCase();
  return (
    treff.tittel.toLowerCase().includes(lower) ||
    (treff.beskrivelse?.toLowerCase().includes(lower) ?? false) ||
    (treff.gateadresse?.toLowerCase().includes(lower) ?? false) ||
    (treff.poststed?.toLowerCase().includes(lower) ?? false)
  );
};

const RekrutteringstreffSøk: FC<RekrutteringstreffSøkProps> = () => {
  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();
  const { fritekst, sortering } = useRekrutteringstreffSøkFilter();

  const filtrertOgSortert = useMemo(() => {
    const data = rekrutteringstreffOversiktHook.data;
    if (!data) return [];

    const sortert = [...data].sort((a, b) => {
      if (sortering === RekrutteringstreffSortering.Utløpsdato) {
        const aFraTid = a.fraTid ? new Date(a.fraTid).getTime() : 0;
        const bFraTid = b.fraTid ? new Date(b.fraTid).getTime() : 0;
        return bFraTid - aFraTid;
      }
      return (
        new Date(b.opprettetAvTidspunkt).getTime() -
        new Date(a.opprettetAvTidspunkt).getTime()
      );
    });

    if (!fritekst.trim()) return sortert;
    return sortert.filter((treff) => matcherFritekst(treff, fritekst));
  }, [rekrutteringstreffOversiktHook.data, fritekst, sortering]);

  return (
    <SideScroll>
      <SWRLaster hooks={[rekrutteringstreffOversiktHook]}>
        {(_data) =>
          filtrertOgSortert.map((rekrutteringstreff) => (
            <RekrutteringstreffKort
              key={rekrutteringstreff.id}
              rekrutteringstreff={rekrutteringstreff}
            />
          ))
        }
      </SWRLaster>
    </SideScroll>
  );
};

export default RekrutteringstreffSøk;
