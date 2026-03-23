'use client';

import { RekrutteringstreffSokKort } from './RekrutteringstreffSokKort';
import TreffVisningTabs from './TreffVisningTabs';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import SWRLaster from '@/components/SWRLaster';
import SideScroll from '@/components/SideScroll';
import { BodyShort } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export interface RekrutteringstreffSøkProps {
  children?: ReactNode;
}

const RekrutteringstreffSøk: FC<RekrutteringstreffSøkProps> = () => {
  const { sokHook } = useRekrutteringstreffSøkFilter();

  return (
    <>
      <TreffVisningTabs />
      <SideScroll>
        <SWRLaster hooks={[sokHook]}>
          {(data) => (
            <>
              {data.treff.length === 0 ? (
                <BodyShort className='mt-8'>Ingen treff</BodyShort>
              ) : (
                data.treff.map((treff) => (
                  <RekrutteringstreffSokKort key={treff.id} treff={treff} />
                ))
              )}
            </>
          )}
        </SWRLaster>
      </SideScroll>
    </>
  );
};

export default RekrutteringstreffSøk;
