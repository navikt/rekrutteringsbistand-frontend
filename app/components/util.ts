import { format, isValid, parse, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

const parseNorskDato = (
  dateString: string | Date | undefined | null,
): Date | null => {
  if (!dateString) return null;

  if (dateString instanceof Date) {
    return isValid(dateString) ? dateString : null;
  }

  if (typeof dateString !== 'string') {
    return null;
  }

  // 1. Prøv å parse 'dd.MM.yyyy'
  let parsedDate = parse(dateString, 'dd.MM.yyyy', new Date(), {
    locale: nb,
  });
  if (isValid(parsedDate)) {
    return parsedDate;
  }

  // 2. Prøv å parse ISO 8601-formater (håndterer '2025-05-16T10:18:00.069088026')
  // parseISO er generelt robust for disse.
  parsedDate = parseISO(dateString);
  if (isValid(parsedDate)) {
    return parsedDate;
  }

  // 3. Prøv å bruke JavaScript's innebygde Date-konstruktør
  // Dette var en del av den opprinnelige logikken. parseISO er vanligvis foretrukket for ISO-strenger.
  const genericDate = new Date(dateString);
  if (isValid(genericDate)) {
    return genericDate;
  }

  return null;
};

type FormaterNorskDatoProps = {
  dato: string | Date | undefined | null;
  visning?: 'kortMåned' | 'tall';
  visTid?: boolean;
};

export const formaterNorskDato = (
  props: FormaterNorskDatoProps,
): string | null => {
  // Simplified return type to string | null
  const { dato, visning, visTid } = props;
  const parsedDato = parseNorskDato(dato);

  if (!parsedDato && typeof dato === 'string') {
    return dato;
  }

  if (!parsedDato) {
    return null;
  }

  const getBaseDateFormat = () => {
    if (visning === 'kortMåned') {
      return 'd. MMM yyyy';
    }
    if (visning === 'tall') {
      return 'dd.MM.yy';
    }
    return 'd. MMMM yyyy';
  };

  const baseFormat = getBaseDateFormat();
  const finalFormat = visTid ? `${baseFormat} 'kl.' HH:mm` : baseFormat;

  return format(parsedDato, finalFormat, { locale: nb });
};
