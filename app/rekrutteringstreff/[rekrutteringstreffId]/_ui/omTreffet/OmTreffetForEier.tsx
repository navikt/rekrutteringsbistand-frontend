'use client';

import ArbeidsgiverHendelserKort from '../arbeidsgiver/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../jobbsøker/JobbsøkerHendelserKort';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerHendelser';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import {
  StedKort,
  SvarfristKort,
  TidspunktKort,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetInfoKort';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  formaterDatoUkedag,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { Box, Detail, Heading, Skeleton } from '@navikt/ds-react';
import { FC } from 'react';

const OmTreffetForEier: FC = () => {
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
    return <ManglendeTreffFeilmelding />;
  }

  return (
    <div className='mx-auto max-w-[64rem] space-y-5'>
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
      <section>
        <div className='flex flex-wrap gap-6 text-[var(--ax-text-neutral-subtle)]'>
          <Detail>
            Sist oppdatert {formaterDatoUkedag(rekrutteringstreff.sistEndret)},
            kl. {formaterTidspunkt(rekrutteringstreff.sistEndret)} av{' '}
            {rekrutteringstreff.sistEndretAv}
          </Detail>
        </div>
      </section>
    </div>
  );
};

export default OmTreffetForEier;
