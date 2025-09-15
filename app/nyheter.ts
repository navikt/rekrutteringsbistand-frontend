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
    tittel:
      'Nye navn, nye funksjoner og små forbedringer i Rekrutteringsbistand',
    beskrivelse:
      '<p>Vi har jobbet med masse endringer, og flere er på vei! Her er noen av de viktigste endringene for deg.<br/> <br/><strong>Nye navn på områder</strong><br>Vi ønsker å rydde opp i begrepsbruken, og åpne for fremtidige funksjoner. Derfor har vi gitt nye navn til deler av løsningen. <br/> <br/> <strong>Stillinger blir Stillingsoppdrag</strong><br>Det å kalle innholdet for Stillingsoppdrag reflekterer bedre markedsarbeidet vi i Nav jobber med. Listen har alltid inneholdt mer enn bare stillingsannonser; den har vært plassen for prosesser der vi hjelper arbeidsgivere med å finne arbeidskraft. Derfor syns vi den fortjente et bedre navn også. <br/>PS: Akkurat nå inneholder listene jobbmesser. Det er bare midlertidig, og vil endre seg når vi lanserer et nytt område i Rekrutteringsbistand for å arrangere rekrutteringstreff i løpet av de kommende månedene.<br/> <br/><strong>Kandidater blir Jobbsøkere</strong><br>Flere har gitt tilbakemeldinger om at kandidater høres for formelt ut. Jobbsøkere er folk som leter etter et sted å jobbe—så da kaller vi dem det. <br/> <br/><strong>Nye flyter for oppretting av stillingsoppdrag og etterregistrering</strong><br>Vi så at det var unødvendig å dele disse opp i flere steg. I de nye registreringene vises derfor alt på én side, sammen med en sjekkliste om hva som er igjen å gjøre. <br/> <br/><strong>Muligheten til å pause og fullføre stillingsoppdrag</strong><br>Du har nå muligheten til å si at du ikke lenger ønsker flere søkere—en søkerstopp.️ <strong>Nye navn på statuser for stillingsoppdrag</strong><br>“Hvor kan jeg foreslå mine jobbsøkere?” Er et spørsmål vi har fått fra flere veiledere. Vi har sett at det er vanskelig å finne relevante resultater i listene. Ting som var gamle, fullførte, eller stoppet lå litt hulter til bulter, og har gjort det vanskelig å vite hva som er ferskvare.Derfor har statuser for oppdragene fått nye navn som sier noe om hva som skjer med dem:</p><ul><li><p><strong>Åpen for søkere</strong></p><ul><li><p>Oppdragets vanlige status. Her leter man etter folk.</p></li></ul></li><li><p><strong>Stengt for søkere</strong></p><ul><li><p>Oppdrag hvor man manuelt sier “Hei, vi trenger ikke søkere lenger”. For eksempel hvis man er i ferd med å gjennomføre intervju, eller fullføre prosessen (se søkerstopp over).</p></li></ul></li><li><p><strong>Utløpt</strong></p><ul><li><p>Automatisk stengt for søkere etter en viss dato.</p></li></ul></li><li><p><strong>Fullført</strong></p><ul><li><p>Når oppdraget er fullført. Det kan være både når noen fikk jobb, eller ikke. Oppdraget er lukket, og kan gjenåpnes ved behov.</p></li></ul></li></ul><p>Det er også noen statuser du bare kan se under “Mine” oppdrag.</p><ul><li><p><strong>Ikke publisert</strong></p><ul><li><p>Oppdrag som ikke er klare enda. De er ikke synlige før de blir publisert, og bare tilgjengelig for deg.</p></li></ul></li><li><p><strong>Avbrutt</strong></p><ul><li><p>Hvis du har gjort noe feil, for eksempel valgt feil arbeidsgiver, kan du avbryte hele oppdraget.</p></li></ul></li></ul><p><strong>Markering av interne oppdrag og annonser fra </strong><a target="_blank" rel="noopener noreferrer" href="http://arbeidsplassen.no"><strong>arbeidsplassen.no</strong></a><br>Tidligere har annonser fra <a target="_blank" rel="noopener noreferrer" href="http://arbeidsplassen.no">arbeidsplassen.no</a> ligget blandet med interne oppdrag. Nå er annonser på <a target="_blank" rel="noopener noreferrer" href="http://arbeidsplassen.no">arbeidsplassen.no</a> markert med logoen til <a target="_blank" rel="noopener noreferrer" href="http://arbeidsplassen.no">arbeidsplassen.no</a>. Interne oppdrag som publiseres eksternt får en etikett/tag med teksten <a target="_blank" rel="noopener noreferrer" href="http://arbeidsplassen.no">arbeidsplassen.no</a>. <strong>Justering av filtre</strong><br>For å gjøre det lettere å finne innhold man leter etter i listene har vi gjort noen justeringer på hvordan filtrene oppfører seg:</p><ul><li><p>Du finner filtrene ved siden av søkeresultatene hvis de får plass på siden. Hvis det blir trangt om plassen, legger de seg bak filtreringsknappen.</p></li><li><p>I stillingsoppdrag-oversikten viser vi også hvor mange treff hvert filter vil gi. Vi ser på om vi kan gjøre det i de andre søkene også.</p></li><li><p>Antall treff, og muligheten til å navigere mellom sider i listene står nå både på toppen og i bunnen av listene.</p></li><li><p>Standardssøket fungerer nå som det gjorde før. Vi ser også på muligheten for å lagre flere søk i fremtiden. Litt som på <a target="_blank" rel="noopener noreferrer" href="http://finn.no">finn.no</a>. Gi gjerne tilbakemeldinger hvis det høres interessant ut.</p></li></ul><p><strong>Og masse masse småjusteringer</strong><br>Vi har også gjort flere endringer for måten løsningen ser ut og oppfører seg. Rettet noen skrivefeil. Tweaket hvordan panelene oppfører seg. Og mye mye mer. <br/>Vi vil fortsette å forbedre løsningen i tiden fremover. Fortsett gjerne med å gi tilbakemeldinger for å hjelpe oss med å velge hva vi gjør først. Og takk for at du har vært så tålmodig .&nbsp;</p>',
    opprettetAv: null,
    dato: '15.09.2025',
    id: '10',
  },
  {
    tittel: 'Se stillingene fra ditt eget kontor',
    beskrivelse:
      '<p>Vi har sett at det har vært vanskelig å finne stillingsoppdrag som noen jobber med ved kontoret. Nå kan alle som tilhører et kontor finne direktemeldte interne stillingsoppdrag ved å velge «mitt kontor» som et eget filtervalg.</p>' +
      '<p>Det finnes tusenvis av offentlig utlyste stillingsoppdrag. Noen av de har markedskontakter avtalt med arbeidsgiver å sende over CV, eller tipse kandidater å sende søknad selv. Disse stillingsoppdragene får kandidatliste som markedskontakten jobber med. Det nye er at du nå kan finne de offentlig utlyste stillingsoppdragene som markedskontakter jobber mer, gjennom et eget filtervalg. På den måten kan du enklere bidra til å legge kandidater til stillingsoppdraget på samme måte som ved direktemeldte stillingsoppdrag. Her kan du lese mer om <a href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Jobb-med-offentlig-utlyste-stillinger.aspx?csf=1&web=1&e=fwd1iN" alt="Jobb med offentlige utlyste stillinger" target="_blank" >Jobb med offentlig utlyste stillinger</a> fra Navet.</p>',
    dato: '22.08.2025',
    id: '9',
    opprettetAv: null,
  },
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
      '<p>Når du har åpnet en CV og står i fanen “Aktiviteter”, så er det nå en klikkbar lenke til stillingsoppdrag/jobbmessen/etterregistreringen, samt at yrkeskoden (Janzz) vises.</p>',
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
