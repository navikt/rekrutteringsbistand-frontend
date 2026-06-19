'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { OppdaterRekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { antallDagerTilDato } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import SWRLaster from '@/components/SWRLaster';
import RikTekstEditorPreview from '@/components/rikteksteditor/RikTekstEditorPreview';
import {
  ClockIcon,
  InformationSquareIcon,
  LocationPinIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Heading,
  InfoCard,
  Skeleton,
  Tag,
} from '@navikt/ds-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { nb } from 'date-fns/locale';
import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

type FormValues = OppdaterRekrutteringstreffDTO & {
  fraDato?: Date | null;
  tilDato?: Date | null;
  svarfristDato?: Date | null;
  svarfristTid?: string | null;
  htmlContent?: string | null;
};

type ForhåndsvisningData = {
  tittel?: string | null;
  gateadresse?: string | null;
  postnummer?: string | null;
  poststed?: string | null;
  fraTid?: string;
  tilTid?: string;
  svarfrist?: string;
};

const capitalizeFirst = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatWeekdayDate = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE d. MMMM yyyy', { locale: nb });
  } catch {
    return null;
  }
};

const formatTime = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return format(date, 'HH:mm', { locale: nb });
  } catch {
    return null;
  }
};

const formaterKlokkeslett = (date: Date) => {
  return format(date, 'HH:mm');
};

const combineDateTime = (date?: Date | null, time?: string | null) => {
  if (!date || !time) return undefined;
  try {
    const [hh, mm] = time.split(':').map((s) => parseInt(s, 10));
    const d = new Date(date);
    d.setHours(hh || 0, mm || 0, 0, 0);
    return d.toISOString();
  } catch {
    return undefined;
  }
};

