import { endreArkivertStatus } from '@/app/api/kandidat/endreArkivertStatus';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { kandidatIListeEndepunkt } from '@/app/api/kandidat/useKandidatIListe';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { ArrowUndoIcon, TrashIcon } from '@navikt/aksel-icons';
import { ActionMenu, Alert, BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, RefObject, useState } from 'react';
import { useSWRConfig } from 'swr';

export interface EndreArkivertStatusKnappProps {
  lukketKandidatliste: boolean;
  slettet?: boolean;
  actionMenu?: boolean;
  onClick: () => void;
}

export const EndreArkivertStatusKnapp: FC<EndreArkivertStatusKnappProps> = ({
  lukketKandidatliste,
  actionMenu,
  slettet,
  onClick,
}) => {
  return (
    <>
      {actionMenu ? (
        <ActionMenu.Item variant='danger' onClick={onClick}>
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
          onClick={onClick}
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
  modalRef: RefObject<HTMLDialogElement>;
  kandidat: KandidatListeKandidatDTO;
  kandidatlisteId: string;
  onClose?: () => void;
}

export const EndreArkivertStatusModal: FC<EndreArkivertStatusModalProps> = ({
  modalRef,
  kandidat,
  kandidatlisteId,
  onClose,
}) => {
  const { valgtNavKontor } = useApplikasjonContext();

  const slettet = kandidat.arkivert;
  const { reFetchKandidatliste } = useKandidatlisteContext();
  const { refetchKandidatlisteInfo, stillingsId } = useStillingsContext();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [feilmelding, setFeilmelding] = useState<string | null>(null);
  const [kandidatMangler, setKandidatMangler] = useState(false);
  const setArkivertStatus = async (status: boolean) => {
    setIsLoading(true);
    setFeilmelding(null);
    try {
      const resultat = await endreArkivertStatus(
        kandidatlisteId,
        kandidat.kandidatnr,
        status,
        valgtNavKontor?.navKontor,
      );
      if (resultat === 'finnes-ikke') {
        setKandidatMangler(true);
        setFeilmelding(
          'Kandidaten finnes ikke lenger i kandidatlisten. Listen er oppdatert.',
        );
        reFetchKandidatliste();
        refetchKandidatlisteInfo?.();
        const kandidatEndepunkt = kandidatIListeEndepunkt(
          stillingsId,
          kandidat.kandidatnr,
        );
        await mutate(kandidatEndepunkt, undefined, { revalidate: false });
        await mutate(kandidatEndepunkt);
        return;
      }
      reFetchKandidatliste();
      refetchKandidatlisteInfo?.();
      modalRef.current?.close();
    } catch (error) {
      RekbisError.ensure(error);
      setFeilmelding(
        `Kunne ikke ${slettet ? 'gjenopprette' : 'slette'} kandidaten. Prøv igjen.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      ref={modalRef}
      header={{
        heading: slettet ? 'Bekreft gjenoppretting' : 'Bekreft sletting',
        closeButton: false,
      }}
      onClose={() => {
        if (isLoading) {
          modalRef.current?.showModal();
          return;
        }
        setFeilmelding(null);
        setKandidatMangler(false);
        onClose?.();
      }}
    >
      <Modal.Body>
        {!kandidatMangler && (
          <BodyLong>
            Er du sikker på at du vil {slettet ? 'gjenopprette' : 'slette'}{' '}
            kandidaten {kandidat.fornavn} {kandidat.etternavn}?
          </BodyLong>
        )}
        {feilmelding && (
          <Alert variant='error' role='alert' className='mt-4'>
            {feilmelding}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!kandidatMangler && (
          <Button
            loading={isLoading}
            type='button'
            onClick={() => setArkivertStatus(!slettet)}
            variant={slettet ? 'primary' : 'danger'}
          >
            {slettet ? 'Gjenopprett' : 'Slett'} kandidat
          </Button>
        )}

        <Button
          disabled={isLoading}
          type='button'
          variant='tertiary'
          onClick={() => modalRef.current?.close()}
        >
          {kandidatMangler ? 'Lukk' : 'Avbryt'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
