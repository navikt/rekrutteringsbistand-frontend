'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import InnleggForm from './redigereRekrutteringstreff/InnleggForm';
import PraktiskeForhold from './redigereRekrutteringstreff/Praktiskeforhold';
import TittelForm from './redigereRekrutteringstreff/TittelForm';
import {
  toIso as toIsoUtil,
  formatIso as formatIsoUtil,
} from './redigereRekrutteringstreff/tidspunkt/utils';
import {
  useAutosave,
  useInnleggAutosave,
} from './redigereRekrutteringstreff/useAutosave';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import LeggTilArbeidsgiverForm from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/_ui/LeggTilArbeidsgiverForm';
import { erRekrutteringstreffPublisert } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import {
  Button,
  Modal,
  BodyLong,
  BodyShort,
  Label,
  Alert,
  Heading,
  Box,
} from '@navikt/ds-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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

interface RekrutteringstreffRedigeringProps {
  onUpdated?: () => void;
  onGåTilForhåndsvisning?: () => void;
}

const RekrutteringstreffRedigering: FC<RekrutteringstreffRedigeringProps> = ({
  onUpdated,
  onGåTilForhåndsvisning,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const innleggHook = useInnlegg(rekrutteringstreffId);
  const { save } = useAutosave();
  const { save: saveInnlegg } = useInnleggAutosave();
  const { getValues, watch } = useFormContext();

  const tittelKiFeil = (watch('tittelKiFeil' as any) as any) ?? false;
  const innleggKiFeil = (watch('innleggKiFeil' as any) as any) ?? false;
  const tittelKiSjekket = (watch('tittelKiSjekket' as any) as any) ?? false;
  const innleggKiSjekket = (watch('innleggKiSjekket' as any) as any) ?? false;
  const anyKiFeil = !!tittelKiFeil || !!innleggKiFeil;

  const harPublisert = erRekrutteringstreffPublisert(
    rekrutteringstreffHook.data?.hendelser,
  );

  const [endringer, setEndringer] = useState<
    { etikett: string; gammelVerdi: string; nyVerdi: string }[]
  >([]);
  const bekreftModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
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

  const erLikEndringsliste = (
    a: { etikett: string; gammelVerdi: string; nyVerdi: string }[],
    b: { etikett: string; gammelVerdi: string; nyVerdi: string }[],
  ) => JSON.stringify(a) === JSON.stringify(b);

  const kreverTittelSjekk = endringer.some((e) => e.etikett === 'Tittel');
  const kreverInnleggSjekk = endringer.some((e) => e.etikett === 'Innlegg');
  const kanPublisereNå =
    endringer.length > 0 &&
    !anyKiFeil &&
    (!kreverTittelSjekk || tittelKiSjekket) &&
    (!kreverInnleggSjekk || innleggKiSjekket);

  const åpneBekreftelse = () => {
    if (!kanPublisereNå) return;
    bekreftModalRef.current?.showModal();
  };

  return (
    <div className='space-y-8 max-w-[64rem] mx-auto'>
      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <TittelForm onUpdated={håndterOppdatert} />
      </Box.New>

      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <PraktiskeForhold />
      </Box.New>

      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
        className='space-y-4'
      >
        <Heading level='2' size='medium'>
          Introduksjon
        </Heading>
        <InnleggForm onUpdated={håndterOppdatert} />
      </Box.New>

      {!harPublisert && (
        <Box.New
          background='neutral-soft'
          borderColor='neutral-subtle'
          borderRadius='xlarge'
          borderWidth='1'
          padding='6'
          className='space-y-4'
        >
          <Heading level='2' size='medium'>
            Arbeidsgivere
          </Heading>
          <LeggTilArbeidsgiverForm variant='inline' />
        </Box.New>
      )}

      <div>
        {harPublisert ? (
          <div className='flex gap-2'>
            <Button
              type='button'
              variant='primary'
              size='small'
              disabled={!kanPublisereNå}
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
              disabled={!kanPublisereNå}
              onClick={async () => {
                if (!kanPublisereNå) return;
                bekreftModalRef.current?.close();
                await save(undefined, true);
                const values: any = getValues();
                const currentHtml: string = (values?.htmlContent ??
                  '') as string;
                const backendHtml: string = (innleggHook.data?.[0]
                  ?.htmlContent ?? '') as string;
                const shouldSaveInnlegg =
                  (currentHtml ?? '').trim() !== (backendHtml ?? '').trim() &&
                  (currentHtml ?? '').trim().length > 0;
                if (shouldSaveInnlegg) {
                  await saveInnlegg(undefined, true);
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
