'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { CalendarIcon, ClockIcon, LocationPinIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
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
    return format(date, 'dd. MMMM yyyy', { locale: nb });
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

const RekrutteringstreffForhåndsvisning: React.FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreff, isLoading: isLoadingTreff } =
    useRekrutteringstreff(rekrutteringstreffId);
  const { data: innleggListe, isLoading: isLoadingInnlegg } =
    useInnlegg(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];

  if (isLoadingTreff || isLoadingInnlegg) {
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

  const fraTidFormatert = formatDateTime(rekrutteringstreff.fraTid);
  const tilTidFormatert = formatDateTime(rekrutteringstreff.tilTid);
  const svarfristFormatert = formatDateTime(rekrutteringstreff.svarfrist);

  const erSammedag =
    rekrutteringstreff.fraTid &&
    rekrutteringstreff.tilTid &&
    formatDate(rekrutteringstreff.fraTid) ===
      formatDate(rekrutteringstreff.tilTid);

  return (
    <div className='space-y-8'>
      <section>
        <Heading level='1' size='large' className='mb-2'>
          {rekrutteringstreff.tittel}
        </Heading>
      </section>

      <section className='space-y-6'>
        <Heading level='2' size='medium'>
          Praktiske forhold
        </Heading>

        {(rekrutteringstreff.fraTid || rekrutteringstreff.tilTid) && (
          <div className='space-y-2'>
            <Heading level='3' size='small' className='flex items-center gap-2'>
              <ClockIcon aria-hidden className='text-blue-600' />
              Tid
            </Heading>
            <div className='ml-6'>
              {erSammedag &&
              rekrutteringstreff.fraTid &&
              rekrutteringstreff.tilTid ? (
                <BodyShort>
                  {formatDate(rekrutteringstreff.fraTid)} kl.{' '}
                  {formatTime(rekrutteringstreff.fraTid)} -{' '}
                  {formatTime(rekrutteringstreff.tilTid)}
                </BodyShort>
              ) : (
                <div className='space-y-1'>
                  {fraTidFormatert && (
                    <BodyShort>
                      <strong>Fra:</strong> {fraTidFormatert}
                    </BodyShort>
                  )}
                  {tilTidFormatert && (
                    <BodyShort>
                      <strong>Til:</strong> {tilTidFormatert}
                    </BodyShort>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sted */}
        {(rekrutteringstreff.gateadresse ||
          rekrutteringstreff.postnummer ||
          rekrutteringstreff.poststed) && (
          <div className='space-y-2'>
            <Heading level='3' size='small' className='flex items-center gap-2'>
              <LocationPinIcon aria-hidden className='text-blue-600' />
              Sted
            </Heading>
            <div className='ml-6 space-y-1'>
              {rekrutteringstreff.gateadresse && (
                <BodyShort>{rekrutteringstreff.gateadresse}</BodyShort>
              )}
              {(rekrutteringstreff.postnummer ||
                rekrutteringstreff.poststed) && (
                <BodyShort>
                  {rekrutteringstreff.postnummer} {rekrutteringstreff.poststed}
                </BodyShort>
              )}
            </div>
          </div>
        )}

        {rekrutteringstreff.svarfrist && (
          <div className='space-y-2'>
            <Heading level='3' size='small' className='flex items-center gap-2'>
              <CalendarIcon aria-hidden className='text-blue-600' />
              Svarfrist
            </Heading>
            <div className='ml-6'>
              <BodyShort>{svarfristFormatert}</BodyShort>
            </div>
          </div>
        )}

        {innlegg?.htmlContent && (
          <div className='space-y-2'>
            <Heading level='3' size='small'>
              Om treffet
            </Heading>
            <div
              className='ml-6 prose prose-sm max-w-none'
              dangerouslySetInnerHTML={{ __html: innlegg.htmlContent }}
            />
          </div>
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

export default RekrutteringstreffForhåndsvisning;
