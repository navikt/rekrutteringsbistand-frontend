import { format } from 'date-fns';

export const formatterDato = (datoSomStreng: string): string => {
  const dato = new Date(datoSomStreng);
  return format(dato, 'dd.MM.yyyy');
};

export const formatterTidspunkt = (datoSomStreng: string): string => {
  const dato = new Date(datoSomStreng);
  return format(dato, 'HH:mm');
};
