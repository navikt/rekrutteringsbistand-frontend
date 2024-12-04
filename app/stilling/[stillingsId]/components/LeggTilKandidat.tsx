import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Alert, Button, Modal, TextField } from '@navikt/ds-react';
import { idnr } from '@navikt/fnrvalidator';
import * as React from 'react';
import { useRef, useState } from 'react';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
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
  const [fødselsnummer, setFødselsnummer] = useState<string | null>(null);
  const [laster, setLaster] = useState(false);

  const [lagtTil, setLagtTil] = useState(false);

  const kandidatNavn = useKandidatNavn(fødselsnummer);
  const arenaKandidatnr = useArenaKandidatnr(fødselsnummer);

  const isLoading =
    kandidatNavn.isLoading || arenaKandidatnr.isLoading || laster;

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

  const onLeggTilKandidat = async () => {
    setLaster(true);
    if (fødselsnummer) {
      await leggTilKandidater([{ kandidatnr: fødselsnummer }], stillingsId)
        .then(() => {
          setLagtTil(true);
        })
        .catch(() => {
          setFeilmelding('Noe gikk galt ved lagring av kandidat');
        });
    }
    setLaster(false);
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
        {lagtTil ? (
          <>
            <Modal.Body>
              <Alert variant='success'>
                Kandidat {kandidatNavn.data?.fornavn}{' '}
                {kandidatNavn.data?.etternavn} er lagt til i stillingen
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => ref.current?.close()}>Lukk</Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Body>
              <TextField
                label='Fødselsnummer på kandidat'
                onChange={handleFnrChange}
                error={feilmelding}
              />

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
              <Button
                disabled={isLoading || !fødselsnummer}
                onClick={onLeggTilKandidat}
              >
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
          </>
        )}
      </Modal>
    </div>
  );
};

export default LeggTilKandidat;
