import { Stillingskategori } from '../types/stilling/kategorier';

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
