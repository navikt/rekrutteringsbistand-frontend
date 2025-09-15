import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const OSLO_TZ = 'Europe/Oslo';
const TIME_REGEX = /^([01]?\d|2[0-3]):([0-5]\d)$/;

export const toIso = (d?: Date | null, t?: string | null): string | null => {
  if (!d) return null;
  const time = (t ?? '').trim();
  if (!TIME_REGEX.test(time)) return null;
  const [hh, mm] = time.split(':').map(Number);

  const local = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    hh,
    mm,
    0,
    0,
  );
  if (isNaN(local.getTime())) return null;

  return formatInTimeZone(local, OSLO_TZ, "yyyy-MM-dd'T'HH:mm:ssXXX");
};

export const formatIso = (iso?: string | null) =>
  iso ? format(parseISO(iso), 'dd.MM.yyyy HH:mm') : '';

export const formaterKlokkeslett = (dato: Date | null): string =>
  dato ? format(dato, 'HH:mm') : '';
