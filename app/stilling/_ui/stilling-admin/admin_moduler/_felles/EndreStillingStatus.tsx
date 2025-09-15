// Flyttet fra _old/_ui/EndreStillingStatus.tsx
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';

export interface EndreStillingStatusProps {
  nyStatus: StillingsStatus;
  tekst: string;
  knappNavn: string;
  knappIkon: ReactNode;
}

const EndreStillingStatus: FC<EndreStillingStatusProps> = ({
  nyStatus,
  tekst,
  knappNavn,
  knappIkon,
}) => {
  const [open, setOpen] = useState(false);
  const { stillingsData, refetch } = useStillingsContext();
  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const router = useRouter();

  const endreStatus = async () => {
    const response = await oppdaterStilling(
      {
        ...stillingsData,
        stilling: { ...(stillingsData.stilling as any), status: nyStatus },
      },
      {
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      },
    );

    setOpen(false);
    if (response.stilling.uuid) {
      refetch?.();
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
