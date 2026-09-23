import { Button, Dialog, type DialogPopupProps } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface Props {
  åpen: boolean;
  tittel: string;
  children: ReactNode;
  width: DialogPopupProps['width'];
  lagrer: boolean;
  onBekreft: () => void;
  onAvbryt: () => void;
}

/** Bekreftelse før en automatisk fordeling overskriver manuelle endringer. */
const BekreftFordelPåNyttDialog: FC<Props> = ({
  åpen,
  tittel,
  children,
  width,
  lagrer,
  onBekreft,
  onAvbryt,
}) => (
  <Dialog
    open={åpen}
    onOpenChange={(nesteÅpen) => {
      if (!nesteÅpen && !lagrer) onAvbryt();
    }}
  >
    <Dialog.Popup width={width} closeOnOutsideClick={false}>
      <Dialog.Header withClosebutton={!lagrer}>
        <Dialog.Title>{tittel}</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>{children}</Dialog.Body>
      <Dialog.Footer>
        <Dialog.CloseTrigger>
          <Button type='button' variant='secondary' disabled={lagrer}>
            Avbryt
          </Button>
        </Dialog.CloseTrigger>
        <Button type='button' loading={lagrer} onClick={onBekreft}>
          Fordel på nytt
        </Button>
      </Dialog.Footer>
    </Dialog.Popup>
  </Dialog>
);

export default BekreftFordelPåNyttDialog;
