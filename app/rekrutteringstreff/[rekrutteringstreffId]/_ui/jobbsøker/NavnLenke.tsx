import WindowLoader from '@/app/_experimental/_windows/WindowLoader';
import VisPerson from '@/app/rekrutteringstreff/[rekrutteringstreffId]/vis-person/_ui/VisPerson';
import { Modal } from '@navikt/ds-react';
import { FC, Suspense, useRef } from 'react';

interface NavnLenkeProps {
  fornavn: string;
  etternavn: string;
  personTreffId: string | null;
}

const storForbokstavFlereOrd = (s: string | null | undefined) => {
  if (!s || s.length === 0) return s;
  return s
    .split(' ')
    .map((o) => (o ? o[0].toUpperCase() + o.substring(1).toLowerCase() : o))
    .join(' ');
};

const NavnLenke: FC<NavnLenkeProps> = ({
  fornavn,
  etternavn,
  personTreffId,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const navn = `${storForbokstavFlereOrd(etternavn)}, ${storForbokstavFlereOrd(
    fornavn,
  )}`;

  if (!personTreffId) {
    return <span>{navn}</span>;
  }

  const åpneModal = () => modalRef.current?.showModal();
  const lukkModal = () => modalRef.current?.close();

  return (
    <>
      <button type='button' className='aksel-link' onClick={åpneModal}>
        {navn}
      </button>
      <Modal
        ref={modalRef}
        onClose={lukkModal}
        width={'1280px'}
        header={{ heading: '' }}
      >
        <Modal.Body className='h-[1024px] overflow-auto'>
          <Suspense
            fallback={
              <div className='h-full flex items-center justify-center'>
                <WindowLoader />
              </div>
            }
          >
            <VisPerson personTreffId={personTreffId} />
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavnLenke;
