import { Stillingskategori } from '../../../stilling/stilling-typer';

export const esKategoriFormidling = () => {
  return [{ term: { 'stillingsinfo.stillingskategori': 'FORMIDLING' } }];
};

export const esKategori = (kategori: string[]) => {
  const filter = [];

  if (
    kategori.length === 0 ||
    (kategori.includes(Stillingskategori.Stilling) &&
      kategori.includes(Stillingskategori.Jobbmesse))
  ) {
    filter.push({
      bool: {
        must_not: [
          {
            term: {
              'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
            },
          },
          {
            term: {
              'stillingsinfo.stillingskategori': 'FORMIDLING',
            },
          },
        ],
      },
    });
  }

  if (kategori.includes(Stillingskategori.Jobbmesse)) {
    filter.push({
      bool: {
        should: [
          {
            term: {
              'stillingsinfo.stillingskategori': 'JOBBMESSE',
            },
          },
        ],
      },
    });
  }

  if (
    kategori.includes(Stillingskategori.Stilling) &&
    !kategori.includes(Stillingskategori.Jobbmesse)
  ) {
    filter.push({
      bool: {
        must_not: [
          {
            term: {
              'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
            },
          },
          {
            term: {
              'stillingsinfo.stillingskategori': 'JOBBMESSE',
            },
          },
          {
            term: {
              'stillingsinfo.stillingskategori': 'FORMIDLING',
            },
          },
        ],
      },
    });
  }

  return filter;
};
