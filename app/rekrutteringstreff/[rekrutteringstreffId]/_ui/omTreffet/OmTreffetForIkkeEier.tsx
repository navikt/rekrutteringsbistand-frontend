'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { leggTilMegSomEier } from '@/app/api/rekrutteringstreff/[...slug]/eiere/mutations';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import {
  StedKort,
  SvarfristKort,
  TidspunktKort,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/OmTreffetInfoKort';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { formaterDatoUtskrevetMåned } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import FinnJobbsøkereKnapp from '@/app/stilling/[stillingsId]/_ui/ActionLinks/FinnJobbsøkereKnapp';
import InfoBoks from '@/components/InfoBoks';
import SWRLaster from '@/components/SWRLaster';
import RikTekstEditorPreview from '@/components/rikteksteditor/RikTekstEditorPreview';
import { Roller } from '@/components/tilgangskontroll/roller';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { RekbisError } from '@/util/rekbisError';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Detail,
  Heading,
  Modal,
  Skeleton,
} from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

const OmTreffetForIkkeEier: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { innlegg: innleggListe, rekrutteringstreffHook } =
    useRekrutteringstreffData();
  const { harRolle, visVarsel } = useApplikasjonContext();

  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];
  const modalRef = useRef<HTMLDialogElement>(null);
  const [laster, setLaster] = useState(false);

  const kanBliEier = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
  ]);

  const bekreftLeggTilMeg = async () => {
    setLaster(true);
    try {
      await leggTilMegSomEier(rekrutteringstreffId);
      modalRef.current?.close();
      rekrutteringstreffHook.mutate();
      visVarsel({ type: 'success', tekst: 'Du er nå lagt til som eier.' });
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å legge til deg som eier.',
      });
      new RekbisError({ message: 'Klarte ikke å legge til som eier', error });
    } finally {
      setLaster(false);
    }
  };

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
        const treffeiere = () => {
          const eiere = rekrutteringstreff.eiere;
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

        return (
          <div className='mx-auto max-w-[64rem] space-y-5'>
            <section className='mt-4'>
              <Heading level='1' size='large'>
                {rekrutteringstreff.tittel}
              </Heading>

              <Detail as='div' className={'flex flex-row items-center gap-1'}>
                {treffeiere()}
                {' • '}
                Opprettet{' '}
                {formaterDatoUtskrevetMåned(
                  rekrutteringstreff.opprettetAvTidspunkt,
                )}
                {' • '}
                {hentNavkontorNavn(
                  rekrutteringstreff.opprettetAvNavkontorEnhetId,
                )}
              </Detail>
            </section>
            {rekrutteringstreff.status ===
              RekrutteringstreffStatus.PUBLISERT && (
              <FinnJobbsøkereKnapp
                rekrutteringstreffId={rekrutteringstreff.id}
              />
            )}
            <InfoBoks>
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
            {kanBliEier && (
              <div>
                <Button
                  variant='secondary'
                  size='small'
                  icon={<PersonPlusIcon aria-hidden />}
                  onClick={() => modalRef.current?.showModal()}
                >
                  Legg til meg som eier
                </Button>
              </div>
            )}
            <Modal
              ref={modalRef}
              header={{ heading: 'Bli eier av dette treffet?' }}
              width='small'
              onClose={() => !laster && modalRef.current?.close()}
            >
              <Modal.Body>
                <BodyShort>
                  Som eier får du tilgang til å jobbe med treffet. Det innebærer
                  blant annet at du kan se påmeldte kandidater, sende
                  invitasjoner og se svarstatus.
                </BodyShort>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='primary'
                  loading={laster}
                  onClick={bekreftLeggTilMeg}
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
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default OmTreffetForIkkeEier;
