'use client';

import StegviserLayout from './StegviserLayout';
import TreffStegContent from './TreffStegContent';
import TreffStegHeader from './TreffStegHeader';
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

const TreffSteg = () => {
  const [alleSteg1Ok, setAlleSteg1Ok] = React.useState(false);
  const [harInvitert, setHarInvitert] = React.useState(false);

  return (
    <StegviserLayout
      header={
        <TreffStegHeader
          stepDetails={stepDetails}
          alleSteg1Ok={alleSteg1Ok}
          harInvitert={harInvitert}
        />
      }
    >
      <TreffStegContent
        stepsForStepper={stepsForStepper}
        setAlleSteg1Ok={setAlleSteg1Ok}
        setHarInvitert={setHarInvitert}
      />
    </StegviserLayout>
  );
};
export default TreffSteg;
