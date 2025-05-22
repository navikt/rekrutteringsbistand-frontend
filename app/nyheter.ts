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
    beskrivelse:
      ' <p>Nå kan alle teste nytt design i Rekrutteringsbistand.<br>De siste dagene har vi gjort en rekke små og store endringer i løsningen etter tilbakemeldinger fra dere via "gi tilbakemeldinger"-knappen. Her er noen:</p><ul><li><p>Endret noen små kosmetiske feil i CV-visning.</p></li><li><p>"Finn Stillinger for kandidat " gir nå forhåndsutfylte filtre, som i gammel løsning.</p></li><li><p>Endret filter slik at man kan filtrere på hendelser og siste aktivitet.</p></li><li><p>Markering av kandidat som har aktiv visning av CV i sidepanel, slik at det er lettere å se hvilken jobbsøker som er i fokus.</p></li><li><p>Og flere andre små og store endringer.</p></li></ul><p>Dette jobber vi med nå:</p><ul><li><p>Løpende forbedringer etter hvert som tilbakemeldinger kommer fra dere som bruker løsningen.</p></li><li><p>Gjøre det mulig å ferdigsstille oppdrag.</p></li></ul><p>I tillegg jobber teamet med å lage applikasjonen Rekrutteringstreff som vil erstatte jobbmesse-fanen i Rekrutteringsbistand.</p>',
    dato: '22.06.2025',
    id: '1',
    opprettetAv: null,
    tittel: 'Oppdateringer uke 20-21',
  },
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
