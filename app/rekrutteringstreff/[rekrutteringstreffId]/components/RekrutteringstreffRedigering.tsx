'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import EndreTittel from './redigereRekrutteringstreff/EndreTittel';
import PraktiskeForhold from './redigereRekrutteringstreff/Praktiskeforhold';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import React from 'react';

interface RekrutteringstreffRedigeringProps {
  onUpdated?: () => void;
}

const RekrutteringstreffRedigering: React.FC<
  RekrutteringstreffRedigeringProps
> = ({ onUpdated }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);

  const handleUpdated = () => {
    rekrutteringstreffHook.mutate();
    onUpdated?.();
  };

  return (
    <div className='space-y-8'>
      <EndreTittel onUpdated={handleUpdated} />
      <PraktiskeForhold />
    </div>
  );
};

export default RekrutteringstreffRedigering;
