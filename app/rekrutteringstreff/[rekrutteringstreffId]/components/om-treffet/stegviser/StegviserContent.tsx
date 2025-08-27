'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import { useStegviser } from './StegviserContext';
import AvslutteSteg from './steg/AvslutteSteg';
import FølgeOppSteg from './steg/FølgeOppSteg';
import InvitereSteg from './steg/InvitereSteg';
import PublisereSteg from './steg/PublisereSteg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { Stepper } from '@navikt/ds-react';
import * as React from 'react';

interface Props {
  stepsForStepper: string[];
}

const StegviserContent: React.FC<Props> = ({ stepsForStepper }) => {
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
        <Stepper
          activeStep={activeStep}
          orientation='vertical'
          interactive={false}
          className='w-40 shrink-0'
        >
          {stepsForStepper.map((label, i) => (
            <Stepper.Step key={i + 1} completed={i < activeStep - 1}>
              {label}
            </Stepper.Step>
          ))}
        </Stepper>

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
