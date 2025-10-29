'use client';

import { RekrutteringstreffKort } from './RekrutteringstreffKort';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import SWRLaster from '@/components/SWRLaster';
import { FC, ReactNode } from 'react';

export interface RekrutteringstreffSøkProps {
  children?: ReactNode;
}

const RekrutteringstreffSøk: FC<RekrutteringstreffSøkProps> = () => {
  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();

  return (
    <SWRLaster hooks={[rekrutteringstreffOversiktHook]}>
      {(rekrutteringstreffOversikt) =>
        rekrutteringstreffOversikt
          .sort(
            (a, b) =>
              new Date(b.opprettetAvTidspunkt).getTime() -
              new Date(a.opprettetAvTidspunkt).getTime(),
          )
          .map((rekrutteringstreff) => {
            return (
              <RekrutteringstreffKort
                key={rekrutteringstreff.id}
                rekrutteringstreff={rekrutteringstreff}
              />
            );
          })
      }
    </SWRLaster>
  );
};

export default RekrutteringstreffSøk;
