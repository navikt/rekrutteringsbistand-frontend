'use client';

import ArbeidsgiverHendelserKort from '../arbeidsgiver/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../jobbsøker/JobbsøkerHendelserKort';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerHendelser';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import FinnJobbsøkereKnapp from '@/app/stilling/[stillingsId]/_ui/ActionLinks/FinnJobbsøkereKnapp';
import navkontorer from '@/components/layout/modiadekoratør/enheter.json';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { formaterNorskDato } from '@/util/dato';
import { ClockIcon, LocationPinIcon, TimerIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading, Skeleton } from '@navikt/ds-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { nb } from 'date-fns/locale';
import { FC } from 'react';

const formaterTid = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return format(date, 'HH:mm', { locale: nb });
  } catch {
    return null;
  }
};

const formaterDato = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return format(date, 'dd. MMMM yyyy', { locale: nb });
  } catch {
    return null;
  }
};

const formaterDatoUkedag = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE dd. MMMM yyyy', { locale: nb });
  } catch {
    return null;
  }
};

const formaterKlokkeslett = (date: Date) => {
  return format(date, 'HH:mm');
};

interface omTreffetProps {
  treffeierVisning: boolean;
}

const OmTreffet: FC<omTreffetProps> = ({ treffeierVisning }) => {
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

  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];

  const hentNavkontorNavn = (enhetId: string) => {
    return navkontorer.find((kontor) => kontor.enhetId === enhetId)?.navn;
  };

  const treffeiere = () => {
    const eiere = rekrutteringstreff?.eiere;
    if (eiere?.length === 1) {
      return (
        <div className={'flex flex-row items-center gap-2'}>
          <IkonNavnAvatar
            fulltNavn={eiere[0]}
            størrelse={'sm'}
            kantfarge
            farge={'blå'}
          />
          {eiere[0]}
        </div>
      );
    }
    return (
      <>
        <div className={'ml-4 flex flex-row items-center'}>
          {eiere?.map((eier, index) => {
            const zIndex = eiere.length - index;
            return (
              <div key={index} style={{ zIndex: zIndex }}>
                <IkonNavnAvatar
                  fulltNavn={eier}
                  størrelse={'sm'}
                  kantfarge
                  farge={'blå'}
                  className={'-ml-2'}
                />
              </div>
            );
          })}
        </div>
        {eiere && eiere.length > 0 && (
          <>
            {eiere[0]} og {eiere.length - 1}{' '}
            {eiere.length - 1 === 1 ? 'annen' : 'andre'}
          </>
        )}
      </>
    );
  };

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
      <div className='py-8 text-center'>
        <BodyShort>Kunne ikke laste rekrutteringstreff</BodyShort>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-[64rem] space-y-5'>
      {/*Visning for eiere av treffet*/}
      {treffeierVisning && (
        <>
          <section>
            <Heading level='1' size='large' className='mt-4'>
              {rekrutteringstreff.tittel}
            </Heading>
          </section>

          <Box.New
            background='neutral-soft'
            borderRadius='xlarge'
            className={'px-6'}
          >
            <Heading level='2' size='medium' className={'py-6'}>
              Om treffet
            </Heading>

            <section className='grid grid-cols-1 gap-2 md:grid-cols-3'>
              <TidspunktKort rekrutteringstreff={rekrutteringstreff} />
              <StedKort rekrutteringstreff={rekrutteringstreff} />
              <SvarfristKort rekrutteringstreff={rekrutteringstreff} />
            </section>

            {innlegg?.htmlContent && (
              <Box.New className={'py-8'}>
                <div
                  className='prose prose-sm max-w-none'
                  dangerouslySetInnerHTML={{ __html: innlegg.htmlContent }}
                />
              </Box.New>
            )}
          </Box.New>

          <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {arbeidsgiverHendelser && (
              <ArbeidsgiverHendelserKort
                arbeidsgiverHendelserDTO={arbeidsgiverHendelser}
              />
            )}
            {jobbsøkerHendelser && (
              <JobbsøkerHendelserKort
                jobbsøkerHendelserDTO={jobbsøkerHendelser}
                rekrutteringstreffStatus={rekrutteringstreff.status}
                rekrutteringstreffId={rekrutteringstreffId}
              />
            )}
          </div>
        </>
      )}
      {/*Visning for ikke-eiere av treffet*/}
      {!treffeierVisning && (
        <>
          <section className='mt-4'>
            <Heading level='1' size='large'>
              {rekrutteringstreff.tittel}
            </Heading>
            <Detail className={'flex flex-row items-center gap-2'}>
              {treffeiere()}
              {' • '}
              Opprettet {formaterDato(rekrutteringstreff.opprettetAvTidspunkt)}
              {' • '}
              {hentNavkontorNavn(
                rekrutteringstreff.opprettetAvNavkontorEnhetId,
              )}
            </Detail>
          </section>
          <FinnJobbsøkereKnapp rekrutteringstreffId={rekrutteringstreff.id} />
          <Box.New className={'grid grid-cols-3 gap-5'}>
            <Box.New className={'col-span-2'}>
              <section>
                <Heading level='2' size='medium' className={'py-6'}>
                  Om treffet
                </Heading>
                <section className='grid grid-cols-1 gap-2'>
                  <TidspunktKort rekrutteringstreff={rekrutteringstreff} />
                  <StedKort rekrutteringstreff={rekrutteringstreff} />
                  <SvarfristKort rekrutteringstreff={rekrutteringstreff} />
                </section>

                {innlegg?.htmlContent && (
                  <Box.New className={'py-8'}>
                    <div
                      className='prose prose-sm max-w-none'
                      dangerouslySetInnerHTML={{ __html: innlegg.htmlContent }}
                    />
                  </Box.New>
                )}
              </section>
            </Box.New>
            {arbeidsgivere && (
              <Box.New className=''>
                <Heading
                  level={'2'}
                  size='xsmall'
                  className='mb-2'
                  textColor={'subtle'}
                >
                  Arbeidsgivere
                </Heading>
                <div className='p-3'>
                  {arbeidsgivere.map((arbeidsgiver, index) => (
                    <div key={index} className='mb-4 flex gap-2'>
                      {arbeidsgiver.navn && (
                        <div>
                          <BodyShort>{arbeidsgiver.navn}</BodyShort>
                          <BodyShort>
                            {arbeidsgiver.organisasjonsnummer}
                          </BodyShort>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Box.New>
            )}
          </Box.New>
        </>
      )}
      <section>
        <div className='flex flex-wrap gap-6 text-[var(--ax-text-neutral-subtle)]'>
          <Detail>
            Sist oppdatert {formaterDatoUkedag(rekrutteringstreff.sistEndret)},
            kl. {formaterTid(rekrutteringstreff.sistEndret)} av{' '}
            {rekrutteringstreff.sistEndretAv}
          </Detail>
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
    <Box.New className={'flex flex-1 flex-row gap-2'}>
      <ClockIcon
        aria-hidden
        fontSize='1.5rem'
        className='text-[var(--ax-text-neutral-subtle)]'
      />
      <div>
        <BodyShort size='small' textColor='subtle'>
          Tid
        </BodyShort>
        {initialFra && initialTil ? (
          isSameDay(initialFra, initialTil) ? (
            <BodyShort size='small'>
              {formaterNorskDato({ dato: initialFra, visning: 'tall' })}
              {', '}
              <BodyShort as='span' size='small'>
                kl. {formaterKlokkeslett(initialFra)}-
                {formaterKlokkeslett(initialTil)}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialFra, visning: 'tall' })}
                {', '}
                <BodyShort as='span' size='small'>
                  kl. {formaterKlokkeslett(initialFra)}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialTil, visning: 'tall' })}
                {', '}
                <BodyShort as='span' size='small'>
                  kl. {formaterKlokkeslett(initialTil)}
                </BodyShort>
              </BodyShort>
            </>
          )
        ) : (
          <BodyShort size='small' textColor='subtle'>
            &nbsp;
          </BodyShort>
        )}
      </div>
    </Box.New>
  );
};

