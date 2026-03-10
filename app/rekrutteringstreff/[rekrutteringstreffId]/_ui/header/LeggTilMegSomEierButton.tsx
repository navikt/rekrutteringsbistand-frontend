'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { leggTilMegSomEier } from '@/app/api/rekrutteringstreff/[...slug]/eiere/mutations';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { RekbisError } from '@/util/rekbisError';
import { PadlockLockedIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

const LeggTilMegSomEierButton: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { rekrutteringstreffHook, treff } = useRekrutteringstreffData();
  const { valgtNavKontor, visVarsel } = useApplikasjonContext();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [laster, setLaster] = useState(false);

  const kontorAlleredeLagtTil =
    valgtNavKontor?.navKontor != null &&
    treff?.kontorer.includes(valgtNavKontor.navKontor);

  const kontorNavn =
    valgtNavKontor?.navKontorNavn ??
    (valgtNavKontor?.navKontor
      ? hentNavkontorNavn(valgtNavKontor.navKontor)
      : null);

  const bekreftLeggTilMeg = async () => {
    setLaster(true);
    try {
      await leggTilMegSomEier(rekrutteringstreffId);
      modalRef.current?.close();
      rekrutteringstreffHook.mutate();
      visVarsel({ type: 'success', tekst: 'Du er nå lagt til som eier.' });
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å legge til deg som eier.',
      });
      new RekbisError({ message: 'Klarte ikke å legge til som eier', error });
    } finally {
      setLaster(false);
    }
  };

  return (
    <>
      <Button
        variant='secondary'
        size='small'
        icon={<PadlockLockedIcon aria-hidden />}
        onClick={() => modalRef.current?.showModal()}
      >
        Legg til meg som eier
      </Button>
      <Modal
        ref={modalRef}
        header={{ heading: 'Bli medeier av dette treffet?' }}
        width='small'
        onClose={() => !laster && modalRef.current?.close()}
      >
        <Modal.Body>
          <BodyShort>
            Som medeier får du tilgang til å jobbe med treffet. Det innebærer
            blant annet at du kan se påmeldte kandidater, sende invitasjoner og
            se svarstatus.
          </BodyShort>
          {kontorNavn && !kontorAlleredeLagtTil && (
            <BodyShort className='mt-4'>
              Kontoret ditt ({kontorNavn}) blir også lagt til på treffet, slik
              at det blir synlig for dine kollegaer.
            </BodyShort>
          )}
          {kontorAlleredeLagtTil && kontorNavn && (
            <BodyShort className='mt-4'>
              Kontoret ditt ({kontorNavn}) er allerede knyttet til treffet.
            </BodyShort>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            loading={laster}
            onClick={bekreftLeggTilMeg}
          >
            Bekreft
          </Button>
          <Button
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

export default LeggTilMegSomEierButton;
