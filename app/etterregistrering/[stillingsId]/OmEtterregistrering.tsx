'use client';

import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingInkludering from '@/app/stilling/[stillingsId]/_ui/om-stillingen/StillingSidebar/StillingInkludering';
import capitalizeEmployerName from '@/app/stilling/_util/stilling-util';
import InfoBoks from '@/components/InfoBoks';
import TekstMedIkon from '@/components/TekstMedIkon';
import { getWorkLocationsAsString } from '@/util/locationUtil';
import {
  BriefcaseIcon,
  Buildings2Icon,
  CalendarIcon,
  ClockIcon,
  LocationPinIcon,
  PercentIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';

export default function OmEtterregistrering() {
  const { stillingsData } = useStillingsContext();
  const egenskaper = stillingsData?.stilling?.properties;

  const yrkestittel =
    stillingsData?.stilling?.categoryList?.find(
      (c) => c.categoryType === 'STYRK08',
    )?.name ?? stillingsData?.stilling?.title;

  const virksomhet = capitalizeEmployerName(
    stillingsData?.stilling?.employer?.name ?? null,
  );

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
            tekst={yrkestittel ?? '-'}
            ikon={<BriefcaseIcon />}
            subtle='Yrkestittel'
            splitSubtle
          />
          <TekstMedIkon
            tekst={virksomhet ?? '-'}
            ikon={<Buildings2Icon />}
            subtle='Virksomhet'
            splitSubtle
          />
          <TekstMedIkon
            tekst={egenskaper?.sector ?? '-'}
            ikon={<Buildings2Icon />}
            subtle='Sektor'
            splitSubtle
          />
          <TekstMedIkon
            tekst={egenskaper?.engagementtype ?? '-'}
            ikon={<ClockIcon />}
            subtle='Ansettelsesform'
            splitSubtle
          />
          <TekstMedIkon
            tekst={egenskaper?.workhours ?? null}
            ikon={<CalendarIcon />}
            subtle='Arbeidstidsordning'
            splitSubtle
            hideIfEmpty
          />
          <TekstMedIkon
            tekst={egenskaper?.extent ?? '-'}
            ikon={<PercentIcon />}
            subtle='Omfang'
            splitSubtle
          />
          <TekstMedIkon
            tekst={lokasjon ?? '-'}
            ikon={<LocationPinIcon />}
            subtle='Sted'
            splitSubtle
          />
        </div>
        <StillingInkludering />
      </div>
    </InfoBoks>
  );
}
