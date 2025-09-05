'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import ArbeidsgiverHendelserKort from '../_ui/arbeidsgivere/_ui/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../_ui/jobbsøkere/_ui/JobbsøkerHendelserKort';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { formaterNorskDato } from '@/util/util';
import { CalendarIcon, ClockIcon, LocationPinIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading, Skeleton } from '@navikt/ds-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
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

const formaterKlokkeslett = (date: Date) => {
  return format(date, 'HH:mm');
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

      <Box.New
        background='neutral-softA'
        borderColor='neutral-subtleA'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
        className='space-y-6 max-w-[64rem]'
      >
        <Heading level='2' size='medium'>
          Om treffet
        </Heading>

        <section className='flex flex-col gap-4 md:flex-row'>
          <TidspunktKort rekrutteringstreff={rekrutteringstreff} />
          <StedKort rekrutteringstreff={rekrutteringstreff} />
          <SvarfristKort rekrutteringstreff={rekrutteringstreff} />
        </section>

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

interface KortProps {
  rekrutteringstreff: any;
}

const TidspunktKort: React.FC<KortProps> = ({ rekrutteringstreff }) => {
  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
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
      <BodyShort
        size='small'
        className='flex items-center gap-1 mb-2'
        textColor='subtle'
      >
        <ClockIcon aria-hidden fontSize='1rem' />
        Tid
      </BodyShort>
      {initialFra && initialTil ? (
        isSameDay(initialFra, initialTil) ? (
          <BodyShort size='small'>
            {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
            <BodyShort as='span' size='small' textColor='subtle'>
              kl {formaterKlokkeslett(initialFra)}-
              {formaterKlokkeslett(initialTil)}
            </BodyShort>
          </BodyShort>
        ) : (
          <>
            <BodyShort size='small'>
              {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {formaterKlokkeslett(initialFra)}
              </BodyShort>{' '}
              til
            </BodyShort>
            <BodyShort size='small'>
              {formaterNorskDato({ dato: initialTil, visning: 'tall' })}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {formaterKlokkeslett(initialTil)}
              </BodyShort>
            </BodyShort>
          </>
        )
      ) : (
        <BodyShort size='small' textColor='subtle'>
          &nbsp;
        </BodyShort>
      )}
    </Box.New>
  );
};

const StedKort: React.FC<KortProps> = ({ rekrutteringstreff }) => {
  return (
    <Box.New
      background='neutral-softA'
      className='flex-1'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
    >
      <BodyShort
        size='small'
        className='flex items-center gap-1 mb-2'
        textColor='subtle'
      >
        <LocationPinIcon aria-hidden fontSize='1rem' />
        Sted
      </BodyShort>
      {rekrutteringstreff.gateadresse ||
      rekrutteringstreff.postnummer ||
      rekrutteringstreff.poststed ? (
        <div className='space-y-1'>
          {rekrutteringstreff.gateadresse && (
            <BodyShort size='small'>{rekrutteringstreff.gateadresse}</BodyShort>
          )}
          {(rekrutteringstreff.postnummer || rekrutteringstreff.poststed) && (
            <BodyShort size='small'>
              {rekrutteringstreff.postnummer} {rekrutteringstreff.poststed}
            </BodyShort>
          )}
        </div>
      ) : (
        <BodyShort size='small' textColor='subtle'>
          &nbsp;
        </BodyShort>
      )}
    </Box.New>
  );
};

const SvarfristKort: React.FC<KortProps> = ({ rekrutteringstreff }) => {
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
      <BodyShort
        size='small'
        className='flex items-center gap-1 mb-2'
        textColor='subtle'
      >
        <CalendarIcon aria-hidden fontSize='1rem' />
        Svarfrist
      </BodyShort>
      {svarfristFormatert ? (
        <BodyShort size='small'>{svarfristFormatert}</BodyShort>
      ) : (
        <BodyShort size='small' textColor='subtle'>
          &nbsp;
        </BodyShort>
      )}
    </Box.New>
  );
};

export default RekrutteringstreffForhåndsvisning;
