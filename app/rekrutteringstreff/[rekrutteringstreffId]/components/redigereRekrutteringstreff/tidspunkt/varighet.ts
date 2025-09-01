import {
  isSameDay,
  differenceInMinutes,
  differenceInCalendarDays,
} from 'date-fns';

export const rekrutteringstreffVarighet = (
  fraDato: Date | null,
  fraTid: string,
  tilDato: Date | null,
  tilTid: string,
): string => {
  if (!fraDato || !tilDato) return '';

  const lagFullDatoTid = (dato: Date, tid: string): Date => {
    const [timer, minutter] = tid.split(':').map(Number);
    const nyDato = new Date(dato);
    nyDato.setHours(timer, minutter, 0, 0);
    return nyDato;
  };

  const startTidspunkt = lagFullDatoTid(fraDato, fraTid);
  const sluttTidspunkt = lagFullDatoTid(tilDato, tilTid);

  if (isSameDay(startTidspunkt, sluttTidspunkt)) {
    const minuttForskjell = differenceInMinutes(sluttTidspunkt, startTidspunkt);
    if (minuttForskjell === 0) return '0 min';

    const absolutteMinutter = Math.abs(minuttForskjell);
    const timer = Math.floor(absolutteMinutter / 60);
    const minutter = absolutteMinutter % 60;

    const fortegn = minuttForskjell < 0 ? '-' : '';
    const tidsdeler = [];
    if (timer > 0) tidsdeler.push(`${timer} t`);
    if (minutter > 0) tidsdeler.push(`${minutter} min`);

    return `${fortegn}${tidsdeler.join(' ')}`;
  } else {
    const kalenderdagForskjell = differenceInCalendarDays(
      sluttTidspunkt,
      startTidspunkt,
    );

    const antallDager =
      kalenderdagForskjell >= 0
        ? kalenderdagForskjell + 1
        : kalenderdagForskjell;

    return `${antallDager} dag${Math.abs(antallDager) !== 1 ? 'er' : ''}`;
  }
};
