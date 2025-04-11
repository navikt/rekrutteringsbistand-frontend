import { rekbisError } from '../../../../../util/rekbisError';
import { KandidatAPI } from '../../../../api/api-routes';
import { putApi } from '../../../../api/fetcher';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';
import { useKandidatliste } from '../../../../api/kandidat/useKandidatliste';
import { useStillingsContext } from '../../StillingsContext';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';

export interface SletteKandidatKnappProps {
  kandidat: kandidaterSchemaDTO;
  kandidatlisteId: string;
  lukketKandidatliste: boolean;
  tittel?: string;
}

const SletteKandidatKnapp: React.FC<SletteKandidatKnappProps> = ({
  kandidat,
  kandidatlisteId,
  lukketKandidatliste,
  tittel,
}) => {
  const { stillingsData } = useStillingsContext();
  const [isLoading, setIsLoading] = useState(false);
  const kandidatListeHook = useKandidatliste(stillingsData.stilling.uuid);

  const slettKandidat = async () => {
    setIsLoading(true);
    try {
      await putApi(
        `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidat.kandidatnr}/arkivert`,
        {
          arkivert: true,
        },
      );
      kandidatListeHook.mutate();
      slettModalRef.current?.close();
    } catch {
      throw new rekbisError({ beskrivelse: 'Feil ved sletting av kandidat' });
    } finally {
      setIsLoading(false);
    }
  };

  const slettModalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button
        disabled={lukketKandidatliste}
        variant='tertiary'
        size='small'
        onClick={() => slettModalRef.current?.showModal()}
        icon={<TrashIcon title='Slett' />}
      >
        {tittel}
      </Button>

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
    </>
  );
};

export default SletteKandidatKnapp;