const RekrutteringstreffForhåndsvisning: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  // useFormContext returnerer null når komponenten brukes utenfor en FormProvider
  // Faller tilbake på server-data fra useRekrutteringstreffData dersom form er null
  const form = useFormContext<FormValues>();
  const watched = form?.watch?.() as Partial<FormValues> | undefined;
  const harForm = Boolean(form);

  const { treff, innleggHtmlFraBackend } = useRekrutteringstreffData();

  const rekrutteringstreff = useMemo<ForhåndsvisningData | null>(() => {
    if (harForm && watched) {
      return {
        tittel: watched.tittel,
        gateadresse: watched.gateadresse,
        postnummer: watched.postnummer,
        poststed: watched.poststed,
        fraTid: combineDateTime(
          watched.fraDato as Date | null | undefined,
          watched.fraTid as string | null | undefined,
        ),
        tilTid: combineDateTime(
          watched.tilDato as Date | null | undefined,
          watched.tilTid as string | null | undefined,
        ),
        svarfrist: combineDateTime(
          watched.svarfristDato as Date | null | undefined,
          watched.svarfristTid as string | null | undefined,
        ),
      };
    }

    if (treff) {
      return {
        tittel: treff.tittel,
        gateadresse: treff.gateadresse,
        postnummer: treff.postnummer,
        poststed: treff.poststed,
        fraTid: treff.fraTid ?? undefined,
        tilTid: treff.tilTid ?? undefined,
        svarfrist: treff.svarfrist ?? undefined,
      };
    }

    return null;
  }, [harForm, watched, treff]);

  const htmlContent =
    (harForm ? watched?.htmlContent : null) ?? innleggHtmlFraBackend ?? null;
  const innlegg = useMemo(() => {
    if (!htmlContent) return null;
    return { htmlContent };
  }, [htmlContent]);

  if (!rekrutteringstreff) {
    return <ManglendeTreffFeilmelding />;
  }

  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  const formatTimeRange = () => {
    if (!initialFra || !initialTil) return null;

    const fraDatoRaw = formatWeekdayDate(rekrutteringstreff.fraTid);
    const fraDato = fraDatoRaw ? capitalizeFirst(fraDatoRaw) : null;
    const fraTid = formaterKlokkeslett(initialFra);
    const tilTid = formaterKlokkeslett(initialTil);

    if (isSameDay(initialFra, initialTil)) {
      return `${fraDato} kl. ${fraTid}–${tilTid}`;
    } else {
      const tilDatoRaw = formatWeekdayDate(rekrutteringstreff.tilTid);
      const tilDato = tilDatoRaw ? capitalizeFirst(tilDatoRaw) : null;
      return `fra ${fraDato} kl. ${fraTid} til ${tilDato} kl. ${tilTid}`;
    }
  };

  const svarfristFormatert = rekrutteringstreff.svarfrist
    ? capitalizeFirst(
        `${formatWeekdayDate(rekrutteringstreff.svarfrist)} kl. ${formatTime(rekrutteringstreff.svarfrist)}`,
      )
    : null;

  // Beregn dager igjen til svarfrist
  const svarfristOslo = rekrutteringstreff.svarfrist
    ? toZonedTime(parseISO(rekrutteringstreff.svarfrist), 'Europe/Oslo')
    : null;
  const nowOslo = toZonedTime(new Date(), 'Europe/Oslo');
  let dagerIgjenTekst: string | null = null;
  if (svarfristOslo) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffMs = svarfristOslo.getTime() - nowOslo.getTime();
    const dager = Math.floor(diffMs / msPerDay);
    if (dager < 0) {
      dagerIgjenTekst = 'Utløpt';
    } else if (dager === 0) {
      dagerIgjenTekst = 'Utløper i dag';
    } else if (dager === 1) {
      dagerIgjenTekst = 'Utløper om 1 dag';
    } else {
      dagerIgjenTekst = `Utløper om ${dager} dager`;
    }
  }

  const dagerTilDato = antallDagerTilDato(rekrutteringstreff.fraTid);
  const dagerTilDatoTekst = () => {
    if (dagerTilDato === '1' || dagerTilDato === '0') {
      return <span>Mindre enn 2 dager til</span>;
    }
    return <span>Om {dagerTilDato} dager</span>;
  };

  return (
    <SWRLaster
      hooks={[arbeidsgivereHook]}
      skeleton={
        <div className='min-h-screen space-y-6 p-8' data-theme='light'>
          <Skeleton variant='text' width='60%' height={32} />
          <div className='space-y-4'>
            <Skeleton variant='text' width='100%' height={20} />
            <Skeleton variant='text' width='100%' height={20} />
            <Skeleton variant='text' width='80%' height={20} />
          </div>
        </div>
      }
    >
      {(arbeidsgivere) => (
        <div className='@container'>
          <InfoCard
            data-color='info'
            className={'mx-auto mb-6 max-w-7xl'}
            data-theme='light'
          >
            <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
              <InfoCard.Title>
                Forhåndsvisning av invitasjonen til jobbsøkere
              </InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
              Dette er en forhåndsvisning av hvordan invitasjonen vil se ut for
              jobbsøkere.
            </InfoCard.Content>
          </InfoCard>
          <div
            className='mx-auto flex min-h-screen max-w-7xl flex-col gap-4 rounded-xl @xl:grid @xl:grid-cols-6'
            data-theme='light'
          >
            <div className='space-y-6 @xl:col-span-4'>
              <Heading level='1' size='large'>
                {rekrutteringstreff.tittel}
              </Heading>

              {/* Time and Location info */}
              <div className='flex flex-col gap-4 @xl:flex-row @xl:gap-16'>
                {/* Time */}
                {(initialFra || initialTil) && (
                  <div className='flex items-start gap-3'>
                    <ClockIcon
                      aria-hidden
                      fontSize='1.5rem'
                      className='shrink-0'
                    />
                    <div>
                      <BodyShort className='mb-0.5 font-bold'>
                        {dagerTilDatoTekst()}
                      </BodyShort>
                      <BodyShort>{formatTimeRange()}</BodyShort>
                    </div>
                  </div>
                )}

                {/* Location */}
                {(rekrutteringstreff.gateadresse ||
                  rekrutteringstreff.postnummer ||
                  rekrutteringstreff.poststed) && (
                  <div className='flex items-start gap-3'>
                    <LocationPinIcon
                      aria-hidden
                      fontSize='1.5rem'
                      className='shrink-0'
                    />
                    <div>
                      {rekrutteringstreff.gateadresse && (
                        <BodyShort className='font-bold'>
                          {rekrutteringstreff.gateadresse}
                        </BodyShort>
                      )}
                      {(rekrutteringstreff.postnummer ||
                        rekrutteringstreff.poststed) && (
                        <BodyShort>
                          {rekrutteringstreff.postnummer}{' '}
                          {rekrutteringstreff.poststed}
                        </BodyShort>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className='space-y-4'>
                <Heading level='2' size='medium' className='font-semibold'>
                  Siste aktivitet
                </Heading>

                {/* Om treffet */}
                <Box
                  className='space-y-3 rounded-lg p-6'
                  background={'neutral-moderate'}
                >
                  <Heading level='3' size='small' className='font-semibold'>
                    Om treffet
                  </Heading>

                  {innlegg?.htmlContent && (
                    <RikTekstEditorPreview htmlContent={innlegg.htmlContent} />
                  )}
                  <Tag data-color={'meta-purple'} variant={'moderate'}>
                    Teksten er sjekket av KI
                  </Tag>
                </Box>
              </div>
            </div>

            {/* Right column - Svar and Arbeidsgivere */}
            <div className='space-y-6 @xl:col-span-2'>
              {/* User response box */}
              <div className='flex items-start justify-between space-y-4 rounded-lg border border-[var(--ax-border-info-subtle,_#99C2FF)] bg-[var(--ax-surface-info-subtle,_#E6F0FF)] p-4'>
                <div className='flex-1'>
                  <BodyShort className='flex items-center gap-2'>
                    <span role='img' aria-label='flammer'>
                      🔥🔥🔥
                    </span>
                  </BodyShort>
                  {dagerIgjenTekst && (
                    <BodyShort className='font-bold'>
                      {dagerIgjenTekst}
                    </BodyShort>
                  )}
                  {dagerIgjenTekst !== 'Utløpt' && (
                    <BodyShort>
                      Du kan endre svaret ditt frem til {svarfristFormatert}
                    </BodyShort>
                  )}
                </div>
                <Button variant='primary' size='medium' className='text-white'>
                  Svar
                </Button>
              </div>

              {/* Arbeidsgivere */}
              {arbeidsgivere && arbeidsgivere.length > 0 && (
                <div className='space-y-4'>
                  <Heading level='2' size='medium' className='font-semibold'>
                    Arbeidsgivere
                  </Heading>
                  <div className='space-y-3'>
                    {arbeidsgivere.map((arbeidsgiver, index) => (
                      <Box
                        key={arbeidsgiver.organisasjonsnummer || index}
                        className='rounded-lg bg-gray-100 p-5'
                        background={'neutral-moderate'}
                      >
                        <Heading
                          level='3'
                          size='small'
                          className='mb-1 font-semibold'
                        >
                          {arbeidsgiver.navn}
                        </Heading>
                        <BodyShort>
                          Org.nr: {arbeidsgiver.organisasjonsnummer}
                        </BodyShort>
                      </Box>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SWRLaster>
  );
};

export default RekrutteringstreffForhåndsvisning;
