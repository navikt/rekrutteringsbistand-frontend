'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import EndreTittel from './redigereRekrutteringstreff/EndreTittel';
import PraktiskeForhold from './redigereRekrutteringstreff/Praktiskeforhold';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { Button } from '@navikt/ds-react';
import React from 'react';

interface RekrutteringstreffRedigeringProps {
  onUpdated?: () => void;
  onGåTilForhåndsvisning?: () => void;
}

const RekrutteringstreffRedigering: React.FC<
  RekrutteringstreffRedigeringProps
> = ({ onUpdated, onGåTilForhåndsvisning }) => {
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
      <div>
        <Button
          type='button'
          variant='primary'
          size='small'
          onClick={() => onGåTilForhåndsvisning?.()}
        >
          Ferdig – gå til forhåndsvisning
        </Button>
      </div>
      {/* Fast ekstra plass under for å sikre at datovelger (popup) alltid har god plass uansett skjermstørrelse */}
      <div aria-hidden className='h-80' />
    </div>
  );
};

export default RekrutteringstreffRedigering;
