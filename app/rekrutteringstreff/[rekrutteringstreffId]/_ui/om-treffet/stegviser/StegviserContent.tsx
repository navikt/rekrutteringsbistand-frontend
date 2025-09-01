'use client';

import { useStegviser } from './StegviserContext';
import AvslutteSteg from './steg/AvslutteSteg';
import FølgeOppSteg from './steg/FølgeOppSteg';
import InvitereSteg from './steg/InvitereSteg';
import PublisereSteg from './steg/PublisereSteg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';

const StegviserContent = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreffData } =
    useRekrutteringstreff(rekrutteringstreffId);
  const { activeStep } = useStegviser();

  const harAvsluttet =
    rekrutteringstreffData?.hendelser?.some(
      (h) => h.hendelsestype === 'AVSLUTT',
    ) ?? false;

  return (
    <div role='region'>
      <div className='flex flex-row gap-6'>
        <div className='flex-1'>
          {activeStep === 1 && <PublisereSteg />}
          {activeStep === 2 && <InvitereSteg />}
          {activeStep === 3 && <FølgeOppSteg />}
          {activeStep === 4 && <AvslutteSteg harAvsluttet={harAvsluttet} />}
        </div>
      </div>
    </div>
  );
};

export default StegviserContent;
