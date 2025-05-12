import { rekbisError } from '../../../../../util/rekbisError';
import { KandidatAPI } from '../../../../api/api-routes';
import { putApi } from '../../../../api/fetcher';
import { KandidatListeKandidatDTO } from '../../../../api/kandidat/schema.zod';
import { useKandidatlisteContext } from '../KandidatlisteContext';
import { useApplikasjonContext } from '@/app/providers/ApplikasjonContext';
import { ArrowUndoIcon, TrashIcon } from '@navikt/aksel-icons';
import { ActionMenu, BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';

export interface EndreArkivertStatusKnappProps {
  lukketKandidatliste: boolean;
  slettet?: boolean;
  actionMenu?: boolean;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export const EndreArkivertStatusKnapp: React.FC<
  EndreArkivertStatusKnappProps
> = ({ modalRef, lukketKandidatliste, actionMenu, slettet }) => {
  return (
    <>
      {actionMenu ? (
        <ActionMenu.Item
          variant='danger'
          onClick={() => modalRef.current?.showModal()}
        >
          {slettet ? (
            <ArrowUndoIcon title='Angre sletting' />
          ) : (
            <TrashIcon title='Slett' />
          )}{' '}
          {slettet ? 'Gjenopprett' : 'Slett'}
        </ActionMenu.Item>
      ) : (
        <Button
          disabled={lukketKandidatliste}
          variant='tertiary'
          size='small'
          onClick={() => modalRef.current?.showModal()}
          icon={
            slettet ? (
              <ArrowUndoIcon title='Angre sletting' />
            ) : (
              <TrashIcon title='Slett' />
            )
          }
        >
          {slettet ? 'Gjenopprett' : 'Slett'}
        </Button>
      )}
    </>
  );
};

export interface EndreArkivertStatusModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  kandidat: KandidatListeKandidatDTO;
  kandidatlisteId: string;
}

export const EndreArkivertStatusModal: React.FC<
  EndreArkivertStatusModalProps
> = ({ modalRef, kandidat, kandidatlisteId }) => {
  const { valgtNavKontor } = useApplikasjonContext();

  const slettet = kandidat.arkivert;
  const { reFetchKandidatliste } = useKandidatlisteContext();
  const [isLoading, setIsLoading] = useState(false);
  const setArkivertStatus = async (status: boolean) => {
    setIsLoading(true);
    try {
      await putApi(
        `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidat.kandidatnr}/arkivert`,
        {
          arkivert: status,
          navKontor: valgtNavKontor?.navKontor,
        },
      );
      reFetchKandidatliste();
      modalRef.current?.close();
    } catch {
      throw new rekbisError({ beskrivelse: 'Feil ved sletting av kandidat' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      ref={modalRef}
      header={{ heading: 'Bekreft sletting', closeButton: false }}
    >
      <Modal.Body>
        <BodyLong>
          Er du sikker på at du vil {slettet ? 'gjenopprette' : 'slette'}{' '}
          kandidaten {kandidat.fornavn} {kandidat.etternavn}?
        </BodyLong>
      </Modal.Body>
      <Modal.Footer>
        <Button
          loading={isLoading}
          type='button'
          onClick={() => setArkivertStatus(slettet ? false : true)}
          variant={slettet ? 'primary' : 'danger'}
        >
          {slettet ? 'Gjenopprett' : 'Slett'} kandidat
        </Button>

        <Button
          disabled={isLoading}
          type='button'
          variant='tertiary'
          onClick={() => modalRef.current?.close()}
        >
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
