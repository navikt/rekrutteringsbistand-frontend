import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Modal, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface EndretittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  tittel: string;
}

const Endretittel: React.FC<EndretittelProps> = ({ modalRef, tittel }) => {
  const [nyTittel, setNyTittel] = useState(tittel);

  useEffect(() => {
    setNyTittel(tittel);
  }, [tittel]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalRef.current?.close();
  };

  const handleClearTittel = () => {
    setNyTittel('');
  };

  return (
    <div className='py-12'>
      <Modal ref={modalRef} header={{ heading: 'Endre tittel' }} width={400}>
        <Modal.Body>
          <form
            method='dialog'
            id='skjema-endre-tittel'
            onSubmit={handleSubmit}
          >
            <div className='flex items-end gap-2'>
              <TextField
                label='Ny tittel'
                value={nyTittel}
                onChange={(e) => setNyTittel(e.target.value)}
                className='flex-grow'
                autoFocus
              />
              {nyTittel && (
                <Button
                  type='button'
                  onClick={handleClearTittel}
                  icon={<XMarkIcon title='Tøm feltet' />}
                  variant='tertiary'
                  size='small'
                />
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' form='skjema-endre-tittel'>
            Lagre
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => modalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Endretittel;
