import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { format, isValid, parse, parseISO } from 'date-fns';

// Normaliserer ISO-lik streng: legg til sekunder om mangler, trim fraksjoner > 3 siffer (mikrosek)
const normalizeIso = (value: string) =>
  value
    .replace(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?!:)/, '$1:00')
    .replace(
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\.(\d{3})\d+(.*)$/,
      '$1.$2$3',
    );

// Til skjema (dd.MM.yyyy) fra ISO eller dd.MM.yyyy
const toFormDate = (value?: string | null): string | null => {
  if (!value) return null;
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return value;
  const d = parseISO(normalizeIso(value));
  return isValid(d) ? format(d, 'dd.MM.yyyy') : null;
};

// Til backend-format (yyyy-MM-dd'T'HH:mm:ss) fra dd.MM.yyyy eller ISO
const toBackendDate = (value?: string | null): string | null => {
  if (!value) return null;
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
    const d = parse(value, 'dd.MM.yyyy', new Date());
    return isValid(d) ? format(d, "yyyy-MM-dd'T'00:00:00") : null;
  }
  const dIso = parseISO(normalizeIso(value));
  return isValid(dIso) ? format(dIso, "yyyy-MM-dd'T'HH:mm:ss") : null;
};

const safeParseArray = (val: unknown): string[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === 'string') {
    const t = val.trim();
    if (t.startsWith('[') && t.endsWith(']')) {
      try {
        const parsed = JSON.parse(t);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch {}
    }
    return t ? [t] : [];
  }
  return [];
};

export const mapTilForm = (
  stillingsData: StillingsDataDTO,
): StillingsDataDTO => {
  // Robust parsing: aksepter array, JSON-array-streng eller enkel verdi
  const tags = safeParseArray(stillingsData?.stilling?.properties?.tags);
  const workhours = safeParseArray(
    stillingsData?.stilling?.properties?.workhours,
  );
  const workday = safeParseArray(stillingsData?.stilling?.properties?.workday);

  const søknadsfristVal = stillingsData?.stilling?.properties?.applicationdue;
  const søknadsfristDato =
    søknadsfristVal === 'Snarest'
      ? 'Snarest'
      : toFormDate(
          typeof søknadsfristVal === 'string' ? søknadsfristVal : null,
        );

  const oppstartVal = stillingsData?.stilling?.properties?.starttime;
  const oppstartDato =
    oppstartVal === 'Etter avtale'
      ? 'Etter avtale'
      : toFormDate(typeof oppstartVal === 'string' ? oppstartVal : null);

  return {
    ...stillingsData,
    stilling: {
      ...stillingsData.stilling,
      properties: {
        ...stillingsData.stilling.properties,
        tags: JSON.stringify(tags),
        workhours,
        workday,
        applicationdue: søknadsfristDato ?? null,
        starttime: oppstartDato ?? null,
      },
    },
  };
};

export const mapSendStillingOppdatering = (
  stillingsData: StillingsDataDTO,
): StillingsDataDTO => {
  const publiseringsDato = toBackendDate(stillingsData.stilling?.published);
  const avsluttesDato = toBackendDate(stillingsData.stilling?.expires);

  return {
    ...stillingsData,
    stilling: {
      ...stillingsData.stilling,
      properties: {
        ...stillingsData.stilling.properties,
        tags:
          typeof stillingsData.stilling?.properties?.tags === 'string'
            ? (stillingsData.stilling?.properties?.tags as string)
            : JSON.stringify(stillingsData.stilling?.properties?.tags ?? []),
        workday:
          typeof stillingsData.stilling?.properties?.workday === 'string'
            ? (stillingsData.stilling?.properties?.workday as string)
            : JSON.stringify(stillingsData.stilling?.properties?.workday ?? []),
        workhours:
          typeof stillingsData.stilling?.properties?.workhours === 'string'
            ? (stillingsData.stilling?.properties?.workhours as string)
            : JSON.stringify(
                stillingsData.stilling?.properties?.workhours ?? [],
              ),
      },
      published: publiseringsDato,
      expires: avsluttesDato,
    },
  };
};
