'use client';

import {
  toIso as toIsoUtil,
  formatIso as formatIsoUtil,
} from '../../components/redigereRekrutteringstreff/tidspunkt/utils';
import { BodyLong, BodyShort, Button, Label, Modal } from '@navikt/ds-react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export type Endring = {
  etikett: string;
  gammelVerdi: string;
  nyVerdi: string;
};

const toIsoLocal = (
  date: Date | null | undefined,
  time?: string | null,
): string | null => {
  if (!date) return null;
  const timeValue = time && time.trim() !== '' ? time : '00:00';
  return toIsoUtil(date, timeValue);
};

const formatIsoLocal = (iso: string | null | undefined) =>
  iso ? formatIsoUtil(iso) : '';

interface Props {
  disabled?: boolean;
  treff: any;
  innleggHtmlFraBackend?: string | null;
  onBekreft: () => Promise<void> | void;
}

const beregnEndringer = (
  verdier: any,
  treff: any,
  innleggHtmlFraBackend: string,
) => {
  const fraTid =
    toIsoLocal(verdier.fraDato ?? null, verdier.fraTid) ??
    treff?.fraTid ??
    null;
  const tilTid =
    toIsoLocal(verdier.tilDato ?? verdier.fraDato ?? null, verdier.tilTid) ??
    treff?.tilTid ??
    null;
  const svarfrist =
    toIsoLocal(verdier.svarfristDato ?? null, verdier.svarfristTid) ??
    treff?.svarfrist ??
    null;

  const sikkerTittel =
    typeof verdier.tittel === 'string' && verdier.tittel.trim().length > 0
      ? verdier.tittel
      : (treff?.tittel ?? '');

  const nesteDto = {
    tittel: sikkerTittel,
    beskrivelse: (verdier.beskrivelse ?? treff?.beskrivelse ?? null) as
      | string
      | null,
    fraTid,
    tilTid,
    svarfrist,
    gateadresse: (verdier.gateadresse ?? treff?.gateadresse ?? null) as
      | string
      | null,
    postnummer: (verdier.postnummer ?? treff?.postnummer ?? null) as
      | string
      | null,
    poststed: (verdier.poststed ?? treff?.poststed ?? null) as string | null,
  };

  const elementer: Endring[] = [];

  const leggTilIEndringslisteHvisEndret = (
    etikett: string,
    gammelVerdi: string | null,
    nyVerdi: string | null,
    formatter?: (val: string | null) => string,
  ) => {
    const fmt = (x: string | null) => (formatter ? formatter(x) : (x ?? ''));
    const o = fmt(gammelVerdi);
    const n = fmt(nyVerdi);
    if (o !== n) elementer.push({ etikett, gammelVerdi: o, nyVerdi: n });
  };

  leggTilIEndringslisteHvisEndret(
    'Tittel',
    treff?.tittel ?? '',
    nesteDto.tittel ?? '',
  );
  leggTilIEndringslisteHvisEndret(
    'Beskrivelse',
    treff?.beskrivelse,
    nesteDto.beskrivelse,
  );
  leggTilIEndringslisteHvisEndret('Fra', treff?.fraTid, nesteDto.fraTid, (v) =>
    formatIsoLocal(v),
  );
  leggTilIEndringslisteHvisEndret('Til', treff?.tilTid, nesteDto.tilTid, (v) =>
    formatIsoLocal(v),
  );
  leggTilIEndringslisteHvisEndret(
    'Svarfrist',
    treff?.svarfrist,
    nesteDto.svarfrist,
    (v) => formatIsoLocal(v),
  );
  leggTilIEndringslisteHvisEndret(
    'Gateadresse',
    treff?.gateadresse,
    nesteDto.gateadresse,
  );
  leggTilIEndringslisteHvisEndret(
    'Postnummer',
    treff?.postnummer,
    nesteDto.postnummer,
  );
  leggTilIEndringslisteHvisEndret(
    'Poststed',
    treff?.poststed,
    nesteDto.poststed,
  );

  const currentInnleggHtml = (verdier.htmlContent ?? '') as string;
  if ((innleggHtmlFraBackend ?? '') !== (currentInnleggHtml ?? '')) {
    elementer.push({
      etikett: 'Innlegg',
      gammelVerdi: 'Innhold endret',
      nyVerdi: 'Innhold endret',
    });
  }

  return elementer;
};

const erLikEndringsliste = (a: Endring[], b: Endring[]) =>
  JSON.stringify(a) === JSON.stringify(b);

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

    const calc = () => {
      const verdier = getValues() as any;
      const elementer = beregnEndringer(
        verdier,
        treff,
        (innleggHtmlFraBackend ?? '') as string,
      );
      setEndringer((prev) =>
        erLikEndringsliste(prev, elementer) ? prev : elementer,
      );
    };

    calc();
    const subscription = watch(() => calc());
    return () => subscription.unsubscribe();
  }, [treff, watch, getValues, innleggHtmlFraBackend]);

  const tittelKiSjekket = (watch('tittelKiSjekket' as any) as any) ?? false;
  const innleggKiSjekket = (watch('innleggKiSjekket' as any) as any) ?? false;
  const anyKiFeil =
    ((watch('tittelKiFeil' as any) as any) ?? false) ||
    ((watch('innleggKiFeil' as any) as any) ?? false);
  const harAndreSkjemafeil = Boolean(
    formState.errors &&
      Object.keys(formState.errors).some((key) => key !== 'root'),
  );
  const harFeil = anyKiFeil || harAndreSkjemafeil;

  const DEFAULT_TITTEL = 'Treff uten navn';
  const lagretTittel = treff?.tittel ?? '';
  const manglerNavn =
    typeof lagretTittel === 'string' && lagretTittel.trim() === DEFAULT_TITTEL;

  const kreverTittelSjekk = endringer.some((e) => e.etikett === 'Tittel');
  const kreverInnleggSjekk = endringer.some((e) => e.etikett === 'Innlegg');

  const isDisabled = useMemo(() => {
    const manglerEndring = (endringer?.length ?? 0) === 0;
    const kiSjekkOk =
      (!kreverTittelSjekk || tittelKiSjekket) &&
      (!kreverInnleggSjekk || innleggKiSjekket);
    return (
      Boolean(disabled) ||
      manglerEndring ||
      harFeil ||
      !kiSjekkOk ||
      manglerNavn
    );
  }, [
    disabled,
    endringer,
    harFeil,
    kreverTittelSjekk,
    kreverInnleggSjekk,
    tittelKiSjekket,
    innleggKiSjekket,
    manglerNavn,
  ]);

  const åpne = () => {
    if (!isDisabled) modalRef.current?.showModal();
  };
  const lukk = () => modalRef.current?.close();

  return (
    <>
      <Button
        type='button'
        variant='primary'
        size='small'
        disabled={isDisabled}
        onClick={åpne}
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
                {endringer.map((c, idx) => (
                  <div key={idx} className='border-b pb-2'>
                    <Label size='small'>{c.etikett}</Label>
                    <div className='flex gap-2'>
                      <BodyShort>Fra:</BodyShort>
                      <BodyShort className='text-gray-400'>
                        {c.gammelVerdi || '—'}
                      </BodyShort>
                    </div>
                    <div className='flex gap-2'>
                      <BodyShort>Til:</BodyShort>
                      <BodyShort className='text-gray-400'>
                        {c.nyVerdi || '—'}
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
            onClick={async () => {
              if (isDisabled) return;
              lukk();
              await onBekreft();
            }}
          >
            Publiser på nytt
          </Button>
          <Button type='button' variant='secondary' size='small' onClick={lukk}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RepubliserRekrutteringstreffButton;
