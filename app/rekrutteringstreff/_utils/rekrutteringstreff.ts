import type { HendelseDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';

const relevanteStegHendelser = new Set(['PUBLISER', 'FULLFØR', 'GJENÅPN']);

export type AktivtSteg = 1 | 2 | 3;

/**
 * Finner aktivt steg (1–3) basert på rekrutteringstreff-hendelser.
 * Logikk:
 * - Ingen relevante hendelser => steg 1
 * - Siste relevante hendelse er PUBLISER eller GJENÅPN => steg 2
 * - Siste relevante hendelse er FULLFØR => steg 3
 */
export const getActiveStepFromHendelser = (
  hendelser: Pick<HendelseDTO, 'hendelsestype' | 'tidspunkt'>[] | undefined,
): AktivtSteg => {
  if (!hendelser || hendelser.length === 0) return 1;

  const relevante = hendelser
    .filter((h) => relevanteStegHendelser.has(h.hendelsestype))
    .sort(
      (a, b) =>
        new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
    );

  if (relevante.length === 0) return 1;

  const siste = relevante[0].hendelsestype;
  if (siste === 'PUBLISER' || siste === 'GJENÅPN') return 2;
  if (siste === 'FULLFØR') return 3;
  return 1;
};
