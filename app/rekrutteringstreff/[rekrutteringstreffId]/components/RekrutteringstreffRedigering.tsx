'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import EndreTittel from './redigereRekrutteringstreff/EndreTittel';
import PraktiskeForhold from './redigereRekrutteringstreff/Praktiskeforhold';
import { useAutosave } from './redigereRekrutteringstreff/useAutosave';
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
  const { save } = useAutosave();

  const harPublisert =
    rekrutteringstreffHook.data?.hendelser?.some(
      (h) => h.hendelsestype === 'PUBLISER',
    ) ?? false;

  const handleUpdated = () => {
    rekrutteringstreffHook.mutate();
    onUpdated?.();
  };

  return (
    <div className='space-y-8'>
      <EndreTittel onUpdated={handleUpdated} />
      <PraktiskeForhold />
      <div>
        {harPublisert ? (
          <div className='flex gap-2'>
            <Button
              type='button'
              variant='primary'
              size='small'
              onClick={async () => {
                // Lagre hele formet i én operasjon, og gå til forhåndsvisning
                await save(undefined, true);
                onGåTilForhåndsvisning?.();
              }}
            >
              Publiser på nytt
            </Button>
            <Button
              type='button'
              variant='secondary'
              size='small'
              onClick={() => onGåTilForhåndsvisning?.()}
            >
              Avbryt
            </Button>
          </div>
        ) : (
          <Button
            type='button'
            variant='primary'
            size='small'
            onClick={() => onGåTilForhåndsvisning?.()}
          >
            Ferdig – gå til forhåndsvisning
          </Button>
        )}
      </div>
      {/* Fast ekstra plass under for å sikre at datovelger (popup) alltid har god plass uansett skjermstørrelse */}
      <div aria-hidden className='h-80' />
    </div>
  );
};

export default RekrutteringstreffRedigering;
