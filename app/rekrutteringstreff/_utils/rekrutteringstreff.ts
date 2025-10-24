import type { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  AktivtSteg,
  RekrutteringstreffHendelsestype,
  RelevanteStegHendelser,
} from '@/app/rekrutteringstreff/_types/constants';

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
  if (!hendelser || hendelser.length === 0) return AktivtSteg.KLADD;

  const relevante = hendelser
    .filter((h) =>
      RelevanteStegHendelser.has(
        h.hendelsestype as RekrutteringstreffHendelsestype,
      ),
    )
    .sort(
      (a, b) =>
        new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
    );

  if (relevante.length === 0) return AktivtSteg.KLADD;

  const siste = relevante[0].hendelsestype as RekrutteringstreffHendelsestype;
  switch (siste) {
    case RekrutteringstreffHendelsestype.AVLYST:
      return AktivtSteg.AVLYST;
    case RekrutteringstreffHendelsestype.AVPUBLISERT:
      return AktivtSteg.AVPUBLISERT;
    case RekrutteringstreffHendelsestype.PUBLISERT:
      return AktivtSteg.INVITERE;
    case RekrutteringstreffHendelsestype.GJENÅPNET:
      return AktivtSteg.INVITERE;
    case RekrutteringstreffHendelsestype.FULLFØRT:
      return AktivtSteg.FULLFØRE;
    default:
      return AktivtSteg.KLADD;
  }
};
