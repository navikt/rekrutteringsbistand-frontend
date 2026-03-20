'use client';

import { RekrutteringstreffSokKort } from './RekrutteringstreffSokKort';
import TreffVisningTabs from './TreffVisningTabs';
import { useRekrutteringstreffSok } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import SWRLaster from '@/components/SWRLaster';
import SideScroll from '@/components/SideScroll';
import { BodyShort } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export interface RekrutteringstreffSøkProps {
  children?: ReactNode;
}

export function useRekrutteringstreffSokData() {
  const { visning, statuser, kontorer, sortering, side } =
    useRekrutteringstreffSøkFilter();

  const backendStatuser = statuser.filter(
    (s) => s !== 'publisert_apen' && s !== 'publisert_frist_utgatt',
  );
  const publisertApen = statuser.includes('publisert_apen') || undefined;
  const publisertFristUtgatt =
    statuser.includes('publisert_frist_utgatt') || undefined;

  return useRekrutteringstreffSok({
    visning,
    statuser: backendStatuser.length > 0 ? backendStatuser : undefined,
    publisertApen,
    publisertFristUtgatt,
    kontorer: kontorer.length > 0 ? kontorer : undefined,
    sortering,
    side,
  });
}

const RekrutteringstreffSøk: FC<RekrutteringstreffSøkProps> = () => {
  const sokHook = useRekrutteringstreffSokData();

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
