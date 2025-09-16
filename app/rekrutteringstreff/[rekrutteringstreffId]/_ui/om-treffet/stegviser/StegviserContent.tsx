'use client';

import { useStegviser } from './StegviserContext';
import FullføreSteg from './steg/FullføreSteg';
import InvitereSteg from './steg/InvitereSteg';
import PublisereSteg from './steg/PublisereSteg';

const StegviserContent = () => {
  const { activeStep } = useStegviser();

  return (
    <div role='region'>
      <div className='flex flex-row gap-6'>
        <div className='flex-1'>
          {activeStep === 1 && <PublisereSteg />}
          {activeStep === 2 && <InvitereSteg />}
          {activeStep === 3 && <FullføreSteg />}
        </div>
      </div>
    </div>
  );
};

export default StegviserContent;
