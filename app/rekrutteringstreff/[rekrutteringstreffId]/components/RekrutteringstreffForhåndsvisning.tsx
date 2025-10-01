'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import {
  ClockIcon,
  LocationPinIcon,
  XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Detail,
  Heading,
  Skeleton,
} from '@navikt/ds-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { nb } from 'date-fns/locale';
import { FC } from 'react';

const capitalizeFirst = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatWeekdayDate = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    const formatted = format(date, 'EEEE d. MMMM yyyy', { locale: nb });
    return formatted;
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

const RekrutteringstreffForhåndsvisning: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreff, isLoading: isLoadingTreff } =
    useRekrutteringstreff(rekrutteringstreffId);
  const { data: innleggListe, isLoading: isLoadingInnlegg } =
    useInnlegg(rekrutteringstreffId);
  const { data: arbeidsgivere, isLoading: isLoadingArbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];

  if (isLoadingTreff || isLoadingInnlegg || isLoadingArbeidsgivere) {
    return (
      <div
        className='bg-white text-black min-h-screen p-8 space-y-6'
        data-theme='light'
      >
        <Skeleton variant='text' width='60%' height={32} />
        <div className='space-y-4'>
          <Skeleton variant='text' width='100%' height={20} />
          <Skeleton variant='text' width='100%' height={20} />
          <Skeleton variant='text' width='80%' height={20} />
        </div>
      </div>
    );
  }

  if (!rekrutteringstreff) {
    return (
      <div className='bg-white text-black min-h-screen p-8' data-theme='light'>
        <div className='text-center py-8'>
          <BodyShort>Kunne ikke laste rekrutteringstreff</BodyShort>
        </div>
      </div>
    );
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
      return `${fraDato} kl ${fraTid} til ${tilTid}`;
    } else {
      const tilDatoRaw = formatWeekdayDate(rekrutteringstreff.tilTid);
      const tilDato = tilDatoRaw ? capitalizeFirst(tilDatoRaw) : null;
      return `${fraDato} kl ${fraTid} til ${tilDato} kl ${tilTid}`;
    }
  };

  const svarfristFormatert = rekrutteringstreff.svarfrist
    ? capitalizeFirst(
        `${formatWeekdayDate(rekrutteringstreff.svarfrist)} kl ${formatTime(rekrutteringstreff.svarfrist)}`,
      )
    : null;

  return (
    <div className='bg-white text-black min-h-screen' data-theme='light'>
      <div className='max-w-7xl mx-auto p-2 space-y-6'>
        {/* Three column layout */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 pt-4'>
          {/* Left column - Header, Info, Siste aktivitet */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Header with title */}
            <div>
              <Heading level='1' size='large' className='text-gray-900'>
                {rekrutteringstreff.tittel}
              </Heading>
            </div>

            {/* Time and Location info */}
            <div className='space-y-3'>
              {/* Time */}
              {(initialFra || initialTil) && (
                <div className='flex items-start gap-3'>
                  <ClockIcon
                    aria-hidden
                    fontSize='1.5rem'
                    className='text-gray-700 flex-shrink-0'
                  />
                  <div>
                    <Detail className='text-gray-600 mb-0.5'>Om 6 dager</Detail>
                    <BodyShort className='text-gray-900'>
                      {formatTimeRange()}
                    </BodyShort>
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
                    className='text-gray-700 flex-shrink-0'
                  />
                  <div>
                    {rekrutteringstreff.gateadresse && (
                      <BodyShort className='text-gray-900'>
                        {rekrutteringstreff.gateadresse}
                      </BodyShort>
                    )}
                    {(rekrutteringstreff.postnummer ||
                      rekrutteringstreff.poststed) && (
                      <BodyShort className='text-gray-900'>
                        {rekrutteringstreff.postnummer}{' '}
                        {rekrutteringstreff.poststed}
                      </BodyShort>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className='space-y-4'>
              <Heading
                level='2'
                size='medium'
                className='text-gray-900 font-semibold'
              >
                Siste aktivitet
              </Heading>

              {/* Om treffet */}
              <div className='bg-gray-100 p-6 rounded-lg space-y-3'>
                <Heading
                  level='3'
                  size='small'
                  className='text-gray-900 font-semibold'
                >
                  Om treffet
                </Heading>

                {innlegg?.htmlContent && (
                  <div
                    className='prose prose-sm max-w-none text-gray-800'
                    dangerouslySetInnerHTML={{ __html: innlegg.htmlContent }}
                  />
                )}

                <div className='space-y-1 pt-2'>
                  <BodyShort className='text-gray-800'>
                    Treff arbeidsgiverne
                  </BodyShort>
                  <BodyShort className='text-gray-800'>
                    Hør om mulighetene
                  </BodyShort>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Svar and Arbeidsgivere */}
          <div className='lg:col-span-2 space-y-6'>
            {/* User response box */}
            <div className='space-y-4'>
              <div className='bg-white border border-gray-300 p-4 rounded-lg space-y-4'>
                <div className='flex items-start gap-3'>
                  <XMarkOctagonFillIcon
                    aria-hidden
                    fontSize='1.5rem'
                    className='text-red-500 flex-shrink-0'
                  />
                  <Heading
                    level='2'
                    size='medium'
                    className='text-gray-900 font-semibold'
                  >
                    (svar)
                  </Heading>
                </div>

                <div className='flex items-center justify-between'>
                  <BodyShort className='text-gray-700'>
                    Du kan endre svaret ditt frem til {svarfristFormatert}
                  </BodyShort>
                  <Button variant='secondary' size='small'>
                    (svarvelger)
                  </Button>
                </div>
              </div>
            </div>

            {/* Arbeidsgivere */}
            {arbeidsgivere && arbeidsgivere.length > 0 && (
              <div className='space-y-4'>
                <Heading
                  level='2'
                  size='medium'
                  className='text-gray-900 font-semibold'
                >
                  Arbeidsgivere
                </Heading>
                <div className='space-y-3'>
                  {arbeidsgivere.map((arbeidsgiver, index) => (
                    <div
                      key={arbeidsgiver.organisasjonsnummer || index}
                      className='bg-gray-100 p-5 rounded-lg'
                    >
                      <Heading
                        level='3'
                        size='small'
                        className='text-gray-900 font-semibold mb-1'
                      >
                        {arbeidsgiver.navn}
                      </Heading>
                      <BodyShort className='text-gray-700'>
                        Org.nr: {arbeidsgiver.organisasjonsnummer}
                      </BodyShort>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekrutteringstreffForhåndsvisning;
