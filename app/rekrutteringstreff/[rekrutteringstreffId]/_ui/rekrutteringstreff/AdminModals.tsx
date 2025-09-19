'use client';

import { EyeIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Button, Modal } from '@navikt/ds-react';
import { FC, RefObject } from 'react';

export type AdminHendelse = 'avpubliser' | 'avlys';

export type ModalKonfig = {
  heading: string;
  body: string;
  confirmLabel: string;
  variant: 'primary' | 'secondary' | 'danger';
};

interface Props {
  redigerPublisertModalRef: RefObject<HTMLDialogElement | null>;
  publiserModalRef: RefObject<HTMLDialogElement | null>;
  fullførModalRef: RefObject<HTMLDialogElement | null>;
  gjenåpneModalRef: RefObject<HTMLDialogElement | null>;
  administrasjonModalRef: RefObject<HTMLDialogElement | null>;

  publiserer: boolean;
  fullfører: boolean;
  gjenåpner: boolean;

  onBekreftRedigerPublisert: () => void;
  onPubliser: () => Promise<void> | void;
  onFullfør: () => Promise<void> | void;
  onGjenåpne: () => Promise<void> | void;

  aktivModal: AdminHendelse | null;
  modalKonfig: Record<AdminHendelse, ModalKonfig>;
  prosesserer: AdminHendelse | null;
  onAdministrasjon: (hendelse: AdminHendelse) => void;
  onCloseAdministrasjonModal: () => void;
}

const AdminModals: FC<Props> = ({
  redigerPublisertModalRef,
  publiserModalRef,
  fullførModalRef,
  gjenåpneModalRef,
  publiserer,
  fullfører,
  gjenåpner,
  onBekreftRedigerPublisert,
  onPubliser,
  onFullfør,
  onGjenåpne,
  aktivModal,
  modalKonfig,
  prosesserer,
  onAdministrasjon,
  administrasjonModalRef,
  onCloseAdministrasjonModal,
}) => {
  const aktivModalKonfig = aktivModal ? modalKonfig[aktivModal] : undefined;

  return (
    <>
      <Modal
        ref={redigerPublisertModalRef}
        header={{ heading: 'Treffet er allerede publisert' }}
      >
        <Modal.Body>
          <BodyLong>
            Dette rekrutteringstreffet er allerede publisert. Hvis du gjør
            endringer nå, vil vi ikke lagre fortløpende per felt. Endringene
            blir lagret når du trykker på knappen Publiser på nytt.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='primary'
            size='small'
            onClick={onBekreftRedigerPublisert}
          >
            Rediger likevel
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='small'
            onClick={() => redigerPublisertModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal ref={publiserModalRef} header={{ heading: 'Publiser treffet' }}>
        <Modal.Body>
          <div className='bg-bg-subtle p-4 rounded-md'>
            <Box.New>
              <BodyShort className='font-bold'>
                Dette skjer når du publiserer treffet
              </BodyShort>
              <div className='flex items-center gap-2 mt-4'>
                <EyeIcon fontSize='1.5rem' aria-hidden />
                <BodyShort className='flex-1'>
                  Treffet blir synlig for:
                </BodyShort>
              </div>
              <ul className='list-disc pl-16  mt-1'>
                <li>Nav-ansatte i rekrutteringsbistand.</li>
                <li>Nav brukere som blir invitert via aktivitetsplanen.</li>
              </ul>
            </Box.New>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            size='small'
            loading={publiserer}
            onClick={async () => {
              publiserModalRef.current?.close();
              await onPubliser();
            }}
          >
            Publiser
          </Button>
          <Button
            variant='secondary'
            size='small'
            onClick={() => publiserModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        ref={fullførModalRef}
        header={{ heading: 'Fullfør rekrutteringstreff?' }}
      >
        <Modal.Body>
          <p>
            Slutttidspunktet for rekrutteringstreffet har ikke passert ennå. Er
            du sikker på at du vil fullføre rekrutteringsreffet likevel?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size='small'
            loading={fullfører}
            onClick={() => {
              onFullfør();
              fullførModalRef.current?.close();
            }}
          >
            Fullfør
          </Button>
          <Button
            size='small'
            variant='secondary'
            onClick={() => fullførModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        ref={gjenåpneModalRef}
        header={{ heading: 'Gjenåpne rekrutteringstreffet?' }}
      >
        <Modal.Body>
          <BodyLong>
            Treffet blir aktivt igjen, og du kan gjøre endringer eller sende nye
            invitasjoner. Er du sikker på at du vil fortsette?
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size='small'
            loading={gjenåpner}
            onClick={async () => {
              await onGjenåpne();
              gjenåpneModalRef.current?.close();
            }}
          >
            Gjenåpne
          </Button>
          <Button
            size='small'
            variant='secondary'
            onClick={() => gjenåpneModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      {aktivModalKonfig && (
        <Modal
          ref={administrasjonModalRef}
          onClose={() => {
            if (prosesserer) {
              administrasjonModalRef.current?.showModal();
              return;
            }
            onCloseAdministrasjonModal();
          }}
          header={{ heading: aktivModalKonfig.heading }}
        >
          <Modal.Body>
            <BodyLong>{aktivModalKonfig.body}</BodyLong>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='button'
              size='small'
              variant={aktivModalKonfig.variant}
              loading={prosesserer === aktivModal}
              onClick={() => aktivModal && onAdministrasjon(aktivModal)}
            >
              {aktivModalKonfig.confirmLabel}
            </Button>
            <Button
              type='button'
              size='small'
              variant='secondary'
              onClick={() => {
                if (!prosesserer) {
                  administrasjonModalRef.current?.close();
                  onCloseAdministrasjonModal();
                }
              }}
              disabled={!!prosesserer}
            >
              Avbryt
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AdminModals;
