export enum UmamiDomene {
  Generell = 'Generell',
  Forside = 'Forside',
  Stilling = 'Stilling',
  Kandidat = 'Kandidat',
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
  send_beskjed_til_kandidat: 'Send beskjed til kandidat (antall)',
  del_stilling_med_kandidat: 'Del stilling med kandidat (antall)',
  del_kandidat_med_arbeidsgiver: 'Del kandidat med arbeidsgiver (antall)',
  opprettet_stilling: 'Opprettet stilling',
  skriv_ut_stilling: 'Skriv ut stilling',
  ny_stilling_info: 'Ny stilling info',
});

const Kandidat = lagEventPrefix(UmamiDomene.Kandidat, {
  tab_oversikt: 'Kandidatliste oversikt',
});

const Etterregistrering = lagEventPrefix(UmamiDomene.Etterregistrering, {
  fullført_etterregistrering_av_formidling:
    'Fullført etterregistrering av formidling',
  yrkestittel_etterregistrering: 'Yrkestittel etterregistrering',
});

const Rekrutteringstreff = lagEventPrefix(UmamiDomene.Rekrutteringstreff, {
  registrering: 'Registrering til rekrutteringstreff',
});

export const UmamiEvent = {
  [UmamiDomene.Generell]: Generell,
  [UmamiDomene.Forside]: Forside,
  [UmamiDomene.Stilling]: Stilling,
  [UmamiDomene.Kandidat]: Kandidat,
  [UmamiDomene.Etterregistrering]: Etterregistrering,
  [UmamiDomene.Rekrutteringstreff]: Rekrutteringstreff,
};
