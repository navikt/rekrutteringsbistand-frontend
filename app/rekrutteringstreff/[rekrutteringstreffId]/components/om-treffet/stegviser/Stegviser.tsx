'use client';

import StegviserContent from './StegviserContent';
import { StegviserProvider } from './StegviserContext';
import StegviserHeader from './StegviserHeader';
import StegviserLayout from './StegviserLayout';
import * as React from 'react';

const stepDetails = [
  { id: 1, stepLabel: 'Publisere', header: 'Gjør klar til publisering' },
  { id: 2, stepLabel: 'Invitere', header: 'Send ut invitasjoner' },
  {
    id: 3,
    stepLabel: 'Følge opp',
    header: 'Følg opp påmeldte og gjennomfør treffet',
  },
  {
    id: 4,
    stepLabel: 'Avslutte',
    header: 'Avslutt og evaluer rekrutteringstreffet',
  },
];

const stepsForStepper = stepDetails.map((d) => d.stepLabel);

const Stegviser = () => {
  return (
    <StegviserProvider>
      <StegviserLayout header={<StegviserHeader stepDetails={stepDetails} />}>
        <StegviserContent stepsForStepper={stepsForStepper} />
      </StegviserLayout>
    </StegviserProvider>
  );
};
export default Stegviser;
