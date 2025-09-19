import {
  JobbsøkerHendelsestype,
  ArbeidsgiverHendelsestype,
  RekrutteringstreffHendelsestype,
} from '@/app/rekrutteringstreff/_domain/constants';
import { BodyShort } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface BaseProps<T extends string> {
  icon: ReactNode;
  hendelseType: T;
  antall?: number;
}

export const jobbsøkerLabelTekst = (t: JobbsøkerHendelsestype | string) => {
  switch (t) {
    case JobbsøkerHendelsestype.OPPRETT:
      return 'lagt til';
    case JobbsøkerHendelsestype.OPPDATER:
      return 'oppdatert';
    case JobbsøkerHendelsestype.SLETT:
      return 'slettet';
    case JobbsøkerHendelsestype.INVITER:
      return 'invitert';
    case JobbsøkerHendelsestype.MØT_OPP:
      return 'møtt opp';
    case JobbsøkerHendelsestype.IKKE_MØT_OPP:
      return 'møtte ikke';
    case JobbsøkerHendelsestype.SVAR_JA_TIL_INVITASJON:
      return 'svart ja';
    case JobbsøkerHendelsestype.SVAR_NEI_TIL_INVITASJON:
      return 'svart nei';
    default:
      return t.toLowerCase();
  }
};
export const JobbsøkerHendelseLabel: FC<
  BaseProps<JobbsøkerHendelsestype | string>
> = ({ icon, hendelseType, antall }) => {
  const lbl = jobbsøkerLabelTekst(hendelseType);
  const text = antall === undefined ? lbl : `${antall} ${lbl}`;
  return (
    <div className='flex flex-nowrap items-center space-x-2'>
      {icon}
      <BodyShort className='capitalize'>{text}</BodyShort>
    </div>
  );
};

// 2) Arbeidsgiver
export const arbeidsgiverLabelTekst = (t: ArbeidsgiverHendelsestype) => {
  switch (t) {
    case ArbeidsgiverHendelsestype.OPPRETT:
      return 'lagt til';
    case ArbeidsgiverHendelsestype.OPPDATER:
      return 'oppdatert';
    case ArbeidsgiverHendelsestype.SLETT:
      return 'slettet';
    default:
      return '';
  }
};
export const ArbeidsgiverHendelseLabel: FC<
  BaseProps<ArbeidsgiverHendelsestype>
> = ({ icon, hendelseType, antall }) => {
  const lbl = arbeidsgiverLabelTekst(hendelseType);
  const text = antall === undefined ? lbl : `${antall} ${lbl}`;
  return (
    <div className='flex flex-nowrap items-center space-x-2'>
      {icon}
      <BodyShort className='capitalize'>{text}</BodyShort>
    </div>
  );
};

// 3) Rekrutteringstreff

export const rekrutteringstreffLabelTekst = (
  t: RekrutteringstreffHendelsestype,
) => {
  switch (t) {
    case RekrutteringstreffHendelsestype.OPPRETT:
      return 'lagt til';
    case RekrutteringstreffHendelsestype.OPPDATER:
      return 'oppdatert';
    case RekrutteringstreffHendelsestype.SLETT:
      return 'slettet';
    case RekrutteringstreffHendelsestype.PUBLISER:
      return 'publisert';
    case RekrutteringstreffHendelsestype.FULLFØR:
      return 'fullført';
    case RekrutteringstreffHendelsestype.AVLYS:
      return 'avlyst';
    case RekrutteringstreffHendelsestype.GJENÅPN: //Kun fullførte treff kan gjenåpnes
      return 'gjenåpnet';

    // TODO: Brukes ikke for øyeblikket, men trengs når vi skal stanse for at flere deltakere blir lagt på og treffet er synlig for veiledere
    case RekrutteringstreffHendelsestype.AVPUBLISER:
      return 'avpublisert';

    default:
      return '';
  }
};
export const RekrutteringstreffHendelseLabel: FC<
  BaseProps<RekrutteringstreffHendelsestype>
> = ({ icon, hendelseType, antall }) => {
  const lbl = rekrutteringstreffLabelTekst(hendelseType);
  const text = antall === undefined ? lbl : `${antall} ${lbl}`;
  return (
    <div className='flex flex-nowrap items-center space-x-2'>
      {icon}
      <BodyShort className='capitalize'>{text}</BodyShort>
    </div>
  );
};
