'use client';

import { toIso, formatIso } from '../rediger/tidspunkt/utils';
import { BodyLong, BodyShort, Button, Label, Modal } from '@navikt/ds-react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Endring = {
  etikett: string;
  gammelVerdi: string;
  nyVerdi: string;
};

interface Props {
  disabled?: boolean;
  treff: any;
  innleggHtmlFraBackend?: string | null;
  onBekreft: () => Promise<void> | void;
}

const toIsoLocal = (
  date: Date | null | undefined,
  time?: string | null,
): string | null => {
  if (!date) return null;
  const timeValue = time?.trim() || '00:00';
  return toIso(date, timeValue);
};

const formatIsoLocal = (iso: string | null | undefined) =>
  iso ? formatIso(iso) : '';

const leggTilEndringHvisUlik = (
  endringer: Endring[],
  etikett: string,
  gammelVerdi: string | null,
  nyVerdi: string | null,
  formatter?: (val: string | null) => string,
) => {
  const format = (x: string | null) => (formatter ? formatter(x) : (x ?? ''));
  const gammel = format(gammelVerdi);
  const ny = format(nyVerdi);
  if (gammel !== ny) {
    endringer.push({ etikett, gammelVerdi: gammel, nyVerdi: ny });
  }
};

const beregnEndringer = (
  verdier: any,
  treff: any,
  innleggHtmlFraBackend: string,
): Endring[] => {
  const endringer: Endring[] = [];

  // Beregn tidspunkter
  const fraTid = toIsoLocal(verdier.fraDato, verdier.fraTid) ?? treff?.fraTid;
  const tilTid =
    toIsoLocal(verdier.tilDato ?? verdier.fraDato, verdier.tilTid) ??
    treff?.tilTid;
  const svarfrist =
    toIsoLocal(verdier.svarfristDato, verdier.svarfristTid) ?? treff?.svarfrist;

  // Beregn ny tittel
  const tittel = verdier.tittel?.trim() || treff?.tittel || '';

  // Sammenlign alle felter
  leggTilEndringHvisUlik(endringer, 'Tittel', treff?.tittel, tittel);
  leggTilEndringHvisUlik(
    endringer,
    'Beskrivelse',
    treff?.beskrivelse,
    verdier.beskrivelse ?? treff?.beskrivelse,
  );
  leggTilEndringHvisUlik(
    endringer,
    'Fra',
    treff?.fraTid,
    fraTid,
    formatIsoLocal,
  );
  leggTilEndringHvisUlik(
    endringer,
    'Til',
    treff?.tilTid,
    tilTid,
    formatIsoLocal,
  );
  leggTilEndringHvisUlik(
    endringer,
    'Svarfrist',
    treff?.svarfrist,
    svarfrist,
    formatIsoLocal,
  );
  leggTilEndringHvisUlik(
    endringer,
    'Gateadresse',
    treff?.gateadresse,
    verdier.gateadresse ?? treff?.gateadresse,
  );
  leggTilEndringHvisUlik(
    endringer,
    'Postnummer',
    treff?.postnummer,
    verdier.postnummer ?? treff?.postnummer,
  );
  leggTilEndringHvisUlik(
    endringer,
    'Poststed',
    treff?.poststed,
    verdier.poststed ?? treff?.poststed,
  );

  // Sjekk om innlegg er endret
  if ((innleggHtmlFraBackend || '') !== (verdier.htmlContent || '')) {
    endringer.push({
      etikett: 'Innlegg',
      gammelVerdi: 'Innhold endret',
      nyVerdi: 'Innhold endret',
    });
  }

  return endringer;
};

const RepubliserRekrutteringstreffButton: FC<Props> = ({
  disabled,
  treff,
  innleggHtmlFraBackend,
  onBekreft,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { getValues, watch, formState } = useFormContext();
  const [endringer, setEndringer] = useState<Endring[]>([]);

  useEffect(() => {
    if (!treff) {
      setEndringer([]);
      return;
    }

    const beregnOgOppdater = () => {
      const verdier = getValues();
      const nyeEndringer = beregnEndringer(
        verdier,
        treff,
        innleggHtmlFraBackend || '',
      );
      // Kun oppdater state hvis endringene faktisk er forskjellige
      setEndringer((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(nyeEndringer)) {
          return prev;
        }
        return nyeEndringer;
      });
    };

    beregnOgOppdater();
    const subscription = watch(beregnOgOppdater);
    return () => subscription.unsubscribe();
  }, [treff, watch, getValues, innleggHtmlFraBackend]);

  const tittelKiSjekket = watch('tittelKiSjekket') ?? false;
  const innleggKiSjekket = watch('innleggKiSjekket') ?? false;
  const tittelKiFeil = watch('tittelKiFeil') ?? false;
  const innleggKiFeil = watch('innleggKiFeil') ?? false;

  const harKiFeil = tittelKiFeil || innleggKiFeil;
  const harAndreSkjemafeil = Boolean(
    formState.errors &&
      Object.keys(formState.errors).some((key) => key !== 'root'),
  );
  const harFeil = harKiFeil || harAndreSkjemafeil;

  const manglerNavn = treff?.tittel?.trim() === 'Treff uten navn';
  const kreverTittelSjekk = endringer.some((e) => e.etikett === 'Tittel');
  const kreverInnleggSjekk = endringer.some((e) => e.etikett === 'Innlegg');

  const isDisabled = useMemo(() => {
    const manglerEndring = endringer.length === 0;
    const kiSjekkOk =
      (!kreverTittelSjekk || tittelKiSjekket) &&
      (!kreverInnleggSjekk || innleggKiSjekket);

    return disabled || manglerEndring || harFeil || !kiSjekkOk || manglerNavn;
  }, [
    disabled,
    endringer.length,
    harFeil,
    kreverTittelSjekk,
    kreverInnleggSjekk,
    tittelKiSjekket,
    innleggKiSjekket,
    manglerNavn,
  ]);

  const åpneModal = () => !isDisabled && modalRef.current?.showModal();
  const lukkModal = () => modalRef.current?.close();

  const handleBekreft = async () => {
    if (isDisabled) return;
    lukkModal();
    await onBekreft();
  };

  return (
    <>
      <Button
        type='button'
        variant='primary'
        size='small'
        disabled={isDisabled}
        onClick={åpneModal}
      >
        Publiser på nytt
      </Button>

      <Modal
        ref={modalRef}
        header={{ heading: 'Følgende endringer vil bli publisert' }}
      >
        <Modal.Body>
          <div className='space-y-3'>
            {endringer.length === 0 ? (
              <BodyLong>Ingen endringer oppdaget.</BodyLong>
            ) : (
              <div className='space-y-3'>
                {endringer.map((endring, idx) => (
                  <div key={idx} className='border-b pb-2'>
                    <Label size='small'>{endring.etikett}</Label>
                    <div className='flex gap-2'>
                      <BodyShort>Fra:</BodyShort>
                      <BodyShort className='text-gray-400'>
                        {endring.gammelVerdi || '—'}
                      </BodyShort>
                    </div>
                    <div className='flex gap-2'>
                      <BodyShort>Til:</BodyShort>
                      <BodyShort className='text-gray-400'>
                        {endring.nyVerdi || '—'}
                      </BodyShort>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <BodyShort className='text-gray-600'>
              Inviterte deltakere vil ikke bli informert om endringene på nytt
              av republiseringen
            </BodyShort>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='primary'
            size='small'
            disabled={isDisabled}
            onClick={handleBekreft}
          >
            Publiser på nytt
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='small'
            onClick={lukkModal}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RepubliserRekrutteringstreffButton;
