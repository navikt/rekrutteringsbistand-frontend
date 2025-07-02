export enum UmamiDomene {
  Generell = 'Generell',
  Forside = 'Forside',
  Stilling = 'Stilling',
  Kandidat = 'Kandidat',
  Sidebar = 'Sidebar',
  Etterregistrering = 'Etterregistrering',
  Rekrutteringstreff = 'Rekrutteringstreff',
}

export interface UmamiEventObject {
  domene: UmamiDomene;
  navn: string;
}

const lagEventPrefix = <T extends Record<string, string>>(
  domene: UmamiDomene,
  events: T,
): Record<keyof T, UmamiEventObject> => {
  const result: Record<string, UmamiEventObject> = {};

  for (const [key, value] of Object.entries(events)) {
    result[key] = {
      domene,
      navn: value,
    };
  }

  return result as Record<keyof T, UmamiEventObject>;
};

const Generell = lagEventPrefix(UmamiDomene.Generell, {
  fant_ikke_side: 'Fant ikke side (404)',
});

const Forside = lagEventPrefix(UmamiDomene.Forside, {
  se_mine_stillinger_knapp: 'Se mine stillinger knapp',
  opprett_ny_stilling_knapp: 'Opprett ny stilling knapp',
});

const Stilling = lagEventPrefix(UmamiDomene.Stilling, {
  tab_finn_kandidater: 'Finn kandidater for stilling',
  antall_yrkesjobbønsker_fra_kandidat: 'Antall yrkesjobbønsker fra kandidat',
  åpne_legg_til_kandidat_modal: 'Åpne legg til kandidat modal',
  legg_til_kandidat: 'Legg til kandidat (antall)',
  finn_kandidater_knapp: 'Finn kandidater knapp',
  send_beskjed_til_kandidat: 'Send beskjed til kandidat (antall)',
  del_stilling_med_kandidat: 'Del stilling med kandidat (antall)',
  del_stilling_med_kandidat_påNytt:
    'Del stilling med kandidat (antall) på nytt',
  del_kandidat_med_arbeidsgiver: 'Del kandidat med arbeidsgiver (antall)',
  opprettet_stilling: 'Opprettet stilling',
  skriv_ut_stilling: 'Skriv ut stilling',
  ny_stilling_info: 'Ny stilling info',
  legg_til_markerte_kandidater: 'Legg til markerte kandidater',
  legg_til_kandidat_i_kandidatliste: 'Legg til kandidat i kandidatliste',
  forslag_til_stilling_fane: 'Forslag til stilling fane',
  forslag_til_stilling_legg_til_kandidat:
    'Forslag til stilling legg til kandidat',
});

const Kandidat = lagEventPrefix(UmamiDomene.Kandidat, {
  tab_oversikt: 'Kandidatliste oversikt',
  finn_stilling_knapp: 'Finn stilling knapp',
});

const Sidebar = lagEventPrefix(UmamiDomene.Sidebar, {
  opprettet_stilling: 'Opprettet stilling',
  opprettet_etterregistrering: 'Opprettet etterregistrering',
  opprettet_rekrutteringstreff: 'Opprettet rekrutteringstreff',
});

const Etterregistrering = lagEventPrefix(UmamiDomene.Etterregistrering, {
  fullført_etterregistrering_av_formidling:
    'Fullført etterregistrering av formidling',
  yrkestittel_etterregistrering: 'Yrkestittel etterregistrering',
});

const Rekrutteringstreff = lagEventPrefix(UmamiDomene.Rekrutteringstreff, {
  registrering: 'Registrering til rekrutteringstreff',
  oppdatert_tidspunkt: 'Oppdatering av rekrutteringstreff tidspunkt fra til',
});

export const UmamiEvent = {
  [UmamiDomene.Sidebar]: Sidebar,
  [UmamiDomene.Generell]: Generell,
  [UmamiDomene.Forside]: Forside,
  [UmamiDomene.Stilling]: Stilling,
  [UmamiDomene.Kandidat]: Kandidat,
  [UmamiDomene.Etterregistrering]: Etterregistrering,
  [UmamiDomene.Rekrutteringstreff]: Rekrutteringstreff,
};
