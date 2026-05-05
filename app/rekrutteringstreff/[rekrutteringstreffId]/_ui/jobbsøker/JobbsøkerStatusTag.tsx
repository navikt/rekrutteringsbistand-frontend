import { JobbsøkerStatusType } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { storForbokstav, storForbokstavString } from '@/app/kandidat/util';
import JobbsøkerTagMedTooltip, {
  formatDateForTooltip,
  joinTooltipParts,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerTagMedTooltip';
import {
  MinsideStatusResult,
  utledMinsideStatus,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/minsideStatusUtil';
import {
  JobbsøkerHendelsestype,
  JobbsøkerHendelsestypeLabel,
  JobbsøkerStatus,
  RelevanteJobbsøkerHendelser,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  Chat2Icon,
  ChatExclamationmarkIcon,
  EnvelopeClosedIcon,
  PhoneIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { TagProps } from '@navikt/ds-react';
import { FC } from 'react';

type JobbsøkerStatusTagProps = {
  status: JobbsøkerStatusType;
  sisteRelevanteHendelse?: HendelseDTO;
  hendelser?: HendelseDTO[];
  minSideHendelser?: HendelseDTO[] | undefined;
};

const utledVariant = (
  status: JobbsøkerStatusType,
  sisteRelevanteHendelse?: HendelseDTO,
  minsideStatus?: MinsideStatusResult,
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
    case JobbsøkerStatus.INVITERT: {
      if (minsideStatus?.type === 'FEILET') {
        return 'error';
      }
      if (minsideStatus?.type === 'MINSIDE') {
        return 'warning';
      }
      return 'info';
    }
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
  status?: JobbsøkerStatusType,
  minsideStatus?: MinsideStatusResult,
): string => {
  if (status === JobbsøkerStatus.INVITERT) {
    if (minsideStatus?.type === 'SMS') {
      return `Jobbsøker invitert via Min Side / SMS - ${formatDateForTooltip(minsideStatus.tidspunkt)}`;
    }
    if (minsideStatus?.type === 'EPOST') {
      return `Jobbsøker invitert via Min Side / e-post - ${formatDateForTooltip(minsideStatus.tidspunkt)}`;
    }
    if (minsideStatus?.type === 'MINSIDE') {
      return `Jobbsøker har ikke registrert e-post eller mobilnummer - ${formatDateForTooltip(minsideStatus.tidspunkt)}`;
    }

    if (minsideStatus?.type === 'FEILET') {
      return `Teknisk feil, invitasjon ble ikke sendt - ${formatDateForTooltip(minsideStatus.tidspunkt)}`;
    }

    return '';
  }

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
  minSideHendelser,
}) => {
  const label =
    sisteRelevanteHendelse?.hendelsestype ===
    JobbsøkerHendelsestype.AKTIVITETSKORT_OPPRETTELSE_FEIL
      ? 'Invitasjon feilet'
      : storForbokstav(status)?.replaceAll('_', ' ') || '';

  const minsideStatus = utledMinsideStatus(minSideHendelser);

  function utledIkon(
    status: JobbsøkerStatusType,
    minsideStatus: MinsideStatusResult,
  ) {
    if (status !== JobbsøkerStatus.INVITERT || !minsideStatus) {
      return null;
    }
    if (minsideStatus.type === 'FEILET') {
      return <XMarkOctagonIcon />;
    }
    if (minsideStatus.type === 'SMS') {
      return <Chat2Icon />;
    }
    if (minsideStatus.type === 'EPOST') {
      return <EnvelopeClosedIcon />;
    }
    if (minsideStatus.type === 'MINSIDE') {
      return <ChatExclamationmarkIcon />;
    }
  }

  return (
    <JobbsøkerTagMedTooltip
      tooltip={buildRelevanteHendelserTooltipContent(
        hendelser,
        status,
        minsideStatus,
      )}
      variant={utledVariant(status, sisteRelevanteHendelse, minsideStatus)}
      icon={utledIkon(status, minsideStatus)}
    >
      {label}
    </JobbsøkerTagMedTooltip>
  );
};

export default JobbsøkerStatusTag;
