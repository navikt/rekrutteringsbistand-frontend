import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Alert, Button, Modal } from '@navikt/ds-react';
import { idnr } from '@navikt/fnrvalidator';
import * as React from 'react';
import { useRef, useState } from 'react';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import { useArenaKandidatnr } from '../../../api/kandidat-sok/useArenaKandidatnr';
import { useKandidatNavn } from '../../../api/kandidat-sok/useKandidatNavn';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '../../../components/legg-til-kandidat/LeggTilKandidater';

export interface LeggTilKandidatTilStillingProps {
  stillingsId: string;
  stillingsTittel: string;
}

const validerFnr = (fnr: string): boolean => idnr(fnr).status === 'valid';

const LeggTilKandidatTilStilling: React.FC<LeggTilKandidatTilStillingProps> = ({
  stillingsId,
  stillingsTittel,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  const [valgteKandidater, setValgteKandidater] = useState<ValgtKandidatProp[]>(
    [],
  );
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

    const valgteAktørIder = valgteKandidater
      .map((kandidat) => kandidat.aktørId)
      .filter((aktørId) => aktørId !== undefined);

    if (valgteAktørIder.length > 0) {
      await leggTilKandidater(valgteAktørIder, stillingsId)
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
        Legg til kandidater
      </Button>

      <Modal
        width='600px'
        ref={ref}
        header={{
          closeButton: false,
          heading: `Legg til kandidater til ${stillingsTittel ?? 'stilling'}`,
        }}
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
              <LeggTilKandidater
                måHaAktørId
                callBack={(valgteKandidater) => {
                  setValgteKandidater(valgteKandidater);
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                disabled={isLoading || valgteKandidater.length === 0}
                onClick={onLeggTilKandidat}
              >
                Legg til kandidater
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

export default LeggTilKandidatTilStilling;
