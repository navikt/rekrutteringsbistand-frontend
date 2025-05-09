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

type FormaterNorskDatoProps = {
  dato: string | undefined | null;
  visning?: 'kortMåned' | 'tall';
  visTid?: boolean;
};

export const formaterNorskDato = (props: FormaterNorskDatoProps) => {
  const { dato, visning, visTid } = props;
  const parsedDato = parseNorskDato(dato);
  const datoFormat = () => {
    if (visning === 'kortMåned') {
      return 'd MMM yyyy';
    }
    if (visning === 'tall') {
      return 'dd.MM.yy';
    }
    return 'd MMMM yyyy';
  };

  if (parsedDato && isValid(parsedDato)) {
    const formattedDate = format(parsedDato, datoFormat(), { locale: nb });
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
