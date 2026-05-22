'use client';

import ArbeidsgiverHendelserKort from '../arbeidsgiver/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../jobbsøker/JobbsøkerHendelserKort';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerHendelser';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import ForFåJobbsøkereVarselBanner from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/ForFåJobbsøkereVarselBanner';
import {
  StedKort,
  SvarfristKort,
  TidspunktKort,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetInfoKort';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  datostrengTilDato,
  formaterDatoUkedag,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { skalViseVarselSjekk } from '@/app/rekrutteringstreff/_utils/FærreEnnTreJaVarselSjekk';
import InfoBoks from '@/components/InfoBoks';
import SWRLaster from '@/components/SWRLaster';
import RikTekstEditorPreview from '@/components/rikteksteditor/RikTekstEditorPreview';
import { Box, Detail, Heading, Skeleton } from '@navikt/ds-react';
import { FC } from 'react';

const OmTreffetForEier: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { innlegg: innleggListe, rekrutteringstreffHook } =
    useRekrutteringstreffData();

  const innlegg = innleggListe?.[0];

  return (
    <SWRLaster
      hooks={[rekrutteringstreffHook]}
      skeleton={
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
      }
      egenFeilmelding={() => <ManglendeTreffFeilmelding />}
    >
      {(rekrutteringstreff) => {
        const svarfristSomDato = datostrengTilDato(
          rekrutteringstreff.svarfrist,
        );
        const skalViseVarsel = skalViseVarselSjekk(
          rekrutteringstreff?.status,
          rekrutteringstreff?.antallJobbsøkereSvartJa,
          svarfristSomDato,
        );
        return (
          <div className='@container mx-auto space-y-5'>
            <section>
              <Heading level='1' size='large'>
                {rekrutteringstreff.tittel}
              </Heading>
            </section>
            {skalViseVarsel && (
              <ForFåJobbsøkereVarselBanner
                antallJobbsøkereSvartJa={
                  rekrutteringstreff.antallJobbsøkereSvartJa!
                }
              />
            )}
            <InfoBoks className={'flex flex-col gap-6'}>
              <Heading level='2' size='medium'>
                Om treffet
              </Heading>

              <section className='grid grid-cols-1 gap-2 @md:grid-cols-3'>
                <TidspunktKort rekrutteringstreff={rekrutteringstreff} />
                <StedKort rekrutteringstreff={rekrutteringstreff} />
                <SvarfristKort rekrutteringstreff={rekrutteringstreff} />
              </section>

              {innlegg?.htmlContent && (
                <Box>
                  <RikTekstEditorPreview htmlContent={innlegg.htmlContent} />
                </Box>
              )}
              <section>
                <div className='flex flex-wrap gap-6 text-[var(--ax-text-neutral-subtle)]'>
                  <Detail>
                    Sist oppdatert{' '}
                    {formaterDatoUkedag(rekrutteringstreff.sistEndret)}, kl.{' '}
                    {formaterTidspunkt(rekrutteringstreff.sistEndret)} av{' '}
                    {rekrutteringstreff.sistEndretAv}
                  </Detail>
                </div>
              </section>
            </InfoBoks>
            <HendelserKort rekrutteringstreffId={rekrutteringstreffId} />
          </div>
        );
      }}
    </SWRLaster>
  );
};

function HendelserKort({
  rekrutteringstreffId,
}: {
  rekrutteringstreffId: string;
}) {
  const jobbsøkereHook = useJobbsøkere(rekrutteringstreffId);
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const jobbsøkerHendelserHook = useJobbsøkerHendelser(rekrutteringstreffId);
  const arbeidsgiverHendelserHook =
    useArbeidsgiverHendelser(rekrutteringstreffId);

  return (
    <SWRLaster
      hooks={[
        jobbsøkereHook,
        arbeidsgivereHook,
        jobbsøkerHendelserHook,
        arbeidsgiverHendelserHook,
      ]}
      skeleton={<Skeleton variant='rounded' height={200} />}
    >
      {(
        jobbsøkere,
        arbeidsgivere,
        jobbsøkerHendelser,
        arbeidsgiverHendelser,
      ) => (
        <div className='grid grid-cols-1 gap-5 @2xl:grid-cols-2'>
          <ArbeidsgiverHendelserKort
            arbeidsgivere={arbeidsgivere}
            arbeidsgiverHendelser={arbeidsgiverHendelser}
          />
          {jobbsøkere && (
            <JobbsøkerHendelserKort
              jobbsøkere={jobbsøkere}
              jobbsøkerHendelser={jobbsøkerHendelser}
              rekrutteringstreffId={rekrutteringstreffId}
            />
          )}
        </div>
      )}
    </SWRLaster>
  );
}

export default OmTreffetForEier;
