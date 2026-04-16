import { JobbsøkerStatusType } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { storForbokstav, storForbokstavString } from '@/app/kandidat/util';
import JobbsøkerTagMedTooltip, {
  formatDateForTooltip,
  joinTooltipParts,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerTagMedTooltip';
import {
  JobbsøkerHendelsestype,
  JobbsøkerHendelsestypeLabel,
  JobbsøkerStatus,
  RelevanteJobbsøkerHendelser,
} from '@/app/rekrutteringstreff/_types/constants';
import { TagProps } from '@navikt/ds-react';
import { FC } from 'react';

type JobbsøkerStatusTagProps = {
  status: JobbsøkerStatusType;
  sisteRelevanteHendelse?: HendelseDTO;
  hendelser?: HendelseDTO[];
};

const utledVariant = (
  status: JobbsøkerStatusType,
  sisteRelevanteHendelse?: HendelseDTO,
): TagProps['variant'] => {
  if (
    sisteRelevanteHendelse?.hendelsestype ===
    JobbsøkerHendelsestype.AKTIVITETSKORT_OPPRETTELSE_FEIL
  ) {
    return 'error';
  }

  switch (status) {
    case JobbsøkerStatus.SVART_JA:
      return 'success';
    case JobbsøkerStatus.INVITERT:
    case JobbsøkerStatus.LAGT_TIL:
      return 'info';
    case JobbsøkerStatus.SLETTET:
      return 'error';
    case JobbsøkerStatus.SVART_NEI:
    default:
      return 'neutral';
  }
};

const buildRelevanteHendelseTooltipLine = (h: HendelseDTO): string => {
  const label =
    JobbsøkerHendelsestypeLabel[h.hendelsestype as JobbsøkerHendelsestype] ||
    h.hendelsestype;

  return joinTooltipParts([
    storForbokstavString(label),
    formatDateForTooltip(h.tidspunkt),
  ]);
};

const buildRelevanteHendelserTooltipContent = (
  hendelser?: HendelseDTO[],
): string => {
  if (!hendelser || hendelser.length === 0) return '';
  return hendelser
    .filter((h) =>
      RelevanteJobbsøkerHendelser.has(
        h.hendelsestype as JobbsøkerHendelsestype,
      ),
    )
    .sort(
      (a, b) =>
        new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
    )
    .map(buildRelevanteHendelseTooltipLine)
    .join('\n');
};

const JobbsøkerStatusTag: FC<JobbsøkerStatusTagProps> = ({
  status,
  sisteRelevanteHendelse,
  hendelser,
}) => {
  const label =
    sisteRelevanteHendelse?.hendelsestype ===
    JobbsøkerHendelsestype.AKTIVITETSKORT_OPPRETTELSE_FEIL
      ? 'Invitasjon feilet'
      : storForbokstav(status)?.replaceAll('_', ' ') || '';

  return (
    <JobbsøkerTagMedTooltip
      tooltip={buildRelevanteHendelserTooltipContent(hendelser)}
      variant={utledVariant(status, sisteRelevanteHendelse)}
    >
      {label}
    </JobbsøkerTagMedTooltip>
  );
};

export default JobbsøkerStatusTag;
