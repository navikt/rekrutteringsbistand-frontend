import { Button, Modal, type ModalProps } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface Props {
  åpen: boolean;
  tittel: string;
  children: ReactNode;
  width: ModalProps['width'];
  lagrer: boolean;
  onBekreft: () => void;
  onAvbryt: () => void;
}

/** Bekreftelse før en automatisk fordeling overskriver manuelle endringer. */
const BekreftFordelPåNyttModal: FC<Props> = ({
  åpen,
  tittel,
  children,
  width,
  lagrer,
  onBekreft,
  onAvbryt,
}) => (
  <Modal
    open={åpen}
    onClose={() => {
      if (!lagrer) onAvbryt();
    }}
    header={{ heading: tittel, closeButton: !lagrer }}
    width={width}
  >
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button type='button' loading={lagrer} onClick={onBekreft}>
        Fordel på nytt
      </Button>
      <Button
        type='button'
        variant='secondary'
        disabled={lagrer}
        onClick={onAvbryt}
      >
        Avbryt
      </Button>
    </Modal.Footer>
  </Modal>
);

export default BekreftFordelPåNyttModal;
