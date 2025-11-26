'use client';

import AvlystSteg from './steg/AvlystSteg';
import FullføreSteg from './steg/FullføreSteg';
import InvitereSteg from './steg/InvitereSteg';
import PublisereSteg from './steg/PublisereSteg';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';

interface StegviserContentProps {
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
}

const StegviserContent = ({
  rekrutteringstreffStatus,
}: StegviserContentProps) => {
  return (
    <div role='region'>
      <div className='flex flex-row gap-6'>
        <div className='flex-1'>
          {rekrutteringstreffStatus === RekrutteringstreffStatus.AVLYST && (
            <AvlystSteg />
          )}
          {rekrutteringstreffStatus === RekrutteringstreffStatus.UTKAST && (
            <PublisereSteg />
          )}
          {rekrutteringstreffStatus === RekrutteringstreffStatus.PUBLISERT && (
            <InvitereSteg />
          )}
          {rekrutteringstreffStatus === RekrutteringstreffStatus.FULLFØRT && (
            <FullføreSteg />
          )}
        </div>
      </div>
    </div>
  );
};

export default StegviserContent;
