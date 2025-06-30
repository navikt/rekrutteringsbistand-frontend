'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import { useStegviser } from './StegviserContext';
import AvslutteSteg from './steg/AvslutteSteg';
import FølgeOppSteg from './steg/FølgeOppSteg';
import InvitereSteg from './steg/InvitereSteg';
import PublisereSteg from './steg/PublisereSteg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { Box, Stepper } from '@navikt/ds-react';
import * as React from 'react';

interface Props {
  stepsForStepper: string[];
}

const commonBoxProps = {
  background: 'raised' as const,
  borderColor: 'neutral-subtleA' as const,
  borderWidth: '1' as const,
  padding: '6' as const,
};

const StegviserContent: React.FC<Props> = ({ stepsForStepper }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreffData } =
    useRekrutteringstreff(rekrutteringstreffId);
  const { activeStep } = useStegviser();

  const harAvsluttet = React.useMemo(
    () =>
      rekrutteringstreffData?.hendelser?.some(
        (h) => h.hendelsestype === 'AVSLUTT',
      ) ?? false,
    [rekrutteringstreffData],
  );

  return (
    <Box.New
      {...commonBoxProps}
      className='rounded-b-xl border-t-0'
      role='region'
    >
      <div className='flex flex-row gap-16'>
        <Stepper
          activeStep={activeStep}
          orientation='vertical'
          interactive={false}
          className='w-40'
        >
          {stepsForStepper.map((label, i) => (
            <Stepper.Step key={i + 1} completed={i < activeStep - 1}>
              {label}
            </Stepper.Step>
          ))}
        </Stepper>
        {activeStep === 1 && <PublisereSteg />}
        {activeStep === 2 && <InvitereSteg />}
        {activeStep === 3 && <FølgeOppSteg />}
        {activeStep === 4 && <AvslutteSteg harAvsluttet={harAvsluttet} />}
      </div>
    </Box.New>
  );
};

export default StegviserContent;
