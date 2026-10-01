'use client';

import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Dialog } from '@navikt/ds-react';

interface Props {
  open: boolean;
  onBekreft: () => void;
  onAvbryt: () => void;
}

export default function BekreftMarkerAlleDialog({
  open,
  onBekreft,
  onAvbryt,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(nyOpen) => !nyOpen && onAvbryt()}>
      <Dialog.Popup width='small'>
        <Dialog.Header>
          <Dialog.Title className={'no-wrap flex items-center gap-2'}>
            <ExclamationmarkTriangleIcon />
            Før du fortsetter
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <BodyLong>
            Jeg bekrefter at de valgte jobbsøkerne er vurdert individuelt som
            relevante for den/de stillingen(e) som tilbys
          </BodyLong>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button variant='secondary'>Avbryt</Button>
          </Dialog.CloseTrigger>
          <Button onClick={onBekreft}>Bekrefter</Button>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
}
