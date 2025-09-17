'use client';

import StegviserContent from './StegviserContent';
import { StegviserProvider } from './StegviserContext';
import StegviserHeader from './StegviserHeader';

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
