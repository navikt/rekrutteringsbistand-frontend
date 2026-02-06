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
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { ReactNode } from 'react';

export const getHendelseIcon = (hendelsestype: string): ReactNode => {
  switch (hendelsestype) {
    case JobbsøkerHendelsestype.OPPRETTET ||
      ArbeidsgiverHendelsestype.OPPRETTET:
      return (
        <PlusCircleIcon
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-neutral)]'
        />
      );
    case JobbsøkerHendelsestype.SLETTET || ArbeidsgiverHendelsestype.SLETTET:
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
    default:
      return (
        <PencilIcon
          fontSize='1rem'
          className='shrink-0 text-[var(--ax-text-neutral)]'
        />
      );
  }
};
