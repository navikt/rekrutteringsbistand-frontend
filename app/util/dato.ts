import { format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { nb } from 'date-fns/locale';

export const visDato = (dato: Date) => format(new Date(dato), 'dd.MM.yyyy');
export const visDatoMedMåned = (dato: Date) =>
  format(new Date(dato), 'dd.MMMM yyyy', { locale: nb });

export const sisteDagIMåned = (dato: Date) => lastDayOfMonth(dato);

export const førsteDagIMåned = (dato: Date) => startOfMonth(dato);
