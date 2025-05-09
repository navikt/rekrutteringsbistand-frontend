import {
  differenceInMinutes,
  differenceInCalendarDays,
  isSameDay,
  set as setTime,
} from 'date-fns';

export const rekrutteringstreffVarighet = (
  fraDato: Date | null,
  fraTid: string,
  tilDato: Date | null,
  tilTid: string,
) => {
  if (!(fraDato && tilDato)) return '';

  const start = setTime(new Date(fraDato), {
    hours: +fraTid.slice(0, 2),
    minutes: +fraTid.slice(3),
  });
  const end = setTime(new Date(tilDato), {
    hours: +tilTid.slice(0, 2),
    minutes: +tilTid.slice(3),
  });

  if (isSameDay(start, end)) {
    const min = differenceInMinutes(end, start);
    if (min < 0) return '';
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h} t${m ? ` ${m} min` : ''}` : `${m} min`;
  }

  const d = differenceInCalendarDays(end, start) + 1;
  return d > 0 ? `${d} dager` : '';
};
