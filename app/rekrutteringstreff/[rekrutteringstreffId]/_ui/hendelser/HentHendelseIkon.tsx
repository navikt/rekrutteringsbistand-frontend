import {
  ArbeidsgiverHendelsestype,
  JobbsøkerHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  CheckmarkCircleIcon,
  EnvelopeClosedIcon,
  MinusCircleIcon,
  PencilIcon,
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
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-neutral)]'
        />
      );
    case JobbsøkerHendelsestype.SLETTET:
    case ArbeidsgiverHendelsestype.SLETTET:
      return (
        <MinusCircleIcon
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-danger-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.INVITERT:
      return (
        <EnvelopeClosedIcon
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-accent-subtle)]'
        />
      );
    case JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON:
      return (
        <CheckmarkCircleIcon
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-success-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON:
      return (
        <XMarkOctagonIcon
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-meta-purple-decoration)]'
        />
      );
    case JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT:
      return (
        <CheckmarkCircleIcon
          className='shrink-0 text-green-500'
          fontSize='1rem'
        />
      );
    case JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST:
      return (
        <XMarkOctagonIcon
          className='shrink-0 text-[var(--ax-text-meta-purple-decoration)]'
          fontSize='1rem'
        />
      );
    case 'ubesvart':
      return (
        <QuestionmarkDiamondIcon
          className='shrink-0 text-[var(--ax-text-accent-subtle)]'
          fontSize='1rem'
        />
      );
    default:
      return (
        <PencilIcon
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-neutral)]'
        />
      );
  }
};
