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
): string => {
  if (!(fraDato && tilDato)) return '';

  const start = setTime(new Date(fraDato), {
    hours: parseInt(fraTid.slice(0, 2), 10),
    minutes: parseInt(fraTid.slice(3), 10),
  });
  const end = setTime(new Date(tilDato), {
    hours: parseInt(tilTid.slice(0, 2), 10),
    minutes: parseInt(tilTid.slice(3), 10),
  });

  if (isSameDay(start, end)) {
    const min = differenceInMinutes(end, start);
    const h = Math.floor(Math.abs(min) / 60);
    const m = Math.abs(min) % 60;
    const sign = min < 0 ? '-' : '';

    if (min === 0) return '0 min';

    let durationString = '';
    if (h > 0) {
      durationString += `${h} t`;
    }
    if (m > 0) {
      durationString += `${h > 0 ? ' ' : ''}${m} min`;
    }
    return `${sign}${durationString}`;
  }

  const d = differenceInCalendarDays(end, start);
  const daysDisplay = d >= 0 ? d + 1 : d;

  if (daysDisplay === 0 && !isSameDay(start, end)) return '';

  return `${daysDisplay} dag${Math.abs(daysDisplay) !== 1 ? 'er' : ''}`;
};