const StedKort: FC<KortProps> = ({ rekrutteringstreff }) => {
  return (
    <Box.New className='flex flex-1 flex-row gap-2'>
      <LocationPinIcon
        aria-hidden
        fontSize='1.5rem'
        className='text-[var(--ax-text-neutral-subtle)]'
      />
      <div>
        <BodyShort size='small' textColor='subtle'>
          Sted
        </BodyShort>
        {rekrutteringstreff.gateadresse ||
        rekrutteringstreff.postnummer ||
        rekrutteringstreff.poststed ? (
          <div className='space-y-1'>
            {rekrutteringstreff.gateadresse && (
              <BodyShort size='small'>
                {rekrutteringstreff.gateadresse}
              </BodyShort>
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
      </div>
    </Box.New>
  );
};

const SvarfristKort: FC<KortProps> = ({ rekrutteringstreff }) => {
  const svarfristFormatert = rekrutteringstreff.svarfrist
    ? formaterDatoUkedag(rekrutteringstreff.svarfrist) +
      ', kl. ' +
      formaterTid(rekrutteringstreff.svarfrist)
    : null;

  return (
    <Box.New className='flex flex-1 flex-row gap-2'>
      <TimerIcon
        aria-hidden
        fontSize='1.5rem'
        className='text-[var(--ax-text-neutral-subtle)]'
      />
      <div>
        <BodyShort size='small' textColor='subtle'>
          Svarfrist
        </BodyShort>
        {svarfristFormatert ? (
          <BodyShort size='small'>{svarfristFormatert}</BodyShort>
        ) : (
          <BodyShort size='small' textColor='subtle'>
            &nbsp;
          </BodyShort>
        )}
      </div>
    </Box.New>
  );
};

export default OmTreffet;
