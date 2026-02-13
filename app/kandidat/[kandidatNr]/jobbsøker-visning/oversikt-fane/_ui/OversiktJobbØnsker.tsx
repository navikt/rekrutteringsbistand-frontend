import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import InfoBoks from '@/components/InfoBoks';
import {
  BriefcaseClockIcon,
  ClockIcon,
  LocationPinIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import { FC } from 'react';

type Oppstartskode = {
  key: string;
  label: string;
};

const oppstartskoder: Record<string, Oppstartskode> = {
  LEDIG_NAA: { key: 'LEDIG_NAA', label: 'Nå' },
  ETTER_TRE_MND: {
    key: 'ETTER_TRE_MND',
    label: 'Om 3 måneder (oppsigelsestid)',
  },
  ETTER_AVTALE: { key: 'ETTER_AVTALE', label: 'Etter avtale' },
};

const OversiktJobbØnsker: FC = () => {
  const { kandidatData } = useJobbsøkerContext();

  return (
    <InfoBoks>
      <Heading size='small' className='mb-4'>
        Ønsker
      </Heading>
      <p className='py-4'>
        {kandidatData.yrkeJobbonskerObj
          ?.map((yrke) => yrke?.styrkBeskrivelse)
          .join(', ') ?? '-'}
      </p>

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center'>
          <LocationPinIcon className='mr-2 h-5 w-5' />
          <p className='font-medium'>Sted</p>
        </div>
        <p>
          {kandidatData.geografiJobbonsker
            ?.map((geografi) => geografi.geografiKodeTekst)
            .join(', ') ?? '-'}
        </p>
        <div className='flex items-center'>
          <BriefcaseClockIcon className='mr-2 h-5 w-5' />
          <p className='font-medium'>Heltid/deltid</p>{' '}
        </div>
        <p>
          {kandidatData.omfangJobbonskerObj
            ?.map((omfang) => omfang?.omfangKodeTekst ?? '-')
            .join(', ') ?? '-'}
        </p>

        <div className='flex items-center'>
          <ClockIcon className='mr-2 h-5 w-5' />
          <p className='font-medium'>Arbeidstid</p>{' '}
        </div>
        <p>
          {kandidatData.arbeidstidJobbonskerObj
            ?.map((arbeidstid) => arbeidstid?.arbeidstidKodeTekst ?? '-')
            .join(', ') ?? '-'}
        </p>

        <div className='flex items-center'>
          <TimerStartIcon className='mr-2 h-5 w-5' />

          <p className='font-medium'>Kan starte</p>
        </div>
        <p>
          {kandidatData.oppstartKode
            ? (oppstartskoder[kandidatData.oppstartKode]?.label ?? '-')
            : '-'}
        </p>
      </div>
    </InfoBoks>
  );
};

export default OversiktJobbØnsker;
