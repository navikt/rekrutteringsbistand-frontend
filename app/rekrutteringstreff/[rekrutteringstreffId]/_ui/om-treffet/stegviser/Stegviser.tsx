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

interface StegviserProps {
  onToggleForhåndsvisning?: (erIForhåndsvisning: boolean) => void;
  erIForhåndsvisning: boolean;
}

const Stegviser = ({
  onToggleForhåndsvisning,
  erIForhåndsvisning,
}: StegviserProps) => {
  return (
    <StegviserProvider>
      <StegviserHeader
        stepDetails={stepDetails}
        onToggleForhåndsvisning={onToggleForhåndsvisning}
        erIForhåndsvisning={erIForhåndsvisning}
      />
      <div className='mt-4'>
        <StegviserContent />
      </div>
    </StegviserProvider>
  );
};

export default Stegviser;
