'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import ArbeidsgiverHendelserKort from '../_ui/arbeidsgivere/_ui/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../_ui/jobbsøkere/_ui/JobbsøkerHendelserKort';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SWRLaster from '@/components/SWRLaster';
import { CalendarIcon, ClockIcon, LocationPinIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Box,
  Detail,
  Heading,
  Skeleton,
} from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import React from 'react';

const formatDateTime = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return format(date, "dd. MMMM yyyy 'kl.' HH:mm", { locale: nb });
  } catch {
    return null;
  }
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return format(date, 'dd. MMM yyyy', { locale: nb });
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

const formatWeekdayDate = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE dd. MMM yyyy', { locale: nb });
  } catch {
    return null;
  }
};

const RekrutteringstreffForhåndsvisning: React.FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreff, isLoading: isLoadingTreff } =
    useRekrutteringstreff(rekrutteringstreffId);
  const { data: innleggListe, isLoading: isLoadingInnlegg } =
    useInnlegg(rekrutteringstreffId);
  const { data: jobbsøkerHendelser, isLoading: isLoadingJobbsøkerHendelser } =
    useJobbsøkerHendelser(rekrutteringstreffId);
  const {
    data: arbeidsgiverHendelser,
    isLoading: isLoadingArbeidsgiverHendelser,
  } = useArbeidsgiverHendelser(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];

  if (
    isLoadingTreff ||
    isLoadingInnlegg ||
    isLoadingJobbsøkerHendelser ||
    isLoadingArbeidsgiverHendelser
  ) {
    return (
      <div className='space-y-6'>
        <Skeleton variant='text' width='60%' height={32} />
        <div className='space-y-4'>
          <Skeleton variant='text' width='100%' height={20} />
          <Skeleton variant='text' width='100%' height={20} />
          <Skeleton variant='text' width='80%' height={20} />
        </div>
        <div className='space-y-2'>
          <Skeleton variant='text' width='40%' height={24} />
          <Skeleton variant='text' width='30%' height={20} />
        </div>
      </div>
    );
  }

  if (!rekrutteringstreff) {
    return (
      <div className='text-center py-8'>
        <BodyShort>Kunne ikke laste rekrutteringstreff</BodyShort>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <section>
        <Heading level='1' size='large' className='mb-2'>
          {rekrutteringstreff.tittel}
        </Heading>
      </section>

      {/* Large card containing all main info */}
      <Box.New
        background='neutral-softA'
        borderColor='neutral-subtleA'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
        className='space-y-6'
      >
        {/* Om treffet title */}
        <Heading level='2' size='medium'>
          Om treffet
        </Heading>

        {/* Three-column layout for main info */}
        <section className='flex flex-col gap-4 md:flex-row max-w-[64rem] min-h-[10rem]'>
          <TidspunktKort rekrutteringstreff={rekrutteringstreff} />
          <StedKort rekrutteringstreff={rekrutteringstreff} />
          <SvarfristKort rekrutteringstreff={rekrutteringstreff} />
        </section>

        {/* Innlegg content */}
        {innlegg?.htmlContent && (
          <Box.New
            background='neutral-softA'
            borderColor='neutral-subtleA'
            borderRadius='large'
            borderWidth='1'
            padding='4'
          >
            <div
              className='prose prose-sm max-w-none'
              dangerouslySetInnerHTML={{ __html: innlegg.htmlContent }}
            />
          </Box.New>
        )}
      </Box.New>

      {/* Hendelser cards */}
      <section className='mt-4 flex flex-col gap-16 md:flex-row'>
        {arbeidsgiverHendelser && (
          <ArbeidsgiverHendelserKort
            arbeidsgiverHendelserDTO={arbeidsgiverHendelser}
          />
        )}
        {jobbsøkerHendelser && (
          <JobbsøkerHendelserKort jobbsøkerHendelserDTO={jobbsøkerHendelser} />
        )}
      </section>

      {/* Status og metadata */}
      <section className='border-t pt-6'>
        <div className='flex flex-wrap gap-6 text-sm text-gray-600'>
          <Detail>
            <strong>Status:</strong> {rekrutteringstreff.status}
          </Detail>
          {rekrutteringstreff.opprettetAvPersonNavident && (
            <Detail>
              <strong>Opprettet av:</strong>{' '}
              {rekrutteringstreff.opprettetAvPersonNavident}
            </Detail>
          )}
          {rekrutteringstreff.opprettetAvNavkontorEnhetId && (
            <Detail>
              <strong>NAV-kontor:</strong>{' '}
              {rekrutteringstreff.opprettetAvNavkontorEnhetId}
            </Detail>
          )}
        </div>
      </section>
    </div>
  );
};

