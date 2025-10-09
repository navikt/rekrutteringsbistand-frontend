'use client';

import ArbeidsgiverHendelserKort from '../arbeidsgiver/ArbeidsgiverHendelserKort';
import { useRekrutteringstreffData } from '../hooks/useRekrutteringstreffData';
import JobbsøkerHendelserKort from '../jobbsøker/JobbsøkerHendelserKort';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerHendelser';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { formaterNorskDato } from '@/util/util';
import { CalendarIcon, ClockIcon, LocationPinIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading, Skeleton } from '@navikt/ds-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { nb } from 'date-fns/locale';
import { FC } from 'react';

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

const OmTreffet: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const {
    treff: rekrutteringstreff,
    innlegg: innleggListe,
    rekrutteringstreffHook,
  } = useRekrutteringstreffData();

  const { isLoading: isLoadingTreff } = rekrutteringstreffHook;
  const isLoadingInnlegg = false; // Laster via useRekrutteringstreffData
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
    <div className='space-y-8 max-w-[64rem] mx-auto'>
      <section>
        <Heading level='1' size='large' className='mb-2'>
          {rekrutteringstreff.tittel}
        </Heading>
      </section>

      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
        className='space-y-6'
      >
        <Heading level='2' size='medium'>
          Om treffet
        </Heading>

        <section className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <TidspunktKort rekrutteringstreff={rekrutteringstreff} />
          <StedKort rekrutteringstreff={rekrutteringstreff} />
          <SvarfristKort rekrutteringstreff={rekrutteringstreff} />
        </section>

        {innlegg?.htmlContent && (
          <Box.New padding='4'>
            <div
              className='prose prose-sm max-w-none'
              dangerouslySetInnerHTML={{ __html: innlegg.htmlContent }}
            />
          </Box.New>
        )}
      </Box.New>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
        {arbeidsgiverHendelser && (
          <ArbeidsgiverHendelserKort
            arbeidsgiverHendelserDTO={arbeidsgiverHendelser}
          />
        )}
        {jobbsøkerHendelser && (
          <JobbsøkerHendelserKort jobbsøkerHendelserDTO={jobbsøkerHendelser} />
        )}
      </div>

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

const TidspunktKort: FC<KortProps> = ({ rekrutteringstreff }) => {
  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  return (
    <Box.New className='flex-1' padding='6'>
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

const StedKort: FC<KortProps> = ({ rekrutteringstreff }) => {
  return (
    <Box.New className='flex-1' padding='6'>
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

const SvarfristKort: FC<KortProps> = ({ rekrutteringstreff }) => {
  const svarfristFormatert = rekrutteringstreff.svarfrist
    ? formatWeekdayDate(rekrutteringstreff.svarfrist) +
      ' kl ' +
      formatTime(rekrutteringstreff.svarfrist)
    : null;

  return (
    <Box.New className='flex-1' padding='6'>
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

export default OmTreffet;
