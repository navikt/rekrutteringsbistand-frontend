'use client';

import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import SWRLaster from '@/components/SWRLaster';
import TekstMedIkon from '@/components/TekstMedIkon';
import { getWorkLocationsAsString } from '@/util/locationUtil';
import {
  Buildings3Icon,
  ClockIcon,
  LocationPinIcon,
  PercentIcon,
} from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
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
            <div>
              {stillingsData.stilling.annonsenr && (
                <BodyShort size='small' textColor='subtle'>
                  Id {stillingsData.stilling.annonsenr}
                </BodyShort>
              )}
            </div>
            <div className='flex flex-col gap-4 sm:flex-row sm:gap-8'>
              <div className='flex-1 space-y-4'>
                <TekstMedIkon
                  tekst={lokasjon || '-'}
                  ikon={<LocationPinIcon />}
                />
                <TekstMedIkon
                  tekst={(() => {
                    const verdi =
                      egenskaper?.jobpercentage ??
                      egenskaper?.jobpercentagerange;
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
              </div>
              <div className='flex-1 space-y-4'>
                <TekstMedIkon
                  tekst={`${egenskaper?.engagementtype ?? '-'} ${egenskaper?.extent ? `- ${egenskaper.extent}` : ''}`}
                  ikon={<ClockIcon />}
                />
                <TekstMedIkon
                  tekst={
                    egenskaper?.sector ? `${egenskaper.sector} sektor` : '-'
                  }
                  ikon={<Buildings3Icon />}
                />
              </div>
            </div>
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default FormidlingDetaljer;
