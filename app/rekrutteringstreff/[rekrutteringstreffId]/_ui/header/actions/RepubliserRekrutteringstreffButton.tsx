'use client';

import { RekrutteringstreffUtenHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  formatIso,
  toIso,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/tidspunkt/utils';
import { BodyLong, BodyShort, Button, Label, Modal } from '@navikt/ds-react';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Endring = {
  etikett: string;
  gammelVerdi: string;
  nyVerdi: string;
};

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

/**
 * Beregner listen over endringer mellom original og nye verdier.
 */
const beregnEndringer = (
  verdier: any,
  treff: any,
  innleggHtmlFraBackend: string,
): Endring[] => {
  const endringer: Endring[] = [];

  const fraTid =
    toIso(verdier.fraDato, verdier.fraTid?.trim() || '00:00') ?? treff?.fraTid;
  const tilTid =
    toIso(
      verdier.tilDato ?? verdier.fraDato,
      verdier.tilTid?.trim() || '00:00',
    ) ?? treff?.tilTid;
  const svarfrist =
    toIso(verdier.svarfristDato, verdier.svarfristTid?.trim() || '00:00') ??
    treff?.svarfrist;

  const tittel = verdier.tittel?.trim() || treff?.tittel || '';

  leggTilEndringHvisUlik(endringer, 'Tittel', treff?.tittel, tittel);
  leggTilEndringHvisUlik(
    endringer,
    'Beskrivelse',
    treff?.beskrivelse,
    verdier.beskrivelse ?? treff?.beskrivelse,
  );
  leggTilEndringHvisUlik(endringer, 'Fra', treff?.fraTid, fraTid, formatIso);
  leggTilEndringHvisUlik(endringer, 'Til', treff?.tilTid, tilTid, formatIso);
  leggTilEndringHvisUlik(
    endringer,
    'Svarfrist',
    treff?.svarfrist,
    svarfrist,
    formatIso,
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

  if ((innleggHtmlFraBackend || '') !== (verdier.htmlContent || '')) {
    endringer.push({
      etikett: 'Innlegg',
      gammelVerdi: 'Innhold endret',
      nyVerdi: 'Innhold endret',
    });
  }

  return endringer;
};

interface RepubliserRekrutteringstreffButtonProps {
  treff: RekrutteringstreffUtenHendelserDTO | null;
  innleggHtmlFraBackend?: string | null;
}

/**
 * Komponent for å republisere et rekrutteringstreff.
 * Viser en knapp som åpner en modal for bekreftelse av endringer før republisering.
 */
const RepubliserRekrutteringstreffButton: FC<
  RepubliserRekrutteringstreffButtonProps
> = ({ treff, innleggHtmlFraBackend }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { getValues, watch, formState } = useFormContext();
  const [endringer, setEndringer] = useState<Endring[]>([]);
  const [endringerVistIModal, setEndringerVistIModal] = useState<Endring[]>([]);
  const [wasSubmitting, setWasSubmitting] = useState(false);

  console.log('endringer', endringer);

  const lukkModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  useEffect(() => {
    console.log('beregner endringer på nu');

    const beregnOgOppdater = () => {
      const verdier = getValues();
      const nyeEndringer = beregnEndringer(
        verdier,
        treff,
        innleggHtmlFraBackend || '',
      );
      setEndringer(nyeEndringer);
    };

    beregnOgOppdater();

    // Subscribe til ALLE form changes
    const subscription = watch(() => {
      console.log('Form endret, beregner endringer på nytt');
      beregnOgOppdater();
    });

    return () => subscription.unsubscribe();
  }, [treff, watch, getValues, innleggHtmlFraBackend]);

  // Lukk modal automatisk etter vellykket skjemainnsending.
  // Vi sporer isSubmitting overgangen for å oppdage når innsendingen fullføres,
  // så lukker vi modalen kun hvis det ikke er valideringsfeil.
  // Dette mønsteret er nødvendig fordi:
  // 1. Modal er utenfor form-elementet (riktig HTML-struktur)
  // 2. Submit-knappen bruker `form` attributtet (gyldig HTML5 mønster)
  // 3. Forretningslogikk (useRepubliser) er separert fra UI (denne komponenten)
  // 4. Vi unngår prop drilling ved å holde lukkModal lokalt i denne komponenten
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (wasSubmitting && !formState.isSubmitting) {
      if (!formState.errors || Object.keys(formState.errors).length === 0) {
        lukkModal();
      }
      timer = setTimeout(() => {
        setWasSubmitting(false);
      }, 0);
    } else if (formState.isSubmitting && !wasSubmitting) {
      timer = setTimeout(() => {
        setWasSubmitting(true);
      }, 0);
    }
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [formState.isSubmitting, formState.errors, wasSubmitting, lukkModal]);

  const tittelKiSjekket = watch('tittelKiSjekket') ?? false;
  const innleggKiSjekket = watch('htmlContentKiSjekket') ?? false;
  const tittelKiFeil = watch('tittelKiFeil') ?? false;
  const innleggKiFeil = watch('htmlContentKiFeil') ?? false;

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
    console.log(
      'isDisabled beregnes på nytt. Endringer.length:',
      endringer.length,
    );
    const manglerEndring = endringer.length === 0;
    const kiSjekkOk =
      (!kreverTittelSjekk || tittelKiSjekket) &&
      (!kreverInnleggSjekk || innleggKiSjekket);
    console.log('isDisabled beregnes på nytt. kiSjekkOk:', kiSjekkOk);

    return manglerEndring || harFeil || !kiSjekkOk || manglerNavn;
  }, [
    endringer.length,
    harFeil,
    kreverTittelSjekk,
    kreverInnleggSjekk,
    tittelKiSjekket,
    innleggKiSjekket,
    manglerNavn,
  ]);

  const åpneModal = useCallback(() => {
    if (!isDisabled) {
      // Lagre en kopi av gjeldende endringer som skal vises i modalen
      setEndringerVistIModal([...endringer]);
      modalRef.current?.showModal();
    }
  }, [endringer, isDisabled]);

  return (
    <>
      {/* Knapp for å åpne bekreftelsesmodal */}
      <Button
        type='button'
        variant='primary'
        size='small'
        disabled={isDisabled}
        onClick={åpneModal}
      >
        Publiser på nytt
      </Button>

      {/* Modal for bekreftelse av endringer før republisering */}
      <Modal
        ref={modalRef}
        header={{ heading: 'Følgende endringer vil bli publisert' }}
      >
        <Modal.Body>
          <div className='space-y-3'>
            {endringerVistIModal.length === 0 ? (
              <BodyLong>Ingen endringer oppdaget.</BodyLong>
            ) : (
              <div className='space-y-3'>
                {endringerVistIModal.map((endring, idx) => (
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
            type='submit'
            form='rekrutteringstreff-form'
            variant='primary'
            size='small'
            disabled={isDisabled}
            loading={formState.isSubmitting}
          >
            Publiser på nytt
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='small'
            onClick={lukkModal}
            disabled={formState.isSubmitting}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RepubliserRekrutteringstreffButton;
