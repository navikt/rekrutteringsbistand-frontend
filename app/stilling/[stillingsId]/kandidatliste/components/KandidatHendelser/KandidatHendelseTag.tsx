import {
  ArrowUndoIcon,
  CalendarIcon,
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  FileXMarkIcon,
  HandShakeHeartIcon,
  PaperplaneIcon,
  TableIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { Tag, TagProps } from '@navikt/ds-react';

export enum KandidatHendelseType {
  Spurt_om_å_dele_CV = 'Spurt om å dele CV: Frist',
  Spurt_om_å_dele_CV_IKKE_DIGITAL = 'Spurt om å dele CV (ikke digital): Frist',
  Deling_Av_CV_Feilet = 'Deling av CV feilet',
  Deling_av_CV_JA = 'Deling av CV: Ja',
  Deling_av_CV_NEI = 'Deling av CV: Nei',
  Frist_for_deling_av_cv_utløpt = 'Frist for deling av CV utløpt',
  CV_delt_med_arbeidsgiver = 'CV delt med arbeidsgiver',
  Fått_jobben = 'Fått jobben',
  Avbrutt_i_aktivitetsplanen = 'Avbrutt i aktivitetsplanen',
  Fjernet_fått_jobben = 'Fjernet fått jobben',
  Slettet = 'Slettet',
  CV_slettet_hos_arbeidsgiver = 'CV slettet hos arbeidsgiver',
  SMS_OK = 'SMS',
  SMS_FEIL = 'SMS feilet',
  PRESENTERT = 'PRESENTERT',
  IKKE_PRESENTERT = 'IKKE_PRESENTERT',
}

const hendelseVariant = (type: KandidatHendelseType): TagProps['variant'] => {
  switch (type) {
    case KandidatHendelseType.Spurt_om_å_dele_CV:
    case KandidatHendelseType.CV_delt_med_arbeidsgiver:
      return 'info';
    case KandidatHendelseType.Fått_jobben:
    case KandidatHendelseType.Deling_av_CV_JA:
    case KandidatHendelseType.SMS_OK:
      return 'success';
    case KandidatHendelseType.Deling_Av_CV_Feilet:
    case KandidatHendelseType.Frist_for_deling_av_cv_utløpt:
    case KandidatHendelseType.Fjernet_fått_jobben:
    case KandidatHendelseType.SMS_FEIL:
    case KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL:
      return 'warning';
    case KandidatHendelseType.Avbrutt_i_aktivitetsplanen:
    case KandidatHendelseType.Deling_av_CV_NEI:
      return 'error';
    case KandidatHendelseType.Slettet:
    case KandidatHendelseType.CV_slettet_hos_arbeidsgiver:
      return 'alt1';
    default:
      return 'info';
  }
};
const hendelseIkon = (type: KandidatHendelseType): React.ReactNode => {
  switch (type) {
    case KandidatHendelseType.Spurt_om_å_dele_CV:
      return <TableIcon />;
    case KandidatHendelseType.Deling_Av_CV_Feilet:
    case KandidatHendelseType.Avbrutt_i_aktivitetsplanen:
    case KandidatHendelseType.SMS_FEIL:
    case KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL:
      return <ExclamationmarkTriangleIcon />;
    case KandidatHendelseType.Deling_av_CV_JA:
      return <ThumbUpIcon />;
    case KandidatHendelseType.Deling_av_CV_NEI:
      return <ThumbDownIcon />;
    case KandidatHendelseType.Frist_for_deling_av_cv_utløpt:
      return <CalendarIcon />;
    case KandidatHendelseType.CV_delt_med_arbeidsgiver:
      return <PaperplaneIcon />;
    case KandidatHendelseType.Fått_jobben:
      return <HandShakeHeartIcon />;
    case KandidatHendelseType.Fjernet_fått_jobben:
      return <ArrowUndoIcon />;
    case KandidatHendelseType.Slettet:
      return <TrashIcon />;
    case KandidatHendelseType.CV_slettet_hos_arbeidsgiver:
      return <FileXMarkIcon />;
    case KandidatHendelseType.SMS_OK:
      return <CheckmarkCircleIcon />;
    default:
      return null;
  }
};

interface KandidatHendelseTagProps {
  type: KandidatHendelseType | null;
  dato?: string | null;
}
export const KandidatHendelseTag: React.FC<KandidatHendelseTagProps> = ({
  type,
  dato,
}) => {
  if (!type) {
    return null;
  }
  return (
    <Tag
      variant={hendelseVariant(type)}
      icon={hendelseIkon(type)}
      className='inline-flex '
      size='small'
    >
      {type} {dato}
    </Tag>
  );
};
