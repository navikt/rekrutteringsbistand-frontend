import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Alert, Button, Modal, TextField } from '@navikt/ds-react';
import { idnr } from '@navikt/fnrvalidator';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useArenaKandidatnr } from '../../../api/kandidat-sok/useArenaKandidatnr';
import { useKandidatNavn } from '../../../api/kandidat-sok/useKandidatNavn';

export interface LeggTilKandidatProps {
  stillingsId: string;
  stillingsTittel: string;
}

const validerFnr = (fnr: string): boolean => idnr(fnr).status === 'valid';

const LeggTilKandidat: React.FC<LeggTilKandidatProps> = ({
  stillingsId,
  stillingsTittel,
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [feilmelding, setFeilmelding] = useState('');
  const [fødselsnummer, setFødselsnummer] = useState<String | null>(null);

  const kandidatNavn = useKandidatNavn(fødselsnummer);
  const arenaKandidatnr = useArenaKandidatnr(fødselsnummer);

  const isLoading = kandidatNavn.isLoading || arenaKandidatnr.isLoading;
  const handleFnrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fødselsnummer = event.target.value;

    if (fødselsnummer.length < 11) {
      setFeilmelding('');
      setFødselsnummer(null);
    } else if (fødselsnummer.length > 11) {
      setFødselsnummer(null);
      setFeilmelding('Fødselsnummeret er for langt');
    } else {
      const erGyldig = validerFnr(fødselsnummer);
      if (erGyldig) {
        setFeilmelding('');
        setFødselsnummer(fødselsnummer);
      } else {
        setFødselsnummer(null);
        setFeilmelding('Fødselsnummeret er ikke gyldig');
      }
    }
  };

  return (
    <div>
      <Button
        loading={isLoading}
        onClick={() => ref.current?.showModal()}
        variant='secondary'
        className='mr-2'
        icon={<ArrowForwardIcon aria-hidden />}
      >
        Legg til kandidat
      </Button>

      <Modal
        ref={ref}
        header={{
          closeButton: false,
          heading: `Legg til kandidat til ${stillingsTittel ?? 'stilling'}`,
        }}
        width={400}
      >
        <Modal.Body>
          <form method='dialog' id='skjema' onSubmit={() => alert('onSubmit')}>
            <TextField
              label='Fødselsnummer på kandidat'
              onChange={handleFnrChange}
              error={feilmelding}
            />
          </form>
          {kandidatNavn.data && (
            <div className='mt-4'>
              <p>
                <strong>Kandidatnavn:</strong> {kandidatNavn.data?.fornavn}{' '}
                {kandidatNavn.data?.etternavn}
              </p>
              {arenaKandidatnr.data && (
                <p>
                  <strong>Arena kandidatnr:</strong>{' '}
                  {arenaKandidatnr.data?.arenaKandidatnr}
                </p>
              )}
            </div>
          )}
          {(kandidatNavn.error || arenaKandidatnr.error) && (
            <Alert variant='error' className='mt-4'>
              <p>Finner ikke person knyttet til fødselsnummer</p>
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled form='skjema'>
            Legg til kandidat
          </Button>
          <Button
            disabled={isLoading}
            type='button'
            variant='secondary'
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeggTilKandidat;
