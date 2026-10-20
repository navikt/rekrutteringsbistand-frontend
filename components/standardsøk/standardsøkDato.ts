import { NORSK_DATO_FORMAT } from '@/util/dato';
import { format, parseISO } from 'date-fns';

const osloDato = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' });

/** Dagens dato i Oslo som `yyyy-MM-dd`, samme format som backend bruker. */
export const iDagIOslo = () => osloDato.format(new Date());

/** Backend regner ut `slettes`. Et søk er utløpt fra og med den datoen. */
export const erUtløpt = (søk: { slettes: string }) =>
  søk.slettes <= iDagIOslo();

export const formaterStandardsøkDato = (dato: string) =>
  format(parseISO(dato), NORSK_DATO_FORMAT);
