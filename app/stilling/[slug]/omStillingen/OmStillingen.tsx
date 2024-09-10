import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  LocationPinIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import * as React from 'react';
import TekstMedIkon from '../../../../components/TekstMedIkon';
import { LocationListDTO, stillingsDataDTO } from '../../stilling-typer';

import { Heading } from '@navikt/ds-react';
import { getWorkLocationsAsString } from '../../../../util/locationUtil';
import OmAnnonsen from '../components/OmAnnonsen';
import OmBedriften from '../components/OmBedriften';
import StillingStatus from '../components/StillingStatus';
import StillingSidebar from './StillingSidebar/StillingSidebar';
import StillingsTekst from './StillingsTekst';
export interface IOmStillingen {
  stillingsData: stillingsDataDTO;
  kandidatlisteId?: string;
}

const OmStillingen: React.FC<IOmStillingen> = ({
  stillingsData,
  kandidatlisteId,
}) => {
  const lokasjon = getWorkLocationsAsString(
    stillingsData.stilling.locationList as LocationListDTO,
  );
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
          <div className='mb-4'>
            <StillingStatus />
          </div>
          <Heading size='large'>Om stillingen</Heading>

          <div className='mt-4'>
            <div className='grid grid-cols-3 gap-4'>
              <TekstMedIkon
                tekst={lokasjon ?? '-'}
                ikon={<LocationPinIcon />}
              />
              <TekstMedIkon
                tekst={engagementtype ?? '-'}
                ikon={<ClockIcon />}
              />
              <TekstMedIkon tekst={extent} ikon={<CalendarIcon />} />
              <TekstMedIkon tekst={applicationdue} ikon={<HourglassIcon />} />
              <TekstMedIkon tekst='TBD' ikon={<TimerStartIcon />} />
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