// Separate card components
interface CardProps {
  rekrutteringstreff: any;
}

const TidspunktKort: React.FC<CardProps> = ({ rekrutteringstreff }) => {
  const erSammedag =
    rekrutteringstreff.fraTid &&
    rekrutteringstreff.tilTid &&
    formatDate(rekrutteringstreff.fraTid) ===
      formatDate(rekrutteringstreff.tilTid);

  return (
    <Box.New
      background='neutral-softA'
      className='flex-1'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
    >
      <Heading level='3' size='small' className='flex items-center gap-2 mb-3'>
        <ClockIcon aria-hidden className='text-blue-600' />
        Tid
      </Heading>
      {rekrutteringstreff.fraTid || rekrutteringstreff.tilTid ? (
        <div>
          {erSammedag &&
          rekrutteringstreff.fraTid &&
          rekrutteringstreff.tilTid ? (
            <div>
              <BodyShort>
                {formatWeekdayDate(rekrutteringstreff.fraTid)}
              </BodyShort>
              <BodyShort>
                kl {formatTime(rekrutteringstreff.fraTid)} -{' '}
                {formatTime(rekrutteringstreff.tilTid)}
              </BodyShort>
            </div>
          ) : (
            <div className='space-y-1'>
              {rekrutteringstreff.fraTid && (
                <BodyShort>
                  <strong>Fra:</strong>{' '}
                  {formatWeekdayDate(rekrutteringstreff.fraTid)} kl{' '}
                  {formatTime(rekrutteringstreff.fraTid)}
                </BodyShort>
              )}
              {rekrutteringstreff.tilTid && (
                <BodyShort>
                  <strong>Til:</strong>{' '}
                  {formatWeekdayDate(rekrutteringstreff.tilTid)} kl{' '}
                  {formatTime(rekrutteringstreff.tilTid)}
                </BodyShort>
              )}
            </div>
          )}
        </div>
      ) : (
        <BodyShort className='text-gray-500'>Ikke satt</BodyShort>
      )}
    </Box.New>
  );
};

const StedKort: React.FC<CardProps> = ({ rekrutteringstreff }) => {
  return (
    <Box.New
      background='neutral-softA'
      className='flex-1'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
    >
      <Heading level='3' size='small' className='flex items-center gap-2 mb-3'>
        <LocationPinIcon aria-hidden className='text-blue-600' />
        Sted
      </Heading>
      {rekrutteringstreff.gateadresse ||
      rekrutteringstreff.postnummer ||
      rekrutteringstreff.poststed ? (
        <div className='space-y-1'>
          {rekrutteringstreff.gateadresse && (
            <BodyShort>{rekrutteringstreff.gateadresse}</BodyShort>
          )}
          {(rekrutteringstreff.postnummer || rekrutteringstreff.poststed) && (
            <BodyShort>
              {rekrutteringstreff.postnummer} {rekrutteringstreff.poststed}
            </BodyShort>
          )}
        </div>
      ) : (
        <BodyShort className='text-gray-500'>Ikke satt</BodyShort>
      )}
    </Box.New>
  );
};

const SvarfristKort: React.FC<CardProps> = ({ rekrutteringstreff }) => {
  const svarfristFormatert = rekrutteringstreff.svarfrist
    ? formatWeekdayDate(rekrutteringstreff.svarfrist) +
      ' kl ' +
      formatTime(rekrutteringstreff.svarfrist)
    : null;

  return (
    <Box.New
      background='neutral-softA'
      className='flex-1'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
    >
      <Heading level='3' size='small' className='flex items-center gap-2 mb-3'>
        <CalendarIcon aria-hidden className='text-blue-600' />
        Svarfrist
      </Heading>
      {svarfristFormatert ? (
        <BodyShort>{svarfristFormatert}</BodyShort>
      ) : (
        <BodyShort className='text-gray-500'>Ikke satt</BodyShort>
      )}
    </Box.New>
  );
};

export default RekrutteringstreffForhåndsvisning;
