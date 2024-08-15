import { Nyhet } from './Nyheter';

const tilDato = (
  dag: number,
  måned: number,
  år: number,
  timer = 0,
  minutter = 0
) => new Date(år, måned - 1, dag, timer, minutter);

const nyhetssaker: Nyhet[] = [
  {
    dato: tilDato(13, 6, 2024),
    tittel: 'Ny tilgangsstyring',
    innhold: (
      <>
        <p>Det er ny tilgangsstyring for Rekrutteringsbistand fra 13. juni.</p>
        <p>
          <a
            target='_blank'
            href='https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Tilgangskontroll.aspx'
            rel='noreferrer'
          >
            Se info her
          </a>
        </p>
      </>
    ),
  },
];

export default nyhetssaker;
