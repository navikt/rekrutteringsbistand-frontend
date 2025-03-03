import { KandidatAPI } from '../../../../api/api-routes';
import { putApi } from '../../../../api/fetcher';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';

export interface SletteKandidatKnappProps {
  kandidat: kandidaterSchemaDTO;
  stillingsId: string;
  lukketKandidatliste: boolean;
}

const SletteKandidatKnapp: React.FC<SletteKandidatKnappProps> = ({
  kandidat,
  stillingsId,
  lukketKandidatliste,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const slettKandidat = async () => {
    setIsLoading(true);
    await putApi(
      `${KandidatAPI.internUrl}/kandidat/veileder/kandidatlister/${stillingsId}/kandidater/${kandidat.kandidatnr}/arkivert`,
      {
        arkivert: true,
      },
    );
    setIsLoading(false);
    slettModalRef.current?.close();
  };

  const slettModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        disabled={lukketKandidatliste}
        variant='tertiary'
        size='small'
        onClick={() => slettModalRef.current?.showModal()}
        icon={<TrashIcon title='Slett' />}
      />

      <Modal
        ref={slettModalRef}
        header={{ heading: 'Bekreft sletting', closeButton: false }}
      >
        <Modal.Body>
          <BodyLong>
            Er du sikker på at du vil slette kandidaten {kandidat.fornavn}{' '}
            {kandidat.etternavn}?
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            loading={isLoading}
            type='button'
            onClick={slettKandidat}
            variant='danger'
          >
            Slett kandidat
          </Button>

          <Button
            disabled={isLoading}
            type='button'
            variant='tertiary'
            onClick={() => slettModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SletteKandidatKnapp;
