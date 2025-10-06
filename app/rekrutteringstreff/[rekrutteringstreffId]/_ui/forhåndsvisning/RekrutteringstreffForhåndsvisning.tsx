'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { OppdaterRekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/mutations';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { ClockIcon, LocationPinIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading, Skeleton } from '@navikt/ds-react';
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
  const { data: arbeidsgivere, isLoading: isLoadingArbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  // Hent alle verdier fra form-context - dette er alltid den oppdaterte datakilden
  const form = useFormContext<FormValues>();
  const watched = form?.watch?.() as Partial<FormValues> | undefined;

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

  const rekrutteringstreff = useMemo(() => {
    if (!watched) return null;

    const fraTid = combineDateTime(
      watched.fraDato as any,
      watched.fraTid as any,
    );
    const tilTid = combineDateTime(
      watched.tilDato as any,
      watched.tilTid as any,
    );
    const svarfrist = combineDateTime(
      watched.svarfristDato as any,
      watched.svarfristTid as any,
    );

    return {
      tittel: watched.tittel,
      gateadresse: watched.gateadresse,
      postnummer: watched.postnummer,
      poststed: watched.poststed,
      fraTid,
      tilTid,
      svarfrist,
    };
  }, [watched]);

  const innlegg = useMemo(() => {
    if (!watched?.htmlContent) return null;
    return { htmlContent: watched.htmlContent };
  }, [watched?.htmlContent]);

  if (isLoadingArbeidsgivere) {
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

  return (
    <div className='bg-white text-black min-h-screen' data-theme='light'>
      <div className='max-w-7xl mx-auto p-2 space-y-6'>
        <div className='grid grid-cols-1 2xl:grid-cols-6 gap-4 pt-4'>
          <div className='2xl:col-span-4 space-y-6'>
            <div>
              <Heading level='1' size='large' className='text-gray-900'>
                {rekrutteringstreff.tittel}
              </Heading>
            </div>

            {/* Time and Location info */}
            <div className='flex flex-col gap-4 2xl:flex-row 2xl:gap-16'>
              {/* Time */}
              {(initialFra || initialTil) && (
                <div className='flex items-start gap-3'>
                  <ClockIcon
                    aria-hidden
                    fontSize='1.5rem'
                    className='text-gray-700 flex-shrink-0'
                  />
                  <div>
                    <BodyShort className='text-gray-600 mb-0.5 font-bold'>
                      Om 6 dager
                    </BodyShort>
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
                      <BodyShort className='text-gray-900 font-bold'>
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
          <div className='2xl:col-span-2 space-y-6'>
            {/* User response box */}
            <div className='space-y-4'>
              <div className='p-4 rounded-lg space-y-2 bg-[var(--ax-surface-info-subtle,_#E6F0FF)] border border-[var(--ax-border-info-subtle,_#99C2FF)]'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='flex-1'>
                    <BodyShort className='text-gray-900 flex items-center gap-2'>
                      <span role='img' aria-label='flammer'>
                        🔥🔥🔥
                      </span>
                    </BodyShort>
                    {dagerIgjenTekst && (
                      <BodyShort className='text-gray-700 font-bold'>
                        {dagerIgjenTekst}
                      </BodyShort>
                    )}
                    {dagerIgjenTekst !== 'Utløpt' && (
                      <BodyShort className='text-gray-700'>
                        Du kan endre svaret ditt frem til {svarfristFormatert}
                      </BodyShort>
                    )}
                  </div>
                  <Button
                    variant='primary'
                    size='medium'
                    className='text-white'
                  >
                    Svar
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
