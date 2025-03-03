'use client';

import { getWorkLocationsAsString } from '../../../../util/locationUtil';
import { GeografiDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import TekstMedIkon from '../../../components/TekstMedIkon';
import { useStillingsContext } from '../StillingsContext';
import OmAnnonsen from '../components/OmAnnonsen';
import OmBedriften from '../components/OmBedriften';
import OmStillingBoks from '../components/OmStillingBoks';
import AntallKandidater from './AntallKandidater';
import StillingSidebar from './StillingSidebar/StillingSidebar';
import StillingsTekst from './StillingsTekst';
import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  LocationPinIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

const OmStillingen: React.FC<{ forhåndsvisData?: boolean }> = ({
  forhåndsvisData,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const { stillingsData, erFormidling } = useStillingsContext();

  const lokasjon = getWorkLocationsAsString(
    stillingsData.stilling.locationList as GeografiDTO[],
  );

  const parseWorktime = (worktime: string) => {
    let arrayString = '';
    try {
      const jsonArray = JSON.parse(worktime);

      for (let i = 0; i < jsonArray.length; i++) {
        arrayString += `${jsonArray[i]} `;
      }
    } catch (error) {
      logger.error('Failed to parse worktime', error);
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
  } = stillingsData.stilling.properties as any;

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
    <div className='mt-10' data-testid='om-stillingen'>
      <div className='flex flex-col gap-x-[3.5rem] gap-y-8 md:flex-row'>
        <div className='w-full' id='print-content' ref={contentRef}>
          <div className='flex flex-col'>
            <OmStillingBoks
              tittel='Om stillingen'
              innholdTopp
              innhold={<StillingsTekst />}
              gridInnhold={
                <>
                  <TekstMedIkon
                    // Lokasjon
                    tekst={lokasjon ?? '-'}
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
                    tekst={`Søknadsfrist ${applicationdue ? formaterTid(applicationdue)?.toLowerCase() : '-'}`}
                    ikon={<HourglassIcon />}
                  />
                  <TekstMedIkon
                    // Oppstart
                    tekst={`Oppstart ${starttime ? formaterTid(starttime)?.toLowerCase() : '-'}`}
                    ikon={<TimerStartIcon />}
                  />
                  <AntallKandidater />
                </>
              }
            />
            <hr className='border-gray-200' />
            <OmBedriften />
            <hr className='border-gray-200' />
            <OmAnnonsen />
          </div>
        </div>
        {!forhåndsvisData && !erFormidling && (
          <StillingSidebar
            printRef={contentRef as React.RefObject<HTMLDivElement>}
          />
        )}
      </div>
    </div>
  );
};

export default OmStillingen;
