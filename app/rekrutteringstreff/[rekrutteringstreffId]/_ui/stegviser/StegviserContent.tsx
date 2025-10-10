'use client';

import { useStegviser } from './StegviserContext';
import AvlystSteg from './steg/AvlystSteg';
import FullføreSteg from './steg/FullføreSteg';
import InvitereSteg from './steg/InvitereSteg';
import PublisereSteg from './steg/PublisereSteg';
import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';

const StegviserContent = () => {
  const { activeStep } = useStegviser();

  return (
    <div role='region'>
      <div className='flex flex-row gap-6'>
        <div className='flex-1'>
          {activeStep === AktivtSteg.AVLYST && <AvlystSteg />}
          {activeStep === AktivtSteg.KLADD && <PublisereSteg />}
          {activeStep === AktivtSteg.INVITERE && <InvitereSteg />}
          {activeStep === AktivtSteg.FULLFØRE && <FullføreSteg />}
        </div>
      </div>
    </div>
  );
};

export default StegviserContent;
