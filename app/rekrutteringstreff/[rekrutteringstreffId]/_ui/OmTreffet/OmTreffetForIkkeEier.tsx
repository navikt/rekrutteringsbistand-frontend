'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import {
  StedKort,
  SvarfristKort,
  TidspunktKort,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/OmTreffet/OmTreffetInfoKort';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { formaterDatoUtskrevetMåned } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import FinnJobbsøkereKnapp from '@/app/stilling/[stillingsId]/_ui/ActionLinks/FinnJobbsøkereKnapp';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { BodyShort, Box, Detail, Heading, Skeleton } from '@navikt/ds-react';
import { FC } from 'react';

const OmTreffetForIkkeEier: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const {
    treff: rekrutteringstreff,
    innlegg: innleggListe,
    rekrutteringstreffHook,
  } = useRekrutteringstreffData();

  const { isLoading: isLoadingTreff } = rekrutteringstreffHook;
  const isLoadingInnlegg = false; // Laster via useRekrutteringstreffData

  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];

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

  if (isLoadingTreff || isLoadingInnlegg) {
    return (
      <div className='space-y-6'>
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
    return <ManglendeTreffFeilmelding />;
  }

  return (
    <div className='mx-auto max-w-[64rem] space-y-5'>
      <section className='mt-4'>
        <Heading level='1' size='large'>
          {rekrutteringstreff.tittel}
        </Heading>

        <Detail className={'flex flex-row items-center gap-1'}>
          {treffeiere()}
          {' • '}
          Opprettet{' '}
          {formaterDatoUtskrevetMåned(rekrutteringstreff.opprettetAvTidspunkt)}
          {' • '}
          {hentNavkontorNavn(rekrutteringstreff.opprettetAvNavkontorEnhetId)}
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
                      <BodyShort>{arbeidsgiver.organisasjonsnummer}</BodyShort>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Box.New>
        )}
      </Box.New>
    </div>
  );
};

export default OmTreffetForIkkeEier;
