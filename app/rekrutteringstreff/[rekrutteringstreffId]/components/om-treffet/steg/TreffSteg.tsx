'use client';

import TreffStegContent from './TreffStegContent';
import TreffStegHeader from './TreffStegHeader';
import * as React from 'react';

export interface ChecklistItem {
  id: string;
  label: string;
}

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
  const [isOpen, setIsOpen] = React.useState(false);

  const [alleSteg1Ok, setAlleSteg1Ok] = React.useState(false);
  const [harInvitert, setHarInvitert] = React.useState(false);

  const toggle = () => setIsOpen((o) => !o);

  return (
    <div className='my-2'>
      <TreffStegHeader
        isOpen={isOpen}
        toggle={toggle}
        stepDetails={stepDetails}
        alleSteg1Ok={alleSteg1Ok}
        harInvitert={harInvitert}
      />
      {isOpen && (
        <TreffStegContent
          stepsForStepper={stepsForStepper}
          setAlleSteg1Ok={setAlleSteg1Ok}
          setHarInvitert={setHarInvitert}
        />
      )}
    </div>
  );
};
export default TreffSteg;
