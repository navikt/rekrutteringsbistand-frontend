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
    tittel: 'Modia dekoratør tilbake i toppen',
    beskrivelse:
      '<p>Modiadekoratøren er fjernet fra sidebaren og flyttet tilbake til toppen etter tilbakemeldinger fra brukerne.</p>',
    dato: '14.08.2025',
    id: '8',
    opprettetAv: null,
  },
  {
    tittel: 'Nyheter uke 25-26',
    beskrivelse:
      '<ul>' +
      '<li>Etter vi lanserte nytt design for alle opplevde flere personer at løsningen lagget og kunne henge seg opp. Vi har oppjustert serveren slik at den skal takle at alle bruker løsningen samtidig.</li>' +
      '<li>Ved en feiltagelse ble ikke jobbønske til kandidat tatt med i stillingssøket på "finn stilling" til kandidat. Det skal nå være rettet.</li>' +
      '<li>Flere har opplevd å ikke kunne legge til kandidat på stillinger fra arbeidsplassen.no. Vi har fjernet knappen "legg til kandidat" på stillinger som er publisert på arbeidsplassen, da det ikke er mulig å legge til kandidat før det er opprettet kandidatliste.</li>' +
      '<li>Vi har fått inn mange tilbakemeldinger på små og store ting som ikke fungerer gjennom "gi tilbakmelding" i løsningen. Fortsett å melde inn. Vi har rettet opp i mange feil og mangler dere har meldt inn. Dersom du fortsatt opplever feil/mangler som du har meldt inn tidligere, kan du melde inn på nytt for å gi beskjed.</li>' +
      '</ul>',
    dato: '30.06.2025',
    id: '7',
    opprettetAv: null,
  },
  {
    tittel:
      '"Fritatt fra kandidatsøk" ikke lenger en synlighetsregel i Rekrutteringsbistand',
    beskrivelse:
      '<p>Rekrutteringsbistand tar ikke lenger hensyn til FRKAS som synlighetsregel for CV-er kandidatsøket i Rekrutteringsbistand.<br/><br/>' +
      'FRKAS er en kode som settes i Arena, og betyr «fritatt fra kandidatsøk». De oppdaterte synlighetsreglene kan du se på Navet:<br/>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Hvorfor-er-ikke-personen-synlig-i-Rekr.aspx?csf=1&web=1&e=DyQEFN">Regler som styrer synlighet for CV i Rekrutteringsbistand</a></p>',
    dato: '30.06.2025',
    id: '6',
    opprettetAv: null,
  },
  {
    tittel: 'Lagre nytt stillingssøk',
    beskrivelse:
      '<p>Vi har fjernet muligheten for å lagre nytt standardsøk på stillinger når man samtidig viser en CV. Vi har fått en del tilbakemeldinger på at stillingsfanen kommer i kontekst av spesifikk person. Det skyldes at man har lagret nytt standardsøk når man har søkt etter stillinger for en kandidat. For å komme bort fra dette må man opprette nytt standardsøk.</p>',
    dato: '30.06.2025',
    id: '5',
    opprettetAv: null,
  },
  {
    tittel: 'Janzz-yrkeskode vises i stedenfor ikke-tilgang i historikk i CV',
    beskrivelse:
      '<p>Når du har åpnet en CV og står i fanen “Aktiviteter”, så er det nå en klikkbar lenke til stillingsannonsen/jobbmessen/etterregistreringen, samt at yrkeskoden (Janzz) vises.</p>',
    dato: '30.06.2025',
    id: '4',
    opprettetAv: null,
  },
  {
    tittel: 'Oppdateringer uke 20-21',
    dato: '22.06.2025',
    beskrivelse:
      ' <p>Nå kan alle teste nytt design i Rekrutteringsbistand.<br>De siste dagene har vi gjort en rekke små og store endringer i løsningen etter tilbakemeldinger fra dere via "gi tilbakemeldinger"-knappen. Her er noen:</p><ul><li><p>Endret noen små kosmetiske feil i CV-visning.</p></li><li><p>"Finn Stillinger for kandidat " gir nå forhåndsutfylte filtre, som i gammel løsning.</p></li><li><p>Endret filter slik at man kan filtrere på hendelser og siste aktivitet.</p></li><li><p>Markering av kandidat som har aktiv visning av CV i sidepanel, slik at det er lettere å se hvilken jobbsøker som er i fokus.</p></li><li><p>Og flere andre små og store endringer.</p></li></ul><p>Dette jobber vi med nå:</p><ul><li><p>Løpende forbedringer etter hvert som tilbakemeldinger kommer fra dere som bruker løsningen.</p></li><li><p>Gjøre det mulig å ferdigsstille oppdrag.</p></li></ul><p>I tillegg jobber teamet med å lage applikasjonen Rekrutteringstreff som vil erstatte jobbmesse-fanen i Rekrutteringsbistand.</p>',
    id: '3',
    opprettetAv: null,
  },
  {
    tittel: 'Ny versjon av Rekrutteringsbistand er publisert',
    dato: '15.05.2025',
    beskrivelse: 'Ny rekrutteringsbistand-app publisert for beta testing',
    id: '2',
    opprettetAv: null,
  },
  {
    tittel: 'Rekrutteringsbistand bruker nå Arbeidssøkerregisteret.',
    dato: '22.04.2025',
    beskrivelse:
      '<p>Det er nå et nytt krav for å være synlig med CV i kandidatsøket i Rekrutteringsbistand. Det nye kravet er at person må opptre i Navs Arbeidssøkerregister. Samtidig opphører krav om at personen må ha Arena-kode ARBS (står for «arbeidssøker»). Dette er ikke lenger noe vi tar hensyn til. For alle reglene som må være oppfylt for å kunne ha synlig CV, se oppdatert informasjon på Navet: <a target="_blank" rel="noopener noreferrer" href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Hvorfor-er-ikke-personen-synlig-i-Rekr.aspx?csf=1&amp;web=1&amp;e=qqMnTh">Regler som styrer synlighet for CV i Rekrutteringsbistand</a></p>',
    id: '1',
    opprettetAv: null,
  },
];
