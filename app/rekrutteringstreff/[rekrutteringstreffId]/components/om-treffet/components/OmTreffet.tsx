'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import SlettRekrutteringstreffModal from '../../SlettRekrutteringstreffModal';
import ArbeidsgiverHendelserKort from '../../arbeidsgivere/components/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../../jobbsøkere/components/JobbsøkerHendelserKort';
import Innlegg from './Innlegg';
import Sted from './sted/Sted';
import Svarfrist from './tidspunkt/Svarfrist';
import Tidspunkt from './tidspunkt/Tidspunkt';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SWRLaster from '@/app/components/SWRLaster';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import * as React from 'react';

const OmTreffet = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

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
            <div className='mt-4 flex flex-col gap-4 md:flex-row max-w-[64rem] min-h-[10rem]'>
              <Tidspunkt
                rekrutteringstreff={rekrutteringstreff}
                onUpdated={rekrutteringstreffHook.mutate}
                className='flex-1'
              />
              <Sted
                rekrutteringstreff={rekrutteringstreff}
                onUpdated={rekrutteringstreffHook.mutate}
                className='flex-1'
              />
              <Svarfrist
                rekrutteringstreff={rekrutteringstreff}
                onUpdated={rekrutteringstreffHook.mutate}
                className='flex-1'
              />
            </div>

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
