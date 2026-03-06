'use client';

import ArbeidsgiverHendelserKort from '../arbeidsgiver/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../jobbsøker/JobbsøkerHendelserKort';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerHendelser';
import { leggTilMittKontor } from '@/app/api/rekrutteringstreff/[...slug]/kontorer/mutations';
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
import InfoBoks from '@/components/InfoBoks';
import SWRLaster from '@/components/SWRLaster';
import RikTekstEditorPreview from '@/components/rikteksteditor/RikTekstEditorPreview';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { RekbisError } from '@/util/rekbisError';
import {
  BodyShort,
  Box,
  Button,
  Detail,
  Heading,
  Modal,
  Skeleton,
  Tag,
} from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

const OmTreffetForEier: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { innlegg: innleggListe, rekrutteringstreffHook } =
    useRekrutteringstreffData();
  const jobbsøkerHendelserHook = useJobbsøkerHendelser(rekrutteringstreffId);
  const arbeidsgiverHendelserHook =
    useArbeidsgiverHendelser(rekrutteringstreffId);
  const { valgtNavKontor, visVarsel } = useApplikasjonContext();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [laster, setLaster] = useState(false);

  const innlegg = innleggListe?.[0];

  return (
    <SWRLaster
      hooks={[
        rekrutteringstreffHook,
        jobbsøkerHendelserHook,
        arbeidsgiverHendelserHook,
      ]}
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
      {(rekrutteringstreff, jobbsøkerHendelser, arbeidsgiverHendelser) => {
        const kanLeggeTilMittKontor =
          valgtNavKontor?.navKontor != null &&
          !rekrutteringstreff.kontorer.includes(valgtNavKontor.navKontor);

        const bekreftLeggTilKontor = async () => {
          setLaster(true);
          try {
            await leggTilMittKontor(rekrutteringstreffId);
            modalRef.current?.close();
            rekrutteringstreffHook.mutate();
            visVarsel({ type: 'success', tekst: 'Kontoret ble lagt til.' });
          } catch (error) {
            visVarsel({
              type: 'error',
              tekst: 'Klarte ikke å legge til kontor.',
            });
            new RekbisError({
              message: 'Klarte ikke å legge til kontor',
              error,
            });
          } finally {
            setLaster(false);
          }
        };

        return (
          <div className='@container mx-auto max-w-[64rem] space-y-5'>
            <section>
              <Heading level='1' size='large' className='mt-4'>
                {rekrutteringstreff.tittel}
              </Heading>
            </section>
            <InfoBoks>
              <Heading level='2' size='medium' className={'pb-6'}>
                Om treffet
              </Heading>

              <section className='grid grid-cols-1 gap-2 @md:grid-cols-3'>
                <TidspunktKort rekrutteringstreff={rekrutteringstreff} />
                <StedKort rekrutteringstreff={rekrutteringstreff} />
                <SvarfristKort rekrutteringstreff={rekrutteringstreff} />
              </section>

              {innlegg?.htmlContent && (
                <Box className={'py-8'}>
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
              {rekrutteringstreff.kontorer.length > 0 && (
                <section className='mt-4 flex flex-wrap items-center gap-2'>
                  <Detail className='text-[var(--ax-text-neutral-subtle)]'>
                    Kontorer:
                  </Detail>
                  {rekrutteringstreff.kontorer.map((k) => (
                    <Tag key={k} variant='neutral' size='small'>
                      {hentNavkontorNavn(k)}
                    </Tag>
                  ))}
                </section>
              )}
            </InfoBoks>
            {kanLeggeTilMittKontor && (
              <div>
                <Button
                  variant='secondary'
                  size='small'
                  onClick={() => modalRef.current?.showModal()}
                >
                  Legg til mitt kontor
                </Button>
              </div>
            )}
            <Modal
              ref={modalRef}
              header={{ heading: 'Legg til mitt kontor?' }}
              width='small'
              onClose={() => !laster && modalRef.current?.close()}
            >
              <Modal.Body>
                <BodyShort>
                  Treffet vil bli synlig for kollegaer som filtrerer på{' '}
                  {valgtNavKontor?.navKontorNavn ?? valgtNavKontor?.navKontor}.{' '}
                  Dette kan ikke angres.
                </BodyShort>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='primary'
                  loading={laster}
                  onClick={bekreftLeggTilKontor}
                >
                  Bekreft
                </Button>
                <Button
                  variant='secondary'
                  disabled={laster}
                  onClick={() => modalRef.current?.close()}
                >
                  Avbryt
                </Button>
              </Modal.Footer>
            </Modal>
            <div className='grid grid-cols-1 gap-5 @2xl:grid-cols-2'>
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
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default OmTreffetForEier;
