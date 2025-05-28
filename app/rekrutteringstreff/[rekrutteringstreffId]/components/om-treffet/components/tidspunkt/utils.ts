import { format } from 'date-fns';

export const toIso = (d: Date, t: string) => {
  const [h, m] = t.split(':').map(Number);
  const copy = new Date(d);
  copy.setHours(h, m, 0, 0);
  return copy.toISOString();
};

export const formaterKlokkeslett = (dato: Date | null): string =>
  dato ? format(dato, 'HH:mm') : '';
