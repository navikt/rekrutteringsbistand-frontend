'use client';
import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  LocationPinIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { getWorkLocationsAsString } from '../../../../util/locationUtil';
import { GeografiListDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import TekstMedIkon from '../../../components/TekstMedIkon';
import { useStillingsContext } from '../StillingsContext';
import OmAnnonsen from '../components/OmAnnonsen';
import OmBedriften from '../components/OmBedriften';
import AntallKandidater from './AntallKandidater';
import StillingSidebar from './StillingSidebar/StillingSidebar';
import StillingsTekst from './StillingsTekst';

const OmStillingen: React.FC = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const { stillingsData, kandidatlisteId } = useStillingsContext();

  const lokasjon = getWorkLocationsAsString(
    stillingsData.stilling.locationList as GeografiListDTO,
  );

  const parseWorktime = (worktime: string) => {
    let arrayString = '';
    try {
      const jsonArray = JSON.parse(worktime);

      for (let i = 0; i < jsonArray.length; i++) {
        arrayString += `${jsonArray[i]} `;
      }
    } catch (e) {
      arrayString = worktime;
    }

    return arrayString;
  };

  const {
    engagementtype,
    extent,
    workday,
    workhours,
    applicationdue,
    starttime,
  } = stillingsData.stilling.properties as any; //todo

  const formaterTid = (starttime: string) => {
    const date = new Date(starttime);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('nb-NO');
    }

    if (starttime === 'etterAvtale') {
      return 'Etter avtale';
    }
    return starttime;
  };

  return (
    <div className='mt-10'>
      <div className=' flex flex-col gap-y-8 gap-x-[3.5rem] md:flex-row'>
        <div className='w-full' id='print-content' ref={contentRef}>
          <Heading size='large'>Om stillingen</Heading>

          <div className='mt-4'>
            <div className='grid grid-cols-3 gap-4'>
              <TekstMedIkon
                // Lokasjon
                tekst={`${lokasjon}`}
                ikon={<LocationPinIcon />}
              />
              <TekstMedIkon
                // Ansettelsesform
                tekst={`${engagementtype ?? '-'} ${extent ? `, ${extent}` : ''}`}
                ikon={<ClockIcon />}
              />
              <TekstMedIkon
                // Arbeidstid
                tekst={`${workday ? parseWorktime(workday) : '-'} ${workhours ? `, ${parseWorktime(workhours)}` : ''}`}
                ikon={<CalendarIcon />}
              />
              <TekstMedIkon
                // Søknadsfrist
                tekst={formaterTid(applicationdue)}
                ikon={<HourglassIcon />}
              />
              <TekstMedIkon
                // Oppstart
                tekst={formaterTid(starttime)}
                ikon={<TimerStartIcon />}
              />
              <AntallKandidater kandidatlisteId={kandidatlisteId} />
            </div>
          </div>

          <div className='mt-10'>
            <StillingsTekst />
          </div>

          <div className='mt-10'>
            <OmBedriften />
          </div>
          <div className='mt-10'>
            <OmAnnonsen />
          </div>
        </div>
        <StillingSidebar
          printRef={contentRef as React.RefObject<HTMLDivElement>}
        />
      </div>
    </div>
  );
};

export default OmStillingen;
