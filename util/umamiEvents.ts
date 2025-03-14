import { UmamiDomene } from '../app/providers/UmamiContext';

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

export const UmamiEvent = {
  [UmamiDomene.Generell]: Generell,
  [UmamiDomene.Forside]: Forside,
};
