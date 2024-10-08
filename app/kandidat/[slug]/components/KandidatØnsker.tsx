import {
  BriefcaseClockIcon,
  ClockIcon,
  LocationPinIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatContext } from '../KandidatContext';

export interface KandidatØnskerProps {
  children?: React.ReactNode | undefined;
}

const KandidatØnsker: React.FC<KandidatØnskerProps> = ({ children }) => {
  const { kandidatData } = useKandidatContext();
  return (
    <div>
      <Heading size='large'>Ønsker</Heading>
      <p className='mb-4 my-4'>
        {kandidatData.yrkeJobbonskerObj
          ?.map((yrke) => yrke?.styrkBeskrivelse)
          .join(', ') ?? '-'}
      </p>

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center'>
          <LocationPinIcon className='w-5 h-5 mr-2' />
          <div>
            <p className='font-medium'>Sted</p>
            <p>
              {kandidatData.geografiJobbonsker
                ?.map((geografi) => geografi.geografiKodeTekst)
                .join(', ') ?? '-'}
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          <BriefcaseClockIcon className='w-5 h-5 mr-2' />
          <div>
            <p className='font-medium'>Heltid/deltid</p>
            <p>
              {kandidatData.omfangJobbonskerObj?.map(
                (omfang) => omfang?.omfangKodeTekst ?? '-',
              ) ?? '-'}
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          <ClockIcon className='w-5 h-5 mr-2' />
          <div>
            <p className='font-medium'>Arbeidstid</p>
            <p>
              {kandidatData.arbeidstidJobbonskerObj?.map(
                (arbeidstid) => arbeidstid?.arbeidstidKodeTekst ?? '-',
              ) ?? '-'}
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          <TimerStartIcon className='w-5 h-5 mr-2' />
          <div>
            <p className='font-medium'>Kan starte</p>
            <p>{kandidatData.oppstartKode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KandidatØnsker;
