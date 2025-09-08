'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import EndreTittel from './redigereRekrutteringstreff/EndreTittel';
import PraktiskeForhold from './redigereRekrutteringstreff/Praktiskeforhold';
import {
  toIso as toIsoUtil,
  formatIso as formatIsoUtil,
} from './redigereRekrutteringstreff/tidspunkt/utils';
import { useAutosave } from './redigereRekrutteringstreff/useAutosave';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import {
  Button,
  Modal,
  BodyLong,
  BodyShort,
  Label,
  Detail,
  Alert,
} from '@navikt/ds-react';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface RekrutteringstreffRedigeringProps {
  onUpdated?: () => void;
  onGåTilForhåndsvisning?: () => void;
}

const RekrutteringstreffRedigering: React.FC<
  RekrutteringstreffRedigeringProps
> = ({ onUpdated, onGåTilForhåndsvisning }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const { save } = useAutosave();
  const { getValues } = useFormContext();

  const harPublisert =
    rekrutteringstreffHook.data?.hendelser?.some(
      (h) => h.hendelsestype === 'PUBLISER',
    ) ?? false;

  const [endringer, setEndringer] = React.useState<
    { etikett: string; gammelVerdi: string; nyVerdi: string }[]
  >([]);
  const bekreftModalRef = React.useRef<HTMLDialogElement>(null);

  const håndterOppdatert = () => {
    rekrutteringstreffHook.mutate();
    onUpdated?.();
  };

  const toIso = (
    date: Date | null | undefined,
    time?: string | null,
  ): string | null => {
    if (!date) return null;
    const timeValue = time && time.trim() !== '' ? time : '00:00';
    return toIsoUtil(date, timeValue);
  };

  const formatIso = (iso: string | null | undefined) => {
    return iso ? formatIsoUtil(iso) : '';
  };

  const åpneBekreftelse = () => {
    const verdier = getValues() as any;
    const treff = rekrutteringstreffHook.data as any;
    if (!treff) return;

    const fraTid =
      toIso(verdier.fraDato ?? null, verdier.fraTid) ?? treff?.fraTid ?? null;
    const tilTid =
      toIso(verdier.tilDato ?? verdier.fraDato ?? null, verdier.tilTid) ??
      treff?.tilTid ??
      null;
    const svarfrist =
      toIso(verdier.svarfristDato ?? null, verdier.svarfristTid) ??
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

    const elementer: {
      etikett: string;
      gammelVerdi: string;
      nyVerdi: string;
    }[] = [];

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
    leggTilIEndringslisteHvisEndret(
      'Fra',
      treff?.fraTid,
      nesteDto.fraTid,
      (v) => formatIso(v),
    );
    leggTilIEndringslisteHvisEndret(
      'Til',
      treff?.tilTid,
      nesteDto.tilTid,
      (v) => formatIso(v),
    );
    leggTilIEndringslisteHvisEndret(
      'Svarfrist',
      treff?.svarfrist,
      nesteDto.svarfrist,
      (v) => formatIso(v),
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

    setEndringer(elementer);
    bekreftModalRef.current?.showModal();
  };

  return (
    <div className='space-y-8'>
      <EndreTittel onUpdated={håndterOppdatert} />
      <PraktiskeForhold />
      <div>
        {harPublisert ? (
          <div className='flex gap-2'>
            <Button
              type='button'
              variant='primary'
              size='small'
              onClick={() => {
                // Vis oppsummering av endringer før vi lagrer
                åpneBekreftelse();
              }}
            >
              Publiser på nytt
            </Button>
            <Button
              type='button'
              variant='secondary'
              size='small'
              onClick={() => onGåTilForhåndsvisning?.()}
            >
              Avbryt
            </Button>
          </div>
        ) : (
          <Button
            type='button'
            variant='primary'
            size='small'
            onClick={() => onGåTilForhåndsvisning?.()}
          >
            Ferdig – gå til forhåndsvisning
          </Button>
        )}
      </div>
      {/* Fast ekstra plass under for å sikre at datovelger (popup) alltid har god plass uansett skjermstørrelse */}
      <div aria-hidden className='h-80' />

      {harPublisert && (
        <Modal
          ref={bekreftModalRef}
          header={{ heading: 'Følgende endringer vil bli publisert' }}
        >
          <Modal.Body>
            <Alert variant='info' className='mb-4'>
              Inviterte deltakere vil ikke bli informert om endringene på nytt
              av republiseringen
            </Alert>
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='button'
              variant='primary'
              size='small'
              disabled={endringer.length === 0}
              onClick={async () => {
                bekreftModalRef.current?.close();
                await save(undefined, true);
                onGåTilForhåndsvisning?.();
              }}
            >
              Publiser på nytt
            </Button>
            <Button
              type='button'
              variant='secondary'
              size='small'
              onClick={() => bekreftModalRef.current?.close()}
            >
              Avbryt
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default RekrutteringstreffRedigering;
