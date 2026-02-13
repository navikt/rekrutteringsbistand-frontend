'use client';
import { useEndreSøkeforslag } from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/endre-søkeforslag/useEndreSøkeforslag';
import {
  AdminStatus,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import { PauseIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Dialog } from '@navikt/ds-react';
import { useState } from 'react';

export default function PauseSøkeforslag() {
  const { endreSøkeforslag } = useEndreSøkeforslag();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const håndterPauseSøkeforslag = async () => {
    setLoading(true);
    try {
      await endreSøkeforslag({
        status: StillingsStatus.Inaktiv,
        adminStatus: AdminStatus.Pending,
        publiserArbeidsplassen: false,
      });
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size='small'
        variant={'tertiary'}
        icon={<PauseIcon />}
        onClick={() => setOpen(true)}
        aria-haspopup='dialog'
        aria-controls={open ? 'dialog-popup-example' : undefined}
      >
        Pause
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Popup id='dialog-popup-example'>
          <Dialog.Header>
            <Dialog.Title>Pause søkerforslag</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>
              Har du fått nok jobbsøkere? Du kan stoppe å motta nye forslag, og
              samtidig skjule oppdraget fra listen. Slå det på igjen når du vil.
            </BodyLong>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button loading={loading} variant='secondary'>
                Avbryt
              </Button>
            </Dialog.CloseTrigger>
            <Button
              icon={<PauseIcon />}
              loading={loading}
              onClick={håndterPauseSøkeforslag}
            >
              Pause søkerforslag
            </Button>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
    </>
  );
}
