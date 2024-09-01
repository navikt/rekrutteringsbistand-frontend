import { startOfDay } from 'date-fns';
import { AdminStatus, Status, Stillingskategori } from './stilling-typer';

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
