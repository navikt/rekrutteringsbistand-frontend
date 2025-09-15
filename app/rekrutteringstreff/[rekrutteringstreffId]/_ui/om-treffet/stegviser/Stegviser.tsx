'use client';

import StegviserContent from './StegviserContent';
import { StegviserProvider } from './StegviserContext';
import StegviserHeader from './StegviserHeader';

const stepDetails = [
  { id: 1, header: 'Gjør klar til publisering' },
  { id: 2, header: 'Invitere og forberede deltakere' },
  {
    id: 3,
    header: 'Treffet er fullført',
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
