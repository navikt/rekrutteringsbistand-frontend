'use client';

import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import SlettRekrutteringstreffModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/SlettRekrutteringstreffModal';
import ArbeidsgiverHendelserKort from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/_ui/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøkere/_ui/JobbsøkerHendelserKort';
import SWRLaster from '@/components/SWRLaster';
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
          </>
        )}
      </SWRLaster>
    </div>
  );
};

export default OmTreffet;
