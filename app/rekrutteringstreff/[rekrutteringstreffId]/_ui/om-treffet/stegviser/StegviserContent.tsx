'use client';

import { useStegviser } from './StegviserContext';
import AvlystSteg from './steg/AvlystSteg';
import FullføreSteg from './steg/FullføreSteg';
import InvitereSteg from './steg/InvitereSteg';
import PublisereSteg from './steg/PublisereSteg';

const StegviserContent = () => {
  const { activeStep } = useStegviser();

  return (
    <div role='region'>
      <div className='flex flex-row gap-6'>
        <div className='flex-1'>
          {activeStep === 'AVLYST' && <AvlystSteg />}
          {activeStep === 'PUBLISERE' && <PublisereSteg />}
          {activeStep === 'INVITERE' && <InvitereSteg />}
          {activeStep === 'FULLFØRE' && <FullføreSteg />}
        </div>
      </div>
    </div>
  );
};

export default StegviserContent;
