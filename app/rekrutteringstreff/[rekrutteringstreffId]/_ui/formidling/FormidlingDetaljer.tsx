'use client';

import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { parseJsonArray } from '@/app/stilling/_util/parsJsonArray';
import SWRLaster from '@/components/SWRLaster';
import TekstMedIkon from '@/components/TekstMedIkon';
import { getWorkLocationsAsString } from '@/util/locationUtil';
import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  LocationPinIcon,
  PercentIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  stillingId: string;
}

const FormidlingDetaljer: FC<Props> = ({ stillingId }) => {
  const stillingHook = useStilling(stillingId);

  return (
    <SWRLaster hooks={[stillingHook]}>
      {(stillingsData) => {
        const egenskaper = stillingsData.stilling?.properties;
        const lokasjon = getWorkLocationsAsString(
          stillingsData.stilling.locationList as GeografiDTO[],
        );

        return (
          <div className='space-y-4'>
            <Heading size='xsmall' level='4'>
              {stillingsData.stilling.title || 'Stilling'}
            </Heading>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <TekstMedIkon
                tekst={lokasjon || '-'}
                ikon={<LocationPinIcon />}
              />
              <TekstMedIkon
                tekst={`${egenskaper?.engagementtype ?? '-'} ${egenskaper?.extent ? `- ${egenskaper.extent}` : ''}`}
                ikon={<ClockIcon />}
              />
              <TekstMedIkon
                tekst={(() => {
                  const verdi =
                    egenskaper?.jobpercentage ?? egenskaper?.jobpercentagerange;
                  if (!verdi) {
                    return egenskaper?.extent === 'Heltid'
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
                tekst={`${egenskaper?.workday ? parseJsonArray(egenskaper.workday) : '-'} ${egenskaper?.workhours ? `- ${parseJsonArray(egenskaper.workhours)}` : ''}`}
                ikon={<CalendarIcon />}
              />
              <TekstMedIkon
                tekst={
                  stillingsData.stilling.employer?.name ||
                  stillingsData.stilling.businessName ||
                  '-'
                }
                ikon={<BriefcaseIcon />}
              />
            </div>
            {egenskaper?.positioncount && (
              <BodyShort size='small' textColor='subtle'>
                Antall stillinger: {egenskaper.positioncount}
              </BodyShort>
            )}
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default FormidlingDetaljer;
