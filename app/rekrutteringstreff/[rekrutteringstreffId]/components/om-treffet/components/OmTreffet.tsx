'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import SlettRekrutteringstreffModal from '../../SlettRekrutteringstreffModal';
import ArbeidsgiverHendelserKort from '../../arbeidsgivere/components/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../../jobbsøkere/components/JobbsøkerHendelserKort';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import SWRLaster from '@/app/components/SWRLaster';
/*import {
  Dato,
  datoFormatterer,
} from '@/app/rekrutteringstreff/RekrutteringstreffSøk';
import { Heading, Table } from '@navikt/ds-react';*/
import * as React from 'react';

const OmTreffet = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

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
    </div>
  );
};

export default OmTreffet;
