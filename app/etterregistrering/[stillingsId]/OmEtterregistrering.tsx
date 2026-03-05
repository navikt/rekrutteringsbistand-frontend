'use client';

import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingInkludering from '@/app/stilling/[stillingsId]/_ui/om-stillingen/StillingSidebar/StillingInkludering';
import { parseJsonArray } from '@/app/stilling/_util/parsJsonArray';
import InfoBoks from '@/components/InfoBoks';
import TekstMedIkon from '@/components/TekstMedIkon';
import { getWorkLocationsAsString } from '@/util/locationUtil';
import {
  CalendarIcon,
  ClockIcon,
  LocationPinIcon,
  PercentIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';

export default function OmEtterregistrering() {
  const { stillingsData } = useStillingsContext();

  const stillingEgenskaper = stillingsData?.stilling?.properties;
  const lokasjon = getWorkLocationsAsString(
    stillingsData.stilling.locationList as GeografiDTO[],
  );

  return (
    <InfoBoks>
      <div className='space-y-5'>
        <Heading size='small' level='3'>
          Om etterregistreringen
        </Heading>
        <div className='grid grid-cols-2 gap-4'>
          <TekstMedIkon
            // Lokasjon
            tekst={lokasjon ?? '-'}
            ikon={<LocationPinIcon />}
          />
          <TekstMedIkon
            // Ansettelsesform
            tekst={`${stillingEgenskaper?.engagementtype ?? '-'} ${stillingEgenskaper?.extent ? `- ${stillingEgenskaper.extent}` : ''}`}
            ikon={<ClockIcon />}
          />
          <TekstMedIkon
            // Prosent stilling
            tekst={(() => {
              const verdi =
                stillingEgenskaper?.jobpercentage ??
                stillingEgenskaper?.jobpercentagerange;
              if (!verdi) {
                return stillingEgenskaper?.extent === 'Heltid'
                  ? '100% stilling'
                  : '- stilling';
              }
              return verdi.toString().includes('%')
                ? `${verdi} stilling`
                : `${verdi}% stilling`;
            })()}
            ikon={<PercentIcon />}
          />
          <TekstMedIkon
            // Arbeidstid
            tekst={`${stillingEgenskaper?.workday ? parseJsonArray(stillingEgenskaper.workday) : '-'} ${stillingEgenskaper?.workhours ? `- ${parseJsonArray(stillingEgenskaper.workhours)}` : ''}`}
            ikon={<CalendarIcon />}
          />
          <StillingInkludering />
        </div>
      </div>
    </InfoBoks>
  );
}
