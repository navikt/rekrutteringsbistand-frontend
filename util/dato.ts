import {
  format,
  formatISO,
  lastDayOfMonth,
  parse,
  startOfMonth,
} from 'date-fns';
import { nb } from 'date-fns/locale';

export const formaterTilISODato = (datoString?: string) => {
  if (!datoString) return null;
  const dato = parse(datoString, 'dd-MM-yyyy', new Date());
  return formatISO(dato);
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
