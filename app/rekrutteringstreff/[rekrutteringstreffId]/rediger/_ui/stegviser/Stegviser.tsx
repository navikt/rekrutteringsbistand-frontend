'use client';

import StegviserContent from './StegviserContent';
import { StegviserProvider } from './StegviserContext';
import StegviserHeader from './StegviserHeader';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';

interface StegviserProps {
  onToggleForhåndsvisning?: (erIForhåndsvisning: boolean) => void;
  erIForhåndsvisning: boolean;
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
}

const Stegviser = ({
  onToggleForhåndsvisning,
  erIForhåndsvisning,
  rekrutteringstreffStatus,
}: StegviserProps) => {
  return (
    <StegviserProvider>
      <StegviserHeader
        onToggleForhåndsvisning={onToggleForhåndsvisning}
        erIForhåndsvisning={erIForhåndsvisning}
        rekrutteringstreffStatus={rekrutteringstreffStatus}
      />
      <div className='mt-4'>
        <StegviserContent rekrutteringstreffStatus={rekrutteringstreffStatus} />
      </div>
    </StegviserProvider>
  );
};

export default Stegviser;
