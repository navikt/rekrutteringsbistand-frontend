import {
  JobbsøkerHendelsestype,
  ArbeidsgiverHendelsestype,
  RekrutteringstreffHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import { BodyShort } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface BaseProps<T extends string> {
  icon: ReactNode;
  hendelseType: T;
  antall?: number;
}

export const jobbsøkerLabelTekst = (t: JobbsøkerHendelsestype | string) => {
  switch (t) {
    case JobbsøkerHendelsestype.OPPRETTET:
      return 'lagt til';
    case JobbsøkerHendelsestype.OPPDATERT:
      return 'oppdatert';
    case JobbsøkerHendelsestype.SLETTET:
      return 'slettet';
    case JobbsøkerHendelsestype.INVITERT:
      return 'invitert';
    case JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON:
      return 'svart ja';
    case JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON:
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
    case ArbeidsgiverHendelsestype.OPPRETTET:
      return 'lagt til';
    case ArbeidsgiverHendelsestype.OPPDATERT:
      return 'oppdatert';
    case ArbeidsgiverHendelsestype.SLETTET:
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
    case RekrutteringstreffHendelsestype.OPPRETTET:
      return 'lagt til';
    case RekrutteringstreffHendelsestype.OPPDATERT:
      return 'oppdatert';
    case RekrutteringstreffHendelsestype.SLETTET:
      return 'slettet';
    case RekrutteringstreffHendelsestype.PUBLISERT:
      return 'publisert';
    case RekrutteringstreffHendelsestype.FULLFØRT:
      return 'fullført';
    case RekrutteringstreffHendelsestype.AVLYST:
      return 'avlyst';
    case RekrutteringstreffHendelsestype.GJENÅPNET: //Kun fullførte treff kan gjenåpnes
      return 'gjenåpnet';

    // TODO: Brukes ikke for øyeblikket, men trengs når vi skal stanse for at flere deltakere blir lagt på og treffet er synlig for veiledere
    case RekrutteringstreffHendelsestype.AVPUBLISERT:
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
