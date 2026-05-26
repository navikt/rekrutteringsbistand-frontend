import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import InfoBoks from '@/components/InfoBoks';
import {
  BriefcaseClockIcon,
  ClockIcon,
  LocationPinIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
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
      <BodyShort className='py-4'>
        {kandidatData.yrkeJobbonskerObj
          ?.map((yrke) => yrke?.styrkBeskrivelse)
          .join(', ') ?? '-'}
      </BodyShort>

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center'>
          <LocationPinIcon className='mr-2 h-5 w-5' />
          <Label as='p'>Sted</Label>
        </div>
        <BodyShort>
          {kandidatData.geografiJobbonsker
            ?.map((geografi) => geografi.geografiKodeTekst)
            .join(', ') ?? '-'}
        </BodyShort>
        <div className='flex items-center'>
          <BriefcaseClockIcon className='mr-2 h-5 w-5' />
          <Label as='p'>Heltid/deltid</Label>{' '}
        </div>
        <BodyShort>
          {kandidatData.omfangJobbonskerObj
            ?.map((omfang) => omfang?.omfangKodeTekst ?? '-')
            .join(', ') ?? '-'}
        </BodyShort>

        <div className='flex items-center'>
          <ClockIcon className='mr-2 h-5 w-5' />
          <Label as='p'>Arbeidstid</Label>{' '}
        </div>
        <BodyShort>
          {kandidatData.arbeidstidJobbonskerObj
            ?.map((arbeidstid) => arbeidstid?.arbeidstidKodeTekst ?? '-')
            .join(', ') ?? '-'}
        </BodyShort>

        <div className='flex items-center'>
          <TimerStartIcon className='mr-2 h-5 w-5' />

          <Label as='p'>Kan starte</Label>
        </div>
        <BodyShort>
          {kandidatData.oppstartKode
            ? (oppstartskoder[kandidatData.oppstartKode]?.label ?? '-')
            : '-'}
        </BodyShort>
      </div>
    </InfoBoks>
  );
};

export default OversiktJobbØnsker;
