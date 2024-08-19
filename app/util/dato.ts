import { format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { nb } from 'date-fns/locale';

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
