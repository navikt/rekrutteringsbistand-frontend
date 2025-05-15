/**
 * Nyheter for Rekrutteringsbistand
 */

export interface NyhetDTO {
  dato: string;
  tittel: string;
  beskrivelse: string;
  id: string;
  opprettetAv: string | null;
}

export const nyheter: NyhetDTO[] = [
  {
    dato: '15.05.2025',
    id: '2',
    opprettetAv: null,
    tittel: 'Ny versjon av Rekrutteringsbistand er publisert',
    beskrivelse: 'Ny rekrutteringsbistand-app publisert for beta testing',
  },
  {
    beskrivelse:
      '<p>Det er nå et nytt krav for å være synlig med CV i kandidatsøket i Rekrutteringsbistand. Det nye kravet er at person må opptre i Navs Arbeidssøkerregister. Samtidig opphører krav om at personen må ha Arena-kode ARBS (står for «arbeidssøker»). Dette er ikke lenger noe vi tar hensyn til. For alle reglene som må være oppfylt for å kunne ha synlig CV, se oppdatert informasjon på Navet: <a target="_blank" rel="noopener noreferrer" href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Hvorfor-er-ikke-personen-synlig-i-Rekr.aspx?csf=1&amp;web=1&amp;e=qqMnTh">Regler som styrer synlighet for CV i Rekrutteringsbistand</a></p>',
    dato: '22.04.2025',
    id: '1',
    opprettetAv: null,
    tittel: 'Rekrutteringsbistand bruker nå Arbeidssøkerregisteret.',
  },
];
