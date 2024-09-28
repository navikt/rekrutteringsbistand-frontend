'use client';
import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  LocationPinIcon,
  PersonGroupIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import TekstMedIkon from '../../../../components/TekstMedIkon';
import { getWorkLocationsAsString } from '../../../../util/locationUtil';
import { useAntallKandidater } from '../../../api/kandidat/useAntallKandidater';
import { LocationListDTO } from '../../stilling-typer';
import { useStillingsContext } from '../StillingsContext';
import OmAnnonsen from '../components/OmAnnonsen';
import OmBedriften from '../components/OmBedriften';
import StillingSidebar from './StillingSidebar/StillingSidebar';
import StillingsTekst from './StillingsTekst';

const OmStillingen: React.FC = () => {
  const { stillingsData, kandidatlisteId } = useStillingsContext();
  const antallKandidaterSWR = useAntallKandidater(kandidatlisteId);

  const lokasjon = getWorkLocationsAsString(
    stillingsData.stilling.locationList as LocationListDTO,
  );

  const parseWorktime = (worktime: string) => {
    // We need this check in case of old workhour/-day property values, formatted like 'Opt1 Opt2'
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
    jobtitle,
    engagementtype,
    extent,
    positioncount,
    sector,
    workday,
    workhours,
    applicationdue,
    // jobarrangement,
    // starttime,
  } = stillingsData.stilling.properties as any; //todo
  return (
    <div className='mt-10'>
      <div className=' flex flex-col gap-y-8 gap-x-[3.5rem] md:flex-row'>
        <div className='w-full '>
          <Heading size='large'>Om stillingen</Heading>

          <div className='mt-4'>
            <div className='grid grid-cols-3 gap-4'>
              <TekstMedIkon tekst={`${lokasjon}`} ikon={<LocationPinIcon />} />
              <TekstMedIkon
                tekst={`${engagementtype ?? '-'}, ${extent ?? '-'}`}
                ikon={<ClockIcon />}
              />
              <TekstMedIkon tekst='' ikon={<CalendarIcon />} />
              <TekstMedIkon
                tekst={`${parseWorktime(workday)}, ${parseWorktime(workhours)}`}
                ikon={<HourglassIcon />}
              />
              <TekstMedIkon tekst={applicationdue} ikon={<TimerStartIcon />} />
              <TekstMedIkon
                tekst={`${antallKandidaterSWR.data?.antallKandidater ?? '-'} kandidater`}
                ikon={<PersonGroupIcon />}
              />
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
        <StillingSidebar />
      </div>
    </div>
  );
};

export default OmStillingen;