'use client';

import {
  oppdaterBrukerinnstillinger,
  useBrukerinnstillinger,
} from '@/app/api/bruker/innstillinger/useBrukerinnstillinger';
import type { NyheterArrayDTO } from '@/app/api/bruker/nyheter/useNyheter';
import { useNyheter } from '@/app/api/bruker/nyheter/useNyheter';
import VisEditorTekst from '@/components/rikteksteditor/VisEditorTekst';
import { formaterNorskDato } from '@/util/dato';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import { useEffect, useMemo, useState } from 'react';

export default function UlesteNyheterModal() {
  const { data: nyheter } = useNyheter();
  const brukerinnstillingerHook = useBrukerinnstillinger();
  const [modalOpen, setModalOpen] = useState(false);
  const [ulesteAntall, setUlesteAntall] = useState(0);

  const sorterteNyheter = useMemo(() => {
    if (!nyheter) {
      return [] as NyheterArrayDTO;
    }

    return [...nyheter].sort(
      (a, b) =>
        new Date(b.opprettetDato).getTime() -
        new Date(a.opprettetDato).getTime(),
    );
  }, [nyheter]);

  useEffect(() => {
    let timeoutId: number | undefined;

    const oppdaterTilstand = (antall: number, skalÅpnes: boolean) => {
      timeoutId = window.setTimeout(() => {
        setUlesteAntall(antall);
        setModalOpen(skalÅpnes);
      }, 200);
    };

    if (!sorterteNyheter.length) {
      oppdaterTilstand(0, false);
      return () => {
        if (timeoutId !== undefined) {
          window.clearTimeout(timeoutId);
        }
      };
    }

    if (brukerinnstillingerHook.data) {
      const uleste = Math.max(
        sorterteNyheter.length -
          brukerinnstillingerHook.data.antallLesteNyheter,
        0,
      );
      oppdaterTilstand(uleste, uleste > 0);
    }

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [brukerinnstillingerHook.data, sorterteNyheter]);

  const ulesteNyheter = useMemo(() => {
    if (!ulesteAntall || !sorterteNyheter.length) {
      return [] as typeof sorterteNyheter;
    }

    const antallSomSkalVises = Math.min(ulesteAntall, sorterteNyheter.length);
    return sorterteNyheter.slice(0, antallSomSkalVises);
  }, [sorterteNyheter, ulesteAntall]);

  const markerSomLest = () => {
    if (nyheter && brukerinnstillingerHook.data) {
      const oppdaterteInnstillinger = {
        ...brukerinnstillingerHook.data,
        antallLesteNyheter: nyheter.length,
      };
      void brukerinnstillingerHook.mutate(
        oppdaterBrukerinnstillinger(oppdaterteInnstillinger),
        {
          optimisticData: oppdaterteInnstillinger,
          rollbackOnError: true,
          revalidate: false,
        },
      );
    }
  };

  const handleClose = () => {
    markerSomLest();
    setUlesteAntall(0);
    setModalOpen(false);
  };

  if (!ulesteNyheter.length) {
    return null;
  }

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      closeOnBackdropClick={false}
      aria-labelledby='uleste-nyheter-heading'
      width='600px'
    >
      <Modal.Header closeButton>
        <Heading level='1' size='medium' id='uleste-nyheter-heading'>
          Nyheter for deg
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col gap-6'>
          {ulesteNyheter.map((nyhet) => (
            <article key={nyhet.nyhetId} className='flex flex-col gap-2'>
              <Heading size='small' level='2'>
                {nyhet.tittel}
              </Heading>
              <BodyShort size='small' className='text-text-subtle'>
                {formaterNorskDato({ dato: nyhet.opprettetDato })}
              </BodyShort>
              <VisEditorTekst htmlTekst={nyhet.innhold} />
            </article>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Lukk</Button>
        <Button
          as='a'
          href='/nyheter'
          variant='secondary'
          onClick={markerSomLest}
        >
          Gå til nyhetssiden
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
