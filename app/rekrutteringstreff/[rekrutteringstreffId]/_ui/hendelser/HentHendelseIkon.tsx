import {
  ArbeidsgiverHendelsestype,
  JobbsøkerHendelsestype,
  RekrutteringstreffHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  Buildings3Icon,
  CheckmarkCircleIcon,
  EnvelopeClosedIcon,
  HandShakeHeartIcon,
  MinusCircleIcon,
  PencilIcon,
  PersonCheckmarkIcon,
  PersonCrossIcon,
  PersonHeadsetIcon,
  PersonPlusIcon,
  PlusCircleIcon,
  QuestionmarkDiamondIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { ReactNode } from 'react';

export const getHendelseIcon = (hendelsestype: string): ReactNode => {
  switch (hendelsestype) {
    case JobbsøkerHendelsestype.OPPRETTET:
    case ArbeidsgiverHendelsestype.OPPRETTET:
      return (
        <PlusCircleIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-neutral)]'
        />
      );
    case JobbsøkerHendelsestype.SLETTET:
    case ArbeidsgiverHendelsestype.SLETTET:
      return (
        <MinusCircleIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-danger-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.INVITERT:
      return (
        <EnvelopeClosedIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-accent-subtle)]'
        />
      );
    case JobbsøkerHendelsestype.SVAR_FJERNET_AV_EIER:
      return (
        <PersonHeadsetIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-meta-purple-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON:
      return (
        <PersonCheckmarkIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-success-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON_AV_EIER:
      return (
        <PersonHeadsetIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-success-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON:
      return (
        <PersonCrossIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-meta-purple-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON_AV_EIER:
      return (
        <PersonHeadsetIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-meta-purple-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT:
      return (
        <CheckmarkCircleIcon
          aria-hidden
          className='shrink-0 text-green-500'
          fontSize='1rem'
        />
      );
    case JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST:
      return (
        <XMarkOctagonIcon
          aria-hidden
          className='shrink-0 text-[var(--ax-text-meta-purple-decoration)]'
          fontSize='1rem'
        />
      );
    case JobbsøkerHendelsestype.FÅTT_JOBB:
      return (
        <HandShakeHeartIcon
          aria-hidden
          className='shrink-0 text-[var(--ax-text-success-decoration)]'
          fontSize='1rem'
        />
      );
    case JobbsøkerHendelsestype.ANGRE_FÅTT_JOBB:
      return (
        <MinusCircleIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-danger-decoration)]'
        />
      );
    case RekrutteringstreffHendelsestype.EIER_LAGT_TIL:
      return (
        <PersonPlusIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-neutral)]'
        />
      );
    case RekrutteringstreffHendelsestype.EIER_FJERNET:
    case RekrutteringstreffHendelsestype.KONTOR_FJERNET:
      return (
        <MinusCircleIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-danger-decoration)]'
        />
      );
    case RekrutteringstreffHendelsestype.KONTOR_LAGT_TIL:
      return (
        <Buildings3Icon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-neutral)]'
        />
      );
    case 'ubesvart':
      return (
        <QuestionmarkDiamondIcon
          aria-hidden
          className='shrink-0 text-[var(--ax-text-accent-subtle)]'
          fontSize='1rem'
        />
      );
    default:
      return (
        <PencilIcon
          aria-hidden
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-neutral)]'
        />
      );
  }
};
