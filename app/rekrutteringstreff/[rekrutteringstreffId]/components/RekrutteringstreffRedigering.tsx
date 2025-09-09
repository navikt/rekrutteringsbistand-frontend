'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import EndreTittel from './redigereRekrutteringstreff/EndreTittel';
import PraktiskeForhold from './redigereRekrutteringstreff/Praktiskeforhold';
import {
  toIso as toIsoUtil,
  formatIso as formatIsoUtil,
  formaterKlokkeslett,
} from './redigereRekrutteringstreff/tidspunkt/utils';
import { useAutosave } from './redigereRekrutteringstreff/useAutosave';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import {
  oppdaterEttInnlegg,
  opprettInnleggForTreff,
  OpprettEllerOppdaterInnleggDto,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { RekbisError } from '@/util/rekbisError';
import {
  Button,
  Modal,
  BodyLong,
  BodyShort,
  Label,
  Alert,
} from '@navikt/ds-react';
import { formatInTimeZone } from 'date-fns-tz';
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
  const innleggHook = useInnlegg(rekrutteringstreffId);
  const { save } = useAutosave();
  const { getValues, watch } = useFormContext();

  const tittelKiFeil = (watch('tittelKiFeil' as any) as any) ?? false;
  const innleggKiFeil = (watch('innleggKiFeil' as any) as any) ?? false;
  const anyKiFeil = !!tittelKiFeil || !!innleggKiFeil;

  const harPublisert =
    rekrutteringstreffHook.data?.hendelser?.some(
      (h) => h.hendelsestype === 'PUBLISER',
    ) ?? false;

  const [endringer, setEndringer] = React.useState<
    { etikett: string; gammelVerdi: string; nyVerdi: string }[]
  >([]);
  const bekreftModalRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const treff = rekrutteringstreffHook.data as any;
    if (!treff) {
      setEndringer([]);
      return;
    }

    const calc = () => {
      const verdier = getValues() as any;
      const innleggHtml = (innleggHook.data?.[0]?.htmlContent ?? '') as string;
      const elementer = beregnEndringer(verdier, treff, innleggHtml);
      setEndringer((prev) =>
        erLikEndringsliste(prev, elementer) ? prev : elementer,
      );
    };

    calc();
    const subscription = watch(() => calc());
    return () => subscription.unsubscribe();
  }, [rekrutteringstreffHook.data, watch, getValues, innleggHook.data]);

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

  const formatIso = (iso: string | null | undefined) =>
    iso ? formatIsoUtil(iso) : '';

  const erLikEndringsliste = (
    a: { etikett: string; gammelVerdi: string; nyVerdi: string }[],
    b: { etikett: string; gammelVerdi: string; nyVerdi: string }[],
  ) => JSON.stringify(a) === JSON.stringify(b);

  const beregnEndringer = (
    verdier: any,
    treff: any,
    innleggHtmlFraBackend: string,
  ) => {
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

  const åpneBekreftelse = () => bekreftModalRef.current?.showModal();

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
              disabled={endringer.length === 0 || anyKiFeil}
              onClick={åpneBekreftelse}
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
              disabled={endringer.length === 0 || anyKiFeil}
              onClick={async () => {
                bekreftModalRef.current?.close();
                await save(undefined, true);
                try {
                  const values: any = getValues();
                  const currentHtml: string = (values?.htmlContent ??
                    '') as string;
                  const backendHtml: string = (innleggHook.data?.[0]
                    ?.htmlContent ?? '') as string;
                  const shouldSaveInnlegg =
                    (currentHtml ?? '').trim() !== (backendHtml ?? '').trim();
                  if (
                    shouldSaveInnlegg &&
                    (currentHtml ?? '').trim().length > 0
                  ) {
                    const eksisterendeInnlegg = innleggHook.data?.[0];
                    const navnForPayload =
                      eksisterendeInnlegg?.opprettetAvPersonNavn ||
                      (eksisterendeInnlegg as any)?.opprettetAvPersonNavident ||
                      'Markedskontakt';

                    const payload: OpprettEllerOppdaterInnleggDto = {
                      htmlContent: currentHtml,
                      tittel: 'Om treffet',
                      opprettetAvPersonNavn: navnForPayload,
                      opprettetAvPersonBeskrivelse: 'Markedskontakt',
                      sendesTilJobbsokerTidspunkt: formatInTimeZone(
                        new Date(),
                        'Europe/Oslo',
                        "yyyy-MM-dd'T'HH:mm:ssXXX",
                      ),
                    };

                    const eksisterende = innleggHook.data?.[0];
                    if (eksisterende?.id) {
                      await oppdaterEttInnlegg(
                        rekrutteringstreffId,
                        eksisterende.id,
                        payload,
                      );
                    } else {
                      await opprettInnleggForTreff(
                        rekrutteringstreffId,
                        payload,
                      );
                    }
                    await innleggHook.mutate();
                  }
                } catch (e) {
                  new RekbisError({
                    message: 'Lagring av innlegg feilet.',
                    error: e,
                  });
                }
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
