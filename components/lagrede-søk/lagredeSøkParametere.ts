// Menylenken legger på denne parameteren for å bruke standardsøket, også når siden allerede er åpen.
export const BRUK_STANDARDSØK_PARAM = 'brukStandardsok';

/** Lenke som åpner søket med veilederens standardsøk. */
export const medStandardsøk = (sti: string) =>
  `${sti}?${BRUK_STANDARDSØK_PARAM}=true`;
