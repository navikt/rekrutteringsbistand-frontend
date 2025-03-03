import { oppdaterStilling } from '../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsStatus } from '../../../stilling-typer';
import { useStillingsContext } from '../../StillingsContext';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface EndreStillingStatusProps {
  nyStatus: StillingsStatus;
  tekst: string;
  knappNavn: string;
  knappIkon: React.ReactNode;
}

const EndreStillingStatus: React.FC<EndreStillingStatusProps> = ({
  nyStatus,
  tekst,
  knappNavn,
  knappIkon,
}) => {
  const [open, setOpen] = React.useState(false);
  const { stillingsData, refetch } = useStillingsContext();
  const router = useRouter();

  const endreStatus = async () => {
    const response = await oppdaterStilling({
      ...stillingsData,
      stilling: {
        ...stillingsData.stilling,
        status: nyStatus,
      },
    });

    setOpen(false);
    if (response.stilling.uuid) {
      refetch();
      router.push(`/stilling/${response.stilling.uuid}`);
    } else {
      alert('Feil ved opprettelse av stilling');
    }
  };

  return (
    <>
      <Button icon={knappIkon} variant='tertiary' onClick={() => setOpen(true)}>
        {knappNavn}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{
          heading: 'Er du sikker?',
          size: 'small',
          closeButton: false,
        }}
        width='small'
      >
        <Modal.Body>
          <BodyLong>{tekst}</BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' variant='danger' onClick={endreStatus}>
            Ja, jeg er sikker
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => setOpen(false)}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EndreStillingStatus;
