import {
  HendelseDTO,
  HendelseMedMinsideSvar,
  MinsideVarselSvarData,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  formatDateForTooltip,
  joinTooltipParts,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerTagMedTooltip';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_types/constants';

export type MinsideStatusType =
  | 'INGEN' // Ingen svar mottatt enda
  | 'FEILET' // Levering feilet
  | 'SMS' // Sendt på SMS
  | 'EPOST' // Sendt på epost
  | 'MINSIDE'; // Kun levert via Min side

export interface MinsideStatusResult {
  type: MinsideStatusType;
  label: string;
  tooltip: string;
  /** Tidspunktet hendelsen skjedde (ISO-streng) – matcher `hendelse.opprettet` */
  tidspunkt?: string;
  /** Den ene hendelsen som representerer statusen (typisk siste/viktigste) */
  hendelse?: MinsideVarselSvarData;
  /** Alle minside-svarhendelser (kan brukes for utvidet tooltip) */
  alleHendelser: MinsideVarselSvarData[];
}

const erMinsideLevering = (data: MinsideVarselSvarData): boolean =>
  !data.eksternKanal && data.minsideStatus === 'OPPRETTET';

const erFeilet = (data: MinsideVarselSvarData): boolean =>
  data.eksternStatus === 'FEILET' && !erMinsideLevering(data);

const formaterEndringer = (endringer: string[]): string => {
  if (endringer.length === 0) return '';
  if (endringer.length === 1) return endringer[0];
  return (
    endringer.slice(0, -1).join(', ') + ' og ' + endringer[endringer.length - 1]
  );
};

const getMalTekst = (
  mal: string | null | undefined,
  flettedata: string[] | null | undefined,
): string | null => {
  switch (mal) {
    case 'KANDIDAT_INVITERT_TREFF':
      return 'Invitert';
    case 'KANDIDAT_INVITERT_TREFF_AVLYST':
      return 'Avlyst';
    case 'KANDIDAT_INVITERT_TREFF_ENDRET':
      if (flettedata && flettedata.length > 0) {
        return `Endret (${formaterEndringer(flettedata)})`;
      }
      return 'Endret';
    default:
      return null;
  }
};

const getStatusTekst = (data: MinsideVarselSvarData): string => {
  if (data.eksternStatus === 'SENDT') return 'Levert';
  if (erMinsideLevering(data)) return 'Levert via Min side';
  if (data.eksternStatus === 'FEILET') return 'Feilet';
  return 'Ukjent status';
};

const buildTooltipLine = (data: MinsideVarselSvarData): string =>
  joinTooltipParts([
    getMalTekst(data.mal, data.flettedata),
    getStatusTekst(data),
    data.eksternFeilmelding,
    formatDateForTooltip(data.opprettet),
  ]);

const buildTooltip = (alle: MinsideVarselSvarData[]): string =>
  alle.map(buildTooltipLine).join('\n');

/**
 * Henter alle relevante minside-svarhendelser, deduplisert per varselId
 * og sortert kronologisk.
 */
const getMinsideSvarHendelser = (
  hendelser?: HendelseDTO[],
): MinsideVarselSvarData[] => {
  if (!hendelser) return [];

  const isMinsideSvar = (h: HendelseDTO): h is HendelseMedMinsideSvar =>
    h.hendelsestype === JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE &&
    h.hendelseData !== null;

  const relevante = hendelser.filter(isMinsideSvar).filter((h) => {
    const status = h.hendelseData.eksternStatus;
    return status === 'SENDT' || status === 'FEILET';
  });

  if (relevante.length === 0) return [];

  // Dedupliser per varselId – behold siste hendelse per varsel
  const sortertEtterTidspunkt = [...relevante].sort(
    (a, b) => new Date(a.tidspunkt).getTime() - new Date(b.tidspunkt).getTime(),
  );
  const varselMap = new Map<string, MinsideVarselSvarData>();
  for (const h of sortertEtterTidspunkt) {
    varselMap.set(h.hendelseData.varselId, h.hendelseData);
  }

  return Array.from(varselMap.values()).sort((a, b) => {
    const t1 = a.opprettet ? new Date(a.opprettet).getTime() : 0;
    const t2 = b.opprettet ? new Date(b.opprettet).getTime() : 0;
    return t1 - t2;
  });
};

/**
 * Utleder ÉN samlet minside-status fra alle hendelser, med følgende prioritet:
 *   1. FEILET  – noen levering har feilet
 *   2. SMS     – sendt via SMS
 *   3. EPOST   – sendt via epost
 *   4. MINSIDE – kun levert via Min side
 *   5. INGEN   – ingen relevant hendelse
 */
export const utledMinsideStatus = (
  hendelser?: HendelseDTO[],
): MinsideStatusResult => {
  const alle = getMinsideSvarHendelser(hendelser);

  if (alle.length === 0) {
    return {
      type: 'INGEN',
      label: 'Ikke svart',
      tooltip: '',
      alleHendelser: [],
    };
  }

  const tooltip = buildTooltip(alle);

  const feilet = alle.find(erFeilet);
  if (feilet) {
    return {
      type: 'FEILET',
      label: 'Varsling feilet',
      tooltip,
      tidspunkt: feilet.opprettet ?? undefined,
      hendelse: feilet,
      alleHendelser: alle,
    };
  }

  const sms = alle.find(
    (h) => h.eksternKanal === 'SMS' && h.eksternStatus === 'SENDT',
  );
  if (sms) {
    return {
      type: 'SMS',
      label: 'SMS',
      tooltip,
      tidspunkt: sms.opprettet ?? undefined,
      hendelse: sms,
      alleHendelser: alle,
    };
  }

  const epost = alle.find(
    (h) => h.eksternKanal === 'EPOST' && h.eksternStatus === 'SENDT',
  );
  if (epost) {
    return {
      type: 'EPOST',
      label: 'Epost',
      tooltip,
      tidspunkt: epost.opprettet ?? undefined,
      hendelse: epost,
      alleHendelser: alle,
    };
  }

  const minside = alle.find(erMinsideLevering);
  if (minside) {
    return {
      type: 'MINSIDE',
      label: 'Min side',
      tooltip,
      tidspunkt: minside.opprettet ?? undefined,
      hendelse: minside,
      alleHendelser: alle,
    };
  }

  return {
    type: 'INGEN',
    label: 'Ikke svart',
    tooltip,
    alleHendelser: alle,
  };
};
