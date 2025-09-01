'use client';

import Innlegg from './innlegg/Innlegg';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import SlettRekrutteringstreffModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/SlettRekrutteringstreffModal';
import ArbeidsgiverHendelserKort from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/_ui/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøkere/_ui/JobbsøkerHendelserKort';
import SWRLaster from '@/components/SWRLaster';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useRef } from 'react';
import * as React from 'react';

const OmTreffet = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const kiLoggModalRef = useRef<HTMLDialogElement>(null);

  const openKiLoggModal = () => {
    kiLoggModalRef.current?.showModal();
  };

  const rekrutteringstreffHook = useRekrutteringstreff(
    rekrutteringstreffId as string,
  );

  const jobbsøkerHendelserHook = useJobbsøkerHendelser(
    rekrutteringstreffId as string,
  );

  const arbeidsgiverHendelserHook = useArbeidsgiverHendelser(
    rekrutteringstreffId as string,
  );

  const innleggHook = useInnlegg(rekrutteringstreffId as string);

  return (
    <div>
      <div className='mt-4'>
        <SlettRekrutteringstreffModal />
      </div>

      <SWRLaster hooks={[rekrutteringstreffHook]}>
        {(rekrutteringstreff) => (
          <>
            <div className='mt-4 flex flex-col gap-16 md:flex-row'>
              <SWRLaster hooks={[arbeidsgiverHendelserHook]}>
                {(arbeidsgiverHendelser) => (
                  <ArbeidsgiverHendelserKort
                    arbeidsgiverHendelserDTO={arbeidsgiverHendelser || []}
                  />
                )}
              </SWRLaster>
              <SWRLaster hooks={[jobbsøkerHendelserHook]}>
                {(jobbsøkerHendelser) => (
                  <JobbsøkerHendelserKort
                    jobbsøkerHendelserDTO={jobbsøkerHendelser || []}
                  />
                )}
              </SWRLaster>
            </div>

            <div>
              <SWRLaster hooks={[innleggHook]}>
                {(innlegg) => (
                  <Innlegg
                    rekrutteringstreffId={rekrutteringstreffId as string}
                    onInnleggUpdated={innleggHook.mutate}
                    innlegg={innlegg?.[0]}
                    fra={
                      rekrutteringstreff.fraTid
                        ? toZonedTime(
                            parseISO(rekrutteringstreff.fraTid),
                            'Europe/Oslo',
                          )
                        : null
                    }
                    til={
                      rekrutteringstreff.tilTid
                        ? toZonedTime(
                            parseISO(rekrutteringstreff.tilTid),
                            'Europe/Oslo',
                          )
                        : null
                    }
                  />
                )}
              </SWRLaster>
            </div>
          </>
        )}
      </SWRLaster>
    </div>
  );
};

export default OmTreffet;
