'use client';

import { getWorkLocationsAsString } from '../../../../util/locationUtil';
import { GeografiDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import TekstMedIkon from '../../../components/TekstMedIkon';
import VisEditorTekst from '../../../components/rikteksteditor/VisEditorTekst';
import { formaterNorskDato } from '../../../components/util';
import { useStillingsContext } from '../StillingsContext';
import OmAnnonsen from '../components/OmAnnonsen';
import OmBedriften from '../components/OmBedriften';
import OmStillingBoks from '../components/OmStillingBoks';
import StillingSidebar from './StillingSidebar/StillingSidebar';
import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  LocationPinIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

export const parseWorktime = (worktime: string) => {
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

const OmStillingen: React.FC<{ forhåndsvisData?: boolean }> = ({
  forhåndsvisData,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const { stillingsData, erFormidling } = useStillingsContext();

  const lokasjon = getWorkLocationsAsString(
    stillingsData.stilling.locationList as GeografiDTO[],
  );

  const {
    engagementtype,
    extent,
    workday,
    workhours,
    applicationdue,
    starttime,
  } = stillingsData.stilling.properties as any;

  return (
    <div className='mt-10' data-testid='om-stillingen'>
      <div className='flex flex-col gap-x-[3.5rem] gap-y-8 md:flex-row'>
        <div className='w-full' id='print-content' ref={contentRef}>
          <div className='flex flex-col'>
            <OmStillingBoks
              tittel='Om stillingen'
              innholdTopp
              innhold={
                <VisEditorTekst
                  htmlTekst={stillingsData.stilling.properties?.adtext}
                />
              }
              gridInnhold={
                <>
                  <TekstMedIkon
                    // Lokasjon
                    tekst={lokasjon ?? '-'}
                    ikon={<LocationPinIcon />}
                  />
                  <TekstMedIkon
                    // Ansettelsesform
                    tekst={`${engagementtype ?? '-'} ${extent ? `- ${extent}` : ''}`}
                    ikon={<ClockIcon />}
                  />
                  <TekstMedIkon
                    // Arbeidstid
                    tekst={`${workday ? parseWorktime(workday) : '-'} ${workhours ? `- ${parseWorktime(workhours)}` : ''}`}
                    ikon={<CalendarIcon />}
                  />
                  <TekstMedIkon
                    // Søknadsfrist
                    tekst={`Søknadsfrist ${
                      applicationdue
                        ? (() => {
                            const parsedDate = formaterNorskDato({
                              dato: applicationdue,
                            });
                            return parsedDate
                              ? parsedDate
                              : applicationdue.toLowerCase();
                          })()
                        : '-'
                    }`}
                    ikon={<HourglassIcon />}
                  />
                  <TekstMedIkon
                    // Oppstart
                    tekst={`Oppstart ${
                      starttime
                        ? (() => {
                            const parsedDate = formaterNorskDato({
                              dato: starttime,
                            });
                            return parsedDate
                              ? parsedDate
                              : starttime.toLowerCase();
                          })()
                        : '-'
                    }`}
                    ikon={<TimerStartIcon />}
                  />
                </>
              }
            />
            <hr className='border-gray-200 pb-8' />
            <OmBedriften />
            <hr className='border-gray-200 pb-8' />
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
