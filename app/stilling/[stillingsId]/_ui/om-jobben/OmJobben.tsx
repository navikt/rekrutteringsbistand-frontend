'use client';
import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import InfoBoks from '@/components/InfoBoks';
import TekstMedIkon from '@/components/TekstMedIkon';
import VisEditorTekst from '@/components/rikteksteditor/VisEditorTekst';
import { formaterNorskDato } from '@/util/dato';
import { getWorkLocationsAsString } from '@/util/locationUtil';
import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  LanguageIcon,
  LocationPinIcon,
  PercentIcon,
  TimerStartIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';

const parseJsonArray = (
  value: string | null | undefined,
  separator = ', ',
): string => {
  if (!value) return '';
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.filter(Boolean).join(separator);
    } catch {
      /* ignore */
    }
  }
  return value;
};

export default function OmJobben() {
  const { stillingsData } = useStillingsContext();

  const stillingEgenskaper = stillingsData?.stilling?.properties;

  const lokasjon = getWorkLocationsAsString(
    stillingsData.stilling.locationList as GeografiDTO[],
  );

  return (
    <InfoBoks>
      <div data-testid='om-stillingen' className='space-y-5'>
        <Heading size='small' level='3'>
          Om jobben
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
            // Arbeidstid
            tekst={`${stillingEgenskaper?.workday ? parseJsonArray(stillingEgenskaper.workday) : '-'} ${stillingEgenskaper?.workhours ? `- ${parseJsonArray(stillingEgenskaper.workhours)}` : ''}`}
            ikon={<CalendarIcon />}
          />
          <TekstMedIkon
            // Antall stillinger
            tekst={`${stillingEgenskaper?.positioncount ?? '-'} stillinger`}
            ikon={<BriefcaseIcon />}
          />

          <TekstMedIkon
            // Prosent stilling
            tekst={`${stillingEgenskaper?.jobpercentage ?? stillingEgenskaper?.jobpercentagerange ?? '-'}% stilling`}
            ikon={<PercentIcon />}
          />

          <TekstMedIkon
            // Oppstart
            tekst={`Oppstart ${
              stillingEgenskaper?.starttime
                ? (() => {
                    const parsedDate = formaterNorskDato({
                      dato: stillingEgenskaper.starttime,
                    });
                    return parsedDate
                      ? parsedDate
                      : stillingEgenskaper.starttime.toLowerCase();
                  })()
                : '-'
            }`}
            ikon={<TimerStartIcon />}
          />
          <TekstMedIkon
            // Språk
            tekst={`${stillingEgenskaper?.workLanguage ? parseJsonArray(stillingEgenskaper.workLanguage) : '-'}`}
            ikon={<LanguageIcon />}
          />
          <TekstMedIkon
            // Søknadsfrist
            tekst={`Søknadsfrist ${
              stillingEgenskaper?.applicationdue
                ? (() => {
                    const parsedDate = formaterNorskDato({
                      dato: stillingEgenskaper.applicationdue,
                    });
                    return parsedDate
                      ? parsedDate
                      : stillingEgenskaper.applicationdue.toLowerCase();
                  })()
                : '-'
            }`}
            ikon={<HourglassIcon />}
          />
        </div>
        <VisEditorTekst htmlTekst={stillingsData.stilling.properties?.adtext} />
      </div>
    </InfoBoks>
  );
}
