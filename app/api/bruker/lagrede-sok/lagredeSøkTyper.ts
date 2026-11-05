import { z } from 'zod';

export const LagredeSøkDomene = {
  REKRUTTERINGSTREFF: 'rekrutteringstreff',
  STILLING: 'stilling',
} as const;
export type LagredeSøkDomene =
  (typeof LagredeSøkDomene)[keyof typeof LagredeSøkDomene];

export const MAKS_ANTALL_LAGREDE_SØK = 10;
export const MAKS_NAVNELENGDE_LAGRET_SØK = 25;
export const MAKS_ANTALL_SØKEORD_LAGRET_SØK = 20;
export const MAKS_SØKEORDTEGN_LAGRET_SØK = 400;

/** Samme regel som bruker-api: søkeordene trimmes, tomme tas ikke med, og summen av tegnene teller. */
export const overstigerSøkeordgrensen = (
  søkeord: string[],
  grense: { antall: number; tegn: number } = {
    antall: MAKS_ANTALL_SØKEORD_LAGRET_SØK,
    tegn: MAKS_SØKEORDTEGN_LAGRET_SØK,
  },
) => {
  const ord = søkeord.map((s) => s.trim()).filter((s) => s.length > 0);
  return (
    ord.length > grense.antall ||
    ord.reduce((sum, s) => sum + s.length, 0) > grense.tegn
  );
};

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
