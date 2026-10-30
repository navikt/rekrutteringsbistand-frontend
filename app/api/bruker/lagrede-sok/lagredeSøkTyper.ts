import { z } from 'zod';

export const LagredeSøkDomene = {
  REKRUTTERINGSTREFF: 'rekrutteringstreff',
} as const;
export type LagredeSøkDomene =
  (typeof LagredeSøkDomene)[keyof typeof LagredeSøkDomene];

export const MAKS_ANTALL_LAGREDE_SØK = 10;
export const MAKS_NAVNELENGDE_LAGRET_SØK = 25;
export const lagretSøkSchema = z.object({
  id: z.string(),
  navn: z.string(),
  erStandard: z.boolean(),
  filter: z.string(),
  fritekst: z.array(z.string()),
  sistAktiv: z.string(),
  slettes: z.string(),
  visSlettevarsel: z.boolean(),
});

export type LagretSøkDTO = z.infer<typeof lagretSøkSchema>;

export interface LagreSøkDTO {
  navn: string;
  filter: string;
  fritekst: string[];
}
