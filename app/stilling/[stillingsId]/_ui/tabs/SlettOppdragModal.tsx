import { slettStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/slett-stilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { ArrowUndoIcon, EyeSlashIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';

export interface SlettOppdragModalProps {
  setVisModal: (val: boolean) => void;
}

export default function SlettOppdragModal({
  setVisModal,
}: SlettOppdragModalProps) {
  const { stillingsData, refetch } = useStillingsContext();

  const [loading, setLoading] = useState(false);

  const slettStillingClick = async () => {
    setLoading(true);
    await slettStilling(stillingsData.stilling.uuid);
    setLoading(false);
    setVisModal(false);
    if (refetch) {
      refetch();
    }
  };

  return (
    <>
      <Modal
        onClose={() => setVisModal(false)}
        open={true}
        header={{
          heading: 'Avpubliser stillingsoppdraget',
          size: 'small',
        }}
        width='medium'
      >
        <Modal.Body>
          <div className='flex gap-2 flex-col'>
            <BodyShort>Hva som skjer</BodyShort>
            <div className='flex gap-2'>
              <EyeSlashIcon />
              <BodyLong>
                Stillingsoppdraget skjules for andre i rekrutteringsbistand.
              </BodyLong>
            </div>
            <div className='flex gap-2'>
              <ArrowUndoIcon />
              <BodyLong>
                Du kan publisere oppdraget på nytt. Det gjør du ved å velge
                &quot;Rediger&quot; på oppdraget og fullføre flyten.
              </BodyLong>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='danger'
            onClick={slettStillingClick}
            loading={loading}
          >
            Avpubliser oppdraget
          </Button>
          <Button
            type='button'
            variant='secondary'
            loading={loading}
            onClick={() => setVisModal(false)}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
