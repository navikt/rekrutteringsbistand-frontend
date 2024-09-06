import { startOfDay } from 'date-fns';
import {
  AdminStatus,
  Status,
  stillingsDataDTO,
  Stillingskategori,
} from './stilling-typer';

export const kategoriTilVisningsnavn = (kategori: Stillingskategori | null) => {
  switch (kategori) {
    case Stillingskategori.Stilling:
      return 'Stilling';
    case Stillingskategori.Formidling:
      return 'Formidling';
    case Stillingskategori.Arbeidstrening:
      return 'Arbeidstrening';
    case Stillingskategori.Jobbmesse:
      return 'Jobbmesse/jobbtreff';
    default:
      return 'Stilling';
  }
};

const utløperFørIdag = (expires: string | null) => {
  if (expires === null) {
    return false;
  }

  const startenAvDøgnet = startOfDay(new Date());
  return new Date(expires) <= startenAvDøgnet;
};

export const stillingErUtløpt = (stilling: any): boolean => {
  return (
    stilling.publishedByAdmin !== null &&
    stilling.status === Status.Inaktiv &&
    utløperFørIdag(stilling.expires) &&
    stilling.administration?.status === AdminStatus.Done
  );
};

export default function capitalizeEmployerName(text: string | null) {
  const separators = [' ', '-', '(', '/'];

  const ignore = ['i', 'og', 'for', 'på', 'avd', 'av'];

  const keep = ['as', 'ab', 'asa', 'ba', 'sa'];

  if (text) {
    let capitalized = text.toLowerCase();

    for (let i = 0, len = separators.length; i < len; i += 1) {
      const fragments = capitalized.split(separators[i]);
      for (let j = 0, x = fragments.length; j < x; j += 1) {
        if (keep.includes(fragments[j])) {
          fragments[j] = fragments[j].toUpperCase();
        } else if (!ignore.includes(fragments[j])) {
          if (fragments[j][0] !== undefined) {
            fragments[j] =
              fragments[j][0].toUpperCase() + fragments[j].substr(1);
          }
        }
      }
      capitalized = fragments.join(separators[i]);
    }

    return capitalized;
  }
  return text;
}

export const navnEierAvAstilling = (
  stillingsData: stillingsDataDTO,
): string | null => {
  if (stillingsData?.stilling?.administration?.navIdent !== null) {
    return stillingsData?.stilling?.administration?.reportee ?? null;
  }
  return stillingsData?.stillingsinfo.eierNavn ?? null;
};
