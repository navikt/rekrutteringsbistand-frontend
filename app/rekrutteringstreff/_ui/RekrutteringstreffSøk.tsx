'use client';

import { RekrutteringstreffKort } from './RekrutteringstreffKort';
import { useRekrutteringstreffOversikt } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import SWRLaster from '@/components/SWRLaster';
import SideScroll from '@/components/SideScroll';
import { FC, ReactNode } from 'react';

export interface RekrutteringstreffSøkProps {
  children?: ReactNode;
}

const RekrutteringstreffSøk: FC<RekrutteringstreffSøkProps> = () => {
  const rekrutteringstreffOversiktHook = useRekrutteringstreffOversikt();

  return (
    <SideScroll>
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
    </SideScroll>
  );
};

export default RekrutteringstreffSøk;
