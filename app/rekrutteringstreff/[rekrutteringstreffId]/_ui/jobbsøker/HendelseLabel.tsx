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
      return 'Lagt til';
    case JobbsøkerHendelsestype.OPPDATERT:
      return 'Oppdatert';
    case JobbsøkerHendelsestype.SLETTET:
      return 'Slettet';
    case JobbsøkerHendelsestype.INVITERT:
      return 'Invitert';
    case JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON:
      return 'Svart ja';
    case JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON:
      return 'Svart nei';
    case JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST:
      return 'Treff avlyst';
    case JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT:
      return 'Treff fullført';
    case JobbsøkerHendelsestype.TREFF_ENDRET_ETTER_PUBLISERING_NOTIFIKASJON:
      return 'Treff endret etter publisering notifikasjon';
    default:
      return t;
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
      <BodyShort>{text}</BodyShort>
    </div>
  );
};

// 2) Arbeidsgiver
export const arbeidsgiverLabelTekst = (t: ArbeidsgiverHendelsestype) => {
  switch (t) {
    case ArbeidsgiverHendelsestype.OPPRETTET:
      return 'Lagt til';
    case ArbeidsgiverHendelsestype.OPPDATERT:
      return 'Oppdatert';
    case ArbeidsgiverHendelsestype.SLETTET:
      return 'Slettet';
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
      <BodyShort>{text}</BodyShort>
    </div>
  );
};

// 3) Rekrutteringstreff

export const rekrutteringstreffLabelTekst = (
  t: RekrutteringstreffHendelsestype,
) => {
  switch (t) {
    case RekrutteringstreffHendelsestype.OPPRETTET:
      return 'Lagt til';
    case RekrutteringstreffHendelsestype.OPPDATERT:
      return 'Oppdatert';
    case RekrutteringstreffHendelsestype.SLETTET:
      return 'Slettet';
    case RekrutteringstreffHendelsestype.PUBLISERT:
      return 'Publisert';
    case RekrutteringstreffHendelsestype.FULLFØRT:
      return 'Fullført';
    case RekrutteringstreffHendelsestype.AVLYST:
      return 'Avlyst';
    case RekrutteringstreffHendelsestype.GJENÅPNET: //Kun fullførte treff kan gjenåpnes
      return 'Gjenåpnet';
    case RekrutteringstreffHendelsestype.TREFF_ENDRET_ETTER_PUBLISERING: //Kun fullførte treff kan gjenåpnes
      return 'Treff endret etter publisering';
    case RekrutteringstreffHendelsestype.TREFF_ENDRET_ETTER_PUBLISERING_NOTIFIKASJON:
      return 'Treff endret etter publisering notifikasjon';

    // TODO: Brukes ikke for øyeblikket, men trengs når vi skal stanse for at flere deltakere blir lagt på og treffet er synlig for veiledere
    case RekrutteringstreffHendelsestype.AVPUBLISERT:
      return 'Avpublisert';

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
      <BodyShort>{text}</BodyShort>
    </div>
  );
};
