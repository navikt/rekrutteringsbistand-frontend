import { format } from 'date-fns';

export const toIso = (d: Date, t: string) => {
  const [h, m] = t.split(':').map(Number);
  const local = new Date(d);
  local.setHours(h, m, 0, 0);
  return format(local, "yyyy-MM-dd'T'HH:mm:ssxxx");
};

export const formaterKlokkeslett = (dato: Date | null): string =>
  dato ? format(dato, 'HH:mm') : '';
