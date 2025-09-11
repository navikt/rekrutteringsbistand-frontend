'use client';

import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FinnKandidaterKnapp from '@/app/stilling/[stillingsId]/_ui/FinnKandidaterKnapp';
import LeggTilKandidatTilStilling from '@/app/stilling/[stillingsId]/_ui/LeggTilKandidatTilStilling';
import OmAnnonsen from '@/app/stilling/[stillingsId]/_ui/OmAnnonsen';
import OmBedriften from '@/app/stilling/[stillingsId]/_ui/OmBedriften';
import OmStillingBoks from '@/app/stilling/[stillingsId]/_ui/OmStillingBoks';
import TekstMedIkon from '@/components/felles/TekstMedIkon';
import VisEditorTekst from '@/components/felles/rikteksteditor/VisEditorTekst';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { getWorkLocationsAsString } from '@/util/locationUtil';
import { RekbisError } from '@/util/rekbisError';
import { formaterNorskDato } from '@/util/util';
import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  LocationPinIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import * as React from 'react';

export const parseWorktime = (worktime: string) => {
  if (!worktime) return '';
  const trimmed = worktime.trim();

  // Bare forsøk å parse hvis det ser ut som et JSON-array
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean).join(' ');
      }
    } catch (error) {
      // Skjul logging siden dette kan være forventet feilformat
      new RekbisError({
        message: 'Feil ved parseWorktime',
        error,
        details: `worktime=${worktime}`,
        skjulLogger: true,
      });
    }
  }

  // Fallback: returner original tekst (f.eks. "Dagtid")
  return worktime;
};

export interface OmStillingenProps {
  forhåndsvisData?: boolean;
  printRef: React.RefObject<HTMLDivElement | null> | null;
}

export default function OmStillingen({ printRef }: OmStillingenProps) {
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();

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
    <div data-testid='om-stillingen'>
      {kandidatlisteInfo?.kandidatlisteId && (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
          ]}
        >
          <div className='grid grid-cols-2 gap-4 mb-6'>
            <FinnKandidaterKnapp stillingId={stillingsData.stilling.uuid} />

            <LeggTilKandidatTilStilling
              stillingsId={stillingsData.stilling.uuid}
              stillingsTittel={stillingsData.stilling.title}
            />
          </div>
        </TilgangskontrollForInnhold>
      )}
      <div className='flex flex-col gap-x-[3.5rem] gap-y-8 md:flex-row'>
        <div className='w-full' id='print-content' ref={printRef}>
          <div className='flex flex-col'>
            <OmStillingBoks
              tittel='Om jobben'
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
      </div>
    </div>
  );
}
