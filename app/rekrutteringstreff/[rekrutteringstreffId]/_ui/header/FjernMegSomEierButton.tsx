'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { fjernEier } from '@/app/api/rekrutteringstreff/[...slug]/eiere/mutations';
import { erEierAvTreff } from '@/app/rekrutteringstreff/_utils/eiere';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { Alert, BodyLong, Button, Modal, Tooltip } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

const FjernMegSomEierButton: FC = () => {
  const { rekrutteringstreffId, rekrutteringstreffHook, treff } =
    useRekrutteringstreffData();
  const { brukerData, visVarsel } = useApplikasjonContext();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [laster, setLaster] = useState(false);
  const [feilmelding, setFeilmelding] = useState<string | null>(null);
  const eiere = treff?.eierOgKontor ?? [];

  if (!erEierAvTreff(eiere, brukerData.ident)) return null;

  const erEnesteEier = !eiere.some(
    (eier) => eier.navIdent !== brukerData.ident,
  );

  const fjernMegSomEier = async () => {
    if (laster || erEnesteEier) return;
    setLaster(true);
    setFeilmelding(null);
    let skalLukke = false;
    try {
      await fjernEier(rekrutteringstreffId, brukerData.ident);
      await rekrutteringstreffHook.mutate();
      skalLukke = true;
      visVarsel({
        type: 'success',
        tekst: 'Du er ikke lenger eier av treffet.',
      });
    } catch (error) {
      setFeilmelding('Klarte ikke å fjerne deg som eier. Prøv igjen.');
      new RekbisError({
        message: 'Klarte ikke å fjerne som eier',
        error,
      });
    } finally {
      setLaster(false);
      if (skalLukke) {
        modalRef.current?.close();
      }
    }
  };

  const knapp = (
    <Button
      type='button'
      variant='secondary'
      size='small'
      disabled={erEnesteEier || laster}
      onClick={() => {
        setFeilmelding(null);
        modalRef.current?.showModal();
      }}
    >
      Fjern meg som eier
    </Button>
  );

  return (
    <>
      {erEnesteEier ? (
        <Tooltip
          content='Rekrutteringstreffet må ha minst én eier'
          describesChild
        >
          <span tabIndex={0}>{knapp}</span>
        </Tooltip>
      ) : (
        knapp
      )}
      <Modal
        ref={modalRef}
        header={{ heading: 'Vil du fjerne deg som eier av rekrutteringstreffet?' }}
        width='small'
        onBeforeClose={() => !laster}
        onClose={() => {
          if (laster) {
            modalRef.current?.showModal();
          }
        }}
      >
        <Modal.Body>
          <BodyLong>
            Du blir fjernet fra eierlisten. De andre eierne beholder tilgangen
            til rekrutteringstreffet.
          </BodyLong>
          {feilmelding && (
            <Alert variant='error' size='small' role='alert' className='mt-4'>
              {feilmelding}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='primary'
            disabled={erEnesteEier || laster}
            loading={laster}
            onClick={fjernMegSomEier}
          >
            Fjern meg
          </Button>
          <Button
            type='button'
            variant='secondary'
            disabled={laster}
            onClick={() => modalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FjernMegSomEierButton;
