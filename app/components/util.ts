import { format, isValid, parse } from 'date-fns';
import { nb } from 'date-fns/locale';

const parseNorskDato = (dateString: string | undefined | null) => {
  if (!dateString) return null;

  try {
    // Prøv først norsk format
    const parsedDate = parse(dateString, 'dd.MM.yyyy', new Date(), {
      locale: nb,
    });

    if (isValid(parsedDate)) {
      return parsedDate;
    }

    // prøv standard ISO hvis det feiler
    const isoDate = new Date(dateString);
    return isValid(isoDate) ? isoDate : null;
  } catch {
    return dateString;
  }
};

export const formaterNorskDato = (
  dato: string | undefined | null,
  kortDato: boolean | undefined | null = false,
  visTid: boolean | undefined | null = false,
) => {
  const parsedDato = parseNorskDato(dato);
  const datoFormat = kortDato ? 'd MMM yyyy' : 'd MMMM yyyy';

  if (parsedDato && isValid(parsedDato)) {
    const formattedDate = format(parsedDato, datoFormat, { locale: nb });
    return visTid
      ? `${formattedDate} ${format(parsedDato, 'dd MMMM yyyy HH:mm', { locale: nb })}`
      : formattedDate;
  }

  // if parsedDato is string, return it directly
  if (typeof parsedDato === 'string') {
    return parsedDato;
  }

  return dato;
};
