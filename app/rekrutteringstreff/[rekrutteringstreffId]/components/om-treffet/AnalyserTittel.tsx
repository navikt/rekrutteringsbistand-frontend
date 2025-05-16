'use client';

import {
  validerRekrutteringstreff,
  ValiderRekrutteringstreffResponsDto,
} from '@/app/api/rekrutteringstreff/validerRekrutteringstreff/validerRekrutteringstreff';
import {
  BodyLong,
  BodyShort,
  Button,
  Modal,
  Label,
  Alert,
} from '@navikt/ds-react';
import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import SWRLaster from '@/app/components/SWRLaster';

export interface AnalyserTittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  tittel: string;
}

const AnalyserTittel: React.FC<AnalyserTittelProps> = ({ modalRef, tittel }) => {
  const {
    data,
    error,
    trigger,
    isMutating,
    reset,
  } = useSWRMutation<ValiderRekrutteringstreffResponsDto, Error, string, string>(
    'validerRekrutteringstreff',
    (_, { arg }) => validerRekrutteringstreff(arg),
  );

  useEffect(() => {
    if (modalRef.current?.open) trigger(tittel);
  }, [modalRef, tittel]);

  const handleClose = () => {
    modalRef.current?.close();
    reset();
  };

  const valideringHook = {
    data,
    error,
    isLoading: isMutating,
  } as const;

  return (
    <Modal
      ref={modalRef}
      header={{ heading: 'Analyser tittel' }}
      width={400}
      onClose={handleClose}
    >
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <Label>Tittel som analyseres:</Label>
            <BodyLong>{tittel}</BodyLong>
          </div>

          <SWRLaster hooks={[valideringHook]}>
            {(resultat: ValiderRekrutteringstreffResponsDto) => (
              <div>
                <Label>Resultat av analyse:</Label>
                {resultat.bryterRetningslinjer ? (
                  <Alert variant="warning">
                    <BodyShort weight="semibold">
                      Tittelen bryter med retningslinjer.
                    </BodyShort>
                    <BodyLong>{resultat.begrunnelse}</BodyLong>
                  </Alert>
                ) : (
                  <Alert variant="success">
                    <BodyShort weight="semibold">Tittelen ser grei ut.</BodyShort>
                    <BodyLong>{resultat.begrunnelse}</BodyLong>
                  </Alert>
                )}
              </div>
            )}
          </SWRLaster>
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-1">
        <Button type="button" variant="secondary" onClick={handleClose}>
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AnalyserTittel;
