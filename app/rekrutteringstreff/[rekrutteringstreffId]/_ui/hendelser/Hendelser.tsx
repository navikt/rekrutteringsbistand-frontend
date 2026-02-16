'use client';

import {
  ArbeidsgiverHendelseLabel,
  JobbsøkerHendelseLabel,
  RekrutteringstreffHendelseLabel,
} from '../jobbsøker/HendelseLabel';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { getHendelseIcon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/hendelser/HentHendelseIkon';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  ArbeidsgiverHendelsestype,
  JobbsøkerHendelsestype,
  RekrutteringstreffHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import { BodyShort } from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC } from 'react';

// Kompakt grid med 5 kolonner: Hendelse, Ressurs, Tidspunkt, Utført av, Gjelder
const GRID =
  'grid grid-cols-[14rem_9rem_9rem_6rem_1fr] gap-x-2 items-start text-sm';

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
          size='small'
        />
      );
    case 'ARBEIDSGIVER':
      return (
        <ArbeidsgiverHendelseLabel
          hendelseType={hendelsestype as ArbeidsgiverHendelsestype}
          icon={icon}
          size='small'
        />
      );
    case 'REKRUTTERINGSTREFF':
    default:
      return (
        <RekrutteringstreffHendelseLabel
          hendelseType={hendelsestype as RekrutteringstreffHendelsestype}
          icon={icon}
          size='small'
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
    <section className='mt-4 flex flex-col gap-2 overflow-auto'>
      <div className={`${GRID} text-text-subtle font-semibold`}>
        <span>Hendelse</span>
        <span>Ressurs</span>
        <span>Tidspunkt</span>
        <span>Utført av</span>
        <span>Gjelder</span>
      </div>

      {hendelser.map((h) => (
        <div key={h.id} className={`${GRID} py-1`}>
          <HendelseLabelForRessurs
            ressurs={h.ressurs}
            hendelsestype={h.hendelsestype}
          />

          <BodyShort size='small' className='truncate'>
            {lowercaseStorBokstavFørst(h.ressurs)}
          </BodyShort>

          <BodyShort size='small' className='whitespace-nowrap'>
            {format(new Date(h.tidspunkt), 'dd.MM.yy HH:mm')}
          </BodyShort>

          <BodyShort
            size='small'
            className='truncate'
            title={h.aktørIdentifikasjon ?? 'System'}
          >
            {h.aktørIdentifikasjon ?? 'System'}
          </BodyShort>

          <BodyShort size='small' className='break-words'>
            <span>{h.subjektNavn ?? '-'}</span>
            {h.subjektId && (
              <span className='text-text-subtle ml-1 inline-block'>
                ({h.subjektId})
              </span>
            )}
          </BodyShort>
        </div>
      ))}
    </section>
  );
};

export default Hendelser;
