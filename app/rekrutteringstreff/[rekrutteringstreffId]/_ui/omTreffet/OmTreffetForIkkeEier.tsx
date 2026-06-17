'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import {
  StedKort,
  SvarfristKort,
  TidspunktKort,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetInfoKort';
import RekrutteringstreffHeaderDetalj from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/RekrutteringstreffHeaderDetalj';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import FinnJobbsøkereKnapp from '@/app/stilling/[stillingsId]/_ui/ActionLinks/FinnJobbsøkereKnapp';
import InfoBoks from '@/components/InfoBoks';
import SWRLaster from '@/components/SWRLaster';
import RikTekstEditorPreview from '@/components/rikteksteditor/RikTekstEditorPreview';
import { BodyShort, Box, Heading, Skeleton } from '@navikt/ds-react';
import { FC } from 'react';

const OmTreffetForIkkeEier: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { innlegg: innleggListe, rekrutteringstreffHook } =
    useRekrutteringstreffData();

  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

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
        </div>
      }
      egenFeilmelding={() => <ManglendeTreffFeilmelding />}
    >
      {(rekrutteringstreff) => {
        return (
          <div className='mx-auto space-y-5'>
            <section className='mt-4'>
              <Heading level='1' size='large'>
                {rekrutteringstreff.tittel}
              </Heading>

              <RekrutteringstreffHeaderDetalj
                rekrutteringstreff={rekrutteringstreff}
              />
            </section>
            {rekrutteringstreff.status ===
              RekrutteringstreffStatus.PUBLISERT && (
              <FinnJobbsøkereKnapp
                rekrutteringstreffId={rekrutteringstreff.id}
              />
            )}
            <InfoBoks className={'flex flex-col gap-5 lg:grid lg:grid-cols-3'}>
              <Box className={'col-span-2'}>
                <section>
                  <Heading level='2' size='medium' className={'pb-6'}>
                    Om treffet
                  </Heading>
                  <section className='grid grid-cols-1 gap-2'>
                    <TidspunktKort rekrutteringstreff={rekrutteringstreff} />
                    <StedKort rekrutteringstreff={rekrutteringstreff} />
                    <SvarfristKort rekrutteringstreff={rekrutteringstreff} />
                  </section>

                  {innlegg?.htmlContent && (
                    <Box className={'py-8'}>
                      <RikTekstEditorPreview
                        htmlContent={innlegg.htmlContent}
                      />
                    </Box>
                  )}
                </section>
              </Box>
              {arbeidsgivere && (
                <Box className=''>
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
                </Box>
              )}
            </InfoBoks>
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default OmTreffetForIkkeEier;
