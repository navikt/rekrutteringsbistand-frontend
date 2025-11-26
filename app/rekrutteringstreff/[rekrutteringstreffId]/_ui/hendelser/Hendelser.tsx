'use client';

import {
  ArbeidsgiverHendelseLabel,
  JobbsøkerHendelseLabel,
  RekrutteringstreffHendelseLabel,
} from '../jobbsøker/HendelseLabel';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  ArbeidsgiverHendelsestype,
  JobbsøkerHendelsestype,
  RekrutteringstreffHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import { PencilIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC, ReactNode } from 'react';

const GRID = 'grid grid-cols-[14rem_16rem_12rem_9rem] gap-x-4 items-center';

const getHendelseIcon = (hendelsestype: string): ReactNode => {
  if (hendelsestype === 'OPPRETTET') {
    return <PlusCircleIcon className='text-white' />;
  }
  return <PencilIcon className='text-white' />;
};

const HendelseLabelForRessurs: FC<{
  ressurs: string;
  hendelsestype: string;
}> = ({ ressurs, hendelsestype }) => {
  const icon = getHendelseIcon(hendelsestype);

  switch (ressurs) {
    case 'JOBBSØKER':
      return (
        <JobbsøkerHendelseLabel
          hendelseType={hendelsestype as JobbsøkerHendelsestype}
          icon={icon}
        />
      );
    case 'ARBEIDSGIVER':
      return (
        <ArbeidsgiverHendelseLabel
          hendelseType={hendelsestype as ArbeidsgiverHendelsestype}
          icon={icon}
        />
      );
    case 'REKRUTTERINGSTREFF':
    default:
      return (
        <RekrutteringstreffHendelseLabel
          hendelseType={hendelsestype as RekrutteringstreffHendelsestype}
          icon={icon}
        />
      );
  }
};

const Hendelser: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: hendelser } = useAlleHendelser(rekrutteringstreffId);

  if (!hendelser) return null;

  const lowercaseStorBokstavFørst = (txt: string) =>
    txt.length === 0 ? '' : txt[0].toUpperCase() + txt.slice(1).toLowerCase();

  return (
    <section className='mt-4 flex flex-col gap-4'>
      <div className={`${GRID} text-lg font-semibold`}>
        <span>Hendelse</span>
        <span>Ressurs</span>
        <span>Tidspunkt</span>
        <span>Utført av</span>
      </div>

      {hendelser.map((h) => (
        <div key={h.id} className={GRID}>
          <HendelseLabelForRessurs
            ressurs={h.ressurs}
            hendelsestype={h.hendelsestype}
          />

          <BodyShort className='whitespace-nowrap'>
            {lowercaseStorBokstavFørst(h.ressurs)}
          </BodyShort>

          <BodyShort className='whitespace-nowrap'>
            {format(new Date(h.tidspunkt), 'dd.MM.yyyy HH:mm')}
          </BodyShort>

          <BodyShort className='whitespace-nowrap'>
            {h.aktørIdentifikasjon ?? 'System'}
          </BodyShort>
        </div>
      ))}
    </section>
  );
};

export default Hendelser;
