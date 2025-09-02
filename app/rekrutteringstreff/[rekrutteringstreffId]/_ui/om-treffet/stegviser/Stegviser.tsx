'use client';

import StegviserContent from './StegviserContent';
import { StegviserProvider } from './StegviserContext';
import StegviserHeader from './StegviserHeader';

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

const Stegviser = () => {
  return (
    <StegviserProvider>
      <StegviserHeader stepDetails={stepDetails} />
      <div className='mt-4'>
        <StegviserContent />
      </div>
    </StegviserProvider>
  );
};

export default Stegviser;
