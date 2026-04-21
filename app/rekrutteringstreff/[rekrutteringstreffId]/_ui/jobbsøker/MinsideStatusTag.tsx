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
import { Chips, Tooltip } from '@navikt/ds-react';
import { FC } from 'react';

interface MinsideStatusTagProps {
  hendelser?: HendelseDTO[];
}

const getMinsideSvarHendelser = (
  hendelser?: HendelseDTO[],
): MinsideVarselSvarData[] => {
  if (!hendelser) return [];

  const isMinsideSvar = (h: HendelseDTO): h is HendelseMedMinsideSvar =>
    h.hendelsestype === JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE &&
    h.hendelseData !== null;

  const relevanteHendelser = hendelser.filter(isMinsideSvar).filter((h) => {
    const status = h.hendelseData.eksternStatus;
    return status === 'SENDT' || status === 'FEILET';
  });

  if (relevanteHendelser.length === 0) return [];

  const varselMap = new Map<string, MinsideVarselSvarData>();

  const sorted = relevanteHendelser.sort((a, b) => {
    return new Date(a.tidspunkt).getTime() - new Date(b.tidspunkt).getTime();
  });

  for (const hendelse of sorted) {
    varselMap.set(hendelse.hendelseData.varselId, hendelse.hendelseData);
  }

  const unikeVarsler = Array.from(varselMap.values());
  unikeVarsler.sort((a, b) => {
    const timeA = a.opprettet ? new Date(a.opprettet).getTime() : 0;
    const timeB = b.opprettet ? new Date(b.opprettet).getTime() : 0;
    return timeA - timeB;
  });

  return unikeVarsler;
};

const erMinsideLevering = (data: MinsideVarselSvarData): boolean =>
  !data.eksternKanal && data.minsideStatus === 'OPPRETTET';

const formaterKanal = (data: MinsideVarselSvarData): string => {
  switch (data.eksternKanal) {
    case 'SMS':
      return 'SMS';
    case 'EPOST':
      return 'Epost';
    default:
      return erMinsideLevering(data) ? 'Min side' : 'Varsling feilet';
  }
};

const getStatusTekst = (data: MinsideVarselSvarData): string => {
  if (data.eksternStatus === 'SENDT') return 'Levert';
  if (erMinsideLevering(data)) return 'Levert via Min side';
  if (data.eksternStatus === 'FEILET') return 'Feilet';
  return 'Ukjent status';
};

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

const buildMinsideTooltipLine = (data: MinsideVarselSvarData): string => {
  return joinTooltipParts([
    getMalTekst(data.mal, data.flettedata),
    getStatusTekst(data),
    data.eksternFeilmelding,
    formatDateForTooltip(data.opprettet),
  ]);
};

const buildMinsideTooltipContent = (
  hendelser: MinsideVarselSvarData[],
): string => {
  if (hendelser.length === 0) return '';
  return hendelser.map((data) => buildMinsideTooltipLine(data)).join('\n');
};

const grupperPerKanal = (
  data: MinsideVarselSvarData[],
): Map<string, MinsideVarselSvarData[]> => {
  const map = new Map<string, MinsideVarselSvarData[]>();
  for (const d of data) {
    const key = d.eksternKanal ?? 'MINSIDE';
    const existing = map.get(key) ?? [];
    existing.push(d);
    map.set(key, existing);
  }
  return map;
};

const erEksternKanal = (data: MinsideVarselSvarData): boolean =>
  data.eksternKanal === 'SMS' || data.eksternKanal === 'EPOST';

const MinsideStatusTag: FC<MinsideStatusTagProps> = ({ hendelser }) => {
  const alleMinsideSvarData = getMinsideSvarHendelser(hendelser);

  if (alleMinsideSvarData.length === 0) {
    return null;
  }

  const perKanal = grupperPerKanal(alleMinsideSvarData);

  return (
    <Chips size='small' className='flex-nowrap'>
      {Array.from(perKanal.entries()).map(([kanal, kanalData]) => {
        const siste = kanalData[kanalData.length - 1];
        const tooltipContent = buildMinsideTooltipContent(kanalData);

        if (erEksternKanal(siste)) {
          const chip = (
            <Chips.Toggle
              data-color='neutral'
              key={kanal}
              selected={siste.eksternStatus === 'SENDT'}
              checkmark={siste.eksternStatus === 'SENDT'}
              as='span'
              className='whitespace-nowrap'
            >
              {formaterKanal(siste)}
            </Chips.Toggle>
          );

          if (tooltipContent.trim().length > 0) {
            return (
              <Tooltip
                key={kanal}
                content={tooltipContent}
                className='text-left whitespace-pre-line'
              >
                {chip}
              </Tooltip>
            );
          }
          return chip;
        }

        if (erMinsideLevering(siste)) {
          const chip = (
            <Chips.Toggle
              data-color='neutral'
              key={kanal}
              selected
              checkmark
              as='span'
              className='whitespace-nowrap'
            >
              {formaterKanal(siste)}
            </Chips.Toggle>
          );

          if (tooltipContent.trim().length > 0) {
            return (
              <Tooltip
                key={kanal}
                content={tooltipContent}
                className='text-left whitespace-pre-line'
              >
                {chip}
              </Tooltip>
            );
          }
          return chip;
        }

        const chip = (
          <Chips.Toggle
            data-color='danger'
            key={kanal}
            selected
            checkmark={false}
            as='span'
            className='whitespace-nowrap'
          >
            {formaterKanal(siste)}
          </Chips.Toggle>
        );

        if (tooltipContent.trim().length > 0) {
          return (
            <Tooltip
              key={kanal}
              content={tooltipContent}
              className='text-left whitespace-pre-line'
            >
              {chip}
            </Tooltip>
          );
        }
        return chip;
      })}
    </Chips>
  );
};

export default MinsideStatusTag;
