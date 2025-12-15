import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

export const formaterTidspunkt = (datoSomStreng?: string | null) => {
  if (!datoSomStreng) return null;
  try {
    const date = new Date(datoSomStreng);
    return format(date, 'HH:mm', { locale: nb });
  } catch {
    return null;
  }
};

export const formaterDatoUtskrevetMåned = (datoSomStreng?: string | null) => {
  if (!datoSomStreng) return null;
  try {
    const date = new Date(datoSomStreng);
    return format(date, 'dd. MMMM yyyy', { locale: nb });
  } catch {
    return null;
  }
};

export const formaterDato = (datoSomStreng?: string | null) => {
  if (!datoSomStreng) return null;
  try {
    const date = new Date(datoSomStreng);
    return format(date, 'dd.MM.yyyy', { locale: nb });
  } catch {
    return null;
  }
};

export const formaterDatoUkedag = (datoSomStreng?: string | null) => {
  if (!datoSomStreng) return null;
  try {
    const date = new Date(datoSomStreng);
    return format(date, 'EEEE dd. MMMM yyyy', { locale: nb });
  } catch {
    return null;
  }
};

export const formaterKlokkeslett = (dato?: Date | null) => {
  if (!dato || isNaN(dato.getTime())) return null;
  try {
    return format(dato, 'HH:mm');
  } catch {
    return null;
  }
};
