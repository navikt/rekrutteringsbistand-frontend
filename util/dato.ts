import { format, lastDayOfMonth, parse, startOfMonth } from 'date-fns';
import { nb } from 'date-fns/locale';

export const formaterTilISODato = (dato: string | null) => {
  if (!dato) return null;

  try {
    const now = new Date();
    const parsedDate = parse(dato, 'dd-MM-yyyy', new Date());

    parsedDate.setHours(now.getHours());
    parsedDate.setMinutes(now.getMinutes());
    parsedDate.setSeconds(now.getSeconds());
    parsedDate.setMilliseconds(now.getMilliseconds());

    const formatertDato = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    return formatertDato;
  } catch (e) {
    return null;
  }
};

export const visDato = (dato: Date) => format(new Date(dato), 'dd.MM.yyyy');
export const visDatoMedMåned = (dato: Date) =>
  format(new Date(dato), 'dd.MMMM yyyy', { locale: nb });

export const sisteDagIMåned = (dato: Date) => lastDayOfMonth(dato);

export const førsteDagIMåned = (dato: Date) => startOfMonth(dato);

export const formaterDatoTilApi = (dato: Date): string => {
  const dag = medNull(dato.getDate());
  const måned = medNull(dato.getMonth() + 1);
  const år = dato.getFullYear();

  return `${år}-${måned}-${dag}`;
};

const medNull = (n: number) => (n < 10 ? '0' + n : n);

export const konverterTilPresenterbarDato = (
  datoString?: string | null,
): string => {
  if (!datoString) return '';
  if (datoString === 'snarest') return datoString;

  const presentarbarDatoString = new Date(
    datoString as string,
  ).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return presentarbarDatoString === 'Invalid Date'
    ? datoString
    : presentarbarDatoString;
};
