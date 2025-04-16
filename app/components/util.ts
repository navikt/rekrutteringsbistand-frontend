import { format, isValid, parse } from 'date-fns';
import { nb } from 'date-fns/locale';

const parseNorskDato = (dateString: string | undefined | null) => {
  if (!dateString) return null;

  if (isValid(new Date(dateString))) {
    return new Date(dateString);
  }
  try {
    const parsedDate = parse(dateString, 'dd.MM.yyyy', new Date(), {
      locale: nb,
    });
    return isValid(parsedDate) ? parsedDate : null;
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
  const datoFormat = kortDato ? 'dd MMM yyyy' : 'dd MMMM yyyy';

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

  return '-';
};
