'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import RekrutteringstreffDetalj from '../../RekrutteringstreffDetalj';
import SlettRekrutteringstreffModal from '../../SlettRekrutteringstreffModal';
import ArbeidsgiverHendelserKort from '../../arbeidsgivere/components/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../../jobbsøkere/components/JobbsøkerHendelserKort';
import Tidspunkt from './tidspunkt/Tidspunkt';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SWRLaster from '@/app/components/SWRLaster';
import { LocationPinIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { TimerIcon } from 'lucide-react';
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

      <div>
        <SWRLaster hooks={[rekrutteringstreffHook]}>
          {(rekrutteringstreff) => {
            return (
              <div className='mt-4 flex flex-col gap-4 md:flex-row max-w-[64rem]'>
                <Tidspunkt
                  rekrutteringstreff={rekrutteringstreff}
                  className='flex-1'
                />
                <RekrutteringstreffDetalj
                  tittelIkon={<LocationPinIcon fontSize='1.5rem' />}
                  tittel='Sted'
                  knapp={
                    <Button icon={<PlusIcon />} variant='tertiary' size='small'>
                      Legg til
                    </Button>
                  }
                  className='flex-1'
                >
                  <BodyShort size='small'>TODO</BodyShort>
                </RekrutteringstreffDetalj>
                <RekrutteringstreffDetalj
                  tittelIkon={<TimerIcon fontSize='1.5rem' />}
                  tittel='Svarfrist'
                  knapp={
                    <Button icon={<PlusIcon />} variant='tertiary' size='small'>
                      Legg til
                    </Button>
                  }
                  className='flex-1'
                >
                  <BodyShort size='small'>TODO</BodyShort>
                </RekrutteringstreffDetalj>
              </div>
            );
          }}
        </SWRLaster>
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
