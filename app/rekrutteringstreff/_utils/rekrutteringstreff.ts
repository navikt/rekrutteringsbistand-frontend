import type { HendelseDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';

const relevanteStegHendelser = new Set([
  'PUBLISER',
  'FULLFØR',
  'GJENÅPN',
  'AVLYS',
  'AVPUBLISER',
]);

export type AktivtSteg =
  | 'PUBLISERE'
  | 'INVITERE'
  | 'FULLFØRE'
  | 'AVLYST'
  | 'AVPUBLISERT';

/**
 * Finner aktivt steg (1–3 eller status) basert på rekrutteringstreff-hendelser.
 * Logikk:
 * - Siste hendelse bestemmer status.
 * - AVLYS => 'AVLYST'
 * - AVPUBLISER => 'AVPUBLISERT'
 * - FULLFØR => 'FULLFØRE'
 * - PUBLISER eller GJENÅPN => 'INVITERE'
 * - Ingen relevante hendelser => 'PUBLISERE'
 */
export const getActiveStepFromHendelser = (
  hendelser: Pick<HendelseDTO, 'hendelsestype' | 'tidspunkt'>[] | undefined,
): AktivtSteg => {
  if (!hendelser || hendelser.length === 0) return 'PUBLISERE';

  const relevante = hendelser
    .filter((h) => relevanteStegHendelser.has(h.hendelsestype))
    .sort(
      (a, b) =>
        new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
    );

  if (relevante.length === 0) return 'PUBLISERE';

  const siste = relevante[0].hendelsestype;
  switch (siste) {
    case 'AVLYS':
      return 'AVLYST';
    case 'AVPUBLISER':
      return 'AVPUBLISERT';
    case 'PUBLISER':
      return 'PUBLISERE';
    case 'GJENÅPN':
      return 'INVITERE';
    case 'FULLFØR':
      return 'FULLFØRE';
    default:
      return 'PUBLISERE';
  }
};
