'use client';

import { slettFormidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/mutations';
import { Formidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { EyeSlashIcon, CircleSlashIcon } from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Heading,
  Modal,
  VStack,
} from '@navikt/ds-react';
import { FC, useState } from 'react';

interface SlettFormidlingModalProps {
  formidling: Formidling;
  rekrutteringstreffId: string;
  eierNavKontorEnhetId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const SlettFormidlingModal: FC<SlettFormidlingModalProps> = ({
  formidling,
  rekrutteringstreffId,
  eierNavKontorEnhetId,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [feilmelding, setFeilmelding] = useState<string | null>(null);

  const visningsnavn = formidling.etternavn
    ? `${formidling.etternavn}, ${formidling.fornavn}`
    : formidling.fornavn;

  const handleSlettFormidling = async () => {
    setLoading(true);
    setFeilmelding(null);
    try {
      await slettFormidling({
        rekrutteringstreffId,
        formidlingId: formidling.id,
        eierNavKontorEnhetId,
      });
      onSuccess();
      onClose();
    } catch (error) {
      setFeilmelding(
        'Kunne ikke slette formidlingen. Vennligst prøv igjen senere.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      onClose={onClose}
      open={true}
      header={{
        heading: `Vil du slette formidlingen for ${visningsnavn}?`,
        size: 'small',
      }}
      width='medium'
    >
      <Modal.Body>
        <VStack gap='space-24'>
          <BodyShort>
            Du skal kun slette formidlingen hvis den er opprettet ved en feil.
          </BodyShort>
          <Box
            padding='space-24'
            borderRadius='12'
            borderColor='info-subtleA'
            background='neutral-softA'
          >
            <VStack gap='space-16'>
              <Heading size='small'>
                Dette skjer når du sletter formidlingen:
              </Heading>

              <div className='flex items-center gap-2'>
                <EyeSlashIcon aria-hidden />
                <BodyLong>
                  Formidlingen fjernes for alle i Rekrutteringsbistand.
                </BodyLong>
              </div>
              <div className='flex items-center gap-2'>
                <CircleSlashIcon aria-hidden />
                <BodyLong>Du kan ikke gjenåpne formidlingen.</BodyLong>
              </div>
            </VStack>
          </Box>
          {feilmelding && (
            <Alert variant='error' size='small'>
              {feilmelding}
            </Alert>
          )}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          data-color='danger'
          type='button'
          variant='primary'
          onClick={handleSlettFormidling}
          loading={loading}
        >
          Ja, slett formidlingen
        </Button>
        <Button
          type='button'
          variant='secondary'
          loading={loading}
          onClick={onClose}
        >
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SlettFormidlingModal;
