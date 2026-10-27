import { z } from 'zod';

// Lagrede søk i rekrutteringsbistand-bruker-api. Stillingssøket skal bruke samme API med eget domene.
export const StandardsøkDomene = {
  REKRUTTERINGSTREFF: 'rekrutteringstreff',
} as const;
export type StandardsøkDomene =
  (typeof StandardsøkDomene)[keyof typeof StandardsøkDomene];

export const MAKS_ANTALL_STANDARDSØK = 10;
export const MAKS_NAVNELENGDE_STANDARDSØK = 25;

export const standardsøkSchema = z.object({
  id: z.string(),
  navn: z.string(),
  erStandard: z.boolean(),
  filter: z.string(),
  fritekst: z.array(z.string()),
  sistAktiv: z.string(),
  slettes: z.string(),
  visSlettevarsel: z.boolean(),
});

export type StandardsøkDTO = z.infer<typeof standardsøkSchema>;

export interface LagreStandardsøkDTO {
  navn: string;
  filter: string;
  fritekst: string[];
}
